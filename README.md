# Reload Renewables & AC — draft website

Static HTML for **Reload Renewables & AC** (solar PV, battery storage, air source heat pumps, air conditioning, servicing). Tailwind via CDN. No build step.

**Preview (draft only):** https://stewraw25.github.io/reload-renewables/

This is the GitHub Pages working copy. Do not point a custom domain, add a CNAME, change DNS, or move the site to Netlify/Vercel. Stewart has the domain secured and will say when it goes live. Keep canonicals, sitemap and schema on the github.io URL until then.

## Brand (do not invent better numbers)

- Name: Reload Renewables & AC
- Phone: 01978 809 500
- Email: hello@reloadrenewables.com
- Address: Unit 4, Wrexham Industrial Estate, Wrexham, LL13 9XS
- Hours: Mon–Fri 8am–6pm; Sat 9am–1pm by appointment
- Colours: primary `#00A3E0`, dark `#0F172A`
- Area: Wrexham, Chester, Mold, Oswestry, Flintshire, Denbighshire, North Wales
- Yield already modelled: ~980 kWh/kWp
- Packages: Silver from £8,000 / Gold from £10,000 / Platinum from £14,000 unless Stewart supplies new figures

## Locked small stamp

`assets/images/logo-reload-stamp.png` with cache-bust **v=47** is locked. Do not run or edit `generate-small-logo.py`. The hero main logo is separate.

## Scope

This brand only: renewables and AC. Do not add electrical EICR / landlord testing, SR Security, or EV charge points.

British English. £ not $.

## Honesty

Placeholder testimonials, star ratings, named customer jobs and Unsplash “project” photos have been removed. Reviews and real install photos go up only when Stewart supplies them. The contact form opens an email to hello@reloadrenewables.com; it does not pretend to have sent a message from the server.

## Pages

- `index.html` — home, packages, estimator, FAQs
- `solar.html`, `battery.html`, `heat-pumps.html`, `ac.html`
- `services.html` — servicing and maintenance
- `domestic.html`, `commercial.html`
- `about.html`, `contact.html`
- `our-work.html`, `projects.html` — typical kit until real photos exist
- `mission.html`

## Local preview

Open `index.html` in a browser, or serve the folder (paths are relative so they also work at `/reload-renewables/`).

## Still to confirm with Stewart

- Real customer photos and permissioned reviews
- Form backend (Formspree / CRM) when ready
- Live domain (then swap canonicals, sitemap and schema)
- Confirmed: NICEIC and TrustMark. MCS for Reload is in progress (qualifying jobs certified by an MCS contractor named on the quote). RECC/HIES not claimed. Tesla is a product (Powerwall 3), not a trust-row award. F-Gas is held for AC/heat-pump refrigerant work.
- Package prices and any stats beyond ~980 kWh/kWp
- Hero video — only keep if it is real footage Stewart is happy to show
