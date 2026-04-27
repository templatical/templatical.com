<script setup lang="ts">
import { useElementBounding, useEventListener, useIntersectionObserver, useScroll } from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        intensity?: number;
        hueStart?: number;
        hueEnd?: number;
    }>(),
    {
        intensity: 1,
        hueStart: 30,
        hueEnd: 220,
    },
);

const root = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const supported = ref(true);
const inView = ref(false);

let gl: WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;
let uTime: WebGLUniformLocation | null = null;
let uRes: WebGLUniformLocation | null = null;
let uScroll: WebGLUniformLocation | null = null;
let uPointer: WebGLUniformLocation | null = null;
let uHueRange: WebGLUniformLocation | null = null;
let uIntensity: WebGLUniformLocation | null = null;
let raf = 0;
let start = 0;
const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Fragment shader: layered simplex-flavored fbm noise blended across an OKLCH-ish
// hue range. We hand-rolled an OKLCH→linear-sRGB approximation so the gradient
// stays perceptually even instead of the muddy mid-tones HSL produces.
const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_scroll;
uniform vec2 u_pointer;
uniform vec2 u_hue_range;
uniform float u_intensity;

// hash + value noise
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = mat2(1.6, 1.2, -1.2, 1.6) * p;
        a *= 0.5;
    }
    return v;
}

// OKLCH-ish (l, c, h°) to linear-sRGB approximation
vec3 oklch_to_lrgb(float l, float c, float h) {
    float hr = radians(h);
    float a = c * cos(hr);
    float b = c * sin(hr);
    float l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    float m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    float s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    l_ = l_ * l_ * l_;
    m_ = m_ * m_ * m_;
    s_ = s_ * s_ * s_;
    return vec3(
         4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
        -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
        -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
    );
}
vec3 lrgb_to_srgb(vec3 c) {
    return pow(max(c, 0.0), vec3(1.0 / 2.2));
}

void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = uv;
    p.x *= aspect;

    // pointer falloff
    vec2 ptr = u_pointer;
    ptr.x *= aspect;
    float d = distance(p, ptr);
    float pull = exp(-d * 2.5) * 0.6;

    float t = u_time * 0.04;
    float n1 = fbm(p * 1.4 + vec2(t, -t * 0.6) + pull);
    float n2 = fbm(p * 2.6 - vec2(t * 0.8, t * 0.4) + n1);
    float n  = mix(n1, n2, 0.6);

    // hue drifts across scroll (0..1) within configured range, plus noise wobble
    float hue = mix(u_hue_range.x, u_hue_range.y, u_scroll);
    hue += (n - 0.5) * 70.0;

    // lightness stays bright; chroma stays low so it never goes garish
    float l = 0.86 + (n - 0.5) * 0.08;
    float c = 0.05 + n2 * 0.04;

    vec3 col = lrgb_to_srgb(oklch_to_lrgb(l, c, hue));

    // edge mask so aurora fades into the page, never dominates
    float edge = smoothstep(0.0, 0.22, uv.y) * smoothstep(0.0, 0.22, 1.0 - uv.y);
    float vignette = smoothstep(0.0, 0.5, uv.x) * smoothstep(0.0, 0.5, 1.0 - uv.x);
    float mask = edge * mix(0.4, 1.0, vignette);

    float alpha = mask * (0.10 + n * 0.18) * u_intensity;
    outColor = vec4(col, alpha);
}`;

function compile(glx: WebGL2RenderingContext, type: number, src: string) {
    const sh = glx.createShader(type)!;
    glx.shaderSource(sh, src);
    glx.compileShader(sh);
    if (!glx.getShaderParameter(sh, glx.COMPILE_STATUS)) {
        glx.deleteShader(sh);
        return null;
    }
    return sh;
}

function init() {
    if (!canvas.value) return;
    const glx = canvas.value.getContext('webgl2', {
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: 'low-power',
    });
    if (!glx) {
        supported.value = false;
        return;
    }
    gl = glx;
    const vs = compile(glx, glx.VERTEX_SHADER, VERT);
    const fs = compile(glx, glx.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
        supported.value = false;
        return;
    }
    program = glx.createProgram();
    glx.attachShader(program, vs);
    glx.attachShader(program, fs);
    glx.linkProgram(program);
    if (!glx.getProgramParameter(program, glx.LINK_STATUS)) {
        supported.value = false;
        return;
    }
    glx.useProgram(program);

    const buf = glx.createBuffer();
    glx.bindBuffer(glx.ARRAY_BUFFER, buf);
    glx.bufferData(
        glx.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        glx.STATIC_DRAW,
    );
    const loc = glx.getAttribLocation(program, 'a_pos');
    glx.enableVertexAttribArray(loc);
    glx.vertexAttribPointer(loc, 2, glx.FLOAT, false, 0, 0);

    uTime = glx.getUniformLocation(program, 'u_time');
    uRes = glx.getUniformLocation(program, 'u_resolution');
    uScroll = glx.getUniformLocation(program, 'u_scroll');
    uPointer = glx.getUniformLocation(program, 'u_pointer');
    uHueRange = glx.getUniformLocation(program, 'u_hue_range');
    uIntensity = glx.getUniformLocation(program, 'u_intensity');

    glx.enable(glx.BLEND);
    glx.blendFunc(glx.ONE, glx.ONE_MINUS_SRC_ALPHA);

    resize();
}

function resize() {
    if (!canvas.value || !gl) return;
    const dpr = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.25 : 1.75,
    );
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.value.width !== w || canvas.value.height !== h) {
        canvas.value.width = w;
        canvas.value.height = h;
        gl.viewport(0, 0, w, h);
    }
}

const { y: scrollY } = useScroll(typeof window !== 'undefined' ? window : null, {
    throttle: 16,
});

function frame(now: number) {
    if (!gl || !program) return;
    if (!start) start = now;
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    const docH = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
    );
    const scroll = Math.min(1, Math.max(0, scrollY.value / docH));

    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uRes, canvas.value!.width, canvas.value!.height);
    gl.uniform1f(uScroll, scroll);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform2f(uHueRange, props.hueStart, props.hueEnd);
    gl.uniform1f(uIntensity, props.intensity);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (inView.value) raf = requestAnimationFrame(frame);
}

function startLoop() {
    if (raf) return;
    raf = requestAnimationFrame(frame);
}
function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
}

onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        supported.value = false;
        return;
    }
    init();
    if (!supported.value) return;

    useIntersectionObserver(root, ([entry]) => {
        inView.value = entry.isIntersecting;
        if (inView.value) startLoop();
        else stopLoop();
    });

    useEventListener(window, 'resize', resize, { passive: true });
    useEventListener(
        window,
        'pointermove',
        (e: PointerEvent) => {
            pointer.tx = e.clientX / window.innerWidth;
            pointer.ty = 1 - e.clientY / window.innerHeight;
        },
        { passive: true },
    );
    useEventListener(document, 'visibilitychange', () => {
        if (document.hidden) stopLoop();
        else if (inView.value) startLoop();
    });
});

onBeforeUnmount(() => {
    stopLoop();
    if (gl && program) {
        gl.deleteProgram(program);
        gl = null;
        program = null;
    }
});

useElementBounding(root); // keeps layout in sync for SSR hydration
</script>

<template>
    <div
        ref="root"
        class="aurora-root pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
    >
        <canvas
            v-if="supported"
            ref="canvas"
            class="absolute inset-0 h-full w-full"
        />
        <div v-else class="aurora-fallback absolute inset-0" />
    </div>
</template>

<style scoped>
.aurora-root {
    /* fade out at extreme top/bottom so content edges feel grounded */
    mask-image: linear-gradient(
        to bottom,
        transparent 0,
        black 8%,
        black 92%,
        transparent 100%
    );
    -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0,
        black 8%,
        black 92%,
        transparent 100%
    );
}

.aurora-fallback {
    background:
        radial-gradient(
            60% 50% at 20% 20%,
            oklch(78% 0.12 55 / 0.35) 0%,
            transparent 70%
        ),
        radial-gradient(
            55% 45% at 80% 70%,
            oklch(72% 0.13 210 / 0.3) 0%,
            transparent 75%
        ),
        radial-gradient(
            45% 40% at 50% 100%,
            oklch(75% 0.14 320 / 0.22) 0%,
            transparent 70%
        );
    filter: blur(20px);
}

@media (prefers-reduced-motion: reduce) {
    .aurora-root canvas {
        display: none;
    }
}
</style>
