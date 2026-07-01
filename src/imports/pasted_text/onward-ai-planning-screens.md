Extend the existing native iOS application **Onward** by designing the complete **Phase 4: AI-Assisted Planning, Discovery and Personalisation** screen set.

Do not redesign the MVP, Phase 2 or Phase 3 screens.

Reuse and expand the existing Onward:

* Colour system
* Typography
* Spacing
* Components
* Cards
* Navigation
* Timeline patterns
* Reservation patterns
* Map patterns
* Document patterns
* Collaboration patterns
* Settings patterns
* Empty states
* Loading states
* Error states

# Product context

Onward is a personal travel organiser that:

* Imports travel reservations
* Groups them into Journeys
* Presents them as chronological Timelines
* Stores maps and documents
* Supports live travel information
* Supports collaboration between travellers

Phase 4 adds an intelligent planning and assistance layer.

It allows users to:

* Ask questions about a Journey
* Generate a Journey plan
* Optimise individual days
* Replan after unexpected changes
* Discover relevant places
* Fill free time
* Receive proactive Journey insights
* Create briefings
* Build packing and preparation lists
* Save personal travel preferences
* Use translation and local-assistance tools

The assistant must enhance the existing Journey rather than replace verified reservation data.

# Important product rules

The assistant must clearly distinguish between:

* Confirmed reservations
* User-created plans
* Assistant suggestions
* External information
* Live provider data
* Inferences

Assistant suggestions must never look identical to confirmed reservations.

The assistant must not silently:

* Move confirmed reservations
* Delete reservations
* Change Journey dates
* Share Journey information
* Contact providers
* Replace a confirmed booking

Significant actions require explicit confirmation.

The assistant must acknowledge uncertainty and display sources when appropriate.

Do not design:

* In-app flight booking
* In-app hotel booking
* A travel marketplace
* Sponsored recommendations
* Public social profiles
* A travel social feed
* Loyalty-point management
* Group payments
* Expense splitting
* Creator travel guides

# Platform

Design for native iOS.

Primary frame:

* iPhone 15 Pro
* 393 × 852 points

Layouts should also adapt to:

* Smaller iPhones
* Pro Max devices
* Dynamic Type
* VoiceOver
* Increased Contrast
* Reduce Motion
* Light mode
* Dark mode

Use native-feeling:

* Navigation stacks
* Tab bars
* Sheets
* Bottom sheets
* Forms
* Search
* Menus
* Context menus
* Confirmation dialogs
* Maps
* Voice input
* Audio controls
* Pickers
* Toggle controls
* Swipe actions
* System sharing
* Permission primers

# Existing primary navigation

Keep the existing four primary tabs:

1. Timeline
2. Journeys
3. Imports
4. Settings

Add a clear entry point to the **Onward Assistant**.

Recommended options:

* Assistant button in the Timeline and Journey toolbar
* Persistent assistant action inside Journey screens
* Assistant section inside the Timeline tab
* Optional fifth tab only if it does not overcrowd the interface

Prefer integrating the assistant into the existing Journey experience rather than making it feel like a disconnected chatbot application.

# Product terminology

Use:

* Journey
* Journeys
* Timeline
* Reservation
* Assistant
* Suggestion
* Planned item
* Confirmed reservation
* Optimise
* Replan
* Today’s Brief
* Journey Insights
* Saved place
* Travel preferences
* Source
* Context

Do not use:

* Trip
* Trips
* Magic
* Guaranteed
* Perfect itinerary
* Best possible plan
* Live status unless live provider data actually exists

# Visual direction

Maintain the existing Onward personality:

* Calm
* Assured
* Spacious
* Premium but restrained
* Helpful
* Transparent
* Travel-aware
* Native to iOS
* Easy to scan while moving
* Personal without feeling intrusive

The assistant should feel like part of Onward, not like a generic chatbot placed inside the app.

Use:

* Strong information hierarchy
* Clear source labels
* Clear suggestion labels
* Reservation-type SF Symbols
* Native materials used sparingly
* Large essential actions
* Accessible contrast
* Clear confirmation states
* Clear before-and-after comparisons
* Subtle conversational styling
* Purposeful accent colour
* Distinct styling for confirmed and suggested items

Avoid:

* Chat bubbles dominating every screen
* Excessive gradients
* Glass effects everywhere
* Neon AI aesthetics
* Robot illustrations
* Sparkles on every assistant action
* Dense dashboards
* Tiny text
* Decorative metrics
* Fake certainty
* Cards nested repeatedly
* Long unstructured assistant paragraphs
* Hiding sources
* Hiding significant changes

# Reusable Phase 4 components

Create reusable components for:

* Assistant message
* User message
* Suggested prompt chip
* Assistant action card
* Source citation row
* Context chip
* Journey context card
* Confirmed reservation card
* Suggested plan card
* Optional-plan card
* Recommendation card
* Place card
* Insight card
* Warning card
* Before-and-after comparison
* Assistant loading state
* Voice-input state
* Audio-player control
* Planning-progress step
* Preference selector
* Interest chip
* Budget selector
* Pace selector
* Free-time gap card
* Optimisation summary
* Day-plan card
* Packing-list row
* Checklist row
* Translation card
* Confidence or uncertainty message
* Assistant privacy row
* Memory item row

Create states for:

* Confirmed
* Suggested
* Optional
* Accepted
* Rejected
* Saved
* Loading
* Generating
* Needs review
* Uncertain
* Source unavailable
* Outdated
* Offline
* Disabled
* User-edited
* Provider-controlled
* Assistant-derived
* Conflict detected

# Phase 4 screens

# A. Onward Assistant

## 1. Assistant Home

Purpose:

Provide a central entry point for Journey assistance.

Include:

* Greeting
* Active or upcoming Journey context
* Current destination where relevant
* Suggested prompts
* Recent conversations
* Start new conversation
* Voice input
* Attach Journey context
* Attach reservation
* Attach document
* Explore destination
* Plan a new Journey

Suggested prompts:

* “What is next?”
* “Plan my free afternoon.”
* “Make tomorrow less rushed.”
* “Find dinner near my hotel.”
* “What should I prepare before departure?”
* “Summarise this Journey.”
* “What can I do near my next reservation?”
* “Help me replan after this delay.”

Variants:

* Active Journey
* Upcoming Journey
* No Journey selected
* Offline
* Assistant disabled
* First-time empty state

---

## 2. Journey Assistant Conversation

A conversation linked to one specific Journey.

Include:

* Journey name
* Journey dates
* Current day context
* Conversation thread
* User messages
* Assistant responses
* Suggested follow-up prompts
* Structured action cards
* Sources
* Attachments
* Text input
* Voice input
* Add context
* Clear conversation
* Conversation options

Assistant responses may reference:

* Confirmed reservations
* Manual plans
* Journey dates
* Documents
* Traveller preferences
* Current location with permission
* Saved places
* Weather where available
* Live travel status where available

Responses should use:

* Short paragraphs
* Structured cards
* Timeline previews
* Clear actions
* Source links
* Confirmation steps

Do not show only large blocks of chat text.

---

## 3. General Travel Assistant Conversation

Used when no Journey is selected.

Include:

* General travel conversation
* Destination search
* Planning prompts
* Current assistant context
* Choose existing Journey
* Create Journey from conversation
* Save answer
* Recent conversations

Clearly state when an answer is not connected to a saved Journey.

---

## 4. Assistant Context Sheet

Show exactly what the assistant is using.

Include:

* Selected Journey
* Selected Journey day
* Included reservations
* Included documents
* Included travellers
* Current location permission
* Saved travel preferences
* Live-data access
* Weather access
* Remove individual context
* Add context
* Clear all context

Each context source should show:

* Source type
* Scope
* Last updated where relevant
* Whether it is confirmed or inferred

---

## 5. Assistant Sources

Display sources used in a response.

Include:

* Source title
* Provider
* Official-source indicator
* Publication or update date
* Relevant excerpt
* Data freshness
* Open source
* Reservation source
* Live-data source
* User-provided source
* Assistant inference label

Clearly distinguish:

* Imported reservation email
* User edit
* Provider live data
* External web source
* Assistant inference

---

## 6. Voice Assistant

Create a focused voice interaction.

Include:

* Listening state
* Audio visualisation
* Live transcription
* Current Journey context
* Stop
* Cancel
* Submit
* Spoken response
* Replay response
* Switch to text
* Permission state

Example requests:

* “What gate am I leaving from?”
* “What is next?”
* “Find lunch near the museum.”
* “Move tomorrow’s flexible plans later.”
* “Summarise today.”
* “What documents do I need?”

---

## 7. Assistant Conversation History

Include:

* Journey conversations
* General conversations
* Conversation title
* Journey association
* Date
* Last message
* Search
* Filter
* Rename
* Pin
* Delete
* Resume conversation

Filters:

* All
* Active Journey
* Upcoming Journeys
* Planning
* Discovery
* Preparation

---

## 8. Assistant Response Feedback

Opened from an assistant response.

Include:

* Helpful
* Not helpful
* Incorrect
* Outdated
* Unsafe recommendation
* Did not follow preferences
* Missing source
* Optional written feedback
* Consent before sharing Journey context
* Submit

Do not include private Journey information automatically.

---

# B. AI-assisted Journey creation

## 9. Plan a New Journey

Include:

* Destination
* Starting location
* Start date
* End date
* Flexible dates
* Number of travellers
* Journey purpose

Purpose options:

* Holiday
* Weekend
* Work
* Relaxation
* Adventure
* Food
* Culture
* Mixed

Actions:

* Continue
* Start from existing reservation
* Choose saved destination
* Cancel

---

## 10. Planning Preferences

Include:

* Travel pace:

  * Relaxed
  * Balanced
  * Full
* Interests
* Food preferences
* Typical start time
* Typical end time
* Indoor versus outdoor
* Popular places versus local places
* Free-time preference
* Accessibility requirements
* Avoidances
* Continue

Interest examples:

* Food
* History
* Museums
* Nature
* Shopping
* Nightlife
* Architecture
* Beaches
* Adventure
* Wellness
* Photography
* Family activities

---

## 11. Journey Budget

Include:

* Total budget
* Per-day budget
* Currency
* Accommodation already booked
* Transport already booked
* Budget flexibility

Budget categories:

* Food
* Activities
* Local transport
* Shopping
* Accommodation
* Other

Include a disclaimer that prices may change.

---

## 12. Traveller Selection

Include:

* Existing travellers
* Add traveller
* Solo Journey
* Adults
* Children
* Infants
* Traveller-specific preferences
* Accessibility requirements
* Continue

---

## 13. Planning Constraints

Include:

* Fixed reservations
* Must-do places
* Places to avoid
* Required free time
* Work hours
* Hotel check-in
* Hotel checkout
* Mobility limits
* Dietary requirements
* Rest requirements
* Earliest start time
* Latest end time
* Custom constraint
* Continue

---

## 14. Generating Journey Plan

Create a transparent progress state.

Possible stages:

* Reviewing your dates
* Checking existing reservations
* Grouping nearby places
* Balancing each day
* Estimating travel time
* Adding breaks
* Checking constraints
* Preparing your plan

Include:

* Continue in background
* Cancel
* View planning inputs
* Explanation that suggestions require review

Avoid fake percentage precision.

---

## 15. Generated Journey Overview

Include:

* Journey name
* Destination
* Dates
* Number of travellers
* Plan summary
* Daily overview
* Travel pace
* Existing confirmed reservations
* Suggested additions
* Optional items
* Unscheduled time
* Potential warnings
* Estimated daily movement
* Estimated cost range

Actions:

* Review each day
* Save Journey
* Regenerate
* Change preferences
* Compare alternatives
* Discard

---

## 16. Generated Day Plan

Include:

* Date
* Day title or theme
* Confirmed reservations
* Suggested activities
* Meal suggestions
* Travel time
* Breaks
* Free time
* Estimated costs
* Weather considerations
* Optional plans

Each suggested item should show:

* Suggested label
* Time
* Duration
* Location
* Reason
* Source
* Booking requirement

Actions:

* Accept day
* Edit
* Regenerate day
* Make more relaxed
* Add more activities
* Change neighbourhood
* Remove suggestion

---

## 17. Compare Generated Plans

Compare options such as:

* Relaxed
* Balanced
* Packed
* Budget-focused
* Food-focused
* Family-focused

Each plan should show:

* Number of activities
* Free time
* Estimated movement
* Estimated cost
* Daily start and end
* Key differences

Actions:

* Select plan
* Compare day by day
* Generate another option
* Return

---

## 18. Review Suggested Reservation Additions

Include:

* Suggested place or activity
* Suggested day and time
* Why it fits
* Estimated duration
* Estimated price
* Distance from nearby plans
* Booking requirement
* Source
* Opening-hours state

Actions:

* Add as planned
* Add as optional
* Save for later
* Open official website
* Replace suggestion
* Remove

Do not display these as confirmed bookings.

---

## 19. Save Generated Journey

Include:

* Journey summary
* Confirmed reservations
* Selected planned items
* Optional items
* Journey dates
* Journey name
* Traveller list
* Items requiring booking
* Items missing sources

Options:

* Save all
* Save selected items
* Save as draft
* Continue editing
* Cancel

---

## 20. Journey Plan Revision History

Include:

* Original generated plan
* User changes
* Assistant changes
* Version date
* Change summary
* Compare versions
* Restore version
* Rename version
* Delete version

---

# C. Day planning and optimisation

## 21. Optimise This Day

Opened from a Journey day.

Include:

* Current Timeline
* Confirmed reservations
* Flexible plans
* Optional plans
* Total travel time
* Current pace
* Free time
* Potential issues

Optimisation goals:

* Reduce travel time
* Make the day more relaxed
* Add one more activity
* Lower cost
* Prioritise must-do items
* Prioritise food
* Avoid bad weather
* Add more breaks
* End earlier

Actions:

* Generate optimisation
* Adjust constraints
* Cancel

---

## 22. Optimised Day Preview

Show before and after.

Include:

* Original Timeline
* Suggested Timeline
* Travel-time difference
* Timing changes
* Moved items
* Removed items
* Added breaks
* New suggestions
* Conflict warnings
* Explanation for each change

Actions:

* Apply all
* Apply selected changes
* Edit
* Regenerate
* Keep original

Confirmed reservations should appear locked unless explicitly edited.

---

## 23. Move Flexible Plans

Include:

* Flexible Journey items
* Current day and time
* Suggested new day or time
* Reason for change
* Travel-time impact
* Conflict state
* Multi-select
* Apply
* Cancel

---

## 24. Fill Free Time

Opened from a gap in the Timeline.

Include:

* Available time
* Current location
* Previous reservation
* Next reservation
* Maximum travel radius
* Suggested activities
* Food
* Cafés
* Parks
* Shopping
* Rest option
* Distance
* Duration
* Estimated cost

Filters:

* Nearby
* Free
* Indoor
* Outdoor
* Food
* Relaxed
* Family-friendly
* Open now

---

## 25. Free-Time Suggestion Detail

Include:

* Place or activity
* Images
* Category
* Description
* Opening hours
* Visit duration
* Travel time
* Distance
* Price range
* Reviews summary
* Accessibility
* Source
* Why it was recommended

Actions:

* Add to Timeline
* Add as optional
* Save
* Open website
* Open directions
* Replace suggestion
* Not interested

---

## 26. Replan Remaining Day

Used after a disruption or unexpected change.

Include:

* What changed
* Current time
* Current location
* Remaining confirmed reservations
* Flexible plans
* Optional plans
* Replanning goal

Goals:

* Preserve every possible plan
* Make the day less rushed
* Prioritise one activity
* Return to accommodation
* Find nearby alternatives
* End the day early

---

## 27. Replanned Day Preview

Include:

* Original remaining Timeline
* Revised Timeline
* Removed plans
* Moved plans
* Replacement suggestions
* Travel-time changes
* Conflicts
* Reservations requiring confirmation
* Explanation

Actions:

* Apply plan
* Apply selected changes
* Edit
* Regenerate
* Keep current plan

---

## 28. Journey-Wide Optimisation

Review the complete Journey.

Include:

* Total movement time
* Overloaded days
* Empty days
* Repeated routes
* Geographic inefficiencies
* Missing breaks
* Booking conflicts
* Weather-related concerns
* Suggestions grouped by day

Actions:

* Optimise entire Journey
* Review individual day
* Apply selected suggestions
* Save report
* Ignore

---

# D. Destination discovery

## 29. Explore Destination

Include:

* Destination
* Search
* Personalised recommendations
* Nearby places
* Saved places
* Map
* Category filters
* Current Journey context

Categories:

* Things to do
* Food
* Cafés
* Nightlife
* Nature
* Shopping
* Culture
* Family
* Day trips
* Hidden places
* Wellness
* Photography

---

## 30. Destination Guide

Include:

* Destination overview
* Neighbourhoods
* Local transport
* Typical opening hours
* Local customs
* Tipping
* Safety guidance
* Weather summary
* Currency
* Useful phrases
* Emergency information
* Official sources
* Last updated dates

Do not present legal, safety or entry information without sources and dates.

---

## 31. Recommendation Feed

Each card should include:

* Place
* Category
* Image
* Distance
* Opening status
* Price range
* Why recommended
* Relevant Journey day
* Save
* Add to Journey

Filters:

* Recommended
* Near Timeline
* Saved
* Free
* Open now
* Bad-weather options
* Traveller preferences

---

## 32. Discovery Map

Include:

* Recommended-place pins
* Saved-place pins
* Existing Journey reservations
* Current location
* Category filters
* Search this area
* Day filter
* Travel-time radius
* List toggle

Selecting a pin opens a recommendation detail sheet.

---

## 33. Place Detail

Include:

* Place name
* Category
* Images
* Address
* Opening hours
* Price range
* Typical visit duration
* Reviews summary
* Accessibility
* Contact details
* Official website
* Sources
* Why recommended
* Distance from Journey plans

Actions:

* Add to Journey
* Add as optional
* Save
* Open directions
* Share
* Not interested

---

## 34. Add Place to Journey

Include:

* Suggested Journey
* Journey day
* Suggested time
* Duration
* Flexible or fixed
* Nearby reservation context
* Notes
* Add to Timeline
* Add as optional
* Save for later

---

## 35. Saved Places

Include:

* Saved places
* Destination grouping
* Journey assignment
* Category
* Map view
* Search
* Notes
* Add to Journey
* Remove
* Share

---

## 36. Recommendation Preferences

Include:

* Interests
* Food
* Nightlife
* Museums
* Nature
* Shopping
* Adventure
* Wellness
* Family
* Popular attractions
* Local places
* Budget
* Accessibility
* Avoidances
* Save

---

# E. Proactive Journey intelligence

## 37. Journey Insights

A central screen for proactive suggestions.

Sections:

* Needs attention
* Opportunities
* Time-saving
* Cost-saving
* Weather-related
* Missing information
* Personalised recommendations

Each insight should include:

* Insight title
* Explanation
* Related Journey item
* Severity or category
* Source
* Suggested action
* Dismiss
* Apply

---

## 38. Journey Gap Detail

Include:

* Gap date
* Start and end time
* Previous location
* Next location
* Available duration
* Travel constraints
* Suggested uses:

  * Activity
  * Meal
  * Rest
  * Shopping
  * Leave empty

Actions:

* View suggestions
* Add note
* Keep free
* Dismiss insight

---

## 39. Overloaded Day Insight

Include:

* Day Timeline
* Number of activities
* Total movement
* Total free time
* Break duration
* Potential conflicts
* Explanation

Actions:

* Optimise day
* Move plans
* Remove optional items
* Keep plan
* Dismiss

---

## 40. Weather-Aware Suggestion

Include:

* Affected day
* Forecast
* Forecast source
* Update time
* Outdoor plans
* Indoor alternatives
* Suggested timing changes
* Confidence or uncertainty

Actions:

* Replace activity
* Move activity
* Keep current plan
* View forecast source

Do not present weather forecasts as certainty.

---

## 41. Local Event Suggestion

Include:

* Event
* Date
* Venue
* Distance
* Ticket requirement
* Price range
* Why it matches
* Official source

Actions:

* Add to Journey
* Add as optional
* Save
* Open ticket provider
* Not interested

---

## 42. Missing Journey Essential

Examples:

* No accommodation found
* Airport transfer missing
* Reservation missing address
* Document not downloaded
* Entry requirement not reviewed
* No return transport
* Important import unresolved

Include:

* Missing item
* Why it may matter
* Related date
* Suggested action
* Mark resolved
* Dismiss

---

# F. Briefings

## 43. Today’s Journey Brief

Include:

* Date
* Destination
* Weather summary
* First reservation
* Key transport
* Accommodation
* Important documents
* Potential issues
* Free-time opportunities
* Local notes
* Collaboration updates where relevant

Actions:

* View Timeline
* Ask Onward
* Play audio summary
* Share briefing

---

## 44. Tomorrow’s Preview

Include:

* Tomorrow’s date
* First reservation
* Transport
* Activities
* Accommodation
* Weather
* Documents needed
* Preparation reminders
* Potential issues
* Suggested actions

---

## 45. Journey Summary

Include:

* Journey overview
* Destinations
* Dates
* Travellers
* Main reservations
* Day-by-day summary
* Free time
* Important preparation
* Review items
* Documents
* Budget range where available

Actions:

* Ask a question
* Share summary
* Export
* Generate audio briefing

---

## 46. Audio Briefing Player

Include:

* Briefing title
* Journey
* Playback controls
* Progress
* Transcript
* Playback speed
* Skip section
* Download
* Offline indicator
* Close

---

## 47. Briefing Settings

Include:

* Daily briefing
* Tomorrow preview
* Delivery time
* Audio briefing
* Weather
* Reservations
* Documents
* Suggestions
* Budget
* Collaboration updates
* Notification delivery
* Per-Journey override

---

# G. Travel preferences and personalisation

## 48. Travel Preferences

Include:

* Travel pace
* Typical start time
* Typical end time
* Preferred break time
* Activity density
* Popular versus local
* Indoor versus outdoor
* Planning flexibility
* Spontaneity
* Save preferences
* Use behaviour to improve suggestions

---

## 49. Food Preferences

Include:

* Cuisine preferences
* Dietary requirements
* Allergies
* Vegetarian
* Vegan
* Halal
* Kosher
* Spice preference
* Budget
* Fine dining versus casual
* Avoided foods
* Save

---

## 50. Accessibility and Mobility Preferences

Include:

* Step-free access
* Wheelchair access
* Walking tolerance
* Break frequency
* Avoid stairs
* Hearing support
* Visual support
* Accessible transport
* Accessible accommodation
* Additional notes
* Save

Explain how preferences affect recommendations.

---

## 51. Budget Preferences

Include:

* Typical Journey budget
* Daily budget
* Accommodation range
* Food range
* Activity range
* Local transport preference
* Currency
* Budget flexibility
* Save

---

## 52. Traveller Preference Detail

Include:

* Traveller
* Food preferences
* Interests
* Accessibility
* Pace
* Budget
* Sleep schedule
* Age-relevant considerations
* Apply to all Journeys
* Save

---

## 53. Personalisation Summary

Include:

* Explicit preferences
* Inferred preferences
* Saved places
* Dismissed suggestions
* Recommendation history
* Frequent Journey patterns
* Edit
* Reset personalisation
* Disable inferred personalisation

Clearly distinguish:

* User-provided
* Inferred
* Imported
* Journey-specific

---

# H. Packing and preparation

## 54. Smart Packing List

Include:

* Journey
* Destination
* Dates
* Weather context
* Planned activities
* Travellers
* Packing progress
* Suggested categories
* Personal items
* Shared items
* Add item

Categories:

* Essentials
* Clothing
* Documents
* Electronics
* Toiletries
* Activity-specific
* Medication
* Shared items

---

## 55. Packing Suggestion Detail

Include:

* Suggested item
* Reason
* Relevant weather
* Relevant activity
* Quantity
* Traveller assignment
* Add
* Dismiss
* Never suggest again

---

## 56. Packing List Item Detail

Include:

* Item name
* Category
* Quantity
* Traveller
* Packed state
* Notes
* Reminder
* Move category
* Delete

---

## 57. Journey Preparation Assistant

A preparation-focused conversation screen.

Suggested prompts:

* “What am I forgetting?”
* “What documents do I need?”
* “What should I pack?”
* “What must I do before departure?”
* “Create a preparation checklist.”
* “What should I download offline?”

Include:

* Journey context
* Suggested prompts
* Structured checklist actions
* Sources
* Conversation input

---

## 58. Preparation Checklist

Include sections:

* Documents
* Check-in
* Packing
* Transport
* Home preparation
* Connectivity
* Money
* Health
* Custom

Each task should include:

* Task
* Due date
* Traveller
* Completion state
* Related reservation
* Reminder
* Notes

---

# I. Language and local assistance

## 59. Phrasebook

Include:

* Destination language
* Common categories
* Saved phrases
* Search
* Pronunciation
* Play audio
* Offline status

Categories:

* Greetings
* Directions
* Transport
* Food
* Hotel
* Emergency
* Shopping
* Medical

---

## 60. Translate Phrase

Include:

* Source language
* Destination language
* Text input
* Voice input
* Translation
* Pronunciation
* Play audio
* Copy
* Save phrase
* Full-screen display
* Offline availability state

---

## 61. Full-Screen Translation Card

Designed to show another person.

Include:

* Large translated text
* Original text
* Language labels
* Reverse languages
* Play audio
* Close

Use extremely large, readable typography.

---

## 62. Local Essentials

Include:

* Emergency numbers
* Local transport
* Currency
* Tipping
* Power outlets
* Cultural etiquette
* Common cautions
* Useful applications
* Embassy or consular links where relevant
* Sources
* Last updated

---

# J. Assistant controls, transparency and privacy

## 63. Assistant Settings

Include:

* Enable Onward Assistant
* Journey context access
* Reservation access
* Document access
* Location access
* Traveller preference access
* Live-data access
* Weather access
* Conversation history
* Voice responses
* Personalised recommendations
* Proactive suggestions
* Data controls

---

## 64. Assistant Data Controls

Include:

* Data used by assistant
* Saved conversation history
* Journey data access
* Reservation access
* Document access
* Location access
* Personalisation data
* Delete assistant history
* Reset personalisation
* Pause personalisation
* Export assistant data
* Model-improvement contribution toggle where applicable

Use plain language.

---

## 65. Manage Assistant Memory

Include:

* Saved preferences
* Inferred preferences
* Frequent destinations
* Food preferences
* Travel pace
* Accessibility preferences
* Saved exclusions
* Individual memory rows

Actions:

* Edit
* Delete
* Pause memory
* Forget inferred preferences
* Clear all memory

---

## 66. Clear Conversation Confirmation

Include:

* Conversation title
* Journey
* Explanation
* Clear conversation
* Cancel

---

## 67. Uncertain Answer State

Use when the assistant cannot reliably answer.

Include:

* Clear uncertainty statement
* Missing information
* Sources checked
* What is known
* What is unknown
* Suggested next step

Actions:

* Add information
* Check official source
* Ask differently
* Contact provider
* Return to Timeline

The assistant must not fabricate an answer.

---

## 68. Conflicting Information State

Include:

* Source one
* Source two
* Conflicting values
* Update times
* Official-source indicator
* Recommended verification
* Choose value where user action is appropriate

---

## 69. Assistant Offline State

Include:

* Assistant unavailable offline
* Cached Journey data remains available
* Timeline shortcut
* Documents shortcut
* Saved briefings
* Saved translations
* Retry when connected

---

## 70. Confirm Assistant Action

Required before significant changes.

Examples:

* Move several plans
* Replace a day plan
* Delete a reservation
* Change Journey dates
* Share Journey information
* Contact an external service
* Apply an optimisation

Include:

* Proposed action
* Items affected
* Before-and-after summary
* Warnings
* Confirm
* Edit
* Cancel

# Phase 4 system states

Create reusable states for:

## 71. Assistant First-Use State

* Explain assistant capabilities
* Explain limitations
* Start
* Review privacy settings

## 72. No Journey Context

* Choose Journey
* Continue generally
* Create Journey

## 73. Generating Response

* Progress animation
* Current task
* Cancel
* Continue in background where appropriate

## 74. Plan Generation Failed

* Clear explanation
* Retry
* Adjust preferences
* Save current inputs

## 75. No Recommendations Found

* Explain why
* Expand search
* Change preferences
* Keep free time

## 76. Source Unavailable

* Source unavailable
* Last known information
* Retry
* Open official provider

## 77. Outdated Recommendation

* Last updated time
* Refresh
* Verify before acting

## 78. Personalisation Disabled

* Explain effect
* Enable
* Continue without personalisation

## 79. Packing List Complete

* Completion message
* Review list
* Add another item

## 80. Preparation Complete

* “You appear ready for this Journey.”
* View optional suggestions
* Open Journey

# Prototype flows

Create clickable prototype flows for the following.

## Flow 1 — Ask about an active Journey

Timeline
→ Assistant Home
→ Journey Assistant Conversation
→ Ask “What is next?”
→ Structured answer
→ Open Reservation

## Flow 2 — Generate a new Journey

Assistant Home
→ Plan a New Journey
→ Planning Preferences
→ Budget
→ Traveller Selection
→ Planning Constraints
→ Generating Journey Plan
→ Generated Journey Overview
→ Generated Day Plan
→ Save Generated Journey

## Flow 3 — Optimise a day

Journey Timeline
→ Optimise This Day
→ Select goal
→ Optimised Day Preview
→ Apply selected changes
→ Confirm Assistant Action
→ Updated Timeline

## Flow 4 — Fill free time

Journey Timeline gap
→ Fill Free Time
→ Recommendation list
→ Free-Time Suggestion Detail
→ Add Place to Journey
→ Timeline

## Flow 5 — Replan after disruption

Disruption Alert
→ Replan Remaining Day
→ Replanned Day Preview
→ Apply selected changes
→ Confirm Assistant Action
→ Updated Timeline

## Flow 6 — Explore destination

Journey Timeline
→ Explore Destination
→ Recommendation Feed
→ Place Detail
→ Add Place to Journey
→ Timeline

## Flow 7 — Review Journey insight

Journey Details
→ Journey Insights
→ Overloaded Day Insight
→ Optimise This Day
→ Optimised Day Preview

## Flow 8 — Daily briefing

Notification
→ Today’s Journey Brief
→ Play audio
→ Audio Briefing Player
→ Open Timeline

## Flow 9 — Create packing list

Journey Details
→ Smart Packing List
→ Packing Suggestion Detail
→ Add item
→ Packing List

## Flow 10 — Translation

Journey Timeline
→ Local Assistance
→ Translate Phrase
→ Full-Screen Translation Card

## Flow 11 — Review assistant context

Journey Assistant
→ Assistant Context Sheet
→ Remove document context
→ Return to conversation

## Flow 12 — Confirm major action

Journey Assistant
→ Suggest moving plans
→ Confirm Assistant Action
→ Review changes
→ Confirm
→ Updated Timeline

# Required deliverables

Generate:

* All 80 Phase 4 screens and system states
* Reusable Phase 4 components
* High-fidelity light-mode designs
* Dark-mode variants for the most important screens
* Auto Layout on every frame
* Consistent variables and styles
* Clickable prototype flows
* Clear frame names
* Clear component names
* Clear layer names
* Accessible typography
* Dynamic Type-aware layouts
* Realistic Journey content
* Clear confirmed-versus-suggested states
* Clear assistant-source labels
* Clear privacy controls
* Clear uncertainty states
* Explicit confirmation before significant changes

Prioritise high-fidelity designs for:

1. Assistant Home
2. Journey Assistant Conversation
3. Assistant Context Sheet
4. Generated Journey Overview
5. Generated Day Plan
6. Optimise This Day
7. Optimised Day Preview
8. Fill Free Time
9. Explore Destination
10. Place Detail
11. Journey Insights
12. Today’s Journey Brief
13. Smart Packing List
14. Translate Phrase
15. Confirm Assistant Action
16. Assistant Data Controls
