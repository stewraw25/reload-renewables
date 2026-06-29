#!/usr/bin/env python3
"""
=============================================================================
LOCKED FINAL VERSION - DO NOT MODIFY OR RE-RUN UNTIL USER EXPLICITLY REQUESTS
=============================================================================

Small Logo / Branding Stamp Generator for Reload Renewables & AC
Produces assets/images/logo-reload-stamp.png (and .jpg)

CURRENT STATE IS LOCKED (as of latest user confirmation "Small logo looks perfect lets lock this in now"):
- Matches the final approved reference image provided by user (including thicker cyan ring ~20px, color (0,97,187), & AC matching ring blue)
- Brighter yellow outer ring: (255, 212, 81)
- Cream outer: (253, 249, 233)
- Royal blue ring: (0, 97, 187)
- Text: large RELOAD (bottom at vertical center of black circle), "Renewables & AC" with & AC in blue
- Battery: exact crop from reference + boosted, positioned as final approved
- All radii, fonts (265pt RELOAD / ~111pt sub), gaps, positioning locked
- Used as the repeatable branding stamp for t-shirts/vans + site-wide "dotted" use (now additionally placed as bullet points and decorative icons in more sections)

DO NOT:
- Change any color values, radii (OUTER/YELLOW/BLUE/BLACK_R), font sizes, reload_y/sub_y/batt_cy
- Re-run this script or edit the output PNG/JPG
- Update v= in HTML until user says to unlock and iterate again

If changes are needed later, user will say so explicitly.

=============================================================================
"""

"""
Small Logo / Branding Stamp Generator for Reload Renewables & AC
Produces assets/images/logo-reload-stamp.png (and .jpg)

Replicates the user's provided reference layout as closely as possible (LOCKED STATE - see big warning above):
- 1024x1024 solid pure white RGB background (no alpha, no checkerboard, corners exactly 255,255,255)
- Concentric rings: thick outer cream/white glow ring (253,249,233), brighter golden yellow ring (255,212,81 from reference), THICKER cyan/blue ring (0, 97, 187, ~20px thick to match user's new reference image), solid black center
- Very large white "RELOAD" (all caps) in DIN Condensed Bold (size kept to fill circle well)
- "Renewables & AC" below sized so its width start/end aligns with RELOAD; "Renewables" white, "& AC" in the blue ring color
- All text moved up so the BOTTOM of the large RELOAD text sits at the vertical center of the logo (RELOAD mostly above center, sub below but block higher overall)
- Horizontal full battery emoji (exact crop + brightened) moved up slightly to maintain spacing under the higher text block
- Matches attached reference for overall look, battery brightness, alignment, and ring structure

Usage:
  python3 generate-small-logo.py
Then: hard refresh all tabs (Cmd+Shift+R), open PNG in Preview, update HTML v= across pages.

This matches the long-standing requirements for t-shirts/vans/merch stamp + site-wide dotted use (nav, cards, footers, "THE RELOAD DIFFERENCE", etc).

*** LOCKED - DO NOT EDIT OR RE-RUN THIS SCRIPT OR THE OUTPUT FILES UNTIL USER REQUESTS ***
"""

from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import os

# Output
OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "images")
os.makedirs(OUT_DIR, exist_ok=True)
PNG_PATH = os.path.join(OUT_DIR, "logo-reload-stamp.png")
JPG_PATH = os.path.join(OUT_DIR, "logo-reload-stamp.jpg")

SIZE = 1024
WHITE_BG = (255, 255, 255)

# Ring colors sampled/ matched to user's reference image [Image #1]
# Using the nicer/brighter yellow from the attached reference (255,212,81) as requested
CREAM = (253, 249, 233)      # outer cream/white glow ring (exact from ref)
YELLOW = (255, 212, 81)      # brighter golden yellow ring (exact brighter shade from ref)
BLUE = (0, 97, 187)          # royal blue ring color (exact from ref sampling (0,97,187))
BLACK = (0, 0, 0)

# Radii tuned to match the attached reference image proportions.
# Made the cyan/blue ring THICKER (20px instead of ~8px) to match the thicker cyan ring in the user's new reference image.
# Color kept as (0,97,187) which matches the sampled blue in the desired image.
# Text sizes and positions kept to fit inside the black.
OUTER_R = 490
YELLOW_R = 460
BLUE_R = 432
BLACK_R = 412

# Text - pushed much larger to fill almost as much of the black circle as possible (per attached reference).
# RELOAD nearly touches blue ring left/right and top; sub sized to match width exactly (start/end alignment).
try:
    RELOAD_FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", 265)
except Exception as e:
    print("Font warning:", e)
    RELOAD_FONT = ImageFont.load_default()

def draw_horizontal_battery(draw, cx, cy, w=115, h=36, fill=(52, 199, 89)):
    """
    Draw horizontal battery to closely match the attached reference image emoji battery.
    Elongated green body, two white charge stripes on left, bold lightning bolt, small terminal on right with cap.
    Clean, professional, not "kids drawing". Brighter green for full emoji pop.
    """
    left = cx - w // 2
    top = cy - h // 2
    right = cx + w // 2
    bottom = cy + h // 2

    # Terminal on right - small rounded protrusion with light cap detail
    tw = 10
    th = int(h * 0.6)
    draw.rounded_rectangle([right - 1, cy - th//2, right + tw, cy + th//2], radius=2, fill=(200, 200, 200))
    # Small inner cap highlight
    draw.rounded_rectangle([right + 2, cy - th//3, right + tw - 1, cy + th//3], radius=1, fill=(240, 240, 240))

    # Main green body
    body_right = right - 1
    draw.rounded_rectangle([left, top, body_right, bottom], radius=5, fill=fill)

    # White lightning bolt - shaped to match reference (sharp, centered in right half)
    s = h / 36.0
    bx = cx + 2
    bolt = [
        (bx - 8*s, cy - 6*s),
        (bx + 2*s, cy - 6*s),
        (bx - 3*s, cy + 0*s),
        (bx + 8*s, cy + 0*s),
        (bx - 3*s, cy + 8*s),
        (bx + 0*s, cy + 2*s),
        (bx - 8*s, cy + 2*s),
    ]
    draw.polygon(bolt, fill=(255, 255, 255))

    # Two white charge stripes on left side (like the reference)
    stripe_left = left + 10
    stripe_right = left + 20
    for sy in (-5, 5):
        draw.line([(stripe_left, cy + sy), (stripe_right, cy + sy)], fill=(255, 255, 255), width=3)

def main():
    img = Image.new("RGB", (SIZE, SIZE), WHITE_BG)
    draw = ImageDraw.Draw(img)

    cx = cy = SIZE // 2

    # === RINGS (outside -> in) to match reference exactly ===
    # Thick outer cream ring (the white-ish halo/glow border)
    draw.ellipse([cx - OUTER_R, cy - OUTER_R, cx + OUTER_R, cy + OUTER_R], fill=CREAM)
    # Golden yellow ring
    draw.ellipse([cx - YELLOW_R, cy - YELLOW_R, cx + YELLOW_R, cy + YELLOW_R], fill=YELLOW)
    # Royal blue ring (user wants & AC text to match this blue)
    draw.ellipse([cx - BLUE_R, cy - BLUE_R, cx + BLUE_R, cy + BLUE_R], fill=BLUE)
    # Black center fill
    draw.ellipse([cx - BLACK_R, cy - BLACK_R, cx + BLACK_R, cy + BLACK_R], fill=BLACK)

    # === TEXT (large per reference) ===
    # ALL text moved up: bottom of RELOAD now at center line of logo.
    # "Renewables & AC" moved closer upwards to RELOAD (smaller gap), battery left where it is.
    # No overlap. Sub width still matches RELOAD start/end. & AC in blue.
    reload_text = "RELOAD"
    reload_bbox = draw.textbbox((0, 0), reload_text, font=RELOAD_FONT)
    reload_w = reload_bbox[2] - reload_bbox[0]
    # Move ALL text up so that the BOTTOM of the large RELOAD text is at the vertical center of the logo (cy).
    # "Renewables & AC" brought closer up to RELOAD (gap reduced), battery position unchanged.
    # Effective offset tuned from actual render (bbox overestimates; use ~57px so bottom lands at 512).
    reload_y = cy - 57
    draw.text((cx, reload_y), reload_text, font=RELOAD_FONT, fill=(255, 255, 255), anchor="mm")

    # Sub line: find SUB size so "Renewables & AC" rendered width closely matches RELOAD width (left/right in keeping)
    renew_part = "Renewables "
    ac_part = "& AC"
    sub_font_size = 75
    SUB_FONT = None
    for _ in range(18):
        try:
            test_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", sub_font_size)
        except:
            test_font = ImageFont.load_default()
        rbb = draw.textbbox((0, 0), renew_part, font=test_font)
        abb = draw.textbbox((0, 0), ac_part, font=test_font)
        tw = (rbb[2]-rbb[0]) + (abb[2]-abb[0])
        if abs(tw - reload_w) < 18:
            SUB_FONT = test_font
            break
        if tw < reload_w:
            sub_font_size += 2
        else:
            sub_font_size -= 1
    if SUB_FONT is None:
        try:
            SUB_FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", sub_font_size)
        except:
            SUB_FONT = ImageFont.load_default()
    print(f"Using SUB_FONT size={sub_font_size} for width match (RELOAD w={reload_w})")

    sub_y = reload_y + 80  # reduced gap to move "Renewables & AC" closer upwards to RELOAD (battery position left unchanged as requested)
    renew_bbox = draw.textbbox((0, 0), renew_part, font=SUB_FONT)
    renew_w = renew_bbox[2] - renew_bbox[0]
    ac_bbox = draw.textbbox((0, 0), ac_part, font=SUB_FONT)
    ac_w = ac_bbox[2] - ac_bbox[0]
    total_sub_w = renew_w + ac_w
    sub_x = cx - total_sub_w // 2
    draw.text((sub_x, sub_y), renew_part, font=SUB_FONT, fill=(255, 255, 255), anchor="lt")
    # Explicitly set & AC to the exact outer ring blue (0, 97, 187) to match the circle as requested
    draw.text((sub_x + renew_w, sub_y), ac_part, font=SUB_FONT, fill=(0, 97, 187), anchor="lt")

    # === BATTERY: EXACT crop from the user's attached good reference image + color boost for bright/full emoji green ===
    # This is "the emoji battery we have used" - pixel perfect from the image (not drawn/kids version).
    # Brighter green + full colors via enhance so it pops like in the screenshot. Full visible, no cutoff.
    ref_path = os.path.join(OUT_DIR, "good-small-reference.png")
    if os.path.exists(ref_path):
        ref_img = Image.open(ref_path).convert("RGBA")
        # Crop the exact good battery from the reference (refined bbox from pixel probe)
        battery_crop = ref_img.crop((418, 718, 573, 824))
        # Scale (ref ~1013px, our 1024); make a bit larger per "soo small" + previous enlarge requests
        scale = 1024 / 1013.0
        new_batt_h = int(118 * scale)
        new_batt_w = int(170 * scale)
        battery = battery_crop.resize((new_batt_w, new_batt_h), Image.LANCZOS)
        # Boost saturation/brightness/contrast so green is vivid and full emoji colours come through (not muted)
        battery = ImageEnhance.Color(battery).enhance(1.42)
        battery = ImageEnhance.Brightness(battery).enhance(1.16)
        battery = ImageEnhance.Contrast(battery).enhance(1.08)
        # Position: centered x. ONLY battery moved down slightly (per request) to be more central between bottom of Renewables text (~613) and bottom of black circle (~924).
        # Target battery center ~745. Text and everything else unchanged.
        # Battery size/brightness kept exactly as approved.
        batt_cx = cx
        batt_cy = int(cy + 232 * scale)
        pos_x = batt_cx - new_batt_w // 2
        pos_y = batt_cy - new_batt_h // 2
        img.paste(battery, (pos_x, pos_y), battery)  # use alpha mask for clean edges
    else:
        # Fallback (should not happen) - bright emoji green
        draw_horizontal_battery(draw, cx, cy + 155, w=118, h=38, fill=(52, 199, 89))

    # Save
    img.save(PNG_PATH, "PNG")
    print(f"Saved {PNG_PATH} size={img.size} mode={img.mode}")

    img.save(JPG_PATH, "JPEG", quality=95)
    print(f"Saved {JPG_PATH}")

    # Verify solid white corners (critical - no checkerboard/alpha ever again)
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((SIZE-1, 0)),
        img.getpixel((0, SIZE-1)),
        img.getpixel((SIZE-1, SIZE-1)),
    ]
    print(f"Corner samples (must all be pure white 255,255,255): {corners}")
    assert all(c == WHITE_BG for c in corners), "ERROR: corners are not solid white!"

    # Sample ring colors in output for sanity
    print(f"Blue ring sample (should be close to {BLUE}): {img.getpixel((cx + BLUE_R - 5, cy))}")
    print(f"Yellow ring sample (should be close to {YELLOW}): {img.getpixel((cx + YELLOW_R - 5, cy))}")
    print(f"Black center sample: {img.getpixel((cx - 10, cy))}")

    print("Done. Update v= in HTML files, hard-refresh Safari, open PNG in Preview to compare to your reference.")

if __name__ == "__main__":
    main()
