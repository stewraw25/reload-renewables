#!/usr/bin/env python3
"""Check robots.txt and sitemap lastmod against files in this repo.

Does not fetch the live site. Does not add a CNAME or change a domain.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://stewraw25.github.io/reload-renewables/"
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
EXCLUDED = ("404.html", "our-work.html", "projects.html")


def main() -> int:
    errors = []
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Allow: /" not in robots:
        errors.append("robots.txt is missing Allow: /")
    if "Sitemap: " + BASE + "sitemap.xml" not in robots:
        errors.append("robots.txt sitemap URL is not the GitHub Pages sitemap")
    if re.search(r"(?i)\bCNAME\b", robots) and "Do not add a CNAME" not in robots:
        errors.append("robots.txt mentions a CNAME outside the do-not-add note")
    if "CNAME" in {p.name for p in ROOT.iterdir()}:
        errors.append("a CNAME file is present")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    locs = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    mods = re.findall(r"<lastmod>([^<]+)</lastmod>", sitemap)
    if len(locs) != len(mods):
        errors.append("a url is missing lastmod")
    for loc, mod in zip(locs, mods):
        if not DATE.match(mod):
            errors.append(f"lastmod is not YYYY-MM-DD: {loc} {mod}")
        if not loc.startswith(BASE):
            errors.append(f"loc is outside the GitHub Pages site: {loc}")
        rel = loc[len(BASE):]
        path = ROOT / ("index.html" if rel in ("", "/") else rel)
        if not path.is_file():
            errors.append(f"sitemap loc has no file: {loc}")
        name = path.name
        if name in EXCLUDED:
            errors.append(f"noindex page is in the sitemap: {name}")
    listed = {Path(loc[len(BASE):] or "index.html").name for loc in locs}
    for name in EXCLUDED:
        if name in listed:
            errors.append(f"{name} should stay out of the sitemap")
        text = (ROOT / name).read_text(encoding="utf-8")
        if 'name="robots" content="noindex' not in text:
            errors.append(f"{name} is missing noindex")

    if errors:
        print("\n".join(errors))
        return 1
    print(f"ok: {len(locs)} urls, lastmod dates valid, excluded pages stay out")
    return 0


if __name__ == "__main__":
    sys.exit(main())
