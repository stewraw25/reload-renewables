#!/usr/bin/env python3
"""
Main Logo Generator for Reload Renewables & AC
Produces assets/images/logo-main.png (and .jpg)

HIGH-RES RENDER FIX (addresses "main logo text looks very pixilated especially the future looks bright part"):
- RENDER_SCALE = 4: all fonts/gaps/pad/radius/battery target rendered 4x larger internally.
- Previous source was only 196x120 (tiny fonts 57/28/11pt) → massive CSS upscale caused blocky/pixelated text (strapline worst, then Renewables & AC).
- Now outputs ~784x480 high-res PNG; browser downscales to display size for crisp vector-like text while preserving 100% identical layout, spacing, proportions, battery placement, blue, crop etc.
- "didnt look like that b4" was likely due to the post-crop tiny canvas + reduced strap pt size.

LAYOUT (per user reference image + instructions):
- Black rounded rectangular "pill" container with a single thinner cyan blue band directly around it (exact color (0,97,187) from the locked small circular stamp; yellow and cream removed per feedback as yellow was disliked and cream read as white banner/not showing on dark hero).
- The blue ring frames the black pill (battery + text) with transparent outside the blue for clean overlay on the dark hero video.
- Nicely rounded edges with PNG transparency in corners for clean curved appearance over the hero
- Vertical green battery EMOJI on the LEFT of "Reload" (position as in image, close to it), same height as the R in Reload. Crop from locked stamp expanded for perfect full emoji (no sharp cutoff on the positive/terminal top end after rotation).
- "Reload" (title case) in large white DIN Condensed Bold, dominant / bigger but narrower, to the right of battery
- "Renewables & AC" below, smaller font, left-shifted so starts under battery area, a bit longer each side than "Reload", with "& AC" in the small logo's outer blue (0,97,187) for brand consistency across logos
- "Future Looks Bright..." strapline in smaller green (to match battery green), italic, SPACED AWAY (larger gap) underneath the subline
- All wording grouped tightly together, centered as a block in the pill
- Overall height kept compact

Run: python3 generate-main-logo.py
Then hard-refresh browser (Cmd+Shift+R) and re-open in Preview to verify.

Matches: current LOCKED small stamp text hierarchy (large dominant name over sub-line + small battery) adapted to main wide hero logo. Battery graphic pulled from the locked small stamp for consistency. Ignore white square in ref image (just for positioning highlight).
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Output paths
OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "images")
os.makedirs(OUT_DIR, exist_ok=True)
PNG_PATH = os.path.join(OUT_DIR, "logo-main.png")
JPG_PATH = os.path.join(OUT_DIR, "logo-main.jpg")

# DYNAMIC TIGHT CROP FOR BLACK PILL (this is the "crop the outer BLACK background" change - redone properly this time):
# We calculate the bounding box of the actual logo elements (battery + Reload + sub + strap),
# add padding, set canvas to that size, draw rounded black rect filling the canvas.
# This crops away extra black padding so the black bg is tight around the content, with nicely rounded curved edges.
# PNG will have transparent corners outside the rounded rect for clean rounded appearance on dark hero.
# To see exactly where altered: search for "DYNAMIC TIGHT BLACK PILL CROP" in this file (the bbox + offset + canvas creation after element sizes).

# HIGH-RES SCALE for sharp text (fixes pixelation on upscaled display). All layout numbers that affect final pixel count are multiplied by this.
RENDER_SCALE = 4
RADIUS = 20 * RENDER_SCALE  # radius for the rounded black pill - scaled for high-res output + nicer curves at final size
# The old fixed values are no longer used for canvas size (see main() for dynamic calc)
# WIDTH = 900
# HEIGHT = 200
# MARGIN = 8

# Brand colors
BLUE = (0, 97, 187)             # match the small logo's outer cyan/royal blue ring (0,97,187) for consistent "& AC" color across both logos
WHITE = (255, 255, 255, 255)
BLACK = (0, 0, 0, 255)
GREEN = (52, 199, 89, 255)      # emoji green #34C759
CREAM = (253, 249, 233)         # outer glow ring - match the locked small circular stamp exactly
YELLOW = (255, 212, 81)         # golden yellow ring - match the locked small circular stamp exactly

# Concentric branding rings/bands around the black pill content (high-res px).
# Blue band around the black pill + yellow band around the blue (exact colors from locked small stamp).
# Cream outer removed per feedback (it was reading as a "white outer banner" over the dark hero and not showing well).
# Blue made thinner as requested. Yellow kept for the halo match to the circular stamp.
BLUE_BORDER = 18
YELLOW_BORDER = 0
CREAM_BORDER = 0

# Fonts - exact DIN Condensed Bold as used historically for this branding
# *RENDER_SCALE for high pixel density (eliminates pixelation on strapline "Future Looks Bright..." and sub "Renewables & AC" when CSS displays the PNG)
try:
    RELOAD_FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", 57 * RENDER_SCALE)  # tiny bit narrower still (user: shorten "Reload" a tiny bit more than 60pt)
    RENEW_FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", 28 * RENDER_SCALE)
    STRAP_FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Narrow Italic.ttf", 11 * RENDER_SCALE)  # smaller + italic (user request: "Future Looks Bright..." too big, make smaller text and ensure italics)
except Exception as e:
    print("Font load warning:", e)
    RELOAD_FONT = ImageFont.load_default()
    RENEW_FONT = ImageFont.load_default()
    STRAP_FONT = ImageFont.load_default()

def draw_rounded_rect(draw, xy, radius, fill):
    """Helper for rounded rectangle"""
    draw.rounded_rectangle(xy, radius=radius, fill=fill)

def draw_vertical_battery(draw, cx, cy, width=96, height=256, fill=GREEN):
    """
    Draw a clean vertical battery icon matching emoji style (standing).
    Height set to exactly match capital 'R' from Reload font (same size as R per user request).
    Includes terminal nub on top + lightning + charge bars.
    Called only in fallback (stamp missing); primary path uses pasted high-res crop from locked small stamp.
    """
    w, h = width, height
    left = cx - w // 2
    top = cy - h // 2

    # Terminal (top nub) - light gray (scaled)
    tw = w // 2 + 8
    th = 28
    t_left = cx - tw // 2
    draw_rounded_rect(draw, [t_left, top - th + 4, t_left + tw, top + 8], 8, (210, 210, 210, 255))

    # Main body
    body_top = top + 4
    draw_rounded_rect(draw, [left, body_top, left + w, top + h - 4], 20, fill)

    # Lightning bolt (white, bold) - s normalizes so it scales with passed h
    s = h / 256.0
    bolt = [
        (cx - 14*s, cy - 52*s),
        (cx + 24*s,   cy - 4*s),
        (cx + 2*s, cy - 4*s),
        (cx + 16*s,   cy + 60*s),
        (cx - 16*s,   cy + 4*s),
        (cx + 2*s, cy + 4*s),
    ]
    draw.polygon(bolt, fill=WHITE)

    # Charge level stripes (white, thin, rounded) - relative to h
    bar_inset = max(8, int(w * 0.12))
    bar_h = max(6, int(h * 0.025))
    y1 = body_top + h * 0.22
    y2 = body_top + h * 0.48
    y3 = body_top + h * 0.74
    for yy in (y1, y2, y3):
        draw_rounded_rect(draw, [left + bar_inset, yy, left + w - bar_inset, yy + bar_h], 3, WHITE)

def main():
    # === LAYOUT CALCS (per new reference image) ===
    # DYNAMIC TIGHT BLACK PILL CROP (THE CHANGE for "crop the outer BLACK background" - this is where it was altered):
    # Compute positions first (using dummy large cx for relative layout),
    # then find actual bounding box of all elements (battery, Reload, sub, strap),
    # add padding for the black bg, set canvas W/H to that + rounded rect.
    # This crops the black bg tight around the logo content (no large outer black areas like before),
    # and the edges are nicely rounded (RADIUS) with PNG transparency outside the rounded area.
    # (Previous attempts used fixed canvas like 884x184 or 900x200, leaving large black padding around the actual text/emoji - that's why it looked no different.)
    # The rest of layout (battery left of Reload per image, sub longer each side, strap spaced + green italic) unchanged.
    # To see the alteration: search this file for "DYNAMIC TIGHT BLACK PILL CROP" or "content_left".

    # Element sizes (independent of position)
    # Use a temporary draw just for measuring bboxes (real draw created later after deciding canvas size)
    temp_img = Image.new("RGBA", (10, 10), (0, 0, 0, 0))
    temp_draw = ImageDraw.Draw(temp_img)
    reload_text = "Reload"
    reload_bbox = temp_draw.textbbox((0, 0), reload_text, font=RELOAD_FONT)
    reload_w = reload_bbox[2] - reload_bbox[0]
    reload_h = reload_bbox[3] - reload_bbox[1]

    renew_text = "Renewables "
    and_ac_text = "& AC"
    renew_bbox = temp_draw.textbbox((0, 0), renew_text, font=RENEW_FONT)
    renew_w = renew_bbox[2] - renew_bbox[0]
    renew_h = renew_bbox[3] - renew_bbox[1]
    and_bbox = temp_draw.textbbox((0, 0), and_ac_text, font=RENEW_FONT)
    and_w = and_bbox[2] - and_bbox[0]

    strap_text = "Future Looks Bright..."
    strap_bbox = temp_draw.textbbox((0, 0), strap_text, font=STRAP_FONT)
    strap_w = strap_bbox[2] - strap_bbox[0]
    strap_h = strap_bbox[3] - strap_bbox[1]

    # Battery size (from locked small stamp)
    # batt_target_h set exactly to reload_h so the vertical battery emoji is the same height as the capital 'R' in "Reload"
    # (high-res via LANCZOS resize from locked stamp crop)
    batt_target_h = reload_h  # exactly same height as the capital R in "Reload" (per user request for battery emoji size)
    small_stamp_path = os.path.join(OUT_DIR, "logo-reload-stamp.png")
    battery_final = None
    if os.path.exists(small_stamp_path):
        small = Image.open(small_stamp_path).convert("RGBA")
        # Tight crop around the actual battery emoji content (from analysis of locked stamp) + small safety pad.
        # This ensures when resized to exactly reload_h (same height as R), the *emoji itself* fills the full target height
        # (no extra padding making it smaller), making the battery emoji the same visual size as the R, while still
        # fully including the terminal without cutoff.
        # Tight crop around the actual battery emoji content (from analysis of locked stamp) + small safety pad.
        # This ensures when resized to exactly reload_h, the *emoji itself* (not padded graphic) fills the full height,
        # making the battery emoji the same visual size as the R.
        battery_crop = small.crop((425, 684, 600, 808))
        battery_rot = battery_crop.rotate(90, expand=True)
        scale = batt_target_h / battery_rot.height
        new_w = int(battery_rot.width * scale)
        battery_final = battery_rot.resize((new_w, batt_target_h), Image.LANCZOS)
        batt_w = battery_final.width
        batt_h = battery_final.height
    else:
        batt_h = reload_h  # exactly same height as the capital R in "Reload"
        batt_w = max(22, int(batt_h * 0.37))

    # Relative positions (dummy large cx so no negative during calc; will shift later)
    dummy_cx = 10000
    gap_batt_text = 8 * RENDER_SCALE   # scaled to keep exact same visual gap ratio at high-res
    reload_y = 0  # relative top of content

    # Battery LEFT of Reload (per reference)
    group_w = batt_w + gap_batt_text + reload_w
    group_left = dummy_cx - group_w // 2
    batt_cx = group_left + batt_w // 2
    reload_x = group_left + batt_w + gap_batt_text
    batt_cy = reload_y + (reload_h // 2)

    # Sub left-shifted under battery area, longer each side than Reload
    left_shift = batt_w // 2 + 5 * RENDER_SCALE   # scaled additive to preserve approved positioning
    sub_center = reload_x + reload_w // 2 - left_shift
    renew_x = sub_center - (renew_w + and_w) // 2
    renew_y = reload_y + reload_h + (1 * RENDER_SCALE)   # scaled vertical gap (was +1)

    # Strap centered to group, spaced away
    strap_y = renew_y + renew_h + (10 * RENDER_SCALE)   # scaled vertical gap (was +10) to keep "spaced away" proportion
    strap_x = dummy_cx - strap_w // 2

    # Now compute actual content bbox from the relative positions
    content_left = min( batt_cx - batt_w//2 , reload_x , renew_x , strap_x )
    content_right = max( batt_cx + batt_w//2 , reload_x + reload_w , renew_x + renew_w + and_w , strap_x + strap_w )
    content_top = min( batt_cy - batt_h//2 , reload_y , renew_y , strap_y )
    content_bottom = max( batt_cy + batt_h//2 , reload_y + reload_h , renew_y + renew_h , strap_y + strap_h )

    pad = 20 * RENDER_SCALE  # padding around content *inside the black area* (gives room for rounded edges) - scaled for high-res + to keep relative pad at final display size
    W = int(content_right - content_left + 2 * pad)  # W/H here = size of the inner BLACK pill area
    H = int(content_bottom - content_top + 2 * pad)

    # Offset to place content with padding, and make min at pad (relative to the black area [0,0,W,H])
    offset_x = pad - content_left
    offset_y = pad - content_top

    # Apply offsets to all positions (still relative to black 0,0 for now)
    reload_x += offset_x
    reload_y += offset_y
    batt_cx += offset_x
    batt_cy += offset_y
    pos_x = batt_cx - batt_w // 2   # for paste
    pos_y = batt_cy - batt_h // 2
    # Small downward nudge (battery only) to give the top of the terminal/positive end *extra* black margin inside the black area
    # before the blue ring. With exact same height as R (batt_target_h = reload_h) + tight crop, this keeps the
    # *entire* emoji perfectly visible with no cropping or sharp cutoff on the top (terminal end). 
    # Nudge reduced (battery moved UP slightly) so its bottom no longer overlaps the "R" of "Renewables" below.
    pos_y += 4
    renew_x += offset_x
    renew_y += offset_y
    strap_x += offset_x
    strap_y += offset_y

    # === BLUE RING SURROUND (matching the locked small circular stamp blue ring) ===
    # Blue band directly around the black pill (thinned per feedback). Yellow and cream fully removed.
    # Transparent outside the blue ring for clean overlay on the dark hero. 
    # Black area (W x H) is inset by the blue; content is shifted into it.
    ring_total = CREAM_BORDER + YELLOW_BORDER + BLUE_BORDER
    final_w = W + 2 * ring_total
    final_h = H + 2 * ring_total
    black_offset = ring_total  # the black pill rect starts at this inset in the final canvas

    # Shift all content positions so they land inside the black rect (which is now offset from canvas 0,0)
    reload_x += black_offset
    reload_y += black_offset
    batt_cx += black_offset
    batt_cy += black_offset
    pos_x += black_offset
    pos_y += black_offset
    renew_x += black_offset
    renew_y += black_offset
    strap_x += black_offset
    strap_y += black_offset

    # NOW create the larger canvas sized to the outer ring
    img = Image.new("RGBA", (final_w, final_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw concentric rings from outside in (blue band directly around the black pill, transparent outside the blue).
    # Yellow removed per feedback. Blue is the direct surround matching the small stamp's blue ring (thinned).
    # No cream. 
    # The blue ring frames the black content area.
    blue_r = RADIUS + BLUE_BORDER
    draw_rounded_rect(draw, [0, 0, final_w - 1, final_h - 1], blue_r, BLUE)

    black_inset = BLUE_BORDER
    black_r = RADIUS  # keep the tight inner black corner radius the user approved
    # Black rect exactly matches the old (W, H) size, positioned at black_offset
    draw_rounded_rect(draw, [black_inset, black_inset, black_inset + W - 1, black_inset + H - 1], black_r, BLACK)

    # Paste the real emoji battery (LEFT of the Reload text, as per reference image)
    if battery_final is not None:
        img.paste(battery_final, (pos_x, pos_y))
    else:
        draw_vertical_battery(draw, batt_cx, batt_cy, width=batt_w, height=batt_h, fill=GREEN)

    # Draw Reload (white, large)
    draw.text((reload_x, reload_y), reload_text, font=RELOAD_FONT, fill=WHITE)

    # Renewables & AC ...
    draw.text((renew_x, renew_y), renew_text, font=RENEW_FONT, fill=WHITE)
    draw.text((renew_x + renew_w, renew_y), and_ac_text, font=RENEW_FONT, fill=BLUE)

    # Strapline ...
    draw.text((strap_x, strap_y), strap_text, font=STRAP_FONT, fill=GREEN)

    # Save PNG (with alpha for clean rounded shape)
    img.save(PNG_PATH, "PNG")
    print(f"Saved {PNG_PATH}  size={img.size}  mode={img.mode}")

    # Also save JPG (flattened, with the same concentric rings as PNG for consistency/exports; note the site uses the PNG for the transparent rounded outer yellow ring effect over the hero)
    jpg_img = Image.new("RGB", (final_w, final_h), BLUE)
    jpg_draw = ImageDraw.Draw(jpg_img)
    # Blue as the outer ring (no yellow/cream), black inset
    black_inset = BLUE_BORDER
    black_r = RADIUS
    jpg_draw.rounded_rectangle([black_inset, black_inset, black_inset + W - 1, black_inset + H - 1], radius=black_r, fill=(0, 0, 0))
    # Paste the exact same emoji battery graphic (from small stamp) for consistency
    if battery_final is not None:
        batt_jpg = battery_final.convert("RGB")
        jpg_img.paste(batt_jpg, (pos_x, pos_y))
    else:
        draw_vertical_battery(jpg_draw, batt_cx, batt_cy, width=batt_w, height=batt_h, fill=(52, 199, 89))
    # Texts
    jpg_draw.text((reload_x, reload_y), reload_text, font=RELOAD_FONT, fill=(255, 255, 255))
    jpg_draw.text((renew_x, renew_y), renew_text, font=RENEW_FONT, fill=(255, 255, 255))
    jpg_draw.text((renew_x + renew_w, renew_y), and_ac_text, font=RENEW_FONT, fill=BLUE)  # match small logo's outer blue (0,97,187) for consistency
    jpg_draw.text((strap_x, strap_y), strap_text, font=STRAP_FONT, fill=(52, 199, 89))  # green to match battery
    jpg_img.save(JPG_PATH, "JPEG", quality=95)
    print(f"Saved {JPG_PATH}  size={jpg_img.size}")

    # Quick pixel sanity at corners (outside the outer cream ring should be transparent in png; jpg has cream as outer)
    px = img.getpixel((2, 2))
    print(f"PNG corner (2,2) sample (expect near transparent): {px}")
    px2 = jpg_img.getpixel((2, 2))
    print(f"JPG corner (2,2) sample (expect cream or ring color): {px2}")

    print("Done. High-res (4x) + blue ring only, battery exact same height as R + moved up slightly (nudge +4) so not overlapping Renewables R. Update HTML v=, open Preview + Safari, Cmd+Shift+R.")

if __name__ == "__main__":
    main()
