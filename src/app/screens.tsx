import { useState, useEffect, useRef } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  Calendar, ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Bell, User, ArrowRight, Shield,
  RefreshCw, MoreHorizontal, Navigation, Globe, Copy,
  Trash2, X, Check, Info, Download, LogOut, HelpCircle,
  Sun, Inbox, Package, Settings, Wifi, ChevronDown,
  Pencil, FileText, Car, Star, Ticket, ScanLine, Tag,
  Lock, Database, Eye, ExternalLink, Send, ArrowLeftRight,
  Map, Users, Link, Share2, FolderOpen, ListChecks,
  GitMerge, Scissors, UserPlus, CloudOff, HardDrive,
  QrCode, FilePlus, Layers, CalendarCheck,
  AlignLeft, ImageIcon, ScanText, Smartphone,
  ChevronUp, Radio, Phone, Filter,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Screen =
  | "welcome"
  | "how-it-works"
  | "import-reservations"
  | "connect-gmail-primer"
  | "gmail-connected"
  | "choose-scan-range"
  | "scan-progress"
  | "scan-results"
  | "reauth-required"
  | "journeys-home"
  | "journey-timeline"
  | "now-and-next"
  | "reservation-details"
  | "imports-home"
  | "review-imports"
  | "review-import-details"
  | "journey-details"
  | "journey-form"
  | "delete-journey-confirm"
  | "add-plan-type"
  | "journey-search"
  | "edit-accept-import"
  | "assign-import-journey"
  | "create-journey-from-import"
  | "duplicate-review"
  | "unsupported-import"
  | "failed-import"
  | "connected-inboxes"
  | "inbox-details"
  | "disconnect-gmail-confirm"
  | "email-privacy"
  | "manage-imported-data"
  | "no-journeys"
  | "no-active-journey"
  | "empty-timeline"
  | "no-imports"
  | "no-review-items"
  | "offline"
  | "scan-error"
  | "general-error"
  | "service-unavailable"
  | "sync-conflict"
  | "account-screen"
  | "notification-settings"
  | "preferences"
  | "help-support"
  | "contact-support"
  | "about-onward"
  | "sign-out-confirm"
  | "delete-account"
  | "deletion-progress"
  | "connect-microsoft"
  | "microsoft-connected"
  | "forward-confirmation"
  | "forwarded-email-received"
  | "journey-map"
  | "map-location-detail"
  | "journey-locations-list"
  | "missing-location"
  | "journey-documents"
  | "add-document"
  | "document-detail"
  | "attach-document"
  | "document-privacy"
  | "journey-readiness"
  | "conflict-details"
  | "booking-change-review"
  | "review-suggested-merge"
  | "merge-journeys"
  | "split-journey"
  | "move-multiple-reservations"
  | "share-journey"
  | "shared-link-settings"
  | "shared-journey-preview"
  | "calendar-export"
  | "calendar-sync-settings"
  | "journey-notification-settings"
  | "travellers"
  | "add-edit-traveller"
  | "assign-reservations-traveller"
  | "share-to-onward"
  | "share-extension-journey-picker"
  | "offline-journey-settings"
  | "offline-downloads"
  | "pending-sync-details"
  | "map-empty"
  | "map-offline"
  | "documents-empty"
  | "document-locked"
  | "readiness-complete"
  | "no-conflicts"
  | "no-shared-links"
  | "microsoft-reauth"
  | "forwarding-address-error"
  | "offline-download-error"
  | "launch"
  | "add-edit-reservation"
  | "move-reservation"
  | "delete-reservation-confirm"
  | "reservation-change-history"
  | "notification-primer"
  | "live-journey-home"
  | "live-status-centre"
  | "flight-live-status"
  | "ground-transport-live"
  | "disruption-alert"
  | "cancellation-detail"
  | "delay-impact"
  | "connection-risk"
  | "connection-route"
  | "alternative-options"
  | "replace-reservation"
  | "leave-by-planner"
  | "leave-by-settings"
  | "live-journey-map"
  | "directions-handoff"
  | "airport-mode"
  | "station-mode"
  | "boarding-pass-view"
  | "ticket-view"
  | "airport-station-map"
  | "baggage-summary"
  | "baggage-detail"
  | "report-baggage-issue"
  | "journey-members"
  | "invite-to-journey"
  | "invitation-received"
  | "member-permissions"
  | "journey-activity"
  | "activity-detail"
  | "reservation-comments"
  | "journey-discussion"
  | "change-approval"
  | "collab-notification-settings"
  | "traveller-locations"
  | "share-my-location"
  | "location-sharing-privacy"
  | "travel-alert-inbox"
  | "travel-alert-preferences"
  | "critical-travel-alert"
  | "live-data-settings"
  | "live-data-source"
  | "unsupported-live-data"
  | "live-data-unavailable"
  | "status-out-of-date"
  | "no-disruptions"
  | "no-journey-members"
  | "pending-invitation"
  | "collaboration-offline"
  | "location-permission-required"
  | "location-sharing-ended"
  | "settings";

export type Tab = "timeline" | "journeys" | "imports" | "settings";

// ─── Utilities ────────────────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Scroll({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("h-full overflow-y-auto", className)} style={{ scrollbarWidth: "none" }}>
      {children}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active:    { label: "Active",    cls: "bg-emerald-50 text-emerald-700" },
    upcoming:  { label: "Upcoming",  cls: "bg-sky-50 text-sky-700" },
    past:      { label: "Past",      cls: "bg-muted text-muted-foreground" },
    review:    { label: "Review",    cls: "bg-amber-50 text-amber-700" },
    imported:  { label: "Imported",  cls: "bg-emerald-50 text-emerald-700" },
    duplicate: { label: "Duplicate", cls: "bg-purple-50 text-purple-700" },
  };
  const s = map[status] ?? map.past;
  return (
    <span className={cn("text-[10px] font-bold px-2 py-[3px] rounded-full tracking-wide uppercase", s.cls)}>
      {s.label}
    </span>
  );
}

export function BackBtn({ label = "Back", onPress }: { label?: string; onPress: () => void }) {
  return (
    <button onClick={onPress} className="text-[#E07B5A] text-[14px] font-semibold flex items-center gap-0.5">
      <ChevronDown size={18} className="rotate-90" />
      {label}
    </button>
  );
}

export function JourneyNavBar({ active, onTimeline, onMap, onDocuments }: {
  active: "timeline" | "map" | "documents";
  onTimeline: () => void;
  onMap: () => void;
  onDocuments: () => void;
}) {
  const tabs = [
    { id: "timeline", label: "Timeline", icon: <Clock size={14} /> },
    { id: "map",      label: "Map",      icon: <Map size={14} /> },
    { id: "documents",label: "Documents",icon: <FolderOpen size={14} /> },
  ] as const;
  return (
    <div className="flex items-center gap-1 bg-muted rounded-2xl p-1 mx-5 mb-3">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={t.id === "timeline" ? onTimeline : t.id === "map" ? onMap : onDocuments}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 h-8 rounded-xl text-[12px] font-semibold transition-all",
            active === t.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
          )}
        >
          {t.icon}{t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────
export function WelcomeScreen({ onNext, onHowItWorks }: { onNext: () => void; onHowItWorks: () => void }) {
  return (
    <div
      className="flex flex-col h-full px-7"
      style={{ fontFamily: "'Figtree', sans-serif", background: "#F8F5F0" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-[72px] h-[72px] rounded-[22px] bg-[#1C2B3A] flex items-center justify-center mb-6 shadow-lg">
          <Plane size={30} className="text-white" style={{ transform: "rotate(-15deg)" }} />
        </div>
        <h1
          className="text-[40px] leading-none tracking-tight text-foreground mb-2"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Onward
        </h1>
        <p className="text-[15px] text-muted-foreground font-medium mb-6">Your journeys, organised.</p>
        <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[270px]">
          Connect your Gmail and Onward automatically finds and organises your travel reservations into Journeys.
        </p>
      </div>

      <div className="pb-10 space-y-3">
        <button
          onClick={onNext}
          className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          <Mail size={16} />
          Continue with Apple
        </button>
        <div className="flex items-center justify-center">
          <button
            onClick={onHowItWorks}
            className="text-[13px] text-muted-foreground underline underline-offset-2 font-medium"
          >
            How Onward works
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 pt-1">
          <button className="text-[11px] text-muted-foreground">Privacy Policy</button>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <button className="text-[11px] text-muted-foreground">Terms</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Import Reservations ─────────────────────────────────────────────

export function ImportReservationsScreen({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="mb-7">
          <h2 className="text-[26px] font-bold tracking-tight leading-tight">Import your reservations</h2>
          <p className="text-muted-foreground text-[14px] mt-2 leading-relaxed">
            Onward scans your Gmail for travel confirmations and builds your itinerary automatically.
          </p>
        </div>

        {/* Gmail card */}
        <div className="bg-card rounded-3xl p-5 border border-border mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-[15px]">Connect Gmail</p>
              <p className="text-muted-foreground text-[12px]">Read-only access · Automatic import</p>
            </div>
          </div>

          <div className="space-y-2.5 mb-5">
            {[
              { icon: <Check size={12} />, text: "Read travel confirmation emails", positive: true },
              { icon: <Check size={12} />, text: "Extract reservation details automatically", positive: true },
              { icon: <X size={12} />, text: "Never send emails on your behalf", positive: false },
              { icon: <X size={12} />, text: "Never store raw email content", positive: false },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0",
                    row.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                  )}
                >
                  {row.icon}
                </div>
                <span className="text-[13px] text-foreground">{row.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onNext}
            className="w-full h-[50px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          >
            <Mail size={16} />
            Connect Gmail
          </button>
        </div>

        <div className="text-center mb-5">
          <button onClick={onSkip} className="text-[13px] text-muted-foreground font-medium">
            Continue without connecting
          </button>
        </div>

        <div className="flex items-start gap-3 bg-[#EDE9E3] rounded-2xl p-4">
          <Shield size={15} className="text-[#1C2B3A] mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Onward only reads emails to extract reservation details. We never modify, send, or share your email.{" "}
            <span className="text-[#E07B5A] font-medium">Email privacy details →</span>
          </p>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Scan Progress ────────────────────────────────────────────────────

export function ScanProgressScreen({ onDone }: { onDone: () => void }) {
  const [tick, setTick] = useState(0);
  const [candidates, setCandidates] = useState(312);
  const [imported, setImported] = useState(0);
  const [review, setReview] = useState(0);
  const done = useRef(false);

  const stages = [
    "Connecting to Gmail…",
    "Searching for travel emails…",
    "Analysing reservations…",
    "Creating Journeys…",
    "Finishing up…",
  ];
  const stage = Math.min(Math.floor(tick / 4), stages.length - 1);
  const progress = Math.min(tick / 20, 1);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 350);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (tick < 12) setCandidates((c) => c + Math.floor(Math.random() * 6 + 2));
    if (tick > 5 && tick < 19) setImported((c) => Math.min(c + (Math.random() > 0.4 ? 1 : 0), 14));
    if (tick > 8 && tick < 16) setReview((c) => Math.min(c + (Math.random() > 0.7 ? 1 : 0), 3));
    if (tick >= 22 && !done.current) {
      done.current = true;
      onDone();
    }
  }, [tick, onDone]);

  return (
    <div
      className="flex flex-col h-full items-center justify-center px-7 text-center"
      style={{ fontFamily: "'Figtree', sans-serif", background: "#F8F5F0" }}
    >
      <div className="w-20 h-20 rounded-full bg-[#1C2B3A] flex items-center justify-center mb-7">
        <RefreshCw size={28} className="text-white" style={{ animation: "spin 2s linear infinite" }} />
      </div>

      <h2 className="text-[22px] font-bold mb-1">{stages[stage]}</h2>
      <p className="text-muted-foreground text-[13px] mb-8">Scanning the last 90 days</p>

      <div className="w-full bg-card rounded-3xl border border-border p-5 shadow-sm space-y-4 mb-8">
        {[
          { label: "Emails scanned", value: candidates },
          { label: "Reservations found", value: imported },
          { label: "Needs review", value: review },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">{item.label}</span>
            <span className="text-[16px] font-bold tabular-nums">{item.value}</span>
          </div>
        ))}
        <div className="w-full h-[5px] bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E07B5A] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <button className="text-[13px] text-muted-foreground font-medium">Continue in background</button>
    </div>
  );
}

// ─── Screen: Scan Results ─────────────────────────────────────────────────────

export function ScanResultsScreen({ onViewJourneys, onReviewImports }: { onViewJourneys: () => void; onReviewImports: () => void }) {
  return (
    <div
      className="flex flex-col h-full px-5 pt-6 pb-10"
      style={{ fontFamily: "'Figtree', sans-serif", background: "#F8F5F0" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-[64px] h-[64px] rounded-full bg-emerald-50 flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-[26px] font-bold mb-1">Import complete</h2>
        <p className="text-muted-foreground text-[14px] mb-8">Here's what Onward found in your inbox.</p>

        <div className="w-full bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          {[
            { label: "Reservations imported", value: "14", color: "text-emerald-600" },
            { label: "Journeys created", value: "3", color: "" },
            { label: "Added to existing Journeys", value: "4", color: "" },
            { label: "Needs review", value: "3", color: "text-amber-600" },
            { label: "Duplicates skipped", value: "2", color: "text-muted-foreground" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}
            >
              <span className="text-[14px] text-muted-foreground">{row.label}</span>
              <span className={cn("text-[17px] font-bold", row.color || "text-foreground")}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          onClick={onViewJourneys}
          className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] active:opacity-90"
        >
          View Journeys
        </button>
        <button
          onClick={onReviewImports}
          className="w-full h-[52px] border-2 border-border rounded-2xl font-semibold text-[15px] text-foreground active:opacity-70"
        >
          Review Imports
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Journeys Home ────────────────────────────────────────────────────

export const JOURNEYS = [
  { name: "Lisbon & Porto", destination: "Portugal", dates: "27 Jun – 5 Jul 2026", status: "active", count: 7, group: "Current" },
  { name: "Copenhagen", destination: "Denmark", dates: "18 – 22 Aug 2026", status: "upcoming", count: 4, group: "Upcoming" },
  { name: "Tokyo & Kyoto", destination: "Japan", dates: "12 – 26 Nov 2026", status: "upcoming", count: 11, group: "Upcoming", needsReview: 2 },
  { name: "New York", destination: "United States", dates: "3 – 8 Mar 2026", status: "past", count: 6, group: "Past" },
  { name: "Barcelona", destination: "Spain", dates: "14 – 18 Jan 2026", status: "past", count: 5, group: "Past" },
];

export function JourneysHomeScreen({ onJourney, onSearch, onAdd }: { onJourney: () => void; onSearch: () => void; onAdd: () => void }) {
  const groups = ["Current", "Upcoming", "Past"];
  const statusLine: Record<string, string> = {
    active: "bg-emerald-400",
    upcoming: "bg-sky-400",
    past: "bg-muted-foreground/30",
  };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          <h1 className="text-[26px] font-bold tracking-tight">Journeys</h1>
          <div className="flex items-center gap-3">
            <button onClick={onSearch} className="text-muted-foreground"><Search size={20} strokeWidth={2} /></button>
            <button onClick={onAdd} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center shadow-sm">
              <Plus size={16} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Review banner */}
        <div className="mx-5 mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer active:opacity-80">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-amber-800">3 imports need review</p>
            <p className="text-[11px] text-amber-600 mt-0.5">Some reservations need your attention</p>
          </div>
          <ChevronRight size={16} className="text-amber-500 flex-shrink-0" />
        </div>

        {groups.map((group) => {
          const items = JOURNEYS.filter((j) => j.group === group);
          if (!items.length) return null;
          return (
            <div key={group} className="mb-5">
              <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                {group}
              </p>
              <div className="px-5 space-y-3">
                {items.map((j, i) => (
                  <div
                    key={i}
                    onClick={onJourney}
                    className="bg-card rounded-3xl border border-border cursor-pointer active:opacity-80 overflow-hidden relative"
                  >
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", statusLine[j.status])} />
                    <div className="pl-5 pr-4 py-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-[16px] leading-tight">{j.name}</p>
                          <p className="text-muted-foreground text-[13px] mt-0.5">{j.destination}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                          <StatusPill status={j.status} />
                          {j.needsReview && (
                            <StatusPill status="review" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[12px]">
                          <Calendar size={11} />
                          <span>{j.dates}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[12px]">
                          <Package size={11} />
                          <span>{j.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Scroll>
  );
}

// ─── Screen: Journey Timeline ─────────────────────────────────────────────────

export const DAYS = [
  { d: "27", label: "Fri", dot: true },
  { d: "28", label: "Sat", dot: true },
  { d: "29", label: "Sun", dot: true },
  { d: "30", label: "Mon", dot: true, today: true },
  { d: "1",  label: "Tue", dot: true },
  { d: "2",  label: "Wed", dot: false },
  { d: "3",  label: "Thu", dot: true },
  { d: "4",  label: "Fri", dot: true },
  { d: "5",  label: "Sat", dot: true },
];

export const TIMELINE_ITEMS = [
  {
    time: "09:00", end: "12:00",
    type: "hotel", title: "Hotel Vista do Tejo", sub: "Check-out today",
    icon: <Hotel size={15} />, active: true,
  },
  {
    time: "15:30", end: "17:45",
    type: "train", title: "Alfa Pendular AP 122", sub: "Lisboa Oriente → Porto Campanhã",
    icon: <Train size={15} />,
  },
  {
    time: "20:00", end: "22:00",
    type: "restaurant", title: "Taberna da Rua das Flores", sub: "Dinner · Party of 2",
    icon: <UtensilsCrossed size={15} />,
  },
];

export function JourneyTimelineScreen({
  onNowNext, onReservation, onDetails, onMap, onDocuments,
}: {
  onNowNext: () => void;
  onReservation: () => void;
  onDetails: () => void;
  onMap?: () => void;
  onDocuments?: () => void;
}) {
  const [selDay, setSelDay] = useState(3);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {/* Fixed top */}
      <div className="flex-shrink-0 bg-background">
        {/* Journey header */}
        <div className="px-5 pt-2 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Journey</p>
              <h1 className="text-[22px] font-bold tracking-tight leading-snug">Lisbon & Porto</h1>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="active" />
              <button onClick={onDetails} className="text-muted-foreground active:opacity-60">
                <Info size={18} />
              </button>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground mt-0.5 mb-2">27 Jun – 5 Jul · Day 4 of 9</p>
          <JourneyNavBar active="timeline" onTimeline={() => {}} onMap={onMap ?? (() => {})} onDocuments={onDocuments ?? (() => {})} />
        </div>

        {/* Now/Next teaser */}
        <div
          onClick={onNowNext}
          className="mx-5 mb-3 bg-[#1C2B3A] rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-90"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "pulse 2s infinite" }} />
          <div className="flex-1 min-w-0">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Now</p>
            <p className="text-white text-[14px] font-semibold truncate">Hotel Vista do Tejo · Check-out 12:00</p>
          </div>
          <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
        </div>

        {/* Day strip */}
        <div
          className="flex gap-1 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {DAYS.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelDay(i)}
              className={cn(
                "flex flex-col items-center min-w-[42px] py-2 rounded-2xl transition-all flex-shrink-0",
                selDay === i ? "bg-[#1C2B3A] text-white" : "text-muted-foreground"
              )}
            >
              <span className="text-[10px] font-semibold">{day.label}</span>
              <span className="text-[16px] font-bold leading-tight">{day.d}</span>
              {day.dot && selDay !== i && (
                <div className={cn("w-1 h-1 rounded-full mt-1", day.today ? "bg-[#E07B5A]" : "bg-muted-foreground/30")} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable timeline */}
      <div className="flex-1 overflow-y-auto relative" style={{ scrollbarWidth: "none" }}>
        <div className="px-5 pt-2 pb-4 relative">
          {/* Rail */}
          <div className="absolute left-[68px] top-6 bottom-6 w-[1px] bg-border" />

          {TIMELINE_ITEMS.map((item, i) => (
            <div key={i} onClick={onReservation} className="flex gap-3 mb-4 cursor-pointer group">
              <div className="w-[48px] flex-shrink-0 text-right pt-[14px]">
                <span className="text-[11px] font-semibold text-muted-foreground">{item.time}</span>
              </div>

              {/* Dot */}
              <div className="flex flex-col items-center flex-shrink-0 pt-[14px] relative z-10">
                <div
                  className={cn(
                    "w-[13px] h-[13px] rounded-full border-2",
                    item.active
                      ? "bg-emerald-400 border-emerald-400 shadow-sm shadow-emerald-200"
                      : "bg-card border-muted-foreground/30"
                  )}
                />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "flex-1 rounded-2xl p-3.5 border transition-colors group-active:opacity-80 mb-1",
                  item.active ? "bg-emerald-50/60 border-emerald-200" : "bg-card border-border"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                      item.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-[#1C2B3A]"
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold leading-tight">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">{item.time} – {item.end}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAB */}
        <div className="sticky bottom-4 flex justify-end pr-5 pb-2">
          <button className="w-12 h-12 bg-[#E07B5A] rounded-full flex items-center justify-center shadow-lg active:opacity-90">
            <Plus size={22} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Now and Next ─────────────────────────────────────────────────────

export function NowAndNextScreen({ onReservation, onBack }: { onReservation: () => void; onBack: () => void }) {
  return (
    <Scroll>
      <div className="px-5 pt-3 pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-4">
          <BackBtn label="Timeline" onPress={onBack} />
          <div className="text-right">
            <p className="text-[12px] font-semibold text-muted-foreground">Lisbon & Porto</p>
            <p className="text-[11px] text-muted-foreground">Day 4 of 9</p>
          </div>
        </div>

        {/* NOW */}
        <div className="bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-emerald-300">Now</span>
          </div>

          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Hotel size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[18px] leading-tight">Hotel Vista do Tejo</p>
              <p className="text-white/55 text-[13px] mt-0.5">Rua do Arsenal 78, Lisbon</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white/60 text-[13px] mb-1">
            <Clock size={13} />
            <span className="ml-1">Check-out 12:00 · Ends in 2h 14m</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
            <span className="text-[11px] text-white/40 font-medium">Booking ref</span>
            <span className="text-[12px] font-mono text-white/70 flex-1">HVT-2026-8841</span>
            <button className="active:opacity-60">
              <Copy size={13} className="text-white/40" />
            </button>
          </div>
        </div>

        {/* NEXT */}
        <div className="bg-card rounded-3xl p-5 border border-border mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E07B5A] flex-shrink-0" />
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E07B5A]">Next</span>
            </div>
            <span className="text-[12px] font-semibold text-muted-foreground">in 3h 46m</span>
          </div>

          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
              <Train size={20} className="text-[#1C2B3A]" />
            </div>
            <div>
              <p className="font-bold text-[17px] leading-tight">Alfa Pendular to Porto</p>
              <p className="text-muted-foreground text-[13px] mt-0.5">AP 122 · Departs 15:30</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[13px] mb-4">
            <span className="font-semibold">Lisboa Oriente</span>
            <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="font-semibold">Porto Campanhã</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Car", value: "3" },
              { label: "Seat", value: "22A" },
              { label: "Platform", value: "2" },
            ].map((item) => (
              <div key={item.label} className="bg-muted rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">{item.label}</p>
                <p className="text-[16px] font-bold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Later today */}
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Later today</p>
          <div onClick={onReservation} className="flex items-center gap-3 cursor-pointer active:opacity-70">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed size={16} className="text-[#1C2B3A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold">Taberna da Rua das Flores</p>
              <p className="text-[12px] text-muted-foreground">Dinner · 20:00 · Party of 2</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Reservation Details ──────────────────────────────────────────────

export function ReservationDetailsScreen({ onBack, onEdit, onMove, onDelete, onHistory }: {
  onBack: () => void;
  onEdit?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
  onHistory?: () => void;
}) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn onPress={onBack} />
          <button><MoreHorizontal size={20} className="text-muted-foreground" /></button>
        </div>

        {/* Hero card */}
        <div className="mx-5 mb-4 bg-[#1C2B3A] rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Train size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white/50 text-[12px] font-medium">Train · Comboios de Portugal</p>
              <p className="font-bold text-[18px]">Lisbon → Porto</p>
            </div>
          </div>

          {/* Route bar */}
          <div className="flex items-center gap-3 mb-5">
            <div className="text-center flex-shrink-0">
              <p className="text-[24px] font-bold leading-none">15:30</p>
              <p className="text-white/50 text-[11px] mt-1">Lisboa Oriente</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-[10px] text-white/35 font-medium">2h 15m</p>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
                <div className="flex-1 h-[1px] bg-white/15" />
                <div className="flex-1 h-[1px] bg-white/15" />
                <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
              </div>
              <p className="text-[10px] text-white/35 font-medium">Non-stop · AP 122</p>
            </div>
            <div className="text-center flex-shrink-0">
              <p className="text-[24px] font-bold leading-none">17:45</p>
              <p className="text-white/50 text-[11px] mt-1">Porto Campanhã</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Car", value: "3" },
              { label: "Seat", value: "22A" },
              { label: "Platform", value: "2" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl py-2.5 text-center">
                <p className="text-[10px] text-white/40 font-medium">{item.label}</p>
                <p className="text-[15px] font-bold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="mx-5 bg-card rounded-3xl border border-border overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Details</p>
          </div>
          {[
            { label: "Date", value: "Monday 30 June 2026" },
            { label: "Provider", value: "CP — Comboios de Portugal" },
            { label: "Booking ref", value: "CP-882-4419" },
            { label: "Journey", value: "Lisbon & Porto" },
            { label: "Imported from", value: "info@cp.pt" },
            { label: "Last updated", value: "28 Jun 2026" },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}
            >
              <span className="text-[13px] text-muted-foreground">{item.label}</span>
              <span className="text-[13px] font-semibold">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mx-5 space-y-2">
          {[
            { icon: <Copy size={16} />, label: "Copy booking reference", onPress: undefined },
            { icon: <Navigation size={16} />, label: "Directions to station", onPress: undefined },
            { icon: <Globe size={16} />, label: "Open CP website", onPress: undefined },
            { icon: <Pencil size={16} />, label: "Edit reservation", onPress: onEdit },
            { icon: <ArrowRight size={16} />, label: "Move to another Journey", onPress: onMove },
            { icon: <Clock size={16} />, label: "View change history", onPress: onHistory },
          ].map((action) => (
            <button
              key={action.label}
              onClick={action.onPress}
              className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"
            >
              <span className="text-muted-foreground w-5 flex-shrink-0">{action.icon}</span>
              {action.label}
              <ChevronRight size={14} className="text-muted-foreground ml-auto flex-shrink-0" />
            </button>
          ))}
          <button onClick={onDelete} className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <Trash2 size={16} className="flex-shrink-0" />
            Delete reservation
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Imports Home ─────────────────────────────────────────────────────

export const IMPORT_ITEMS = [
  { title: "Hotel Vista do Tejo", sub: "Lisbon · 27–30 Jun", date: "15 Jun", status: "imported", icon: <Hotel size={14} /> },
  { title: "TAP Air Portugal TP1923", sub: "Lisbon → Porto · 30 Jun", date: "15 Jun", status: "imported", icon: <Plane size={14} /> },
  { title: "Alfa Pendular AP 122", sub: "Lisbon → Porto · 30 Jun", date: "16 Jun", status: "review", icon: <Train size={14} /> },
  { title: "Taberna da Rua das Flores", sub: "Dinner reservation · 30 Jun", date: "20 Jun", status: "review", icon: <UtensilsCrossed size={14} /> },
  { title: "The Yeatman Hotel", sub: "Porto · 30 Jun – 5 Jul", date: "15 Jun", status: "imported", icon: <Hotel size={14} /> },
  { title: "TAP Air Portugal TP791", sub: "Porto → London · 5 Jul", date: "22 Jun", status: "review", icon: <Plane size={14} /> },
  { title: "Pastéis de Belém Tour", sub: "Activity · 29 Jun", date: "21 Jun", status: "imported", icon: <MapPin size={14} /> },
  { title: "Unrecognised booking confirmation", sub: "bookings@example-travel.com", date: "18 Jun", status: "unsupported", icon: <FileText size={14} /> },
  { title: "CP Rail — booking update", sub: "Possible duplicate of AP 122", date: "17 Jun", status: "duplicate", icon: <Train size={14} /> },
  { title: "Viator tour confirmation", sub: "Parse error — could not extract dates", date: "19 Jun", status: "failed", icon: <Ticket size={14} /> },
];

export function ImportsHomeScreen({
  onReviewList, onUnsupported, onFailed, onDuplicate, onForward,
}: {
  onReviewList: () => void;
  onUnsupported: () => void;
  onFailed: () => void;
  onDuplicate: () => void;
  onForward?: () => void;
}) {
  const [filter, setFilter] = useState("all");
  const filters = ["All", "Review", "Imported", "Duplicate", "Unsupported", "Failed"];
  const reviewCount = IMPORT_ITEMS.filter((i) => i.status === "review").length;

  const visible = filter === "all" ? IMPORT_ITEMS : IMPORT_ITEMS.filter((i) => i.status === filter);

  function handleItemTap(status: string) {
    if (status === "unsupported") onUnsupported();
    else if (status === "failed") onFailed();
    else if (status === "duplicate") onDuplicate();
    else if (status === "review") onReviewList();
  }

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-3">
          <h1 className="text-[26px] font-bold tracking-tight">Imports</h1>

          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl px-3.5 py-2.5 mt-3">
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Mail size={13} className="text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-emerald-800 truncate">sarah.chen@gmail.com</p>
              <p className="text-[11px] text-emerald-600">Synced 4 minutes ago</p>
            </div>
            <button className="text-[12px] font-bold text-[#E07B5A] flex-shrink-0 flex items-center gap-1"><RefreshCw size={12} />Sync</button>
          </div>

          {onForward && (
            <button onClick={onForward} className="flex items-center gap-2.5 bg-[#E07B5A]/10 border border-[#E07B5A]/20 rounded-2xl px-3.5 py-2.5 mt-2 w-full">
              <ArrowRight size={13} className="text-[#E07B5A] flex-shrink-0" />
              <p className="text-[12px] font-semibold text-[#E07B5A]">Forward a confirmation email →</p>
            </button>
          )}
        </div>

        {reviewCount > 0 && (
          <div
            onClick={onReviewList}
            className="mx-5 mb-3 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer active:opacity-80"
          >
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-amber-800">{reviewCount} imports need review</p>
            </div>
            <ChevronRight size={14} className="text-amber-500 flex-shrink-0" />
          </div>
        )}

        {/* Filter pills */}
        <div className="flex gap-2 px-5 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors",
                filter === f.toLowerCase()
                  ? "bg-[#1C2B3A] text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-2">
          {visible.map((item, i) => {
            const iconBg =
              item.status === "review"    ? "bg-amber-50 text-amber-600" :
              item.status === "failed"    ? "bg-red-50 text-red-500" :
              item.status === "unsupported" ? "bg-slate-50 text-slate-500" :
              item.status === "duplicate" ? "bg-purple-50 text-purple-600" :
              "bg-muted text-[#1C2B3A]";
            return (
              <div
                key={i}
                onClick={() => handleItemTap(item.status)}
                className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70"
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold truncate">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground truncate">{item.sub}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-[11px] text-muted-foreground">{item.date}</span>
                  {item.status === "imported"
                    ? <CheckCircle size={14} className="text-emerald-500" />
                    : <StatusPill status={item.status === "review" ? "review" : item.status === "duplicate" ? "duplicate" : item.status === "failed" ? "review" : "past"} />
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Review Import List ───────────────────────────────────────────────

export const REVIEW_ITEMS = [
  {
    title: "Alfa Pendular AP 122", sender: "Comboios de Portugal",
    date: "30 Jun 2026", journey: "Lisbon & Porto",
    reason: "Journey unclear", reasonStatus: "blue",
    icon: <Train size={15} />,
  },
  {
    title: "Taberna da Rua das Flores", sender: "OpenTable",
    date: "30 Jun 2026", journey: "Lisbon & Porto",
    reason: "Missing info", reasonStatus: "amber",
    icon: <UtensilsCrossed size={15} />,
  },
  {
    title: "TAP Air Portugal TP791", sender: "TAP Air Portugal",
    date: "5 Jul 2026", journey: "Lisbon & Porto",
    reason: "Possible duplicate", reasonStatus: "purple",
    icon: <Plane size={15} />,
  },
];

export function ReviewImportListScreen({ onItem, onBack, onEditAccept, onDuplicate }: { onItem: () => void; onBack: () => void; onEditAccept: () => void; onDuplicate: () => void }) {
  const reasonCls: Record<string, string> = {
    blue:   "bg-sky-50 text-sky-700",
    amber:  "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4">
          <BackBtn label="Imports" onPress={onBack} />
          <h1 className="text-[24px] font-bold tracking-tight mt-3">Review Imports</h1>
          <p className="text-muted-foreground text-[13px] mt-1">3 reservations need your attention</p>
        </div>

        <div className="px-5 space-y-3">
          {REVIEW_ITEMS.map((item, i) => (
            <div
              key={i}
              onClick={onItem}
              className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-[#1C2B3A] flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-[15px] leading-tight">{item.title}</p>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-[3px] rounded-full whitespace-nowrap flex-shrink-0 uppercase tracking-wide",
                        reasonCls[item.reasonStatus]
                      )}
                    >
                      {item.reason}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[12px] mt-0.5">{item.sender}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[12px] text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5"><Calendar size={11} />{item.date}</div>
                <div className="flex items-center gap-1.5"><MapPin size={11} />{item.journey}</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex-1 h-[34px] bg-[#1C2B3A] text-white rounded-xl text-[13px] font-semibold"
                >
                  Accept
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); item.reasonStatus === "purple" ? onDuplicate() : onEditAccept(); }}
                  className="flex-1 h-[34px] border border-border rounded-xl text-[13px] font-medium"
                >
                  {item.reasonStatus === "purple" ? "Review" : "Edit & Accept"}
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-[34px] border border-border rounded-xl flex items-center justify-center text-muted-foreground"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Review Import Details ────────────────────────────────────────────

export function ReviewImportDetailsScreen({ onBack }: { onBack: () => void }) {
  const [selectedJourney, setSelectedJourney] = useState(0);

  const extracted = [
    { label: "Type", value: "Train", ok: true },
    { label: "Provider", value: "Comboios de Portugal", ok: true },
    { label: "Origin", value: "Lisboa Oriente", ok: true },
    { label: "Destination", value: "Porto Campanhã", ok: true },
    { label: "Departs", value: "30 Jun 2026 · 15:30", ok: true },
    { label: "Arrives", value: "30 Jun 2026 · 17:45", ok: true },
    { label: "Seat", value: "22A", ok: true },
    { label: "Journey", value: "Not detected", ok: false },
  ];

  const suggested = [
    { name: "Lisbon & Porto", dates: "27 Jun – 5 Jul", match: "High" },
    { name: "Copenhagen", dates: "18 – 22 Aug", match: "Low" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn label="Review" onPress={onBack} />
          <span className="text-[12px] font-medium text-muted-foreground">2 of 3</span>
        </div>

        {/* Source email */}
        <div className="mx-5 mb-4 bg-muted rounded-3xl p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Source email</p>
          <div className="space-y-1.5">
            {[
              { label: "From", value: "info@cp.pt" },
              { label: "Subject", value: "Your booking confirmation CP-882-4419" },
              { label: "Received", value: "28 Jun 2026 · 14:22" },
            ].map((row) => (
              <div key={row.label} className="flex gap-3">
                <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
                <span className="text-[12px] text-foreground font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extracted fields */}
        <div className="mx-5 mb-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Extracted fields</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {extracted.map((row, i, arr) => (
              <div
                key={row.label}
                className={cn(
                  "flex items-center justify-between px-5 py-3",
                  i < arr.length - 1 && "border-b border-border"
                )}
              >
                <span className="text-[13px] text-muted-foreground">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[13px] font-semibold",
                      !row.ok && "text-amber-600"
                    )}
                  >
                    {row.value}
                  </span>
                  {row.ok
                    ? <Check size={13} className="text-emerald-500" />
                    : <AlertCircle size={13} className="text-amber-500" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey assignment */}
        <div className="mx-5 mb-5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Assign to Journey</p>
          <div className="bg-card border border-amber-200 rounded-3xl p-4 shadow-sm">
            <p className="text-[12px] text-muted-foreground mb-3">
              Onward could not determine which Journey this belongs to.
            </p>
            {suggested.map((j, i) => (
              <div
                key={i}
                onClick={() => setSelectedJourney(i)}
                className="flex items-center gap-3 mb-2.5 cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors",
                    selectedJourney === i
                      ? "border-[#E07B5A] bg-[#E07B5A]"
                      : "border-muted-foreground/30"
                  )}
                />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold">{j.name}</p>
                  <p className="text-[11px] text-muted-foreground">{j.dates}</p>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wide",
                    i === 0 ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                  )}
                >
                  {j.match}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mx-5 space-y-2">
          <button className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] active:opacity-90">
            Accept
          </button>
          <button className="w-full h-[52px] border-2 border-border rounded-2xl font-semibold text-[15px] active:opacity-70">
            Edit & Accept
          </button>
          <button className="w-full h-[52px] border border-border rounded-2xl text-[14px] text-muted-foreground font-medium active:opacity-70">
            Mark as not travel
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Settings ─────────────────────────────────────────────────────────

export function SettingsScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const sections: { title: string; rows: { icon: React.ReactNode; label: string; sub?: string; color: string; destructive?: boolean; action?: Screen }[] }[] = [
    {
      title: "Account",
      rows: [
        { icon: <User size={15} />, label: "Account", sub: "sarah.chen@icloud.com", color: "bg-[#1C2B3A]", action: "account-screen" },
        { icon: <Mail size={15} />, label: "Connected Inboxes", sub: "1 Gmail account", color: "bg-red-500", action: "connected-inboxes" },
        { icon: <Bell size={15} />, label: "Notifications", sub: "Flights, stays, reminders", color: "bg-[#E07B5A]", action: "notification-settings" },
      ],
    },
    {
      title: "Privacy",
      rows: [
        { icon: <Shield size={15} />, label: "Import Privacy", color: "bg-sky-500", action: "email-privacy" },
        { icon: <Download size={15} />, label: "Imported Data", sub: "14 reservations", color: "bg-purple-500", action: "manage-imported-data" },
      ],
    },
    {
      title: "App",
      rows: [
        { icon: <Sun size={15} />, label: "Preferences", sub: "Light · 12h · Day/Month/Year", color: "bg-amber-500", action: "preferences" },
        { icon: <HelpCircle size={15} />, label: "Help & Support", color: "bg-emerald-500", action: "help-support" },
        { icon: <Info size={15} />, label: "About Onward", sub: "Version 1.0.0 (42)", color: "bg-slate-500", action: "about-onward" },
      ],
    },
    {
      title: "",
      rows: [
        { icon: <LogOut size={15} />, label: "Sign Out", destructive: true, color: "bg-red-500" },
      ],
    },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-4">
          <h1 className="text-[26px] font-bold tracking-tight">Settings</h1>
        </div>

        {/* Profile */}
        <div className="mx-5 mb-5 bg-card border border-border rounded-3xl p-4 flex items-center gap-3.5 shadow-sm cursor-pointer active:opacity-80">
          <div className="w-13 h-13 rounded-full bg-[#1C2B3A] flex items-center justify-center text-white font-bold text-[17px] flex-shrink-0" style={{ width: 52, height: 52 }}>
            SC
          </div>
          <div className="flex-1">
            <p className="font-bold text-[16px]">Sarah Chen</p>
            <p className="text-[12px] text-muted-foreground">sarah.chen@icloud.com</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </div>

        {sections.map((section, si) => (
          <div key={si} className="mb-4">
            {section.title && (
              <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                {section.title}
              </p>
            )}
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  onClick={() => row.action && onNav(row.action)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-muted/40",
                    ri < section.rows.length - 1 && "border-b border-border"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                      row.destructive ? "bg-red-50" : `${row.color} text-white`
                    )}
                  >
                    <span className={row.destructive ? "text-red-500" : "text-white"}>
                      {row.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-[14px] font-semibold", row.destructive && "text-red-500")}>
                      {row.label}
                    </p>
                    {row.sub && <p className="text-[11px] text-muted-foreground mt-0.5">{row.sub}</p>}
                  </div>
                  {!row.destructive && <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

// ─── Screen: How Onward Works ────────────────────────────────────────────────

export function HowItWorksScreen({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const steps = [
    {
      icon: <Mail size={20} />,
      color: "bg-red-50 text-red-500",
      title: "Connect Gmail",
      body: "Grant read-only access to your inbox. Onward never sends, modifies, or stores your emails.",
    },
    {
      icon: <Search size={20} />,
      color: "bg-sky-50 text-sky-600",
      title: "Onward finds your reservations",
      body: "We scan for travel confirmation emails — flights, hotels, trains, restaurants, and more.",
    },
    {
      icon: <MapPin size={20} />,
      color: "bg-[#E07B5A]/10 text-[#E07B5A]",
      title: "Reservations become Journeys",
      body: "Related reservations are grouped into Journeys automatically. You can always edit or add more.",
    },
    {
      icon: <Clock size={20} />,
      color: "bg-emerald-50 text-emerald-600",
      title: "The Timeline shows what's next",
      body: "See what's happening now and next, with the key details you need — seat, platform, check-in — at a glance.",
    },
  ];

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn onPress={onBack} />

        <div className="mt-5 mb-7">
          <h2 className="text-[26px] font-bold tracking-tight leading-tight">How Onward works</h2>
          <p className="text-muted-foreground text-[14px] mt-1.5">Four steps from inbox to itinerary.</p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-[1px] bg-border" />

          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Icon + step number */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 shadow-sm border border-border bg-card", step.color.split(" ")[0])}>
                    <span className={step.color.split(" ")[1]}>{step.icon}</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Step {i + 1}</span>
                  </div>
                  <p className="font-bold text-[16px] leading-snug mb-1">{step.title}</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 bg-muted rounded-2xl p-4">
          <Shield size={15} className="text-[#1C2B3A] mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Your email credentials are stored securely using industry-standard encryption and are never shared with third parties.
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] mt-6 active:opacity-90"
        >
          Continue
        </button>
      </div>
    </Scroll>
  );
}

// ─── Screen: Connect Gmail Primer ─────────────────────────────────────────────

export function ConnectGmailPrimerScreen({ onConnect, onCancel }: { onConnect: () => void; onCancel: () => void }) {
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn onPress={onCancel} />

        <div className="mt-5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <Mail size={26} className="text-red-500" />
          </div>
          <h2 className="text-[26px] font-bold tracking-tight leading-tight">Before we connect</h2>
          <p className="text-muted-foreground text-[14px] mt-1.5">
            Here's exactly what Onward will and won't do with your Gmail.
          </p>
        </div>

        {/* Permission card */}
        <div className="bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Permission required</p>
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
              <Mail size={16} className="text-sky-600" />
            </div>
            <div>
              <p className="font-semibold text-[14px]">Read-only access to Gmail</p>
              <p className="text-muted-foreground text-[12px] mt-0.5 leading-relaxed">
                Required to search for and read travel confirmation emails.
              </p>
            </div>
          </div>

          {/* Will do */}
          <div className="mb-3">
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Onward will</p>
            <div className="space-y-2">
              {[
                "Search for emails from travel providers",
                "Read matching emails to extract reservation details",
                "Re-scan when you ask for an update",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-emerald-600" />
                  </div>
                  <span className="text-[13px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Won't do */}
          <div>
            <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-2">Onward will never</p>
            <div className="space-y-2">
              {[
                "Send, modify, or delete emails",
                "Store raw email content beyond extraction",
                "Share your email data with anyone",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={11} className="text-red-500" />
                  </div>
                  <span className="text-[13px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[12px] text-muted-foreground text-center mb-6">
          You'll be taken to Google's secure sign-in. Onward only receives the permissions shown above.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={onConnect}
            className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          >
            <Mail size={16} />
            Connect Gmail
          </button>
          <button
            onClick={onCancel}
            className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] text-muted-foreground active:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Gmail Connected ──────────────────────────────────────────────────

export function GmailConnectedScreen({ onScan, onSkip }: { onScan: () => void; onSkip: () => void }) {
  return (
    <div
      className="flex flex-col h-full px-5 pt-6 pb-10"
      style={{ fontFamily: "'Figtree', sans-serif", background: "#F8F5F0" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Success mark */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-red-100 border-2 border-background flex items-center justify-center">
            <Mail size={14} className="text-red-500" />
          </div>
        </div>

        <h2 className="text-[26px] font-bold mb-2">Gmail connected</h2>

        {/* Connected account pill */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
          <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
            <Check size={11} className="text-white" strokeWidth={3} />
          </div>
          <span className="text-[14px] font-semibold">sarah.chen@gmail.com</span>
        </div>

        {/* What happens next */}
        <div className="w-full bg-card border border-border rounded-3xl p-5 text-left shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">What happens next</p>
          <div className="space-y-3.5">
            {[
              { icon: <Search size={14} />, text: "Onward scans your inbox for travel confirmation emails" },
              { icon: <CheckCircle size={14} />, text: "Matching reservations are extracted and organised into Journeys" },
              { icon: <Bell size={14} />, text: "You'll be notified before check-ins, departures, and key times" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A] mt-0.5">
                  {row.icon}
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          onClick={onScan}
          className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] active:opacity-90"
        >
          Scan inbox now
        </button>
        <button
          onClick={onSkip}
          className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] text-muted-foreground active:opacity-70"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Choose Scan Range ────────────────────────────────────────────────

export function ChooseScanRangeScreen({ onScan, onBack }: { onScan: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState(1); // default: 90 days

  const options = [
    { label: "Last 30 days", sub: "Recent bookings only", recommended: false },
    { label: "Last 90 days", sub: "Good for most travellers", recommended: true },
    { label: "Last 12 months", sub: "Full year of trips", recommended: false },
    { label: "Custom range", sub: "Choose start and end date", recommended: false, custom: true },
  ];

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn onPress={onBack} />

        <div className="mt-5 mb-7">
          <h2 className="text-[26px] font-bold tracking-tight leading-tight">How far back?</h2>
          <p className="text-muted-foreground text-[14px] mt-1.5">
            Choose how much of your inbox Onward scans for reservations.
          </p>
        </div>

        <div className="space-y-2.5 mb-8">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "w-full flex items-center gap-4 rounded-3xl p-4 border-2 transition-all text-left",
                selected === i
                  ? "border-[#1C2B3A] bg-card shadow-sm"
                  : "border-border bg-card active:opacity-70"
              )}
            >
              {/* Radio */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selected === i ? "border-[#1C2B3A]" : "border-muted-foreground/30"
                )}
              >
                {selected === i && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[15px] font-semibold", selected === i ? "text-foreground" : "text-foreground")}>
                    {opt.label}
                  </span>
                  {opt.recommended && (
                    <span className="text-[10px] font-bold text-[#E07B5A] bg-[#E07B5A]/10 px-2 py-[2px] rounded-full uppercase tracking-wide">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5">{opt.sub}</p>
              </div>

              {opt.custom && (
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-muted rounded-2xl p-3.5 mb-6">
          <Clock size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Scanning runs in the background and won't slow down your device. Larger ranges take a few minutes.
          </p>
        </div>

        <button
          onClick={onScan}
          className="w-full h-[52px] bg-[#E07B5A] text-white rounded-2xl font-semibold text-[15px] active:opacity-90"
        >
          Find my reservations
        </button>
      </div>
    </Scroll>
  );
}

// ─── Screen: Reauthentication Required ───────────────────────────────────────

export function ReauthRequiredScreen({ onReconnect, onDisconnect, onDismiss }: {
  onReconnect: () => void;
  onDisconnect: () => void;
  onDismiss: () => void;
}) {
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex justify-end">
          <button onClick={onDismiss} className="text-muted-foreground p-1">
            <X size={20} />
          </button>
        </div>

        <div className="mt-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
            <AlertCircle size={26} className="text-amber-500" />
          </div>
          <h2 className="text-[24px] font-bold tracking-tight leading-tight">Reconnection required</h2>
          <p className="text-muted-foreground text-[14px] mt-2 leading-relaxed">
            Your Gmail connection has expired. Onward can no longer scan for new reservations.
          </p>
        </div>

        {/* Affected account */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-amber-900">sarah.chen@gmail.com</p>
            <p className="text-[11px] text-amber-700">Connection expired · Last synced 3 days ago</p>
          </div>
        </div>

        {/* What still works */}
        <div className="bg-card border border-border rounded-3xl p-5 mb-6 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">While disconnected</p>
          <div className="space-y-2.5">
            {[
              { ok: true,  text: "All imported Journeys and reservations remain accessible" },
              { ok: true,  text: "Timeline and Now & Next continue to work" },
              { ok: false, text: "New confirmation emails won't be imported" },
              { ok: false, text: "Inbox scanning is paused" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    row.ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                  )}
                >
                  {row.ok ? <Check size={11} /> : <X size={11} />}
                </div>
                <span className="text-[13px] leading-snug">{row.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={onReconnect}
            className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          >
            <RefreshCw size={16} />
            Reconnect Gmail
          </button>
          <button
            onClick={onDisconnect}
            className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] text-muted-foreground active:opacity-70"
          >
            Disconnect Gmail
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Journey Details ─────────────────────────────────────────────────

export function JourneyDetailsScreen({
  onBack, onTimeline, onEdit, onAddPlan, onDelete,
}: {
  onBack: () => void;
  onTimeline: () => void;
  onEdit: () => void;
  onAddPlan: () => void;
  onDelete: () => void;
}) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn onPress={onBack} />
          <button onClick={onEdit} className="text-[#E07B5A] text-[14px] font-semibold flex items-center gap-1">
            <Pencil size={14} />
            Edit
          </button>
        </div>

        {/* Hero */}
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 pr-3">
              <h1
                className="text-[28px] font-bold tracking-tight leading-tight"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
              >
                Lisbon & Porto
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={13} className="text-muted-foreground flex-shrink-0" />
                <span className="text-[14px] text-muted-foreground">Portugal</span>
              </div>
            </div>
            <StatusPill status="active" />
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-5 grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Days", value: "9" },
            { label: "Reservations", value: "7" },
            { label: "Needs review", value: "1" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl py-3 text-center shadow-sm">
              <p className="text-[20px] font-bold leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Dates card */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Dates</p>
          </div>
          {[
            { label: "Start", value: "Friday 27 June 2026" },
            { label: "End", value: "Sunday 5 July 2026" },
            { label: "Duration", value: "9 days" },
            { label: "Status", value: "Active — Day 4" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}
            >
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Notes</p>
            <button className="text-[#E07B5A] text-[12px] font-semibold">Edit</button>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Check-out at Hotel Vista do Tejo is 12:00. Train to Porto departs 15:30 from Oriente — allow 30 min to get there. Porto hotel accepts early check-in from 14:00.
          </p>
        </div>

        {/* Import source */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-3 border-b border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Import sources</p>
          </div>
          {[
            { icon: <Mail size={13} />, label: "sarah.chen@gmail.com", value: "7 reservations" },
            { icon: <Pencil size={13} />, label: "Added manually", value: "0 reservations" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                {row.icon}
                <span className="text-[13px]">{row.label}</span>
              </div>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mx-5 space-y-2">
          <button
            onClick={onTimeline}
            className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          >
            <Clock size={16} />
            View Timeline
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onAddPlan} className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <Plus size={15} />Add Plan
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <ScanLine size={15} />Scan Gmail
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <Map size={15} />Map
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <FolderOpen size={15} />Documents
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <ListChecks size={15} />Readiness
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <Share2 size={15} />Share
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <Users size={15} />Travellers
            </button>
            <button className="h-[46px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 bg-card active:opacity-70">
              <CalendarCheck size={15} />Calendar
            </button>
          </div>
          <button
            onClick={onDelete}
            className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl font-semibold text-[14px] text-red-600 flex items-center justify-center gap-2 active:opacity-70"
          >
            <Trash2 size={15} />
            Delete Journey
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Add / Edit Journey ───────────────────────────────────────────────

export function JourneyFormScreen({
  mode, onSave, onCancel,
}: {
  mode: "add" | "edit";
  onSave: () => void;
  onCancel: () => void;
}) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(isEdit ? "Lisbon & Porto" : "");
  const [destination, setDestination] = useState(isEdit ? "Portugal" : "");
  const [startDate, setStartDate] = useState(isEdit ? "2026-06-27" : "");
  const [endDate, setEndDate] = useState(isEdit ? "2026-07-05" : "");
  const [notes, setNotes] = useState(
    isEdit ? "Check-out at Hotel Vista do Tejo is 12:00. Train to Porto departs 15:30 from Oriente." : ""
  );
  const [showDateWarning, setShowDateWarning] = useState(false);

  function handleStartChange(val: string) {
    setStartDate(val);
    if (isEdit && val > "2026-06-27") setShowDateWarning(true);
    else setShowDateWarning(false);
  }

  const fieldClass = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onCancel} className="text-muted-foreground text-[15px] font-semibold">
            Cancel
          </button>
          <h2 className="text-[17px] font-bold">{isEdit ? "Edit Journey" : "New Journey"}</h2>
          <button
            onClick={onSave}
            className="text-[#E07B5A] text-[15px] font-bold"
          >
            Save
          </button>
        </div>

        {showDateWarning && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5">
            <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[13px] text-amber-800 leading-snug">
              2 reservations fall before the new start date and will be outside this Journey's range.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">
              Journey name
            </label>
            <input
              className={fieldClass}
              placeholder="e.g. Tokyo Summer 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Destination */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">
              Destination
            </label>
            <div className="relative">
              <input
                className={cn(fieldClass, "pl-10")}
                placeholder="City, country, or region"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">
                Start date
              </label>
              <input
                type="date"
                className={cn(fieldClass, showDateWarning && "ring-2 ring-amber-300")}
                value={startDate}
                onChange={(e) => handleStartChange(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">
                End date
              </label>
              <input
                type="date"
                className={fieldClass}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">
              Notes
            </label>
            <textarea
              className={cn(fieldClass, "resize-none h-28 leading-relaxed")}
              placeholder="Anything worth remembering…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {isEdit && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Danger zone</p>
            <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl font-semibold text-[14px] text-red-600 flex items-center justify-center gap-2 active:opacity-70">
              <Trash2 size={15} />
              Delete Journey
            </button>
          </div>
        )}
      </div>
    </Scroll>
  );
}

// ─── Screen: Delete Journey Confirmation ──────────────────────────────────────

export function DeleteJourneyConfirmScreen({ onDelete, onCancel }: { onDelete: () => void; onCancel: () => void }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
          <Trash2 size={24} className="text-red-500" />
        </div>

        <h2 className="text-[24px] font-bold mb-1">Delete Journey?</h2>
        <p className="text-muted-foreground text-[14px] mb-6 leading-relaxed">
          This will permanently remove <span className="font-semibold text-foreground">Lisbon & Porto</span> and all its reservations from Onward.
        </p>

        {/* What gets removed */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-5 mb-4">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-3">Will be removed</p>
          <div className="space-y-2.5">
            {[
              "Journey: Lisbon & Porto",
              "7 reservations (flights, hotels, trains)",
              "All journey notes",
              "Timeline and Now & Next data",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X size={11} className="text-red-500" />
                </div>
                <span className="text-[13px] text-red-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What stays */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 mb-6">
          <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Will remain</p>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={11} className="text-emerald-600" />
            </div>
            <span className="text-[13px] text-emerald-800">
              Imported source records stay in your Gmail inbox. Onward does not delete emails.
            </span>
          </div>
        </div>

        {/* Confirm checkbox */}
        <button
          onClick={() => setConfirmed((c) => !c)}
          className="flex items-center gap-3 active:opacity-70 w-full"
        >
          <div className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            confirmed ? "bg-red-500 border-red-500" : "border-muted-foreground/30"
          )}>
            {confirmed && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <span className="text-[13px] text-muted-foreground text-left">
            I understand this cannot be undone
          </span>
        </button>
      </div>

      <div className="space-y-2.5 mt-6">
        <button
          onClick={confirmed ? onDelete : undefined}
          className={cn(
            "w-full h-[52px] rounded-2xl font-bold text-[15px] transition-all",
            confirmed
              ? "bg-red-500 text-white active:opacity-90"
              : "bg-red-100 text-red-300 cursor-not-allowed"
          )}
        >
          Delete Journey
        </button>
        <button
          onClick={onCancel}
          className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Add Plan Type Picker ─────────────────────────────────────────────

export function AddPlanTypeScreen({ onBack }: { onBack: () => void }) {
  const types = [
    { icon: <Plane size={22} />, label: "Flight", desc: "Airline, route, seat", color: "bg-sky-50 text-sky-600" },
    { icon: <Hotel size={22} />, label: "Stay", desc: "Hotel, apartment, check-in", color: "bg-amber-50 text-amber-600" },
    { icon: <Train size={22} />, label: "Transport", desc: "Train, bus, ferry", color: "bg-emerald-50 text-emerald-600" },
    { icon: <Ticket size={22} />, label: "Activity", desc: "Tour, event, attraction", color: "bg-purple-50 text-purple-600" },
    { icon: <UtensilsCrossed size={22} />, label: "Restaurant", desc: "Dining reservation", color: "bg-red-50 text-red-500" },
    { icon: <FileText size={22} />, label: "Note", desc: "Reminder or freeform note", color: "bg-slate-50 text-slate-600" },
    { icon: <Star size={22} />, label: "Custom", desc: "Anything else", color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[20px] font-bold">Add Plan</h2>
          <button onClick={onBack} className="text-muted-foreground">
            <X size={22} />
          </button>
        </div>
        <p className="text-[13px] text-muted-foreground">What type of plan are you adding?</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2" style={{ scrollbarWidth: "none" }}>
        {types.map((type) => (
          <button
            key={type.label}
            className="w-full flex items-center gap-4 bg-card border border-border rounded-3xl p-4 text-left active:opacity-70 transition-colors hover:border-[#1C2B3A]/20"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", type.color)}>
              {type.icon}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[16px]">{type.label}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{type.desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Journey Search ────────────────────────────────────────────────────

export function JourneySearchScreen({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filters = ["All", "Journeys", "Reservations", "Providers"];

  const results = query.length > 0 ? [
    { type: "journey", title: "Lisbon & Porto", sub: "Active · 27 Jun – 5 Jul 2026", icon: <MapPin size={14} />, status: "active" },
    { type: "journey", title: "Copenhagen", sub: "Upcoming · 18 – 22 Aug 2026", icon: <MapPin size={14} />, status: "upcoming" },
    { type: "reservation", title: "Hotel Vista do Tejo", sub: "Stay · Lisbon & Porto", icon: <Hotel size={14} />, status: "" },
    { type: "reservation", title: "Alfa Pendular AP 122", sub: "Train · Lisbon → Porto", icon: <Train size={14} />, status: "" },
    { type: "reservation", title: "TAP Air Portugal TP791", sub: "Flight · Porto → London", icon: <Plane size={14} />, status: "" },
  ].filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.sub.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const recent = ["Lisbon", "Copenhagen", "Tokyo", "Hotel Vista"];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {/* Search bar */}
      <div className="flex-shrink-0 px-5 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 bg-muted rounded-2xl px-4 h-11">
            <Search size={16} className="text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/60"
              placeholder="Journeys, reservations, providers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.length > 0 && (
              <button onClick={() => setQuery("")} className="text-muted-foreground flex-shrink-0">
                <X size={15} />
              </button>
            )}
          </div>
          <button onClick={onBack} className="text-[#E07B5A] font-semibold text-[14px] flex-shrink-0">
            Cancel
          </button>
        </div>

        {/* Filters */}
        {query.length > 0 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f.toLowerCase())}
                className={cn(
                  "px-3 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors",
                  activeFilter === f.toLowerCase()
                    ? "bg-[#1C2B3A] text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5" style={{ scrollbarWidth: "none" }}>
        {query.length === 0 ? (
          /* Recent searches */
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Recent</p>
            <div className="space-y-1">
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="w-full flex items-center gap-3 py-2.5 text-left active:opacity-70"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock size={14} className="text-muted-foreground" />
                  </div>
                  <span className="text-[14px] font-medium">{r}</span>
                  <ArrowRight size={14} className="text-muted-foreground ml-auto rotate-[-45deg]" />
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* No results */
          <div className="flex flex-col items-center justify-center pt-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Search size={22} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-[16px] mb-1">No results for "{query}"</p>
            <p className="text-muted-foreground text-[13px] mb-4">Try a different name, destination, or provider.</p>
            <button onClick={() => setQuery("")} className="text-[#E07B5A] font-semibold text-[14px]">
              Clear search
            </button>
          </div>
        ) : (
          /* Results */
          <div>
            {/* Group by type */}
            {["journey", "reservation"].map((group) => {
              const items = results.filter((r) =>
                group === "journey" ? r.type === "journey" : r.type === "reservation"
              );
              if (!items.length) return null;
              return (
                <div key={group} className="mb-5">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    {group === "journey" ? "Journeys" : "Reservations"}
                  </p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 cursor-pointer active:opacity-70">
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                          item.type === "journey" ? "bg-muted text-[#1C2B3A]" : "bg-muted text-muted-foreground"
                        )}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold truncate">{item.title}</p>
                          <p className="text-[12px] text-muted-foreground truncate">{item.sub}</p>
                        </div>
                        {item.status && <StatusPill status={item.status} />}
                        <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Edit & Accept Import ────────────────────────────────────────────

export function EditAcceptImportScreen({ onSave, onBack }: { onSave: () => void; onBack: () => void }) {
  const [journey, setJourney] = useState(0);
  const fieldBase = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";

  const fields = [
    { label: "Type", value: "Train", source: true, ok: true },
    { label: "Provider", value: "Comboios de Portugal", source: true, ok: true },
    { label: "Origin", value: "Lisboa Oriente", source: true, ok: true },
    { label: "Destination", value: "Porto Campanhã", source: true, ok: true },
    { label: "Departs", value: "30 Jun 2026 · 15:30", source: true, ok: true },
    { label: "Seat", value: "", source: false, ok: false },
    { label: "Confirmation", value: "CP-882-4419", source: true, ok: true },
  ];

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Edit & Accept</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>

        {/* Source banner */}
        <div className="flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-3.5 mb-5">
          <Mail size={14} className="text-sky-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-semibold text-sky-800">From info@cp.pt</p>
            <p className="text-[11px] text-sky-600">Your booking confirmation CP-882-4419 · 28 Jun</p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3 mb-5">
          {fields.map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{f.label}</label>
                {f.source && <span className="text-[10px] text-sky-600 font-semibold">From email</span>}
                {!f.ok && <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1"><AlertCircle size={10} />Missing</span>}
              </div>
              <input
                className={cn(fieldBase, !f.ok && "ring-2 ring-amber-300 bg-amber-50")}
                defaultValue={f.value}
                placeholder={f.ok ? f.value : `Enter ${f.label.toLowerCase()}…`}
              />
            </div>
          ))}
        </div>

        {/* Journey assignment */}
        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2 block">Journey</label>
          <div className="space-y-2">
            {["Lisbon & Porto · Active", "Copenhagen · Upcoming"].map((j, i) => (
              <button key={i} onClick={() => setJourney(i)} className={cn("w-full flex items-center gap-3 rounded-2xl p-3.5 border-2 text-left transition-all", journey === i ? "border-[#1C2B3A] bg-card" : "border-border bg-card")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", journey === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {journey === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                </div>
                <span className="text-[14px] font-semibold">{j}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Assign Import to Journey ────────────────────────────────────────

export function AssignImportJourneyScreen({ onAssign, onBack, onCreateJourney }: { onAssign: () => void; onBack: () => void; onCreateJourney: () => void }) {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");

  const journeys = [
    { name: "Lisbon & Porto", dates: "27 Jun – 5 Jul", status: "active", match: "Recommended" },
    { name: "Copenhagen", dates: "18 – 22 Aug", status: "upcoming", match: "" },
    { name: "Tokyo & Kyoto", dates: "12 – 26 Nov", status: "upcoming", match: "" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <BackBtn label="Review" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Assign to Journey</h2>
          <button onClick={onAssign} className="text-[#E07B5A] font-bold text-[15px]">Assign</button>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3.5 h-10">
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60" placeholder="Search journeys…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {journeys.filter(j => j.name.toLowerCase().includes(query.toLowerCase())).map((j, i) => (
          <button key={i} onClick={() => setSelected(i)} className={cn("w-full flex items-center gap-3.5 rounded-3xl p-4 border-2 text-left transition-all", selected === i ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
            <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", selected === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
              {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[15px]">{j.name}</p>
                {j.match && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{j.match}</span>}
              </div>
              <p className="text-[12px] text-muted-foreground mt-0.5">{j.dates}</p>
            </div>
            <StatusPill status={j.status} />
          </button>
        ))}

        <button onClick={onCreateJourney} className="w-full flex items-center gap-3.5 rounded-3xl p-4 border border-dashed border-muted-foreground/30 text-left active:opacity-70">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-[14px]">Create new Journey</p>
            <p className="text-[12px] text-muted-foreground">Start a new trip from this reservation</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Create Journey from Import ──────────────────────────────────────

export function CreateJourneyFromImportScreen({ onSave, onBack }: { onSave: () => void; onBack: () => void }) {
  const fieldBase = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all";

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">New Journey</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Create</button>
        </div>

        <p className="text-[13px] text-muted-foreground text-center mb-6">Pre-filled from your import. Edit anything before saving.</p>

        <div className="space-y-3 mb-6">
          {[
            { label: "Journey name", value: "Portugal — June 2026", suggested: true },
            { label: "Destination", value: "Portugal", suggested: true },
            { label: "Start date", value: "2026-06-27", type: "date" },
            { label: "End date", value: "2026-07-05", type: "date" },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{f.label}</label>
                {f.suggested && <span className="text-[10px] text-sky-600 font-semibold">Suggested</span>}
              </div>
              <input type={f.type ?? "text"} className={fieldBase} defaultValue={f.value} />
            </div>
          ))}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label>
            <textarea className={cn(fieldBase, "resize-none h-20")} placeholder="Optional notes…" />
          </div>
        </div>

        {/* Reservations to include */}
        <div>
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Reservations to include</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            {[
              { icon: <Train size={14} />, title: "Alfa Pendular AP 122", sub: "30 Jun · Lisbon → Porto" },
              { icon: <Hotel size={14} />, title: "The Yeatman Hotel", sub: "30 Jun – 5 Jul · Porto" },
            ].map((r, i, arr) => (
              <div key={i} className={cn("flex items-center gap-3 px-4 py-3.5", i < arr.length - 1 && "border-b border-border")}>
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-[#1C2B3A] flex-shrink-0">{r.icon}</div>
                <div className="flex-1"><p className="text-[13px] font-semibold">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.sub}</p></div>
                <Check size={14} className="text-emerald-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Potential Duplicate Review ──────────────────────────────────────

export function DuplicateReviewScreen({ onBack }: { onBack: () => void }) {
  const [action, setAction] = useState<string | null>(null);
  const actions = ["Keep existing", "Replace existing", "Keep both", "Mark as duplicate"];

  const newImport = [
    { label: "Provider", value: "CP Rail" },
    { label: "Route", value: "Lisbon → Porto" },
    { label: "Date", value: "30 Jun 2026 · 15:30" },
    { label: "Ref", value: "CP-999-0012" },
  ];
  const existing = [
    { label: "Provider", value: "Comboios de Portugal" },
    { label: "Route", value: "Lisboa Oriente → Porto Campanhã" },
    { label: "Date", value: "30 Jun 2026 · 15:30" },
    { label: "Ref", value: "CP-882-4419" },
  ];

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-5">
          <BackBtn label="Review" onPress={onBack} />
          <span className="text-[12px] text-muted-foreground font-medium">Possible duplicate</span>
        </div>

        <div className="mb-2">
          <h2 className="text-[22px] font-bold">Possible duplicate</h2>
          <p className="text-muted-foreground text-[13px] mt-1">A very similar reservation already exists. Compare and decide.</p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-2 mb-5 mt-5">
          {[
            { title: "New import", color: "border-sky-200 bg-sky-50/50", badge: "bg-sky-100 text-sky-700", data: newImport },
            { title: "Existing", color: "border-emerald-200 bg-emerald-50/50", badge: "bg-emerald-100 text-emerald-700", data: existing },
          ].map((col) => (
            <div key={col.title} className={cn("rounded-3xl border p-3.5", col.color)}>
              <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide", col.badge)}>{col.title}</span>
              <div className="mt-3 space-y-2.5">
                {col.data.map((row) => (
                  <div key={row.label}>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{row.label}</p>
                    <p className="text-[12px] font-semibold mt-0.5 leading-tight">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action picker */}
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">What would you like to do?</p>
        <div className="space-y-2 mb-6">
          {actions.map((a) => (
            <button key={a} onClick={() => setAction(a)} className={cn("w-full flex items-center gap-3 rounded-2xl p-4 border-2 text-left transition-all", action === a ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", action === a ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {action === a && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
              </div>
              <span className="text-[14px] font-semibold">{a}</span>
            </button>
          ))}
        </div>

        <button className={cn("w-full h-[52px] rounded-2xl font-bold text-[15px] transition-all", action ? "bg-[#1C2B3A] text-white active:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
          Confirm
        </button>
      </div>
    </Scroll>
  );
}

// ─── Screen: Unsupported Import ───────────────────────────────────────────────

export function UnsupportedImportScreen({ onBack, onAddManually }: { onBack: () => void; onAddManually: () => void }) {
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn label="Imports" onPress={onBack} />

        <div className="mt-5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <FileText size={24} className="text-slate-500" />
          </div>
          <h2 className="text-[22px] font-bold">Unsupported format</h2>
          <p className="text-muted-foreground text-[13px] mt-1.5 leading-relaxed">Onward recognised this as a travel email but could not extract reservation details from its layout.</p>
        </div>

        <div className="bg-muted rounded-3xl p-4 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Source email</p>
          {[
            { label: "From", value: "bookings@example-travel.com" },
            { label: "Subject", value: "Your booking is confirmed" },
            { label: "Received", value: "18 Jun 2026 · 09:14" },
          ].map((row) => (
            <div key={row.label} className="flex gap-3 mb-1.5">
              <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
              <span className="text-[12px] font-medium">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-3xl p-4 mb-6">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Why Onward could not read it</p>
          <ul className="space-y-2">
            {["The email uses a non-standard layout that our parser does not yet support.", "Reservation details are embedded in an image rather than text.", "No structured confirmation number was found."].map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <button onClick={onAddManually} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"><Pencil size={16} />Add manually</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70">Mark as not travel</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 text-muted-foreground active:opacity-70"><Send size={15} />Send feedback to Onward</button>
          <button className="w-full h-[48px] border border-red-100 bg-red-50 rounded-2xl font-semibold text-[14px] text-red-600 active:opacity-70">Delete import</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Failed Import ────────────────────────────────────────────────────

export function FailedImportScreen({ onBack, onAddManually }: { onBack: () => void; onAddManually: () => void }) {
  const [retrying, setRetrying] = useState(false);

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 2000);
  }

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn label="Imports" onPress={onBack} />

        <div className="mt-5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <h2 className="text-[22px] font-bold">Import failed</h2>
          <p className="text-muted-foreground text-[13px] mt-1.5 leading-relaxed">Onward encountered an error while processing this email and could not complete the import.</p>
        </div>

        <div className="bg-muted rounded-3xl p-4 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Source email</p>
          {[
            { label: "From", value: "tours@viator.com" },
            { label: "Subject", value: "Your Viator booking confirmation" },
            { label: "Received", value: "19 Jun 2026 · 14:52" },
          ].map((row) => (
            <div key={row.label} className="flex gap-3 mb-1.5">
              <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
              <span className="text-[12px] font-medium">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-4 mb-6">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-2">Error details</p>
          <p className="text-[13px] text-red-800 leading-relaxed">Could not extract date information. The timezone format in this email could not be parsed. <span className="font-mono text-[11px] bg-red-100 px-1 rounded">Error: PARSE_DATE_TZ_002</span></p>
        </div>

        <div className="space-y-2">
          <button onClick={handleRetry} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90">
            {retrying ? <><RefreshCw size={16} className="animate-spin" />Retrying…</> : <><RefreshCw size={16} />Retry import</>}
          </button>
          <button onClick={onAddManually} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70">Add manually</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[15px] text-muted-foreground active:opacity-70">Contact support</button>
          <button className="w-full h-[48px] border border-red-100 bg-red-50 rounded-2xl font-semibold text-[14px] text-red-600 active:opacity-70">Delete import</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Connected Inboxes ────────────────────────────────────────────────

export function ConnectedInboxesScreen({ onBack, onInbox, onConnect, onConnectMicrosoft, onForward }: { onBack: () => void; onInbox: () => void; onConnect: () => void; onConnectMicrosoft?: () => void; onForward?: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Settings" onPress={onBack} />
        </div>
        <div className="px-5 pb-5">
          <h1 className="text-[24px] font-bold tracking-tight">Connected Inboxes</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Onward scans connected inboxes for travel confirmations.</p>
        </div>

        {/* Connected account */}
        <div className="px-5 mb-2">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Connected</p>
        </div>
        <div onClick={onInbox} className="mx-5 bg-card border border-border rounded-3xl p-4 mb-5 cursor-pointer active:opacity-80 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[15px]">sarah.chen@gmail.com</p>
              <p className="text-[12px] text-muted-foreground">Gmail</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[12px] font-semibold text-emerald-700">Connected</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[12px] text-muted-foreground pt-3 border-t border-border">
            <span>Last synced 4 min ago</span>
            <button className="text-[#E07B5A] font-semibold flex items-center gap-1"><RefreshCw size={11} />Sync Now</button>
          </div>
        </div>

        {/* Add another */}
        <div className="px-5 mb-2">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Add inbox</p>
        </div>
        <div className="px-5 space-y-2.5">
          <button onClick={onConnect} className="w-full flex items-center gap-3 border border-dashed border-muted-foreground/30 rounded-3xl p-4 active:opacity-70">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-red-500" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-[15px]">Connect Gmail</p><p className="text-[12px] text-muted-foreground">Add another Google account</p></div>
            <Plus size={18} className="text-muted-foreground flex-shrink-0" />
          </button>
          <button onClick={onConnectMicrosoft} className="w-full flex items-center gap-3 border border-dashed border-muted-foreground/30 rounded-3xl p-4 active:opacity-70">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0078D4" }}><Mail size={18} className="text-white" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-[15px]">Connect Microsoft</p><p className="text-[12px] text-muted-foreground">Outlook, Hotmail, Microsoft 365</p></div>
            <Plus size={18} className="text-muted-foreground flex-shrink-0" />
          </button>
          <button onClick={onForward} className="w-full flex items-center gap-3 border border-dashed border-muted-foreground/30 rounded-3xl p-4 active:opacity-70">
            <div className="w-10 h-10 rounded-full bg-[#E07B5A]/10 flex items-center justify-center flex-shrink-0"><ArrowRight size={18} className="text-[#E07B5A]" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-[15px]">Forward a confirmation</p><p className="text-[12px] text-muted-foreground">Forward emails to your Onward address</p></div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Connected Inbox Details ─────────────────────────────────────────

export function InboxDetailsScreen({ onBack, onDisconnect }: { onBack: () => void; onDisconnect: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4">
          <BackBtn label="Inboxes" onPress={onBack} />
        </div>

        {/* Account hero */}
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-red-500" />
            </div>
            <div>
              <p className="font-bold text-[16px]">sarah.chen@gmail.com</p>
              <p className="text-[12px] text-muted-foreground">Gmail · Connected 15 Jun 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 rounded-2xl px-3.5 py-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[13px] font-semibold text-emerald-700">Connected and syncing</span>
          </div>
        </div>

        {/* Sync info */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Last successful sync", value: "30 Jun 2026 · 09:37" },
            { label: "Last attempted sync", value: "30 Jun 2026 · 09:37" },
            { label: "Reservations imported", value: "14" },
            { label: "Emails scanned", value: "1,247" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mx-5 space-y-2">
          {[
            { icon: <RefreshCw size={15} />, label: "Sync now" },
            { icon: <Shield size={15} />, label: "Privacy information" },
            { icon: <Download size={15} />, label: "Delete imported source data" },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
              <span className="text-muted-foreground w-5 flex-shrink-0">{a.icon}</span>
              {a.label}
              <ChevronRight size={14} className="text-muted-foreground ml-auto" />
            </button>
          ))}
          <button onClick={onDisconnect} className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <X size={15} className="flex-shrink-0" />
            Disconnect Gmail
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Disconnect Gmail Confirmation ────────────────────────────────────

export function DisconnectGmailConfirmScreen({ onDisconnect, onCancel }: { onDisconnect: () => void; onCancel: () => void }) {
  const [keepData, setKeepData] = useState(true);

  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
          <Mail size={24} className="text-amber-600" />
        </div>
        <h2 className="text-[22px] font-bold mb-1">Disconnect Gmail?</h2>
        <p className="text-[14px] text-muted-foreground mb-2 leading-relaxed">
          <span className="font-semibold text-foreground">sarah.chen@gmail.com</span> will be disconnected. Onward will stop scanning this inbox for new reservations.
        </p>

        {/* What stops */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 mb-5">
          {["Future inbox scanning will stop", "New confirmation emails won't be imported", "Existing sync schedule will be cancelled"].map((item) => (
            <div key={item} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <X size={12} className="text-amber-600 mt-1 flex-shrink-0" />
              <span className="text-[13px] text-amber-800">{item}</span>
            </div>
          ))}
        </div>

        {/* Data options */}
        <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Your imported data</p>
        {[
          { label: "Keep imported Journeys and reservations", sub: "14 reservations remain in Onward", keep: true },
          { label: "Remove all data imported from this account", sub: "Cannot be undone", keep: false },
        ].map((opt) => (
          <button key={opt.label} onClick={() => setKeepData(opt.keep)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left mb-2 transition-all", keepData === opt.keep ? "border-[#1C2B3A] bg-card" : "border-border bg-card")}>
            <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", keepData === opt.keep ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
              {keepData === opt.keep && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
            </div>
            <div>
              <p className="font-semibold text-[14px] leading-snug">{opt.label}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{opt.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-2.5 mt-4">
        <button onClick={onDisconnect} className="w-full h-[52px] bg-red-500 text-white rounded-2xl font-bold text-[15px] active:opacity-90">Disconnect</button>
        <button onClick={onCancel} className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70">Cancel</button>
      </div>
    </div>
  );
}

// ─── Screen: Email Privacy ────────────────────────────────────────────────────

export function EmailPrivacyScreen({ onBack }: { onBack: () => void }) {
  const sections = [
    {
      icon: <Search size={16} />, color: "bg-sky-50 text-sky-600", title: "What Onward searches for",
      body: "Onward searches for emails from known travel providers — airlines, hotels, rail operators, and booking platforms — using sender domain matching, not keyword scanning.",
    },
    {
      icon: <Eye size={16} />, color: "bg-purple-50 text-purple-600", title: "What Onward reads",
      body: "Onward reads the text content of matched emails to extract structured reservation data. Only emails that match travel provider patterns are processed.",
    },
    {
      icon: <Shield size={16} />, color: "bg-emerald-50 text-emerald-600", title: "What Onward never does",
      body: "Onward never modifies, deletes, or sends emails on your behalf. We never read emails outside of travel confirmation matching. We never share raw email content with any third party.",
    },
    {
      icon: <Database size={16} />, color: "bg-amber-50 text-amber-600", title: "What is stored",
      body: "Structured reservation data (dates, destinations, confirmation numbers) is stored in your account. Raw email content is processed and then discarded — it is not retained on Onward servers.",
    },
    {
      icon: <Lock size={16} />, color: "bg-[#1C2B3A]/5 text-[#1C2B3A]", title: "Token security",
      body: "Your Gmail OAuth token is encrypted at rest and in transit using AES-256. Onward never stores your Gmail password. You can revoke access at any time from your Google account settings.",
    },
    {
      icon: <X size={16} />, color: "bg-red-50 text-red-500", title: "Disconnecting Gmail",
      body: "Disconnecting Gmail immediately revokes Onward's access token. Future scanning stops. Imported reservation data can be kept or deleted — your choice.",
    },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold tracking-tight">Email Privacy</h1>
          <p className="text-[13px] text-muted-foreground mt-1">How Onward handles your Gmail access.</p>
        </div>

        <div className="px-5 space-y-3">
          {sections.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", s.color)}>{s.icon}</div>
                <p className="font-bold text-[15px]">{s.title}</p>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-5 mt-5">
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 active:opacity-70">
            <ExternalLink size={15} />
            View full Privacy Policy
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Manage Imported Data ────────────────────────────────────────────

export function ManageImportedDataScreen({ onBack }: { onBack: () => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold tracking-tight">Imported Data</h1>
          <p className="text-[13px] text-muted-foreground mt-1">View and manage data Onward has imported from your inbox.</p>
        </div>

        {/* Stats */}
        <div className="mx-5 grid grid-cols-2 gap-2 mb-5">
          {[
            { icon: <Mail size={18} />, label: "Emails processed", value: "1,247", color: "text-sky-600 bg-sky-50" },
            { icon: <CheckCircle size={18} />, label: "Reservations", value: "14", color: "text-emerald-600 bg-emerald-50" },
            { icon: <Database size={18} />, label: "Raw content kept", value: "0 items", color: "text-slate-600 bg-slate-50" },
            { icon: <Package size={18} />, label: "Journeys", value: "5", color: "text-[#E07B5A] bg-[#E07B5A]/10" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", s.color)}>{s.icon}</div>
              <p className="text-[20px] font-bold leading-none">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-5 mb-2">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Manage</p>
        </div>
        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <Download size={15} className="text-muted-foreground flex-shrink-0" />
            Export structured data
            <ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button onClick={() => setShowDeleteConfirm("raw")} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <Trash2 size={15} className="text-muted-foreground flex-shrink-0" />
            Delete raw email content
            <ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button onClick={() => setShowDeleteConfirm("all")} className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <Trash2 size={15} className="flex-shrink-0" />
            Delete all imported data
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-end z-50" onClick={() => setShowDeleteConfirm(null)}>
            <div className="bg-card w-full rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[18px] font-bold mb-2">{showDeleteConfirm === "all" ? "Delete all imported data?" : "Delete raw email content?"}</h3>
              <p className="text-[13px] text-muted-foreground mb-5 leading-relaxed">
                {showDeleteConfirm === "all" ? "This will remove all 14 reservations and 5 Journeys from Onward. This cannot be undone." : "Raw email snippets used during import will be permanently removed. Your reservations and Journeys will remain."}
              </p>
              <div className="space-y-2">
                <button className="w-full h-[50px] bg-red-500 text-white rounded-2xl font-bold text-[15px]" onClick={() => setShowDeleteConfirm(null)}>Delete</button>
                <button className="w-full h-[50px] border border-border rounded-2xl font-semibold text-[15px]" onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Scroll>
  );
}

// ─── Empty & Error States ─────────────────────────────────────────────────────

export function EmptyStateShell({ icon, title, body, children }: { icon: React.ReactNode; title: string; body: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="mb-5">{icon}</div>
      <h2 className="text-[22px] font-bold mb-2">{title}</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">{body}</p>
      <div className="w-full space-y-2.5">{children}</div>
    </div>
  );
}

export function PrimaryBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] active:opacity-90">{label}</button>;
}
export function SecondaryBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70">{label}</button>;
}

export function NoJourneysScreen({ onConnect, onAdd }: { onConnect: () => void; onAdd: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><MapPin size={32} className="text-muted-foreground" /></div>}
      title="No Journeys yet"
      body="Connect your Gmail and Onward will automatically find your travel reservations and create Journeys."
    >
      <PrimaryBtn label="Connect Gmail" onClick={onConnect} />
      <SecondaryBtn label="Add Journey manually" onClick={onAdd} />
    </EmptyStateShell>
  );
}

export function NoActiveJourneyScreen({ onJourneys, onAdd }: { onJourneys: () => void; onAdd: () => void }) {
  return (
    <Scroll>
      <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-3">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Timeline</p>
          <h1 className="text-[24px] font-bold tracking-tight">No active journey</h1>
        </div>
        <div className="px-5 flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-4">
            <Clock size={28} className="text-muted-foreground" />
          </div>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">You have no active journey right now. Your next trip will appear here when it begins.</p>
        </div>

        {/* Nearest upcoming journey */}
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-5 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Next up</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-sky-600" /></div>
            <div className="flex-1">
              <p className="font-semibold text-[16px]">Copenhagen</p>
              <p className="text-[13px] text-muted-foreground">18 Aug – 22 Aug · in 49 days</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </div>
        <div className="px-5 space-y-2.5">
          <PrimaryBtn label="View all Journeys" onClick={onJourneys} />
          <SecondaryBtn label="Add Journey" onClick={onAdd} />
        </div>
      </div>
    </Scroll>
  );
}

export function EmptyTimelineScreen({ onAdd, onScan }: { onAdd: () => void; onScan: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Calendar size={32} className="text-muted-foreground" /></div>}
      title="Nothing planned"
      body="No reservations or plans for this day. Add a plan manually or scan Gmail for matching confirmations."
    >
      <PrimaryBtn label="Add Plan" onClick={onAdd} />
      <SecondaryBtn label="Scan Gmail for this date" onClick={onScan} />
    </EmptyStateShell>
  );
}

export function NoImportsScreen({ onScan, onConnect }: { onScan: () => void; onConnect: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Inbox size={32} className="text-muted-foreground" /></div>}
      title="No import activity"
      body="Once Gmail is connected and scanned, your imported reservations will appear here."
    >
      <PrimaryBtn label="Scan Gmail" onClick={onScan} />
      <SecondaryBtn label="Connect Gmail" onClick={onConnect} />
    </EmptyStateShell>
  );
}

export function NoReviewItemsScreen({ onJourneys }: { onJourneys: () => void }) {
  return (
    <EmptyStateShell
      icon={
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle size={36} className="text-emerald-500" />
        </div>
      }
      title="You're all caught up"
      body="There are no imports waiting for your review. Onward will notify you when new ones arrive."
    >
      <PrimaryBtn label="Return to Journeys" onClick={onJourneys} />
    </EmptyStateShell>
  );
}

export function OfflineScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <Scroll>
      <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-5">
            <Wifi size={28} className="text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3.5 py-1.5 mb-5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[12px] font-bold text-amber-800 uppercase tracking-wide">Offline</span>
          </div>
          <h2 className="text-[22px] font-bold mb-2">You're offline</h2>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-2">No internet connection detected.</p>
          <p className="text-[13px] text-muted-foreground leading-relaxed">Your cached Journeys and reservations are still available. Last synced 4 minutes ago.</p>
        </div>
        <div className="px-8 pb-10 space-y-2.5">
          <PrimaryBtn label="Retry connection" onClick={onRetry} />
          <SecondaryBtn label="Continue offline" />
        </div>
      </div>
    </Scroll>
  );
}

export function ScanErrorScreen({ onRetry, onReconnect, onDismiss }: { onRetry: () => void; onReconnect: () => void; onDismiss: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex justify-end"><button onClick={onDismiss}><X size={20} className="text-muted-foreground" /></button></div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h2 className="text-[22px] font-bold mb-2">Scan failed</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">The inbox scan could not be completed. Gmail may need to be reconnected.</p>
        <div className="bg-muted rounded-2xl px-4 py-3 mb-8">
          <p className="text-[12px] text-muted-foreground">sarah.chen@gmail.com · Error <span className="font-mono">SCAN_AUTH_403</span></p>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry scan" onClick={onRetry} />
        <SecondaryBtn label="Reconnect Gmail" onClick={onReconnect} />
        <button onClick={onDismiss} className="w-full text-[14px] text-muted-foreground font-medium">Dismiss</button>
      </div>
    </div>
  );
}

export function GeneralErrorScreen({ onRetry, onBack }: { onRetry: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h2 className="text-[22px] font-bold mb-2">Something went wrong</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">An unexpected error occurred. Your data is safe — please try again.</p>
        <div className="bg-muted rounded-2xl px-4 py-2.5 mb-8">
          <p className="text-[11px] font-mono text-muted-foreground">Reference: ERR-20260630-4F2A</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Try again" onClick={onRetry} />
        <SecondaryBtn label="Return to Journeys" onClick={onBack} />
        <button className="w-full text-[14px] text-muted-foreground font-medium">Contact support</button>
      </div>
    </div>
  );
}

export function ServiceUnavailableScreen({ onRetry, onContinueOffline }: { onRetry: () => void; onContinueOffline: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-5">
          <Wifi size={28} className="text-muted-foreground" />
        </div>
        <h2 className="text-[22px] font-bold mb-2">Service unavailable</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">Onward's servers are temporarily unreachable. This is usually brief.</p>
        <div className="w-full bg-emerald-50 border border-emerald-100 rounded-3xl p-4 text-left mb-8">
          <div className="flex items-start gap-3">
            <Check size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-[13px] text-emerald-800 leading-snug">Your cached Journeys and reservations are still fully accessible while offline.</p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry" onClick={onRetry} />
        <SecondaryBtn label="Continue offline" onClick={onContinueOffline} />
      </div>
    </div>
  );
}

export function SyncConflictScreen({ onBack }: { onBack: () => void }) {
  const [choice, setChoice] = useState<"local" | "server" | null>(null);

  const conflict = {
    field: "Check-out time",
    reservation: "Hotel Vista do Tejo",
    local: { label: "Local (your edit)", value: "12:00 noon", time: "Changed 2 hours ago" },
    server: { label: "Server", value: "11:00 am", time: "Updated 30 minutes ago" },
  };

  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <BackBtn onPress={onBack} />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
          <ArrowLeftRight size={20} className="text-amber-600" />
        </div>
        <h2 className="text-[22px] font-bold">Sync conflict</h2>
        <p className="text-[13px] text-muted-foreground mt-1">{conflict.reservation} · {conflict.field}</p>
      </div>

      <div className="flex-1 space-y-3">
        {[conflict.local, conflict.server].map((opt, i) => {
          const isLocal = i === 0;
          const key = isLocal ? "local" : "server" as "local" | "server";
          return (
            <button key={key} onClick={() => setChoice(key)} className={cn("w-full rounded-3xl border-2 p-4 text-left transition-all", choice === key ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className="flex items-center justify-between mb-2">
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide", isLocal ? "bg-sky-50 text-sky-700" : "bg-muted text-muted-foreground")}>{opt.label}</span>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", choice === key ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {choice === key && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                </div>
              </div>
              <p className="text-[20px] font-bold">{opt.value}</p>
              <p className="text-[12px] text-muted-foreground mt-1">{opt.time}</p>
            </button>
          );
        })}
      </div>

      <div className="pt-4 space-y-2.5">
        <button className={cn("w-full h-[52px] rounded-2xl font-bold text-[15px] transition-all", choice ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground cursor-not-allowed")}>
          Keep {choice === "local" ? "my version" : choice === "server" ? "server version" : "selected"}
        </button>
        <SecondaryBtn label="Review and merge manually" />
      </div>
    </div>
  );
}

// ─── Settings Depth Screens ───────────────────────────────────────────────────

export function AccountScreen({ onBack, onSignOut, onDelete }: { onBack: () => void; onSignOut: () => void; onDelete: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold">Account</h1>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1C2B3A] flex items-center justify-center text-white font-bold text-[18px] flex-shrink-0">SC</div>
          <div>
            <p className="font-bold text-[17px]">Sarah Chen</p>
            <p className="text-[13px] text-muted-foreground">Apple ID · sarah.chen@icloud.com</p>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {[
            { label: "Member since", value: "15 June 2026" },
            { label: "Sign-in method", value: "Continue with Apple" },
            { label: "Gmail accounts", value: "1 connected" },
            { label: "Journeys", value: "5 total" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between items-center px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <Download size={15} className="text-muted-foreground" />Export my data<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button onClick={onSignOut} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <LogOut size={15} className="text-muted-foreground" />Sign out<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button onClick={onDelete} className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <Trash2 size={15} />Delete account
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function SignOutConfirmScreen({ onSignOut, onCancel }: { onSignOut: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5">
          <LogOut size={24} className="text-muted-foreground" />
        </div>
        <h2 className="text-[22px] font-bold mb-2">Sign out?</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">You'll be signed out of Onward. Your Journeys and reservations will remain in your account and will be available when you sign back in.</p>
        <div className="bg-muted rounded-2xl p-4">
          <div className="flex items-start gap-2.5">
            <Info size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-muted-foreground leading-relaxed">Locally cached data is cleared on sign-out. A fresh sync will run when you next sign in.</p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <button onClick={onSignOut} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] active:opacity-90">Sign Out</button>
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export function DeleteAccountScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [typed, setTyped] = useState("");
  const confirmed = typed === "DELETE";

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn label="Account" onPress={onBack} />
        <div className="mt-5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><Trash2 size={24} className="text-red-500" /></div>
          <h2 className="text-[22px] font-bold">Delete account</h2>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">This permanently removes your account and all associated data from Onward.</p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-5 mb-5">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-3">Will be permanently deleted</p>
          {["Gmail credentials and access tokens", "All raw imported email content", "All structured reservation data", "All Journeys (5 total)", "All reservations (14 total)", "Your account and sessions"].map((item) => (
            <div key={item} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <X size={12} className="text-red-500 mt-0.5 flex-shrink-0" /><span className="text-[13px] text-red-800">{item}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="text-[13px] font-semibold mb-2 block">Type <span className="font-mono font-bold text-red-600">DELETE</span> to confirm</label>
          <input
            className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-mono outline-none focus:ring-2 focus:ring-red-300"
            placeholder="DELETE"
            value={typed}
            onChange={(e) => setTyped(e.target.value.toUpperCase())}
          />
        </div>

        <button onClick={confirmed ? onConfirm : undefined} className={cn("w-full h-[52px] rounded-2xl font-bold text-[15px] transition-all", confirmed ? "bg-red-500 text-white active:opacity-90" : "bg-red-100 text-red-300 cursor-not-allowed")}>
          Delete my account
        </button>
      </div>
    </Scroll>
  );
}

export function DeletionProgressScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = ["Revoking Gmail access…", "Deleting imported data…", "Deleting Journeys…", "Clearing local cache…", "Done"];
  const done = step >= steps.length - 1;

  useEffect(() => {
    if (done) return;
    const id = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(id);
  }, [step, done]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-7 transition-all", done ? "bg-emerald-50" : "bg-[#1C2B3A]")}>
        {done ? <CheckCircle size={36} className="text-emerald-500" /> : <RefreshCw size={28} className="text-white animate-spin" />}
      </div>
      <h2 className="text-[22px] font-bold mb-1">{done ? "Account deleted" : "Deleting account…"}</h2>
      <p className="text-[14px] text-muted-foreground mb-10">{done ? "Your data has been permanently removed." : steps[step]}</p>
      <div className="w-full space-y-2">
        {steps.slice(0, -1).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", i < step ? "bg-emerald-500" : i === step ? "bg-[#1C2B3A]" : "bg-muted")}>
              {i < step ? <Check size={11} className="text-white" strokeWidth={3} /> : i === step && !done ? <div className="w-2 h-2 rounded-full bg-white" /> : null}
            </div>
            <span className={cn("text-[13px]", i < step ? "text-emerald-700 font-medium line-through" : i === step ? "font-semibold" : "text-muted-foreground")}>{s.replace("…", "")}</span>
          </div>
        ))}
      </div>
      {done && <button onClick={onDone} className="mt-10 w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px]">Back to Welcome</button>}
    </div>
  );
}

export function NotificationSettingsScreen({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    upcoming: true, flights: true, transport: true, checkin: true,
    checkout: true, activities: false, review: true, updates: true,
    cancellations: true, sync: false,
  });

  function toggle(key: string) { setToggles((t) => ({ ...t, [key]: !t[key] })); }

  const groups = [
    { title: "Reservations", rows: [
      { key: "upcoming", label: "Upcoming reservation reminders" },
      { key: "flights", label: "Flights" },
      { key: "transport", label: "Trains & transport" },
      { key: "checkin", label: "Hotel check-in reminders" },
      { key: "checkout", label: "Hotel check-out reminders" },
      { key: "activities", label: "Activities" },
    ]},
    { title: "Imports", rows: [
      { key: "review", label: "Imports needing review" },
      { key: "updates", label: "Booking updates" },
      { key: "cancellations", label: "Cancellations" },
      { key: "sync", label: "Sync errors" },
    ]},
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold">Notifications</h1>
        </div>

        {groups.map((g) => (
          <div key={g.title} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{g.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {g.rows.map((row, i) => (
                <div key={row.key} className={cn("flex items-center justify-between px-5 py-4", i < g.rows.length - 1 && "border-b border-border")}>
                  <span className="text-[14px] font-medium">{row.label}</span>
                  <button onClick={() => toggle(row.key)} className={cn("w-12 h-7 rounded-full transition-colors flex-shrink-0 relative", toggles[row.key] ? "bg-[#1C2B3A]" : "bg-muted")}>
                    <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[row.key] ? "left-6" : "left-1")} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Timing</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Default reminder timing", value: "1 hour before" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4">
              <span className="text-[14px] font-medium">{row.label}</span>
              <div className="flex items-center gap-1.5 text-[#E07B5A]">
                <span className="text-[14px] font-semibold">{row.value}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5">
          <button className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl h-[46px] text-[14px] font-semibold text-muted-foreground active:opacity-70">
            <Settings size={15} />Open iOS notification settings
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function PreferencesScreen({ onBack }: { onBack: () => void }) {
  const [appearance, setAppearance] = useState("system");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [dateFormat, setDateFormat] = useState("dmy");
  const [firstDay, setFirstDay] = useState("mon");
  const [distance, setDistance] = useState("metric");
  const [timezone, setTimezone] = useState(true);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Preferences</h1></div>

        {[
          {
            title: "Appearance", rows: [
              { label: "Theme", options: ["system", "light", "dark"], labels: ["System", "Light", "Dark"], value: appearance, set: setAppearance },
            ]
          },
          {
            title: "Date & Time", rows: [
              { label: "Time format", options: ["12h", "24h"], labels: ["12-hour", "24-hour"], value: timeFormat, set: setTimeFormat },
              { label: "Date format", options: ["dmy", "mdy", "ymd"], labels: ["D/M/Y", "M/D/Y", "Y/M/D"], value: dateFormat, set: setDateFormat },
              { label: "First day of week", options: ["mon", "sun"], labels: ["Monday", "Sunday"], value: firstDay, set: setFirstDay },
            ]
          },
          {
            title: "Units", rows: [
              { label: "Distance", options: ["metric", "imperial"], labels: ["Kilometres", "Miles"], value: distance, set: setDistance },
            ]
          },
        ].map((group) => (
          <div key={group.title} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{group.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {group.rows.map((row, i) => (
                <div key={row.label} className={cn("px-5 py-4", i < group.rows.length - 1 && "border-b border-border")}>
                  <p className="text-[13px] text-muted-foreground mb-2">{row.label}</p>
                  <div className="flex gap-1.5">
                    {row.options.map((opt, oi) => (
                      <button key={opt} onClick={() => row.set(opt)} className={cn("flex-1 h-9 rounded-xl text-[12px] font-semibold transition-colors", row.value === opt ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
                        {row.labels[oi]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-4">
          <div className="flex items-center justify-between px-5 py-4">
            <div><p className="text-[14px] font-medium">Show timezone labels</p><p className="text-[11px] text-muted-foreground mt-0.5">Useful when travelling across time zones</p></div>
            <button onClick={() => setTimezone((t) => !t)} className={cn("w-12 h-7 rounded-full transition-colors flex-shrink-0 relative ml-3", timezone ? "bg-[#1C2B3A]" : "bg-muted")}>
              <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", timezone ? "left-6" : "left-1")} />
            </button>
          </div>
        </div>
      </div>
    </Scroll>
  );
}

export function HelpSupportScreen({ onBack, onContact }: { onBack: () => void; onContact: () => void }) {
  const topics = [
    { icon: <Mail size={15} />, title: "Connecting Gmail", sub: "Permissions, troubleshooting, re-auth" },
    { icon: <Search size={15} />, title: "Missing reservations", sub: "Why a booking wasn't imported" },
    { icon: <ArrowLeftRight size={15} />, title: "Duplicate reservations", sub: "How Onward detects and handles duplicates" },
    { icon: <Pencil size={15} />, title: "Incorrect details", sub: "Editing and correcting imported data" },
    { icon: <AlertCircle size={15} />, title: "Review Imports", sub: "Understanding the review queue" },
    { icon: <X size={15} />, title: "Disconnecting Gmail", sub: "Removing access and managing data" },
    { icon: <Trash2 size={15} />, title: "Deleting data", sub: "Removing reservations, Journeys, or your account" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold">Help & Support</h1>
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Common questions</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {topics.map((t, i) => (
            <div key={t.title} className={cn("flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-muted/40", i < topics.length - 1 && "border-b border-border")}>
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{t.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">{t.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{t.sub}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="mx-5">
          <button onClick={onContact} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90">
            <Send size={16} />Contact support
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function ContactSupportScreen({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const fieldBase = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all";

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-5">
          <BackBtn label="Help" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Contact Support</h2>
          <button className={cn("font-bold text-[15px]", message.length > 20 ? "text-[#E07B5A]" : "text-muted-foreground")}>Send</button>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Category</label>
            <select className={cn(fieldBase, "appearance-none")} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a topic…</option>
              <option>Gmail connection issue</option>
              <option>Missing reservation</option>
              <option>Incorrect import</option>
              <option>App crash or error</option>
              <option>Account or billing</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Message</label>
            <textarea className={cn(fieldBase, "resize-none h-32 leading-relaxed")} placeholder="Describe the issue…" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>

        {/* Diagnostic consent */}
        <button onClick={() => setConsent((c) => !c)} className="flex items-start gap-3 mb-6 active:opacity-70 w-full">
          <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors", consent ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
            {consent && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <p className="text-[13px] text-muted-foreground text-left leading-snug">Include anonymous diagnostic data (app version, device type, error codes). No personal or email content is attached.</p>
        </button>

        {/* App info */}
        <div className="bg-muted rounded-2xl p-3.5">
          {[["App version", "1.0.0 (42)"], ["iOS version", "18.4"], ["Device", "iPhone 14 Pro"]].map(([k, v]) => (
            <div key={k} className="flex gap-3 mb-1 last:mb-0">
              <span className="text-[11px] text-muted-foreground w-24 flex-shrink-0">{k}</span>
              <span className="text-[11px] font-mono text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function AboutOnwardScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>

        <div className="flex flex-col items-center py-8 px-5 text-center">
          <div className="w-20 h-20 rounded-[24px] bg-[#1C2B3A] flex items-center justify-center mb-4 shadow-lg">
            <Plane size={32} className="text-white" style={{ transform: "rotate(-15deg)" }} />
          </div>
          <h1 className="text-[28px] leading-none mb-1" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Onward</h1>
          <p className="text-[14px] text-muted-foreground mb-1">Your journeys, organised.</p>
          <p className="text-[12px] text-muted-foreground">Version 1.0.0 · Build 42</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Website", value: "onward.app", icon: <ExternalLink size={13} /> },
            { label: "Privacy Policy", value: "onward.app/privacy", icon: <ExternalLink size={13} /> },
            { label: "Terms of Service", value: "onward.app/terms", icon: <ExternalLink size={13} /> },
            { label: "Open-source licences", value: "View", icon: <ChevronRight size={13} /> },
            { label: "Support", value: "hello@onward.app", icon: <ExternalLink size={13} /> },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5 cursor-pointer active:bg-muted/40", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-[13px]">{row.value}</span>
                {row.icon}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground px-8 leading-relaxed">
          Made with care for travellers who want to spend less time managing bookings and more time exploring.
        </p>
      </div>
    </Scroll>
  );
}


// ─── Screen: Launch / Session Resolution ─────────────────────────────────────

export function LaunchScreen({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden px-5 pb-7 pt-4"
      style={{ background: "#F5F7F6", fontFamily: "'Figtree', sans-serif" }}
    >
      <div className="flex h-10 flex-shrink-0 items-center justify-center">
        <p
          className="text-[23px] leading-none text-[#153E4A]"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Onward
        </p>
      </div>

      <div className="relative mt-3 h-[342px] flex-shrink-0 overflow-hidden rounded-[32px] border border-[#DDE4E3] bg-[#BDE3DC] shadow-[0_18px_48px_rgba(21,62,74,0.14)]">
        <div className="absolute -left-[88px] -top-[64px] h-[280px] w-[230px] rotate-[-39deg] rounded-[38px] bg-[#F2765E]" />
        <div className="absolute -right-[78px] -top-[28px] h-[210px] w-[210px] rotate-[31deg] rounded-[36px] bg-[#EEEAE1]" />
        <div className="absolute right-[18px] top-[52px] h-[156px] w-[148px] rotate-[-34deg] overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute h-[11px] w-[180px] rounded-full bg-[#172126]"
              style={{ top: i * 26, left: -16 }}
            />
          ))}
        </div>
        <div className="absolute -bottom-[86px] -right-[62px] h-[230px] w-[235px] rotate-[-12deg] rounded-[46px] bg-[#153E4A]" />
        <div className="absolute -bottom-[48px] -left-[52px] h-[150px] w-[190px] rotate-[22deg] rounded-[36px] bg-white/40" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 350 430" fill="none" aria-hidden="true">
          <path d="M30 84 L96 152 L96 276 L148 330" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <path d="M294 72 L230 132 L246 214 L188 270" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.82" />
          <path d="M68 330 C108 296 153 295 198 330 C226 352 253 359 292 340" stroke="#153E4A" strokeWidth="3" strokeLinecap="round" opacity="0.38" />
          <circle cx="96" cy="152" r="6" fill="#153E4A" />
          <circle cx="188" cy="270" r="6" fill="#F2765E" />
          <circle cx="292" cy="340" r="6" fill="#1E7A78" />
        </svg>

        <div className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-white/70 bg-white/90 px-4 py-3 shadow-[0_16px_36px_rgba(21,62,74,0.16)] backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1E7A78]" />
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#1E7A78]">Next</span>
            </div>
            <span className="text-[11px] font-semibold text-[#68757B]">15:30</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold leading-tight text-[#172126]">Train to Porto</p>
              <p className="mt-0.5 text-[11px] text-[#68757B]">Platform 2 · Seat 22A</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#153E4A] shadow-[0_8px_18px_rgba(21,62,74,0.18)]">
              <Train size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <h1
          className="mx-auto max-w-[300px] text-[32px] font-bold leading-[1.05] text-[#172126]"
        >
          Travel plans, calmly organised.
        </h1>
        <p className="mx-auto mt-4 max-w-[276px] text-[14px] font-medium leading-[1.28] text-[#68757B]">
          Your reservations become clear, calm Journey plans.
        </p>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={onDone}
          className="flex h-[54px] w-full items-center justify-center rounded-full bg-[#172126] text-[15px] font-bold text-white shadow-[0_16px_32px_rgba(23,33,38,0.22)] active:opacity-90"
        >
          Get started
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Add / Edit Reservation ──────────────────────────────────────────

export function AddEditReservationScreen({
  mode = "add", onSave, onCancel,
}: {
  mode?: "add" | "edit";
  onSave: () => void;
  onCancel: () => void;
}) {
  const types = [
    { id: "flight",     label: "Flight",     icon: <Plane size={16} /> },
    { id: "stay",       label: "Stay",       icon: <Hotel size={16} /> },
    { id: "transport",  label: "Transport",  icon: <Train size={16} /> },
    { id: "activity",   label: "Activity",   icon: <Ticket size={16} /> },
    { id: "restaurant", label: "Restaurant", icon: <UtensilsCrossed size={16} /> },
    { id: "note",       label: "Note",       icon: <FileText size={16} /> },
    { id: "custom",     label: "Custom",     icon: <Star size={16} /> },
  ] as const;

  type ResType = typeof types[number]["id"];

  const [resType, setResType] = useState<ResType>(mode === "edit" ? "flight" : "flight");
  const [allDay, setAllDay] = useState(false);
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";

  const typeFields: Record<ResType, { label: string; placeholder: string }[]> = {
    flight: [
      { label: "Airline", placeholder: "e.g. TAP Air Portugal" },
      { label: "Flight number", placeholder: "e.g. TP1923" },
      { label: "Origin airport", placeholder: "e.g. LIS" },
      { label: "Destination airport", placeholder: "e.g. OPO" },
      { label: "Terminal (departure)", placeholder: "e.g. T1" },
      { label: "Gate", placeholder: "e.g. A22" },
      { label: "Seat", placeholder: "e.g. 14A" },
    ],
    stay: [
      { label: "Property name", placeholder: "e.g. The Yeatman Hotel" },
      { label: "Address", placeholder: "Full address" },
      { label: "Check-in time", placeholder: "e.g. 15:00" },
      { label: "Checkout time", placeholder: "e.g. 12:00" },
      { label: "Phone", placeholder: "Hotel contact number" },
    ],
    transport: [
      { label: "Transport type", placeholder: "e.g. Train, Bus, Ferry" },
      { label: "Provider", placeholder: "e.g. Comboios de Portugal" },
      { label: "Service number", placeholder: "e.g. AP 122" },
      { label: "Origin", placeholder: "e.g. Lisboa Oriente" },
      { label: "Destination", placeholder: "e.g. Porto Campanhã" },
      { label: "Platform", placeholder: "e.g. 2" },
      { label: "Seat", placeholder: "e.g. 22A" },
    ],
    activity: [
      { label: "Activity name", placeholder: "e.g. Pastéis de Belém Tour" },
      { label: "Venue", placeholder: "e.g. Fábrica de Pastéis de Belém" },
      { label: "Ticket / booking ref", placeholder: "e.g. ACT-771-88" },
    ],
    restaurant: [
      { label: "Venue", placeholder: "e.g. Taberna da Rua das Flores" },
      { label: "Reservation time", placeholder: "e.g. 20:00" },
      { label: "Party size", placeholder: "e.g. 2" },
      { label: "Contact", placeholder: "Restaurant phone number" },
    ],
    note: [],
    custom: [
      { label: "Category", placeholder: "e.g. Visa, Museum, Transfer" },
    ],
  };

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={onCancel} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">{mode === "edit" ? "Edit Reservation" : "Add Plan"}</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>

        {/* Type picker */}
        <div className="mb-5">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2 block">Type</label>
          <div className="grid grid-cols-4 gap-2">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setResType(t.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 rounded-2xl border-2 text-[11px] font-semibold transition-all",
                  resType === t.id ? "border-[#1C2B3A] bg-card text-foreground shadow-sm" : "border-border bg-card text-muted-foreground"
                )}
              >
                <span className={resType === t.id ? "text-[#1C2B3A]" : "text-muted-foreground"}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Common fields */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Title</label>
            <input className={fieldCls} placeholder={mode === "edit" ? "Alfa Pendular AP 122" : "Add a title…"} defaultValue={mode === "edit" ? "Alfa Pendular AP 122" : ""} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Start</label>
              <input type="date" className={fieldCls} defaultValue={mode === "edit" ? "2026-06-30" : ""} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">End</label>
              <input type="date" className={fieldCls} defaultValue={mode === "edit" ? "2026-06-30" : ""} />
            </div>
          </div>

          {!allDay && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Start time</label>
                <input type="time" className={fieldCls} defaultValue={mode === "edit" ? "15:30" : ""} />
              </div>
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">End time</label>
                <input type="time" className={fieldCls} defaultValue={mode === "edit" ? "17:45" : ""} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3.5">
            <span className="text-[14px] font-medium">All-day</span>
            <button onClick={() => setAllDay((v) => !v)} className={cn("w-12 h-7 rounded-full relative transition-colors", allDay ? "bg-[#1C2B3A]" : "bg-muted")}>
              <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", allDay ? "left-6" : "left-1")} />
            </button>
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Location</label>
            <input className={fieldCls} placeholder="Address or place name" defaultValue={mode === "edit" ? "Lisboa Oriente Station" : ""} />
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Confirmation number</label>
            <input className={fieldCls} placeholder="Booking reference" defaultValue={mode === "edit" ? "CP-882-4419" : ""} />
          </div>
        </div>

        {/* Type-specific fields */}
        {typeFields[resType].length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2">
              {types.find((t) => t.id === resType)?.label} details
            </p>
            <div className="space-y-3">
              {typeFields[resType].map((f) => (
                <div key={f.label}>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label>
                  <input className={fieldCls} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label>
          <textarea className={cn(fieldCls, "resize-none h-20 leading-relaxed")} placeholder="Any notes about this reservation…" />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Move Reservation ─────────────────────────────────────────────────

export function MoveReservationScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const journeys = [
    { name: "Copenhagen", dates: "18 – 22 Aug 2026", status: "upcoming", match: true },
    { name: "Tokyo & Kyoto", dates: "12 – 26 Nov 2026", status: "upcoming", match: false },
    { name: "New York", dates: "3 – 8 Mar 2026", status: "past", match: false },
  ];

  const filtered = journeys.filter((j) => j.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <BackBtn label="Reservation" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Move to Journey</h2>
          <button
            className={cn("font-bold text-[15px]", selected !== null ? "text-[#E07B5A]" : "text-muted-foreground")}
            onClick={() => selected !== null && onBack()}
          >
            Move
          </button>
        </div>

        {/* Reservation being moved */}
        <div className="flex items-center gap-3 bg-muted rounded-2xl px-3.5 py-2.5 mb-3">
          <div className="w-7 h-7 rounded-xl bg-[#1C2B3A] flex items-center justify-center flex-shrink-0">
            <Train size={13} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate">Alfa Pendular AP 122</p>
            <p className="text-[11px] text-muted-foreground">Currently in: Lisbon & Porto</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3.5 h-10">
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60"
            placeholder="Search journeys…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2" style={{ scrollbarWidth: "none" }}>
        {filtered.map((j, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "w-full flex items-center gap-3.5 rounded-3xl p-4 border-2 text-left transition-all",
              selected === i ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card"
            )}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
              selected === i ? "border-[#1C2B3A]" : "border-muted-foreground/30"
            )}>
              {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[15px]">{j.name}</p>
                {j.match && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Best match</span>
                )}
              </div>
              <p className="text-[12px] text-muted-foreground mt-0.5">{j.dates}</p>
            </div>
            <StatusPill status={j.status} />
          </button>
        ))}

        <button className="w-full flex items-center gap-3.5 rounded-3xl p-4 border border-dashed border-muted-foreground/30 text-left active:opacity-70">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-[14px]">Create new Journey</p>
            <p className="text-[11px] text-muted-foreground">Start a new trip with this reservation</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Delete Reservation Confirmation ──────────────────────────────────

export function DeleteReservationConfirmScreen({ onDelete, onCancel, isImported = true }: {
  onDelete: () => void;
  onCancel: () => void;
  isImported?: boolean;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [ignoreEmails, setIgnoreEmails] = useState(false);

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h2 className="text-[24px] font-bold mb-1">Delete reservation?</h2>
        <p className="text-[14px] text-muted-foreground mb-6 leading-relaxed">
          <span className="font-semibold text-foreground">Alfa Pendular AP 122</span> will be permanently removed from{" "}
          <span className="font-semibold text-foreground">Lisbon & Porto</span>.
        </p>

        {/* What gets removed */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-4 mb-4">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-3">Will be removed</p>
          {[
            "Reservation details and times",
            "Seat and platform information",
            "Notes attached to this reservation",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <X size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-[13px] text-red-800">{item}</span>
            </div>
          ))}
        </div>

        {isImported && (
          <div className="bg-card border border-border rounded-3xl p-4 mb-5">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Imported reservation</p>
            <button
              onClick={() => setIgnoreEmails((v) => !v)}
              className="flex items-start gap-3 w-full text-left active:opacity-70"
            >
              <div className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                ignoreEmails ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30"
              )}>
                {ignoreEmails && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <div>
                <p className="text-[14px] font-semibold">Ignore future matching emails</p>
                <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                  Stop Onward importing similar emails from this provider in future scans.
                </p>
              </div>
            </button>
          </div>
        )}

        <button
          onClick={() => setConfirmed((c) => !c)}
          className="flex items-center gap-3 active:opacity-70 w-full"
        >
          <div className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            confirmed ? "bg-red-500 border-red-500" : "border-muted-foreground/30"
          )}>
            {confirmed && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <span className="text-[13px] text-muted-foreground text-left">I understand this cannot be undone</span>
        </button>
      </div>

      <div className="space-y-2.5 mt-6">
        <button
          onClick={confirmed ? onDelete : undefined}
          className={cn(
            "w-full h-[52px] rounded-2xl font-bold text-[15px] transition-all",
            confirmed ? "bg-red-500 text-white active:opacity-90" : "bg-red-100 text-red-300 cursor-not-allowed"
          )}
        >
          Delete reservation
        </button>
        <button onClick={onCancel} className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] active:opacity-70">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Reservation Change History ──────────────────────────────────────

export function ReservationChangeHistoryScreen({ onBack }: { onBack: () => void }) {
  const changes = [
    {
      date: "29 Jun 2026 · 11:42",
      source: "CP Rail confirmation email",
      sourceType: "provider",
      fields: [
        { field: "Departure time", before: "15:00", after: "15:30" },
        { field: "Platform", before: "3", after: "2" },
      ],
    },
    {
      date: "22 Jun 2026 · 09:15",
      source: "Edited by you",
      sourceType: "user",
      fields: [
        { field: "Seat", before: "—", after: "22A" },
        { field: "Notes", before: "—", after: "Allow 30 min to reach Oriente" },
      ],
    },
    {
      date: "16 Jun 2026 · 14:22",
      source: "CP Rail confirmation email",
      sourceType: "provider",
      fields: [
        { field: "Reservation imported", before: "", after: "" },
        { field: "Departure", before: "", after: "15:00 · Lisboa Oriente" },
        { field: "Arrival", before: "", after: "17:45 · Porto Campanhã" },
        { field: "Confirmation", before: "", after: "CP-882-4419" },
      ],
      initial: true,
    },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4">
          <BackBtn label="Reservation" onPress={onBack} />
        </div>

        {/* Reservation header */}
        <div className="px-5 pb-4">
          <h1 className="text-[22px] font-bold">Change history</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-6 h-6 rounded-lg bg-[#1C2B3A] flex items-center justify-center flex-shrink-0">
              <Train size={12} className="text-white" />
            </div>
            <p className="text-[13px] text-muted-foreground">Alfa Pendular AP 122 · Lisbon & Porto</p>
          </div>
        </div>

        <div className="px-5 space-y-3">
          {changes.map((change, ci) => (
            <div
              key={ci}
              className={cn(
                "bg-card border rounded-3xl overflow-hidden shadow-sm",
                change.initial ? "border-emerald-200" : "border-border"
              )}
            >
              {/* Change header */}
              <div className={cn(
                "flex items-center justify-between px-5 py-3 border-b border-border",
                change.initial && "bg-emerald-50/50"
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0",
                    change.sourceType === "provider" ? "bg-sky-50" : "bg-purple-50"
                  )}>
                    {change.sourceType === "provider"
                      ? <Mail size={12} className="text-sky-600" />
                      : <User size={12} className="text-purple-600" />
                    }
                  </div>
                  <span className="text-[12px] font-semibold">{change.source}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{change.date}</span>
              </div>

              {/* Changed fields */}
              <div>
                {change.fields.map((f, fi) => (
                  <div
                    key={fi}
                    className={cn(
                      "px-5 py-3",
                      fi < change.fields.length - 1 && "border-b border-border"
                    )}
                  >
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                      {f.field}
                    </p>
                    {f.before && f.after ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-muted-foreground line-through">{f.before}</span>
                        <ArrowRight size={13} className="text-muted-foreground flex-shrink-0" />
                        <span className="text-[13px] font-semibold text-emerald-700">{f.after}</span>
                      </div>
                    ) : f.after ? (
                      <span className="text-[13px] font-semibold">{f.after}</span>
                    ) : (
                      <span className="text-[13px] text-emerald-700 font-semibold">Added</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen: Notification Permission Primer ───────────────────────────────────

export function NotificationPermissionPrimerScreen({ onEnable, onSkip }: {
  onEnable: () => void;
  onSkip: () => void;
}) {
  const notifications = [
    { icon: <Plane size={16} />, label: "Upcoming reservations", desc: "Reminders before flights, trains, check-ins", color: "bg-sky-50 text-sky-600" },
    { icon: <Hotel size={16} />, label: "Hotel check-in & checkout", desc: "Timely nudges so you never miss a deadline", color: "bg-amber-50 text-amber-600" },
    { icon: <AlertCircle size={16} />, label: "Booking updates", desc: "Changes detected from new confirmation emails", color: "bg-purple-50 text-purple-600" },
    { icon: <X size={16} />, label: "Cancellations", desc: "Immediately alerted when a reservation is cancelled", color: "bg-red-50 text-red-500" },
    { icon: <CheckCircle size={16} />, label: "Imports needing review", desc: "When a new import needs your attention", color: "bg-emerald-50 text-emerald-600" },
    { icon: <Mail size={16} />, label: "Gmail connection issues", desc: "If your inbox connection expires or fails", color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-16 h-16 rounded-3xl bg-[#E07B5A] flex items-center justify-center mb-6 shadow-lg">
          <Bell size={28} className="text-white" />
        </div>

        <h2 className="text-[26px] font-bold leading-tight mb-2">Stay on top of your trips</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-7">
          Enable notifications so Onward can keep you informed before and during your journeys. You can customise these any time in Settings.
        </p>

        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div key={n.label} className="flex items-start gap-3.5 bg-card border border-border rounded-2xl p-4 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", n.color)}>
                {n.icon}
              </div>
              <div>
                <p className="text-[14px] font-semibold">{n.label}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 mt-7">
        <button
          onClick={onEnable}
          className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
        >
          <Bell size={16} />
          Enable Notifications
        </button>
        <button
          onClick={onSkip}
          className="w-full h-[52px] border border-border rounded-2xl font-semibold text-[15px] text-muted-foreground active:opacity-70"
        >
          Not Now
        </button>
      </div>
    </div>
  );
}
