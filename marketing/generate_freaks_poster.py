"""
FREAKS Barbershop — Generador de cartells estil freak pulp per Instagram.

Ús: python3 generate_freaks_poster.py

Genera un lot de cartells combinant Freepik Flux (fons pulp/horror) + Pillow
(composició amb logo del drac, text i CTAs). Sortida a marketing/output/.
"""
from __future__ import annotations

import asyncio
import base64
import os
import random
from pathlib import Path

import httpx
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parent
OUTPUT = ROOT / "output"
CACHE = ROOT / "cache"
OUTPUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)

DRAGON_LOGO = PROJECT / "public" / "images" / "dragon-transparent.png"

FREEPIK_ENDPOINT = "https://api.freepik.com/v1/ai/text-to-image"

FONT_IMPACT = "/System/Library/Fonts/Supplemental/Impact.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Futura.ttc"
FONT_STENCIL = "/System/Library/Fonts/Supplemental/Rockwell.ttc"

PALETTES = {
    "yellow_black": {"bg": "#F4D03F", "fg": "#0B0B0B", "accent": "#E74C3C"},
    "pink_cyan": {"bg": "#FF3E88", "fg": "#06112A", "accent": "#00E5FF"},
    "red_cream": {"bg": "#E63946", "fg": "#FDF6E3", "accent": "#111111"},
    "teal_magenta": {"bg": "#14B8A6", "fg": "#1A0933", "accent": "#FF2E88"},
}


async def freepik_flux(prompt: str, aspect: str = "square_1_1") -> bytes:
    api_key = os.environ.get("FREEPIK_API_KEY")
    if not api_key:
        raise RuntimeError("FREEPIK_API_KEY no definida a l'entorn.")

    payload = {
        "prompt": prompt,
        "num_images": 1,
        "image": {"size": aspect},
    }
    headers = {
        "Content-Type": "application/json",
        "x-freepik-api-key": api_key,
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        resp = await client.post(FREEPIK_ENDPOINT, headers=headers, json=payload)
        if resp.status_code != 200:
            raise RuntimeError(f"Freepik error {resp.status_code}: {resp.text[:400]}")
        data = resp.json()
        images = data.get("data") or []
        if not images:
            raise RuntimeError(f"Cap imatge rebuda: {str(data)[:400]}")

        first = images[0]
        if first.get("base64"):
            return base64.b64decode(first["base64"])
        if first.get("url"):
            img_resp = await client.get(first["url"])
            return img_resp.content
        raise RuntimeError(f"Format no reconegut: {str(first)[:200]}")


def add_grain(img: Image.Image, intensity: int = 30) -> Image.Image:
    noise = Image.effect_noise(img.size, intensity).convert("RGB")
    return Image.blend(img, noise, 0.08)


def add_halftone_overlay(img: Image.Image, color: str = "#000000", opacity: int = 40) -> Image.Image:
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    step = max(8, w // 120)
    r = step // 3
    for y in range(0, h, step):
        for x in range(0, w, step):
            draw.ellipse((x, y, x + r, y + r), fill=(0, 0, 0, opacity))
    result = img.convert("RGBA")
    result = Image.alpha_composite(result, overlay)
    return result


def fit_text(draw, text: str, font_path: str, max_width: int, max_size: int) -> ImageFont.FreeTypeFont:
    size = max_size
    while size > 10:
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if (bbox[2] - bbox[0]) <= max_width:
            return font
        size -= 4
    return ImageFont.truetype(font_path, size)


def draw_stamp_rect(draw: ImageDraw.ImageDraw, xy, color: str, rotation: float = 0) -> None:
    draw.rectangle(xy, fill=color)


def compose_poster(
    bg_bytes: bytes,
    size: tuple[int, int],
    palette: dict,
    kicker: str,
    title_top: str,
    title_bottom: str,
    tagline: str,
    footer_left: str,
    footer_right: str,
    show_stars: bool = True,
) -> Image.Image:
    w, h = size
    base = Image.open_from_bytes = Image.open
    from io import BytesIO
    bg = Image.open(BytesIO(bg_bytes)).convert("RGB").resize(size, Image.LANCZOS)
    bg = add_grain(bg, 40)

    # Color wash toward palette (subtle — keep the monster visible)
    wash = Image.new("RGB", size, palette["bg"])
    bg = Image.blend(bg, wash, 0.18)

    canvas = bg.convert("RGBA")

    # Halftone dots overlay (subtle — texture only)
    canvas = add_halftone_overlay(canvas, opacity=28)

    draw = ImageDraw.Draw(canvas)

    # Top border band (més alta per deixar lloc al drac)
    band_h = int(h * 0.055)
    draw.rectangle([0, 0, w, band_h], fill=palette["fg"])
    draw.rectangle([0, h - band_h, w, h], fill=palette["fg"])

    # Kicker esquerra dins banda superior
    kicker_font = ImageFont.truetype(FONT_IMPACT, int(h * 0.028))
    kicker_y = (band_h - int(h * 0.028)) // 2
    draw.text((int(w * 0.05), kicker_y), kicker, fill=palette["bg"], font=kicker_font)

    # Big blocky titles (pulp movie poster)
    max_tw = int(w * 0.82)
    font_top = fit_text(draw, title_top, FONT_IMPACT, max_tw, int(h * 0.22))
    font_bottom = fit_text(draw, title_bottom, FONT_IMPACT, max_tw, int(h * 0.22))

    tb_top = draw.textbbox((0, 0), title_top, font=font_top)
    tb_bot = draw.textbbox((0, 0), title_bottom, font=font_bottom)
    top_w = tb_top[2] - tb_top[0]
    top_h = tb_top[3] - tb_top[1]
    bot_w = tb_bot[2] - tb_bot[0]
    bot_h = tb_bot[3] - tb_bot[1]

    center_y = int(h * 0.44)
    title_x_top = (w - top_w) // 2
    title_x_bot = (w - bot_w) // 2

    # Color block behind title (classic exploitation poster)
    pad = int(h * 0.015)
    draw.rectangle(
        [title_x_top - pad * 2, center_y - pad, title_x_top + top_w + pad * 2, center_y + top_h + pad],
        fill=palette["bg"],
    )
    draw.text((title_x_top, center_y - pad // 2), title_top, fill=palette["fg"], font=font_top)

    center_y2 = center_y + top_h + pad * 3
    draw.rectangle(
        [title_x_bot - pad * 2, center_y2 - pad, title_x_bot + bot_w + pad * 2, center_y2 + bot_h + pad],
        fill=palette["accent"],
    )
    draw.text((title_x_bot, center_y2 - pad // 2), title_bottom, fill=palette["fg"], font=font_bottom)

    # Tagline — ajusta mida per entrar al 90% d'amplada
    tag_max_w = int(w * 0.9)
    tag_font = fit_text(draw, tagline, FONT_STENCIL, tag_max_w, int(h * 0.038))
    tag_y = center_y2 + bot_h + pad * 4
    draw.text((w // 2, tag_y), tagline, fill=palette["fg"], font=tag_font, anchor="mt")

    # Stars row amb fons negre perquè sempre sigui llegible
    if show_stars:
        star_text = "★ ★ ★  FREAKS  ★ ★ ★"
        star_font = ImageFont.truetype(FONT_IMPACT, int(h * 0.042))
        star_y = int(h * 0.13)
        tb = draw.textbbox((w // 2, star_y), star_text, font=star_font, anchor="mt")
        pad_x = int(w * 0.03)
        pad_y = int(h * 0.01)
        draw.rectangle(
            [tb[0] - pad_x, tb[1] - pad_y, tb[2] + pad_x, tb[3] + pad_y],
            fill=palette["fg"],
        )
        draw.text((w // 2, star_y), star_text, fill=palette["bg"], font=star_font, anchor="mt")

    # Footer text
    foot_font = ImageFont.truetype(FONT_IMPACT, int(h * 0.028))
    foot_y = h - band_h + int(band_h * 0.25)
    draw.text((int(w * 0.05), foot_y), footer_left, fill=palette["bg"], font=foot_font)
    draw.text((w - int(w * 0.05), foot_y), footer_right, fill=palette["bg"], font=foot_font, anchor="rt")

    # Dragon logo dins la banda superior, cantonada dreta (substitueix "FREAKS PRESENTA")
    if DRAGON_LOGO.exists():
        logo = Image.open(DRAGON_LOGO).convert("RGBA")
        target_h = int(band_h * 0.95)
        ratio = target_h / logo.height
        target_w = int(logo.width * ratio)
        logo = logo.resize((target_w, target_h), Image.LANCZOS)
        lx = w - target_w - int(w * 0.03)
        ly = (band_h - target_h) // 2
        canvas.paste(logo, (lx, ly), logo)

    return canvas.convert("RGB")


POSTER_STYLE = (
    "painted pulp poster art by Reynold Brown, halftone comic print dots texture, "
    "heavy film grain, saturated colors, cult b-movie exploitation aesthetic, "
    "dramatic red and yellow spotlight, no text, no letters, illustration only"
)


MONSTER_JOBS = [
    {
        "file": "promo_momia_post.jpg",
        "prompt": (
            "vintage 1959 Hammer Horror movie poster painted illustration, "
            "classic Egyptian mummy fully wrapped head to toe in many layers of tattered "
            "dusty cream colored bandages, only glowing eyes visible through bandaged face, "
            "bandages unraveling and hanging loose from arms, arms outstretched forward menacing pose, "
            "standing next to a vintage chrome barber chair, holding rusty old barber scissors, "
            + POSTER_STYLE
        ),
        "kicker": "UNA NIT · UNA CADIRA · UN FREAK",
        "title_top": "LA MÒMIA",
        "title_bottom": "ES TALLA A FREAKS",
        "tagline": "Reserva a Booksy. Si t'atreveixes.",
    },
    {
        "file": "promo_frankenstein_post.jpg",
        "prompt": (
            "vintage 1931 Universal horror movie poster painted illustration, "
            "Frankenstein's monster with flat head, bolts on neck, stitched green skin, "
            "sitting hunched in a classic chrome barber chair with a striped cape, "
            "long black hair being combed, sad menacing expression, "
            "dramatic lightning bolts in background, gothic laboratory feel, "
            + POSTER_STYLE
        ),
        "kicker": "EL MONSTRE TÉ HORA",
        "title_top": "FRANKENSTEIN",
        "title_bottom": "A FREAKS",
        "tagline": "Fet a mà. Fet a Gràcia.",
    },
    {
        "file": "promo_dracula_post.jpg",
        "prompt": (
            "vintage 1931 Bela Lugosi Dracula movie poster painted illustration, "
            "Count Dracula with slicked back black hair, pale skin, glowing red eyes, "
            "wearing black cape with high collar, red tuxedo, fangs bared, "
            "hypnotic stare, reaching out a pale hand toward viewer, "
            "gothic castle window at night, full moon, bats flying, "
            + POSTER_STYLE
        ),
        "kicker": "OBERT FINS TARD",
        "title_top": "DRÀCULA",
        "title_bottom": "VOL EL TEU COLL",
        "tagline": "Afaitat clàssic. Sense mirall.",
    },
    {
        "file": "promo_nosferatu_post.jpg",
        "prompt": (
            "vintage 1922 Nosferatu silent film style movie poster painted illustration, "
            "Count Orlok vampire with bald head, pointy rat ears, long bony fingers, "
            "two huge front fangs, deep sunken eyes, cadaverous pale skin, "
            "standing in a shadowy doorway, expressionist German horror style, "
            "creeping menacing silhouette, stark shadows, "
            + POSTER_STYLE
        ),
        "kicker": "NOMÉS NITS SENSE LLUNA",
        "title_top": "NOSFERATU",
        "title_bottom": "VE A FREAKS",
        "tagline": "L'afaitat més llarg de la teva vida.",
    },
    {
        "file": "promo_homellop_post.jpg",
        "prompt": (
            "vintage 1941 The Wolf Man movie poster painted illustration, "
            "classic werewolf with hairy face, long brown fur, wolf snout and fangs, "
            "pointed ears, yellow wild eyes, torn shirt, ripped dress pants, "
            "sharp claws, mid-transformation pose, howling at full moon, "
            "misty forest background at night, gothic horror atmosphere, "
            + POSTER_STYLE
        ),
        "kicker": "OBERT FINS QUE SURT LA LLUNA",
        "title_top": "L'HOME LLOP",
        "title_bottom": "TÉ HORA",
        "tagline": "Ningú talla millor sota la lluna plena.",
    },
]


async def get_bg_cached(cache_key: str, prompt: str, aspect: str = "square_1_1") -> bytes:
    """Retorna els bytes del fons. Si hi ha cache local, l'usa; si no, crida Freepik."""
    cache_file = CACHE / f"{cache_key}.jpg"
    if cache_file.exists():
        print(f"  (cache hit: {cache_key})")
        return cache_file.read_bytes()
    bg_bytes = await freepik_flux(prompt, aspect=aspect)
    cache_file.write_bytes(bg_bytes)
    return bg_bytes


async def generate_batch(only: list[str] | None = None) -> None:
    # ── Col·lecció de monstres — tots amb paleta groc Hammer ──
    for job in MONSTER_JOBS:
        if only and not any(k in job["file"] for k in only):
            continue
        print(f"→ Generant {job['title_top']}...")
        cache_key = job["file"].replace(".jpg", "")
        bg_bytes = await get_bg_cached(cache_key, job["prompt"])
        poster = compose_poster(
            bg_bytes=bg_bytes,
            size=(1080, 1080),
            palette=PALETTES["yellow_black"],
            kicker=job["kicker"],
            title_top=job["title_top"],
            title_bottom=job["title_bottom"],
            tagline=job["tagline"],
            footer_left="BOOKSY.COM/FREAKS",
            footer_right="GRÀCIA · BARCELONA",
        )
        out = OUTPUT / job["file"]
        poster.save(out, "JPEG", quality=92)
        print(f"  ✓ {out}")

    if only is not None:
        return

    # ── Ambient — El monstre de la llacuna negra (reutilitzem el fons per dues paletes) ──
    amb_prompt = (
        "vintage 1954 Creature from the Black Lagoon style movie poster illustration, "
        "classic gill-man sea monster with scaly green skin rising from murky black water, "
        "menacing pose, claws outstretched, dramatic moonlight, "
        "painted pulp horror poster style, heavy halftone grain, "
        "saturated color palette, 1950s exploitation b-movie aesthetic, "
        "no text, no letters, illustration only, full body monster shot"
    )
    amb_bg = await freepik_flux(amb_prompt, aspect="social_story_9_16")

    # Versió A — cian/rosa b-movie
    ambient_a = compose_poster(
        bg_bytes=amb_bg,
        size=(1080, 1920),
        palette=PALETTES["pink_cyan"],
        kicker="OPEN LATE",
        title_top="EL MONSTRE",
        title_bottom="DE GRÀCIA",
        tagline="Barberia de culte.",
        footer_left="C/ VERDI · BCN",
        footer_right="@FREAKSBARBER",
        show_stars=False,
    )
    ambient_a.save(OUTPUT / "ambient_monstre_story_bmovie.jpg", "JPEG", quality=92)
    print(f"✓ Story ambient (cian/rosa) → {OUTPUT / 'ambient_monstre_story_bmovie.jpg'}")

    # Versió B — groc/negre Hammer
    ambient_b = compose_poster(
        bg_bytes=amb_bg,
        size=(1080, 1920),
        palette=PALETTES["yellow_black"],
        kicker="OPEN LATE",
        title_top="EL MONSTRE",
        title_bottom="DE GRÀCIA",
        tagline="Barberia de culte.",
        footer_left="C/ VERDI · BCN",
        footer_right="@FREAKSBARBER",
        show_stars=False,
    )
    ambient_b.save(OUTPUT / "ambient_monstre_story_hammer.jpg", "JPEG", quality=92)
    print(f"✓ Story ambient (groc Hammer) → {OUTPUT / 'ambient_monstre_story_hammer.jpg'}")


if __name__ == "__main__":
    import sys
    # Ús: python3 generate_freaks_poster.py [frankenstein dracula nosferatu homellop]
    only = sys.argv[1:] if len(sys.argv) > 1 else None
    asyncio.run(generate_batch(only=only))
