import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Bell, Brain, CalendarClock,
  Clock, Compass, MailCheck, MapPin,
  FileText, Hotel, Route, Settings,
  ShieldCheck, Train, Users, Wifi, Inbox, UtensilsCrossed,
} from "lucide-react";
import {
  Screen, Tab, cn,
  WelcomeScreen, HowItWorksScreen, ImportReservationsScreen,
  ConnectGmailPrimerScreen, GmailConnectedScreen, ChooseScanRangeScreen,
  ScanProgressScreen, ScanResultsScreen, ReauthRequiredScreen,
  JourneysHomeScreen, JourneyTimelineScreen, NowAndNextScreen,
  ReservationDetailsScreen, ImportsHomeScreen, ReviewImportListScreen,
  ReviewImportDetailsScreen, SettingsScreen,
  JourneyDetailsScreen, JourneyFormScreen, DeleteJourneyConfirmScreen,
  AddPlanTypeScreen, JourneySearchScreen,
  EditAcceptImportScreen, AssignImportJourneyScreen, CreateJourneyFromImportScreen,
  DuplicateReviewScreen, UnsupportedImportScreen, FailedImportScreen,
  ConnectedInboxesScreen, InboxDetailsScreen, DisconnectGmailConfirmScreen,
  EmailPrivacyScreen, ManageImportedDataScreen,
  NoJourneysScreen, NoActiveJourneyScreen, EmptyTimelineScreen,
  NoImportsScreen, NoReviewItemsScreen, OfflineScreen, ScanErrorScreen,
  GeneralErrorScreen, ServiceUnavailableScreen, SyncConflictScreen,
  AccountScreen, SignOutConfirmScreen, DeleteAccountScreen, DeletionProgressScreen,
  NotificationSettingsScreen, PreferencesScreen, HelpSupportScreen,
  ContactSupportScreen, AboutOnwardScreen,
  LaunchScreen, AddEditReservationScreen, MoveReservationScreen,
  DeleteReservationConfirmScreen, ReservationChangeHistoryScreen,
  NotificationPermissionPrimerScreen,
} from "./screens";
import {
  ConnectMicrosoftScreen, MicrosoftConnectedScreen,
  ForwardConfirmationScreen, ForwardedEmailReceivedScreen,
  JourneyMapScreen, MapLocationDetailScreen, JourneyLocationsListScreen, MissingLocationScreen,
  JourneyDocumentsScreen, AddDocumentScreen, DocumentDetailScreen,
  AttachDocumentScreen, DocumentPrivacyScreen,
  JourneyReadinessScreen, ConflictDetailsScreen, BookingChangeReviewScreen,
  ReviewSuggestedMergeScreen, MergeJourneysScreen, SplitJourneyScreen, MoveMulipleReservationsScreen,
  ShareJourneyScreen, SharedLinkSettingsScreen, SharedJourneyPreviewScreen,
  CalendarExportScreen, CalendarSyncSettingsScreen,
  JourneyNotificationSettingsScreen, TravellersScreen, AddEditTravellerScreen, AssignReservationsTravellerScreen,
  ShareToOnwardScreen, ShareExtensionJourneyPickerScreen,
  OfflineJourneySettingsScreen, OfflineDownloadsScreen, PendingSyncDetailsScreen,
  MapEmptyScreen, MapOfflineScreen, DocumentsEmptyScreen, DocumentLockedScreen,
  ReadinessCompleteScreen, NoConflictsScreen, NoSharedLinksScreen,
  MicrosoftReauthScreen, ForwardingAddressErrorScreen, OfflineDownloadErrorScreen,
} from "./phase2";

import {
  LiveJourneyHomeScreen, LiveStatusCentreScreen, FlightLiveStatusScreen,
  GroundTransportLiveStatusScreen, DisruptionAlertScreen, CancellationDetailScreen,
  DelayImpactSummaryScreen, ConnectionRiskScreen, ConnectionRouteScreen,
  AlternativeOptionsScreen, ReplaceReservationScreen,
  LeaveByPlannerScreen, LeaveBySettingsScreen, LiveJourneyMapScreen, DirectionsHandoffScreen,
  AirportModeScreen, StationModeScreen, BoardingPassViewScreen, TicketViewScreen, AirportStationMapScreen,
  BaggageSummaryScreen, BaggageDetailScreen, ReportBaggageIssueScreen,
  JourneyMembersScreen, InviteToJourneyScreen, InvitationReceivedScreen, MemberPermissionsScreen,
  JourneyActivityScreen, ActivityDetailScreen, ReservationCommentsScreen,
  JourneyDiscussionScreen, ChangeApprovalScreen, CollaborationNotificationSettingsScreen,
  TravellerLocationsScreen, ShareMyLocationScreen, LocationSharingPrivacyScreen,
  TravelAlertInboxScreen, TravelAlertPreferencesScreen, CriticalTravelAlertScreen,
  LiveDataSettingsScreen, LiveDataSourceScreen, UnsupportedLiveDataScreen,
  LiveDataUnavailableScreen, StatusOutOfDateScreen, NoDisruptionsScreen,
  NoJourneyMembersScreen, PendingJourneyInvitationScreen, CollaborationOfflineScreen,
  LocationPermissionRequiredScreen, LocationSharingEndedScreen,
} from "./phase3";
import {
  AssistantHomeScreen, JourneyAssistantScreen, GeneralAssistantScreen,
  AssistantContextScreen, AssistantSourcesScreen, VoiceAssistantScreen,
  ConversationHistoryScreen, AssistantFeedbackScreen,
  PlanNewJourneyScreen, PlanningPreferencesScreen, JourneyBudgetScreen,
  TravellerSelectionAIScreen, PlanningConstraintsScreen, GeneratingJourneyPlanScreen,
  GeneratedJourneyOverviewScreen, GeneratedDayPlanScreen, CompareGeneratedPlansScreen,
  ReviewSuggestedAdditionsScreen, SaveGeneratedJourneyScreen, JourneyPlanHistoryScreen,
  OptimiseThisDayScreen, OptimisedDayPreviewScreen, MoveFlexiblePlansScreen,
  FillFreeTimeScreen, FreeTimeSuggestionScreen, ReplanRemainingDayScreen,
  ReplannedDayPreviewScreen, JourneyWideOptimisationScreen,
  ExploreDestinationScreen, DestinationGuideScreen, RecommendationFeedScreen,
  DiscoveryMapScreen, PlaceDetailScreen, AddPlaceToJourneyScreen,
  SavedPlacesScreen, RecommendationPreferencesScreen,
  JourneyInsightsScreen, JourneyGapDetailScreen, OverloadedDayInsightScreen,
  WeatherSuggestionScreen, LocalEventSuggestionScreen, MissingEssentialScreen,
} from "./phase4a";
import {
  TodaysJourneyBriefScreen, TomorrowsPreviewScreen, JourneySummaryAIScreen,
  AudioBriefingPlayerScreen, BriefingSettingsScreen,
  TravelPreferencesScreen, FoodPreferencesScreen, AccessibilityPreferencesScreen,
  BudgetPreferencesScreen, TravellerPreferenceDetailScreen, PersonalisationSummaryScreen,
  SmartPackingListScreen, PackingSuggestionDetailScreen, PackingItemDetailScreen,
  PreparationAssistantScreen, PreparationChecklistScreen,
  PhrasebookScreen, TranslatePhraseScreen, FullscreenTranslationScreen, LocalEssentialsScreen,
  AssistantSettingsScreen, AssistantDataControlsScreen, ManageAssistantMemoryScreen,
  ClearConversationConfirmScreen, UncertainAnswerScreen, ConflictingInformationScreen,
  AssistantOfflineScreen, ConfirmAssistantActionScreen,
  AssistantFirstUseScreen, NoJourneyContextScreen, GeneratingResponseScreen,
  PlanGenerationFailedScreen, NoRecommendationsScreen, SourceUnavailableScreen,
  OutdatedRecommendationScreen, PersonalisationDisabledScreen,
  PackingListCompleteScreen, PreparationCompleteScreen,
} from "./phase4b";
import {
  WalletHomeScreen, PaymentMethodsScreen, AddPaymentMethodScreen,
  TravelPassesCreditsScreen, TravelCreditDetailScreen,
  RefundTrackerScreen, RefundDetailScreen, AddRefundScreen,
  JourneyExpensesScreen, AddExpenseScreen, ExpenseDetailScreen, EditExpenseScreen,
  ReceiptScannerScreen, ReceiptReviewScreen, ExpenseCategoriesScreen,
  JourneyBudgetExpensesScreen, EditJourneyBudgetScreen, BudgetCategoryDetailScreen,
  CurrencyConversionScreen, ExchangeRateSettingsScreen,
  GroupExpenseSummaryScreen, SplitExpenseScreen, MemberBalanceDetailScreen,
  SettleUpScreen, SettlementConfirmationScreen, PaymentReminderScreen,
  SettlementHistoryScreen, SplitDisputeScreen,
  LoyaltyWalletScreen, AddLoyaltyProgrammeScreen, LoyaltyProgrammeDetailScreen,
  LoyaltyMatchSuggestionScreen, PointsStatusProgressScreen, ExpiringPointsAlertScreen,
} from "./phase5a";
import {
  BookingHubScreen, SearchFlightsScreen, FlightSearchResultsScreen,
  FlightOptionDetailScreen, CompareFlightOptionsScreen,
  SearchStaysScreen, StaySearchResultsScreen, StayOptionDetailScreen,
  ActivityBookingOptionsScreen, BookingHandoffConfirmScreen,
  BookingReturnImportScreen, SavedBookingOptionsScreen,
  TravelInsuranceScreen, InsurancePolicyDetailScreen, InsuranceComparisonScreen,
  InsuranceClaimTrackerScreen, EsimConnectivityScreen, EsimDetailScreen,
  AirportTransferOptionsScreen,
  JourneyRecapScreen, JourneySpendingSummaryScreen, JourneyArchiveScreen,
  JourneyReflectionScreen, ProviderReviewPromptScreen,
  SaveJourneyTemplateScreen, JourneyTemplatesScreen,
  ExpenseReportBuilderScreen, ExpenseReportPreviewScreen,
  ReceiptLibraryScreen, ReceiptDetailScreen, ExportJourneyDataScreen,
  WalletPaymentSettingsScreen, ExpenseSettingsScreen,
  LoyaltySettingsScreen, BookingPreferencesScreen, CommercialTransparencyScreen,
  NoExpensesScreen, BudgetExceededScreen, UnsettledBalancesScreen,
  ExchangeRateUnavailableScreen, RefundOverdueScreen, PaymentFailedScreen,
  BookingPriceChangedScreen, BookingHandoffFailedScreen,
  LoyaltyBalanceUnavailableScreen, ExpenseSyncConflictScreen,
  WalletLockedScreen, ReceiptUnreadableScreen, SplitNotBalancedScreen,
  SponsoredDisclosureScreen,
} from "./phase5b";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared UI (used only here) ───────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-8 pt-[14px] pb-2 relative z-40" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <span className="text-[13px] font-semibold tracking-tight text-foreground">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} className="w-[3px] rounded-[1px] bg-foreground" style={{ height: h }} />
          ))}
        </div>
        <Wifi size={13} className="text-foreground" />
        <div className="w-[25px] h-[12px] border border-foreground rounded-[3px] relative flex items-center px-[2px]">
          <div className="w-[16px] h-[7px] bg-foreground rounded-[1px]" />
          <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-foreground rounded-r-[2px]" />
        </div>
      </div>
    </div>
  );
}

function TabBar({ active, onTab }: { active: Tab; onTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "timeline",  label: "Timeline",  icon: <Clock size={22} strokeWidth={1.75} /> },
    { id: "journeys",  label: "Journeys",  icon: <MapPin size={22} strokeWidth={1.75} /> },
    { id: "imports",   label: "Imports",   icon: <Inbox size={22} strokeWidth={1.75} /> },
    { id: "settings",  label: "Settings",  icon: <Settings size={22} strokeWidth={1.75} /> },
  ];
  return (
    <div className="flex-shrink-0 flex items-center border-t border-border bg-card pb-7 pt-2" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          className={cn("flex-1 flex flex-col items-center gap-[3px] transition-colors", active === t.id ? "text-[#E07B5A]" : "text-muted-foreground")}
        >
          {t.icon}
          <span className="text-[10px] font-semibold tracking-wide">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Route table ──────────────────────────────────────────────────────────────

const TAB_FOR_SCREEN: Record<Screen, Tab> = {
  welcome: "timeline", "how-it-works": "timeline", "import-reservations": "timeline",
  "connect-gmail-primer": "timeline", "gmail-connected": "timeline", "choose-scan-range": "timeline",
  "scan-progress": "timeline", "scan-results": "timeline", "reauth-required": "settings",
  "journeys-home": "journeys", "journey-timeline": "journeys", "now-and-next": "timeline",
  "reservation-details": "journeys", "imports-home": "imports", "review-imports": "imports",
  "review-import-details": "imports", "journey-details": "journeys", "journey-form": "journeys",
  "delete-journey-confirm": "journeys", "add-plan-type": "journeys", "journey-search": "journeys",
  "edit-accept-import": "imports", "assign-import-journey": "imports", "create-journey-from-import": "imports",
  "duplicate-review": "imports", "unsupported-import": "imports", "failed-import": "imports",
  "connected-inboxes": "settings", "inbox-details": "settings", "disconnect-gmail-confirm": "settings",
  "email-privacy": "settings", "manage-imported-data": "settings",
  "no-journeys": "journeys", "no-active-journey": "timeline", "empty-timeline": "timeline",
  "no-imports": "imports", "no-review-items": "imports", "offline": "timeline",
  "scan-error": "imports", "general-error": "timeline", "service-unavailable": "timeline", "sync-conflict": "timeline",
  "account-screen": "settings", "notification-settings": "settings", "preferences": "settings",
  "help-support": "settings", "contact-support": "settings", "about-onward": "settings",
  "sign-out-confirm": "settings", "delete-account": "settings", "deletion-progress": "settings",
  "connect-microsoft": "settings", "microsoft-connected": "settings",
  "forward-confirmation": "imports", "forwarded-email-received": "imports",
  "journey-map": "journeys", "map-location-detail": "journeys", "journey-locations-list": "journeys",
  "missing-location": "journeys", "journey-documents": "journeys", "add-document": "journeys",
  "document-detail": "journeys", "attach-document": "journeys", "document-privacy": "settings",
  "journey-readiness": "journeys", "conflict-details": "journeys", "booking-change-review": "imports",
  "review-suggested-merge": "journeys", "merge-journeys": "journeys", "split-journey": "journeys",
  "move-multiple-reservations": "journeys", "share-journey": "journeys", "shared-link-settings": "journeys",
  "shared-journey-preview": "journeys", "calendar-export": "journeys", "calendar-sync-settings": "settings",
  "journey-notification-settings": "journeys", "travellers": "journeys", "add-edit-traveller": "journeys",
  "assign-reservations-traveller": "journeys", "share-to-onward": "imports",
  "share-extension-journey-picker": "imports", "offline-journey-settings": "journeys",
  "offline-downloads": "settings", "pending-sync-details": "journeys",
  "map-empty": "journeys", "map-offline": "journeys", "documents-empty": "journeys",
  "document-locked": "journeys", "readiness-complete": "journeys", "no-conflicts": "journeys",
  "no-shared-links": "journeys", "microsoft-reauth": "settings",
  "forwarding-address-error": "imports", "offline-download-error": "settings",
  "live-journey-home": "timeline", "live-status-centre": "timeline",
  "flight-live-status": "timeline", "ground-transport-live": "timeline",
  "disruption-alert": "timeline", "cancellation-detail": "timeline",
  "delay-impact": "timeline", "connection-risk": "timeline",
  "connection-route": "timeline", "alternative-options": "timeline",
  "replace-reservation": "timeline", "leave-by-planner": "timeline",
  "leave-by-settings": "settings", "live-journey-map": "journeys",
  "directions-handoff": "timeline", "airport-mode": "timeline",
  "station-mode": "timeline", "boarding-pass-view": "timeline",
  "ticket-view": "timeline", "airport-station-map": "timeline",
  "baggage-summary": "timeline", "baggage-detail": "timeline",
  "report-baggage-issue": "timeline", "journey-members": "journeys",
  "invite-to-journey": "journeys", "invitation-received": "journeys",
  "member-permissions": "journeys", "journey-activity": "journeys",
  "activity-detail": "journeys", "reservation-comments": "journeys",
  "journey-discussion": "journeys", "change-approval": "journeys",
  "collab-notification-settings": "journeys", "traveller-locations": "journeys",
  "share-my-location": "journeys", "location-sharing-privacy": "journeys",
  "travel-alert-inbox": "timeline", "travel-alert-preferences": "settings",
  "critical-travel-alert": "timeline", "live-data-settings": "settings",
  "live-data-source": "settings", "unsupported-live-data": "timeline",
  "live-data-unavailable": "timeline", "status-out-of-date": "timeline",
  "no-disruptions": "timeline", "no-journey-members": "journeys",
  "pending-invitation": "journeys", "collaboration-offline": "journeys",
  "location-permission-required": "journeys", "location-sharing-ended": "journeys",
  "launch": "timeline",
  "add-edit-reservation": "journeys",
  "move-reservation": "journeys",
  "delete-reservation-confirm": "journeys",
  "reservation-change-history": "journeys",
  "notification-primer": "settings",
  "assistant-home": "journeys", "journey-assistant": "journeys", "general-assistant": "journeys",
  "assistant-context": "journeys", "assistant-sources": "journeys", "voice-assistant": "journeys",
  "conversation-history": "journeys", "assistant-feedback": "journeys",
  "plan-new-journey": "journeys", "planning-preferences": "journeys", "journey-budget": "journeys",
  "traveller-selection-ai": "journeys", "planning-constraints": "journeys",
  "generating-journey-plan": "journeys", "generated-journey-overview": "journeys",
  "generated-day-plan": "journeys", "compare-generated-plans": "journeys",
  "review-suggested-additions": "journeys", "save-generated-journey": "journeys",
  "journey-plan-history": "journeys", "optimise-this-day": "journeys",
  "optimised-day-preview": "journeys", "move-flexible-plans": "journeys",
  "fill-free-time": "journeys", "free-time-suggestion": "journeys",
  "replan-remaining-day": "journeys", "replanned-day-preview": "journeys",
  "journey-wide-optimisation": "journeys", "explore-destination": "journeys",
  "destination-guide": "journeys", "recommendation-feed": "journeys",
  "discovery-map": "journeys", "place-detail": "journeys",
  "add-place-to-journey": "journeys", "saved-places": "journeys",
  "recommendation-preferences": "settings", "journey-insights": "journeys",
  "journey-gap-detail": "journeys", "overloaded-day-insight": "journeys",
  "weather-suggestion": "journeys", "local-event-suggestion": "journeys",
  "missing-essential": "journeys", "todays-brief": "timeline",
  "tomorrows-preview": "timeline", "journey-summary-ai": "journeys",
  "audio-briefing-player": "timeline", "briefing-settings": "settings",
  "travel-preferences": "settings", "food-preferences": "settings",
  "accessibility-preferences": "settings", "budget-preferences": "settings",
  "traveller-preference-detail": "settings", "personalisation-summary": "settings",
  "smart-packing-list": "journeys", "packing-suggestion-detail": "journeys",
  "packing-item-detail": "journeys", "preparation-assistant": "journeys",
  "preparation-checklist": "journeys", "phrasebook": "journeys",
  "translate-phrase": "journeys", "fullscreen-translation": "journeys",
  "local-essentials": "journeys", "assistant-settings": "settings",
  "assistant-data-controls": "settings", "manage-assistant-memory": "settings",
  "clear-conversation-confirm": "journeys", "uncertain-answer": "journeys",
  "conflicting-information": "journeys", "assistant-offline": "journeys",
  "confirm-assistant-action": "journeys", "assistant-first-use": "journeys",
  "no-journey-context": "journeys", "generating-response": "journeys",
  "plan-generation-failed": "journeys", "no-recommendations": "journeys",
  "source-unavailable": "journeys", "outdated-recommendation": "journeys",
  "personalisation-disabled": "settings", "packing-list-complete": "journeys",
  "preparation-complete": "journeys",
  "wallet-home": "settings", "payment-methods": "settings", "add-payment-method": "settings",
  "travel-passes-credits": "settings", "travel-credit-detail": "settings",
  "refund-tracker": "settings", "refund-detail": "settings", "add-refund": "settings",
  "journey-expenses": "journeys", "add-expense": "journeys", "expense-detail": "journeys",
  "edit-expense": "journeys", "receipt-scanner": "journeys", "receipt-review": "journeys",
  "expense-categories": "settings", "journey-budget-expenses": "journeys",
  "edit-journey-budget": "journeys", "budget-category-detail": "journeys",
  "currency-conversion": "journeys", "exchange-rate-settings": "settings",
  "group-expense-summary": "journeys", "split-expense": "journeys",
  "member-balance-detail": "journeys", "settle-up": "journeys",
  "settlement-confirmation": "journeys", "payment-reminder": "journeys",
  "settlement-history": "journeys", "split-dispute": "journeys",
  "loyalty-wallet": "settings", "add-loyalty-programme": "settings",
  "loyalty-programme-detail": "settings", "loyalty-match-suggestion": "journeys",
  "points-status-progress": "settings", "expiring-points-alert": "settings",
  "booking-hub": "journeys", "search-flights": "journeys",
  "flight-search-results": "journeys", "flight-option-detail": "journeys",
  "compare-flight-options": "journeys", "search-stays": "journeys",
  "stay-search-results": "journeys", "stay-option-detail": "journeys",
  "activity-booking-options": "journeys", "booking-handoff-confirm": "journeys",
  "booking-return-import": "journeys", "saved-booking-options": "journeys",
  "travel-insurance": "journeys", "insurance-policy-detail": "journeys",
  "insurance-comparison": "journeys", "insurance-claim-tracker": "journeys",
  "esim-connectivity": "journeys", "esim-detail": "journeys",
  "airport-transfer-options": "journeys",
  "journey-recap": "journeys", "journey-spending-summary": "journeys",
  "journey-archive": "journeys", "journey-reflection": "journeys",
  "provider-review-prompt": "journeys", "save-journey-template": "journeys",
  "journey-templates": "journeys", "expense-report-builder": "journeys",
  "expense-report-preview": "journeys", "receipt-library": "settings",
  "receipt-detail": "settings", "export-journey-data": "journeys",
  "wallet-payment-settings": "settings", "expense-settings": "settings",
  "loyalty-settings": "settings", "booking-preferences": "settings",
  "commercial-transparency": "settings",
  "no-expenses": "journeys", "budget-exceeded": "journeys",
  "unsettled-balances": "journeys", "exchange-rate-unavailable": "journeys",
  "refund-overdue": "settings", "payment-failed": "journeys",
  "booking-price-changed": "journeys", "booking-handoff-failed": "journeys",
  "loyalty-balance-unavailable": "settings", "expense-sync-conflict": "journeys",
  "wallet-locked": "settings", "receipt-unreadable": "journeys",
  "split-not-balanced": "journeys", "sponsored-disclosure": "journeys",
  settings: "settings",
};

const SIDEBAR: [Screen | null, string][] = [
  // ── Onboarding ──────────────────────────────────────────────────────────────
  [null, "Onboarding"],
  ["launch",                  "Launch"],
  ["welcome",                 "Welcome"],
  ["how-it-works",            "How Onward works"],
  ["notification-primer",     "Notification primer"],
  ["import-reservations",     "Import reservations"],
  ["connect-gmail-primer",    "Connect Gmail — primer"],
  ["gmail-connected",         "Gmail connected"],
  ["connect-microsoft",       "Connect Microsoft — primer"],
  ["microsoft-connected",     "Microsoft connected"],
  ["choose-scan-range",       "Choose scan range"],
  ["scan-progress",           "Scan progress"],
  ["scan-results",            "Scan results"],
  ["reauth-required",         "Gmail reauth required"],
  ["microsoft-reauth",        "Microsoft reauth required"],

  // ── Timeline ─────────────────────────────────────────────────────────────────
  [null, "Timeline"],
  ["journey-timeline",        "Journey Timeline"],
  ["live-journey-home",       "Live Journey Home"],
  ["now-and-next",            "Now & Next"],
  ["no-active-journey",       "No active journey"],
  ["empty-timeline",          "Empty Timeline"],

  // ── Journeys ─────────────────────────────────────────────────────────────────
  [null, "Journeys"],
  ["journeys-home",           "Journeys Home"],
  ["journey-details",         "Journey Details"],
  ["journey-form",            "Add / Edit Journey"],
  ["delete-journey-confirm",  "Delete Journey"],
  ["journey-search",          "Search"],
  ["no-journeys",             "No Journeys"],

  // ── Reservations ─────────────────────────────────────────────────────────────
  [null, "Reservations"],
  ["add-plan-type",               "Add Plan — type picker"],
  ["add-edit-reservation",        "Add / Edit Reservation"],
  ["reservation-details",         "Reservation Details"],
  ["move-reservation",            "Move Reservation"],
  ["delete-reservation-confirm",  "Delete Reservation"],
  ["reservation-change-history",  "Change History"],
  ["reservation-comments",        "Comments"],

  // ── Imports ──────────────────────────────────────────────────────────────────
  [null, "Imports"],
  ["imports-home",                "Imports Home"],
  ["forward-confirmation",        "Forward a confirmation"],
  ["forwarded-email-received",    "Forwarded email received"],
  ["forwarding-address-error",    "Forwarding address error"],
  ["review-imports",              "Review Imports"],
  ["review-import-details",       "Review Import Details"],
  ["edit-accept-import",          "Edit & Accept Import"],
  ["assign-import-journey",       "Assign to Journey"],
  ["create-journey-from-import",  "Create Journey from Import"],
  ["duplicate-review",            "Duplicate Review"],
  ["unsupported-import",          "Unsupported Import"],
  ["failed-import",               "Failed Import"],
  ["booking-change-review",       "Booking Change Review"],
  ["no-imports",                  "No Imports"],
  ["no-review-items",             "No Review Items"],

  // ── Connected Inboxes & Privacy ───────────────────────────────────────────────
  [null, "Connected Inboxes & Privacy"],
  ["connected-inboxes",       "Connected Inboxes"],
  ["inbox-details",           "Inbox Details"],
  ["disconnect-gmail-confirm","Disconnect Gmail"],
  ["email-privacy",           "Email Privacy"],
  ["manage-imported-data",    "Manage Imported Data"],

  // ── Journey Map ───────────────────────────────────────────────────────────────
  [null, "Journey Map"],
  ["journey-map",             "Journey Map"],
  ["live-journey-map",        "Live Journey Map"],
  ["traveller-locations",     "Traveller Locations"],
  ["map-location-detail",     "Location Detail"],
  ["journey-locations-list",  "Locations List"],
  ["missing-location",        "Missing Location"],
  ["directions-handoff",      "Directions Handoff"],
  ["map-empty",               "Map — no locations"],
  ["map-offline",             "Map — offline"],

  // ── Documents ─────────────────────────────────────────────────────────────────
  [null, "Documents"],
  ["journey-documents",       "Journey Documents"],
  ["add-document",            "Add Document"],
  ["document-detail",         "Document Detail"],
  ["attach-document",         "Attach to Reservation"],
  ["document-privacy",        "Document Privacy"],
  ["documents-empty",         "No Documents"],
  ["document-locked",         "Document Locked"],

  // ── Journey Preparation ────────────────────────────────────────────────────────
  [null, "Journey Preparation"],
  ["journey-readiness",       "Journey Readiness"],
  ["conflict-details",        "Conflict Details"],
  ["readiness-complete",      "Readiness Complete"],
  ["no-conflicts",            "No Conflicts"],

  // ── Live Travel ───────────────────────────────────────────────────────────────
  [null, "Live Travel"],
  ["live-status-centre",      "Live Status Centre"],
  ["flight-live-status",      "Flight Live Status"],
  ["ground-transport-live",   "Ground Transport Status"],
  ["no-disruptions",          "No Disruptions"],
  ["live-data-unavailable",   "Live Data Unavailable"],
  ["status-out-of-date",      "Status Out of Date"],
  ["unsupported-live-data",   "Unsupported Live Data"],

  // ── Disruptions & Alternatives ────────────────────────────────────────────────
  [null, "Disruptions & Alternatives"],
  ["disruption-alert",        "Disruption Alert"],
  ["cancellation-detail",     "Cancellation Detail"],
  ["delay-impact",            "Delay Impact Summary"],
  ["connection-risk",         "Connection Risk"],
  ["connection-route",        "Connection Route"],
  ["alternative-options",     "Alternative Options"],
  ["replace-reservation",     "Replace Reservation"],

  // ── Leave-by ──────────────────────────────────────────────────────────────────
  [null, "Leave-by"],
  ["leave-by-planner",        "Leave-By Planner"],
  ["leave-by-settings",       "Leave-By Settings"],

  // ── Airport & Station Mode ────────────────────────────────────────────────────
  [null, "Airport & Station Mode"],
  ["airport-mode",            "Airport Mode"],
  ["station-mode",            "Station Mode"],
  ["boarding-pass-view",      "Boarding Pass"],
  ["ticket-view",             "Ticket"],
  ["airport-station-map",     "Airport / Station Map"],

  // ── Baggage ───────────────────────────────────────────────────────────────────
  [null, "Baggage"],
  ["baggage-summary",         "Baggage Summary"],
  ["baggage-detail",          "Baggage Detail"],
  ["report-baggage-issue",    "Report Issue"],

  // ── Journey Organisation ──────────────────────────────────────────────────────
  [null, "Journey Organisation"],
  ["review-suggested-merge",      "Review Suggested Merge"],
  ["merge-journeys",              "Merge Journeys"],
  ["split-journey",               "Split Journey"],
  ["move-multiple-reservations",  "Move Multiple Reservations"],

  // ── Sharing ───────────────────────────────────────────────────────────────────
  [null, "Sharing"],
  ["share-journey",           "Share Journey"],
  ["shared-link-settings",    "Shared Link Settings"],
  ["shared-journey-preview",  "Shared Journey Preview"],
  ["share-to-onward",         "Share to Onward (Extension)"],
  ["share-extension-journey-picker", "Extension Journey Picker"],
  ["no-shared-links",         "No Shared Links"],

  // ── Calendar ──────────────────────────────────────────────────────────────────
  [null, "Calendar"],
  ["calendar-export",         "Calendar Export"],
  ["calendar-sync-settings",  "Calendar Sync Settings"],

  // ── Collaboration ─────────────────────────────────────────────────────────────
  [null, "Collaboration"],
  ["journey-members",             "Journey Members"],
  ["invite-to-journey",           "Invite to Journey"],
  ["invitation-received",         "Invitation Received"],
  ["member-permissions",          "Member Permissions"],
  ["journey-activity",            "Journey Activity"],
  ["activity-detail",             "Activity Detail"],
  ["journey-discussion",          "Journey Discussion"],
  ["change-approval",             "Change Approval"],
  ["no-journey-members",          "No Members"],
  ["pending-invitation",          "Pending Invitation"],
  ["collaboration-offline",       "Collaboration Offline"],

  // ── Travellers ────────────────────────────────────────────────────────────────
  [null, "Travellers"],
  ["travellers",                  "Travellers"],
  ["add-edit-traveller",          "Add / Edit Traveller"],
  ["assign-reservations-traveller","Assign Reservations"],

  // ── Location Sharing ──────────────────────────────────────────────────────────
  [null, "Location Sharing"],
  ["share-my-location",            "Share My Location"],
  ["location-sharing-privacy",     "Location Sharing Privacy"],
  ["location-permission-required", "Location Permission Required"],
  ["location-sharing-ended",       "Location Sharing Ended"],

  // ── Travel Alerts ─────────────────────────────────────────────────────────────
  [null, "Travel Alerts"],
  ["travel-alert-inbox",       "Travel Alert Inbox"],
  ["critical-travel-alert",    "Critical Travel Alert"],
  ["travel-alert-preferences", "Alert Preferences"],

  // ── Notifications ─────────────────────────────────────────────────────────────
  [null, "Notifications"],
  ["notification-settings",           "Global Notification Settings"],
  ["journey-notification-settings",   "Journey Notification Settings"],
  ["collab-notification-settings",    "Collaboration Notifications"],

  // ── Live Data ─────────────────────────────────────────────────────────────────
  [null, "Live Data"],
  ["live-data-settings",   "Live Data Settings"],
  ["live-data-source",     "Live Data Source Detail"],

  // ── Settings ──────────────────────────────────────────────────────────────────
  [null, "Settings"],
  ["settings",             "Settings Home"],
  ["account-screen",       "Account"],
  ["sign-out-confirm",     "Sign Out"],
  ["delete-account",       "Delete Account"],
  ["deletion-progress",    "Account Deletion Progress"],
  ["preferences",          "Preferences"],
  ["help-support",         "Help & Support"],
  ["contact-support",      "Contact Support"],
  ["about-onward",         "About Onward"],

  // ── Offline & Storage ─────────────────────────────────────────────────────────
  [null, "Offline & Storage"],
  ["offline-journey-settings", "Offline Journey Settings"],
  ["offline-downloads",        "Offline Downloads"],
  ["pending-sync-details",     "Pending Sync Details"],
  ["offline-download-error",   "Download Error"],

  // ── System Error States ────────────────────────────────────────────────────────
  [null, "System States"],
  ["offline",              "Offline"],
  ["scan-error",           "Scan Error"],
  ["general-error",        "General Error"],
  ["service-unavailable",  "Service Unavailable"],
  ["sync-conflict",        "Sync Conflict"],
  // ── Assistant ──────────────────────────────────────────────────────────────
  [null, "Assistant"],
  ["assistant-home",          "Assistant Home"],
  ["journey-assistant",       "Journey Conversation"],
  ["general-assistant",       "General Conversation"],
  ["voice-assistant",         "Voice Assistant"],
  ["assistant-context",       "Context Sheet"],
  ["assistant-sources",       "Sources"],
  ["conversation-history",    "Conversation History"],
  ["assistant-feedback",      "Response Feedback"],
  // ── AI Journey Creation ────────────────────────────────────────────────────
  [null, "AI Journey Creation"],
  ["plan-new-journey",           "Plan a New Journey"],
  ["planning-preferences",       "Planning Preferences"],
  ["journey-budget",             "Journey Budget"],
  ["traveller-selection-ai",     "Traveller Selection"],
  ["planning-constraints",       "Planning Constraints"],
  ["generating-journey-plan",    "Generating Plan"],
  ["generated-journey-overview", "Generated Journey Overview"],
  ["generated-day-plan",         "Generated Day Plan"],
  ["compare-generated-plans",    "Compare Plans"],
  ["review-suggested-additions", "Review Suggested Additions"],
  ["save-generated-journey",     "Save Generated Journey"],
  ["journey-plan-history",       "Plan Revision History"],
  // ── Day Planning ──────────────────────────────────────────────────────────
  [null, "Day Planning & Optimisation"],
  ["optimise-this-day",       "Optimise This Day"],
  ["optimised-day-preview",   "Optimised Day Preview"],
  ["move-flexible-plans",     "Move Flexible Plans"],
  ["fill-free-time",          "Fill Free Time"],
  ["free-time-suggestion",    "Free-Time Suggestion"],
  ["replan-remaining-day",    "Replan Remaining Day"],
  ["replanned-day-preview",   "Replanned Day Preview"],
  ["journey-wide-optimisation","Journey-Wide Optimisation"],
  // ── Discovery ─────────────────────────────────────────────────────────────
  [null, "Destination Discovery"],
  ["explore-destination",         "Explore Destination"],
  ["destination-guide",           "Destination Guide"],
  ["recommendation-feed",         "Recommendation Feed"],
  ["discovery-map",               "Discovery Map"],
  ["place-detail",                "Place Detail"],
  ["add-place-to-journey",        "Add Place to Journey"],
  ["saved-places",                "Saved Places"],
  ["recommendation-preferences",  "Recommendation Preferences"],
  // ── Insights ──────────────────────────────────────────────────────────────
  [null, "Journey Intelligence"],
  ["journey-insights",        "Journey Insights"],
  ["journey-gap-detail",      "Journey Gap Detail"],
  ["overloaded-day-insight",  "Overloaded Day"],
  ["weather-suggestion",      "Weather Suggestion"],
  ["local-event-suggestion",  "Local Event Suggestion"],
  ["missing-essential",       "Missing Essential"],
  // ── Briefings ─────────────────────────────────────────────────────────────
  [null, "Briefings"],
  ["todays-brief",           "Today's Journey Brief"],
  ["tomorrows-preview",      "Tomorrow's Preview"],
  ["journey-summary-ai",     "Journey Summary"],
  ["audio-briefing-player",  "Audio Briefing Player"],
  ["briefing-settings",      "Briefing Settings"],
  // ── Preferences ───────────────────────────────────────────────────────────
  [null, "Travel Preferences"],
  ["travel-preferences",          "Travel Preferences"],
  ["food-preferences",            "Food Preferences"],
  ["accessibility-preferences",   "Accessibility"],
  ["budget-preferences",          "Budget Preferences"],
  ["traveller-preference-detail", "Traveller Preferences"],
  ["personalisation-summary",     "Personalisation Summary"],
  // ── Packing ───────────────────────────────────────────────────────────────
  [null, "Packing & Preparation"],
  ["smart-packing-list",       "Smart Packing List"],
  ["packing-suggestion-detail","Packing Suggestion"],
  ["packing-item-detail",      "Packing Item"],
  ["preparation-assistant",    "Preparation Assistant"],
  ["preparation-checklist",    "Preparation Checklist"],
  // ── Language ──────────────────────────────────────────────────────────────
  [null, "Language & Local"],
  ["phrasebook",            "Phrasebook"],
  ["translate-phrase",      "Translate Phrase"],
  ["fullscreen-translation","Full-Screen Translation"],
  ["local-essentials",      "Local Essentials"],
  // ── AI Controls ───────────────────────────────────────────────────────────
  [null, "Assistant Controls"],
  ["assistant-settings",          "Assistant Settings"],
  ["assistant-data-controls",     "Data Controls"],
  ["manage-assistant-memory",     "Manage Memory"],
  ["clear-conversation-confirm",  "Clear Conversation"],
  ["uncertain-answer",            "Uncertain Answer"],
  ["conflicting-information",     "Conflicting Information"],
  ["assistant-offline",           "Assistant Offline"],
  ["confirm-assistant-action",    "Confirm Action"],
  ["assistant-first-use",         "First Use"],
  ["no-journey-context",          "No Journey Context"],
  ["generating-response",         "Generating Response"],
  ["plan-generation-failed",      "Plan Generation Failed"],
  ["no-recommendations",          "No Recommendations"],
  ["source-unavailable",          "Source Unavailable"],
  ["outdated-recommendation",     "Outdated Recommendation"],
  ["personalisation-disabled",    "Personalisation Disabled"],
  ["packing-list-complete",       "Packing Complete"],
  ["preparation-complete",        "Preparation Complete"],
  // ── Travel Wallet ──────────────────────────────────────────────────────────
  [null, "Travel Wallet"],
  ["wallet-home",             "Travel Wallet Home"],
  ["wallet-locked",           "Wallet Locked"],
  ["payment-methods",         "Payment Methods"],
  ["add-payment-method",      "Add Payment Method"],
  ["travel-passes-credits",   "Passes & Credits"],
  ["travel-credit-detail",    "Travel Credit Detail"],
  ["refund-tracker",          "Refund Tracker"],
  ["refund-detail",           "Refund Detail"],
  ["add-refund",              "Add Refund"],
  // ── Journey Expenses ───────────────────────────────────────────────────────
  [null, "Journey Expenses"],
  ["journey-expenses",        "Journey Expenses Home"],
  ["add-expense",             "Add Expense"],
  ["expense-detail",          "Expense Detail"],
  ["edit-expense",            "Edit Expense"],
  ["receipt-scanner",         "Receipt Scanner"],
  ["receipt-review",          "Receipt Review"],
  ["expense-categories",      "Expense Categories"],
  ["journey-budget-expenses", "Journey Budget"],
  ["edit-journey-budget",     "Edit Budget"],
  ["budget-category-detail",  "Budget Category Detail"],
  ["currency-conversion",     "Currency Conversion"],
  ["exchange-rate-settings",  "Exchange Rate Settings"],
  // ── Group Expenses ─────────────────────────────────────────────────────────
  [null, "Group Expenses"],
  ["group-expense-summary",   "Group Expense Summary"],
  ["split-expense",           "Split Expense"],
  ["member-balance-detail",   "Member Balance"],
  ["settle-up",               "Settle Up"],
  ["settlement-confirmation", "Settlement Confirmation"],
  ["payment-reminder",        "Payment Reminder"],
  ["settlement-history",      "Settlement History"],
  ["split-dispute",           "Split Dispute"],
  // ── Loyalty ────────────────────────────────────────────────────────────────
  [null, "Loyalty"],
  ["loyalty-wallet",           "Loyalty Wallet"],
  ["add-loyalty-programme",    "Add Programme"],
  ["loyalty-programme-detail", "Programme Detail"],
  ["loyalty-match-suggestion", "Loyalty Match"],
  ["points-status-progress",   "Points Progress"],
  ["expiring-points-alert",    "Expiring Points"],
  // ── Booking ────────────────────────────────────────────────────────────────
  [null, "Booking Hub"],
  ["booking-hub",             "Booking Hub"],
  ["search-flights",          "Search Flights"],
  ["flight-search-results",   "Flight Results"],
  ["flight-option-detail",    "Flight Detail"],
  ["compare-flight-options",  "Compare Flights"],
  ["search-stays",            "Search Stays"],
  ["stay-search-results",     "Stay Results"],
  ["stay-option-detail",      "Stay Detail"],
  ["activity-booking-options","Activity Options"],
  ["booking-handoff-confirm", "Booking Handoff"],
  ["booking-return-import",   "Booking Return"],
  ["saved-booking-options",   "Saved Options"],
  // ── Travel Services ────────────────────────────────────────────────────────
  [null, "Travel Services"],
  ["travel-insurance",        "Travel Insurance"],
  ["insurance-policy-detail", "Insurance Policy"],
  ["insurance-comparison",    "Insurance Comparison"],
  ["insurance-claim-tracker", "Claim Tracker"],
  ["esim-connectivity",       "eSIM & Connectivity"],
  ["esim-detail",             "eSIM Detail"],
  ["airport-transfer-options","Airport Transfers"],
  // ── Post-Journey ───────────────────────────────────────────────────────────
  [null, "Post-Journey"],
  ["journey-recap",           "Journey Recap"],
  ["journey-spending-summary","Spending Summary"],
  ["journey-archive",         "Journey Archive"],
  ["journey-reflection",      "Journey Reflection"],
  ["provider-review-prompt",  "Review Prompt"],
  ["save-journey-template",   "Save as Template"],
  ["journey-templates",       "Journey Templates"],
  // ── Financial Reports ──────────────────────────────────────────────────────
  [null, "Financial Reports"],
  ["expense-report-builder",  "Report Builder"],
  ["expense-report-preview",  "Report Preview"],
  ["receipt-library",         "Receipt Library"],
  ["receipt-detail",          "Receipt Detail"],
  ["export-journey-data",     "Export Journey Data"],
  // ── Phase 5 Settings ───────────────────────────────────────────────────────
  [null, "Phase 5 Settings"],
  ["wallet-payment-settings", "Wallet & Payments"],
  ["expense-settings",        "Expense Settings"],
  ["loyalty-settings",        "Loyalty Settings"],
  ["booking-preferences",     "Booking Preferences"],
  ["commercial-transparency", "Commercial Transparency"],
  // ── Phase 5 States ─────────────────────────────────────────────────────────
  [null, "Phase 5 States"],
  ["no-expenses",               "No Expenses"],
  ["budget-exceeded",           "Budget Exceeded"],
  ["unsettled-balances",        "Unsettled Balances"],
  ["exchange-rate-unavailable", "Rate Unavailable"],
  ["refund-overdue",            "Refund Overdue"],
  ["payment-failed",            "Payment Failed"],
  ["booking-price-changed",     "Price Changed"],
  ["booking-handoff-failed",    "Handoff Failed"],
  ["loyalty-balance-unavailable","Balance Unavailable"],
  ["expense-sync-conflict",     "Expense Conflict"],
  ["receipt-unreadable",        "Receipt Unreadable"],
  ["split-not-balanced",        "Split Unbalanced"],
  ["sponsored-disclosure",      "Sponsored Disclosure"],
];

type Surface = "home" | "screens";
type ScreenGroupId = "all" | "core" | "live" | "assistant" | "commerce" | "system";

type SidebarSection = {
  title: string;
  items: { screen: Screen; label: string }[];
};

const APP_FEATURES = [
  {
    icon: <MailCheck size={20} />,
    title: "Import reservations",
    copy: "Connect an inbox or forward confirmations so plans enter the Journey without manual rebuilding.",
  },
  {
    icon: <Route size={20} />,
    title: "Follow the Journey Timeline",
    copy: "Flights, stays, trains, reservations, reminders, and documents stay ordered by what happens next.",
  },
  {
    icon: <CalendarClock size={20} />,
    title: "Know what needs attention",
    copy: "Review uncertain imports, missing details, date conflicts, and reminders before travel day.",
  },
  {
    icon: <Brain size={20} />,
    title: "Ask in context",
    copy: "Use the assistant for briefings, gaps, local essentials, translation, and replanning inside the Journey.",
  },
];

const APP_IMPORT_FLOW = [
  {
    label: "Connected inbox",
    title: "Find the reservation",
    copy: "Flights, stays, trains, and booked activities are detected from confirmations.",
  },
  {
    label: "Import",
    title: "Turn it into a plan item",
    copy: "Dates, times, locations, providers, and confirmation codes become editable details.",
  },
  {
    label: "Review",
    title: "Flag what is uncertain",
    copy: "Onward separates clear details from anything that needs a quick human check.",
  },
  {
    label: "Timeline",
    title: "Place it in the Journey",
    copy: "The item lands where it belongs, with documents and reminders close by.",
  },
];

const APP_DAY_CONTEXT = [
  {
    label: "Now",
    title: "Leave in 24 min",
    copy: "Route, ticket, and station details are ready before the moment gets busy.",
    icon: <Bell size={18} />,
  },
  {
    label: "Next",
    title: "Train to Porto",
    copy: "The following reservation stays visible with documents attached.",
    icon: <Train size={18} />,
  },
  {
    label: "Review",
    title: "Hotel date mismatch",
    copy: "Potential conflicts are called out plainly, without pretending everything is settled.",
    icon: <ShieldCheck size={18} />,
  },
];

const APP_TRUST_POINTS = [
  {
    icon: <ShieldCheck size={18} />,
    copy: "Read-only inbox access for reservation extraction.",
  },
  {
    icon: <Inbox size={18} />,
    copy: "Raw email content is not stored in the app prototype.",
  },
  {
    icon: <FileText size={18} />,
    copy: "Travel documents stay attached to the Journey context.",
  },
  {
    icon: <Users size={18} />,
    copy: "Shared Journeys keep people aligned without rebuilding the plan in chat.",
  },
];

const APP_CARD_COLORS = ["#F2977A", "#F5D142", "#6FA8F5", "#7FD8CB", "#FF9F45", "#A7A0E8", "#F2779E", "#F2B27A", "#E7A6E0"];
const APP_FLOW_COLORS = ["#6FA8F5", "#F5D142", "#F2977A", "#7FD8CB", "#A7A0E8", "#FF9F45", "#E7A6E0", "#F2779E", "#F2B27A"];
const ACTIVITY_IMAGE_MODULES = import.meta.glob("../../Images/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const ACTIVITY_IMAGES = Object.entries(ACTIVITY_IMAGE_MODULES)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Journey activity",
  }));

const LANDING_ACTIVITIES = [
  { label: "Airport", title: "Boarding pass ready", detail: "Terminal and gate updates saved", icon: <Compass size={22} />, progress: "58%" },
  { label: "Flight", title: "Flight details synced", detail: "Seat, times, and documents offline", icon: <Wifi size={22} />, progress: "72%" },
  { label: "Rail", title: "Train ticket imported", detail: "Platform alert and leave-by time set", icon: <Train size={22} />, progress: "70%" },
  { label: "Seat", title: "Rail leg organised", detail: "Coach, seat, and delay alerts grouped", icon: <Train size={22} />, progress: "64%" },
  { label: "Ticket", title: "Museum pass attached", detail: "Timed entry and QR saved offline", icon: <FileText size={22} />, progress: "46%" },
  { label: "Route", title: "Trail plan stored", detail: "Start point, weather, and notes linked", icon: <Route size={22} />, progress: "52%" },
  { label: "Map", title: "Saved places grouped", detail: "Photo stops added to the Journey map", icon: <Compass size={22} />, progress: "60%" },
  { label: "Review", title: "Plans ready to scan", detail: "Next moves and documents in one place", icon: <Clock size={22} />, progress: "40%" },
  { label: "Stay", title: "Hotel check-in ready", detail: "Booking ref and address attached", icon: <Hotel size={22} />, progress: "44%" },
  { label: "Rental", title: "Bike pickup confirmed", detail: "Depot, return time, and deposit note", icon: <Route size={22} />, progress: "50%" },
  { label: "Local", title: "Market note pinned", detail: "Wishlist, cash reminder, and address", icon: <UtensilsCrossed size={22} />, progress: "48%" },
  { label: "Ferry", title: "Ferry ticket ready", detail: "Pier map and boarding window saved", icon: <Compass size={22} />, progress: "66%" },
  { label: "Weather", title: "Coast plan checked", detail: "Forecast, tide, and sun notes ready", icon: <MapPin size={22} />, progress: "62%" },
  { label: "Route", title: "Next stop selected", detail: "Landmarks and directions available offline", icon: <MapPin size={22} />, progress: "36%" },
  { label: "Pack", title: "Packing list updated", detail: "Outfits, chargers, and documents checked", icon: <FileText size={22} />, progress: "76%" },
  { label: "Table", title: "Reservation confirmed", detail: "Address, time, and booking note saved", icon: <UtensilsCrossed size={22} />, progress: "56%" },
  { label: "Pinned", title: "Viewpoint saved", detail: "Opening hours and route from stay linked", icon: <Compass size={22} />, progress: "54%" },
  { label: "Transit", title: "Tram stop alert set", detail: "Line, stop, and ticket kept together", icon: <Train size={22} />, progress: "68%" },
  { label: "Saved", title: "Bookshop note added", detail: "Hours, address, and wish list attached", icon: <FileText size={22} />, progress: "42%" },
  { label: "Open", title: "Free time protected", detail: "A quiet block held in the timeline", icon: <FileText size={22} />, progress: "38%" },
  { label: "Pier", title: "Harbor transfer ready", detail: "Pickup point and bag note saved", icon: <Compass size={22} />, progress: "58%" },
  { label: "Nearby", title: "Food stop saved", detail: "Walking route and payment note attached", icon: <UtensilsCrossed size={22} />, progress: "52%" },
  { label: "Reminder", title: "Day bag checklist", detail: "Water, layers, snacks, and tickets", icon: <Clock size={22} />, progress: "46%" },
  { label: "Entry", title: "Garden tickets saved", detail: "Timed entry and map attached", icon: <MapPin size={22} />, progress: "34%" },
];

const SCREEN_GROUPS: {
  id: ScreenGroupId;
  label: string;
  sections?: string[];
}[] = [
  { id: "all", label: "All Screens" },
  {
    id: "core",
    label: "Core App",
    sections: [
      "Onboarding", "Timeline", "Journeys", "Reservations", "Imports",
      "Connected Inboxes & Privacy", "Journey Map", "Documents", "Journey Preparation",
    ],
  },
  {
    id: "live",
    label: "Live Travel",
    sections: [
      "Live Travel", "Disruptions & Alternatives", "Leave-by", "Airport & Station Mode",
      "Baggage", "Travel Alerts", "Live Data",
    ],
  },
  {
    id: "assistant",
    label: "AI Assistant",
    sections: [
      "Assistant", "AI Journey Creation", "Day Planning & Optimisation",
      "Destination Discovery", "Journey Intelligence", "Briefings", "Travel Preferences",
      "Packing & Preparation", "Language & Local", "Assistant Controls",
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    sections: [
      "Travel Wallet", "Journey Expenses", "Group Expenses", "Loyalty", "Booking Hub",
      "Travel Services", "Post-Journey", "Financial Reports", "Phase 5 Settings",
    ],
  },
  {
    id: "system",
    label: "Sharing + States",
    sections: [
      "Journey Organisation", "Sharing", "Calendar", "Collaboration", "Travellers",
      "Location Sharing", "Notifications", "Settings", "Offline & Storage",
      "System States", "Phase 5 States",
    ],
  },
];

const SIDEBAR_SECTIONS = SIDEBAR.reduce<SidebarSection[]>((sections, [screenId, label]) => {
  if (screenId === null) {
    sections.push({ title: label, items: [] });
    return sections;
  }

  if (sections.length === 0) sections.push({ title: "Screens", items: [] });
  sections[sections.length - 1].items.push({ screen: screenId, label });
  return sections;
}, []).filter((section) => section.items.length > 0);

const SCREEN_COUNT = SIDEBAR.filter(([screenId]) => screenId !== null).length;

function getSidebarSections(groupId: ScreenGroupId) {
  const group = SCREEN_GROUPS.find((item) => item.id === groupId);
  if (!group?.sections) return SIDEBAR_SECTIONS;

  const allowed = new Set(group.sections);
  return SIDEBAR_SECTIONS.filter((section) => allowed.has(section.title));
}

function isScreenInGroup(screenId: Screen, groupId: ScreenGroupId) {
  return getSidebarSections(groupId).some((section) =>
    section.items.some((item) => item.screen === screenId)
  );
}

function AppNav({ surface, onSurfaceChange }: {
  surface: Surface;
  onSurfaceChange: (surface: Surface) => void;
}) {
  const tabs: { id: Surface | "investors"; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "screens", label: "Screens" },
    { id: "investors", label: "For Investors" },
  ];

  return (
    <header className="onward-app-header sticky top-0 z-50 border-b-2 border-[#080A0A] bg-[#F9EFD1]">
      <div className="onward-app-nav mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => onSurfaceChange("home")}
          className="onward-nav-brand text-left text-[#080A0A]"
        >
          <span
            className="text-[24px] leading-none sm:text-[28px]"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Onward
          </span>
        </button>

        <nav className="onward-nav-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-label={tab.label}
              onClick={() => { if (tab.id !== "investors") onSurfaceChange(tab.id); }}
              className={cn(
                "onward-nav-link",
                surface === tab.id
                  ? "onward-nav-link-active"
                  : "text-[#68757B] hover:text-[#080A0A]"
              )}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <a href="#contact" className="onward-contact-button">
          Contact
        </a>
      </div>
    </header>
  );
}

function JourneyArtwork() {
  const timelineRows = [
    { title: "Train to Porto", detail: "Platform 2 · Seat 14A", time: "10:15", color: "#F5D142", icon: <Train size={14} /> },
    { title: "Hotel check-in", detail: "Confirmation ready", time: "15:00", color: "#6FA8F5", icon: <Hotel size={14} /> },
    { title: "Dinner reservation", detail: "Table for two", time: "20:30", color: "#7FD8CB", icon: <UtensilsCrossed size={14} /> },
  ];

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] flex-col items-center gap-5 sm:block sm:max-w-[760px] sm:min-h-[610px] lg:min-h-[650px] xl:max-w-[820px]">
      <div className="relative z-40 w-[276px] sm:absolute sm:left-1/2 sm:top-5 sm:w-[290px] sm:-translate-x-1/2 lg:w-[300px] xl:w-[318px]">
        <div className="onward-phone-shell hero-phone-shell aspect-[0.52/1]">
          <div className="onward-phone-screen px-4 pb-20 pt-12 sm:px-5 sm:pt-14">
            <div className="onward-phone-island" />
            <div className="mb-3 flex items-center justify-between text-[#080A0A]">
              <div>
                <p className="text-[10px] font-black sm:text-[12px]">09:41</p>
                <h3 className="text-[15px] font-black sm:text-[18px]">Lisbon Journey</h3>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080A0A]">
                <MapPin size={15} />
              </span>
            </div>

            <div className="mb-3 flex gap-2">
              <span className="flex items-center gap-1 rounded-full border-2 border-[#080A0A] bg-white px-2.5 py-1 text-[10px] font-black text-[#080A0A]">
                <CalendarClock size={11} />
                Day 2 of 5
              </span>
              <span className="flex items-center gap-1 rounded-full border-2 border-[#080A0A] bg-white px-2.5 py-1 text-[10px] font-black text-[#080A0A]">
                <Wifi size={11} />
                Offline ready
              </span>
            </div>

            <div className="rounded-[24px] border-2 border-[#080A0A] bg-[#F2977A] p-4 text-[#080A0A]">
              <p className="text-[11px] font-bold">Now</p>
              <p className="mt-2 text-[24px] font-black leading-none">24 min</p>
              <p className="mt-1 text-[11px] font-bold">Leave for station</p>
            </div>

            <div className="mt-3 grid gap-2.5">
              {timelineRows.map((row) => (
                <div key={row.title} className="flex min-w-0 items-center gap-2.5 rounded-[18px] border-2 border-[#080A0A] px-2.5 py-2.5 text-[#080A0A]" style={{ background: row.color }}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-[#080A0A] text-white">
                    {row.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-black leading-tight">{row.title}</p>
                    <p className="truncate text-[10px] font-bold opacity-70">{row.detail}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-black">{row.time}</span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 flex h-12 w-[80%] -translate-x-1/2 items-center justify-around rounded-full border-2 border-[#080A0A] bg-[#080A0A] text-white">
              <Route size={16} />
              <Inbox size={16} />
              <FileText size={16} />
              <Settings size={16} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 w-full max-w-[300px] p-3.5 sm:absolute sm:left-[2%] sm:top-[12%] sm:max-w-none md:left-[3%] xl:left-[3%]"
        style={{ background: "#F2977A", "--hero-card-rotate": "-2deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <FileText size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Boarding pass ready</p>
            <p className="hero-floating-copy text-[#080A0A]/70">Saved offline</p>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 hidden w-full max-w-[300px] p-3.5 sm:absolute sm:left-[2%] sm:top-[40%] sm:block sm:max-w-none md:left-[3%] xl:left-[3%]"
        style={{ background: "#7FD8CB", "--hero-card-rotate": "1.5deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <MailCheck size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Inbox connected</p>
            <p className="hero-floating-copy text-[#080A0A]/70">Plans pulled in</p>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 hidden w-full max-w-[300px] p-3 sm:absolute sm:right-[2%] sm:top-[14%] sm:block sm:max-w-none md:right-[3%] xl:right-[3%]"
        style={{ background: "#6FA8F5", "--hero-card-rotate": "-1.5deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <Compass size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Weather clear</p>
            <p className="hero-floating-copy text-[#080A0A]/70">Lisbon today</p>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 hidden w-full max-w-[300px] p-3 sm:absolute sm:right-[2%] sm:top-[42%] sm:block sm:max-w-none md:right-[3%] xl:right-[3%]"
        style={{ background: "#F5D142", "--hero-card-rotate": "1.5deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <Bell size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Leave-by set</p>
            <p className="hero-floating-copy text-[#080A0A]/70">24 min to move</p>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 hidden w-full max-w-[300px] p-3 sm:absolute sm:right-[2%] sm:top-[70%] sm:block sm:max-w-none md:right-[3%] xl:right-[3%]"
        style={{ background: "#FF9F45", "--hero-card-rotate": "-1.5deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <Hotel size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Check-in found</p>
            <p className="hero-floating-copy text-[#080A0A]/70">Ref attached</p>
          </div>
        </div>
      </div>

      <div
        className="onward-floating-card onward-reference-card hero-floating-card relative z-20 hidden w-full max-w-[300px] p-3.5 sm:absolute sm:left-[2%] sm:top-[68%] sm:block sm:max-w-none md:left-[3%] xl:left-[3%]"
        style={{ background: "#A7A0E8", "--hero-card-rotate": "-1.5deg" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span className="hero-floating-icon flex shrink-0 items-center justify-center bg-[#080A0A] text-white">
            <Brain size={16} />
          </span>
          <div>
            <p className="hero-floating-title text-[#080A0A]">Assistant ready</p>
            <p className="hero-floating-copy text-[#080A0A]/70">Ask in context</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyContextRows() {
  return (
    <div className="journey-context-rows grid gap-4">
      {APP_FEATURES.map((feature, index) => (
        <article
          key={feature.title}
          className="journey-context-card onward-reference-card flex gap-4 p-4 sm:gap-5 sm:p-5 xl:p-6"
          style={{ background: APP_CARD_COLORS[index % APP_CARD_COLORS.length] }}
        >
          <div className="onward-icon-tile">
            {feature.icon}
          </div>
          <div>
            <h3 className="text-[18px] font-black leading-tight text-[#080A0A] sm:text-[24px]">{feature.title}</h3>
            <p className="mt-2 hidden text-[15px] font-bold leading-6 text-[#080A0A]/70 sm:block lg:text-[17px] lg:leading-7">{feature.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function MiniTimeline() {
  const timelineItems = [
    { time: "08:05", title: "Leave for station", detail: "Car reminder and route ready", icon: <Clock size={22} />, color: "#F2977A" },
    { time: "10:15", title: "Train to Porto", detail: "Platform and ticket attached", icon: <Train size={22} />, color: "#F5D142" },
    { time: "15:00", title: "Hotel check-in", detail: "Document saved offline", icon: <Hotel size={22} />, color: "#6FA8F5" },
  ];

  return (
    <div className="mini-timeline relative w-full max-w-[760px] pl-[64px] sm:pl-[76px] lg:max-w-none lg:pl-[92px]">
      <div className="mini-timeline-line onward-timeline-line absolute bottom-7 left-[22px] top-7 w-1 rounded-full bg-[#080A0A] sm:left-[26px] lg:left-[30px] lg:w-[5px]" />
      <div className="grid gap-4 lg:gap-5">
        {timelineItems.map((item) => (
          <article
            key={item.title}
            className="mini-timeline-card relative rounded-[34px] border-2 border-[#080A0A] p-5 text-[#080A0A] shadow-[8px_8px_0_rgba(8,10,10,0.14)] sm:px-6 sm:py-5 lg:rounded-[38px] lg:px-7 lg:py-5 lg:shadow-[12px_12px_0_rgba(8,10,10,0.14)]"
            style={{ background: item.color }}
          >
            <span className="mini-timeline-icon absolute left-[-64px] top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[18px] border-2 border-[#080A0A] bg-[#080A0A] text-white sm:left-[-76px] sm:h-14 sm:w-14 sm:rounded-[20px] lg:left-[-92px] lg:h-16 lg:w-16 lg:rounded-[24px]">
              {item.icon}
            </span>
            <div className="grid gap-3 sm:grid-cols-[104px_1fr] sm:items-center lg:grid-cols-[118px_1fr]">
              <p className="text-[16px] font-black leading-none lg:text-[18px]">{item.time}</p>
              <div>
                <h3 className="text-[22px] font-black leading-tight sm:text-[26px] lg:text-[30px]">{item.title}</h3>
                <p className="mt-2 text-[15px] font-bold leading-6 text-[#080A0A]/70 lg:text-[17px]">{item.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ImportFlowPanel() {
  return (
    <div className="import-flow-panel relative max-w-[700px] pl-[72px]">
      <div className="grid gap-5">
        {APP_IMPORT_FLOW.map((item, index) => (
          <article
            key={item.title}
            className="import-flow-card onward-reference-card relative min-h-[128px] px-5 py-5 sm:min-h-[140px] sm:px-6 sm:py-6 lg:min-h-[148px] lg:px-7 lg:py-6"
            style={{ background: APP_FLOW_COLORS[index % APP_FLOW_COLORS.length] }}
          >
            {index < APP_IMPORT_FLOW.length - 1 && (
              <div
                className="import-flow-connector absolute left-[-44px] top-1/2 z-0 w-1 -translate-x-1/2 rounded-full bg-[#080A0A]"
                style={{ height: "calc(100% + 1.25rem)" }}
              />
            )}
            <div className="import-flow-node absolute left-[-72px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-[20px] border-2 border-[#080A0A] bg-[#080A0A] text-[13px] font-black text-white lg:h-16 lg:w-16 lg:rounded-[24px] lg:text-[14px]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#080A0A]/65 lg:text-[12px]">{item.label}</p>
              <h3 className="mt-2 text-[20px] font-black leading-tight text-[#080A0A] lg:text-[24px]">{item.title}</h3>
              <p className="mt-2 hidden text-[14px] font-bold leading-6 text-[#080A0A]/70 sm:block lg:text-[16px]">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DayContextPanel() {
  return (
    <div className="day-context-panel grid gap-4">
      {APP_DAY_CONTEXT.map((item, index) => (
        <article
          key={item.title}
          className="day-context-card rounded-[30px] border-2 border-[#080A0A] p-4 text-[#080A0A] shadow-[6px_6px_0_rgba(8,10,10,0.12)] sm:p-5"
          style={{ background: ["#F2977A", "#F5D142", "#6FA8F5"][index] }}
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#080A0A]/65">{item.label}</p>
              <h3 className="mt-1 text-[18px] font-black leading-tight">{item.title}</h3>
            </div>
            <span className="day-context-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#080A0A] text-white">
              {item.icon}
            </span>
          </div>
          <p className="text-[13px] font-bold leading-5 text-[#080A0A]/70">{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

function TravelDayBoard() {
  const quickContext = [
    { label: "Offline ticket", value: "Ready", icon: <FileText size={16} />, color: "#7FD8CB" },
    { label: "Live status", value: "On time", icon: <Clock size={16} />, color: "#F5D142" },
    { label: "Review state", value: "1 flag", icon: <ShieldCheck size={16} />, color: "#F2977A" },
  ];

  return (
    <div className="travel-day-board">
      <div className="travel-day-board-top">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#080A0A]/60">Live Journey</p>
          <h3 className="mt-2 text-[26px] font-black leading-tight text-[#080A0A] sm:text-[32px]">The day stays readable.</h3>
          <p className="mt-2 max-w-[460px] text-[14px] font-bold leading-6 text-[#080A0A]/68 sm:text-[16px]">
            Leave-by timing, tickets, documents, and unresolved details sit in one active view.
          </p>
        </div>
        <div className="travel-day-count">
          <span>24</span>
          <small>min</small>
        </div>
      </div>

      <div className="travel-day-board-body">
        <DayContextPanel />
      </div>

      <div className="travel-day-mini-grid">
        {quickContext.map((item) => (
          <div key={item.label} className="travel-day-mini-card" style={{ background: item.color }}>
            <span>{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustPanel() {
  const trustStats = [
    { label: "Source material", value: "Attached" },
    { label: "Permissions", value: "Clear" },
    { label: "Offline access", value: "Saved" },
  ];

  return (
    <div className="trust-panel">
      <div className="trust-panel-head">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#080A0A]/60">Trust model</p>
        <h3 className="mt-2 text-[26px] font-black leading-tight text-[#080A0A] sm:text-[32px]">Helpful without getting mysterious.</h3>
      </div>

      <div className="trust-point-grid">
        {APP_TRUST_POINTS.map((item, index) => (
          <article
            key={item.copy}
            className="trust-point-card"
            style={{ background: APP_FLOW_COLORS[index % APP_FLOW_COLORS.length] }}
          >
            <span>{item.icon}</span>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="trust-stat-row">
        {trustStats.map((item, index) => (
          <div key={item.label} style={{ background: APP_CARD_COLORS[(index + 2) % APP_CARD_COLORS.length] }}>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityImageCard({ image, activity, index, className }: {
  image: { src: string; name: string };
  activity: typeof LANDING_ACTIVITIES[number];
  index: number;
  className?: string;
}) {
  const tilt = [-2.5, 1.6, -1.2, 2.2, -1.8, 1.1][index % 6];

  return (
    <article
      className={cn("activity-image-card", className)}
      style={{
        "--activity-bg": APP_CARD_COLORS[index % APP_CARD_COLORS.length],
        "--activity-progress": activity.progress,
        "--activity-tilt": `${tilt}deg`,
      } as React.CSSProperties}
    >
      <div className="activity-image-frame">
        <img
          src={image.src}
          alt={`${activity.title} Journey scene`}
          loading={index < 4 ? "eager" : "lazy"}
          className="activity-image"
        />
      </div>
      <div className="activity-overlay-card">
        <div className="activity-overlay-top">
          <div className="min-w-0">
            <p className="activity-label">{activity.label}</p>
            <h3>{activity.title}</h3>
            <p className="activity-detail">{activity.detail}</p>
          </div>
          <span className="activity-icon">{activity.icon}</span>
        </div>
        <div className="activity-progress-track">
          <span />
        </div>
      </div>
    </article>
  );
}

function ActivityCardSlot({ index, className }: {
  index: number;
  className?: string;
}) {
  const image = ACTIVITY_IMAGES[index];
  if (!image) return null;

  return (
    <ActivityImageCard
      image={image}
      activity={LANDING_ACTIVITIES[index % LANDING_ACTIVITIES.length]}
      index={index}
      className={className}
    />
  );
}

function ActivityCardCluster({ indices, className, routeLine }: {
  indices: number[];
  className?: string;
  routeLine?: boolean;
}) {
  return (
    <div className={cn("activity-card-cluster", className)}>
      {routeLine && (
        <svg
          className="timeline-route-line"
          viewBox="0 0 1360 411"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="timeline-route-path"
            d="M135,151 C318,151 318,194 501,194 C680,194 680,151 859,151 C1042,151 1042,194 1225,194"
            fill="none"
            stroke="#080A0A"
            strokeOpacity="0.5"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1 20"
          />
        </svg>
      )}
      {indices.map((index) => (
        <ActivityCardSlot
          key={index}
          index={index}
          className="activity-card-aside activity-card-cluster-card"
        />
      ))}
    </div>
  );
}

function ActivityCardGroup({ start, count, className }: {
  start: number;
  count: number;
  className?: string;
}) {
  const cards = ACTIVITY_IMAGES.slice(start, start + count).map((image, offset) => {
    const index = start + offset;

    return {
      image,
      activity: LANDING_ACTIVITIES[index % LANDING_ACTIVITIES.length],
      index,
    };
  });

  if (cards.length === 0) return null;

  return (
    <div
      className={cn("activity-card-group", className)}
      data-count={cards.length}
    >
      {cards.map(({ image, activity, index }) => (
        <ActivityImageCard key={image.name} image={image} activity={activity} index={index} />
      ))}
    </div>
  );
}

function useSectionScroll() {
  const containerRef = useRef<HTMLElement | null>(null);
  const wheelDeltaRef = useRef(0);
  const isLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getStops = () =>
      Array.from(container.querySelectorAll<HTMLElement>(".onward-section, .onward-footer"));

    const getStopTop = (stop: HTMLElement) => stop.offsetTop - container.offsetTop;

    const getCurrentIndex = (stops: HTMLElement[]) => {
      const scrollTop = container.scrollTop;
      return stops.reduce((closestIndex, stop, index) => {
        const closestDistance = Math.abs(getStopTop(stops[closestIndex]) - scrollTop);
        const stopDistance = Math.abs(getStopTop(stop) - scrollTop);
        return stopDistance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const clearUnlockTimer = () => {
      if (unlockTimerRef.current === null) return;
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    };

    const unlockScroll = () => {
      isLockedRef.current = false;
      wheelDeltaRef.current = 0;
      clearUnlockTimer();
    };

    const scheduleUnlock = () => {
      clearUnlockTimer();
      unlockTimerRef.current = window.setTimeout(unlockScroll, 820);
    };

    const moveSection = (direction: 1 | -1) => {
      const stops = getStops();
      if (stops.length === 0 || isLockedRef.current) return;

      const currentIndex = getCurrentIndex(stops);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), stops.length - 1);
      if (nextIndex === currentIndex) {
        wheelDeltaRef.current = 0;
        return;
      }

      isLockedRef.current = true;
      wheelDeltaRef.current = 0;
      container.scrollTo({
        top: getStopTop(stops[nextIndex]),
        behavior: "smooth",
      });
      scheduleUnlock();
    };

    const normalizeWheelDelta = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * container.clientHeight;
      return event.deltaY;
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      if (isLockedRef.current) return;

      wheelDeltaRef.current += normalizeWheelDelta(event);
      if (Math.abs(wheelDeltaRef.current) < 44) return;

      moveSection(wheelDeltaRef.current > 0 ? 1 : -1);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartYRef.current !== null) event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null || isLockedRef.current) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const distance = touchStartYRef.current - endY;
      touchStartYRef.current = null;

      if (Math.abs(distance) < 48) return;
      event.preventDefault();
      moveSection(distance > 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      const downKeys = new Set(["ArrowDown", "PageDown", " "]);
      const upKeys = new Set(["ArrowUp", "PageUp"]);
      if (!downKeys.has(event.key) && !upKeys.has(event.key)) return;

      event.preventDefault();
      moveSection(downKeys.has(event.key) ? 1 : -1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearUnlockTimer();
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return containerRef;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function useLandingGsap(containerRef: React.RefObject<HTMLElement | null>, prefersReducedMotion: boolean) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-gsap-section]", container);
      const hero = container.querySelector<HTMLElement>(".hero-section");

      gsap.set(container, { "--dot-x": "0px", "--dot-y": "0px" });

      if (prefersReducedMotion) {
        gsap.set(sections, { autoAlpha: 1, clearProps: "transform,filter,clipPath" });
        return;
      }

      gsap.to(container, {
        "--dot-x": "22px",
        "--dot-y": "22px",
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      if (hero) {
        const heroCards = gsap.utils.toArray<HTMLElement>(".hero-floating-card", hero);
        const phoneBits = gsap.utils.toArray<HTMLElement>(".hero-phone-shell .onward-phone-screen > *", hero);
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTl
          .fromTo(
            hero.querySelectorAll(".hero-brand-row, .hero-headline-line"),
            { autoAlpha: 0, yPercent: 115, skewY: 4, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, yPercent: 0, skewY: 0, clipPath: "inset(0 0 0% 0)", duration: 0.78, stagger: 0.075 }
          )
          .fromTo(
            hero.querySelector(".hero-copy-text"),
            { autoAlpha: 0, y: 38, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.72 },
            "-=0.42"
          )
          .fromTo(
            hero.querySelector(".hero-primary-cta"),
            { autoAlpha: 0, y: 28, scale: 0.82 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: "back.out(2.4)" },
            "-=0.36"
          )
          .fromTo(
            hero.querySelector(".hero-phone-shell"),
            { autoAlpha: 0, x: 96, y: 66, scale: 0.72, rotation: -8, filter: "blur(12px)" },
            { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, filter: "blur(0px)", duration: 1.05, ease: "elastic.out(1, 0.72)" },
            "-=0.86"
          )
          .fromTo(
            phoneBits,
            { autoAlpha: 0, y: 24, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.045 },
            "-=0.52"
          )
          .fromTo(
            heroCards,
            {
              autoAlpha: 0,
              scale: 0.2,
              x: (index) => [-120, -90, 120, 130, 150, -130][index % 6],
              y: (index) => [70, 30, 55, -20, 40, -55][index % 6],
              rotation: (index) => [-18, 13, 20, -12, 16, -16][index % 6],
            },
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.74,
              stagger: 0.075,
              ease: "back.out(2.8)",
            },
            "-=0.72"
          )
          .fromTo(
            hero.querySelectorAll(".activity-progress-track span"),
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8, stagger: 0.04 },
            "-=0.52"
          );

        const heroAmbientDelay = heroTl.duration() + 0.12;

        gsap.to(hero.querySelector(".hero-phone-shell"), {
          y: -10,
          rotation: 0.8,
          duration: 4.8,
          delay: heroAmbientDelay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(heroCards, {
          y: (index) => (index % 2 === 0 ? -9 : 9),
          x: (index) => (index % 3 === 0 ? 5 : -5),
          rotation: (index) => (index % 2 === 0 ? 1.4 : -1.4),
          duration: (index) => 4.2 + index * 0.22,
          delay: heroAmbientDelay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.08,
        });
      }

      sections
        .filter((section) => section !== hero)
        .forEach((section) => {
          const kind = section.dataset.gsapKind;
          const text = section.querySelectorAll(".section-kicker, .landing-headline-line, .landing-copy");
          const cards = section.querySelectorAll(
            ".feature-badge, .journey-context-card, .activity-image-card, .mini-timeline-card, .import-flow-card, .day-context-card, .travel-day-board, .trust-panel, .trust-point-card, .travel-day-mini-card, .trust-stat-row > div"
          );
          const icons = section.querySelectorAll(".onward-icon-tile, .activity-icon, .mini-timeline-icon, .import-flow-node, .day-context-icon, .travel-day-mini-card span, .trust-point-card span");
          const progressBars = section.querySelectorAll(".activity-progress-track span");

          gsap.set(section, {
            autoAlpha: 0,
            y: 84,
            scale: 0.965,
            rotationX: 5,
            transformPerspective: 1000,
            transformOrigin: "center top",
            filter: "saturate(0.65) blur(7px)",
          });
          gsap.set(text, { autoAlpha: 0, y: 42, skewY: 3, clipPath: "inset(0 0 100% 0)" });
          gsap.set(cards, {
            autoAlpha: 0,
            y: 76,
            scale: 0.82,
            rotation: (index) => [-5, 4, -3, 5, -4][index % 5],
            transformOrigin: "center center",
          });
          gsap.set(icons, { scale: 0.2, rotation: -24, autoAlpha: 0 });
          gsap.set(progressBars, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
          tl.to(section, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "saturate(1) blur(0px)",
            duration: 0.72,
          })
            .to(text, {
              autoAlpha: 1,
              y: 0,
              skewY: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.62,
              stagger: 0.055,
            }, "-=0.5")
            .to(cards, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.64,
              stagger: 0.07,
              ease: "back.out(1.9)",
            }, "-=0.38")
            .to(icons, {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              duration: 0.42,
              stagger: 0.035,
              ease: "back.out(2.8)",
            }, "-=0.52")
            .to(progressBars, {
              scaleX: 1,
              duration: 0.72,
              stagger: 0.055,
            }, "-=0.42");

          if (kind === "timeline") {
            tl.fromTo(
              section.querySelector(".mini-timeline-line"),
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.75, ease: "expo.out" },
              "-=0.82"
            ).fromTo(
              section.querySelector(".timeline-route-path"),
              { autoAlpha: 0, strokeDashoffset: 190 },
              { autoAlpha: 1, strokeDashoffset: -40, duration: 1.45, ease: "power2.out" },
              "-=0.58"
            );
          }

          if (kind === "import") {
            tl.fromTo(
              section.querySelectorAll(".import-flow-connector"),
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.55, stagger: 0.09, ease: "expo.out" },
              "-=0.7"
            ).fromTo(
              section.querySelectorAll(".import-flow-node"),
              { scale: 0, rotation: -160 },
              { scale: 1, rotation: 0, duration: 0.46, stagger: 0.08, ease: "back.out(3)" },
              "-=0.74"
            );
          }

          if (kind === "travel") {
            tl.fromTo(
              section.querySelector(".travel-day-count"),
              { scale: 0.45, rotation: -12 },
              { scale: 1, rotation: 0, duration: 0.62, ease: "elastic.out(1, 0.55)" },
              "-=0.82"
            ).to(
              section.querySelectorAll(".day-context-card"),
              { x: (index) => [0, 18, -18][index % 3], duration: 0.32, yoyo: true, repeat: 1, stagger: 0.05, ease: "sine.inOut" },
              "-=0.4"
            );
          }

          if (kind === "trust") {
            tl.fromTo(
              section.querySelectorAll(".trust-point-card"),
              { rotationY: -18, transformPerspective: 900 },
              { rotationY: 0, duration: 0.62, stagger: 0.07, ease: "back.out(1.8)" },
              "-=0.62"
            );
          }

          ScrollTrigger.create({
            trigger: section,
            scroller: container,
            start: "top 78%",
            once: true,
            onEnter: () => tl.play(0),
          });
        });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => window.clearTimeout(refreshTimer);
    }, container);

    return () => ctx.revert();
  }, [containerRef, prefersReducedMotion]);
}

function LandingSection({ id, className, children, kind }: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  kind?: string;
}) {
  return (
    <section
      id={id}
      className={cn("onward-section gsap-section", className)}
      data-gsap-section
      data-gsap-kind={kind}
    >
      {children}
    </section>
  );
}

function LandingFooter({ id, className, children }: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <footer
      id={id}
      className={className}
      data-gsap-section
      data-gsap-kind="footer"
    >
      {children}
    </footer>
  );
}

function PresentationHome({ onOpenScreens }: { onOpenScreens: () => void }) {
  const sectionScrollRef = useSectionScroll();
  const prefersReducedMotion = usePrefersReducedMotion();
  useLandingGsap(sectionScrollRef, prefersReducedMotion);

  return (
    <main ref={sectionScrollRef} className="onward-landing text-[#080A0A]">
      <LandingSection kind="hero" className="hero-section relative grid content-center items-center justify-center gap-9 overflow-hidden bg-[#F9EFD1] px-5 py-7 sm:gap-10 sm:px-8 sm:py-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7 lg:px-10 xl:gap-8">
        <div
          className="hero-copy-block relative z-10 mx-auto w-full max-w-[540px] lg:max-w-[600px] lg:justify-self-end"
        >
          <div className="hero-brand-row">
            <p
              className="hero-brand-word text-[38px] leading-none lg:text-[48px]"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              Onward
            </p>
          </div>
          <h1 className="hero-headline max-w-[860px] font-black text-[#080A0A]">
            <span className="hero-headline-line">Every step of</span>
            <span className="hero-headline-line">the journey,</span>
            <span
              className="hero-script-highlight hero-headline-line"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              calmly organised.
            </span>
          </h1>
          <p className="hero-copy-text mt-6 max-w-[780px] font-normal text-[#68757B]">
            From the flight to the last cup of coffee, your plans, documents, and next moves stay clear and ready, wherever your Journey takes you.
          </p>
          <div className="hero-cta-row mt-11 flex flex-wrap gap-3">
            <a
              href="#timeline"
              className="hero-primary-cta flex items-center justify-center gap-3 rounded-full bg-[#080A0A] text-white transition-transform hover:-translate-y-0.5"
            >
              See the Journey
              <ArrowRight size={22} />
            </a>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[760px] lg:mx-0 lg:max-w-[820px] lg:justify-self-end">
          <JourneyArtwork />
        </div>
      </LandingSection>

      <LandingSection kind="feature-cloud" className="flex items-center justify-center bg-[#F9EFD1] px-5 py-10 sm:px-8 lg:px-12">
        <div className="feature-cloud-layout">
          <div
            className="feature-cloud-card feature-cloud-card-left"
          >
            <ActivityCardSlot index={15} className="activity-card-aside" />
          </div>
          <div
            className="feature-cloud-copy"
          >
            <h2
              className="landing-headline mx-auto max-w-[860px]"
            >
              <span className="landing-headline-line">Turn your travel chaos</span>
              <span className="landing-headline-line">
                into{" "}
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>
                  calm confidence.
                </span>
              </span>
            </h2>
            <div
              className="mx-auto mt-10 flex max-w-[900px] flex-wrap items-center justify-center gap-3"
            >
              {[
                { label: "Real-Time Updates", icon: <Clock size={14} />, color: "#F2977A" },
                { label: "Works Offline", icon: <Wifi size={14} />, color: "#F5D142" },
                { label: "Docs Saved Securely", icon: <FileText size={14} />, color: "#7FD8CB" },
                { label: "Auto-Imported From Email", icon: <MailCheck size={14} />, color: "#3FAE83" },
                { label: "Smart Reminders", icon: <Bell size={14} />, color: "#FF9F45" },
                { label: "Privacy First", icon: <ShieldCheck size={14} />, color: "#6B7A3A" },
                { label: "Live Location", icon: <MapPin size={14} />, color: "#6FA8F5" },
                { label: "Multi-City Ready", icon: <Route size={14} />, color: "#A7A0E8" },
                { label: "Share With Travellers", icon: <Users size={14} />, color: "#F2779E" },
                { label: "Itinerary Synced", icon: <CalendarClock size={14} />, color: "#E7A6E0" },
                { label: "Stays Tracked", icon: <Hotel size={14} />, color: "#D45BA0" },
                { label: "Every Transport Type", icon: <Train size={14} />, color: "#F2B27A" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="feature-badge flex items-center gap-2 rounded-full border-2 border-[#080A0A] px-4 py-2 text-[12px] font-black uppercase tracking-[0.04em] text-[#080A0A] shadow-[3px_3px_0_rgba(8,10,10,0.16)]"
                  style={{ background: badge.color }}
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div
            className="feature-cloud-card feature-cloud-card-right"
          >
            <ActivityCardSlot index={18} className="activity-card-aside" />
          </div>
        </div>
      </LandingSection>

      <LandingSection kind="concept" className="concept-section flex flex-col items-center justify-center gap-6 bg-[#F9EFD1] px-5 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10">
        <div className="concept-layout flex w-full flex-col gap-6 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div
            className="concept-copy mx-auto w-full max-w-[840px] lg:mx-0 lg:max-w-[840px] lg:shrink lg:basis-[840px]"
          >
            <p className="section-kicker mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#F17455]">Concept</p>
            <h2 className="landing-headline">
              <span className="landing-headline-line">A Journey is</span>
              <span className="landing-headline-line">
                the{" "}
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>home base.</span>
              </span>
            </h2>
            <p className="landing-copy mt-5 max-w-[780px] text-balance">
              Onward is organised around the thing travellers actually need: one place for plans, documents, reminders, people, and review.
            </p>
            <div className="mt-8 hidden lg:block">
              <ActivityCardCluster indices={[0, 7]} className="concept-card-cluster" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[580px] lg:mx-0 lg:max-w-[580px] lg:shrink lg:basis-[580px]">
            <JourneyContextRows />
          </div>
        </div>
      </LandingSection>

      <LandingSection id="timeline" kind="timeline" className="timeline-section flex flex-col items-center justify-center gap-6 bg-[#F9EFD1] px-5 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10">
        <div className="timeline-layout mx-auto flex w-full flex-col gap-6 sm:gap-10 lg:gap-16">
          <div className="timeline-copy mx-auto w-full max-w-[780px] lg:mx-0">
            <p className="section-kicker mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#080A0A]">Timeline</p>
            <h2 className="landing-headline">
              <span className="landing-headline-line">Know what</span>
              <span className="landing-headline-line">
                happens{" "}
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>next.</span>
              </span>
            </h2>
            <p className="landing-copy mt-5 max-w-[780px] text-balance">
              Flights, stays, trains, documents, and reminders sit in one ordered Journey Timeline.
            </p>
          </div>
          <div className="timeline-visual mx-auto w-full max-w-[860px] lg:mx-0">
            <MiniTimeline />
          </div>
        </div>
        <ActivityCardCluster indices={[1, 2, 3, 4]} className="timeline-card-row" routeLine />
      </LandingSection>

      <LandingSection kind="import" className="import-section flex flex-col items-center justify-center gap-6 bg-[#F9EFD1] px-5 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10">
        <div className="import-layout flex w-full flex-col gap-6 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="import-copy mx-auto w-full max-w-[840px] lg:mx-0 lg:shrink lg:basis-[840px]">
            <p className="section-kicker mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#F17455]">Import and review</p>
            <h2 className="landing-headline import-heading">
              <span className="landing-headline-line">No more digging</span>
              <span className="landing-headline-line">
                through{" "}
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>confirmations.</span>
              </span>
            </h2>
            <p className="landing-copy import-body mt-5 max-w-[780px]">
              Onward keeps the useful details, flags what needs review, and leaves the source material intact.
            </p>
            <div className="mt-8 hidden lg:block">
              <ActivityCardCluster indices={[1, 2]} className="import-text-cluster" />
            </div>
          </div>
          <div className="import-visual mx-auto w-full max-w-[660px] lg:mx-0 lg:shrink lg:basis-[660px]">
            <ImportFlowPanel />
          </div>
        </div>
      </LandingSection>

      <LandingSection kind="travel" className="travel-day-section flex flex-col items-center justify-center gap-6 bg-[#F9EFD1] px-5 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10">
        <div className="travel-day-layout">
          <div className="travel-day-copy">
            <p className="section-kicker mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#080A0A]">Travel day</p>
            <h2 className="landing-headline">
              <span className="landing-headline-line">Calm when the</span>
              <span className="landing-headline-line">
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>plan changes.</span>
              </span>
            </h2>
            <p className="landing-copy mt-5 max-w-[780px] text-balance">
              The app keeps live context close to the Journey: leave-by prompts, saved tickets, document access, and clear review states.
            </p>
            <div className="mt-8 hidden lg:block">
              <ActivityCardCluster indices={[11, 17]} className="travel-day-card-cluster" />
            </div>
          </div>
          <div className="travel-day-board-wrap">
            <TravelDayBoard />
          </div>
        </div>
      </LandingSection>

      <LandingSection kind="trust" className="trust-section flex flex-col items-center justify-center gap-6 bg-[#F9EFD1] px-5 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10">
        <div className="trust-layout">
          <div className="trust-copy">
            <p className="section-kicker mb-3 text-[13px] font-black uppercase tracking-[0.14em] text-[#080A0A]">Trust</p>
            <h2 className="landing-headline">
              <span className="landing-headline-line">Useful under pressure.</span>
              <span className="landing-headline-line">
                <span className="hero-script-highlight" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Plain about data.</span>
              </span>
            </h2>
            <p className="landing-copy mt-5 max-w-[780px] text-balance">
              Reservation help stays practical: clear permissions, attached documents, and shared context without murky data promises.
            </p>
            <div className="mt-8 hidden lg:block">
              <ActivityCardCluster indices={[7, 14]} className="trust-card-cluster" />
            </div>
          </div>
          <div className="trust-panel-wrap">
            <TrustPanel />
          </div>
        </div>
      </LandingSection>

      <LandingFooter id="contact" className="onward-footer border-t-2 border-[#080A0A] bg-[#080A0A] py-10 text-[#F8FAF8]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="footer-main">
            <div className="footer-brand">
              <p
                className="text-[38px] leading-none text-[#F6EDC9]"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
              >
                Onward
              </p>
              <p className="mt-4 max-w-[520px] text-[15px] font-bold leading-6 text-white/70">
                A Journey-first travel organiser for reservations, documents, reminders, reviews, and live travel context.
              </p>
            </div>

            <div className="footer-columns">
              <div>
                <h3>Product</h3>
                <a href="#timeline">Journey Timeline</a>
                <a href="#timeline">Travel day</a>
                <button type="button" onClick={onOpenScreens}>Screen library</button>
              </div>
              <div>
                <h3>Planning</h3>
                <span>Import review</span>
                <span>Offline documents</span>
                <span>Smart reminders</span>
              </div>
              <div>
                <h3>Trust</h3>
                <span>Clear permissions</span>
                <span>Shared context</span>
                <span>Privacy-first review</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p
              className="text-[24px] leading-none text-[#F6EDC9]"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              Every step, calmly organised.
            </p>
            {["Journey Timeline", "Import review", "Travel day", "Trust"].map((item, index) => (
              <span
                key={item}
                className="rounded-full border-2 border-[#080A0A] px-4 py-2 text-[12px] font-black text-[#080A0A]"
                style={{ background: APP_CARD_COLORS[index % APP_CARD_COLORS.length] }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </LandingFooter>
    </main>
  );
}

function PhoneFrame({ screen, isOnboarding, children, onTab, onNav }: {
  screen: Screen;
  isOnboarding: boolean;
  children: React.ReactNode;
  onTab: (tab: Tab) => void;
  onNav: (screen: Screen) => void;
}) {
  return (
    <div className="relative flex min-h-[884px] items-center justify-center px-4 py-5">
      <div
        className="relative flex flex-col overflow-hidden bg-background"
        style={{
          width: 390, height: 844, borderRadius: 52,
          boxShadow: "0 50px 100px rgba(0,0,0,0.32), 0 20px 40px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 0 2px rgba(0,0,0,0.12)",
          fontFamily: "'Figtree', sans-serif",
        }}
      >
        <div className="absolute left-1/2 top-0 z-50 bg-black" style={{ transform: "translateX(-50%)", width: 120, height: 34, borderRadius: "0 0 22px 22px" }} />
        <StatusBar />
        <div className="relative flex-1 overflow-hidden">{children}</div>
        {!isOnboarding && <TabBar active={TAB_FOR_SCREEN[screen]} onTab={onTab} />}
      </div>

      {isOnboarding && (
        <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-3 rounded-full bg-black/60 px-4 py-2 backdrop-blur lg:hidden" style={{ fontFamily: "'Figtree', sans-serif" }}>
          {(["welcome", "scan-results"] as Screen[]).map((quickScreen) => (
            <button key={quickScreen} onClick={() => onNav(quickScreen)} className="text-[11px] text-white/70 hover:text-white">
              {quickScreen === "welcome" ? "Welcome" : "Results"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const SCREENS_PASSWORD = "12345678";

function ScreensPasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === SCREENS_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#EEF3F1] px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[360px] rounded-[28px] border border-[#DDE4E3] bg-white p-8 shadow-sm"
      >
        <p className="text-[13px] font-bold text-[#68757B]">Screen library</p>
        <h1
          className="mt-1 text-[26px] leading-tight text-[#153E4A]"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          This section is password protected.
        </h1>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Password"
          className="mt-6 w-full rounded-lg border border-[#DDE4E3] px-4 py-3 text-[15px] font-medium text-[#153E4A] outline-none focus:border-[#153E4A]"
        />
        {error && (
          <p className="mt-2 text-[13px] font-bold text-[#C0392B]">Incorrect password. Try again.</p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-[#153E4A] py-3 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}

function ScreensPage({ screen, activeGroup, onGroupChange, onNav, isOnboarding, children, onTab }: {
  screen: Screen;
  activeGroup: ScreenGroupId;
  onGroupChange: (group: ScreenGroupId) => void;
  onNav: (screen: Screen) => void;
  isOnboarding: boolean;
  children: React.ReactNode;
  onTab: (tab: Tab) => void;
}) {
  const visibleSections = getSidebarSections(activeGroup);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#EEF3F1]">
      <section className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#DDE4E3] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[13px] font-bold text-[#68757B]">Screen library</p>
              <h1
                className="mt-1 text-[34px] leading-tight text-[#153E4A]"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
              >
                Explore every Onward concept screen.
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {SCREEN_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => onGroupChange(group.id)}
                  className={cn(
                    "h-10 rounded-md px-4 text-[13px] font-bold transition-colors",
                    activeGroup === group.id ? "bg-[#153E4A] text-white" : "bg-[#F5F7F6] text-[#68757B] hover:bg-[#EEEAE1] hover:text-[#153E4A]"
                  )}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid min-h-[884px] gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden rounded-lg border border-[#DDE4E3] bg-white p-4 shadow-sm lg:block">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-bold text-[#153E4A]">Catalogue</p>
                <p className="text-[12px] font-semibold text-[#68757B]">{visibleSections.length} groups</p>
              </div>
              <span className="rounded-md bg-[#EEEAE1] px-2 py-1 text-[12px] font-bold text-[#153E4A]">{SCREEN_COUNT}</span>
            </div>
            <div className="flex max-h-[780px] flex-col gap-1 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
              {visibleSections.map((section) => (
                <div key={section.title} className="pt-2">
                  <p className="mb-1 px-2 text-[10px] font-bold uppercase text-[#68757B]">{section.title}</p>
                  {section.items.map((item) => (
                    <button
                      key={item.screen}
                      type="button"
                      onClick={() => onNav(item.screen)}
                      className={cn(
                        "mb-1 block w-full rounded-md px-2 py-2 text-left text-[12px] font-semibold transition-colors",
                        screen === item.screen ? "bg-[#153E4A] text-white" : "text-[#172126]/75 hover:bg-[#F5F7F6] hover:text-[#153E4A]"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          <div className="overflow-x-auto rounded-lg border border-[#DDE4E3] bg-[#F5F7F6] shadow-sm">
            <PhoneFrame screen={screen} isOnboarding={isOnboarding} onTab={onTab} onNav={onNav}>
              {children}
            </PhoneFrame>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [surface, setSurface] = useState<Surface>("home");
  const [screensUnlocked, setScreensUnlocked] = useState(false);
  const [activeScreenGroup, setActiveScreenGroup] = useState<ScreenGroupId>("all");
  const [screen, setScreen] = useState<Screen>("launch");
  const [journeyFormMode, setJourneyFormMode] = useState<"add" | "edit">("add");

  const isOnboarding = [
    "launch", "welcome", "how-it-works", "import-reservations",
    "connect-gmail-primer", "gmail-connected", "choose-scan-range",
    "scan-progress", "scan-results",
  ].includes(screen);

  function nav(s: Screen) { setScreen(s); }

  function handleSurfaceChange(nextSurface: Surface) {
    setSurface(nextSurface);
  }

  function handleScreenGroupChange(group: ScreenGroupId) {
    setActiveScreenGroup(group);
    if (group !== "all" && !isScreenInGroup(screen, group)) {
      const firstScreen = getSidebarSections(group)[0]?.items[0]?.screen;
      if (firstScreen) nav(firstScreen);
    }
  }

  function handleTab(t: Tab) {
    if (t === "timeline") nav("journey-timeline");
    else if (t === "journeys") nav("journeys-home");
    else if (t === "imports") nav("imports-home");
    else if (t === "settings") nav("settings");
  }

  function renderScreen() {
    switch (screen) {
      case "launch":              return <LaunchScreen onDone={() => nav("welcome")} />;
      case "notification-primer": return <NotificationPermissionPrimerScreen onEnable={() => nav("journeys-home")} onSkip={() => nav("journeys-home")} />;
      case "welcome":             return <WelcomeScreen onNext={() => nav("import-reservations")} onHowItWorks={() => nav("how-it-works")} />;
      case "how-it-works":        return <HowItWorksScreen onContinue={() => nav("import-reservations")} onBack={() => nav("welcome")} />;
      case "import-reservations": return <ImportReservationsScreen onNext={() => nav("connect-gmail-primer")} onSkip={() => nav("journeys-home")} />;
      case "connect-gmail-primer":return <ConnectGmailPrimerScreen onConnect={() => nav("gmail-connected")} onCancel={() => nav("import-reservations")} />;
      case "gmail-connected":     return <GmailConnectedScreen onScan={() => nav("choose-scan-range")} onSkip={() => nav("journeys-home")} />;
      case "choose-scan-range":   return <ChooseScanRangeScreen onScan={() => nav("scan-progress")} onBack={() => nav("gmail-connected")} />;
      case "scan-progress":       return <ScanProgressScreen onDone={() => nav("scan-results")} />;
      case "scan-results":        return <ScanResultsScreen onViewJourneys={() => nav("journeys-home")} onReviewImports={() => nav("review-imports")} />;
      case "reauth-required":     return <ReauthRequiredScreen onReconnect={() => nav("connect-gmail-primer")} onDisconnect={() => nav("settings")} onDismiss={() => nav("imports-home")} />;
      case "journeys-home":       return <JourneysHomeScreen onJourney={() => nav("journey-details")} onSearch={() => nav("journey-search")} onAdd={() => { setJourneyFormMode("add"); nav("journey-form"); }} />;
      case "journey-details":     return <JourneyDetailsScreen onBack={() => nav("journeys-home")} onTimeline={() => nav("journey-timeline")} onEdit={() => { setJourneyFormMode("edit"); nav("journey-form"); }} onAddPlan={() => nav("add-plan-type")} onDelete={() => nav("delete-journey-confirm")} />;
      case "journey-form":        return <JourneyFormScreen mode={journeyFormMode} onSave={() => nav(journeyFormMode === "edit" ? "journey-details" : "journeys-home")} onCancel={() => nav(journeyFormMode === "edit" ? "journey-details" : "journeys-home")} />;
      case "delete-journey-confirm": return <DeleteJourneyConfirmScreen onDelete={() => nav("journeys-home")} onCancel={() => nav("journey-details")} />;
      case "add-plan-type":       return <AddPlanTypeScreen onBack={() => nav("journey-timeline")} />;
      case "journey-search":      return <JourneySearchScreen onBack={() => nav("journeys-home")} />;
      case "journey-timeline":    return <JourneyTimelineScreen onNowNext={() => nav("now-and-next")} onReservation={() => nav("reservation-details")} onDetails={() => nav("journey-details")} onMap={() => nav("journey-map")} onDocuments={() => nav("journey-documents")} />;
      case "now-and-next":        return <NowAndNextScreen onReservation={() => nav("reservation-details")} onBack={() => nav("journey-timeline")} />;
      case "reservation-details": return <ReservationDetailsScreen onBack={() => nav("journey-timeline")} onEdit={() => nav("add-edit-reservation")} onMove={() => nav("move-reservation")} onDelete={() => nav("delete-reservation-confirm")} onHistory={() => nav("reservation-change-history")} />;
      case "add-edit-reservation": return <AddEditReservationScreen mode="add" onSave={() => nav("journey-timeline")} onCancel={() => nav("journey-timeline")} />;
      case "move-reservation":    return <MoveReservationScreen onBack={() => nav("reservation-details")} />;
      case "delete-reservation-confirm": return <DeleteReservationConfirmScreen onDelete={() => nav("journey-timeline")} onCancel={() => nav("reservation-details")} />;
      case "reservation-change-history": return <ReservationChangeHistoryScreen onBack={() => nav("reservation-details")} />;
      case "imports-home":        return <ImportsHomeScreen onReviewList={() => nav("review-imports")} onUnsupported={() => nav("unsupported-import")} onFailed={() => nav("failed-import")} onDuplicate={() => nav("duplicate-review")} onForward={() => nav("forward-confirmation")} />;
      case "review-imports":      return <ReviewImportListScreen onItem={() => nav("review-import-details")} onBack={() => nav("imports-home")} onEditAccept={() => nav("edit-accept-import")} onDuplicate={() => nav("duplicate-review")} />;
      case "review-import-details": return <ReviewImportDetailsScreen onBack={() => nav("review-imports")} />;
      case "edit-accept-import":  return <EditAcceptImportScreen onSave={() => nav("imports-home")} onBack={() => nav("review-imports")} />;
      case "assign-import-journey": return <AssignImportJourneyScreen onAssign={() => nav("imports-home")} onBack={() => nav("review-import-details")} onCreateJourney={() => nav("create-journey-from-import")} />;
      case "create-journey-from-import": return <CreateJourneyFromImportScreen onSave={() => nav("journeys-home")} onBack={() => nav("assign-import-journey")} />;
      case "duplicate-review":    return <DuplicateReviewScreen onBack={() => nav("review-imports")} />;
      case "unsupported-import":  return <UnsupportedImportScreen onBack={() => nav("imports-home")} onAddManually={() => nav("journey-form")} />;
      case "failed-import":       return <FailedImportScreen onBack={() => nav("imports-home")} onAddManually={() => nav("journey-form")} />;
      case "connected-inboxes":   return <ConnectedInboxesScreen onBack={() => nav("settings")} onInbox={() => nav("inbox-details")} onConnect={() => nav("connect-gmail-primer")} onConnectMicrosoft={() => nav("connect-microsoft")} onForward={() => nav("forward-confirmation")} />;
      case "inbox-details":       return <InboxDetailsScreen onBack={() => nav("connected-inboxes")} onDisconnect={() => nav("disconnect-gmail-confirm")} />;
      case "disconnect-gmail-confirm": return <DisconnectGmailConfirmScreen onDisconnect={() => nav("connected-inboxes")} onCancel={() => nav("inbox-details")} />;
      case "email-privacy":       return <EmailPrivacyScreen onBack={() => nav("settings")} />;
      case "manage-imported-data":return <ManageImportedDataScreen onBack={() => nav("settings")} />;
      case "no-journeys":         return <NoJourneysScreen onConnect={() => nav("connect-gmail-primer")} onAdd={() => { setJourneyFormMode("add"); nav("journey-form"); }} />;
      case "no-active-journey":   return <NoActiveJourneyScreen onJourneys={() => nav("journeys-home")} onAdd={() => { setJourneyFormMode("add"); nav("journey-form"); }} />;
      case "empty-timeline":      return <EmptyTimelineScreen onAdd={() => nav("add-plan-type")} onScan={() => nav("scan-progress")} />;
      case "no-imports":          return <NoImportsScreen onScan={() => nav("choose-scan-range")} onConnect={() => nav("connect-gmail-primer")} />;
      case "no-review-items":     return <NoReviewItemsScreen onJourneys={() => nav("journeys-home")} />;
      case "offline":             return <OfflineScreen onRetry={() => nav("journey-timeline")} />;
      case "scan-error":          return <ScanErrorScreen onRetry={() => nav("scan-progress")} onReconnect={() => nav("connect-gmail-primer")} onDismiss={() => nav("imports-home")} />;
      case "general-error":       return <GeneralErrorScreen onRetry={() => nav("journey-timeline")} onBack={() => nav("journeys-home")} />;
      case "service-unavailable": return <ServiceUnavailableScreen onRetry={() => nav("journey-timeline")} onContinueOffline={() => nav("offline")} />;
      case "sync-conflict":       return <SyncConflictScreen onBack={() => nav("journey-timeline")} />;
      case "account-screen":      return <AccountScreen onBack={() => nav("settings")} onSignOut={() => nav("sign-out-confirm")} onDelete={() => nav("delete-account")} />;
      case "notification-settings": return <NotificationSettingsScreen onBack={() => nav("settings")} />;
      case "preferences":         return <PreferencesScreen onBack={() => nav("settings")} />;
      case "help-support":        return <HelpSupportScreen onBack={() => nav("settings")} onContact={() => nav("contact-support")} />;
      case "contact-support":     return <ContactSupportScreen onBack={() => nav("help-support")} />;
      case "about-onward":        return <AboutOnwardScreen onBack={() => nav("settings")} />;
      case "sign-out-confirm":    return <SignOutConfirmScreen onSignOut={() => nav("welcome")} onCancel={() => nav("account-screen")} />;
      case "delete-account":      return <DeleteAccountScreen onBack={() => nav("account-screen")} onConfirm={() => nav("deletion-progress")} />;
      case "deletion-progress":   return <DeletionProgressScreen onDone={() => nav("welcome")} />;
      case "settings":            return <SettingsScreen onNav={nav} />;
      // Phase 2
      case "connect-microsoft":   return <ConnectMicrosoftScreen onConnect={() => nav("microsoft-connected")} onCancel={() => nav("connected-inboxes")} />;
      case "microsoft-connected": return <MicrosoftConnectedScreen onScan={() => nav("scan-progress")} onSkip={() => nav("journeys-home")} />;
      case "forward-confirmation":return <ForwardConfirmationScreen onBack={() => nav("imports-home")} />;
      case "forwarded-email-received": return <ForwardedEmailReceivedScreen onBack={() => nav("imports-home")} />;
      case "journey-map":         return <JourneyMapScreen onBack={() => nav("journey-details")} onPin={() => nav("map-location-detail")} onList={() => nav("journey-locations-list")} onTimeline={() => nav("journey-timeline")} onDocuments={() => nav("journey-documents")} />;
      case "map-location-detail": return <MapLocationDetailScreen onBack={() => nav("journey-map")} />;
      case "journey-locations-list": return <JourneyLocationsListScreen onBack={() => nav("journey-map")} onItem={() => nav("map-location-detail")} />;
      case "missing-location":    return <MissingLocationScreen onBack={() => nav("journey-map")} />;
      case "journey-documents":   return <JourneyDocumentsScreen onBack={() => nav("journey-details")} onDoc={() => nav("document-detail")} onAdd={() => nav("add-document")} onTimeline={() => nav("journey-timeline")} onMap={() => nav("journey-map")} />;
      case "add-document":        return <AddDocumentScreen onBack={() => nav("journey-documents")} onSave={() => nav("journey-documents")} />;
      case "document-detail":     return <DocumentDetailScreen onBack={() => nav("journey-documents")} />;
      case "attach-document":     return <AttachDocumentScreen onBack={() => nav("document-detail")} />;
      case "document-privacy":    return <DocumentPrivacyScreen onBack={() => nav("journey-documents")} />;
      case "journey-readiness":   return <JourneyReadinessScreen onBack={() => nav("journey-details")} onConflict={() => nav("conflict-details")} />;
      case "conflict-details":    return <ConflictDetailsScreen onBack={() => nav("journey-readiness")} />;
      case "booking-change-review": return <BookingChangeReviewScreen onBack={() => nav("imports-home")} />;
      case "review-suggested-merge": return <ReviewSuggestedMergeScreen onBack={() => nav("journeys-home")} onMerge={() => nav("merge-journeys")} />;
      case "merge-journeys":      return <MergeJourneysScreen onBack={() => nav("review-suggested-merge")} onMerge={() => nav("journey-timeline")} />;
      case "split-journey":       return <SplitJourneyScreen onBack={() => nav("journey-details")} />;
      case "move-multiple-reservations": return <MoveMulipleReservationsScreen onBack={() => nav("journey-timeline")} />;
      case "share-journey":       return <ShareJourneyScreen onBack={() => nav("journey-details")} onPreview={() => nav("shared-journey-preview")} onLink={() => nav("shared-link-settings")} />;
      case "shared-link-settings":return <SharedLinkSettingsScreen onBack={() => nav("share-journey")} />;
      case "shared-journey-preview": return <SharedJourneyPreviewScreen onBack={() => nav("share-journey")} />;
      case "calendar-export":     return <CalendarExportScreen onBack={() => nav("journey-details")} />;
      case "calendar-sync-settings": return <CalendarSyncSettingsScreen onBack={() => nav("settings")} />;
      case "journey-notification-settings": return <JourneyNotificationSettingsScreen onBack={() => nav("journey-details")} />;
      case "travellers":          return <TravellersScreen onBack={() => nav("journey-details")} onAdd={() => nav("add-edit-traveller")} onTraveller={() => nav("add-edit-traveller")} onAssign={() => nav("assign-reservations-traveller")} />;
      case "add-edit-traveller":  return <AddEditTravellerScreen onBack={() => nav("travellers")} onSave={() => nav("travellers")} />;
      case "assign-reservations-traveller": return <AssignReservationsTravellerScreen onBack={() => nav("travellers")} onSave={() => nav("travellers")} />;
      case "share-to-onward":     return <ShareToOnwardScreen onBack={() => nav("imports-home")} onSave={() => nav("journey-documents")} onJourneyPicker={() => nav("share-extension-journey-picker")} />;
      case "share-extension-journey-picker": return <ShareExtensionJourneyPickerScreen onBack={() => nav("share-to-onward")} onSelect={() => nav("share-to-onward")} />;
      case "offline-journey-settings": return <OfflineJourneySettingsScreen onBack={() => nav("journey-details")} />;
      case "offline-downloads":   return <OfflineDownloadsScreen onBack={() => nav("settings")} />;
      case "pending-sync-details":return <PendingSyncDetailsScreen onBack={() => nav("journey-details")} />;
      case "map-empty":           return <MapEmptyScreen onAdd={() => nav("missing-location")} onTimeline={() => nav("journey-timeline")} />;
      case "map-offline":         return <MapOfflineScreen onDownload={() => nav("offline-journey-settings")} onList={() => nav("journey-locations-list")} />;
      case "documents-empty":     return <DocumentsEmptyScreen onAdd={() => nav("add-document")} />;
      case "document-locked":     return <DocumentLockedScreen onUnlock={() => nav("document-detail")} onCancel={() => nav("journey-documents")} />;
      case "readiness-complete":  return <ReadinessCompleteScreen onView={() => nav("journey-timeline")} onOptional={() => nav("journey-readiness")} />;
      case "no-conflicts":        return <NoConflictsScreen onBack={() => nav("journey-readiness")} />;
      case "no-shared-links":     return <NoSharedLinksScreen onShare={() => nav("share-journey")} />;
      case "microsoft-reauth":    return <MicrosoftReauthScreen onReconnect={() => nav("connect-microsoft")} onDisconnect={() => nav("connected-inboxes")} onDismiss={() => nav("imports-home")} />;
      case "forwarding-address-error": return <ForwardingAddressErrorScreen onRetry={() => nav("forward-confirmation")} onInbox={() => nav("connect-microsoft")} onSupport={() => nav("contact-support")} />;
      case "offline-download-error": return <OfflineDownloadErrorScreen onRetry={() => nav("offline-journey-settings")} onStorage={() => nav("offline-downloads")} />;
      // Phase 3
      case "live-journey-home":     return <LiveJourneyHomeScreen onBack={() => nav("journey-timeline")} onStatus={() => nav("live-status-centre")} onAlert={() => nav("travel-alert-inbox")} onDisruption={() => nav("disruption-alert")} onBoardingPass={() => nav("boarding-pass-view")} onMap={() => nav("live-journey-map")} onNowNext={() => nav("leave-by-planner")} />;
      case "live-status-centre":    return <LiveStatusCentreScreen onBack={() => nav("live-journey-home")} onItem={() => nav("flight-live-status")} />;
      case "flight-live-status":    return <FlightLiveStatusScreen onBack={() => nav("live-status-centre")} onBoardingPass={() => nav("boarding-pass-view")} onConnection={() => nav("connection-risk")} onDisruption={() => nav("disruption-alert")} />;
      case "ground-transport-live": return <GroundTransportLiveStatusScreen onBack={() => nav("live-status-centre")} onTicket={() => nav("ticket-view")} />;
      case "disruption-alert":      return <DisruptionAlertScreen onBack={() => nav("travel-alert-inbox")} onAlternatives={() => nav("alternative-options")} onConnection={() => nav("connection-risk")} />;
      case "cancellation-detail":   return <CancellationDetailScreen onBack={() => nav("travel-alert-inbox")} onAlternatives={() => nav("alternative-options")} />;
      case "delay-impact":          return <DelayImpactSummaryScreen onBack={() => nav("flight-live-status")} onConnection={() => nav("connection-risk")} onAlternatives={() => nav("alternative-options")} />;
      case "connection-risk":       return <ConnectionRiskScreen onBack={() => nav("delay-impact")} onRoute={() => nav("connection-route")} onAlternatives={() => nav("alternative-options")} />;
      case "connection-route":      return <ConnectionRouteScreen onBack={() => nav("connection-risk")} />;
      case "alternative-options":   return <AlternativeOptionsScreen onBack={() => nav("disruption-alert")} onReplace={() => nav("replace-reservation")} />;
      case "replace-reservation":   return <ReplaceReservationScreen onBack={() => nav("alternative-options")} onConfirm={() => nav("journey-timeline")} />;
      case "leave-by-planner":      return <LeaveByPlannerScreen onBack={() => nav("live-journey-home")} onDirections={() => nav("directions-handoff")} onReminder={() => nav("live-journey-home")} />;
      case "leave-by-settings":     return <LeaveBySettingsScreen onBack={() => nav("settings")} />;
      case "live-journey-map":      return <LiveJourneyMapScreen onBack={() => nav("journey-timeline")} onPin={() => nav("directions-handoff")} />;
      case "directions-handoff":    return <DirectionsHandoffScreen onBack={() => nav("leave-by-planner")} />;
      case "airport-mode":          return <AirportModeScreen onBack={() => nav("live-journey-home")} onBoardingPass={() => nav("boarding-pass-view")} onMap={() => nav("airport-station-map")} onConnection={() => nav("connection-route")} />;
      case "station-mode":          return <StationModeScreen onBack={() => nav("live-journey-home")} onTicket={() => nav("ticket-view")} />;
      case "boarding-pass-view":    return <BoardingPassViewScreen onBack={() => nav("airport-mode")} />;
      case "ticket-view":           return <TicketViewScreen onBack={() => nav("station-mode")} />;
      case "airport-station-map":   return <AirportStationMapScreen onBack={() => nav("airport-mode")} />;
      case "baggage-summary":       return <BaggageSummaryScreen onBack={() => nav("airport-mode")} onBagDetail={() => nav("baggage-detail")} />;
      case "baggage-detail":        return <BaggageDetailScreen onBack={() => nav("baggage-summary")} onReport={() => nav("report-baggage-issue")} />;
      case "report-baggage-issue":  return <ReportBaggageIssueScreen onBack={() => nav("baggage-detail")} />;
      case "journey-members":       return <JourneyMembersScreen onBack={() => nav("journey-details")} onInvite={() => nav("invite-to-journey")} onMember={() => nav("member-permissions")} />;
      case "invite-to-journey":     return <InviteToJourneyScreen onBack={() => nav("journey-members")} onSend={() => nav("pending-invitation")} />;
      case "invitation-received":   return <InvitationReceivedScreen onAccept={() => nav("journey-timeline")} onDecline={() => nav("journeys-home")} />;
      case "member-permissions":    return <MemberPermissionsScreen onBack={() => nav("journey-members")} onSave={() => nav("journey-members")} />;
      case "journey-activity":      return <JourneyActivityScreen onBack={() => nav("journey-details")} onItem={() => nav("activity-detail")} />;
      case "activity-detail":       return <ActivityDetailScreen onBack={() => nav("journey-activity")} />;
      case "reservation-comments":  return <ReservationCommentsScreen onBack={() => nav("reservation-details")} />;
      case "journey-discussion":    return <JourneyDiscussionScreen onBack={() => nav("journey-details")} />;
      case "change-approval":       return <ChangeApprovalScreen onBack={() => nav("journey-activity")} onApprove={() => nav("journey-activity")} onReject={() => nav("journey-activity")} />;
      case "collab-notification-settings": return <CollaborationNotificationSettingsScreen onBack={() => nav("journey-details")} />;
      case "traveller-locations":   return <TravellerLocationsScreen onBack={() => nav("live-journey-map")} onShareLocation={() => nav("share-my-location")} onPrivacy={() => nav("location-sharing-privacy")} />;
      case "share-my-location":     return <ShareMyLocationScreen onBack={() => nav("traveller-locations")} onStart={() => nav("traveller-locations")} />;
      case "location-sharing-privacy": return <LocationSharingPrivacyScreen onBack={() => nav("traveller-locations")} onStop={() => nav("location-sharing-ended")} />;
      case "travel-alert-inbox":    return <TravelAlertInboxScreen onBack={() => nav("live-journey-home")} onAlert={() => nav("critical-travel-alert")} />;
      case "travel-alert-preferences": return <TravelAlertPreferencesScreen onBack={() => nav("settings")} />;
      case "critical-travel-alert": return <CriticalTravelAlertScreen onBack={() => nav("travel-alert-inbox")} onAlternatives={() => nav("alternative-options")} onConnection={() => nav("connection-risk")} />;
      case "live-data-settings":    return <LiveDataSettingsScreen onBack={() => nav("settings")} onSource={() => nav("live-data-source")} />;
      case "live-data-source":      return <LiveDataSourceScreen onBack={() => nav("live-data-settings")} />;
      case "unsupported-live-data": return <UnsupportedLiveDataScreen onBack={() => nav("reservation-details")} />;
      case "live-data-unavailable": return <LiveDataUnavailableScreen onRetry={() => nav("flight-live-status")} onBack={() => nav("journey-timeline")} />;
      case "status-out-of-date":    return <StatusOutOfDateScreen onRefresh={() => nav("flight-live-status")} onBack={() => nav("flight-live-status")} />;
      case "no-disruptions":        return <NoDisruptionsScreen onBack={() => nav("journey-timeline")} />;
      case "no-journey-members":    return <NoJourneyMembersScreen onInvite={() => nav("invite-to-journey")} onBack={() => nav("journey-details")} />;
      case "pending-invitation":    return <PendingJourneyInvitationScreen onResend={() => nav("pending-invitation")} onCancel={() => nav("journey-members")} />;
      case "collaboration-offline": return <CollaborationOfflineScreen onRetry={() => nav("journey-discussion")} onBack={() => nav("journey-details")} />;
      case "location-permission-required": return <LocationPermissionRequiredScreen onSettings={() => nav("settings")} onSkip={() => nav("live-journey-map")} />;
      case "location-sharing-ended": return <LocationSharingEndedScreen onRestart={() => nav("share-my-location")} onBack={() => nav("journey-details")} />;
      // Phase 4 — AI Planning
      case "assistant-home":           return <AssistantHomeScreen onNav={nav} />;
      case "journey-assistant":        return <JourneyAssistantScreen onBack={() => nav("assistant-home")} onContext={() => nav("assistant-context")} onSources={() => nav("assistant-sources")} onAction={() => nav("confirm-assistant-action")} />;
      case "general-assistant":        return <GeneralAssistantScreen onBack={() => nav("assistant-home")} onNav={nav} />;
      case "assistant-context":        return <AssistantContextScreen onBack={() => nav("journey-assistant")} />;
      case "assistant-sources":        return <AssistantSourcesScreen onBack={() => nav("journey-assistant")} />;
      case "voice-assistant":          return <VoiceAssistantScreen onBack={() => nav("assistant-home")} />;
      case "conversation-history":     return <ConversationHistoryScreen onBack={() => nav("assistant-home")} onConversation={() => nav("journey-assistant")} />;
      case "assistant-feedback":       return <AssistantFeedbackScreen onBack={() => nav("journey-assistant")} onSubmit={() => nav("journey-assistant")} />;
      case "plan-new-journey":         return <PlanNewJourneyScreen onBack={() => nav("assistant-home")} onNext={() => nav("planning-preferences")} />;
      case "planning-preferences":     return <PlanningPreferencesScreen onBack={() => nav("plan-new-journey")} onNext={() => nav("journey-budget")} />;
      case "journey-budget":           return <JourneyBudgetScreen onBack={() => nav("planning-preferences")} onNext={() => nav("traveller-selection-ai")} />;
      case "traveller-selection-ai":   return <TravellerSelectionAIScreen onBack={() => nav("journey-budget")} onNext={() => nav("planning-constraints")} />;
      case "planning-constraints":     return <PlanningConstraintsScreen onBack={() => nav("traveller-selection-ai")} onNext={() => nav("generating-journey-plan")} />;
      case "generating-journey-plan":  return <GeneratingJourneyPlanScreen onDone={() => nav("generated-journey-overview")} />;
      case "generated-journey-overview": return <GeneratedJourneyOverviewScreen onBack={() => nav("generating-journey-plan")} onDay={() => nav("generated-day-plan")} onSave={() => nav("save-generated-journey")} />;
      case "generated-day-plan":       return <GeneratedDayPlanScreen onBack={() => nav("generated-journey-overview")} onAccept={() => nav("generated-journey-overview")} />;
      case "compare-generated-plans":  return <CompareGeneratedPlansScreen onBack={() => nav("generated-journey-overview")} onSelect={() => nav("save-generated-journey")} />;
      case "review-suggested-additions": return <ReviewSuggestedAdditionsScreen onBack={() => nav("generated-day-plan")} />;
      case "save-generated-journey":   return <SaveGeneratedJourneyScreen onBack={() => nav("generated-journey-overview")} onSave={() => nav("journeys-home")} />;
      case "journey-plan-history":     return <JourneyPlanHistoryScreen onBack={() => nav("journey-details")} />;
      case "optimise-this-day":        return <OptimiseThisDayScreen onBack={() => nav("journey-timeline")} onGenerate={() => nav("optimised-day-preview")} />;
      case "optimised-day-preview":    return <OptimisedDayPreviewScreen onBack={() => nav("optimise-this-day")} onApply={() => nav("confirm-assistant-action")} onConfirm={() => nav("journey-timeline")} />;
      case "move-flexible-plans":      return <MoveFlexiblePlansScreen onBack={() => nav("optimise-this-day")} />;
      case "fill-free-time":           return <FillFreeTimeScreen onBack={() => nav("journey-timeline")} onSuggestion={() => nav("free-time-suggestion")} />;
      case "free-time-suggestion":     return <FreeTimeSuggestionScreen onBack={() => nav("fill-free-time")} onAdd={() => nav("journey-timeline")} />;
      case "replan-remaining-day":     return <ReplanRemainingDayScreen onBack={() => nav("disruption-alert")} onGenerate={() => nav("replanned-day-preview")} />;
      case "replanned-day-preview":    return <ReplannedDayPreviewScreen onBack={() => nav("replan-remaining-day")} onApply={() => nav("confirm-assistant-action")} />;
      case "journey-wide-optimisation": return <JourneyWideOptimisationScreen onBack={() => nav("journey-details")} onDay={() => nav("optimise-this-day")} />;
      case "explore-destination":      return <ExploreDestinationScreen onBack={() => nav("assistant-home")} onPlace={() => nav("place-detail")} onGuide={() => nav("destination-guide")} />;
      case "destination-guide":        return <DestinationGuideScreen onBack={() => nav("explore-destination")} />;
      case "recommendation-feed":      return <RecommendationFeedScreen onBack={() => nav("explore-destination")} onPlace={() => nav("place-detail")} />;
      case "discovery-map":            return <DiscoveryMapScreen onBack={() => nav("explore-destination")} onPin={() => nav("place-detail")} />;
      case "place-detail":             return <PlaceDetailScreen onBack={() => nav("explore-destination")} onAdd={() => nav("add-place-to-journey")} />;
      case "add-place-to-journey":     return <AddPlaceToJourneyScreen onBack={() => nav("place-detail")} onAdd={() => nav("journey-timeline")} />;
      case "saved-places":             return <SavedPlacesScreen onBack={() => nav("assistant-home")} onPlace={() => nav("place-detail")} />;
      case "recommendation-preferences": return <RecommendationPreferencesScreen onBack={() => nav("settings")} />;
      case "journey-insights":         return <JourneyInsightsScreen onBack={() => nav("journey-details")} onItem={() => nav("journey-gap-detail")} />;
      case "journey-gap-detail":       return <JourneyGapDetailScreen onBack={() => nav("journey-insights")} onFill={() => nav("fill-free-time")} />;
      case "overloaded-day-insight":   return <OverloadedDayInsightScreen onBack={() => nav("journey-insights")} onOptimise={() => nav("optimise-this-day")} />;
      case "weather-suggestion":       return <WeatherSuggestionScreen onBack={() => nav("journey-insights")} />;
      case "local-event-suggestion":   return <LocalEventSuggestionScreen onBack={() => nav("journey-insights")} onAdd={() => nav("journey-timeline")} />;
      case "missing-essential":        return <MissingEssentialScreen onBack={() => nav("journey-insights")} />;
      case "todays-brief":             return <TodaysJourneyBriefScreen onBack={() => nav("journey-timeline")} onNav={nav} />;
      case "tomorrows-preview":        return <TomorrowsPreviewScreen onBack={() => nav("todays-brief")} />;
      case "journey-summary-ai":       return <JourneySummaryAIScreen onBack={() => nav("assistant-home")} onNav={nav} />;
      case "audio-briefing-player":    return <AudioBriefingPlayerScreen onBack={() => nav("todays-brief")} />;
      case "briefing-settings":        return <BriefingSettingsScreen onBack={() => nav("settings")} />;
      case "travel-preferences":       return <TravelPreferencesScreen onBack={() => nav("settings")} />;
      case "food-preferences":         return <FoodPreferencesScreen onBack={() => nav("settings")} />;
      case "accessibility-preferences": return <AccessibilityPreferencesScreen onBack={() => nav("settings")} />;
      case "budget-preferences":       return <BudgetPreferencesScreen onBack={() => nav("settings")} />;
      case "traveller-preference-detail": return <TravellerPreferenceDetailScreen onBack={() => nav("travellers")} />;
      case "personalisation-summary":  return <PersonalisationSummaryScreen onBack={() => nav("settings")} />;
      case "smart-packing-list":       return <SmartPackingListScreen onBack={() => nav("journey-details")} onItem={() => nav("packing-item-detail")} />;
      case "packing-suggestion-detail": return <PackingSuggestionDetailScreen onBack={() => nav("smart-packing-list")} onAdd={() => nav("smart-packing-list")} />;
      case "packing-item-detail":      return <PackingItemDetailScreen onBack={() => nav("smart-packing-list")} />;
      case "preparation-assistant":    return <PreparationAssistantScreen onBack={() => nav("journey-details")} onNav={nav} />;
      case "preparation-checklist":    return <PreparationChecklistScreen onBack={() => nav("preparation-assistant")} />;
      case "phrasebook":               return <PhrasebookScreen onBack={() => nav("assistant-home")} onPhrase={() => nav("translate-phrase")} />;
      case "translate-phrase":         return <TranslatePhraseScreen onBack={() => nav("phrasebook")} onFullscreen={() => nav("fullscreen-translation")} />;
      case "fullscreen-translation":   return <FullscreenTranslationScreen onBack={() => nav("translate-phrase")} />;
      case "local-essentials":         return <LocalEssentialsScreen onBack={() => nav("assistant-home")} />;
      case "assistant-settings":       return <AssistantSettingsScreen onBack={() => nav("settings")} onData={() => nav("assistant-data-controls")} onMemory={() => nav("manage-assistant-memory")} />;
      case "assistant-data-controls":  return <AssistantDataControlsScreen onBack={() => nav("assistant-settings")} />;
      case "manage-assistant-memory":  return <ManageAssistantMemoryScreen onBack={() => nav("assistant-data-controls")} />;
      case "clear-conversation-confirm": return <ClearConversationConfirmScreen onClear={() => nav("assistant-home")} onCancel={() => nav("journey-assistant")} />;
      case "uncertain-answer":         return <UncertainAnswerScreen onBack={() => nav("journey-assistant")} />;
      case "conflicting-information":  return <ConflictingInformationScreen onBack={() => nav("journey-assistant")} />;
      case "assistant-offline":        return <AssistantOfflineScreen onBack={() => nav("assistant-home")} onNav={nav} />;
      case "confirm-assistant-action": return <ConfirmAssistantActionScreen onBack={() => nav("optimised-day-preview")} onConfirm={() => nav("journey-timeline")} />;
      case "assistant-first-use":      return <AssistantFirstUseScreen onStart={() => nav("assistant-home")} onPrivacy={() => nav("assistant-settings")} />;
      case "no-journey-context":       return <NoJourneyContextScreen onSelect={() => nav("journeys-home")} onGeneral={() => nav("general-assistant")} onCreate={() => nav("plan-new-journey")} />;
      case "generating-response":      return <GeneratingResponseScreen onCancel={() => nav("journey-assistant")} />;
      case "plan-generation-failed":   return <PlanGenerationFailedScreen onRetry={() => nav("generating-journey-plan")} onAdjust={() => nav("planning-preferences")} />;
      case "no-recommendations":       return <NoRecommendationsScreen onExpand={() => nav("fill-free-time")} onPreferences={() => nav("recommendation-preferences")} onKeepFree={() => nav("journey-timeline")} />;
      case "source-unavailable":       return <SourceUnavailableScreen onRetry={() => nav("place-detail")} onProvider={() => nav("place-detail")} />;
      case "outdated-recommendation":  return <OutdatedRecommendationScreen onRefresh={() => nav("place-detail")} onBack={() => nav("place-detail")} />;
      case "personalisation-disabled": return <PersonalisationDisabledScreen onEnable={() => nav("assistant-settings")} onContinue={() => nav("recommendation-feed")} />;
      case "packing-list-complete":    return <PackingListCompleteScreen onView={() => nav("smart-packing-list")} onAdd={() => nav("smart-packing-list")} />;
      case "preparation-complete":     return <PreparationCompleteScreen onJourney={() => nav("journey-timeline")} onSuggestions={() => nav("journey-insights")} />;
      // Phase 5 — Travel Wallet
      case "wallet-home":            return <WalletHomeScreen onBack={() => nav("settings")} onNav={nav} />;
      case "payment-methods":        return <PaymentMethodsScreen onBack={() => nav("wallet-home")} onAdd={() => nav("add-payment-method")} />;
      case "add-payment-method":     return <AddPaymentMethodScreen onBack={() => nav("payment-methods")} onSave={() => nav("payment-methods")} />;
      case "travel-passes-credits":  return <TravelPassesCreditsScreen onBack={() => nav("wallet-home")} onItem={() => nav("travel-credit-detail")} />;
      case "travel-credit-detail":   return <TravelCreditDetailScreen onBack={() => nav("travel-passes-credits")} />;
      case "refund-tracker":         return <RefundTrackerScreen onBack={() => nav("wallet-home")} onItem={() => nav("refund-detail")} onAdd={() => nav("add-refund")} />;
      case "refund-detail":          return <RefundDetailScreen onBack={() => nav("refund-tracker")} />;
      case "add-refund":             return <AddRefundScreen onBack={() => nav("refund-tracker")} onSave={() => nav("refund-tracker")} />;
      // Phase 5 — Journey Expenses
      case "journey-expenses":       return <JourneyExpensesScreen onBack={() => nav("journey-details")} onAdd={() => nav("add-expense")} onNav={nav} />;
      case "add-expense":            return <AddExpenseScreen onBack={() => nav("journey-expenses")} onSave={() => nav("journey-expenses")} />;
      case "expense-detail":         return <ExpenseDetailScreen onBack={() => nav("journey-expenses")} onEdit={() => nav("edit-expense")} onNav={nav} />;
      case "edit-expense":           return <EditExpenseScreen onBack={() => nav("expense-detail")} onSave={() => nav("expense-detail")} />;
      case "receipt-scanner":        return <ReceiptScannerScreen onBack={() => nav("journey-expenses")} onCapture={() => nav("receipt-review")} />;
      case "receipt-review":         return <ReceiptReviewScreen onBack={() => nav("receipt-scanner")} onSave={() => nav("journey-expenses")} onNav={nav} />;
      case "expense-categories":     return <ExpenseCategoriesScreen onBack={() => nav("expense-settings")} />;
      case "journey-budget-expenses":return <JourneyBudgetExpensesScreen onBack={() => nav("journey-expenses")} onEdit={() => nav("edit-journey-budget")} />;
      case "edit-journey-budget":    return <EditJourneyBudgetScreen onBack={() => nav("journey-budget-expenses")} onSave={() => nav("journey-budget-expenses")} />;
      case "budget-category-detail": return <BudgetCategoryDetailScreen onBack={() => nav("journey-budget-expenses")} />;
      case "currency-conversion":    return <CurrencyConversionScreen onBack={() => nav("journey-expenses")} />;
      case "exchange-rate-settings": return <ExchangeRateSettingsScreen onBack={() => nav("settings")} />;
      // Phase 5 — Group Expenses
      case "group-expense-summary":  return <GroupExpenseSummaryScreen onBack={() => nav("journey-expenses")} onMember={() => nav("member-balance-detail")} onSettle={() => nav("settle-up")} onNav={nav} />;
      case "split-expense":          return <SplitExpenseScreen onBack={() => nav("expense-detail")} onSave={() => nav("expense-detail")} />;
      case "member-balance-detail":  return <MemberBalanceDetailScreen onBack={() => nav("group-expense-summary")} onSettle={() => nav("settle-up")} />;
      case "settle-up":              return <SettleUpScreen onBack={() => nav("member-balance-detail")} onConfirm={() => nav("settlement-confirmation")} />;
      case "settlement-confirmation":return <SettlementConfirmationScreen onDone={() => nav("group-expense-summary")} />;
      case "payment-reminder":       return <PaymentReminderScreen onBack={() => nav("member-balance-detail")} onSend={() => nav("member-balance-detail")} />;
      case "settlement-history":     return <SettlementHistoryScreen onBack={() => nav("group-expense-summary")} onItem={() => nav("settlement-confirmation")} />;
      case "split-dispute":          return <SplitDisputeScreen onBack={() => nav("expense-detail")} />;
      // Phase 5 — Loyalty
      case "loyalty-wallet":         return <LoyaltyWalletScreen onBack={() => nav("settings")} onProgramme={() => nav("loyalty-programme-detail")} onAdd={() => nav("add-loyalty-programme")} />;
      case "add-loyalty-programme":  return <AddLoyaltyProgrammeScreen onBack={() => nav("loyalty-wallet")} onSave={() => nav("loyalty-wallet")} />;
      case "loyalty-programme-detail":return <LoyaltyProgrammeDetailScreen onBack={() => nav("loyalty-wallet")} />;
      case "loyalty-match-suggestion":return <LoyaltyMatchSuggestionScreen onBack={() => nav("journey-details")} />;
      case "points-status-progress": return <PointsStatusProgressScreen onBack={() => nav("loyalty-programme-detail")} />;
      case "expiring-points-alert":  return <ExpiringPointsAlertScreen onBack={() => nav("loyalty-wallet")} />;
      // Phase 5 — Booking
      case "booking-hub":            return <BookingHubScreen onBack={() => nav("journey-details")} onNav={nav} />;
      case "search-flights":         return <SearchFlightsScreen onBack={() => nav("booking-hub")} onSearch={() => nav("flight-search-results")} />;
      case "flight-search-results":  return <FlightSearchResultsScreen onBack={() => nav("search-flights")} onFlight={() => nav("flight-option-detail")} onNav={nav} />;
      case "flight-option-detail":   return <FlightOptionDetailScreen onBack={() => nav("flight-search-results")} onHandoff={() => nav("booking-handoff-confirm")} onNav={nav} />;
      case "compare-flight-options": return <CompareFlightOptionsScreen onBack={() => nav("flight-search-results")} onSelect={() => nav("flight-option-detail")} />;
      case "search-stays":           return <SearchStaysScreen onBack={() => nav("booking-hub")} onSearch={() => nav("stay-search-results")} />;
      case "stay-search-results":    return <StaySearchResultsScreen onBack={() => nav("search-stays")} onStay={() => nav("stay-option-detail")} onNav={nav} />;
      case "stay-option-detail":     return <StayOptionDetailScreen onBack={() => nav("stay-search-results")} onHandoff={() => nav("booking-handoff-confirm")} />;
      case "activity-booking-options":return <ActivityBookingOptionsScreen onBack={() => nav("booking-hub")} onHandoff={() => nav("booking-handoff-confirm")} />;
      case "booking-handoff-confirm":return <BookingHandoffConfirmScreen onBack={() => nav("flight-option-detail")} onContinue={() => nav("booking-return-import")} />;
      case "booking-return-import":  return <BookingReturnImportScreen onBack={() => nav("booking-hub")} onNav={nav} />;
      case "saved-booking-options":  return <SavedBookingOptionsScreen onBack={() => nav("booking-hub")} onItem={() => nav("flight-option-detail")} />;
      // Phase 5 — Travel Services
      case "travel-insurance":       return <TravelInsuranceScreen onBack={() => nav("journey-details")} onNav={nav} />;
      case "insurance-policy-detail":return <InsurancePolicyDetailScreen onBack={() => nav("travel-insurance")} onOpen={() => nav("booking-handoff-confirm")} />;
      case "insurance-comparison":   return <InsuranceComparisonScreen onBack={() => nav("travel-insurance")} onSelect={() => nav("booking-handoff-confirm")} />;
      case "insurance-claim-tracker":return <InsuranceClaimTrackerScreen onBack={() => nav("insurance-policy-detail")} />;
      case "esim-connectivity":      return <EsimConnectivityScreen onBack={() => nav("booking-hub")} onItem={() => nav("esim-detail")} />;
      case "esim-detail":            return <EsimDetailScreen onBack={() => nav("esim-connectivity")} onContinue={() => nav("booking-handoff-confirm")} />;
      case "airport-transfer-options":return <AirportTransferOptionsScreen onBack={() => nav("booking-hub")} />;
      // Phase 5 — Post-Journey
      case "journey-recap":          return <JourneyRecapScreen onBack={() => nav("journeys-home")} onNav={nav} />;
      case "journey-spending-summary":return <JourneySpendingSummaryScreen onBack={() => nav("journey-recap")} onExport={() => nav("export-journey-data")} />;
      case "journey-archive":        return <JourneyArchiveScreen onBack={() => nav("journeys-home")} onJourney={() => nav("journey-recap")} />;
      case "journey-reflection":     return <JourneyReflectionScreen onBack={() => nav("journey-recap")} onSave={() => nav("journey-recap")} />;
      case "provider-review-prompt": return <ProviderReviewPromptScreen onBack={() => nav("journey-recap")} />;
      case "save-journey-template":  return <SaveJourneyTemplateScreen onBack={() => nav("journey-recap")} onSave={() => nav("journey-templates")} />;
      case "journey-templates":      return <JourneyTemplatesScreen onBack={() => nav("journeys-home")} onTemplate={() => nav("plan-new-journey")} />;
      // Phase 5 — Reports & Exports
      case "expense-report-builder": return <ExpenseReportBuilderScreen onBack={() => nav("journey-expenses")} onPreview={() => nav("expense-report-preview")} />;
      case "expense-report-preview": return <ExpenseReportPreviewScreen onBack={() => nav("expense-report-builder")} onExport={() => nav("export-journey-data")} />;
      case "receipt-library":        return <ReceiptLibraryScreen onBack={() => nav("settings")} onReceipt={() => nav("receipt-detail")} />;
      case "receipt-detail":         return <ReceiptDetailScreen onBack={() => nav("receipt-library")} />;
      case "export-journey-data":    return <ExportJourneyDataScreen onBack={() => nav("journey-recap")} />;
      // Phase 5 — Settings
      case "wallet-payment-settings":return <WalletPaymentSettingsScreen onBack={() => nav("settings")} />;
      case "expense-settings":       return <ExpenseSettingsScreen onBack={() => nav("settings")} />;
      case "loyalty-settings":       return <LoyaltySettingsScreen onBack={() => nav("settings")} />;
      case "booking-preferences":    return <BookingPreferencesScreen onBack={() => nav("settings")} />;
      case "commercial-transparency":return <CommercialTransparencyScreen onBack={() => nav("settings")} />;
      // Phase 5 — States
      case "no-expenses":            return <NoExpensesScreen onAdd={() => nav("add-expense")} onScan={() => nav("receipt-scanner")} />;
      case "budget-exceeded":        return <BudgetExceededScreen onAdjust={() => nav("edit-journey-budget")} onReview={() => nav("journey-expenses")} onDismiss={() => nav("journey-expenses")} />;
      case "unsettled-balances":     return <UnsettledBalancesScreen onSettle={() => nav("settle-up")} onRemind={() => nav("payment-reminder")} />;
      case "exchange-rate-unavailable":return <ExchangeRateUnavailableScreen onRetry={() => nav("currency-conversion")} onManual={() => nav("currency-conversion")} onContinue={() => nav("journey-expenses")} />;
      case "refund-overdue":         return <RefundOverdueScreen onContact={() => nav("refund-detail")} onUpdate={() => nav("refund-detail")} onResolve={() => nav("refund-tracker")} />;
      case "payment-failed":         return <PaymentFailedScreen onRetry={() => nav("settle-up")} onChange={() => nav("payment-methods")} onCancel={() => nav("group-expense-summary")} />;
      case "booking-price-changed":  return <BookingPriceChangedScreen onContinue={() => nav("booking-handoff-confirm")} onSearch={() => nav("flight-search-results")} />;
      case "booking-handoff-failed": return <BookingHandoffFailedScreen onRetry={() => nav("booking-handoff-confirm")} onCopy={() => nav("flight-option-detail")} onBack={() => nav("flight-search-results")} />;
      case "loyalty-balance-unavailable":return <LoyaltyBalanceUnavailableScreen onOpen={() => nav("loyalty-programme-detail")} onRefresh={() => nav("loyalty-programme-detail")} onManual={() => nav("loyalty-programme-detail")} />;
      case "expense-sync-conflict":  return <ExpenseSyncConflictScreen onLocal={() => nav("expense-detail")} onShared={() => nav("expense-detail")} onMerge={() => nav("edit-expense")} />;
      case "wallet-locked":          return <WalletLockedScreen onUnlock={() => nav("wallet-home")} onCancel={() => nav("settings")} />;
      case "receipt-unreadable":     return <ReceiptUnreadableScreen onManual={() => nav("add-expense")} onRetake={() => nav("receipt-scanner")} onImport={() => nav("receipt-scanner")} onSaveOnly={() => nav("receipt-library")} />;
      case "split-not-balanced":     return <SplitNotBalancedScreen onFix={() => nav("split-expense")} onCancel={() => nav("expense-detail")} />;
      case "sponsored-disclosure":   return <SponsoredDisclosureScreen onContinue={() => nav("flight-option-detail")} onHide={() => nav("flight-search-results")} onTransparency={() => nav("commercial-transparency")} />;
      default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <AppNav surface={surface} onSurfaceChange={handleSurfaceChange} />

      {surface === "home" ? (
        <PresentationHome onOpenScreens={() => setSurface("screens")} />
      ) : !screensUnlocked ? (
        <ScreensPasswordGate onUnlock={() => setScreensUnlocked(true)} />
      ) : (
        <ScreensPage
          screen={screen}
          activeGroup={activeScreenGroup}
          onGroupChange={handleScreenGroupChange}
          onNav={nav}
          isOnboarding={isOnboarding}
          onTab={handleTab}
        >
          {renderScreen()}
        </ScreensPage>
      )}
    </div>
  );
}
