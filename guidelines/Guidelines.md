# Onward Design Language

Use this document as the default design brief for all future Onward prompts,
screen generation, and redesign work unless the user explicitly overrides it.
It is intentionally product-specific: Onward should not look like a generic
travel dashboard or a stock shadcn demo.

## Core Direction

Onward is a calm, graphic, native-feeling travel organiser. It turns scattered
reservations into clear Journey plans. The visual language should now follow the
reference theme: playful but controlled mobile UI, oversized soft cards, cream
phone surfaces, high-contrast black controls, and abstract route artwork made
from bold geometric color blocks.

- Calm and useful under pressure, but visually warmer and more distinctive
- Graphic and mobile-native, with strong shapes instead of generic dashboards
- Playful through color and geometry, not through cute copy or decoration
- Warm, tactile, and card-led, with enough structure for dense travel details
- More like a polished consumer mobile concept than a SaaS dashboard

## Current Theme Snapshot

This is the current visual target for the app:

- A soft mint canvas around the product, with cream phone interiors and warm
  off-white cards
- Black or near-black primary controls, text, phone chrome, and tab bars
- Large abstract Journey artwork built from seafoam, coral, yellow, sky blue,
  black stripe patterns, white route lines, and cropped geometric planes
- Rounded card rows that feel inflated: very large radius, subtle border, soft
  exterior shadow, off-white fill, white icon tile, bold title, and heavy Slate
  support copy
- Dense mobile screens that still feel touchable: cream base, colored list rows,
  black bottom navigation, rounded segmented cards, and compact metadata
- Large, heavy Figtree headlines in Ink Black
- Short support copy with controlled line breaks
- Black pill CTAs that feel native, decisive, and grounded

The theme is graphic and poster-like, but the app should still feel operational.
Every decorative shape should support the sense of movement, routes, time,
documents, or travel context.

## Palette

Use this palette as the default source of truth.

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Primary text/action | Ink Black | `#080A0A` | Main text, primary CTAs, phone chrome, bottom nav |
| App background | Soft Mint | `#DDEBE6` | Outer canvas and large calm bands |
| Phone surface | Warm Cream | `#F6EDC9` | In-phone app surfaces and warm section backgrounds |
| Card surface | Off White | `#F8FAF8` | Large inflated cards and content rows |
| Border | Mist Line | `#DDE5E2` | Card outlines and dividers |
| Secondary text | Slate | `#68757B` | Supporting copy and metadata |
| Graphic accent | Seafoam | `#8CCFBD` | Large abstract blocks and calm status surfaces |
| Graphic accent | Journey Yellow | `#F5D64A` | Bold graphic blocks, charts, highlight rows |
| Graphic accent | Sunset Coral | `#F17455` | Important graphic blocks and warm attention states |
| Graphic accent | Sky Blue | `#A9C8F0` | Secondary rows, small panels, quiet contrast |

The old Deep Ocean and Tidal Teal direction should be treated as legacy unless a
screen has not yet been migrated. The new reference is warmer, more graphic, and
more black-led.

Suggested balance:

- Soft Mint and Warm Cream should do most of the environmental work.
- Ink Black should provide structure, controls, and confidence.
- Seafoam, Yellow, Coral, and Sky Blue should appear as bold blocks or list rows,
  not washed-out accents.
- Off White cards should sit on Soft Mint, Warm Cream, or white space with
  rounded inflated edges.
- Do not let cream become the whole identity. Balance it with black, seafoam,
  coral, yellow, and blue.

## Graphic System

Use abstract travel-inspired graphics as a major brand device, especially on
launch, onboarding, empty states, and feature primers. The graphic language
should match the reference: cropped geometric planes, diagonal color fields,
black stripe overlays, white route lines, and phone mockups with colored content
rows.

Preferred elements:

- A large rounded hero panel, usually Seafoam or Soft Mint-based, with generous
  corner radii
- Cropped Sunset Coral, Journey Yellow, Sky Blue, and cream blocks entering from
  panel edges
- Black grounding shapes, black phone chrome, and black tab bars
- Diagonal black stripe patterns used boldly enough to read as a brand device
- Thin white route lines, waypoint dots, arcs, and simple map-like paths
- Small black, coral, or seafoam dots to imply progression and stops
- Off White floating cards that sit over the artwork like live Journey
  information
- Cream phone screens with coral, yellow, seafoam, and blue content rows
- Big negative space and confident spacing around the whole composition

Avoid:

- Generic travel photos as the primary identity
- Tiny icon-in-a-square branding as the whole hero moment
- Overly literal airplane illustrations everywhere
- Gradient blobs, bokeh, decorative orbs, or glassy decoration
- Dense dashboards on first-contact screens
- Watered-down pastel panels where icons or text lose contrast
- Small, timid cards with tiny radius and faint shadows
- Dark teal as the dominant identity color

## Layout Principles

Design for an iPhone 15 Pro frame first, then ensure smaller phones still work.

- Let hero and onboarding screens be visually bold and simple.
- Use one primary idea per screen.
- Make the upper portion visual or contextual, and the lower portion decisional.
- Keep primary actions pinned near the lower safe area when appropriate.
- Use cards for actual grouped content, not as wrappers around every section.
- Do not nest cards inside cards.
- Cards should be oversized, tactile, and rounded. A reference feature card is a
  wide Off White row with a 40px to 52px radius, Mist Line border, soft shadow,
  white icon tile, bold title, and substantial Slate support text.
- Keep repeated list rows compact, scannable, and aligned inside the phone UI.
- Prefer native-feeling segmented controls, toggles, sheets, lists, and menus.
- Keep tap targets comfortable: aim for 44px minimum.
- Avoid letting the hero consume so much height that headline, copy, and CTA
  feel squeezed.
- Avoid adding secondary text under the CTA unless it is necessary for the task.

## Typography

Default type should feel clean, confident, and readable.

- Use Figtree for most UI text.
- Use Fraunces sparingly for brand moments such as the Onward wordmark.
- Headlines should be direct, heavy, and slightly editorial, not
  marketing-fluffy.
- Body copy should be short, concrete, and reassuring, but card copy may be
  larger and heavier than typical metadata.
- Do not scale font size with viewport width.
- Avoid negative letter spacing.
- Use uppercase micro-labels sparingly for categories and metadata.
- Keep body copy line-height tight enough to feel designed, but not cramped.
- Watch for orphan words in hero copy. Rewrite or constrain width when needed.

## Launch And Onboarding

The launch/welcome experience should establish the graphic brand immediately.

Preferred launch direction:

- Soft Mint or Warm Cream background with a clean top brand area
- Fraunces `Onward` wordmark in Ink Black or a very dark brand tone
- Optional context pills only when they clarify the screen; avoid default
  decorative chips on launch
- Abstract Journey artwork in a large rounded panel or full-phone composition,
  but not so tall that the page feels crowded
- Floating "Next" card over the artwork with time, title, metadata, and an icon
- Ink Black headline, centered or strongly anchored
- Short Slate support copy with balanced line breaks
- Black pill CTA with white text
- No secondary sign-in note unless the screen is specifically an auth choice

Possible headline style:

`Travel plans, calmly organised.`

Preferred support copy:

`Your reservations become clear, calm Journey plans.`

Avoid copy that leaves a single-word orphan such as `timelines.` on its own
line.

Keep the transient loading state separate from the first user-facing welcome
screen. Loading can be quiet; welcome should be memorable.

Launch visual anatomy:

- Top brand row: simple, intentional, and not overfilled
- Hero panel: Soft Mint or Seafoam base, Coral/Yellow/Sky Blue/Cream shapes,
  black stripe pattern, route lines, waypoint dots
- Overlay card: Off White, highly rounded, useful, and legible
- Copy block: one headline, one support sentence
- CTA block: one primary button

## Components

Buttons:

- Primary action: Ink Black filled pill, white text.
- Secondary action: Off White, Warm Cream, or outline surface with Ink Black text.
- Destructive action: use red only when truly destructive.
- Avoid too many same-weight buttons on a screen.

Cards:

- Off White card on Soft Mint, Warm Cream, or white space.
- Mist Line border and soft external shadow are part of the reference card
  style.
- Rounded corners should be very generous. Use 32px minimum for small cards and
  40px to 52px for large feature rows.
- Icon tiles inside cards should be white or very light, rounded around 22px to
  28px, and large enough to feel tactile.
- Text inside cards should be left-aligned, bold, and spacious. Titles are heavy
  Ink Black; support copy is Slate and semi-bold.
- Cards should contain real grouped information: reservations, Journey summaries,
  documents, expenses, or settings groups.

Lists:

- Use strong left alignment.
- Pair icons with text only when the icon clarifies the row.
- Keep metadata in Slate.
- Use color labels for status, but never rely on color alone.

Progress and status:

- Ink Black or Seafoam for normal progress depending on background contrast.
- Sunset Coral for warm attention.
- Journey Yellow for active, optimistic, or highlighted states when legibility is
  strong.
- Red only for urgent or destructive states.
- Always pair status color with explicit text.

## Product Language

Use:

- Journey
- Journeys
- Timeline
- Reservation
- Now
- Next
- Import
- Review
- Connected inbox
- Travel document

Do not use:

- Trip
- Trips
- Magic
- Guaranteed
- Rebook automatically unless the product truly supports it
- Payment succeeded unless a real payment confirmation exists
- Booking complete before the provider confirms it

## Screen Review Checklist

Before considering a screen done, check:

- Does it follow the palette above?
- Is the main job of the screen obvious in three seconds?
- Is there one clear primary action?
- Does the screen feel like Onward, not a generic app template?
- Is there enough visual distinction between hero, content, and actions?
- Are text and controls readable against the background?
- Does any status or financial/travel claim overpromise?
- Is Journey terminology used consistently?
- Does it avoid card nesting and decorative clutter?

## Implementation Notes For This Prototype

- Prefer the shared CSS variables in `src/styles/theme.css`.
- If a screen still contains legacy hardcoded colors, update them when that screen
  is redesigned rather than repainting the whole app blindly.
- Keep future visual redesigns screen-by-screen so product quality can be judged
  in context.
- If adding a new reusable pattern, place it near the relevant existing helper
  and keep the API small.
- Do not add new dependencies for design-only work unless the user explicitly
  asks for them.
