Extend the existing native iOS application **Onward** by designing the complete **Phase 3: Live Travel and Collaboration** screen set.

Do not redesign the MVP or Phase 2 screens. Reuse and expand the existing Onward:

* Colour system
* Typography
* Spacing
* Components
* Cards
* Navigation
* Timeline patterns
* Map patterns
* Document patterns
* Form patterns
* Empty states
* Error states

# Product context

Onward is a personal travel organiser that imports reservation emails, groups related reservations into Journeys and presents them as a chronological Timeline.

Phase 3 makes Onward more useful during active travel and enables shared Journeys.

The phase focuses on:

* Live flight and transport status
* Delays and cancellations
* Connection-risk warnings
* Leave-by guidance
* Airport and station mode
* Boarding-pass and ticket quick access
* Baggage information
* Collaborative Journeys
* Member permissions
* Shared Journey activity
* Comments
* Optional traveller-location sharing
* Live travel alerts

Do not introduce:

* AI functionality
* AI itinerary generation
* AI email parsing
* In-app flight or hotel booking
* Expense splitting
* Loyalty programmes
* Destination recommendations
* Public profiles
* Social feeds
* Travel marketplaces

# Platform

Design for native iOS.

Primary frame:

* iPhone 15 Pro
* 393 × 852 points

Ensure layouts also adapt to:

* Smaller iPhones
* Pro Max devices
* Dynamic Type
* Light mode
* Dark mode

Use native-feeling:

* Navigation stacks
* Tab bars
* Sheets
* Bottom sheets
* Maps
* Forms
* Menus
* Context menus
* Swipe actions
* Confirmation dialogs
* Native sharing
* Pickers
* Toggle controls
* Permission primers

# Existing navigation

Keep the existing four primary tabs:

1. Timeline
2. Journeys
3. Imports
4. Settings

Phase 3 screens should appear within existing Journey, Timeline and Settings flows.

During an active Journey, the Timeline remains the default home.

# Product terminology

Use:

* Journey
* Journeys
* Timeline
* Reservation
* Live status
* Traveller
* Journey member
* Now
* Next
* Alert
* Connection
* Leave by

Do not use:

* Trip
* Trips
* AI assistant
* Smart magic
* Guaranteed
* Rebook unless an actual booking service exists

# Visual direction

Maintain the existing Onward personality:

* Calm
* Assured
* Spacious
* Premium but restrained
* Travel-aware
* Clear under pressure
* Easy to scan while moving
* Native to iOS

Live information should feel urgent when necessary, but not alarmist.

Use:

* Strong information hierarchy
* Large essential times
* Clear status language
* Accessible contrast
* Reservation-type SF Symbols
* Subtle status colours
* Clear primary actions
* Minimal visual noise
* Native materials used sparingly

Avoid:

* Dense airline dashboards
* Constant red warning banners
* Excessive gradients
* Glass effects everywhere
* Tiny airport-board typography
* Decorative statistics
* Fake live information
* Overuse of badges
* Cards nested repeatedly
* Copying airline apps or TripIt

Do not communicate status through colour alone. Pair colour with text and icons.

# Reusable Phase 3 components

Create reusable components for:

* Live status badge
* Delay badge
* Cancellation badge
* Boarding-status badge
* Countdown display
* Disruption banner
* Alert card
* Connection-risk card
* Leave-by card
* Live reservation card
* Gate and terminal row
* Platform row
* Boarding-pass card
* Ticket card
* Baggage card
* Journey-member row
* Member avatar
* Permission selector
* Activity-history row
* Comment bubble
* Location-sharing row
* Live map marker
* Traveller map marker
* Data freshness label
* Last-updated indicator
* Provider-data disclaimer

Create states for:

* On time
* Scheduled
* Boarding
* Gate closing
* Delayed
* Diverted
* Cancelled
* Landed
* Changed
* Action required
* Stale data
* Offline
* Loading
* Unsupported
* Permission required

# Phase 3 screens

# A. Live Journey experience

## 1. Live Journey Home

Create an enhanced active-Journey Timeline screen.

Include:

* Journey name
* Current destination or Journey stage
* Current local date and time
* Live status summary
* Important disruption banner when needed
* Now section
* Next section
* Countdown to next reservation
* Leave-by recommendation where available
* Today’s chronological Timeline
* Quick access to boarding pass or ticket
* Quick access to Journey Map
* View all alerts
* Journey Details
* Day selector

The most important information should be visible without scrolling where practical.

Variants:

* Everything on time
* Upcoming flight
* Active transport
* Delayed flight
* Cancellation requiring action
* No live-data coverage
* Offline with cached information

---

## 2. Live Status Centre

Purpose:

Provide one place for all live updates in the current Journey.

Include sections:

* Action required
* Delayed
* Cancelled
* Changed
* On time
* Recently updated

Each live-status row should contain:

* Reservation type
* Reservation title
* Provider
* Current status
* Original time
* Updated time
* Delay duration
* Last updated
* Required action where applicable

Filters:

* All
* Flights
* Trains
* Buses
* Ferries
* Stays
* Activities

Include:

* Refresh
* Last checked time
* Data-source disclaimer
* Empty no-disruptions state

---

## 3. Flight Live Status

Include:

* Airline
* Airline logo or initials treatment
* Flight number
* Route
* Departure airport
* Arrival airport
* Scheduled departure
* Estimated departure
* Scheduled arrival
* Estimated arrival
* Flight status
* Departure terminal
* Gate
* Boarding time
* Boarding group
* Seat
* Aircraft type when available
* Delay duration
* Last updated
* Data source

Actions:

* View boarding pass
* View connection
* Open airport map
* Share flight status
* Contact airline
* Open airline application or website

Create variants for:

* Scheduled
* On time
* Boarding
* Gate closing
* Delayed
* Diverted
* Cancelled
* Landed
* Live data unavailable

Do not show unavailable information as placeholder dashes everywhere. Hide irrelevant rows.

---

## 4. Ground Transport Live Status

Support:

* Train
* Bus
* Ferry
* Other scheduled transport

Include:

* Operator
* Service number
* Origin
* Destination
* Scheduled departure
* Updated departure
* Scheduled arrival
* Updated arrival
* Platform
* Coach
* Seat
* Delay duration
* Cancellation status
* Last updated
* Data source

Actions:

* View ticket
* Open station directions
* View next connection
* Contact operator
* Share status

---

## 5. Disruption Alert Detail

Opened from a notification, Timeline banner or Live Status Centre.

Include:

* Clear disruption heading
* Affected reservation
* Journey
* Original schedule
* Updated schedule
* Delay duration
* Reason when available
* Impact on later reservations
* Last updated
* Data source
* Recommended action

Actions:

* Review affected plans
* View alternatives
* Contact provider
* Review connection
* Share alert
* Dismiss

Variants:

* Delay
* Terminal change
* Gate change
* Platform change
* Cancellation
* Diversion
* Reservation reinstated

---

## 6. Cancellation Detail

Include:

* Cancelled reservation
* Provider
* Original date and time
* Route or location
* Cancellation source
* Refund or rebooking information when available
* Affected later reservations
* Confirmation number
* Related documents

Actions:

* View alternatives
* Contact provider
* Keep cancelled item in Timeline
* Remove from active Timeline
* Add replacement manually
* Share with Journey members

Do not suggest that Onward can rebook directly unless a genuine booking integration exists.

---

## 7. Delay Impact Summary

Show how a delay may affect the rest of the Journey.

Include:

* Delayed reservation
* Original time
* Updated time
* Delay duration
* Potentially affected reservations
* Connection windows
* Transfer conflicts
* Hotel or activity conflicts
* Timeline preview
* Severity wording

Actions:

* Review affected reservations
* Mark reservation as unaffected
* Open connection details
* Contact provider
* Share impact summary

Use cautious language where the impact is not certain.

---

# B. Connections and alternatives

## 8. Connection Risk

Include:

* Incoming reservation
* Scheduled or estimated arrival
* Next reservation
* Scheduled or estimated departure
* Connection duration
* Arrival terminal or platform
* Departure terminal or platform
* Airport or station change
* Security, immigration or baggage considerations when known
* Distance between points where known
* Risk level
* Plain-language explanation

Risk levels:

* Comfortable
* Tight
* At risk
* Likely missed
* Unable to determine

Actions:

* View connection route
* View alternatives
* Contact provider
* Ignore warning
* Share with Journey members

Do not present estimates as certainty.

---

## 9. Connection Route

Include:

* Arrival gate, terminal or platform
* Next departure gate, terminal or platform
* Visual route
* Estimated walking or transfer time
* Security checkpoint
* Immigration
* Baggage reclaim and recheck where relevant
* Terminal shuttle
* Train or bus transfer
* Accessibility notes where available

Actions:

* Start directions
* Open airport or station map
* View next reservation
* Save route offline

---

## 10. Alternative Options

Purpose:

Display potential alternatives after a cancellation, delay or missed connection.

Include:

* Original reservation
* Alternative flights or transport
* Provider
* Departure
* Arrival
* Duration
* Stops
* Origin and destination
* Estimated impact on the Journey
* Availability disclaimer
* Last checked time

Sorting and filters:

* Earliest arrival
* Earliest departure
* Fewest stops
* Same provider
* Same airport or station

Actions:

* Open provider
* Compare
* Add manually
* Replace reservation

Do not imply that availability or prices are guaranteed.

---

## 11. Replace Reservation

Include:

* Existing reservation
* Proposed replacement
* Side-by-side comparison
* Time difference
* Route difference
* Provider difference
* Affected later items
* Documents or tickets that may become outdated

Options:

* Keep original as cancelled
* Replace in Timeline
* Add replacement without removing original
* Save manually
* Cancel

---

# C. Leave-by and directions

## 12. Leave-By Planner

Include:

* Next reservation
* Current or selected starting location
* Destination
* Required arrival time
* Estimated journey time
* Recommended buffer
* Check-in or security buffer
* Suggested leave-by time
* Traffic or transit condition where available
* Transport options

Actions:

* Start directions
* Change starting location
* Adjust buffer
* Set reminder
* Share leave-by time

Variants:

* Airport departure
* Train departure
* Restaurant reservation
* Activity
* No live traffic available
* Location permission unavailable

---

## 13. Leave-By Settings

Include:

* Domestic flight arrival buffer
* International flight arrival buffer
* Train and bus buffer
* Restaurant buffer
* Activity buffer
* Walking-time preference
* Accessibility requirements
* Include security estimate
* Include immigration estimate
* Use live traffic
* Reminder timing
* Reset to defaults

---

## 14. Live Journey Map

Extend the Phase 2 Journey Map.

Include:

* Current location
* Current reservation
* Next destination
* Suggested route
* Leave-by time
* Journey reservation pins
* Live status on affected pins
* Delayed or cancelled item styling
* Traveller locations only when explicitly shared
* Today / Current route / Entire Journey / Travellers modes
* Re-centre
* Map and list toggle
* Offline map state

---

## 15. Directions Handoff

Use a compact native bottom sheet.

Include:

* Destination
* Address
* Estimated duration
* Selected transport mode
* Apple Maps
* Google Maps when installed
* Other supported transit application
* Copy address
* Share destination
* Cancel

---

# D. Airport and station mode

## 16. Airport Mode

Create a focused, glanceable experience.

Include:

* Airline
* Flight number
* Route
* Flight status
* Terminal
* Gate
* Boarding time
* Boarding countdown
* Boarding group
* Seat
* Boarding pass
* Security information when available
* Connection summary
* Airport map
* Last updated

Use large typography and minimal decoration.

Actions:

* Open boarding pass
* Open airport map
* View connection
* Contact airline
* Share status

---

## 17. Station Mode

Equivalent focused experience for train, bus and ferry travel.

Include:

* Operator
* Service number
* Route
* Status
* Platform
* Coach
* Seat
* Departure time
* Countdown
* Ticket
* Connection summary
* Station map or directions
* Last updated

---

## 18. Boarding Pass Quick View

Create a full-screen, high-visibility pass view.

Include:

* Large QR code or barcode
* Passenger name
* Airline
* Flight number
* Origin
* Destination
* Date
* Boarding time
* Gate
* Seat
* Boarding group
* Offline-download indicator

Actions:

* Increase screen brightness
* Lock orientation
* Add to Apple Wallet where supported
* View reservation
* Close

Avoid unnecessary controls around the barcode.

---

## 19. Ticket Quick View

Use the same reusable system for:

* Train tickets
* Bus tickets
* Ferry tickets
* Activities
* Events

Include:

* Large scannable code
* Traveller name
* Provider
* Reservation title
* Date
* Time
* Platform or venue
* Seat
* Offline state
* View full reservation

---

## 20. Airport or Station Map

Include:

* Indoor map where available
* Current location
* Gate
* Platform
* Terminal
* Security
* Immigration
* Baggage claim
* Lounge
* Restrooms
* Food
* Ground transport
* Search
* Route to selected place
* Data-coverage disclaimer

Do not imply universal indoor-map availability.

---

# E. Baggage

## 21. Baggage Summary

Include:

* Journey flights
* Passenger
* Checked bags
* Cabin bags
* Allowance
* Bag-tag numbers
* Current bag status
* Baggage carousel
* Oversized-baggage information
* Report issue action

Group bags by passenger and flight.

---

## 22. Baggage Detail

Include:

* Bag-tag number
* Passenger
* Associated flight
* Current status
* Last known location
* Last updated
* Departure airport
* Arrival airport
* Baggage carousel
* Airline contact information
* Status-source disclaimer

Possible states:

* Checked in
* Loaded
* Transferred
* Arrived
* At carousel
* Delayed
* Status unavailable

---

## 23. Report Baggage Issue

Include:

* Affected bag
* Passenger
* Flight
* Airline
* Baggage-service location
* Bag-tag number
* Report reference field
* Add photo
* Add notes
* Attach report document
* Airline contact actions

Onward should organise information, not pretend to submit an airline claim unless that capability exists.

---

# F. Journey collaboration

## 24. Journey Members

Include:

* Journey owner
* Editors
* View-only members
* Pending invitations
* Member avatars
* Names
* Roles
* Last activity
* Invite Traveller

Actions:

* Change permission
* Remove member
* Resend invitation
* Cancel invitation
* Transfer ownership
* Leave Journey

---

## 25. Invite to Journey

Include:

* Invite by email
* Invite by phone number
* Share invitation link
* Recipient field
* Optional message

Permission choices:

* Can view
* Can add plans
* Can edit Journey

Explain what information each permission grants.

Actions:

* Send invitation
* Copy invitation link
* Cancel

---

## 26. Invitation Received

Include:

* Inviter
* Journey name
* Destination
* Dates
* Permission offered
* Information-access summary
* Member list preview
* Accept
* Decline
* View privacy details

---

## 27. Member Permissions

Include:

* Member name
* Current role
* Role presets:

  * Viewer
  * Contributor
  * Editor
* Permission summary

Advanced permissions where appropriate:

* View Timeline
* View documents
* View confirmation numbers
* Add plans
* Edit reservations
* Invite members
* Delete items
* Manage Journey

Actions:

* Save
* Remove from Journey
* Cancel

Prefer role presets over showing every toggle initially.

---

## 28. Journey Activity

Include a chronological activity feed.

Each row should show:

* Member avatar
* Member name
* Action
* Related Journey item
* Timestamp
* Change summary
* Open detail action

Examples:

* Added a restaurant
* Changed hotel dates
* Uploaded a document
* Moved a reservation
* Accepted an import
* Removed a traveller

Filters:

* All
* Reservations
* Documents
* Members
* Imports
* Comments

---

## 29. Activity Detail

Include:

* Member
* Action
* Date and time
* Related reservation or document
* Previous value
* Updated value
* Source
* Comment
* Restore previous value where permitted

---

## 30. Reservation Comments

Create a lightweight discussion attached to a reservation.

Include:

* Reservation summary
* Comment thread
* Member avatars
* Timestamps
* Mentions
* Add comment
* Attach image or document
* Resolve discussion
* Edit or delete own comment

Do not turn this into a general chat application.

---

## 31. Journey Discussion

Include:

* Journey-level discussion thread
* Pinned messages
* Links to reservations
* Member mentions
* Attachments
* Message composer
* Unread marker
* Search discussion

This should remain secondary to the Timeline.

---

## 32. Change Approval

Shown when a member proposes a change requiring approval.

Include:

* Proposing member
* Reservation
* Existing value
* Proposed value
* Reason or comment
* Related activity
* Approve
* Reject
* Discuss
* Edit before approval

---

## 33. Collaboration Notification Settings

Include per-Journey notification controls for:

* Invitations
* Reservation changes
* New plans
* Deleted plans
* Comments
* Mentions
* Documents
* Member changes
* Approval requests
* Daily collaboration summary

Include:

* Master toggle
* Quiet hours
* Use global defaults
* Reset to defaults

---

# G. Traveller-location sharing

Location sharing must always be explicit, temporary and revocable.

## 34. Traveller Locations

Include:

* Journey Map
* Members currently sharing location
* Traveller markers
* Last updated time
* Approximate or precise indicator
* Current destination
* Next Journey item
* Location-sharing status
* Privacy shortcut

Actions:

* Focus traveller
* Message or comment
* Stop viewing
* Manage sharing

Do not show a member who has not opted in.

---

## 35. Share My Location

Include duration choices:

* 1 hour
* Until end of day
* During this Journey
* Custom

Include:

* Select Journey members
* Precise or approximate location
* Background-sharing explanation
* Battery-use explanation
* Privacy explanation
* Start sharing
* Cancel

---

## 36. Location-Sharing Privacy

Include:

* Current sharing status
* Who can see the user
* Sharing duration
* Precision
* Last update
* Last access
* Stop sharing immediately
* Change recipients
* Change duration
* Change precision

---

# H. Travel alerts

## 37. Travel Alert Inbox

Include categories:

* Action required
* Delays
* Cancellations
* Gate changes
* Platform changes
* Connection risk
* Leave-by reminders
* Baggage
* Collaboration

Each alert row should contain:

* Journey
* Reservation
* Alert title
* Time
* Severity
* Read or unread state
* Open detail action

Include:

* Mark all as read
* Filter
* Search
* Empty state

---

## 38. Travel Alert Preferences

Include controls for:

* Live flight changes
* Gate changes
* Platform changes
* Delays
* Cancellations
* Connection risk
* Leave-by reminders
* Baggage updates
* Ground transport updates
* Collaboration alerts
* Critical Alerts where permitted
* Quiet hours
* Per-Journey overrides

---

## 39. Critical Travel Alert

Create a focused urgent-alert destination.

Include:

* Clear issue
* Affected reservation
* Time remaining
* Updated information
* Required action
* Impact on Journey
* Last updated
* Data source

Actions:

* View alternatives
* Contact provider
* Review connection
* Share with Journey members
* Dismiss where appropriate

Avoid alarming language unless immediate action is genuinely required.

---

# I. Live data settings

## 40. Live Data Settings

Include:

* Live flight status toggle
* Train and transport updates
* Traffic and leave-by estimates
* Indoor airport maps
* Baggage status
* Data-source explanation
* Refresh frequency
* Battery and data usage
* Use cellular data
* Background refresh
* Privacy information

---

## 41. Live Data Source Detail

Include:

* Provider name
* Data categories supplied
* Coverage
* Regions supported
* Last update
* Refresh behaviour
* Known limitations
* Privacy information
* Refresh now

---

## 42. Unsupported Live Data

Shown when Onward cannot provide live information for a reservation.

Include:

* Reservation
* Provider
* Explanation
* Last known reservation information
* Open official provider
* Refresh
* Enter manual status
* Report incorrect information

---

# Phase 3 system states

Design reusable states for the following.

## 43. Live Data Unavailable

Include:

* Cached reservation details
* Last update
* Retry
* Open provider website
* Continue offline

## 44. Status Out of Date

Include:

* Last update time
* Refresh
* Verify with provider
* Data may be stale explanation

## 45. No Disruptions

Include:

* “Everything currently looks on schedule.”
* Last checked time
* View Timeline

## 46. No Journey Members

Include:

* Brief collaboration explanation
* Invite someone
* Continue without inviting

## 47. Pending Journey Invitation

Include:

* Recipient
* Permission
* Date sent
* Resend
* Change permission
* Cancel invitation

## 48. Collaboration Offline

Include:

* Changes saved locally
* Pending-sync count
* Retry
* Continue offline
* View pending changes

## 49. Location Permission Required

Include:

* Why location improves the feature
* Open Settings
* Continue without location
* Privacy link

## 50. Location Sharing Ended

Include:

* Sharing stopped
* End time
* Restart sharing
* Return to Journey

# Prototype flows

Create clickable prototype flows for the following.

## Flow 1 — Flight delay

Live Journey Home
→ Disruption banner
→ Flight Live Status
→ Delay Impact Summary
→ Connection Risk
→ Alternative Options

## Flow 2 — Airport experience

Live Journey Home
→ Airport Mode
→ Boarding Pass Quick View
→ Airport Map
→ Connection Route

## Flow 3 — Leave-by guidance

Live Journey Home
→ Leave-By Planner
→ Adjust buffer
→ Set reminder
→ Directions Handoff

## Flow 4 — Cancellation

Travel Alert Inbox
→ Cancellation Detail
→ Alternative Options
→ Replace Reservation
→ Updated Timeline

## Flow 5 — Baggage

Airport Mode
→ Baggage Summary
→ Baggage Detail
→ Report Baggage Issue

## Flow 6 — Invite a traveller

Journey Details
→ Journey Members
→ Invite to Journey
→ Select permission
→ Invitation pending

## Flow 7 — Accept invitation

Invitation Received
→ Accept
→ Journey Timeline
→ Journey Members

## Flow 8 — Collaborative change

Reservation Details
→ Edit Reservation
→ Change Approval
→ Approve
→ Journey Activity

## Flow 9 — Reservation discussion

Reservation Details
→ Comments
→ Add comment
→ Mention member
→ Collaboration alert

## Flow 10 — Share location

Live Journey Map
→ Share My Location
→ Select members
→ Start sharing
→ Traveller Locations
→ Location-Sharing Privacy
→ Stop sharing

# Required deliverables

Generate:

* All 50 Phase 3 screens and system states
* Reusable Phase 3 components
* High-fidelity light-mode designs
* Dark-mode variants for the most important screens
* Auto Layout on all frames
* Consistent variables and styles
* Clickable prototype flows
* Clear screen and layer naming
* Accessible type hierarchy
* Dynamic Type-aware layouts
* Realistic travel content
* No fake claims of live coverage
* No AI-related features

Prioritise high-fidelity designs for:

1. Live Journey Home
2. Flight Live Status
3. Disruption Alert Detail
4. Connection Risk
5. Leave-By Planner
6. Airport Mode
7. Boarding Pass Quick View
8. Journey Members
9. Invite to Journey
10. Traveller Locations
11. Travel Alert Inbox
12. Critical Travel Alert
