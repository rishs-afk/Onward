# Onward Design Language

Use this document as the default design brief for all future Onward prompts,
screen generation, and redesign work unless the user explicitly overrides it.
It is intentionally product-specific: Onward should not look like a generic
travel dashboard or a stock shadcn demo.

## Core Direction

Onward is a calm, graphic, native-feeling travel organiser. It turns scattered
reservations into clear Journey timelines. The visual language should feel:

- Calm, premium, and useful under pressure
- Graphic and memorable without becoming decorative clutter
- Native to iOS, but not visually anonymous
- Warm and human, with enough structure for dense travel information
- More like an editorial mobile product than a SaaS dashboard

The reference direction is an expressive mobile UI with soft pastel surfaces,
bold abstract geometry, simple black/Ink typography, rounded cards, and confident
color blocking. Borrow its graphic confidence and layout rhythm, not its
subscription-product content.

## Palette

Use this palette as the default source of truth.

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Primary brand | Deep Ocean | `#153E4A` | Brand marks, deep text accents, key structure |
| Primary action | Tidal Teal | `#1E7A78` | Main actions, selected states, progress |
| Light accent | Seafoam | `#BDE3DC` | Large soft panels, abstract shapes, calm highlights |
| Warm accent | Sunset Coral | `#F2765E` | Important emphasis, warm graphic shapes, alerts when not destructive |
| App background | Cloud | `#F5F7F6` | Main app background |
| Card surface | White | `#FFFFFF` | Cards and floating surfaces |
| Primary text | Ink | `#172126` | Main text |
| Secondary text | Slate | `#68757B` | Supporting text and metadata |
| Borders | Mist | `#DDE4E3` | Dividers, card borders, inactive progress |
| Muted background | Pale Sand | `#EEEAE1` | Secondary controls, subtle grouped areas |

Avoid returning to the previous beige-heavy palette or old navy/coral pairings
unless a legacy screen is being intentionally preserved during migration.

## Graphic System

Use abstract travel-inspired graphics as a major brand device, especially on
launch, onboarding, empty states, and feature primers.

Preferred elements:

- Large rounded color planes in Seafoam, Pale Sand, Sunset Coral, and Cloud
- Diagonal blocks and cropped geometric shapes
- Thin route lines, waypoint dots, arcs, and simple map-like paths
- Occasional high-contrast black or Deep Ocean stripe patterns
- Big negative space and confident spacing
- Shapes that crop off-screen or under the dynamic island for energy

Avoid:

- Generic travel photos as the primary identity
- Tiny icon-in-a-square branding as the whole hero moment
- Overly literal airplane illustrations everywhere
- Gradient blobs, bokeh, decorative orbs, or glassy decoration
- Dense dashboards on first-contact screens

## Layout Principles

Design for an iPhone 15 Pro frame first, then ensure smaller phones still work.

- Let hero and onboarding screens be visually bold and simple.
- Use one primary idea per screen.
- Make the top half visual or contextual, and the lower half decisional.
- Keep primary actions pinned near the lower safe area when appropriate.
- Use cards for actual grouped content, not as wrappers around every section.
- Do not nest cards inside cards.
- Keep repeated list rows compact, scannable, and aligned.
- Prefer native-feeling segmented controls, toggles, sheets, lists, and menus.
- Keep tap targets comfortable: aim for 44px minimum.

## Typography

Default type should feel clean, confident, and readable.

- Use Figtree for most UI text.
- Use Fraunces sparingly for brand moments such as the Onward wordmark.
- Headlines should be direct and slightly editorial, not marketing-fluffy.
- Body copy should be short, concrete, and reassuring.
- Do not scale font size with viewport width.
- Avoid negative letter spacing.
- Use uppercase micro-labels sparingly for categories and metadata.

## Launch And Onboarding

The launch/welcome experience should establish the graphic brand immediately.

Preferred launch direction:

- Cloud or Seafoam background
- Large abstract travel composition in the upper portion of the screen
- Ink or Deep Ocean headline
- Short supporting copy in Slate
- Deep Ocean or near-black pill CTA with white text
- Tidal Teal or Sunset Coral used as a small progress or emphasis color

Possible headline style:

`Travel plans, calmly organised.`

Possible support copy:

`Onward turns reservations into clear Journey timelines.`

Keep the transient loading state separate from the first user-facing welcome
screen. Loading can be quiet; welcome should be memorable.

## Components

Buttons:

- Primary action: Deep Ocean or Tidal Teal filled pill, white text.
- Secondary action: transparent or Pale Sand surface with Ink text.
- Destructive action: use red only when truly destructive.
- Avoid too many same-weight buttons on a screen.

Cards:

- White card on Cloud or Pale Sand backgrounds.
- Mist borders and soft shadows only where depth helps.
- Rounded corners can be generous, but keep them consistent.
- Cards should contain real grouped information: reservations, Journey summaries,
  documents, expenses, or settings groups.

Lists:

- Use strong left alignment.
- Pair icons with text only when the icon clarifies the row.
- Keep metadata in Slate.
- Use color labels for status, but never rely on color alone.

Progress and status:

- Tidal Teal for normal progress.
- Sunset Coral for warm attention.
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
