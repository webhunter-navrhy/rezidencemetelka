# AI vizualizace interiéru vzorového bytu podle návrhu VDEKOR Interiors (19. 6. 2026). Jen ilustrační, bez textu.
import sys, shutil, time
from pathlib import Path
from gradio_client import Client
TOKEN = Path.home().joinpath('bobko-video/.hf_token').read_text().strip()
OUT = Path(__file__).resolve().parent.parent / '_research' / 'ai'
BASE = ("Photorealistic architectural interior photograph of a newly finished small modern Czech apartment, "
        "light oak herringbone parquet floor, warm greige cashmere-coloured matte flat-panel cabinetry, matte black metal accents, "
        "warm white walls, soft natural daylight, calm, elegant, quiet luxury, editorial interior photography, 35mm, no people, no text, no logos")
JOBS = [
 ("obyvak.png", BASE + ", open living room with kitchen: stone-coloured boucle three-seat sofa with rounded shapes, armchair of black oak with black woven paper rope seat, "
  "two round black tempered glass coffee tables on black steel, cream textured round rug, wall covered with subtle beige and grey geometric line wallpaper, "
  "slim black metal open shelves with beige papier-mache vases, black dome table lamp, white sheer voile curtains", 1344, 864, 11),
 ("jidelna.png", BASE + ", dining corner: round black glass dining table 120 cm with conical black base, four beige chenille upholstered chairs, "
  "three tall slim black-framed mirrors on the wall behind the table, greige handleless kitchen with stone countertop on the side, "
  "light from a large window", 1152, 1344, 7),
 ("loznice.png", BASE + ", bedroom: ecru upholstered low bed 180 cm with thick padded headboard, crisp white bedding, "
  "wallpaper behind the bed with soft oatmeal and white marble swirl pattern, round black glass side tables, black slim floor lamps on both sides, "
  "a black steel framed glass partition with grid muntins separating the bedroom from the bathroom, ecru curtains", 1344, 896, 5),
 ("koupelna.png", "Photorealistic architectural interior photograph of a small modern bathroom in a new Czech apartment, large cream matte 60x60 porcelain tiles on floor and walls, "
  "walk-in shower with black steel framed glass door with grid, matte black rain shower head and black mixer, wall-hung white toilet with matte black flush plate, "
  "white rectangular countertop basin on greige cashmere vanity, tall matte black faucet, black heated towel rail, warm soft lighting, quiet luxury, "
  "editorial interior photography, no people, no text, no logos", 896, 1152, 3),
 ("hala.png", BASE + ", entrance hall: solid oak bench with black frame and beige cushion, large round mirror with thin black frame, "
  "two small abstract paintings in black frames, black wooden wall hooks, built-in greige wardrobe, LED-lit geometric line wallpaper", 896, 1152, 9),
]
# Kvóta účtu bývá vyčerpaná: zkusí Krea s tokenem, Krea anonymně, pak Schnell anonymně.
KLIENTI = [("black-forest-labs/FLUX.1-Krea-dev", TOKEN, 28), ("black-forest-labs/FLUX.1-Krea-dev", None, 28), ("black-forest-labs/FLUX.1-schnell", None, 4)]
for name, prompt, w, h, seed in JOBS:
    if (OUT/name).exists(): continue
    for attempt in range(9):
        sp, tok, steps = KLIENTI[attempt % 3]
        try:
            c = Client(sp, token=tok) if tok else Client(sp)
            kw = dict(guidance_scale=4.5) if "Krea" in sp else {}
            r = c.predict(prompt=prompt, seed=seed, randomize_seed=False, width=w, height=h, num_inference_steps=steps, api_name="/infer", **kw)
            src = r[0] if isinstance(r,(list,tuple)) else r
            src = src.get("path") if isinstance(src, dict) else src
            shutil.copy(src, OUT/name); print("ok", name, sp, flush=True); break
        except Exception as e:
            print("err", name, sp, str(e)[:160], flush=True); time.sleep(5 if attempt % 3 != 2 else 60)
