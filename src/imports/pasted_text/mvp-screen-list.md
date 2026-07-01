# Onward — Full MVP Screen List

This is the complete MVP inventory after consolidating screens that can share layouts. The MVP supports **Gmail only**, automatic reservation import, Journeys, Timeline, review flows, manual fallback, offline access, reminders and privacy controls.

## A. Launch and onboarding

### 1. Launch / Session Resolution

Shown while Onward determines:

* Whether the user is signed in
* Whether onboarding is complete
* Whether cached data exists
* Whether an active Journey exists
* Which tab should open

This is a branded loading state, not a marketing screen.

### 2. Welcome

Contains:

* Onward logo
* Core product promise
* Brief explanation
* Continue with Apple
* How Onward works
* Privacy Policy
* Terms

### 3. How Onward Works

Explains:

1. Connect Gmail
2. Onward finds supported reservations
3. Reservations become organised Journeys
4. The Timeline shows what is happening now and next

Includes privacy reassurance and a Continue action.

### 4. Import Your Reservations

Contains:

* Connect Gmail
* Explanation of automatic importing
* Continue without connecting
* Link to detailed email privacy information

### 5. Connect Gmail Primer

Shown before Google’s OAuth interface.

Contains:

* Which permission is required
* Why email access is needed
* What Onward does not do
* Connect Gmail
* Cancel

Google authentication itself happens in a secure external authentication session.

### 6. Gmail Connected

Contains:

* Connected Gmail address
* Success state
* What happens next
* Scan inbox
* Skip scan for now

### 7. Choose Scan Range

Options:

* Last 30 days
* Last 90 days
* Last 12 months
* Custom range

Primary action:

* Find my reservations

### 8. Scan Progress

Contains:

* Current scan stage
* Candidate messages found
* Reservations imported
* Items needing review
* Continue in background
* Cancel where practical

### 9. Scan Results

Contains:

* Reservations found
* Journeys created
* Reservations added to Journeys
* Needs-review count
* Duplicates skipped
* Unsupported messages

Actions:

* Review Imports
* View Journeys

---

# B. Primary application screens

Onward uses four stable tabs.

### 10. Timeline Home

When a Journey is active:

* Opens that Journey on today
* Shows Now and Next
* Shows today’s Timeline

When no Journey is active:

* No active Journey state
* Nearest upcoming Journey
* View Journeys
* Add Journey

### 11. Journeys Home

Contains:

* Current Journeys
* Upcoming Journeys
* Past Journeys
* Add Journey
* Search
* Review warning where relevant

Each Journey card shows:

* Journey name
* Destination
* Dates
* Status
* Reservation count
* Attention state

### 12. Imports Home

Contains:

* Connected Gmail account
* Last sync time
* Sync Now
* Active scan progress
* Import history

Filters:

* Needs Review
* Imported
* Processing
* Duplicate
* Unsupported
* Failed

### 13. Settings Home

Contains entry points for:

* Account
* Connected inboxes
* Notifications
* Import privacy
* Imported data
* Preferences
* Help
* About

---

# C. Journey screens

### 14. Journey Timeline

Used for active, upcoming and past Journeys.

Contains:

* Journey name
* Destination
* Date range
* Journey status
* Horizontal day selector
* Today shortcut
* All-day reservations
* Timed Timeline
* Add Plan
* Journey Details

Default day:

* Active Journey: today
* Upcoming Journey: first day
* Past Journey: first day

### 15. Active Journey Now and Next

This may appear as part of the Timeline or open as an expanded sheet.

Contains:

#### Now

* Current reservation
* End time
* Location or route
* Relevant booking context

#### Next

* Next reservation
* Start time
* Relative countdown
* Route or location
* Terminal, gate or platform

### 16. Journey Details

Contains:

* Journey name
* Destination
* Start and end dates
* Duration
* Status
* Notes
* Reservation count
* Needs-review count
* Import source summary

Actions:

* View Timeline
* Edit Journey
* Add Plan
* Scan for matching reservations
* Delete Journey

### 17. Add / Edit Journey

One reusable form containing:

* Journey name
* Destination
* Start date
* End date
* Notes
* Save
* Cancel

When editing dates, warn when reservations fall outside the new range.

### 18. Delete Journey Confirmation

Contains:

* Journey name
* What will be removed
* Whether imported source records remain
* Delete
* Cancel

### 19. Journey and Reservation Search

Searches:

* Journey names
* Destinations
* Reservation titles
* Providers
* Confirmation numbers

Includes filters for:

* Date
* Journey status
* Reservation type

---

# D. Reservation screens

### 20. Reservation Details

Contains type-appropriate information such as:

* Reservation type
* Title
* Provider
* Date and time
* Route or location
* Confirmation number
* Terminal
* Gate or platform
* Seat
* Check-in or checkout
* Contact details
* Notes
* Import source
* Last updated
* Cancellation state

Actions:

* Edit
* Copy confirmation number
* Open directions
* Open provider website
* Move to another Journey
* View change history
* Delete

### 21. Add Plan Type Picker

Contains:

* Flight
* Stay
* Transport
* Activity
* Restaurant
* Note
* Custom

Each option includes an icon and short explanation.

### 22. Add / Edit Reservation

A single type-aware reusable form.

Common fields:

* Type
* Title
* Start date and time
* End date and time
* All-day toggle
* Location
* Address
* Confirmation number
* Notes

The form reveals additional fields depending on type.

#### Flight fields

* Airline
* Flight number
* Origin
* Destination
* Terminals
* Gate
* Seat

#### Stay fields

* Property
* Address
* Check-in
* Checkout
* Contact details

#### Transport fields

* Transport subtype
* Provider
* Service number
* Origin
* Destination
* Platform
* Seat

#### Restaurant fields

* Venue
* Reservation time
* Party size
* Contact details

#### Activity fields

* Activity or event name
* Venue
* Start and end time
* Ticket or booking details

### 23. Move Reservation

Contains:

* Current Journey
* Suggested Journeys
* All Journeys
* Search
* Create new Journey
* Move
* Cancel

### 24. Delete Reservation Confirmation

Contains:

* Reservation title
* Journey
* Permanent-deletion warning
* Delete
* Cancel

For imported reservations, it may also include:

* Ignore future matching emails

### 25. Reservation Change History

Shows:

* Changed field
* Previous value
* Updated value
* Change date
* Source message date
* Cancellation or reinstatement history

---

# E. Import review screens

### 26. Review Imports List

Contains unresolved imports grouped or filtered by:

* Missing information
* Journey unclear
* Possible duplicate
* Unsupported layout
* Date or timezone issue

Each item shows:

* Detected reservation type
* Provider or sender
* Parsed title
* Date
* Destination
* Proposed Journey
* Warning reason

### 27. Review Import Details

Contains:

* Sender
* Subject
* Received date
* Safe source preview
* Detected reservation type
* Extracted fields
* Missing fields
* Parser warnings
* Proposed Journey
* Potential duplicate

Actions:

* Accept
* Edit and accept
* Choose Journey
* Create Journey
* Mark as not travel
* Delete import

### 28. Edit and Accept Import

Uses the same type-aware reservation form, but:

* Highlights missing information
* Highlights questionable values
* Includes Journey assignment
* Shows source-derived fields
* Saves the accepted reservation

### 29. Assign Import to Journey

Contains:

* Recommended Journey
* Other likely Journeys
* All Journeys
* Search
* Create a new Journey
* Assign

### 30. Create Journey from Import

Pre-filled with:

* Suggested Journey name
* Destination
* Start date
* End date
* Reservations to be included

The user can edit everything before saving.

### 31. Potential Duplicate Review

Compares:

* New import
* Existing reservation
* Provider
* Dates
* Route or location
* Confirmation number

Actions:

* Keep existing
* Replace existing
* Merge
* Keep both
* Mark as duplicate

### 32. Unsupported Import Details

Contains:

* Sender
* Subject
* Received date
* Why Onward could not read it
* Safe source preview

Actions:

* Add manually
* Mark as not travel
* Delete import
* Send feedback

### 33. Failed Import Details

Contains:

* Safe failure explanation
* Source metadata
* Retry
* Add manually
* Delete
* Contact support

---

# F. Connected Gmail and privacy screens

### 34. Connected Inboxes

For the MVP, this primarily lists Gmail.

Contains:

* Connected account
* Connection status
* Last successful sync
* Last attempted sync
* Connect Gmail
* Inbox settings

The structure should allow other providers later.

### 35. Connected Inbox Details

Contains:

* Provider
* Email address
* Connection date
* Last sync
* Current status
* Sync Now
* Reconnect
* Disconnect
* Delete imported source data
* Privacy information

### 36. Reauthentication Required

Shown when Gmail access expires or is revoked.

Contains:

* Affected email address
* Explanation
* Reconnect Gmail
* Disconnect
* Keep imported data explanation

### 37. Disconnect Gmail Confirmation

Contains:

* Gmail address
* Explanation that future scanning will stop
* Keep imported Journeys and reservations
* Remove data imported from this account
* Disconnect
* Cancel

### 38. Email Privacy

Explains:

* What Onward searches for
* What Onward reads
* What Onward does not change
* Raw-email retention
* Structured reservation storage
* Token security
* Gmail disconnection
* Account deletion

### 39. Manage Imported Email Data

Contains:

* Imported-message count
* Structured-reservation count
* Raw content retained for review
* Delete raw content
* Delete all imported data
* Export structured data

---

# G. Notifications

### 40. Notification Permission Primer

Shown before the native iOS permission request.

Explains notifications for:

* Upcoming reservations
* Hotel check-in and checkout
* Booking updates
* Cancellations
* Imports requiring review
* Gmail connection issues

Actions:

* Enable Notifications
* Not Now

### 41. Notification Settings

Contains toggles for:

* Upcoming reservation reminders
* Flights
* Transport
* Hotel check-in
* Hotel checkout
* Activities
* Imports needing review
* Booking updates
* Cancellations
* Sync errors

Also contains:

* Default reminder timing
* Open iOS notification settings

---

# H. Account and application settings

### 42. Account

Contains:

* User name
* Sign-in method
* Account creation date
* Connected Gmail account count
* Journey count
* Export data
* Sign out
* Delete account

### 43. Sign Out Confirmation

Contains:

* Explanation of local cached data
* Sign Out
* Cancel

### 44. Delete Account

Contains:

* Everything that will be deleted
* Gmail credentials
* Raw imported messages
* Structured imports
* Journeys
* Reservations
* Sessions

Requires explicit confirmation.

### 45. Account Deletion Progress and Result

Shows:

* Revoking Gmail access
* Deleting imported data
* Deleting Journeys
* Clearing local cache
* Completion or retry state

On success, returns to Welcome.

### 46. Preferences

A consolidated MVP settings screen containing:

* System, light or dark appearance
* 12-hour or 24-hour time
* Date format
* First day of week
* Distance units
* Show timezone labels

### 47. Help and Support

Contains:

* Connecting Gmail
* Missing reservations
* Duplicate reservations
* Incorrect details
* Review Imports
* Disconnecting Gmail
* Deleting data
* Contact support

### 48. Contact Support

Contains:

* Support category
* Message
* Optional diagnostic-data consent
* App version
* iOS version
* Send

Sensitive email or reservation information should not be attached automatically.

### 49. About Onward

Contains:

* Logo
* Product description
* App version
* Build number
* Website
* Privacy Policy
* Terms
* Licences
* Support

---

# I. Required system and empty states

These are not necessarily separate navigation destinations, but each needs a designed interface.

### 50. No Journeys

Contains:

* Empty-state message
* Connect Gmail
* Add Journey manually

### 51. No Active Journey

Contains:

* Nearest upcoming Journey
* View Journeys
* Add Journey

### 52. Empty Journey Timeline

Contains:

* Selected day
* Nothing planned
* Add Plan
* Scan Gmail

### 53. No Imports

Contains:

* No import activity
* Scan Gmail
* Connect Gmail if disconnected

### 54. No Review Items

Contains:

* “You’re all caught up”
* Return to Imports or Journeys

### 55. No Search Results

Contains:

* Query
* Clear search
* Remove filters

### 56. Offline State

Contains:

* Offline indicator
* Last sync time
* Explanation of cached availability
* Retry connection

### 57. Scan Error

Contains:

* What failed
* Whether Gmail needs reconnection
* Retry
* Reconnect Gmail
* Dismiss

### 58. General Error

Contains:

* Clear message
* Retry
* Return to Journeys
* Error reference
* Contact support

### 59. Service Unavailable

Contains:

* Server unavailable
* Cached Journeys remain accessible
* Retry
* Continue offline

### 60. Sync Conflict

Shown only when an automatic merge risks data loss.

Contains:

* Local value
* Server value
* Keep local
* Keep server
* Review and merge

---

# Final MVP screen count

The complete MVP contains:

* **49 dedicated screens, sheets and confirmation flows**
* **11 required empty, offline and error states**
* **60 total designed destinations and states**

Many should share reusable components rather than being designed as separate systems:

* One Add/Edit Journey form
* One type-aware Add/Edit Reservation form
* One reservation-detail layout
* One import-detail layout
* Shared confirmation sheets
* Shared empty and error-state components

## Core screens to design first

The product can be defined visually through these 12 screens:

1. Welcome
2. Import Your Reservations
3. Scan Progress
4. Scan Results
5. Journeys Home
6. Journey Timeline
7. Now and Next
8. Reservation Details
9. Imports Home
10. Review Imports
11. Review Import Details
12. Settings

## Explicitly outside this MVP

* Outlook connection
* Personal forwarding email address
* Map screen
* Document wallet
* Journey sharing
* Collaboration
* Live flight status
* Traffic-aware leave times
* AI parsing or assistance
* Booking marketplace
* Expense splitting
* Loyalty tracking
* Destination recommendations
