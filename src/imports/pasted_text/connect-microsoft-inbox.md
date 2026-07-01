Extend the existing native iOS application **Onward** by designing the complete **Phase 2 screen set**.

Do not redesign the MVP onboarding, authentication, Journeys Home, Timeline, Imports, reservation forms or Settings Home unless a Phase 2 feature requires a small extension.

Reuse and expand the existing Onward component system, typography, colour palette, spacing, cards, navigation patterns and visual language.

# Product context

Onward is a personal travel organiser that imports reservation emails, groups them into Journeys and presents them as a chronological Timeline.

Phase 2 expands the product with:

* Microsoft inbox importing
* A personal forwarding address
* Journey maps
* Travel documents
* Journey readiness and conflict detection
* Better booking-change review
* Journey merging and splitting
* Sharing
* Calendar export
* Per-Journey notifications
* Traveller management
* iOS Share Extension
* Stronger offline controls

Do not introduce:

* AI functionality
* AI itinerary generation
* Booking marketplaces
* Social feeds
* Live flight tracking
* Live gate information
* Expense splitting
* Loyalty points
* Destination recommendations

# Platform

Design for native iOS.

Primary frame:

* iPhone 15 Pro
* 393 × 852 points

Use native-feeling:

* Navigation stacks
* Tab bars
* Sheets
* Bottom sheets
* Forms
* Maps
* Menus
* Context menus
* Confirmation dialogs
* Share sheets
* Pickers
* Toggles
* Swipe actions

Support:

* Light mode
* Dark mode
* Dynamic Type
* VoiceOver-friendly hierarchy
* Accessible contrast
* Larger tap targets

# Existing primary navigation

Keep the existing four-tab structure:

1. Timeline
2. Journeys
3. Imports
4. Settings

Phase 2 adds new screens inside Journeys, Imports and Settings.

Within an individual Journey, provide access to:

* Timeline
* Map
* Documents
* Journey Details

This may use a segmented control, compact tab treatment or toolbar navigation that still feels native to iOS.

# Visual direction

Maintain the existing Onward personality:

* Calm
* Premium but restrained
* Spacious
* Clear
* Dependable
* Travel-aware
* Native to iOS

Avoid:

* Dense dashboards
* Excessive gradients
* Glass effects everywhere
* Tiny airport-board typography
* Decorative statistics
* Dark luxury-travel clichés
* Cards nested inside several other cards
* Copying TripIt
* Fake live information

# Reusable Phase 2 components

Create reusable components for:

* Map pin
* Selected map pin
* Map reservation preview
* Document card
* Document category chip
* Offline badge
* Locked-document state
* Readiness checklist row
* Conflict warning row
* Change comparison row
* Journey selection row
* Traveller avatar
* Permission selector
* Shared-link status card
* Calendar option row
* Notification preference row
* Forwarding address card
* Inbox provider card
* File import source row

Create component states for:

* Default
* Selected
* Loading
* Disabled
* Offline
* Warning
* Error
* Missing information
* Locked
* Downloaded
* Not downloaded
* Shared
* Expired
* Cancelled

# Phase 2 screens

## 1. Connect Microsoft Inbox

Purpose:

Allow users to connect Outlook, Hotmail or Microsoft 365 for automatic reservation importing.

Include:

* Microsoft or Outlook provider icon
* Headline:

  * “Connect your Microsoft inbox”
* Explanation that Onward searches for supported travel confirmations
* Read-only access explanation
* Clear statement that Onward does not:

  * Send email
  * Delete email
  * Mark messages as read
* Supported account types:

  * Outlook.com
  * Hotmail
  * Microsoft 365
* Connect Microsoft button
* Cancel
* Email privacy link

Also design:

* Loading state
* Permission-denied state
* Connection-failed state
* Organisational-account restriction state

---

## 2. Microsoft Inbox Connected

Shown after successful connection.

Include:

* Connected email address
* Provider
* Success indicator
* Scan range selector
* Last 30 days
* Last 90 days
* Last 12 months
* Custom range
* Find my reservations
* Skip scan for now
* Connect another inbox

This screen should reuse the existing Gmail-connected visual language.

---

## 3. Forward a Confirmation

Purpose:

Allow users to forward booking emails without connecting an inbox.

Include:

* Personal forwarding address
* Copy button
* Share button
* Instructions:

  1. Open the confirmation email
  2. Forward it to the Onward address
  3. Onward will process it and notify the user
* Explanation that forwarded reservations use the same review and duplicate-detection system
* Supported-content disclaimer
* View import history
* Regenerate forwarding address
* Disable forwarding address

The forwarding address must feel private and security-sensitive.

Example visual format:

`plans+7K9M4X@import.onward.app`

Do not expose a sequential user identifier.

---

## 4. Forwarded Email Received

Design this as a notification destination or success sheet.

Include:

* Email subject
* Sender
* Detected reservation type
* Processing result
* Linked Journey
* Needs Review state when applicable
* View Journey
* Review Import
* Dismiss

Variants:

* Imported successfully
* Needs review
* Duplicate detected
* Unsupported confirmation
* Processing failed

---

# Journey Map

## 5. Journey Map

Purpose:

Show every useful Journey location visually.

Include:

* Journey name
* Date range
* Timeline / Map / Documents navigation
* Full-screen Apple Map
* Day filter
* All days option
* Today option during an active Journey
* Pins for:

  * Airports
  * Stations
  * Hotels
  * Restaurants
  * Activities
  * Rental-car locations
  * Transfers
* Route line between consecutive locations where appropriate
* Current or next location highlight
* Re-centre map button
* User-location button where permission exists
* List view toggle
* Missing-location warning
* Open in Maps action

Use distinct symbols by reservation type without making the map visually noisy.

Do not design custom turn-by-turn navigation.

---

## 6. Map Location Detail Sheet

Opened when a map pin is selected.

Include:

* Reservation icon
* Reservation title
* Date and time
* Address
* Journey day
* Relevant provider
* Route summary where applicable
* Open Reservation
* Open in Apple Maps
* Open in Google Maps when available
* Copy address
* Call venue where a phone number exists

Use a native bottom sheet that leaves part of the map visible.

---

## 7. Journey Locations List

Alternative list view for the Journey Map.

Include:

* Day grouping
* Reservation type icon
* Location name
* Address
* Time
* Missing-location state
* Open directions
* Filter by reservation type
* Search locations

Selecting an item should return to the map and focus its pin.

---

## 8. Missing Location Details

Shown when an itinerary item has no usable coordinates or address.

Include:

* Reservation title
* Current location information
* Explanation of what is missing
* Add address
* Search place
* Use current location
* Skip
* Remove warning

This may be a sheet rather than a full screen.

---

# Travel documents

## 9. Journey Documents Home

Purpose:

Store travel documents and tickets for a Journey.

Include:

* Journey name
* Timeline / Map / Documents navigation
* Search
* Add Document
* Offline availability status
* Category filters:

  * All
  * Boarding passes
  * Tickets
  * Stays
  * Insurance
  * Visa
  * Other
* Important documents section
* Documents grouped by Journey day or reservation
* Unattached documents section

Each document card should show:

* Document title
* File type
* Related reservation
* Date
* Downloaded or offline state
* Locked state
* QR-code indicator where applicable

Empty state:

* “Keep every travel document in one place.”
* Add from Files
* Add from Photos
* Scan a document

---

## 10. Add Document

Use a native sheet.

Include import options:

* Choose from Files
* Choose from Photos
* Scan Document
* Take Photo
* Import from Clipboard where appropriate

After selection, show:

* File preview
* Document title
* Category
* Related Journey
* Attach to reservation
* Journey-level document option
* Mark as important
* Make available offline
* Require Face ID
* Save
* Cancel

---

## 11. Document Detail

Include:

* Full document preview
* Document title
* File type
* Category
* Related reservation
* Related Journey
* Added date
* Offline state
* Privacy state
* QR code in a large scannable presentation when relevant

Actions:

* Open Reservation
* Share
* Rename
* Change category
* Attach to another reservation
* Make available offline
* Require Face ID
* Remove download
* Delete

The interface should prioritise fast access while travelling.

---

## 12. Attach Document to Reservation

Include:

* Search reservations
* Suggested reservation
* Journey-day grouping
* Reservation icon
* Reservation title
* Date and time
* Current attachment state
* Attach
* Create new manual reservation
* Keep at Journey level

---

## 13. Document Privacy Settings

Include:

* Require Face ID to open sensitive documents
* Hide preview thumbnails
* Lock when app enters background
* Download only on Wi-Fi
* Keep selected Journey documents offline
* Explanation of local storage and device security

Use clear privacy language rather than technical terminology.

---

# Journey preparation and conflicts

## 14. Journey Readiness

Purpose:

Help users identify missing information before travel.

Do not present a gamified score.

Include grouped sections:

### Needs attention

Examples:

* Hotel address missing
* Reservation has no confirmation number
* Unreviewed import
* Overlapping bookings
* Missing document
* Ambiguous timezone
* Journey day without accommodation

### Ready

Examples:

* Flights confirmed
* Stay details complete
* Important documents downloaded
* Notifications enabled

### Optional preparation

Examples:

* Add restaurant reservation
* Download documents offline
* Add traveller details
* Share Journey

Each item should show:

* Issue or completed item
* Related reservation
* Suggested action
* Severity
* Resolve button

Include:

* Last checked time
* Refresh
* Dismiss optional suggestion
* View resolved items

---

## 15. Conflict Details

Shown when two or more itinerary items may conflict.

Include:

* Clear conflict title
* Explanation in plain language
* Affected reservations
* Visual time comparison
* Locations
* Estimated issue type

Supported conflict examples:

* Overlapping reservations
* Too little connection time
* Departure before hotel checkout
* Two stays booked for the same night
* Reservation outside Journey dates
* Airport mismatch
* Missing accommodation night
* Ambiguous timezone

Actions:

* Edit first reservation
* Edit second reservation
* Ignore warning
* Mark as resolved
* View on Timeline
* View on Map

Do not claim a connection is impossible unless Onward has authoritative data.

Use language such as:

“This connection may be difficult.”

---

# Booking changes

## 16. Booking Change Review

Purpose:

Explain meaningful updates detected from a later reservation email.

Include:

* Reservation title
* Provider
* Journey
* Source date
* Change summary
* Before-and-after comparison

Examples:

* Departure time changed
* Arrival time changed
* Terminal changed
* Seat changed
* Stay dates changed
* Reservation cancelled
* Reservation reinstated

Each changed field should show:

* Previous value
* New value
* Change type
* Source

Actions:

* Accept changes
* Keep my edited value
* Review Reservation
* Dismiss notification
* View full change history

Visually distinguish:

* Provider update
* User-entered value
* Derived value

---

# Journey organisation

## 17. Review Suggested Journey Merge

Shown when Onward believes two Journeys may belong together.

Include:

* Journey A summary
* Journey B summary
* Date ranges
* Destinations
* Reservation count
* Visual combined Timeline preview
* Explanation of why the merge was suggested

Actions:

* Merge Journeys
* Keep separate
* Review reservations
* Dismiss suggestion

---

## 18. Merge Journeys

Include:

* Select primary Journey name
* Edit merged Journey name
* Combined destination
* Combined date range
* All reservations from both Journeys
* Duplicate warnings
* Conflicting reservations
* Keep original Journeys archived option
* Merge
* Cancel

Clearly explain that all reservations will move into one Journey.

---

## 19. Split Journey

Include:

* Current Journey summary
* Reservation list grouped by day
* Multi-select reservations
* Create new Journey from selected reservations
* Suggested split point
* New Journey name
* New destination
* New date range
* Split Journey
* Cancel

The original Journey should retain unselected reservations.

---

## 20. Move Multiple Reservations

Include:

* Multi-select reservation list
* Filter by day
* Filter by type
* Current Journey
* Destination Journey
* Create new Journey
* Selected reservation count
* Move
* Cancel

---

# Sharing

## 21. Share Journey

Purpose:

Create a safe, read-only version of a Journey.

Include sharing formats:

* Private web link
* PDF
* Plain-text itinerary
* Calendar file
* System share sheet

Privacy controls:

* Include Journey dates
* Include reservation times
* Include addresses
* Include traveller names
* Include confirmation numbers
* Include notes
* Include documents
* Hide cancelled reservations

Recommended defaults:

* Hide confirmation numbers
* Hide traveller names
* Hide notes
* Hide documents

Include:

* Preview shared Journey
* Create link
* Export PDF
* Copy summary

---

## 22. Shared Link Settings

Include:

* Link status
* Copy link
* Share link
* Expiration:

  * Never
  * 24 hours
  * 7 days
  * Custom
* Require passcode
* View count where privacy-safe
* Included-content summary
* Edit privacy
* Disable link
* Regenerate link

States:

* Active
* Expired
* Disabled
* Failed to create

---

## 23. Shared Journey Preview

Show the exact read-only experience recipients will see.

Include:

* Journey name
* Destination
* Dates
* Day-by-day itinerary
* Privacy-safe reservation details
* Hidden-information indicators where useful
* Map links
* No edit controls

Do not expose:

* Hidden confirmation numbers
* Private notes
* Account information
* Connected inbox details

---

# Calendar integration

## 24. Calendar Export

Include:

* Export entire Journey
* Export selected reservations
* Add to Apple Calendar
* Download calendar file
* Subscribe to Onward calendar

Options:

* Flights
* Stays
* Transport
* Activities
* Restaurants
* Notes
* Cancelled reservations
* Include reservation notes
* Include confirmation number

Include duplicate-prevention explanation.

Show:

* Selected calendar
* Event count
* Export
* Cancel

---

## 25. Calendar Sync Settings

Include:

* Calendar connection status
* Selected destination calendar
* Automatically update events
* Automatically add new Journey reservations
* Remove cancelled events
* Include confirmation numbers
* Last sync
* Sync Now
* Disconnect calendar

---

# Notifications

## 26. Journey Notification Settings

Configure notifications for one Journey.

Include:

* Journey name
* Master toggle
* Flights
* Ground transport
* Stay check-in
* Stay checkout
* Activities
* Restaurants
* Booking changes
* Cancellations
* Daily briefing
* Tomorrow summary
* Missing-information reminders
* Document reminders

Timing options:

* Default
* Custom
* Off

Also include:

* Quiet hours
* Use global defaults
* Reset to defaults

---

# Travellers

## 27. Travellers

Include:

* Journey traveller list
* Traveller avatar or initials
* Name
* Number of assigned reservations
* Add Traveller
* Invite later placeholder only if collaboration is not yet built

Actions:

* Open traveller
* Assign reservations
* Remove traveller

Do not require passport details.

---

## 28. Add / Edit Traveller

Include:

* Full name
* Preferred name
* Email, optional
* Phone, optional
* Notes, optional
* Save
* Cancel

Optional travel-specific fields may include:

* Loyalty number
* Seat preference
* Dietary notes

Do not include:

* Passport number
* Government ID
* Highly sensitive identity data

---

## 29. Assign Reservations to Traveller

Include:

* Traveller name
* Reservation list grouped by Journey day
* Multi-select
* Select all
* Flights
* Stays
* Activities
* Documents belonging to the traveller
* Save assignments

Support reservations assigned to:

* One traveller
* Multiple travellers
* Everyone

---

# iOS Share Extension

## 30. Share to Onward

This screen appears inside the iOS Share Extension.

Supported incoming content:

* PDF
* Image
* Screenshot
* Webpage
* Plain text
* Calendar file

Include:

* Content preview
* Detected content type
* Choose Journey
* Review later
* Attach to reservation
* Save as document
* Submit for import
* Optional note
* Cancel
* Save

Keep the extension interface very compact and native.

---

## 31. Share Extension Journey Picker

Include:

* Suggested Journey
* Current Journey
* Upcoming Journeys
* Search
* Create new Journey
* Review later
* Save

---

# Offline and storage

## 32. Offline Journey Settings

Include:

* Make entire Journey available offline
* Reservation details
* Documents
* QR codes
* Map area
* Change history
* Contact details
* Estimated storage size
* Download Now
* Remove Offline Data

Show:

* Download progress
* Last updated
* Pending changes
* Storage warning

---

## 33. Offline Downloads

A global Settings screen.

Include:

* Total storage used
* Downloaded Journeys
* Documents storage
* Map storage
* Pending downloads
* Failed downloads
* Download on Wi-Fi only
* Remove all offline data

Each Journey row should show:

* Journey name
* Size
* Last updated
* Download state
* Remove action

---

## 34. Pending Sync Details

Shown when local changes have not reached the server.

Include:

* Journey
* Pending edits
* Pending documents
* Last sync attempt
* Current network state
* Retry
* Continue offline
* Discard local change only with confirmation

---

# Phase 2 system states

Design reusable states for:

## 35. Map Empty State

* No mapped locations
* Add location
* Open Timeline

## 36. Map Offline State

* Cached map availability
* Download map
* Continue with reservation list

## 37. Documents Empty State

* No documents
* Add from Files
* Add from Photos
* Scan Document

## 38. Document Locked State

* Face ID required
* Unlock
* Cancel

## 39. Readiness Complete State

* “This Journey looks ready.”
* View Journey
* Review optional suggestions

## 40. No Conflicts State

* “No scheduling conflicts found.”
* Return to Readiness

## 41. No Shared Links State

* No active links
* Share Journey

## 42. Microsoft Reauthentication Required

* Connected address
* Reconnect
* Disconnect
* Keep imported data explanation

## 43. Forwarding Address Error

* Address unavailable
* Retry
* Contact support
* Use connected inbox instead

## 44. Offline Download Error

* Failed content
* Storage or connection reason
* Retry
* Manage storage

# Prototype interactions

Create clickable prototype flows for:

## Flow 1 — Connect Microsoft

Settings
→ Connected Inboxes
→ Connect Microsoft Inbox
→ Microsoft Inbox Connected
→ Choose scan range
→ Existing Scan Progress screen

## Flow 2 — Forward a confirmation

Imports
→ Forward a Confirmation
→ Copy forwarding address
→ Forwarded Email Received
→ View Journey

## Flow 3 — Use the Journey Map

Journey Timeline
→ Map
→ Select hotel pin
→ Map Location Detail
→ Open directions

## Flow 4 — Add a document

Journey Documents
→ Add Document
→ Choose from Files
→ Attach to Reservation
→ Document Detail

## Flow 5 — Prepare for a Journey

Journey Details
→ Journey Readiness
→ Conflict Details
→ Edit Reservation
→ Return to Readiness

## Flow 6 — Merge Journeys

Journeys
→ Review Suggested Journey Merge
→ Merge Journeys
→ Combined Journey Timeline

## Flow 7 — Share a Journey

Journey Details
→ Share Journey
→ Configure privacy
→ Shared Journey Preview
→ Create private link
→ Shared Link Settings

## Flow 8 — Calendar export

Journey Details
→ Calendar Export
→ Select reservation types
→ Choose calendar
→ Export confirmation

## Flow 9 — Assign travellers

Journey Details
→ Travellers
→ Add Traveller
→ Assign Reservations
→ Save

## Flow 10 — Save from another app

iOS Share Sheet
→ Share to Onward
→ Select Journey
→ Save as document
→ Journey Documents

# Required deliverables

Generate:

* All 44 Phase 2 screens and system states
* Reusable Phase 2 components
* Light-mode designs
* Dark-mode variants for the most important screens
* Clickable prototype flows
* Clear screen names
* Consistent Auto Layout
* Reusable variables and styles
* Accessible type hierarchy
* Components that extend the existing Onward design system

Prioritise high-fidelity designs for:

1. Journey Map
2. Journey Documents
3. Journey Readiness
4. Conflict Details
5. Share Journey
6. Forward a Confirmation
7. Merge Journeys
8. Journey Notification Settings
9. Travellers
10. Share to Onward
