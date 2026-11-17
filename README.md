# Reload Renewables & AC — draft website

Static HTML for **Reload Renewables & AC** (solar PV, battery storage, air source heat pumps, air conditioning, servicing). Styles are the committed Tailwind build in `assets/css/site.css` (rebuild with the Tailwind CLI from `assets/css/input.css` if the utility classes change). Do not use the Tailwind CDN.

**Preview (draft only):** https://stewraw25.github.io/reload-renewables/

This is the GitHub Pages working copy. Do not point a custom domain, add a CNAME, change DNS, or move the site to Netlify/Vercel. Keep canonicals, sitemap and schema on the github.io URL until the live domain is chosen.

## Positioning

Reload Renewables was set up after years of seeing badly fitted, unsafe solar systems, and after our own clients asked us to do the job properly. We fit quality products to a high installation standard, with a calm, friendly service from the first visit to switch-on. Do not add years-in-business figures, install counts, reviews, or claims about other companies.

## Brand (do not invent better numbers)

- Legal entity: Reload Renewables Ltd
- Trading name: Reload Renewables & AC
- Phone: 01978 809 500
- Email: hello@reloadrenewables.com
- Address: Jubilee Manor, Sun Lane, Wrexham, LL13 9RW
- Hours: Monday–Friday 8am–6pm. Closed Saturday and Sunday.
- Colours: primary `#00A3E0`, dark `#0F172A`
- Area: Wrexham, Chester, Mold, Oswestry, Flintshire, Denbighshire, North Wales
- Yield already modelled: ~980 kWh/kWp
- Packages: Silver from £8,000 / Gold from £10,000 / Platinum from £14,000

## Locked small stamp

`assets/images/logo-reload-stamp.png` with cache-bust **v=47** is locked. Do not run or edit `generate-small-logo.py`. The hero main logo is separate.

## Scope

This brand only: renewables and AC. Do not add electrical EICR / landlord testing, SR Security, or EV charge points.

British English. £ not $.

## Honesty

Do not invent testimonials, star ratings, named customer jobs, or project photos. Reviews and real install photos go up only when real, permissioned material is added. NICEIC registration is not confirmed, so the name and logo stay off the site until it is. TrustMark is confirmed. Every qualifying installation is signed off and MCS certified through an MCS-certified installer partner, named on your quote. Reload's own MCS certification is awaiting approval. Do not add MCS, RECC or HIES logos, and do not claim that Reload is MCS certified.

## Quotes

The only lead path is the OpenSolar **Quotation Request** form (Embed In Page, org 126178, form 2479). The exact lead-capture script sits inside `contact.html#quote` and is not included on other pages. Quote buttons and the on-site chatbot link to that section. If the script does not load, the page shows the phone number and email. Do not add a second form backend.

Enquiry records are kept for 1 year. See `privacy.html`.

## Pages

- `index.html` — home, packages, estimator, FAQs
- `solar.html`, `battery.html`, `heat-pumps.html`, `ac.html`
- `services.html` — servicing and maintenance
- `domestic.html`, `commercial.html`
- `about.html`, `contact.html`, `privacy.html`
- `our-work.html`, `projects.html` — empty slots until real photos exist
- `mission.html`

## Local preview

Serve the folder (paths are relative so they also work at `/reload-renewables/`).

## Still to confirm before the custom domain

- Real customer photos and permissioned reviews
- Privacy wording with an adviser if needed, and a data-processing arrangement with OpenSolar
- Live domain (then swap canonicals, sitemap and schema)
- TrustMark is on the site. The NICEIC name and logo stay off until registration is confirmed. Tesla Powerwall 3 is a product, not a trust-row award. Do not claim F-Gas certification unless it has been confirmed for Reload Renewables Ltd. Do not add MCS, RECC or HIES logos.
- Package prices and any stats beyond ~980 kWh/kWp
- Analytics and Search Console only after the domain cutover

Local pages are `wrexham.html`, `chester.html` and `north-wales.html`. `funding.html` only repeats the Boiler Upgrade Scheme line, domestic 0% VAT and Smart Export Guarantee help. `warranty.html` repeats the 6-year workmanship line and the manufacturer warranty lines already on the solar and battery pages. Do not add grant amounts, reviews or job counts to those pages. `finance.html` repeats the published 0% and 9.9% APR examples. Reload is a broker, not the lender. Heat pumps are coming soon.
