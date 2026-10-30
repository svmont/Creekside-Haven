# Google Ads — Creekside Haven

Everything needed to build the Search campaign, in the order Google asks for it.
Every figure here is verified against the live site.

**Build a Search campaign, not Performance Max or Smart.** PMax spreads the budget across
YouTube, Display, Gmail and Discover, where nobody is looking for an apartment, and gives
almost no control. Search puts the money in front of people typing a query. At this budget
that difference is most of the result. If a wizard will not offer Search, look for
"Switch to Expert Mode".

## Settings

| Setting | Value | Why |
| --- | --- | --- |
| Campaign type | Search | Intent. See above. |
| Networks | Search only — **uncheck Display** and "search partners" | Display is where small budgets leak. |
| Locations | Montgomery, TX + 15 mile radius | **Never postcodes** — restricted for housing ads, and the radius is better anyway. |
| Location option | *Presence: people in your targeted locations* — not "interest" | Otherwise it shows to people merely reading about Montgomery. |
| Language | English | Add Spanish only if a Spanish enquiry can be answered. |
| Budget | $10–20/day to start | Raiseable any day. Not Google's suggestion, which is sized for Google. |
| Bidding | **Maximize clicks, with a max CPC of about $3** | See below. |
| Ad rotation | Optimise | Default is right. |

**On bidding.** Maximise conversions is the usual advice and it is wrong on day one: with no
conversion history the algorithm has nothing to learn from and spends badly while it guesses.
Start on Maximise clicks with a CPC cap, gather two or three weeks of real conversions, then
switch. The cap stops a single expensive click eating a day's budget.

**Declare the campaign as Housing** if asked. Targeting by age, gender, marital status,
parental status and postcode is blocked for housing ads in the US. This is the Fair Housing
Act, not a Google preference — do not work around it.

## Ad groups and keywords

Three groups, so the ad can match the search. All **phrase match** — broad match hands Google
latitude to spend on loosely related queries, which it will.

**1 — General**
```
"apartments montgomery tx"
"apartments for rent montgomery tx"
"montgomery tx apartments"
"apartment rentals montgomery tx"
"apartments for lease montgomery tx"
```

**2 — By bedroom count**
```
"1 bedroom apartment montgomery tx"
"2 bedroom apartment montgomery tx"
"one bedroom apartments montgomery tx"
"two bedroom apartments montgomery tx"
```

**3 — Nearby and landmarks**
```
"apartments near lake conroe"
"apartments near montgomery isd"
"apartments near downtown montgomery tx"
```

## Negative keywords — add these before launching

These matter more than the keywords. Without them you pay for clicks that cannot convert.

```
-for sale        -buy             -purchase        -realtor
-houses          -house           -home for sale   -rent to own
-3 bedroom       -4 bedroom       -studio          -efficiency
-hotel           -motel           -airbnb          -short term
-vacation        -weekly          -jobs            -hiring
-senior living   -assisted living -nursing home
-conroe          -woodlands       -willis          -magnolia
```

`-3 bedroom` and `-studio` are the ones people forget: there are exactly two floor plans, so
every one of those clicks is money spent on an enquiry that must be turned away.

The last row excludes neighbouring towns, which are separate rental markets with enough
volume to drain a small budget. Remove them if you would genuinely rent to someone searching
there.

**Deliberately not on this list:** `-section 8`, `-voucher`, `-income restricted`. Excluding
subsidy-related searches is a targeting proxy that sits close to the disparate-impact exposure
discussed in README.md, and the handful of wasted clicks is not worth the inconsistency.

## The ad

Responsive search ad. Give it everything; Google tests combinations and keeps what works.

**Headlines** (30 characters each, all verified in length)
```
Montgomery TX Apartments
1 & 2 Bedroom Apartments
From $1,150 a Month
Washer & Dryer Included
715-975 Sq Ft Floor Plans
Montgomery ISD Schools
Covered Parking & Gated
Creekside Haven Apartments
Minutes to Lake Conroe
Schedule a Tour Today
Separate Dining Room
See the Floor Plans
```

**Descriptions** (90 characters each)
```
Spacious 1 & 2 bedroom homes in Montgomery ISD. Full-size washer and dryer in every home.
715 and 975 sq ft plans from $1,150. Covered parking, gated entrance. Tour by appointment.
Minutes from H-E-B, Kroger and downtown Montgomery. Near Conroe and The Woodlands.
A 48-home community in eight two-story buildings. Schedule a tour to see it yourself.
```

**Final URL**
```
https://creeksidehavenapts.com/
```
Google's auto-tagging handles attribution, so no UTM parameters are needed here — unlike
Facebook. Confirm auto-tagging is on under Admin → Account settings.

**Nothing in any of this names a protected class.** Keep it that way: no "families",
"professionals", "students", "seniors", "couples", "perfect for". Describe the apartments,
never the resident.

## Assets (extensions)

**Sitelinks** — four, each 25 characters with two 35-character description lines.

| Text | URL | Line 1 | Line 2 |
| --- | --- | --- | --- |
| Floor Plans | `/floor-plans.html` | 715 and 975 sq ft layouts | One and two bedrooms |
| Photo Gallery | `/gallery.html` | See the homes and grounds | Interiors and exteriors |
| Schedule a Tour | `/contact.html` | Tours by appointment | Request a time online |
| The Neighborhood | `/neighborhood.html` | H-E-B, Kroger, downtown | Minutes to Lake Conroe |

**Callouts** (25 characters)
```
Washer & Dryer Included
Covered Parking
Gated Entrance
Montgomery ISD
Separate Dining Room
Tours by Appointment
```

**Structured snippet** — header *Amenities*: Washer and dryer, Covered parking, Gated
entrance, Separate dining room

**Call asset** — (970) 620-2093. Add it **only if someone reliably answers.** A missed call
is a lead lost with no record, where a form submission waits in an inbox. Schedule it to
show only during hours the phone is answered.

## Before publishing

- [ ] Campaign type is Search; Display and search partners **unchecked**
- [ ] Location is Montgomery + radius, set to *presence*, no postcodes
- [ ] Business description contains **no** reference to who the apartments suit
- [ ] Product category is **Apartment Rentals** only
- [ ] All negative keywords added
- [ ] Budget is yours, not Google's suggestion
- [ ] Declared as Housing if asked

## The first two weeks

**Day 2, and twice a week after:** Campaigns → Insights → **Search terms**. This shows what
people actually typed, as opposed to what you bid on. Add every irrelevant one as a negative.
This single habit separates a campaign that improves from one that quietly wastes money.

**Once conversions are importing from GA4** (see README.md), switch bidding from Maximise
clicks to Maximise conversions. Not before — it needs the history.

**What good looks like** at this size: a handful of clicks a day, a cost per click in the low
single dollars, and leads arriving in the inbox. Judge it on leads, never on impressions or
click-through rate.
