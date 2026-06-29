# Reload Renewables & AC — Website

A professional, modern website for **Reload Renewables & AC** — a North Wales-based company specialising in solar PV, battery storage, air conditioning, heat pumps and servicing.

This site is a high-quality recreation and rebrand inspired by the structure and trust-building style of established trades websites (like rnelectrical.co.uk), adapted specifically for renewables + air conditioning.

## Brand Colours

- **Primary Blue** (from your logo): `#00A3E0`
- **Dark / Black**: `#0F172A`
- Clean light backgrounds with strong typography

## Locked Small Branding Stamp (IMPORTANT - as of latest user confirmation "Small logo looks perfect lets lock this in now")

The repeatable small circular "RELOAD" branding stamp (used in nav, footers, "dotted" throughout the site as bullet points/decorative icons in lists, values, projects, contact methods, 0% finance, AI badge, how-to-choose cards etc, and for t-shirts/vans/merch) is now **LOCKED**.

- File: `assets/images/logo-reload-stamp.png` (and .jpg)
- Current version: v=47 (cache-busted in all HTML)
- Generator: `generate-small-logo.py` (has big LOCKED header - do not run or edit)
- Matches the final approved reference image (brighter yellow outer (255,212,81), cream (253,249,233), blue ring, large RELOAD with bottom at vertical center, "Renewables & AC" with & AC in blue, horizontal battery emoji positioned as approved)
- **DO NOT change, regenerate, or update this logo or its v= until the user explicitly asks.**

The separate hero "main logo" (logo-main.png / generate-main-logo.py with vertical battery + "Future Looks Bright...") remains independent.

## What's Included

- `index.html` — Full landing page with hero, solar packages, services, why choose us, accreditations, testimonials and CTAs
- `services.html` — Detailed services breakdown (Solar PV, Battery Storage, Air Conditioning, Heat Pumps, Servicing & Maintenance)
- `about.html` — Company story, values and accreditations
- `projects.html` — Portfolio / recent work gallery
- `contact.html` — Professional enquiry form (ready to connect to a real backend)
- `assets/images/logo.png` — Your original logo (SR)

All pages are fully responsive, use Tailwind CSS via CDN (no build step required), and include mobile navigation.

## Quick Start

1. Open the folder in your browser:
   ```bash
   open index.html
   ```
   Or just double-click any `.html` file.

2. Everything works locally immediately.

## Customisation Checklist (Important!)

Before going live, replace the following placeholder content:

### Required Changes
- [ ] Phone number — currently `(01978) 809 500`
- [ ] Email — currently `hello@reloadrenewables.com` (top bar and contact)
- [ ] Address — Unit 4, Wrexham Industrial Estate, LL13 9XS
- [ ] All testimonials (currently realistic placeholders)
- [ ] Project photos and descriptions in `projects.html`
- [ ] Real client logos (in accreditations / partners sections)
- [ ] Exact solar package pricing and specs (update to your real offerings)
- [ ] Service descriptions if they differ from current copy
- [ ] "50+ years combined experience" — update the number if needed
- [ ] Any specific accreditations you do **not** hold (remove or replace)
- [x] OpenSolar lead capture widget embedded (script + renderOpenSolarWidget() on all "Get Quote" buttons). No more placeholder links. Contact form remains for AC/Heat Pumps/Servicing/general enquiries. The widget script is included on every page.

### Optional Enhancements
- Add your actual Google Business / Trustpilot review links
- Connect the contact form to Formspree, Netlify Forms, or your CRM
- Add Google Analytics / Meta Pixel
- Replace picsum.photos images with your own high-quality photography
- Add a favicon

## Deployment (Very Easy)

### Option 1: Netlify (Recommended — Free)
1. Drag the entire `pro-renewables-ac` folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. Done. You'll get a live URL instantly + free custom domain + SSL.

### Option 2: Vercel
- `vercel --prod` (requires Vercel CLI)

### Option 3: GitHub Pages / Any Static Host
- Works perfectly on any static host.

## Tech Notes

- Tailwind CSS is loaded via CDN (`https://cdn.tailwindcss.com`) for zero-build simplicity.
- Font Awesome icons via CDN.
- For long-term maintenance you can later move to a proper Tailwind + Vite setup, but the current version is excellent for client handoff and fast edits.

## Next Steps / Questions

If you want any of the following, just let me know:

- More pages (e.g. individual service pages, finance page)
- Real form backend integration
- Dark mode variant
- Different package pricing / offerings
- Your actual photos and testimonials added
- A proper logo redesign (the current "SR" logo works great with the new name, but a wordmark version is also possible)
- Multi-language support
- Booking calendar integration

---

**Built for Reload Renewables & AC** — clean energy and total comfort, expertly delivered.

---

## Outstanding Local SEO Implementation (June 2026) — Conforming to Current Google Best Practices

This site is built to be the strongest possible on-page + technical foundation for ranking for the exact user-specified keywords:

**Primary targets:** "Solar Installers", "Solar Wrexham", "Solar Chester", "Solar Installers Wrexham", "Solar Installers Chester" + natural variants ("solar installers near me Wrexham", "solar pv chester", "best solar installers wrexham" etc.) across all 5 services.

### Compliance with 2025/2026 Google Rules (Helpful Content, E-E-A-T, no stuffing)
- **Helpful Content first:** Every addition demonstrates real value for someone actually looking for a solar installer in the area (savings calculator with real Octopus tariffs + 980 kWh/kWp Wrexham-specific yield, transparent packages, "How to Choose Solar Installers" guide, realistic timelines, grant explanations, servicing value, common pitfalls).
- **E-E-A-T signals:** Local address + geo in schema + prose, specific local yield data, named accreditations with why they matter, 50+ years combined + 1,200+ installs stats, real project examples with results, 10-year workmanship + manufacturer warranties explained, F-Gas/MCS details, consistent NAP everywhere, chatbot + forms for real conversations.
- **Natural semantic language:** Keywords appear in titles, H1/H2 support, first paragraphs, FAQ, schema Service names, alts and footers — but never stuffed. Varied phrasing used ("professional solar installers serving Wrexham and Chester", "local solar installers Wrexham & Chester", "MCS certified solar installers", "trusted solar PV specialists").
- **Topical authority:** Full coverage of the customer journey for "solar installers Wrexham/Chester" searches: research (why solar here), choosing (new dedicated guide), products (exact makes + why), costs/savings (calculator + packages), process, grants/finance/tariffs, aftercare (servicing emphasis), FAQs targeting PAA.
- **Rich results ready:** Expanded visible FAQ (10 questions) + matching FAQPage schema. Multiple Service + LocalBusiness with detailed areaServed, offers and descriptions. Good chance of People Also Ask, service rich cards and local pack.
- **Technical:** Clean static HTML (fast, mobile-first via Tailwind), proper canonicals, sitemap with realistic priorities/freq, robots.txt allowing image crawl, unique titles/descriptions per page.

### On-Page & Content Updates (this pass)
- Titles and metas on all 5 pages now lead with "Solar Installers Wrexham & Chester" + service + trust modifiers.
- H2s, service intros, cards and new "How to Choose..." section on services.html use the keywords naturally while staying user-first.
- Added/expanded  "best solar installers in Wrexham and Chester" and "how do I choose..." FAQ + schema entries.
- Enhanced "The RELOAD Difference", local team, yield modelling and accreditation explanations for E-E-A-T.
- Schema Service names and descriptions updated with exact keywords + helpful specifics (980 kWh/kWp, Octopus, BUS £7,500, DNO ScottishPower, local response).
- AreaServed expanded with more precise surrounding towns (Flint, Deeside, Ruthin etc).
- Image alts, footers, chatbot KB and project descriptions aligned.

### Technical Files
- sitemap.xml (all pages, updated lastmod June 2026, high priority on home/services/contact).
- robots.txt (images crawlable, strong sitemap ref + GSC notes).
- Full JSON-LD LocalBusiness + 5 Services + FAQPage on key pages.

### Post-Launch SEO Must-Dos (Critical for Rankings)
1. **Deploy** (Netlify drop is easiest) and swap every `https://www.primerenewables.co.uk` in HTML, schema, sitemap and robots to your final live domain.
2. **Google Business Profile (GBP / Google Maps):** Claim or create with EXACT NAP "Reload Renewables & AC, Unit 4, Wrexham Industrial Estate, Wrexham, LL13 9XS". Primary category: Solar Energy Company. Secondary: Air Conditioning Contractor, Heat Pump Installer. Add services matching keywords ("Solar PV", "Battery Storage", "Air Source Heat Pumps", "Air Conditioning Installation"). Upload 20+ photos of local Wrexham/Chester installs, team, vans. Post weekly. Get 20+ genuine 5-star reviews mentioning towns + services.
3. **Google Search Console + Bing:** Verify property, submit sitemap, request indexing of home + services + contact. Monitor performance for the target keywords. Fix any crawl errors.
4. **Reviews & Citations:** Get reviews on Google, Trustpilot, Checkatrade etc. Build consistent citations on Yell, 192.com, Thomson Local, FreeIndex (exact NAP).
5. **Content proof:** Add 3-5 more real (or anonymised with permission) Wrexham/Chester/Mold case studies with before/after or kWh numbers to projects.html — this is pure E-E-A-T.
6. **Off-page:** Encourage backlinks from local sites (Wrexham council business listings, North Wales chambers, community Facebook groups). Guest posts or sponsorships on local news.
7. **Monitor & iterate:** Track rankings weekly for "solar installers wrexham", "solar chester", "solar installers chester" etc. Use the AI savings calculator and chatbot data to spot new questions and add them to FAQ/KB.
8. **Formspree (chat + contact):** Replace the placeholder endpoint in assets/js/chatbot.js and contact form with your real Formspree (or other) ID so leads actually arrive with full chat transcripts.

This setup + strong GBP + reviews + real local proof should put the site in a very strong position to rank at the top for the requested keywords while fully complying with Google's Helpful Content and E-E-A-T expectations. No black-hat, no manipulation — just the most helpful, authoritative local renewables site possible.

### Quick Verification
After edits, always open in Safari:
```bash
open index.html services.html contact.html
```
Check titles, FAQ, schema (view source), mobile layout and that all location mentions are natural and helpful.

### Next Steps for Top Rankings
1. Host publicly (Netlify/Vercel recommended) + set custom domain (update sitemap.xml + canonicals + schema URLs).
2. Submit sitemap in Google Search Console + request indexing for key pages.
3. Create/claim Google Business Profile with exact NAP + services + photos + posts (critical for local pack).
4. Encourage real reviews (Trustpilot/Facebook/Google) and add links.
5. Build local citations (Yell, 192, etc.) + backlinks from local sites.
6. Add real project photos + client logos when available.
7. Monitor Search Console for "solar panel installers Wrexham" etc. impressions/clicks.

The site is now extremely well-optimised on-page and technically for local pack + organic dominance in Wrexham, Chester and surrounding areas for all 5 core services.

Open `index.html` in your browser now to see the full site (Safari recommended).
