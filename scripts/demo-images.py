#!/usr/bin/env python3
"""Geometric illustrations for the homepage hero email.

Brand: Cindermill, a fictional work-planning product. Palette is the same
indigo and coral the template JSON uses. Rerun from the repo root:

    python3 scripts/demo-images.py

Outputs PNG files in public/demo/. Each is palette-quantized with no dither
and must stay under 60 KB. The banner is 1200px wide (2x for a 600px email).
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "demo"
MAX_BYTES = 60 * 1024

INK = (28, 23, 51)  # #1C1733
PAPER = (247, 244, 238)  # #F7F4EE
WASH = (238, 241, 248)  # #EEF1F8
CREAM = (246, 243, 236)  # #F6F3EC
CORAL = (194, 65, 45)  # #C2412D
MUTED = (197, 192, 212)  # #C5C0D4
LINE = (228, 224, 242)  # #E4E0F2


def save_png(image: Image.Image, name: str, colors: int = 8) -> None:
    quantized = image.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    path = OUT / name
    quantized.save(path, format="PNG", optimize=True)
    size = path.stat().st_size
    print(f"{name}\t{image.size[0]}x{image.size[1]}\t{size} bytes")
    if size >= MAX_BYTES:
        raise SystemExit(f"{name} is {size} bytes, over the {MAX_BYTES} byte limit")


def rounded_rect(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], radius: int, fill: tuple[int, int, int]) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def hero_banner() -> Image.Image:
    image = Image.new("RGB", (1200, 480), INK)
    draw = ImageDraw.Draw(image)

    # A large ring, cropped by the left edge, so the banner has a shape
    # rather than a flat field.
    draw.ellipse((-180, -40, 520, 560), outline=CREAM, width=18)
    draw.ellipse((78, 118, 262, 302), fill=CORAL)
    draw.ellipse((118, 158, 222, 262), fill=INK)

    # Product-card: a paper panel with a timeline, not a screenshot of a
    # real interface.
    rounded_rect(draw, (560, 48, 1144, 432), 28, PAPER)
    draw.rounded_rectangle((560, 48, 1144, 92), radius=28, fill=CORAL)
    draw.rectangle((560, 70, 1144, 92), fill=CORAL)

    rows = (
        (620, 150, 980, INK),
        (620, 214, 860, MUTED),
        (620, 278, 1040, INK),
        (620, 342, 780, MUTED),
    )
    for x, y, end, color in rows:
        rounded_rect(draw, (x, y, end, y + 18), 9, color)
        node = CORAL if color == INK else LINE
        draw.ellipse((end - 6, y - 8, end + 28, y + 26), fill=node)

    return image


def icon_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (128, 128), WASH)
    return image, ImageDraw.Draw(image)


def icon_timeline() -> Image.Image:
    image, draw = icon_canvas()
    draw.line((36, 28, 36, 100), fill=INK, width=4)
    for y, color in ((32, CORAL), (62, INK), (92, INK)):
        draw.ellipse((28, y - 6, 44, y + 10), fill=color)
        draw.rounded_rectangle((52, y - 4, 100 if y != 62 else 84, y + 8), radius=6, fill=INK if y != 92 else MUTED)
    return image


def icon_quiet() -> Image.Image:
    image, draw = icon_canvas()
    draw.ellipse((24, 24, 104, 104), outline=INK, width=6)
    draw.rounded_rectangle((48, 46, 60, 82), radius=4, fill=CORAL)
    draw.rounded_rectangle((68, 46, 80, 82), radius=4, fill=INK)
    return image


def icon_rounds() -> Image.Image:
    image, draw = icon_canvas()
    draw.ellipse((30, 30, 98, 98), outline=MUTED, width=4)
    centers = ((64, 30), (94, 82), (34, 82))
    fills = (CORAL, INK, INK)
    for (x, y), fill in zip(centers, fills):
        draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=fill)
    return image


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    save_png(hero_banner(), "hero-banner.png")
    save_png(icon_timeline(), "icon-timeline.png")
    save_png(icon_quiet(), "icon-quiet.png")
    save_png(icon_rounds(), "icon-rounds.png")


if __name__ == "__main__":
    main()
