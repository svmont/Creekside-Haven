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
| Hours | Mon–Fri 9–6, Sat 10–5, Sun by appointment | footer, `contact.html` |
| Drive times | 5 min H-E-B, 25 min The Woodlands, etc. | `index.html`, `neighborhood.html` |
| Fees & deposits | $50 application, $150 admin, $300 deposit | `apply.html` |
| Photography | one real photograph (the entrance); the gallery interiors are still illustrations | `gallery.html`, `index.html` |

### What the photographs confirmed

A property photograph and the surveyed site plan pinned down several facts that had been
guesses:

- **Address: 254–282 Plez Morgan Dr, Montgomery, TX 77356** — from the entrance monument sign
  and the site plan, replacing the single-unit address taken off a floor plan sheet.
- **48 homes in 8 two-storey buildings**, units A–F in each (254, 258, 262, 266, 270, 274,
  278, 282). The community map on `gallery.html` is drawn from that site plan.
- **A gated entrance** — perimeter iron fencing and drive gates are visible in the photograph.
- **The brand mark** is the community seal — a heron standing in cattails over water inside a
  double ring — redrawn as inline SVG to the composition of the official logo, and used in the
  header, the footer and the favicon.
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

The **floor plans are the property's own rendered plan sheets**, supplied by the property and
branded Creekside Haven — not schematics drawn here. The square footages are the property's
official figures: **715 SF** for the one-bedroom and **975 SF** for the two-bedroom. The plans
are named the way the sheets name them, **1 Bedroom** and **2 Bedroom**; there are no invented
marketing names.

The current sheets label only the bedrooms with dimensions; the earlier revision labelled every
room. **Nothing on the site should quote a dimension the sheet does not print** — the card
bullets and the `alt` text are written to match whatever the current render shows, and they need
re-checking whenever a new render lands. Closet sizes in particular were dropped by the property,
so the site no longer cites them.

Two things worth double-checking with the source of truth rather than assuming:

- **School zoning.** The site says the community is in Montgomery ISD and that campus
  assignments are set by the district. Do not name specific campuses without confirming
  current zoning with Montgomery ISD.
- **Drive times and retail.** Verify the H-E-B and Kroger Marketplace locations and the
  posted drive times before launch; they are labeled "approximate" on the page.
- **Pet policy.** The site says pets are considered subject to management's fees, weight
  limits and breed restrictions, and asks people to check the current policy before applying.
  Replace that with the real policy once you have it in writing.

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

## The floor plan images

Each plan ships as three files in `assets/`, one set per plan
(`floorplan-1-bedroom*`, `floorplan-2-bedroom*`):

| File | What it is | Used where |
| --- | --- | --- |
| `floorplan-<plan>-full.png` | the original render as supplied (1226×1283 PNG, ~1.5 MB) | archival master — not referenced by any page |
| `floorplan-<plan>-sheet.jpg` | the full branded sheet, title and disclaimer included | the "View the full floor plan" link on each plan card |
| `floorplan-<plan>.jpg` | the plan drawing alone, title and footer cropped off | the plan card image on `floor-plans.html` and `index.html` |

The two card images share one crop box — `(110, 170, 1118, 1150)` out of the 1226×1283
original, resized to 1008×980 — so the one-bedroom and the two-bedroom stay at the same
scale relative to each other on the page. If a plan is re-exported, re-crop it with that same
box rather than trimming to its own edges, or the two cards will silently stop matching.

To swap in a revised plan, replace the `-full.png` master, regenerate the other two files from
it, and keep the file names. To add a third plan, add an entry to the plan list with its `key`,
`name`, `sqft`, `img` base name, `alt` text and feature bullets; the cards, the floor-plan
filter chips and the tour form's plan select are all generated from that list.

## The logo

`assets/logo.png` is the **official artwork** — the navy seal with the heron, cattails and
arched CREEKSIDE / HAVEN lettering. It is used in the header at 52px and in the footer at
104px. `assets/logo-full.png` is the original 1254px upload, kept as the source for print and
any future sizes; the site does not serve it.

The web copy is resized to 512px and colour-quantized (the artwork is essentially three
colours), which took it from 790KB to 24KB with no visible loss. Regenerate it the same way if
the artwork changes.

The footer uses the designer's **reversed** artwork — `assets/logo-reverse.png`, cream on the
navy disc — which sits on the dark footer without any chip behind it.
`assets/logo-reverse-full.png` is that original 1254px upload.

**The favicon is deliberately not this logo.** At 16px the ring, lettering, cattails and water
collapse into a smudge, so `assets/favicon.svg` is the heron alone, filled cream on a solid
forest tile, . Leave it as it is unless the designer supplies a simplified small-size mark.

`assets/apple-touch-icon.png` (180×180) is a different matter: iOS renders it large enough for
the real seal, so it is the reversed artwork composited onto a navy square.

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
- The photo came from a listing under the property's former name. **That name is deliberately
  not used anywhere on this site** — the owner's decision, for reputation reasons. Do not add
  it for SEO, do not put it in alt text, filenames, meta descriptions or the JSON-LD, and do
  not accept a suggestion to "capture searches for the old name". Files brought over from
  listings should be renamed before they are committed.

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
