#!/usr/bin/env python3
"""Check internal links, image alt text, titles, descriptions and banned phrases.

Reads the HTML files in this repo. Does not fetch the live site.
"""
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUPERLATIVES = re.compile(
    r"\b(?:best|leading|unmatched|unrivalled|unrivaled|premier|world-class|"
    r"award-winning|top-rated|number one|most popular)\b|#1",
    re.I,
)
BANNED = (
    (re.compile(r"\bRECC\b", re.I), "RECC claim"),
    (re.compile(r"\bNICEIC\b", re.I), "NICEIC claim"),
    (re.compile(r"F-gas certified", re.I), "company F-gas claim"),
    (re.compile(r"\b(?:we are|Reload is)\s+MCS\b", re.I), "MCS claim"),
    (re.compile(r"(?<!once )MCS certification is complete", re.I), "MCS claim"),
    (SUPERLATIVES, "superlative"),
)
ALLOWED_LINES = (
    "racing to the cheapest price",
)


def strip_comments(text):
    return re.sub(r"<!--.*?-->", "", text, flags=re.S)


def visible_text(html):
    html = strip_comments(html)
    html = re.sub(r"<script\b[^>]*>.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style\b[^>]*>.*?</style>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<[^>]+>", " ", html)
    return html


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self._in_title = False
        self.description = ""
        self.hrefs = []
        self.srcs = []
        self.missing_alt = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "title":
            self._in_title = True
        if tag == "meta" and data.get("name", "").lower() == "description":
            self.description = data.get("content", "").strip()
        if tag == "a" and "href" in data:
            self.hrefs.append(data["href"])
        if tag in ("img", "script", "link") and data.get("src"):
            self.srcs.append(data["src"])
        if tag == "link" and data.get("href") and data.get("rel") in ("stylesheet", "icon", "apple-touch-icon", "manifest"):
            self.srcs.append(data["href"])
        if tag == "img" and "alt" not in data:
            self.missing_alt.append(data.get("src", "(no src)"))

    def handle_data(self, data):
        if self._in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False


def local_target(url):
    if not url or url.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    if url.startswith(("http://", "https://")):
        return None
    path = url.split("#", 1)[0].split("?", 1)[0]
    if path == "" or path.endswith("/"):
        path += "index.html"
    return path.lstrip("/")


def main():
    errors = []
    titles = defaultdict(list)
    descriptions = defaultdict(list)
    pages = sorted(ROOT.glob("*.html"))
    for page in pages:
        html = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(html)
        title = re.sub(r"\s+", " ", parser.title).strip()
        if title:
            titles[title].append(page.name)
        else:
            errors.append(f"{page.name}: missing title")
        if parser.description:
            descriptions[parser.description].append(page.name)
        else:
            errors.append(f"{page.name}: missing meta description")
        for src in parser.missing_alt:
            errors.append(f"{page.name}: img missing alt ({src})")
        for url in parser.hrefs + parser.srcs:
            target = local_target(url)
            if target is None:
                continue
            if not (ROOT / target).is_file():
                errors.append(f"{page.name}: missing {url}")
        text = visible_text(html)
        for line in text.splitlines():
            if any(allowed in line for allowed in ALLOWED_LINES):
                continue
            for pattern, label in BANNED:
                match = pattern.search(line)
                if match:
                    snippet = re.sub(r"\s+", " ", line).strip()[:140]
                    errors.append(f"{page.name}: {label} '{match.group(0)}' in: {snippet}")

    for title, names in titles.items():
        if len(names) > 1:
            errors.append(f"duplicate title '{title}': {', '.join(names)}")
    for description, names in descriptions.items():
        if len(names) > 1:
            errors.append(f"duplicate description: {', '.join(names)}")

    if errors:
        print("\n".join(errors))
        return 1
    print(f"ok: {len(pages)} pages, links, alt text, titles and phrases")
    return 0


if __name__ == "__main__":
    sys.exit(main())
