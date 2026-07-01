Extend the existing native iOS application **Onward** by designing the complete **Phase 5: Travel Wallet, Expenses, Loyalty, Booking and Post-Journey** screen set.

Do not redesign the MVP or Phase 2, Phase 3 and Phase 4 screens.

Reuse and expand the existing Onward:

* Colour system
* Typography
* Spacing
* Components
* Journey cards
* Timeline patterns
* Reservation cards
* Map patterns
* Document patterns
* Live travel patterns
* Collaboration patterns
* Assistant patterns
* Forms
* Navigation
* Empty states
* Loading states
* Error states
* Privacy patterns

# Product context

Onward is a native iOS travel platform that already supports:

* Automatic reservation importing
* Journey creation and Timeline organisation
* Maps
* Travel documents
* Live travel information
* Collaboration
* Traveller management
* AI-assisted Journey planning
* Destination discovery
* Packing and preparation
* Local assistance

Phase 5 extends Onward into a more complete travel operating system by adding:

* Travel spending
* Journey budgets
* Receipt management
* Shared expenses
* Settlements
* Refund tracking
* Loyalty programmes
* Travel credits and passes
* Booking discovery and provider handoff
* Travel insurance
* eSIM and airport-transfer discovery
* Post-Journey summaries
* Journey templates
* Expense reports
* Commercial-transparency controls

# Phase 5 principles

The product must:

* Clearly separate confirmed transactions from estimated costs
* Clearly distinguish Onward records from provider-controlled payment information
* Never claim a payment succeeded without confirmation
* Never claim a booking is complete before the provider confirms it
* Never present estimated prices as guaranteed
* Clearly label sponsored or affiliate results
* Protect sensitive wallet and financial information
* Use Face ID or device authentication where appropriate
* Make shared-expense calculations understandable
* Preserve an audit trail for edits and settlements
* Keep commercial recommendations transparent
* Avoid turning Onward into a banking application
* Avoid storing full card details directly
* Allow users to export and delete their financial data

# Do not introduce

Do not introduce:

* Travel loans
* Credit products
* Cryptocurrency payments
* Public expense profiles
* Public financial data
* Hidden sponsored rankings
* Direct airline ticket issuance
* Direct hotel inventory ownership
* Corporate expense administration
* Business travel policy enforcement
* Public Journey marketplace
* Social shopping feed
* Gambling or speculative financial features

# Platform

Design for native iOS.

Primary frame:

* iPhone 15 Pro
* 393 × 852 points

Ensure layouts adapt to:

* Smaller iPhones
* Pro Max devices
* Dynamic Type
* Light mode
* Dark mode
* VoiceOver
* Increased Contrast
* Reduce Motion
* Larger tap targets

Use native-feeling:

* Navigation stacks
* Tab bars
* Sheets
* Bottom sheets
* Forms
* Menus
* Context menus
* Swipe actions
* Confirmation dialogs
* Camera and document-scanning flows
* Share sheets
* Date pickers
* Currency pickers
* Segmented controls
* Search
* Charts used sparingly
* Face ID permission and unlock states

# Existing navigation

Keep the existing main navigation:

1. Timeline
2. Journeys
3. Imports
4. Settings

Phase 5 should add contextual entry points from:

* Journey Details
* Journey Timeline
* Reservation Details
* Traveller profiles
* Settings
* Post-Journey summaries

Do not add a permanent fifth primary tab unless the design clearly demonstrates that Expenses or Wallet requires it.

Recommended entry points:

## Journey-level

* Expenses
* Budget
* Shared balances
* Refunds
* Journey recap

## Global Settings or Account

* Travel Wallet
* Loyalty Wallet
* Receipt Library
* Booking Preferences
* Commercial Transparency

# Product terminology

Use:

* Journey
* Journeys
* Expense
* Receipt
* Budget
* Paid
* Pending
* Refunded
* Reimbursable
* Shared expense
* Balance
* Settlement
* Travel credit
* Loyalty programme
* Membership
* Refund
* Booking option
* Continue to provider
* Journey recap
* Expense report

Do not use:

* Trip
* Trips
* Guaranteed price
* Confirmed booking before provider confirmation
* Instant refund unless genuine
* Free money
* Best deal without verifiable comparison
* Smart wallet
* Banking
* Rebook automatically unless that capability exists

# Visual direction

Maintain the existing Onward personality:

* Calm
* Clear
* Premium but restrained
* Spacious
* Trustworthy
* Travel-aware
* Native to iOS
* Easy to understand
* Transparent
* Financially responsible

Financial interfaces should feel clear and dependable without resembling a trading application.

Use:

* Strong information hierarchy
* Large totals
* Clear currency labels
* Clear payer and participant labels
* Distinct paid, pending and refunded states
* Purposeful charts
* Simple category icons
* SF Symbols
* Subtle separators
* Rounded cards
* Native sheets
* Clear confirmation steps
* Privacy indicators
* Masked sensitive details
* Source and update labels

Avoid:

* Dense financial dashboards
* Stock-market styling
* Excessive charts
* Neon colours
* Heavy gradients
* Excessive glass effects
* Tiny financial text
* Ambiguous balances
* Confusing positive and negative numbers
* Hidden fees
* Fake savings
* Dark-pattern checkout flows
* Sponsored results disguised as recommendations

# Financial number rules

Always show:

* Currency code or symbol
* Original transaction currency
* Converted amount where relevant
* Exchange-rate date
* Estimated versus confirmed state
* Who paid
* Who owes
* Refund status
* Last updated time

Use clear formatting for:

* ₹12,450
* €320.50
* USD 850

Do not display unexplained positive or negative values.

For balances, use language such as:

* “You owe Maya ₹2,400”
* “Arjun owes you ₹1,250”
* “Settled”
* “Refund pending”

# Reusable Phase 5 components

Create reusable components for:

* Expense summary card
* Budget-progress card
* Category-spend row
* Expense row
* Receipt thumbnail
* Receipt-status badge
* Currency amount row
* Converted-currency row
* Payer row
* Participant selector
* Split-method selector
* Member-balance card
* Settlement card
* Refund-status card
* Refund timeline
* Payment-method card
* Travel-credit card
* Loyalty-programme card
* Tier-progress card
* Booking-result card
* Provider-handoff card
* Price-freshness label
* Sponsored-result label
* Insurance-policy card
* eSIM plan card
* Transfer-option card
* Journey-stat card
* Expense-report row
* Wallet lock state
* Face ID prompt
* Financial empty state
* Financial warning state
* Sensitive-data row
* Export-option row
* Affiliate-disclosure row

Create states for:

* Paid
* Unpaid
* Pending
* Refunded
* Partially refunded
* Reimbursed
* Disputed
* Settled
* Over budget
* Under budget
* Estimated
* Confirmed
* Failed
* Processing
* Locked
* Expired
* Expiring soon
* Sponsored
* Affiliate
* Price changed
* Rate unavailable
* Offline
* Sync conflict

# A. Travel Wallet

## 1. Travel Wallet Home

Purpose:

Provide a secure global view of travel-related payment methods, credits, passes, memberships and refunds.

Include:

* Wallet title
* Face ID or privacy indicator
* Upcoming Journey spending summary
* Saved payment methods
* Travel credits
* Travel passes
* Loyalty memberships
* Refunds in progress
* Recent travel-related transactions
* Expense shortcuts
* Add payment method
* Add travel credit
* Open Loyalty Wallet
* Open Refund Tracker

Sensitive details should be masked.

Variants:

* Empty Wallet
* Locked Wallet
* Upcoming Journey
* Refunds pending
* Expiring credit
* Offline

---

## 2. Payment Methods

Include:

* Saved cards
* Card brand
* Masked card number
* Expiry
* Billing country
* Default travel card
* Foreign-transaction-fee indicator
* Expiry warning
* Apple Pay availability
* Add payment method
* Set as default
* Remove payment method

Do not display full card numbers.

Include an explanation that payment details are handled through a secure payment provider where applicable.

---

## 3. Add Payment Method

Include:

* Cardholder name
* Secure card-entry component
* Billing address
* Country
* Set as default
* Face ID protection
* Save
* Cancel

Use secure provider-controlled card-entry UI rather than ordinary text fields where possible.

---

## 4. Travel Passes and Credits

Include:

* Airline credits
* Hotel credits
* Rail passes
* Transit passes
* Lounge passes
* Gift cards
* Provider
* Remaining value
* Original value
* Currency
* Expiry date
* Journey relevance
* Add pass or credit
* Filter by type
* Expiring-soon section

---

## 5. Travel Credit Detail

Include:

* Provider
* Credit type
* Remaining balance
* Original balance
* Currency
* Expiry date
* Terms
* Eligible services
* Related cancellation or refund
* Membership account
* Notes
* Open provider
* Edit
* Delete

---

## 6. Refund Tracker

Include sections:

* Action needed
* Requested
* Processing
* Partially refunded
* Refunded
* Overdue
* Disputed
* Status unknown

Each card should show:

* Reservation
* Provider
* Expected amount
* Amount received
* Request date
* Expected timeframe
* Current status
* Journey
* Last updated

Actions:

* Add refund
* Update status
* Contact provider
* Open Refund Detail

---

## 7. Refund Detail

Include:

* Related reservation
* Provider
* Original charge
* Expected refund
* Amount received
* Currency
* Refund method
* Request date
* Expected date
* Current status
* Reference number
* Contact information
* Related emails
* Supporting documents
* Notes

Actions:

* Update status
* Add document
* Contact provider
* Mark resolved
* Mark disputed
* Delete tracker

---

## 8. Add Refund

Include:

* Journey
* Related reservation
* Provider
* Original amount
* Expected refund
* Currency
* Refund method
* Request date
* Expected timeframe
* Reference number
* Notes
* Attach document
* Save
* Cancel

---

# B. Journey Expenses

## 9. Journey Expenses Home

Purpose:

Provide the complete financial view for one Journey.

Include:

* Journey name
* Total spent
* Confirmed spend
* Pending spend
* Refunded amount
* Shared amount
* Budget remaining
* Primary currency
* Category breakdown
* Daily spend
* Recent expenses
* Expenses missing receipts
* Add Expense
* Scan Receipt
* View Budget
* View Shared Balances
* Export Report

Categories:

* Flights
* Stays
* Transport
* Food
* Activities
* Shopping
* Fees
* Insurance
* Connectivity
* Other

Variants:

* No expenses
* Under budget
* Near budget
* Over budget
* Multiple currencies
* Offline pending sync

---

## 10. Add Expense

Include:

* Amount
* Currency
* Merchant
* Date
* Time
* Category
* Journey
* Related reservation
* Paid by
* Participants
* Split method
* Payment method
* Receipt
* Reimbursable toggle
* Refundable toggle
* Notes
* Save
* Cancel

Use a large amount-entry field.

---

## 11. Expense Detail

Include:

* Amount
* Original currency
* Converted amount
* Exchange rate
* Merchant
* Date and time
* Category
* Journey
* Related reservation
* Paid by
* Split details
* Payment method
* Receipt
* Reimbursable status
* Refund status
* Notes
* Sync state

Actions:

* Edit
* Duplicate
* Split
* Mark reimbursed
* Request payment
* Track refund
* Share
* Delete

---

## 12. Edit Expense

Reuse the Add Expense form with existing values.

Include a clear change summary before saving when:

* Payer changes
* Participants change
* Split changes
* Currency changes
* Expense affects existing balances

---

## 13. Receipt Scanner

Use a native camera-based interface.

Include:

* Camera view
* Auto-detection frame
* Flash
* Manual capture
* Import from Photos
* Import from Files
* Multi-page support
* Crop
* Rotate
* Retake

After scanning, show detected fields:

* Merchant
* Date
* Total
* Currency
* Tax
* Tip
* Category

Actions:

* Confirm and save
* Edit detected information
* Attach to existing expense
* Create new expense
* Cancel

---

## 14. Receipt Review

Include:

* Receipt image
* Merchant
* Date
* Total
* Currency
* Tax
* Tip
* Line items where available
* Suggested category
* Confidence or review warning
* Attach to expense
* Save as unlinked receipt
* Retake
* Delete

Do not imply automatic extraction is always correct.

---

## 15. Expense Categories

Include:

* Default categories
* Custom categories
* Icons
* Budget limits
* Reorder
* Hide
* Add category
* Rename
* Delete custom category

---

## 16. Journey Budget

Include:

* Total Journey budget
* Confirmed spend
* Planned spend
* Remaining amount
* Daily average
* Remaining daily allowance
* Category budgets
* Spending trend
* Refund impact
* Shared-expense impact
* Currency
* Budget alerts
* Edit budget

Do not overuse charts.

---

## 17. Edit Journey Budget

Include:

* Total budget
* Currency
* Category allocations
* Flexible unallocated amount
* Include planned expenses
* Include shared expenses
* Alert thresholds
* Save
* Cancel

---

## 18. Budget Category Detail

Include:

* Category
* Category budget
* Actual spend
* Planned spend
* Remaining amount
* Expense list
* Daily trend
* Refunds
* Adjust category budget
* Move budget from another category

---

## 19. Currency Conversion

Include:

* Amount
* Source currency
* Destination currency
* Current exchange rate
* Rate date
* Offline saved rate
* Converted result
* Swap currencies
* Save rate for Journey
* Rate disclaimer

---

## 20. Exchange Rate Settings

Include:

* Journey base currency
* Automatic updates
* Use transaction-date rate
* Use latest rate
* Manual rate
* Offline-rate behaviour
* Rounding preferences
* Rate source
* Save

---

# C. Group Expenses and Settlements

## 21. Group Expense Summary

Include:

* Journey members
* Total shared spend
* Individual balances
* Who owes whom
* Settled members
* Outstanding members
* Recent shared expenses
* Recent settlements
* Simplify debts toggle
* Add shared expense
* Settle up

Use clear plain-language balances.

---

## 22. Split Expense

Include:

* Expense total
* Currency
* Paid by
* Participants
* Split method

Split methods:

* Equally
* Exact amounts
* Percentages
* Shares
* Custom
* Exclude selected travellers

Include:

* Live split preview
* Remaining unallocated amount
* Validation
* Save
* Cancel

---

## 23. Member Balance Detail

Include:

* Member
* Net balance
* Amount they owe
* Amount owed to them
* Currency
* Expense history
* Settlement history
* Outstanding items
* Converted totals
* Settle up
* Send reminder
* Mark paid manually

---

## 24. Settle Up

Include:

* Payer
* Recipient
* Amount
* Currency
* Payment method
* External payment-link option where supported
* Mark as paid
* Add proof
* Date
* Note
* Confirm
* Cancel

Do not claim Onward transferred money unless a genuine payment integration exists.

---

## 25. Settlement Confirmation

Include:

* Amount
* Payer
* Recipient
* Payment method
* Date
* Reference
* Proof
* Updated balances
* Share receipt
* Done

---

## 26. Payment Reminder

Include:

* Recipient
* Amount
* Currency
* Expense summary
* Optional message
* Share payment request
* Copy reminder
* Mark reminder sent
* Cancel

---

## 27. Settlement History

Include:

* Journey
* Member
* Amount
* Currency
* Date
* Payment method
* Status
* Proof
* Search
* Filter
* Open Settlement Detail

---

## 28. Split Dispute

Include:

* Expense
* Current split
* Member raising concern
* Proposed change
* Difference
* Comment thread
* Accept adjustment
* Reject
* Edit split
* Mark resolved

---

# D. Loyalty and Memberships

## 29. Loyalty Wallet

Include:

* Airline programmes
* Hotel programmes
* Rail memberships
* Rental-car memberships
* Lounge memberships
* Current points balances
* Status tiers
* Expiring points
* Upcoming qualifying travel
* Add programme
* Search
* Filter by category

---

## 30. Add Loyalty Programme

Include:

* Provider search
* Programme category
* Membership number
* Member name
* Tier
* Points balance
* Expiry date
* Notes
* Secure storage toggle
* Save
* Cancel

---

## 31. Loyalty Programme Detail

Include:

* Provider
* Membership number
* Member
* Tier
* Points balance
* Expiring points
* Expiry date
* Benefits
* Upcoming qualifying reservations
* Recent qualifying activity
* Related documents
* Open provider application
* Edit
* Remove

Mask membership numbers where appropriate.

---

## 32. Loyalty Match Suggestion

Shown when a reservation appears to match a saved loyalty programme.

Include:

* Reservation
* Provider
* Traveller
* Matching programme
* Membership number
* Potential benefit
* Add number to reservation
* Ignore
* Never suggest for this provider

---

## 33. Points and Status Progress

Include:

* Current tier
* Next tier
* Progress
* Qualifying points
* Qualifying nights or flights
* Upcoming qualifying travel
* Expiring activity
* Official-provider disclaimer
* Last updated
* Open provider

Avoid guaranteeing provider-calculated balances.

---

## 34. Expiring Points Alert

Include:

* Programme
* Points expiring
* Expiry date
* Potential options
* Related Journeys
* Open provider
* Dismiss
* Remind later

---

# E. Booking and Provider Handoffs

## 35. Booking Hub

Purpose:

Help users find missing Journey services and continue to trusted providers.

Include categories:

* Flights
* Stays
* Transport
* Activities
* Insurance
* eSIM
* Airport transfers

Include:

* Upcoming Journey context
* Missing Journey essentials
* Recent searches
* Saved options
* Sponsored-content disclosure
* How results are ranked

Do not disguise sponsored content.

---

## 36. Search Flights

Include:

* Origin
* Destination
* Departure date
* Return date
* One-way or return
* Travellers
* Cabin
* Stops
* Nearby airports
* Flexible dates
* Baggage requirement
* Search

---

## 37. Flight Search Results

Each result should show:

* Airline
* Route
* Departure
* Arrival
* Duration
* Stops
* Connection airports
* Baggage
* Fare type
* Price
* Taxes where available
* Provider
* Price freshness
* Sponsored label where applicable

Filters:

* Price
* Duration
* Stops
* Airline
* Departure time
* Arrival time
* Airport
* Baggage
* Refundability

Sort:

* Recommended
* Lowest price
* Shortest duration
* Earliest arrival

---

## 38. Flight Option Detail

Include:

* Full route
* Airline
* Flight numbers
* Departure and arrival
* Layovers
* Connection risk
* Fare
* Taxes
* Baggage
* Change rules
* Cancellation rules
* Seat information
* Provider
* Price freshness
* Affiliate disclosure

Actions:

* Continue to provider
* Save option
* Compare
* Share
* Add as planned item

Do not claim the booking is complete.

---

## 39. Compare Flight Options

Include:

* Two to four selected options
* Total price
* Duration
* Stops
* Baggage
* Refundability
* Departure times
* Arrival times
* Connection risk
* Provider
* Select option

---

## 40. Search Stays

Include:

* Destination
* Check-in
* Checkout
* Travellers
* Rooms
* Budget
* Property type
* Amenities
* Area
* Accessibility
* Cancellation flexibility
* Search

---

## 41. Stay Search Results

Each result should show:

* Property
* Images
* Location
* Rating
* Review count
* Total price
* Nightly price
* Taxes and fees
* Cancellation policy
* Distance from Journey reservations
* Accessibility details
* Sponsored label where applicable

Include map and list views.

---

## 42. Stay Option Detail

Include:

* Property overview
* Images
* Room options
* Total cost
* Taxes and fees
* Cancellation policy
* Amenities
* Accessibility
* Map
* Distance from Journey plans
* Provider
* Price freshness
* Affiliate disclosure

Actions:

* Continue to provider
* Save option
* Compare rooms
* Add as planned stay
* Share

---

## 43. Activity Booking Options

Include:

* Activity
* Provider
* Available dates
* Time slots
* Duration
* Price
* Taxes
* Cancellation policy
* Meeting point
* Accessibility
* Journey compatibility
* Price freshness

Actions:

* Continue to provider
* Save
* Add as planned
* Share

---

## 44. Booking Handoff Confirmation

Shown before opening an external provider.

Include:

* Provider
* Selected option
* Price last checked
* What information will be shared
* Affiliate disclosure
* Cancellation-policy summary
* Open provider
* Cancel

---

## 45. Booking Return and Import

Shown when the user returns to Onward.

Include:

* “Did you complete the booking?”
* Search connected inbox
* Import confirmation manually
* Add confirmation number
* Attach receipt
* Add reservation
* Mark booking incomplete
* Not now

---

## 46. Saved Booking Options

Include:

* Saved flights
* Saved stays
* Saved activities
* Journey
* Price when saved
* Current price
* Availability state
* Expiry or stale-price warning
* Compare
* Remove
* Continue to provider

---

# F. Travel Services

## 47. Travel Insurance

Include:

* Current policies
* Journey coverage
* Provider
* Policy number
* Travellers
* Coverage dates
* Emergency contact
* Documents
* Claim action
* Compare insurance

---

## 48. Insurance Policy Detail

Include:

* Provider
* Policy number
* Covered travellers
* Coverage dates
* Medical coverage
* Cancellation coverage
* Baggage coverage
* Delay coverage
* Exclusions
* Deductible
* Emergency support
* Claim instructions
* Documents
* Open provider

---

## 49. Insurance Comparison

Each option should show:

* Provider
* Medical coverage
* Cancellation coverage
* Baggage coverage
* Delay coverage
* Adventure-sport coverage
* Deductible
* Price
* Exclusions
* Affiliate disclosure

Actions:

* Compare
* View policy
* Continue to provider

---

## 50. Insurance Claim Tracker

Include:

* Claim type
* Provider
* Policy
* Claim number
* Claimed amount
* Approved amount
* Documents
* Status
* Next action
* Timeline
* Contact provider
* Update claim

---

## 51. eSIM and Connectivity

Include:

* Destination
* Journey dates
* Existing plan
* Recommended data plans
* Coverage
* Countries
* Data allowance
* Validity
* Hotspot support
* Network type
* Price
* Provider
* Sponsored label where applicable

---

## 52. eSIM Detail

Include:

* Provider
* Countries covered
* Network
* Data
* Validity
* Hotspot support
* Activation timing
* Installation instructions
* Price
* Refund policy
* Continue to provider
* Save option

---

## 53. Airport Transfer Options

Include:

* Airport
* Destination
* Arrival time
* Travellers
* Luggage
* Public transport
* Taxi estimate
* Private transfer
* Shared shuttle
* Rental car
* Duration
* Estimated cost
* Provider links

Do not present estimates as guaranteed fares.

---

# G. Post-Journey Experience

## 54. Journey Recap

Include:

* Journey name
* Dates
* Destinations
* Timeline summary
* Reservations completed
* Places visited
* Distance travelled where reliable
* Total spending
* Shared expenses
* Refunds
* Photos
* Documents
* Traveller list
* Favourite moments
* Export
* Share privately
* Save as template

Do not fabricate incomplete statistics.

---

## 55. Journey Spending Summary

Include:

* Total spent
* Confirmed spend
* Refunded amount
* Category breakdown
* Average per day
* Planned versus actual
* Shared expenses
* Personal spend
* Currency impact
* Largest expenses
* Export report

---

## 56. Journey Archive

Include:

* Past Journeys
* Search
* Filters
* Favourite Journeys
* Spending summaries
* Traveller groups
* Documents
* Templates
* Export
* Delete

---

## 57. Journey Reflection

Include:

* Favourite places
* Favourite meals
* What worked well
* What to avoid next time
* Private notes
* Traveller feedback
* Save preferences for future Journeys
* Add photos
* Complete reflection

---

## 58. Provider Review Prompt

Include:

* Provider or reservation
* Rating
* Written review
* Private note
* Open official review destination
* Skip
* Remind later

Do not publish without explicit confirmation.

---

## 59. Save Journey as Template

Include:

* Template name
* Included destinations
* Included flexible plans
* Included activities
* Exclude dates
* Exclude traveller information
* Exclude confirmation numbers
* Exclude expenses
* Exclude documents
* Save
* Cancel

---

## 60. Journey Templates

Include:

* Saved templates
* Templates from past Journeys
* Destination
* Duration
* Number of plans
* Create Journey
* Edit
* Duplicate
* Share privately
* Delete

---

# H. Financial Reports and Exports

## 61. Expense Report Builder

Include:

* Journey
* Date range
* Categories
* Travellers
* Reimbursable only
* Include receipts
* Include notes
* Include currency conversion
* Tax fields
* Report title
* Generate report

---

## 62. Expense Report Preview

Include:

* Report title
* Journey
* Expense table
* Totals
* Category totals
* Currency conversion
* Missing receipts
* Traveller allocations
* Reimbursable totals
* Notes

Actions:

* Export PDF
* Export CSV
* Share
* Edit
* Save report

---

## 63. Receipt Library

Include:

* All receipts
* Journey grouping
* Expense category
* Linked and unlinked receipts
* Search
* Filters
* Missing-expense warning
* Unreadable receipt warning
* Export
* Delete

---

## 64. Receipt Detail

Include:

* Receipt image
* Merchant
* Date
* Amount
* Currency
* Linked expense
* Category
* Extraction status
* Notes
* Download
* Share
* Link to expense
* Delete

---

## 65. Export Journey Data

Include export options for:

* Journey Timeline
* Reservations
* Expenses
* Receipts
* Documents
* Travellers
* Change history
* Comments
* Refunds

Formats:

* PDF
* CSV
* JSON
* ZIP archive

Privacy controls:

* Hide confirmation numbers
* Hide traveller names
* Hide private notes
* Exclude sensitive documents

Actions:

* Preview
* Export
* Share
* Cancel

---

# I. Phase 5 Settings

## 66. Wallet and Payment Settings

Include:

* Default payment method
* Apple Pay
* Require Face ID
* Lock Wallet when app backgrounds
* Foreign-transaction alerts
* Refund tracking
* Payment-link preferences
* Remove saved payment data
* Privacy information

---

## 67. Expense Settings

Include:

* Default currency
* Automatic categorisation
* Receipt scanning
* Default split method
* Rounding
* Reimbursable fields
* Budget alerts
* Include tips
* Export format
* Offline expense behaviour

---

## 68. Loyalty Settings

Include:

* Sync balances
* Expiry reminders
* Missing-membership suggestions
* Tier alerts
* Programme visibility
* Secure membership storage
* Delete loyalty data

---

## 69. Booking Preferences

Include:

* Preferred airlines
* Avoided airlines
* Preferred hotel brands
* Cabin preference
* Seat preference
* Flexible dates
* Maximum stops
* Cancellation flexibility
* Baggage requirements
* Accessibility needs
* Preferred booking providers
* Budget range

---

## 70. Commercial Transparency

This screen is required if Onward earns commission.

Include:

* How booking results are ranked
* Affiliate relationships
* Sponsored placements
* Provider commissions
* Price-comparison limitations
* Personalisation controls
* Disable sponsored recommendations
* Identify sponsored results
* Data-sharing explanation

Use direct language and avoid legalistic copy.

---

# Phase 5 System States

Design reusable states for the following.

## 71. No Expenses

Include:

* “No expenses yet”
* Add Expense
* Scan Receipt
* Import from reservation

---

## 72. Budget Exceeded

Include:

* Amount over budget
* Categories responsible
* Recent expenses
* Adjust budget
* Review expenses
* Dismiss

---

## 73. Unsettled Balances

Include:

* Members
* Amounts
* Settle up
* Send reminder
* View shared expenses

---

## 74. Exchange Rate Unavailable

Include:

* Last saved rate
* Rate date
* Enter manual rate
* Retry
* Continue without conversion

---

## 75. Refund Overdue

Include:

* Provider
* Expected date
* Amount
* Contact provider
* Add update
* Mark resolved

---

## 76. Payment Failed

Include:

* Payment method
* Failure reason
* Retry
* Choose another method
* Cancel

Do not show this state unless Onward handles a real payment flow.

---

## 77. Booking Price Changed

Include:

* Original price
* Current price
* Difference
* Last checked
* Continue
* Search again
* Save updated option

---

## 78. Booking Handoff Failed

Include:

* Provider unavailable
* Retry
* Copy booking details
* Choose another provider
* Return to results

---

## 79. Loyalty Balance Unavailable

Include:

* Programme
* Last known balance
* Last updated
* Open provider
* Refresh
* Enter balance manually

---

## 80. Expense Sync Conflict

Include:

* Local expense
* Shared version
* Changed fields
* Keep local
* Keep shared
* Merge manually
* Cancel

---

## 81. Sensitive Wallet Locked

Include:

* Wallet icon
* Face ID
* Use device passcode
* Cancel
* Privacy explanation

---

## 82. Receipt Unreadable

Include:

* Receipt preview
* What could not be detected
* Enter manually
* Retake
* Import another image
* Save receipt only

---

## 83. Split Does Not Balance

Include:

* Expense total
* Allocated amount
* Remaining amount
* Highlight incorrect fields
* Fix split
* Cancel

---

## 84. Sponsored Result Disclosure

Include:

* Provider
* Sponsored label explanation
* How sponsorship affects placement
* Continue
* Hide sponsored result
* Commercial Transparency

---

# Prototype flows

Create clickable prototype flows for the following.

## Flow 1 — Add an expense

Journey Details
→ Journey Expenses
→ Add Expense
→ Attach Receipt
→ Split Expense
→ Save
→ Updated Expense Summary

## Flow 2 — Scan a receipt

Journey Expenses
→ Scan Receipt
→ Capture
→ Receipt Review
→ Create Expense
→ Expense Detail

## Flow 3 — Settle a shared balance

Group Expense Summary
→ Member Balance
→ Settle Up
→ Mark as Paid
→ Settlement Confirmation

## Flow 4 — Track a refund

Cancelled Reservation
→ Track Refund
→ Add Refund
→ Refund Detail
→ Update Status
→ Refunded

## Flow 5 — Add a loyalty programme

Loyalty Wallet
→ Add Programme
→ Enter Membership
→ Loyalty Programme Detail
→ Match to Reservation

## Flow 6 — Search and hand off a flight

Booking Hub
→ Search Flights
→ Flight Search Results
→ Flight Option Detail
→ Booking Handoff Confirmation
→ External Provider
→ Booking Return and Import

## Flow 7 — Find a stay

Booking Hub
→ Search Stays
→ Stay Search Results
→ Stay Option Detail
→ Continue to Provider

## Flow 8 — Add insurance

Travel Insurance
→ Compare Insurance
→ Insurance Policy Detail
→ Continue to Provider
→ Add Policy to Journey

## Flow 9 — Review a completed Journey

Past Journey
→ Journey Recap
→ Journey Spending Summary
→ Journey Reflection
→ Save as Template

## Flow 10 — Export expenses

Journey Expenses
→ Expense Report Builder
→ Expense Report Preview
→ Export PDF
→ Share Sheet

## Flow 11 — Unlock Wallet

Travel Wallet
→ Sensitive Wallet Locked
→ Face ID
→ Wallet Home

## Flow 12 — Review sponsored content

Booking Results
→ Sponsored Result Disclosure
→ Commercial Transparency
→ Return to Results

# Required deliverables

Generate:

* All 84 Phase 5 screens and states
* Reusable Phase 5 components
* High-fidelity light-mode designs
* Dark-mode variants for the most important screens
* Auto Layout on all frames
* Consistent variables and styles
* Clickable prototype flows
* Clear screen and layer names
* Accessible type hierarchy
* Dynamic Type-aware layouts
* Realistic financial and travel content
* Clear estimated and confirmed states
* Clear currency labelling
* Secure treatment of payment and loyalty information
* Transparent affiliate and sponsored-result labels
* No fake payment or booking confirmations
* No hidden commercial relationships

Prioritise high-fidelity designs for:

1. Journey Expenses Home
2. Add Expense
3. Expense Detail
4. Receipt Scanner
5. Group Expense Summary
6. Split Expense
7. Settle Up
8. Travel Wallet Home
9. Refund Tracker
10. Loyalty Wallet
11. Booking Hub
12. Flight Search Results
13. Flight Option Detail
14. Journey Recap
15. Expense Report Preview
16. Commercial Transparency
