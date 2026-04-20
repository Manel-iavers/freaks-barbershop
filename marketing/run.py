"""
FREAKS Barbershop — Generador de cartells estil freak pulp per Instagram.

Usa l'engine de la fàbrica (iavers-factory/core/skills/marketing-poster).
Definim només el manifest de marca i la llista de cartells; l'engine fa la resta.

Ús:
    python3 marketing/run.py                # tots
    python3 marketing/run.py frankenstein   # només un subset
"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

# Afegir l'engine de la fàbrica al path
FACTORY_SKILL = Path.home() / "projectes/iavers-factory/core/skills/marketing-poster"
sys.path.insert(0, str(FACTORY_SKILL))

from engine import BrandManifest, PosterJob, run_jobs  # noqa: E402

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parent

FREAKS = BrandManifest(
    name="FREAKS",
    logo_path=PROJECT / "public" / "images" / "dragon-transparent.png",
    palette="pulp_yellow",
    footer_left="BOOKSY.COM/FREAKS",
    footer_right="GRÀCIA · BARCELONA",
)

POSTER_STYLE = (
    "painted pulp poster art by Reynold Brown, halftone comic print dots texture, "
    "heavy film grain, saturated colors, cult b-movie exploitation aesthetic, "
    "dramatic red and yellow spotlight, no text, no letters, illustration only"
)

JOBS: list[PosterJob] = [
    PosterJob(
        file="promo_momia_post.jpg",
        prompt=(
            "vintage 1959 Hammer Horror movie poster painted illustration, "
            "classic Egyptian mummy fully wrapped head to toe in many layers of tattered "
            "dusty cream colored bandages, only glowing eyes visible through bandaged face, "
            "bandages unraveling and hanging loose from arms, arms outstretched forward menacing pose, "
            "standing next to a vintage chrome barber chair, holding rusty old barber scissors, "
            + POSTER_STYLE
        ),
        kicker="UNA NIT · UNA CADIRA · UN FREAK",
        title_top="LA MÒMIA",
        title_bottom="ES TALLA A FREAKS",
        tagline="Reserva a Booksy. Si t'atreveixes.",
    ),
    PosterJob(
        file="promo_frankenstein_post.jpg",
        prompt=(
            "vintage 1931 Universal horror movie poster painted illustration, "
            "Frankenstein's monster with flat head, bolts on neck, stitched green skin, "
            "sitting hunched in a classic chrome barber chair with a striped cape, "
            "long black hair being combed, sad menacing expression, "
            "dramatic lightning bolts in background, gothic laboratory feel, "
            + POSTER_STYLE
        ),
        kicker="EL MONSTRE TÉ HORA",
        title_top="FRANKENSTEIN",
        title_bottom="A FREAKS",
        tagline="Fet a mà. Fet a Gràcia.",
    ),
    PosterJob(
        file="promo_dracula_post.jpg",
        prompt=(
            "vintage 1931 Bela Lugosi Dracula movie poster painted illustration, "
            "Count Dracula with slicked back black hair, pale skin, glowing red eyes, "
            "wearing black cape with high collar, red tuxedo, fangs bared, "
            "hypnotic stare, reaching out a pale hand toward viewer, "
            "gothic castle window at night, full moon, bats flying, "
            + POSTER_STYLE
        ),
        kicker="OBERT FINS TARD",
        title_top="DRÀCULA",
        title_bottom="VOL EL TEU COLL",
        tagline="Afaitat clàssic. Sense mirall.",
    ),
    PosterJob(
        file="promo_nosferatu_post.jpg",
        prompt=(
            "vintage 1922 Nosferatu silent film style movie poster painted illustration, "
            "Count Orlok vampire with bald head, pointy rat ears, long bony fingers, "
            "two huge front fangs, deep sunken eyes, cadaverous pale skin, "
            "standing in a shadowy doorway, expressionist German horror style, "
            "creeping menacing silhouette, stark shadows, "
            + POSTER_STYLE
        ),
        kicker="NOMÉS NITS SENSE LLUNA",
        title_top="NOSFERATU",
        title_bottom="VE A FREAKS",
        tagline="L'afaitat més llarg de la teva vida.",
    ),
    PosterJob(
        file="promo_homellop_post.jpg",
        prompt=(
            "vintage 1941 The Wolf Man movie poster painted illustration, "
            "classic werewolf with hairy face, long brown fur, wolf snout and fangs, "
            "pointed ears, yellow wild eyes, torn shirt, ripped dress pants, "
            "sharp claws, mid-transformation pose, howling at full moon, "
            "misty forest background at night, gothic horror atmosphere, "
            + POSTER_STYLE
        ),
        kicker="OBERT FINS QUE SURT LA LLUNA",
        title_top="L'HOME LLOP",
        title_bottom="TÉ HORA",
        tagline="Ningú talla millor sota la lluna plena.",
    ),
]


if __name__ == "__main__":
    only = sys.argv[1:] if len(sys.argv) > 1 else None
    asyncio.run(
        run_jobs(
            brand=FREAKS,
            jobs=JOBS,
            output_dir=ROOT / "output",
            cache_dir=ROOT / "cache",
            only=only,
        )
    )
