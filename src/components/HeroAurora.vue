<script setup lang="ts">
import {
    useDark,
    useDevicePixelRatio,
    useEventListener,
    useIntersectionObserver,
    usePreferredReducedMotion,
    useResizeObserver,
} from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

withDefaults(
    defineProps<{
        fadeClass?: string;
    }>(),
    {
        fadeClass:
            'bg-gradient-to-b from-transparent from-65% to-neutral-50 dark:to-neutral-950',
    },
);

const canvas = ref<HTMLCanvasElement | null>(null);
const root = ref<HTMLDivElement | null>(null);
const supported = ref(true);

const isDark = useDark();
const reducedMotionPref = usePreferredReducedMotion();
const { pixelRatio } = useDevicePixelRatio();

let gl: WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;
let raf = 0;
let startT = 0;
let mouseX = 0.5;
let mouseY = 0.4;
let tMouseX = 0.5;
let tMouseY = 0.4;
let visible = true;

const VERT = `#version 300 es
in vec2 a;
out vec2 v;
void main(){ v = a*0.5+0.5; gl_Position = vec4(a,0.0,1.0); }`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v;
out vec4 o;
uniform float uT;
uniform vec2 uR;
uniform vec2 uM;
uniform float uDark;

vec3 hash3(vec2 p){
  vec3 q = vec3(dot(p,vec2(127.1,311.7)),
                dot(p,vec2(269.5,183.3)),
                dot(p,vec2(419.2,371.9)));
  return fract(sin(q)*43758.5453);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash3(i).x;
  float b = hash3(i+vec2(1.0,0.0)).x;
  float c = hash3(i+vec2(0.0,1.0)).x;
  float d = hash3(i+vec2(1.0,1.0)).x;
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float s = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ s += a*noise(p); p = m*p; a *= 0.5; }
  return s;
}

// OKLab -> linear sRGB
vec3 oklabToLinear(vec3 c){
  float L = c.x, a = c.y, b = c.z;
  float l_ = L + 0.3963377774*a + 0.2158037573*b;
  float m_ = L - 0.1055613458*a - 0.0638541728*b;
  float s_ = L - 0.0894841775*a - 1.2914855480*b;
  float l = l_*l_*l_;
  float m = m_*m_*m_;
  float s = s_*s_*s_;
  return vec3(
    4.0767416621*l - 3.3077115913*m + 0.2309699292*s,
   -1.2684380046*l + 2.6097574011*m - 0.3413193965*s,
   -0.0041960863*l - 0.7034186147*m + 1.7076147010*s);
}
vec3 linearToSrgb(vec3 c){
  c = clamp(c, 0.0, 1.0);
  return mix(12.92*c, 1.055*pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
}
// L, C, h(deg) -> OKLab
vec3 lch(float L, float C, float h){
  float r = radians(h);
  return vec3(L, C*cos(r), C*sin(r));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uR.xy) / uR.y;
  vec2 m = (uM - 0.5) * vec2(uR.x/uR.y, 1.0);

  float t = uT * 0.06;
  vec2 q = uv*1.2 + vec2(t, -t*0.7);
  q += 0.35*vec2(fbm(uv*1.6 + t), fbm(uv*1.6 - t));

  // distance to mouse warps the field
  float dm = length(uv - m*0.6);
  q += 0.25 * vec2(cos(t*1.3), sin(t*1.1)) * exp(-dm*1.8);

  float n = fbm(q);
  float n2 = fbm(q*1.7 + 5.0);
  float n3 = fbm(q*0.6 - 3.0);

  // warm OKLch palette — primary hue 55, neutrals 60
  vec3 cA = lch(mix(0.80, 0.30, uDark), mix(0.16, 0.10, uDark), 55.0);   // primary glow
  vec3 cB = lch(mix(0.84, 0.22, uDark), mix(0.12, 0.08, uDark), 35.0);   // warm copper
  vec3 cC = lch(mix(0.92, 0.16, uDark), mix(0.07, 0.04, uDark), 80.0);   // pale gold
  vec3 cD = lch(mix(0.98, 0.14, uDark), mix(0.012, 0.02, uDark), 60.0);  // base

  vec3 lab = mix(cD, cA, smoothstep(0.35, 0.85, n));
  lab = mix(lab, cB, smoothstep(0.45, 0.9, n2)*0.55);
  lab = mix(lab, cC, smoothstep(0.5, 0.95, n3)*0.35);

  // mouse halo — soft additive in OKLab L
  float halo = exp(-dm*2.6) * 0.18;
  lab.x += halo;

  vec3 lin = oklabToLinear(lab);
  vec3 srgb = linearToSrgb(lin);

  // vignette toward bottom for nav focus
  float vig = smoothstep(1.05, 0.2, length(uv*vec2(0.7,1.1)));
  srgb *= mix(0.92, 1.0, vig);

  // grain to break banding
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
  srgb += (g - 0.5) * 0.012;

  o = vec4(srgb, 1.0);
}`;

function compile(g: WebGL2RenderingContext, type: number, src: string) {
    const sh = g.createShader(type)!;
    g.shaderSource(sh, src);
    g.compileShader(sh);
    if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) {
        console.warn(g.getShaderInfoLog(sh));
        g.deleteShader(sh);
        return null;
    }
    return sh;
}

function init() {
    const c = canvas.value;
    if (!c) return false;
    const ctx = c.getContext('webgl2', {
        antialias: false,
        premultipliedAlpha: false,
        powerPreference: 'low-power',
    });
    if (!ctx) return false;
    gl = ctx;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn(gl.getProgramInfoLog(p));
        return false;
    }
    program = p;
    gl.useProgram(p);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(p, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    return true;
}

function resize() {
    const c = canvas.value;
    if (!c || !gl) return;
    const dpr = Math.min(1.5, pixelRatio.value || 1);
    const w = Math.floor(c.clientWidth * dpr);
    const h = Math.floor(c.clientHeight * dpr);
    if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        gl.viewport(0, 0, w, h);
    }
}

function frame(t: number) {
    if (!gl || !program) return;
    if (!startT) startT = t;
    const elapsed = (t - startT) / 1000;

    // ease mouse
    mouseX += (tMouseX - mouseX) * 0.06;
    mouseY += (tMouseY - mouseY) * 0.06;

    const reducedMotion = reducedMotionPref.value === 'reduce';
    const uT = gl.getUniformLocation(program, 'uT');
    const uR = gl.getUniformLocation(program, 'uR');
    const uM = gl.getUniformLocation(program, 'uM');
    const uDark = gl.getUniformLocation(program, 'uDark');
    gl.uniform1f(uT, reducedMotion ? 0 : elapsed);
    gl.uniform2f(uR, canvas.value!.width, canvas.value!.height);
    gl.uniform2f(uM, mouseX, 1 - mouseY);
    gl.uniform1f(uDark, isDark.value ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (visible && !reducedMotion) raf = requestAnimationFrame(frame);
    else raf = 0;
}

function kick() {
    if (!raf && visible) raf = requestAnimationFrame(frame);
}

function onPointer(e: PointerEvent) {
    const el = root.value;
    if (!el) return;
    const r = el.getBoundingClientRect();
    tMouseX = (e.clientX - r.left) / r.width;
    tMouseY = (e.clientY - r.top) / r.height;
    kick();
}

// Re-render whenever the inputs change (motion preference, theme, DPR).
watch([reducedMotionPref, isDark, pixelRatio], () => kick());

useEventListener(typeof window !== 'undefined' ? window : null, 'pointermove', onPointer, {
    passive: true,
});

useResizeObserver(canvas, () => {
    resize();
    kick();
});

useIntersectionObserver(
    root,
    ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
    },
    { threshold: 0 },
);

onMounted(() => {
    if (!init()) {
        supported.value = false;
        return;
    }
    resize();
    // Paint at least one frame, even under reduced-motion.
    raf = requestAnimationFrame(frame);
});

onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf);
});
</script>

<template>
    <div
        ref="root"
        aria-hidden="true"
        class="hero-aurora pointer-events-none absolute inset-0 overflow-hidden"
    >
        <canvas
            v-show="supported"
            ref="canvas"
            class="absolute inset-0 size-full"
        />
        <div v-if="!supported" class="hero-aurora-fallback absolute inset-0" />
        <div :class="['absolute inset-0', fadeClass]" />
    </div>
</template>

<style scoped>
.hero-aurora-fallback {
    background:
        radial-gradient(
            60% 50% at 30% 20%,
            oklch(85% 0.08 55 / 0.55),
            transparent 70%
        ),
        radial-gradient(
            55% 45% at 75% 35%,
            oklch(90% 0.06 80 / 0.45),
            transparent 70%
        ),
        radial-gradient(
            70% 60% at 50% 90%,
            oklch(96% 0.02 60 / 0.6),
            transparent 70%
        );
}
:global(.dark) .hero-aurora-fallback {
    background:
        radial-gradient(
            60% 50% at 30% 20%,
            oklch(28% 0.08 55 / 0.7),
            transparent 70%
        ),
        radial-gradient(
            55% 45% at 75% 35%,
            oklch(22% 0.06 80 / 0.6),
            transparent 70%
        ),
        radial-gradient(
            70% 60% at 50% 90%,
            oklch(14.5% 0.008 60 / 0.95),
            transparent 70%
        );
}
</style>
