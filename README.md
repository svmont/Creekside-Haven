# Creekside Haven — apartment marketing site

Marketing website for **Creekside Haven**, an apartment community in **Montgomery, Texas**.
The site's job is leasing: get a visitor to a tour request or an application in as few clicks
as possible, while presenting the property professionally.

Positioning it leads with: **usable square footage** (715 and 975 SF, with a separate dining
room and a real laundry room), a **Montgomery ISD** address, **value** for the money, and
**convenience** — the H-E-B and Kroger Marketplace, historic downtown Montgomery, and easy
ingress/egress toward Conroe, The Woodlands and I-45.

The community is **existing and occupied — not new construction and not pre-leasing**. Keep
copy edits consistent with that: homes come available as they turn, so the site says "now
leasing" and points people to the leasing office for current availability.

It is a fast, dependency-free static site (plain HTML/CSS/JS, no build step, no frameworks).
The site lives at the repository root, so any static host can publish it as-is.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, why-here pillars, floor plan preview, amenities, neighborhood, gallery, leasing steps, FAQ |
| `floor-plans.html` | All six plans with schematics, specs, pricing, filter by bedroom count |
| `gallery.html` | Filterable gallery (interiors / amenities / community / neighborhood) with lightbox |
| `neighborhood.html` | Montgomery: shopping, schools, downtown, Lake Conroe, drive-time table |
| `contact.html` | Primary conversion page — tour request form, office info, hours, directions |
| `apply.html` | Application steps, what to bring, fees & deposits, resident selection, FAQ |

Shared assets: `css/site.css`, `js/site.js`, `assets/favicon.svg`, plus `robots.txt` and `sitemap.xml`.

## Run locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before this goes live — placeholder content to replace

Everything below is **placeholder** and must be confirmed with the owner/management company.
Each value appears in several files, so search-and-replace across the repository.

| What | Placeholder currently in the site | Where |
| --- | --- | --- |
| Phone | **none shown** — a new number is being set up. Nothing on the site dials out; contact routes to the tour form and email | see "No phone number yet" below |
| Email | `leasing@creeksidehaven.com` | footer, `contact.html` |
| Domain | `https://www.creeksidehaven.com` | `<link rel="canonical">`, `og:url`, `robots.txt`, `sitemap.xml` |
| Rents | none shown — cards read "Call for current pricing" | `floor-plans.html`, `index.html` plan cards |
| Plan names | "The Cypress" (1BR) and "The Sycamore" (2BR) — marketing names, not from the plan sheets | `floor-plans.html`, `index.html`, `contact.html` |
| Hours | Mon–Fri 9–6, Sat 10–5, Sun by appointment | footer, `contact.html` |
| Drive times | 5 min H-E-B, 25 min The Woodlands, etc. | `index.html`, `neighborhood.html` |
| Fees & deposits | $50 application, $150 admin, $300 deposit | `apply.html` |
| Photography | one real photograph (the entrance); the rest are illustrations | `gallery.html`, `index.html` |

### What the photographs confirmed

A property photograph and the surveyed site plan pinned down several facts that had been
guesses:

- **Address: 254–282 Plez Morgan Dr, Montgomery, TX 77356** — from the entrance monument sign
  and the site plan, replacing the single-unit address taken off a floor plan sheet.
- **48 homes in 8 two-storey buildings**, units A–F in each (254, 258, 262, 266, 270, 274,
  278, 282). The community map on `gallery.html` is drawn from that site plan.
- **A gated entrance** — perimeter iron fencing and drive gates are visible in the photograph.
- **The brand mark** is the heron-and-cattails roundel from the monument sign, redrawn as SVG.
- **The buildings** are two storeys, sage-green siding, dark gable roofs, stone wainscot and
  exterior stairs; the hero and exterior illustrations now match.
- **"Under new management"** — from the banner on the building, now in the hero.

### Community amenities

The only confirmed community amenities are **covered parking** and the **gated entrance**.
An earlier draft of this site advertised a pool, fitness center, clubhouse, coworking lounge, dog park, pet spa, grilling
pavilion, package lockers, detached garages, gated entry, EV charging and a playground — none
of which were verified, and all of which have been removed. If the property has more than
covered parking, add it to `COMMUNITY_AMENITIES`-style lists on `index.html` (the "What you
get" section), the gallery, and the JSON-LD in `index.html`.

### What is real

The **floor plans and square footages are the real ones**. Both schematics are drawn to scale
from the surveyed plan sheets for 270 Plez Morgan Dr, every room dimension on the page is the
surveyed dimension, and the square footages are the property's official figures: **715 SF** for
the one-bedroom and **975 SF** for the two-bedroom.

Two things worth double-checking with the source of truth rather than assuming:

- **School zoning.** The site says the community is in Montgomery ISD and that campus
  assignments are set by the district. Do not name specific campuses without confirming
  current zoning with Montgomery ISD.
- **Drive times and retail.** Verify the H-E-B and Kroger Marketplace locations and the
  posted drive times before launch; they are labeled "approximate" on the page.
- **Pet policy.** The site says pets are considered subject to management's fees and
  restrictions, and points people to the leasing office. Replace that with the real policy
  (limits, fees, breed restrictions) once you have it in writing.

## No phone number yet

The property is setting up a new number, so **no phone number appears anywhere on the site** —
a placeholder that does not dial is worse than none on a live page. Contact routes through the
tour request form and `mailto:` links instead.

When the number arrives, put it back in five places:

1. The header, as a `nav-phone` link before the Apply button, on all six pages.
2. The footer "Contact" list, above the email line, on all six pages.
3. `contact.html`, in the "Get in touch" card above the email row.
4. The tour form's secondary button on `contact.html` (currently "Email Us").
5. `"telephone"` in the JSON-LD block at the top of `index.html`.

Use `<a href="tel:+19365550148">(936) 555-0148</a>` as the shape — `tel:` needs the digits
with no punctuation.

## Editing the floor plans

Each plan in `floor-plans.html` (and the pair previewed on `index.html`) is an inline `<svg>`
drawn to scale: 21 pixels per foot, rooms positioned in feet from the unit's top-left corner.
To correct a room, edit its `<rect>` (x, y, width, height are all feet × 21) and the matching
`<text>` label. To add a plan, copy an `<article class="plan-card">` block and redraw it the
same way.

## Photography

`assets/entrance-sign.jpg` (1600×1066) is the real entrance photograph, used for the home page
hero, the home page gallery strip and the Community tile in the gallery.
`assets/entrance-sign-og.jpg` (1200×800) is the smaller copy used for link previews
(`og:image`).

Two things worth knowing about how it got here:

- The upload was **AVIF data with a `.jpg` extension** — some export tools do this. Browsers
  mostly cope, but it breaks link previews and older clients, so it was re-encoded as real
  progressive JPEG. If you upload more photos, check with `file <name>` that the format matches
  the extension.
- The file arrived named `eagles-nest-apartment-homes-montgomery-tx-primary-photo.jpg`, which
  suggests the property was listed as **Eagles Nest Apartment Homes** before the change of
  management. If that is right, it may be worth naming the former identity somewhere on the
  site so people searching for the old name still land here.

## Replacing the remaining illustrations with photography

Every image is an inline `<svg>` — there are no binary assets to manage. To drop in real photos:

1. Add the files to `assets/` (WebP or optimized JPEG, roughly 1600×1120 for gallery tiles).
2. In `gallery.html`, replace the `<svg>…</svg>` inside each `<button class="shot">` with
   `<img src="assets/your-photo.webp" alt="descriptive alt text" width="1600" height="1120" />`.
3. Do the same for the hero in `index.html` (`.hero-art`) and the three tiles in the home
   page gallery strip.
4. Remove the "Illustrations shown" note that follows those galleries.

The lightbox in `js/site.js` clones whatever element it finds inside the tile — swap the
`querySelector("svg")` call for `querySelector("img, svg")` when photos go in.

## Wiring up the forms

The tour request form in `contact.html` carries a `data-demo` attribute. While that attribute
is present, `js/site.js` intercepts the submit and shows an on-page confirmation instead of
sending anything. To go live:

1. Create a form endpoint (Formspree, Netlify Forms, or your own serverless function) — or
   better, an endpoint that pushes the lead straight into the property management system
   (Entrata, RealPage, Yardi, AppFolio) so leads land where leasing agents already work.
2. Set `action="https://your-endpoint"` and `method="post"` on the form.
3. Delete the `data-demo` attribute so the browser submits normally.
4. Point the "Apply" / "Start My Application" buttons in `apply.html` and the plan cards at
   the real resident-portal application URL (they currently link to `contact.html`).

Add the leasing team to the endpoint's notification list, and confirm the consent checkbox
language with whoever handles your TCPA/marketing compliance before turning on SMS follow-up.

## No leasing office

The community has no on-site leasing office, so the site never refers to one. Contact copy
says "call us" / "ask us" rather than "stop by the office", the footer heading is **Contact**
rather than "Leasing office", hours are just **Hours**, and the contact page's directions card
points at the address and the map instead of visitor parking in front of an office. Keep that
wording if you edit these pages.

## Fair housing

This is housing advertising, so the copy is written to describe **the property**, not the
people expected to live there. Keep it that way when editing: no language that signals a
preference for or against families, ages, nationalities, religions, or any other protected
class. The Equal Housing Opportunity statement in the footer and the resident-selection
section on `apply.html` should stay on every page they appear on.

## Deploy

`.github/workflows/deploy-pages.yml` publishes the site to GitHub Pages on every push to
`main`. It needs one manual step, once: **Settings → Pages → Build and deployment → Source:
"GitHub Actions"**. (The workflow cannot do this itself — `actions/configure-pages` with
`enablement: true` is rejected with "Resource not accessible by integration", because the
Actions token is not allowed to create a Pages site.) Once Pages is on, every push to `main`
deploys, and the site serves at `https://svmont.github.io/Creekside-Haven/`.

For a custom domain, either add one under Settings → Pages (and commit a `CNAME` file), or
point DNS at any static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront) with this
repository as the source — there is no build command and no publish subdirectory.

Before launch: update `robots.txt` and `sitemap.xml` with the real domain, add the property to
Google Business Profile and the ILS listings (Apartments.com, Zillow, etc.), and add analytics
plus call tracking if leasing wants attribution per source.

## Regenerating the pages

The HTML here is ordinary, hand-editable HTML — edit it directly. It was first
generated by a small script that shared one header/footer across the pages; that script is
not required to maintain the site and is not checked in. If you make a change that touches
the header, footer or nav, remember it appears in all six files.
