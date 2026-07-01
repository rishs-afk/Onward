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
import {
  Screen, Tab, cn, Scroll, StatusPill, BackBtn,
  JourneyNavBar, PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

// ─── Phase 2 Screens ──────────────────────────────────────────────────────────
export function ConnectMicrosoftScreen({ onConnect, onCancel }: { onConnect: () => void; onCancel: () => void }) {
  const [state, setState] = useState<"default" | "loading" | "denied" | "failed" | "org">("default");

  if (state === "loading") return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-full bg-[#0078D4]/10 flex items-center justify-center mb-6">
        <RefreshCw size={28} className="text-[#0078D4]" style={{ animation: "spin 1.5s linear infinite" }} />
      </div>
      <h2 className="text-[20px] font-bold mb-2">Connecting to Microsoft…</h2>
      <p className="text-[13px] text-muted-foreground">Waiting for authorisation</p>
      <button onClick={() => setState("failed")} className="mt-8 text-[13px] text-muted-foreground">Cancel</button>
    </div>
  );

  if (state === "denied") return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><X size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Permission denied</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Onward was not granted access to your Microsoft inbox. You can try again or connect a different inbox.</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Try again" onClick={() => setState("default")} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );

  if (state === "failed") return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4"><AlertCircle size={24} className="text-amber-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Connection failed</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Onward could not reach Microsoft's authentication service. Check your connection and try again.</p>
        <p className="text-[11px] font-mono bg-muted rounded-xl px-3 py-2 text-muted-foreground">Error: MSFT_AUTH_TIMEOUT</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry" onClick={() => setState("loading")} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );

  if (state === "org") return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4"><Lock size={24} className="text-slate-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Organisational account</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">Your Microsoft 365 account is managed by an organisation that restricts third-party app access. Onward cannot connect to this inbox.</p>
        <div className="bg-muted rounded-2xl p-4">
          <p className="text-[12px] text-muted-foreground leading-relaxed">You can still use Onward by forwarding confirmation emails to your personal forwarding address, or by connecting a personal Outlook.com or Hotmail account.</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Use forwarding address instead" onClick={onCancel} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn onPress={onCancel} />
        <div className="mt-5 mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#0078D4" }}>
            <Mail size={26} className="text-white" />
          </div>
          <h2 className="text-[24px] font-bold tracking-tight leading-tight">Connect your Microsoft inbox</h2>
          <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">Onward searches for supported travel confirmations and imports them automatically. Read-only access only.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="mb-4 pb-4 border-b border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Onward will never</p>
            {["Send email on your behalf", "Delete or move messages", "Mark messages as read", "Access non-travel emails"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0"><X size={11} className="text-red-500" /></div>
                <span className="text-[13px]">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Supported account types</p>
          {[
            { label: "Outlook.com", sub: "Personal Microsoft accounts" },
            { label: "Hotmail", sub: "Legacy personal accounts" },
            { label: "Microsoft 365", sub: "Business accounts (if permitted by org)" },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#0078D4" }}><Mail size={14} className="text-white" /></div>
              <div><p className="text-[13px] font-semibold">{a.label}</p><p className="text-[11px] text-muted-foreground">{a.sub}</p></div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-muted rounded-2xl p-3.5 mb-6">
          <Shield size={14} className="text-[#1C2B3A] mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">Read-only access. Onward processes travel emails and discards raw content. <span className="text-[#E07B5A] font-medium">Email privacy details →</span></p>
        </div>

        <div className="space-y-2.5">
          <button onClick={() => setState("loading")} className="w-full h-[52px] rounded-2xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 active:opacity-90" style={{ background: "#0078D4" }}>
            <Mail size={16} />Connect Microsoft
          </button>
          <SecondaryBtn label="Cancel" onClick={onCancel} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 2 — Microsoft Inbox Connected ───────────────────────────

export function MicrosoftConnectedScreen({ onScan, onSkip }: { onScan: () => void; onSkip: () => void }) {
  const [range, setRange] = useState(1);
  const ranges = ["Last 30 days", "Last 90 days", "Last 12 months", "Custom range"];

  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center" style={{ background: "#0078D4" }}>
              <Mail size={14} className="text-white" />
            </div>
          </div>
          <h2 className="text-[24px] font-bold mb-1">Microsoft connected</h2>
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0"><Check size={11} className="text-white" strokeWidth={3} /></div>
            <span className="text-[14px] font-semibold">sarah.chen@outlook.com</span>
          </div>
        </div>

        <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Scan range</p>
        <div className="space-y-2 mb-5">
          {ranges.map((r, i) => (
            <button key={r} onClick={() => setRange(i)} className={cn("w-full flex items-center gap-3 rounded-2xl p-3.5 border-2 text-left transition-all", range === i ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", range === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {range === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
              </div>
              <span className="text-[14px] font-semibold">{r}</span>
              {i === 1 && <span className="text-[10px] font-bold text-[#E07B5A] bg-[#E07B5A]/10 px-2 py-0.5 rounded-full ml-auto">Recommended</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Find my reservations" onClick={onScan} />
        <SecondaryBtn label="Skip for now" onClick={onSkip} />
        <button className="w-full text-[13px] text-[#E07B5A] font-semibold">Connect another inbox</button>
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 3 — Forward a Confirmation ──────────────────────────────

export function ForwardConfirmationScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <BackBtn label="Imports" onPress={onBack} />
        <div className="mt-5 mb-6">
          <h2 className="text-[24px] font-bold tracking-tight">Forward a confirmation</h2>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">Import a booking without connecting an inbox. Forward confirmation emails directly to Onward.</p>
        </div>

        {/* Forwarding address card */}
        <div className="bg-[#1C2B3A] rounded-3xl p-5 mb-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={13} className="text-white/50" />
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Your private forwarding address</span>
          </div>
          <p className="font-mono text-[14px] text-white font-semibold leading-tight mb-4 break-all">plans+7K9M4X@import.onward.app</p>
          <div className="flex gap-2">
            <button onClick={handleCopy} className={cn("flex-1 h-10 rounded-2xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-all", copied ? "bg-emerald-500 text-white" : "bg-white/15 text-white active:bg-white/25")}>
              {copied ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy address</>}
            </button>
            <button className="flex-1 h-10 rounded-2xl bg-white/15 font-semibold text-[13px] text-white flex items-center justify-center gap-2 active:bg-white/25">
              <Share2 size={14} />Share
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">How to forward</p>
          {[
            { n: "1", text: "Open the confirmation email in your email app" },
            { n: "2", text: "Forward it to your Onward address above" },
            { n: "3", text: "Onward processes it and notifies you when done" },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3.5 mb-3 last:mb-0">
              <div className="w-7 h-7 rounded-full bg-[#E07B5A] flex items-center justify-center flex-shrink-0 text-white font-bold text-[12px]">{step.n}</div>
              <p className="text-[13px] leading-snug pt-1">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-muted rounded-2xl p-3.5 mb-6">
          <Shield size={14} className="text-[#1C2B3A] mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">Forwarded reservations go through the same review and duplicate-detection as inbox imports. Unsupported content is safely discarded.</p>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <Inbox size={15} className="text-muted-foreground" />View import history<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <RefreshCw size={15} className="text-muted-foreground" />Regenerate address<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <X size={15} />Disable forwarding address
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 4 — Forwarded Email Received ────────────────────────────

export function ForwardedEmailReceivedScreen({ onBack }: { onBack: () => void }) {
  const [variant, setVariant] = useState<"success" | "review" | "duplicate" | "unsupported" | "failed">("success");

  const variants = {
    success:     { icon: <CheckCircle size={28} className="text-emerald-500" />, bg: "bg-emerald-50", label: "Imported successfully", color: "text-emerald-700" },
    review:      { icon: <AlertCircle size={28} className="text-amber-600" />, bg: "bg-amber-50", label: "Needs review", color: "text-amber-700" },
    duplicate:   { icon: <ArrowLeftRight size={28} className="text-purple-600" />, bg: "bg-purple-50", label: "Duplicate detected", color: "text-purple-700" },
    unsupported: { icon: <FileText size={28} className="text-slate-500" />, bg: "bg-slate-100", label: "Unsupported format", color: "text-slate-700" },
    failed:      { icon: <AlertCircle size={28} className="text-red-500" />, bg: "bg-red-50", label: "Processing failed", color: "text-red-700" },
  };

  const v = variants[variant];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold">Forwarded email</h2>
          <button onClick={onBack}><X size={20} className="text-muted-foreground" /></button>
        </div>
        {/* Variant picker for demo */}
        <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {(Object.keys(variants) as (keyof typeof variants)[]).map((k) => (
            <button key={k} onClick={() => setVariant(k)} className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors", variant === k ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={{ scrollbarWidth: "none" }}>
        <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-4", v.bg)}>{v.icon}</div>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-[11px] font-bold uppercase tracking-widest", v.color)}>{v.label}</span>
        </div>
        <h3 className="text-[20px] font-bold mb-4">
          {variant === "success" ? "TAP Air Portugal flight added" :
           variant === "review" ? "Review needed before importing" :
           variant === "duplicate" ? "Possible duplicate found" :
           variant === "unsupported" ? "Email format not supported" : "Could not process this email"}
        </h3>

        <div className="bg-muted rounded-3xl p-4 mb-4">
          {[
            { label: "Subject", value: "Your flight confirmation — TP1923" },
            { label: "From", value: "bookings@flytap.com" },
            { label: "Detected", value: variant === "unsupported" ? "Travel email (unreadable format)" : "Flight · TAP Air Portugal" },
            { label: "Journey", value: variant === "success" ? "Lisbon & Porto" : "—" },
          ].map((row) => (
            <div key={row.label} className="flex gap-3 mb-1.5 last:mb-0">
              <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
              <span className="text-[12px] font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-8 space-y-2.5">
        {variant === "success" && <PrimaryBtn label="View Journey" />}
        {(variant === "review" || variant === "duplicate") && <PrimaryBtn label="Review Import" />}
        {(variant === "unsupported" || variant === "failed") && <PrimaryBtn label="Add manually" />}
        <SecondaryBtn label="Dismiss" onClick={onBack} />
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 5 — Journey Map ─────────────────────────────────────────

export const MAP_PINS = [
  { id: 0, x: 48, y: 32, type: "flight", label: "Humberto Delgado Airport", icon: <Plane size={13} />, color: "#0078D4", active: false },
  { id: 1, x: 30, y: 52, type: "hotel", label: "Hotel Vista do Tejo", icon: <Hotel size={13} />, color: "#E07B5A", active: true },
  { id: 2, x: 52, y: 68, type: "train", label: "Lisboa Oriente Station", icon: <Train size={13} />, color: "#1C2B3A", active: false },
  { id: 3, x: 70, y: 48, type: "restaurant", label: "Taberna da Rua das Flores", icon: <UtensilsCrossed size={13} />, color: "#059669", active: false },
  { id: 4, x: 75, y: 72, type: "hotel", label: "The Yeatman Hotel", icon: <Hotel size={13} />, color: "#E07B5A", active: false },
];

export function JourneyMapScreen({ onBack, onPin, onList, onTimeline, onDocuments }: {
  onBack: () => void; onPin: () => void; onList: () => void;
  onTimeline: () => void; onDocuments: () => void;
}) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {/* Header */}
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Journeys" onPress={onBack} />
          <div className="text-right">
            <p className="text-[13px] font-bold">Lisbon & Porto</p>
            <p className="text-[11px] text-muted-foreground">27 Jun – 5 Jul</p>
          </div>
        </div>
        <JourneyNavBar active="map" onTimeline={onTimeline} onMap={() => {}} onDocuments={onDocuments} />
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E8E4DC 0%, #DDD8CE 40%, #D4D0C4 100%)" }}>
          {/* Terrain blocks */}
          <div className="absolute top-[20%] left-[5%] w-[30%] h-[25%] rounded-3xl opacity-30" style={{ background: "#C8C4B8" }} />
          <div className="absolute top-[55%] left-[60%] w-[35%] h-[20%] rounded-3xl opacity-20" style={{ background: "#C0BCA8" }} />
          {/* "Water" block */}
          <div className="absolute top-[15%] right-0 w-[25%] h-[40%] opacity-40" style={{ background: "#B8D4E0" }} />
          {/* Streets */}
          {[[22,30,68,30],[22,30,22,75],[22,75,75,75],[50,30,50,75],[22,55,75,55]].map(([x1,y1,x2,y2], i) => (
            <svg key={i} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
              <line x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="#B8B4A8" strokeWidth="3" />
            </svg>
          ))}
          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline points={MAP_PINS.map(p => `${p.x}%,${p.y}%`).join(" ")} fill="none" stroke="#E07B5A" strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
          </svg>
        </div>

        {/* Day filter strip */}
        <div className="absolute top-2 left-3 right-3 flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["All", "Today", "28", "29", "30", "1", "2", "3"].map((d, i) => (
            <button key={d} onClick={() => setSelectedDay(selectedDay === i ? null : i)}
              className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 shadow-sm transition-all", selectedDay === i ? "bg-[#1C2B3A] text-white" : "bg-card/90 text-foreground")}>
              {d}
            </button>
          ))}
        </div>

        {/* Map pins */}
        {MAP_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => { setSelectedPin(pin.id); onPin(); }}
            className="absolute flex flex-col items-center"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-100%)" }}
          >
            <div className={cn("flex items-center justify-center rounded-full shadow-lg border-2 transition-all", pin.active ? "w-11 h-11 border-white" : "w-9 h-9 border-white/80")}
              style={{ background: pin.color }}>
              <span className="text-white">{pin.icon}</span>
            </div>
            {pin.active && (
              <div className="mt-1 bg-card rounded-xl px-2 py-1 shadow-md border border-border">
                <p className="text-[10px] font-bold text-foreground whitespace-nowrap max-w-[120px] truncate">{pin.label}</p>
              </div>
            )}
            <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background: pin.color }} />
          </button>
        ))}

        {/* Controls */}
        <div className="absolute right-3 bottom-24 flex flex-col gap-2">
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center active:opacity-70">
            <Navigation size={16} className="text-[#1C2B3A]" />
          </button>
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center active:opacity-70">
            <MapPin size={16} className="text-[#1C2B3A]" />
          </button>
        </div>

        {/* List toggle */}
        <button onClick={onList} className="absolute left-3 bottom-24 bg-card rounded-2xl shadow-md border border-border px-3 py-2 flex items-center gap-1.5 active:opacity-70">
          <AlignLeft size={14} className="text-[#1C2B3A]" />
          <span className="text-[12px] font-semibold">List</span>
        </button>

        {/* Missing location warning */}
        <div className="absolute bottom-5 left-3 right-3 bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
          <AlertCircle size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-[12px] font-semibold text-amber-800 flex-1">1 reservation has no location</p>
          <button className="text-[12px] font-bold text-[#E07B5A]">Fix</button>
        </div>
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 6 — Map Location Detail Sheet ───────────────────────────

export function MapLocationDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {/* Partially visible map behind */}
      <div className="flex-1 relative" style={{ background: "linear-gradient(180deg,#E8E4DC,#DDD8CE)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#E07B5A] flex items-center justify-center shadow-xl border-4 border-white">
            <Hotel size={22} className="text-white" />
          </div>
        </div>
        <button onClick={onBack} className="absolute top-4 right-4 w-9 h-9 bg-card rounded-full shadow-md flex items-center justify-center">
          <X size={16} className="text-foreground" />
        </button>
      </div>

      {/* Bottom sheet */}
      <div className="flex-shrink-0 bg-card rounded-t-3xl shadow-2xl pt-2 pb-8">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
        <div className="px-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#E07B5A]/10 flex items-center justify-center flex-shrink-0">
              <Hotel size={20} className="text-[#E07B5A]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[17px] leading-tight">Hotel Vista do Tejo</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">Check-out · Mon 30 Jun · 12:00</p>
            </div>
          </div>

          {[
            { label: "Address", value: "Rua do Arsenal 78, 1100-038 Lisbon" },
            { label: "Day", value: "Day 4 — Monday 30 June" },
            { label: "Provider", value: "Vista do Tejo Hotels" },
          ].map((row) => (
            <div key={row.label} className="flex gap-3 mb-2.5">
              <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
              <span className="text-[12px] font-medium">{row.value}</span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { icon: <Navigation size={14} />, label: "Open in Maps" },
              { icon: <Globe size={14} />, label: "Google Maps" },
              { icon: <Copy size={14} />, label: "Copy address" },
              { icon: <Phone size={14} />, label: "Call venue" },
            ].map((a) => (
              <button key={a.label} className="flex items-center justify-center gap-2 bg-muted rounded-2xl h-10 text-[12px] font-semibold active:opacity-70">
                <span className="text-muted-foreground">{a.icon}</span>{a.label}
              </button>
            ))}
          </div>

          <button className="w-full mt-3 h-[46px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[14px] active:opacity-90">
            Open Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 7 — Journey Locations List ──────────────────────────────

export function JourneyLocationsListScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const days = [
    { label: "Day 1 · Fri 27 Jun", items: [
      { icon: <Plane size={14} />, title: "Humberto Delgado Airport", address: "Alameda das Comunidades Portuguesas, Lisbon", time: "Arrives 14:30" },
      { icon: <Hotel size={14} />, title: "Hotel Vista do Tejo", address: "Rua do Arsenal 78, Lisbon", time: "Check-in 15:00" },
    ]},
    { label: "Day 4 · Mon 30 Jun", items: [
      { icon: <Hotel size={14} />, title: "Hotel Vista do Tejo", address: "Rua do Arsenal 78, Lisbon", time: "Check-out 12:00" },
      { icon: <Train size={14} />, title: "Lisboa Oriente Station", address: "Av. Dom João II, Lisbon", time: "Departs 15:30" },
      { icon: <UtensilsCrossed size={14} />, title: "Taberna da Rua das Flores", address: "R. das Flores 103, Lisbon", time: "20:00" },
    ]},
    { label: "Day 4+ · Porto", items: [
      { icon: <Hotel size={14} />, title: "The Yeatman Hotel", address: "Rua do Choupelo, Vila Nova de Gaia", time: "Check-in from 15:00", warn: true },
    ]},
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Map" onPress={onBack} />
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground"><Search size={18} /></button>
            <button className="text-muted-foreground"><Filter size={18} /></button>
          </div>
        </div>
        <div className="px-5 mb-4">
          <h1 className="text-[22px] font-bold">Locations</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto · 5 mapped locations</p>
        </div>

        {days.map((day) => (
          <div key={day.label} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{day.label}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {day.items.map((item, i) => (
                <div key={i} onClick={onItem} className={cn("flex items-center gap-3 px-4 py-3.5 cursor-pointer active:opacity-70", i < day.items.length - 1 && "border-b border-border")}>
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", item.warn ? "bg-amber-50 text-amber-600" : "bg-muted text-[#1C2B3A]")}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{item.address}</p>
                    <p className="text-[11px] text-muted-foreground">{item.time}</p>
                  </div>
                  <button className="flex-shrink-0"><Navigation size={14} className="text-[#E07B5A]" /></button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-5">
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
            <AlertCircle size={13} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-amber-800">The Yeatman Hotel address needs confirmation. <span className="font-bold underline">Add address →</span></p>
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 8 — Missing Location ────────────────────────────────────

export function MissingLocationScreen({ onBack }: { onBack: () => void }) {
  const [address, setAddress] = useState("");
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-muted rounded-t-3xl pt-2 pb-5 px-5">
        <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-4" />
        <div className="flex items-start gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0"><AlertCircle size={18} className="text-amber-600" /></div>
          <div><p className="font-bold text-[16px]">Location missing</p><p className="text-[12px] text-muted-foreground">The Yeatman Hotel</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <p className="text-[13px] text-muted-foreground mb-5 leading-relaxed">No address or coordinates were found for this reservation. Add a location so it appears on the Journey Map.</p>
        <div className="mb-4">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Search or enter address</label>
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 h-12">
            <Search size={15} className="text-muted-foreground flex-shrink-0" />
            <input className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/60" placeholder="Rua do Choupelo, Porto…" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          {[
            { icon: <MapPin size={14} />, label: "Use current location" },
            { icon: <Search size={14} />, label: "Search nearby places" },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
              <span className="text-muted-foreground">{a.icon}</span>{a.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 px-5 pb-8 space-y-2.5">
        <PrimaryBtn label="Save location" />
        <button onClick={onBack} className="w-full text-[14px] text-muted-foreground font-medium">Skip for now</button>
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 9 — Journey Documents Home ───────────────────────────────

export const DOCS = [
  { title: "Boarding Pass — TP1923", type: "PDF", category: "Boarding pass", reservation: "TAP Air Portugal", date: "27 Jun", downloaded: true, qr: true, important: true },
  { title: "Hotel Confirmation — Vista do Tejo", type: "PDF", category: "Stay", reservation: "Hotel Vista do Tejo", date: "27 Jun", downloaded: true, qr: false, important: false },
  { title: "Travel Insurance Policy", type: "PDF", category: "Insurance", reservation: null, date: "20 Jun", downloaded: false, qr: false, important: true },
  { title: "Yeatman Hotel Voucher", type: "PDF", category: "Stay", reservation: "The Yeatman Hotel", date: "15 Jun", downloaded: false, qr: true, important: false },
  { title: "Train Ticket AP 122", type: "PDF", category: "Tickets", reservation: "Alfa Pendular AP 122", date: "16 Jun", downloaded: true, qr: true, important: false },
];

export function JourneyDocumentsScreen({ onBack, onDoc, onAdd, onTimeline, onMap }: {
  onBack: () => void; onDoc: () => void; onAdd: () => void;
  onTimeline: () => void; onMap: () => void;
}) {
  const [filter, setFilter] = useState("all");
  const cats = ["All", "Boarding passes", "Tickets", "Stays", "Insurance", "Visa", "Other"];
  const visible = filter === "all" ? DOCS : DOCS.filter((d) => d.category.toLowerCase() === filter.replace(" passes", " pass"));
  const important = visible.filter((d) => d.important);
  const rest = visible.filter((d) => !d.important);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Journeys" onPress={onBack} />
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground"><Search size={18} /></button>
            <button onClick={onAdd} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center">
              <Plus size={16} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Lisbon & Porto</p>
        <JourneyNavBar active="documents" onTimeline={onTimeline} onMap={onMap} onDocuments={() => {}} />

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-3.5 py-2 mb-2">
          <CloudOff size={13} className="text-emerald-600" />
          <p className="text-[12px] font-semibold text-emerald-800 flex-1">3 of 5 documents available offline</p>
          <button className="text-[11px] font-bold text-[#E07B5A]">Manage</button>
        </div>
      </div>

      <div className="flex gap-2 px-5 mb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 transition-colors", filter === c.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ scrollbarWidth: "none" }}>
        {important.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Important</p>
            <div className="space-y-2">{important.map((doc, i) => <DocCard key={i} doc={doc} onTap={onDoc} />)}</div>
          </div>
        )}
        {rest.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">All documents</p>
            <div className="space-y-2">{rest.map((doc, i) => <DocCard key={i} doc={doc} onTap={onDoc} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DocCard({ doc, onTap }: { doc: typeof DOCS[0]; onTap: () => void }) {
  return (
    <div onClick={onTap} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70">
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
        <FileText size={18} className="text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold truncate">{doc.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">{doc.type}</span>
          {doc.reservation && <span className="text-[10px] text-muted-foreground truncate">{doc.reservation}</span>}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {doc.downloaded
          ? <div className="flex items-center gap-1 text-emerald-600"><CloudOff size={12} /><span className="text-[10px] font-bold">Offline</span></div>
          : <div className="flex items-center gap-1 text-muted-foreground"><Download size={12} /><span className="text-[10px] font-bold">Download</span></div>}
        {doc.qr && <QrCode size={12} className="text-muted-foreground" />}
      </div>
    </div>
  );
}

// ─── Phase 2: Screen 10 — Add Document ───────────────────────────────────────

export function AddDocumentScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [step, setStep] = useState<"pick" | "detail">("pick");
  const [category, setCategory] = useState("Boarding pass");
  const [important, setImportant] = useState(false);
  const [offline, setOffline] = useState(true);
  const [faceId, setFaceId] = useState(false);

  if (step === "pick") return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Add Document</h2>
          <div className="w-12" />
        </div>
      </div>
      <div className="flex-1 px-5 py-4 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {[
          { icon: <FolderOpen size={20} />, label: "Choose from Files", color: "bg-sky-50 text-sky-600" },
          { icon: <ImageIcon size={20} />, label: "Choose from Photos", color: "bg-purple-50 text-purple-600" },
          { icon: <ScanText size={20} />, label: "Scan Document", color: "bg-emerald-50 text-emerald-600" },
          { icon: <Smartphone size={20} />, label: "Take Photo", color: "bg-amber-50 text-amber-600" },
          { icon: <Copy size={20} />, label: "Import from Clipboard", color: "bg-muted text-muted-foreground" },
        ].map((opt) => (
          <button key={opt.label} onClick={() => setStep("detail")} className="w-full flex items-center gap-4 bg-card border border-border rounded-3xl p-4 text-left active:opacity-70">
            <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", opt.color)}>{opt.icon}</div>
            <p className="font-semibold text-[15px]">{opt.label}</p>
            <ChevronRight size={16} className="text-muted-foreground ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => setStep("pick")} className="text-muted-foreground font-semibold text-[15px]">Back</button>
          <h2 className="text-[17px] font-bold">Document details</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>

        {/* Preview */}
        <div className="bg-muted rounded-3xl h-32 flex items-center justify-center mb-5 border border-border">
          <FileText size={36} className="text-muted-foreground" />
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Document title</label>
            <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="Boarding Pass — TP1923" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {["Boarding pass", "Tickets", "Stay", "Insurance", "Visa", "Other"].map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={cn("px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors", category === c ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Mark as important", value: important, set: setImportant },
            { label: "Make available offline", value: offline, set: setOffline },
            { label: "Require Face ID", value: faceId, set: setFaceId },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button onClick={() => row.set(!row.value)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", row.value ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", row.value ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 11 — Document Detail ────────────────────────────────────

export function DocumentDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn onPress={onBack} />
          <button><MoreHorizontal size={20} className="text-muted-foreground" /></button>
        </div>

        {/* QR preview */}
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-6 mb-4 flex flex-col items-center shadow-lg">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-4">Boarding Pass</p>
          <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4">
            <QrCode size={120} className="text-[#1C2B3A]" />
          </div>
          <p className="text-white font-bold text-[17px]">TAP Air Portugal TP1923</p>
          <p className="text-white/60 text-[13px] mt-1">Lisbon → Porto · 27 Jun · Seat 22A</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Type", value: "PDF · Boarding pass" },
            { label: "Reservation", value: "TAP Air Portugal TP1923" },
            { label: "Journey", value: "Lisbon & Porto" },
            { label: "Added", value: "27 Jun 2026 · 14:20" },
            { label: "Offline", value: "Available" },
            { label: "Privacy", value: "Face ID required" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between items-center px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          {[
            { icon: <Share2 size={15} />, label: "Share" },
            { icon: <Pencil size={15} />, label: "Rename" },
            { icon: <Tag size={15} />, label: "Change category" },
            { icon: <ArrowRight size={15} />, label: "Attach to another reservation" },
            { icon: <CloudOff size={15} />, label: "Remove offline copy" },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
              <span className="text-muted-foreground">{a.icon}</span>{a.label}<ChevronRight size={14} className="text-muted-foreground ml-auto" />
            </button>
          ))}
          <button className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-[14px] font-semibold text-red-600 active:opacity-70">
            <Trash2 size={15} />Delete document
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screens 12–13 (Attach Document, Document Privacy) ───────────────

export function AttachDocumentScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <BackBtn onPress={onBack} />
          <h2 className="text-[17px] font-bold">Attach to reservation</h2>
          <button className="text-[#E07B5A] font-bold text-[15px]">Attach</button>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3.5 h-10 mt-3">
          <Search size={15} className="text-muted-foreground" />
          <input className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60" placeholder="Search reservations…" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2" style={{ scrollbarWidth: "none" }}>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Suggested</p>
        {[
          { icon: <Plane size={14} />, title: "TAP Air Portugal TP1923", sub: "27 Jun · Lisbon → Porto" },
          { icon: <Hotel size={14} />, title: "Hotel Vista do Tejo", sub: "27–30 Jun · Lisbon" },
          { icon: <Train size={14} />, title: "Alfa Pendular AP 122", sub: "30 Jun · Lisbon → Porto" },
        ].map((r, i) => (
          <button key={i} onClick={() => setSelected(i)} className={cn("w-full flex items-center gap-3.5 rounded-2xl p-4 border-2 text-left transition-all", selected === i ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
            <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", selected === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
              {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
            </div>
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{r.icon}</div>
            <div><p className="text-[13px] font-semibold">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.sub}</p></div>
          </button>
        ))}
        <button className="w-full flex items-center gap-3 rounded-2xl p-4 border border-dashed border-muted-foreground/30 text-left active:opacity-70">
          <Layers size={16} className="text-muted-foreground" />
          <span className="text-[13px] font-semibold text-muted-foreground">Keep at Journey level</span>
        </button>
      </div>
    </div>
  );
}

export function DocumentPrivacyScreen({ onBack }: { onBack: () => void }) {
  const rows = [
    { label: "Require Face ID for sensitive documents", value: true },
    { label: "Hide preview thumbnails in app", value: false },
    { label: "Lock when app enters background", value: true },
    { label: "Download documents on Wi-Fi only", value: true },
    { label: "Keep Journey documents offline automatically", value: false },
  ];
  const [toggles, setToggles] = useState(rows.map((r) => r.value));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Documents" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Document privacy</h1><p className="text-[13px] text-muted-foreground mt-1">Documents are stored locally on your device and never uploaded to external servers.</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-4">
          {rows.map((row, i) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < rows.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium flex-1 pr-4">{row.label}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
        <div className="mx-5 bg-muted rounded-2xl p-4">
          <div className="flex items-start gap-2.5"><Lock size={13} className="text-muted-foreground mt-0.5 flex-shrink-0" /><p className="text-[12px] text-muted-foreground leading-relaxed">Documents are encrypted using iOS Data Protection. Face ID authentication uses the Secure Enclave and biometric data never leaves your device.</p></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 14 — Journey Readiness ──────────────────────────────────

export function JourneyReadinessScreen({ onBack, onConflict }: { onBack: () => void; onConflict: () => void }) {
  const needsAttention = [
    { icon: <MapPin size={14} />, text: "Hotel address missing", reservation: "The Yeatman Hotel", severity: "high", action: "Add address" },
    { icon: <AlertCircle size={14} />, text: "Overlapping bookings on 30 Jun", reservation: "Train + Hotel check-out", severity: "high", action: "View conflict", onPress: onConflict },
    { icon: <FileText size={14} />, text: "1 unreviewed import", reservation: "TAP TP791", severity: "medium", action: "Review" },
    { icon: <Clock size={14} />, text: "Timezone ambiguous", reservation: "Porto → London flight", severity: "low", action: "Confirm" },
  ];
  const ready = [
    { icon: <Plane size={14} />, text: "Outbound flight confirmed" },
    { icon: <Hotel size={14} />, text: "Lisbon stay complete" },
    { icon: <FileText size={14} />, text: "3 documents downloaded offline" },
    { icon: <Bell size={14} />, text: "Journey notifications enabled" },
  ];
  const optional = [
    { icon: <UtensilsCrossed size={14} />, text: "Add a restaurant for Day 2" },
    { icon: <CloudOff size={14} />, text: "Download Porto map offline" },
    { icon: <Users size={14} />, text: "Add traveller details" },
    { icon: <Share2 size={14} />, text: "Share Journey with travel companions" },
  ];
  const sevColor: Record<string, string> = { high: "bg-red-50 border-red-100 text-red-600", medium: "bg-amber-50 border-amber-100 text-amber-600", low: "bg-sky-50 border-sky-100 text-sky-600" };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="text-[11px]">Checked just now</p>
            <button><RefreshCw size={14} /></button>
          </div>
        </div>
        <div className="px-5 pb-4">
          <h1 className="text-[24px] font-bold">Journey Readiness</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Lisbon & Porto · 27 Jun – 5 Jul</p>
        </div>

        {[
          { title: "Needs attention", color: "text-red-600", items: needsAttention, attention: true },
          { title: "Ready", color: "text-emerald-700", items: ready, attention: false },
          { title: "Optional", color: "text-muted-foreground", items: optional, attention: false },
        ].map((group) => (
          <div key={group.title} className="mb-4">
            <p className={cn("px-5 text-[11px] font-bold uppercase tracking-widest mb-2", group.color)}>{group.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {group.items.map((item: any, i) => (
                <div key={i} className={cn("px-4 py-3.5 flex items-start gap-3", i < group.items.length - 1 && "border-b border-border")}>
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                    group.attention ? sevColor[item.severity] : group.title === "Ready" ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground")}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold leading-snug">{item.text}</p>
                    {item.reservation && <p className="text-[11px] text-muted-foreground mt-0.5">{item.reservation}</p>}
                  </div>
                  {item.action && (
                    <button onClick={item.onPress} className="text-[12px] font-bold text-[#E07B5A] flex-shrink-0 mt-1">{item.action}</button>
                  )}
                  {group.title === "Ready" && <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-1" />}
                  {group.title === "Optional" && <button className="text-muted-foreground flex-shrink-0 mt-1"><X size={14} /></button>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 15 — Conflict Details ───────────────────────────────────

export function ConflictDetailsScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Readiness" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><AlertCircle size={22} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Possible scheduling conflict</h1>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">This connection may be difficult. Your hotel check-out is at 12:00 and your train departs at 15:30, but the journey to Oriente station takes around 30 minutes.</p>
        </div>

        {/* Visual time comparison */}
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Monday 30 June</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center"><Hotel size={14} className="text-[#E07B5A]" /></div>
                <div><p className="text-[12px] font-semibold">Hotel checkout</p><p className="text-[11px] text-muted-foreground">12:00 noon</p></div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted-foreground/30 pl-3 py-1">
                <p className="text-[11px] text-muted-foreground">Travel to Oriente ~30 min</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center"><Train size={14} className="text-sky-600" /></div>
                <div><p className="text-[12px] font-semibold">Train departs</p><p className="text-[11px] text-muted-foreground">15:30 · AP 122</p></div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-2xl px-3.5 py-2.5">
            <p className="text-[12px] text-amber-800 font-medium">3h 30m gap — enough time, but worth confirming luggage storage at the hotel.</p>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          {[
            { label: "Edit hotel check-out", icon: <Hotel size={15} /> },
            { label: "Edit train reservation", icon: <Train size={15} /> },
            { label: "View on Timeline", icon: <Clock size={15} /> },
            { label: "View on Map", icon: <Map size={15} /> },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
              <span className="text-muted-foreground">{a.icon}</span>{a.label}<ChevronRight size={14} className="text-muted-foreground ml-auto" />
            </button>
          ))}
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] text-muted-foreground font-medium active:opacity-70">Mark as resolved</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 16 — Booking Change Review ──────────────────────────────

export function BookingChangeReviewScreen({ onBack }: { onBack: () => void }) {
  const changes = [
    { field: "Departure time", before: "15:30", after: "16:10", type: "changed" },
    { field: "Arrival time", before: "17:45", after: "18:25", type: "changed" },
    { field: "Platform", before: "2", after: "4", type: "changed" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn label="Imports" onPress={onBack} />
          <span className="text-[12px] text-muted-foreground">From CP Rail · 29 Jun</span>
        </div>

        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">Booking updated</span>
          </div>
          <p className="font-bold text-[17px]">Alfa Pendular AP 122</p>
          <p className="text-white/60 text-[13px] mt-0.5">Lisbon → Porto · Lisbon & Porto</p>
        </div>

        <div className="mx-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Changes detected</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {changes.map((c, i) => (
              <div key={c.field} className={cn("px-5 py-4", i < changes.length - 1 && "border-b border-border")}>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{c.field}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-red-50 rounded-xl px-3 py-2 text-center">
                    <p className="text-[11px] text-red-600 font-semibold mb-0.5">Before</p>
                    <p className="text-[17px] font-bold text-red-700 line-through">{c.before}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 bg-emerald-50 rounded-xl px-3 py-2 text-center">
                    <p className="text-[11px] text-emerald-600 font-semibold mb-0.5">After</p>
                    <p className="text-[17px] font-bold text-emerald-700">{c.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 space-y-2.5">
          <PrimaryBtn label="Accept all changes" />
          <SecondaryBtn label="Keep my edited values" />
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <Clock size={15} className="text-muted-foreground" />View full change history<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screens 17–20 (Journey Organisation) ───────────────────────────

export function ReviewSuggestedMergeScreen({ onBack, onMerge }: { onBack: () => void; onMerge: () => void }) {
  const journeys = [
    { name: "Lisbon Business", dates: "27–30 Jun", dest: "Portugal", count: 3, status: "active" },
    { name: "Porto Weekend", dates: "30 Jun – 5 Jul", dest: "Portugal", count: 4, status: "active" },
  ];
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Journeys" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-3"><GitMerge size={20} className="text-purple-600" /></div>
          <h1 className="text-[22px] font-bold">Suggested merge</h1>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">These two Journeys share the same destination and dates. Onward thinks they may belong together.</p>
        </div>

        <div className="mx-5 grid grid-cols-2 gap-2 mb-5">
          {journeys.map((j) => (
            <div key={j.name} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <StatusPill status={j.status} />
              <p className="font-bold text-[15px] mt-2 leading-tight">{j.name}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{j.dest}</p>
              <p className="text-[11px] text-muted-foreground">{j.dates}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{j.count} reservations</p>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-3xl p-4 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Combined preview</p>
          <p className="font-bold text-[15px]">Lisbon & Porto</p>
          <p className="text-[12px] text-muted-foreground">Portugal · 27 Jun – 5 Jul · 7 reservations</p>
          <div className="mt-3 flex gap-2">
            {["Flight", "Hotel", "Hotel", "Train", "Restaurant", "Activity", "Flight"].map((r, i) => (
              <div key={i} className="flex-1 h-1.5 bg-[#E07B5A] rounded-full opacity-70" />
            ))}
          </div>
        </div>

        <div className="mx-5 space-y-2.5">
          <PrimaryBtn label="Merge Journeys" onClick={onMerge} />
          <SecondaryBtn label="Keep separate" onClick={onBack} />
          <button className="w-full text-[13px] text-muted-foreground font-medium">Dismiss suggestion</button>
        </div>
      </div>
    </Scroll>
  );
}

export function MergeJourneysScreen({ onBack, onMerge }: { onBack: () => void; onMerge: () => void }) {
  const [name, setName] = useState("Lisbon & Porto");
  const [keepArchive, setKeepArchive] = useState(false);
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Merge Journeys</h2>
          <button onClick={onMerge} className="text-[#E07B5A] font-bold text-[15px]">Merge</button>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5">
          <Info size={13} className="text-sky-600 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-sky-800 leading-relaxed">All reservations from both Journeys will move into one. This cannot be undone unless you restore from a backup.</p>
        </div>
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Merged Journey name</label>
            <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {[
            { label: "Destination", value: "Portugal" },
            { label: "Date range", value: "27 Jun – 5 Jul 2026" },
            { label: "Total reservations", value: "7" },
          ].map((row) => (
            <div key={row.label}>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{row.label}</label>
              <div className="bg-muted rounded-2xl px-4 py-3.5"><p className="text-[15px] font-medium text-muted-foreground">{row.value}</p></div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between">
          <div><p className="text-[14px] font-semibold">Keep originals archived</p><p className="text-[11px] text-muted-foreground">Originals remain hidden but recoverable</p></div>
          <button onClick={() => setKeepArchive((k) => !k)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", keepArchive ? "bg-[#1C2B3A]" : "bg-muted")}>
            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", keepArchive ? "left-6" : "left-1")} />
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function SplitJourneyScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number[]>([2, 3]);
  const reservations = [
    { icon: <Plane size={13} />, title: "TAP TP1923", sub: "27 Jun · Lisbon → Porto", day: "Day 1" },
    { icon: <Hotel size={13} />, title: "Hotel Vista do Tejo", sub: "27–30 Jun · Lisbon", day: "Days 1–4" },
    { icon: <Train size={13} />, title: "Alfa Pendular AP 122", sub: "30 Jun · Lisbon → Porto", day: "Day 4" },
    { icon: <Hotel size={13} />, title: "The Yeatman Hotel", sub: "30 Jun – 5 Jul · Porto", day: "Days 4–9" },
    { icon: <Plane size={13} />, title: "TAP TP791", sub: "5 Jul · Porto → London", day: "Day 9" },
  ];
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between px-5 pt-4 mb-5">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Split Journey</h2>
          <button className="text-[#E07B5A] font-bold text-[15px]">Split</button>
        </div>
        <div className="px-5 mb-4">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Scissors size={13} className="text-sky-600 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-sky-800 leading-relaxed">Select reservations to move into a new Journey. The rest remain in Lisbon & Porto.</p>
          </div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {reservations.map((r, i) => (
            <div key={i} onClick={() => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className={cn("flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors", i < reservations.length - 1 && "border-b border-border", selected.includes(i) && "bg-sky-50/50")}>
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selected.includes(i) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {selected.includes(i) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{r.icon}</div>
              <div className="flex-1"><p className="text-[13px] font-semibold">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.sub}</p></div>
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{r.day}</span>
            </div>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="mx-5 space-y-3">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">New Journey ({selected.length} reservations)</p>
            {[
              { label: "Name", value: "Porto", editable: true },
              { label: "Destination", value: "Portugal", editable: true },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label>
                <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue={f.value} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Scroll>
  );
}

export function MoveMulipleReservationsScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [dest, setDest] = useState(0);
  const reservations = [
    { icon: <Hotel size={13} />, title: "The Yeatman Hotel", sub: "Porto · 30 Jun – 5 Jul", day: "Days 4–9" },
    { icon: <Plane size={13} />, title: "TAP TP791", sub: "Porto → London · 5 Jul", day: "Day 9" },
    { icon: <UtensilsCrossed size={13} />, title: "Taberna da Rua das Flores", sub: "30 Jun · 20:00", day: "Day 4" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Move reservations</h2>
          <button className={cn("font-bold text-[15px]", selected.length > 0 ? "text-[#E07B5A]" : "text-muted-foreground")}>Move {selected.length > 0 ? `(${selected.length})` : ""}</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Select reservations</p>
        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {reservations.map((r, i) => (
            <div key={i} onClick={() => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className={cn("flex items-center gap-3 px-4 py-3.5 cursor-pointer", i < reservations.length - 1 && "border-b border-border", selected.includes(i) && "bg-sky-50/50")}>
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selected.includes(i) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {selected.includes(i) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{r.icon}</div>
              <div className="flex-1"><p className="text-[13px] font-semibold">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.sub}</p></div>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Move to</p>
        {["Copenhagen · Aug 2026", "Tokyo & Kyoto · Nov 2026", "Create new Journey"].map((j, i) => (
          <button key={j} onClick={() => setDest(i)} className={cn("w-full flex items-center gap-3 rounded-2xl p-3.5 border-2 text-left mb-2 transition-all", dest === i ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
            <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", dest === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
              {dest === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
            </div>
            <span className="text-[14px] font-semibold">{j}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Phase 2: Screens 21–23 (Sharing) ────────────────────────────────────────

export function ShareJourneyScreen({ onBack, onPreview, onLink }: { onBack: () => void; onPreview: () => void; onLink: () => void }) {
  const [toggles, setToggles] = useState({ dates: true, times: true, addresses: true, names: false, refs: false, notes: false, docs: false, cancelled: true });
  type ToggleKey = keyof typeof toggles;
  const opts: { key: ToggleKey; label: string; recommended?: boolean }[] = [
    { key: "dates", label: "Journey dates" },
    { key: "times", label: "Reservation times" },
    { key: "addresses", label: "Addresses & venues" },
    { key: "names", label: "Traveller names", recommended: false },
    { key: "refs", label: "Confirmation numbers", recommended: false },
    { key: "notes", label: "Personal notes", recommended: false },
    { key: "docs", label: "Documents", recommended: false },
    { key: "cancelled", label: "Hide cancelled reservations" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Share Journey</h2>
          <button onClick={onPreview} className="text-[#E07B5A] font-semibold text-[14px]">Preview</button>
        </div>

        <div className="mx-5 grid grid-cols-2 gap-2 mb-5">
          {[
            { icon: <Link size={20} />, label: "Private link", color: "bg-sky-50 text-sky-600" },
            { icon: <FileText size={20} />, label: "PDF", color: "bg-red-50 text-red-500" },
            { icon: <AlignLeft size={20} />, label: "Plain text", color: "bg-muted text-muted-foreground" },
            { icon: <CalendarCheck size={20} />, label: "Calendar file", color: "bg-emerald-50 text-emerald-600" },
          ].map((fmt) => (
            <button key={fmt.label} className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 active:opacity-70">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", fmt.color)}>{fmt.icon}</div>
              <span className="text-[13px] font-semibold">{fmt.label}</span>
            </button>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Privacy controls</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-5">
          {opts.map((opt, i) => (
            <div key={opt.key} className={cn("flex items-center justify-between px-5 py-3.5", i < opts.length - 1 && "border-b border-border")}>
              <div>
                <span className="text-[14px] font-medium">{opt.label}</span>
                {opt.recommended === false && <span className="ml-2 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Hidden by default</span>}
              </div>
              <button onClick={() => setToggles((t) => ({ ...t, [opt.key]: !t[opt.key] }))} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ml-3", toggles[opt.key] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[opt.key] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2.5">
          <button onClick={onLink} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"><Link size={16} />Create private link</button>
          <SecondaryBtn label="Export PDF" />
          <SecondaryBtn label="Copy plain-text itinerary" />
        </div>
      </div>
    </Scroll>
  );
}

export function SharedLinkSettingsScreen({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<"active" | "expired" | "disabled">("active");
  const [expiry, setExpiry] = useState("7days");
  const [passcode, setPasscode] = useState(false);

  const statusStyle: Record<string, string> = {
    active: "bg-emerald-50 border-emerald-200 text-emerald-700",
    expired: "bg-muted border-border text-muted-foreground",
    disabled: "bg-red-50 border-red-100 text-red-600",
  };

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Share" onPress={onBack} />
          <div className="flex gap-1.5">
            {(["active","expired","disabled"] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={cn("px-2 py-1 rounded-full text-[10px] font-bold border transition-colors", statusStyle[s], status !== s && "opacity-40")}>{s}</button>
            ))}
          </div>
        </div>

        {status === "active" && (
          <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest">Active link</span></div>
            <p className="font-mono text-[11px] text-white/60 mb-4 break-all">onward.app/j/LisboaPorto-7K9M</p>
            <div className="flex gap-2">
              <button className="flex-1 h-10 bg-white/15 text-white rounded-2xl text-[13px] font-semibold flex items-center justify-center gap-2 active:bg-white/25"><Copy size={13} />Copy</button>
              <button className="flex-1 h-10 bg-white/15 text-white rounded-2xl text-[13px] font-semibold flex items-center justify-center gap-2 active:bg-white/25"><Share2 size={13} />Share</button>
            </div>
          </div>
        )}
        {status !== "active" && (
          <div className={cn("mx-5 border rounded-3xl p-5 mb-4", statusStyle[status])}>
            <p className="font-bold text-[15px]">{status === "expired" ? "Link has expired" : "Link is disabled"}</p>
            <p className="text-[12px] mt-1 opacity-80">{status === "expired" ? "This link can no longer be accessed by recipients." : "You have disabled this link. Recipients cannot view it."}</p>
          </div>
        )}

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[13px] text-muted-foreground mb-2">Expiration</p>
            <div className="flex gap-1.5">
              {[["never","Never"],["24h","24h"],["7days","7 days"],["custom","Custom"]].map(([v,l]) => (
                <button key={v} onClick={() => setExpiry(v)} className={cn("flex-1 h-8 rounded-xl text-[11px] font-semibold transition-colors", expiry === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="text-[14px] font-medium">Require passcode</span>
            <button onClick={() => setPasscode((p) => !p)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", passcode ? "bg-[#1C2B3A]" : "bg-muted")}>
              <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", passcode ? "left-6" : "left-1")} />
            </button>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[13px] text-muted-foreground">Views</span>
            <span className="text-[13px] font-semibold">4 people</span>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <SecondaryBtn label="Edit privacy settings" />
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Regenerate link</button>
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Disable link</button>
        </div>
      </div>
    </Scroll>
  );
}

export function SharedJourneyPreviewScreen({ onBack }: { onBack: () => void }) {
  const days = [
    { label: "Fri 27 Jun", items: [{ icon: <Plane size={13} />, title: "Arrive Lisbon", time: "14:30" }, { icon: <Hotel size={13} />, title: "Hotel Vista do Tejo", time: "Check-in 15:00" }] },
    { label: "Mon 30 Jun", items: [{ icon: <Train size={13} />, title: "Train to Porto", time: "Departs 15:30" }, { icon: <UtensilsCrossed size={13} />, title: "Taberna da Rua das Flores", time: "20:00" }] },
  ];
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
        <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Done</button>
        <div className="text-center"><p className="text-[13px] font-bold">Preview</p><p className="text-[10px] text-muted-foreground">Read-only view</p></div>
        <div className="w-10" />
      </div>
      <Scroll>
        <div className="px-5 pt-5 pb-8">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2.5 mb-5">
            <Eye size={13} className="text-amber-600 flex-shrink-0" />
            <p className="text-[12px] text-amber-800">This is exactly what recipients will see. Confirmation numbers and notes are hidden.</p>
          </div>
          <h1 className="text-[26px] font-bold mb-0.5" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Lisbon & Porto</h1>
          <p className="text-muted-foreground text-[13px] mb-5">Portugal · 27 Jun – 5 Jul 2026</p>
          {days.map((day) => (
            <div key={day.label} className="mb-4">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{day.label}</p>
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                {day.items.map((item, i) => (
                  <div key={i} className={cn("flex items-center gap-3 px-4 py-3.5", i < day.items.length - 1 && "border-b border-border")}>
                    <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-[#1C2B3A]">{item.icon}</div>
                    <div className="flex-1"><p className="text-[13px] font-semibold">{item.title}</p><p className="text-[11px] text-muted-foreground">{item.time}</p></div>
                    <div className="text-[11px] text-muted-foreground bg-muted rounded-lg px-2 py-1">🔒 Ref hidden</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

// ─── Phase 2: Screens 24–25 (Calendar) ───────────────────────────────────────

export function CalendarExportScreen({ onBack }: { onBack: () => void }) {
  const [types, setTypes] = useState({ flights: true, stays: true, transport: true, activities: true, restaurants: false, notes: false });
  type TypeKey = keyof typeof types;
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeRef, setIncludeRef] = useState(false);
  const count = Object.values(types).filter(Boolean).length * 2;

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Calendar Export</h2>
          <div className="w-12" />
        </div>

        <div className="mx-5 grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: <CalendarCheck size={20} />, label: "Apple Calendar", color: "bg-red-50 text-red-500" },
            { icon: <Download size={20} />, label: "Download .ics", color: "bg-sky-50 text-sky-600" },
            { icon: <Link size={20} />, label: "Subscribe", color: "bg-purple-50 text-purple-600" },
          ].map((opt) => (
            <button key={opt.label} className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-1.5 active:opacity-70">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", opt.color)}>{opt.icon}</div>
              <span className="text-[11px] font-semibold text-center">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Include</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {(Object.entries(types) as [TypeKey, boolean][]).map(([k, v], i, arr) => (
            <div key={k} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium capitalize">{k}</span>
              <button onClick={() => setTypes((t) => ({ ...t, [k]: !v }))} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", v ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", v ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {[[includeNotes, setIncludeNotes, "Include reservation notes"] as const, [includeRef, setIncludeRef, "Include confirmation numbers"] as const].map(([val, set, label], i) => (
            <div key={label} className={cn("flex items-center justify-between px-5 py-4", i === 0 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{label}</span>
              <button onClick={() => set(!val)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", val ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", val ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5">
          <div className="flex items-center justify-between bg-muted rounded-2xl px-4 py-3 mb-4">
            <span className="text-[13px] font-medium">Calendar</span><span className="text-[13px] text-[#E07B5A] font-semibold">Personal ›</span>
          </div>
          <p className="text-[12px] text-muted-foreground text-center mb-4">{count} events will be exported</p>
          <PrimaryBtn label="Export to Calendar" />
        </div>
      </div>
    </Scroll>
  );
}

export function CalendarSyncSettingsScreen({ onBack }: { onBack: () => void }) {
  const [connected, setConnected] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [autoAdd, setAutoAdd] = useState(true);
  const [removeCancelled, setRemoveCancelled] = useState(true);
  const [includeRef, setIncludeRef] = useState(false);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Calendar Sync</h1></div>

        <div className={cn("mx-5 border rounded-3xl px-5 py-4 mb-5 shadow-sm", connected ? "bg-emerald-50 border-emerald-200" : "bg-muted border-border")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[15px]">{connected ? "Personal" : "Not connected"}</p>
              <p className="text-[12px] text-muted-foreground">{connected ? "Last synced just now" : "No calendar connected"}</p>
            </div>
            {connected ? <CheckCircle size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-muted-foreground" />}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Automatically update events", val: autoUpdate, set: setAutoUpdate },
            { label: "Add new reservations automatically", val: autoAdd, set: setAutoAdd },
            { label: "Remove cancelled events", val: removeCancelled, set: setRemoveCancelled },
            { label: "Include confirmation numbers", val: includeRef, set: setIncludeRef },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium flex-1 pr-4">{row.label}</span>
              <button onClick={() => row.set(!row.val)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", row.val ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", row.val ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70">
            <RefreshCw size={15} className="text-muted-foreground" />Sync Now<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Disconnect calendar</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screen 26 — Journey Notification Settings ──────────────────────

export function JourneyNotificationSettingsScreen({ onBack }: { onBack: () => void }) {
  const [master, setMaster] = useState(true);
  const groups = [
    { title: "Reservations", keys: ["flights","transport","checkin","checkout","activities","restaurants"] },
    { title: "Updates", keys: ["changes","cancellations"] },
    { title: "Briefings", keys: ["daily","tomorrow","missing","documents"] },
  ];
  const labels: Record<string, string> = {
    flights: "Flights", transport: "Ground transport", checkin: "Stay check-in", checkout: "Stay checkout",
    activities: "Activities", restaurants: "Restaurants", changes: "Booking changes", cancellations: "Cancellations",
    daily: "Daily briefing", tomorrow: "Tomorrow summary", missing: "Missing information reminders", documents: "Document reminders",
  };
  const [toggles, setToggles] = useState<Record<string, boolean>>(Object.fromEntries(Object.keys(labels).map((k) => [k, true])));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[22px] font-bold">Notifications</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 mb-5 flex items-center justify-between shadow-sm">
          <div><p className="font-semibold text-[15px]">Journey notifications</p><p className="text-[12px] text-muted-foreground">Enable all for this Journey</p></div>
          <button onClick={() => setMaster((m) => !m)} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", master ? "bg-[#1C2B3A]" : "bg-muted")}>
            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", master ? "left-6" : "left-1")} />
          </button>
        </div>

        {groups.map((g) => (
          <div key={g.title} className={cn("mb-4", !master && "opacity-40 pointer-events-none")}>
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{g.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {g.keys.map((k, i) => (
                <div key={k} className={cn("flex items-center justify-between px-5 py-3.5", i < g.keys.length - 1 && "border-b border-border")}>
                  <span className="text-[14px] font-medium">{labels[k]}</span>
                  <button onClick={() => setToggles((t) => ({ ...t, [k]: !t[k] }))} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", toggles[k] ? "bg-[#1C2B3A]" : "bg-muted")}>
                    <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[k] ? "left-6" : "left-1")} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-5 space-y-2">
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Use global defaults</button>
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Reset to defaults</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: Screens 27–29 (Travellers) ─────────────────────────────────────

export const TRAVELLERS = [
  { name: "Sarah Chen", initials: "SC", color: "#1C2B3A", count: 7 },
  { name: "James Chen", initials: "JC", color: "#E07B5A", count: 4 },
];

export function TravellersScreen({ onBack, onAdd, onTraveller, onAssign }: { onBack: () => void; onAdd: () => void; onTraveller: () => void; onAssign: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <button onClick={onAdd} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center"><UserPlus size={15} className="text-white" /></button>
        </div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Travellers</h1><p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto · 2 travellers</p></div>

        <div className="mx-5 space-y-3 mb-5">
          {TRAVELLERS.map((t) => (
            <div key={t.name} onClick={onTraveller} className="bg-card border border-border rounded-3xl p-4 flex items-center gap-3.5 cursor-pointer active:opacity-80 shadow-sm">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0" style={{ background: t.color }}>{t.initials}</div>
              <div className="flex-1">
                <p className="font-bold text-[15px]">{t.name}</p>
                <p className="text-[12px] text-muted-foreground">{t.count} reservations assigned</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); onAssign(); }} className="text-[12px] font-bold text-[#E07B5A]">Assign</button>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        <button onClick={onAdd} className="mx-5 w-[calc(100%-40px)] flex items-center gap-3.5 border border-dashed border-muted-foreground/30 rounded-3xl p-4 active:opacity-70">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><UserPlus size={16} className="text-muted-foreground" /></div>
          <div className="text-left"><p className="font-semibold text-[14px]">Add traveller</p><p className="text-[11px] text-muted-foreground">Add someone travelling with you</p></div>
        </button>
      </div>
    </Scroll>
  );
}

export function AddEditTravellerScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const fieldBase = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";
  return (
    <Scroll>
      <div className="px-5 pt-4 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Add Traveller</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 cursor-pointer">
            <User size={28} className="text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-3 mb-5">
          {[
            { label: "Full name", placeholder: "e.g. James Chen", required: true },
            { label: "Preferred name", placeholder: "e.g. Jim", required: false },
            { label: "Email", placeholder: "Optional", required: false },
            { label: "Phone", placeholder: "Optional", required: false },
            { label: "Notes", placeholder: "Window seat preference, dietary notes…", required: false },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex items-center gap-1 px-1 mb-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{f.label}</label>
                {f.required && <span className="text-red-500 text-[11px]">*</span>}
              </div>
              <input className={fieldBase} placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <div className="bg-muted rounded-2xl p-3.5">
          <p className="text-[12px] text-muted-foreground leading-relaxed">Traveller details are stored locally and never shared. Do not include passport numbers or government ID.</p>
        </div>
      </div>
    </Scroll>
  );
}

export function AssignReservationsTravellerScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [selected, setSelected] = useState<number[]>([0, 1, 2]);
  const reservations = [
    { icon: <Plane size={13} />, title: "TAP TP1923", sub: "27 Jun · Lisbon → Porto", day: "Day 1", assigned: "Everyone" },
    { icon: <Hotel size={13} />, title: "Hotel Vista do Tejo", sub: "27–30 Jun · Lisbon", day: "Days 1–4", assigned: "Everyone" },
    { icon: <Train size={13} />, title: "Alfa Pendular AP 122", sub: "30 Jun · Lisbon → Porto", day: "Day 4", assigned: "Sarah only" },
    { icon: <Hotel size={13} />, title: "The Yeatman Hotel", sub: "30 Jun – 5 Jul · Porto", day: "Days 4–9", assigned: "Everyone" },
    { icon: <Plane size={13} />, title: "TAP TP791", sub: "5 Jul · Porto → London", day: "Day 9", assigned: "Everyone" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <BackBtn onPress={onBack} />
          <h2 className="text-[17px] font-bold">Assign to James</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[12px] flex-shrink-0" style={{ background: "#E07B5A" }}>JC</div>
          <p className="text-[13px] font-semibold">James Chen · {selected.length} reservations</p>
          <button onClick={() => setSelected(reservations.map((_, i) => i))} className="ml-auto text-[12px] font-bold text-[#E07B5A]">All</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2" style={{ scrollbarWidth: "none" }}>
        {reservations.map((r, i) => (
          <div key={i} onClick={() => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className={cn("flex items-center gap-3 bg-card border rounded-2xl px-4 py-3.5 cursor-pointer transition-all", selected.includes(i) ? "border-[#1C2B3A] shadow-sm" : "border-border")}>
            <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selected.includes(i) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
              {selected.includes(i) && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{r.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate">{r.title}</p>
              <p className="text-[11px] text-muted-foreground truncate">{r.sub}</p>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full whitespace-nowrap">{r.assigned}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Phase 2: Screens 30–31 (Share Extension) ────────────────────────────────

export function ShareToOnwardScreen({ onBack, onSave, onJourneyPicker }: { onBack: () => void; onSave: () => void; onJourneyPicker: () => void }) {
  const [action, setAction] = useState("document");
  const [note, setNote] = useState("");
  return (
    <div className="flex flex-col h-full bg-card" style={{ fontFamily: "'Figtree', sans-serif", borderRadius: "20px 20px 0 0" }}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
        <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
        <div className="flex flex-col items-center">
          <div className="w-10 h-1 bg-muted rounded-full mb-3" />
          <h2 className="text-[17px] font-bold">Save to Onward</h2>
        </div>
        <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        {/* Content preview */}
        <div className="bg-muted rounded-2xl p-4 mb-4 flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0"><FileText size={20} className="text-red-500" /></div>
          <div className="flex-1">
            <p className="font-semibold text-[14px]">boarding-pass-tp1923.pdf</p>
            <p className="text-[12px] text-muted-foreground">PDF · 124 KB · Detected: Boarding pass</p>
          </div>
        </div>

        {/* Action */}
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Save as</p>
        <div className="flex gap-2 mb-4">
          {[["document","Document"], ["import","Import for review"]].map(([v, l]) => (
            <button key={v} onClick={() => setAction(v)} className={cn("flex-1 h-10 rounded-2xl text-[12px] font-semibold transition-colors", action === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {l}
            </button>
          ))}
        </div>

        {/* Journey picker */}
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Journey</p>
        <button onClick={onJourneyPicker} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 mb-4 active:opacity-70">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[14px] font-semibold flex-1 text-left">Lisbon & Porto</span>
          <ChevronRight size={14} className="text-muted-foreground" />
        </button>

        {/* Note */}
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Note (optional)</p>
        <textarea className="w-full bg-muted rounded-2xl px-4 py-3 text-[14px] outline-none resize-none h-16 placeholder:text-muted-foreground/50" placeholder="Add a note…" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
    </div>
  );
}

export function ShareExtensionJourneyPickerScreen({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex flex-col h-full bg-card" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <BackBtn onPress={onBack} />
          <h2 className="text-[17px] font-bold">Choose Journey</h2>
          <div className="w-10" />
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3.5 h-10">
          <Search size={15} className="text-muted-foreground" />
          <input className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60" placeholder="Search journeys…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current</p>
        {[
          { name: "Lisbon & Porto", dates: "27 Jun – 5 Jul", status: "active" },
          { name: "Copenhagen", dates: "18 – 22 Aug", status: "upcoming" },
          { name: "Tokyo & Kyoto", dates: "12 – 26 Nov", status: "upcoming" },
        ].filter((j) => j.name.toLowerCase().includes(q.toLowerCase())).map((j, i) => (
          <button key={i} onClick={onSelect} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-left active:opacity-70">
            <StatusPill status={j.status} />
            <div className="flex-1 text-left"><p className="text-[14px] font-semibold">{j.name}</p><p className="text-[11px] text-muted-foreground">{j.dates}</p></div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 border border-dashed border-muted-foreground/30 rounded-2xl px-4 py-3.5 text-left active:opacity-70">
          <Plus size={16} className="text-muted-foreground" />
          <span className="text-[14px] font-semibold text-muted-foreground">Create new Journey</span>
        </button>
        <button className="w-full flex items-center gap-3 border border-dashed border-muted-foreground/30 rounded-2xl px-4 py-3.5 text-left active:opacity-70">
          <Clock size={16} className="text-muted-foreground" />
          <span className="text-[14px] font-semibold text-muted-foreground">Review later</span>
        </button>
      </div>
    </div>
  );
}

// ─── Phase 2: Screens 32–34 (Offline & Storage) ──────────────────────────────

export function OfflineJourneySettingsScreen({ onBack }: { onBack: () => void }) {
  const items = [
    { label: "Reservation details", value: true, size: "48 KB" },
    { label: "Documents (3 files)", value: true, size: "2.1 MB" },
    { label: "QR codes", value: true, size: "12 KB" },
    { label: "Map area", value: false, size: "~18 MB" },
    { label: "Change history", value: false, size: "8 KB" },
    { label: "Contact details", value: true, size: "2 KB" },
  ];
  const [toggles, setToggles] = useState(items.map((i) => i.value));
  const [downloading, setDownloading] = useState(false);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[24px] font-bold">Offline access</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {items.map((item, i) => (
            <div key={item.label} className={cn("flex items-center justify-between px-5 py-4", i < items.length - 1 && "border-b border-border")}>
              <div><span className="text-[14px] font-medium">{item.label}</span><p className="text-[11px] text-muted-foreground">{item.size}</p></div>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full transition-colors relative flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-2xl px-4 py-3 mb-5 flex items-center justify-between">
          <div><p className="text-[13px] font-semibold">Estimated size</p><p className="text-[11px] text-muted-foreground">Last updated just now</p></div>
          <p className="text-[17px] font-bold">2.2 MB</p>
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={() => setDownloading(true)} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90">
            {downloading ? <><RefreshCw size={16} className="animate-spin" />Downloading…</> : <><Download size={16} />Download Now</>}
          </button>
          <button className="w-full h-[46px] border border-red-100 bg-red-50 rounded-2xl text-[14px] font-semibold text-red-600">Remove offline data</button>
        </div>
      </div>
    </Scroll>
  );
}

export function OfflineDownloadsScreen({ onBack }: { onBack: () => void }) {
  const journeys = [
    { name: "Lisbon & Porto", size: "2.2 MB", updated: "Just now", state: "downloaded" },
    { name: "Copenhagen", size: "—", updated: "Not downloaded", state: "pending" },
  ];
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Offline Downloads</h1></div>

        <div className="mx-5 grid grid-cols-2 gap-2 mb-5">
          {[
            { label: "Total storage", value: "2.2 MB", icon: <HardDrive size={16} />, color: "text-[#1C2B3A] bg-muted" },
            { label: "Documents", value: "2.1 MB", icon: <FileText size={16} />, color: "text-red-500 bg-red-50" },
            { label: "Maps", value: "0 B", icon: <Map size={16} />, color: "text-sky-600 bg-sky-50" },
            { label: "Pending", value: "0", icon: <Download size={16} />, color: "text-amber-600 bg-amber-50" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-3.5 shadow-sm">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", s.color)}>{s.icon}</div>
              <p className="text-[18px] font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Downloaded Journeys</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {journeys.map((j, i) => (
            <div key={j.name} className={cn("flex items-center gap-3 px-4 py-3.5", i < journeys.length - 1 && "border-b border-border")}>
              <div className="flex-1">
                <p className="text-[14px] font-semibold">{j.name}</p>
                <p className="text-[11px] text-muted-foreground">{j.size} · {j.updated}</p>
              </div>
              {j.state === "downloaded"
                ? <button className="text-[12px] font-bold text-red-500">Remove</button>
                : <button className="text-[12px] font-bold text-[#E07B5A]">Download</button>}
            </div>
          ))}
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 mb-4 flex items-center justify-between shadow-sm">
          <div><p className="text-[14px] font-semibold">Download on Wi-Fi only</p><p className="text-[11px] text-muted-foreground">Avoids mobile data charges</p></div>
          <div className="w-12 h-7 rounded-full bg-[#1C2B3A] relative"><div className="absolute top-1 left-6 w-5 h-5 rounded-full bg-white shadow-sm" /></div>
        </div>
        <div className="mx-5">
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Remove all offline data</button>
        </div>
      </div>
    </Scroll>
  );
}

export function PendingSyncDetailsScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><CloudOff size={20} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Pending sync</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Changes haven't reached the server yet.</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Lisbon & Porto</p></div>
          {[
            { label: "Pending edits", value: "2 reservation changes" },
            { label: "Pending documents", value: "1 new document" },
            { label: "Last sync attempt", value: "12 minutes ago" },
            { label: "Network", value: "Offline" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2.5">
          <PrimaryBtn label="Retry sync" />
          <SecondaryBtn label="Continue offline" />
          <button className="w-full h-[46px] border border-red-100 bg-red-50 rounded-2xl text-[13px] font-semibold text-red-600">Discard local changes…</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 2: System States (35–44) ──────────────────────────────────────────

export function MapEmptyScreen({ onAdd, onTimeline }: { onAdd: () => void; onTimeline: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Map size={32} className="text-muted-foreground" /></div>}
      title="No mapped locations"
      body="Add addresses to your reservations and they'll appear here on the Journey Map."
    >
      <PrimaryBtn label="Add location" onClick={onAdd} />
      <SecondaryBtn label="Open Timeline" onClick={onTimeline} />
    </EmptyStateShell>
  );
}

export function MapOfflineScreen({ onDownload, onList }: { onDownload: () => void; onList: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-5"><CloudOff size={32} className="text-muted-foreground" /></div>
      <h2 className="text-[22px] font-bold mb-2">Map unavailable offline</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">Download this Journey's map area to use it without a connection.</p>
      <div className="w-full space-y-2.5">
        <PrimaryBtn label="Download map area" onClick={onDownload} />
        <SecondaryBtn label="View as list instead" onClick={onList} />
      </div>
    </div>
  );
}

export function DocumentsEmptyScreen({ onAdd }: { onAdd: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><FolderOpen size={32} className="text-muted-foreground" /></div>}
      title="Keep every travel document in one place"
      body="Add boarding passes, tickets, hotel vouchers, and insurance documents. They'll be available offline when you travel."
    >
      <PrimaryBtn label="Add from Files" onClick={onAdd} />
      <SecondaryBtn label="Add from Photos" onClick={onAdd} />
      <button onClick={onAdd} className="w-full text-[14px] font-semibold text-muted-foreground">Scan a document</button>
    </EmptyStateShell>
  );
}

export function DocumentLockedScreen({ onUnlock, onCancel }: { onUnlock: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-3xl bg-[#1C2B3A] flex items-center justify-center mb-5 shadow-lg">
        <Lock size={32} className="text-white" />
      </div>
      <h2 className="text-[22px] font-bold mb-2">Document locked</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">This document is protected with Face ID. Authenticate to view it.</p>
      <div className="w-full space-y-2.5">
        <PrimaryBtn label="Unlock with Face ID" onClick={onUnlock} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export function ReadinessCompleteScreen({ onView, onOptional }: { onView: () => void; onOptional: () => void }) {
  return (
    <EmptyStateShell
      icon={
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
          <ListChecks size={36} className="text-emerald-500" />
        </div>
      }
      title="This Journey looks ready"
      body="All required information is in order. Have a wonderful trip."
    >
      <PrimaryBtn label="View Journey" onClick={onView} />
      <SecondaryBtn label="Review optional suggestions" onClick={onOptional} />
    </EmptyStateShell>
  );
}

export function NoConflictsScreen({ onBack }: { onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle size={36} className="text-emerald-500" />
        </div>
      }
      title="No scheduling conflicts"
      body="Onward found no overlapping or conflicting reservations in this Journey."
    >
      <PrimaryBtn label="Return to Readiness" onClick={onBack} />
    </EmptyStateShell>
  );
}

export function NoSharedLinksScreen({ onShare }: { onShare: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Link size={32} className="text-muted-foreground" /></div>}
      title="No active links"
      body="Create a private link to share this Journey with friends, family, or colleagues."
    >
      <PrimaryBtn label="Share Journey" onClick={onShare} />
    </EmptyStateShell>
  );
}

export function MicrosoftReauthScreen({ onReconnect, onDisconnect, onDismiss }: { onReconnect: () => void; onDisconnect: () => void; onDismiss: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex justify-end"><button onClick={onDismiss}><X size={20} className="text-muted-foreground" /></button></div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4"><AlertCircle size={24} className="text-amber-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Reconnection required</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">Your Microsoft connection has expired. New reservation emails won't be imported until you reconnect.</p>
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-6">
          <Mail size={14} className="text-amber-600 flex-shrink-0" />
          <div><p className="text-[13px] font-semibold text-amber-900">sarah.chen@outlook.com</p><p className="text-[11px] text-amber-700">Expired · Last synced 2 days ago</p></div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-4 mb-4">
          <div className="flex items-start gap-2.5"><Check size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" /><p className="text-[13px] text-muted-foreground">All imported Journeys and reservations remain accessible.</p></div>
        </div>
      </div>
      <div className="space-y-2.5">
        <button onClick={onReconnect} className="w-full h-[52px] rounded-2xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 active:opacity-90" style={{ background: "#0078D4" }}><RefreshCw size={16} />Reconnect Microsoft</button>
        <SecondaryBtn label="Disconnect" onClick={onDisconnect} />
      </div>
    </div>
  );
}

export function ForwardingAddressErrorScreen({ onRetry, onInbox, onSupport }: { onRetry: () => void; onInbox: () => void; onSupport: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><AlertCircle size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Forwarding address unavailable</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Your personal forwarding address couldn't be reached. This may be a temporary service issue.</p>
        <p className="text-[11px] font-mono bg-muted rounded-xl px-3 py-2 text-muted-foreground mb-6">Error: FWD_SERVICE_503</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry" onClick={onRetry} />
        <SecondaryBtn label="Connect inbox instead" onClick={onInbox} />
        <button onClick={onSupport} className="w-full text-[14px] text-muted-foreground font-medium">Contact support</button>
      </div>
    </div>
  );
}

export function OfflineDownloadErrorScreen({ onRetry, onStorage }: { onRetry: () => void; onStorage: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><CloudOff size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Download failed</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">Some content could not be downloaded for offline use.</p>
        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-6">
          {[
            { label: "Map area", reason: "Insufficient storage (needs 18 MB)" },
            { label: "Insurance document", reason: "Network timeout — retry on Wi-Fi" },
          ].map((f, i) => (
            <div key={f.label} className={cn("px-4 py-3.5", i === 0 && "border-b border-border")}>
              <p className="text-[13px] font-semibold">{f.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{f.reason}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry download" onClick={onRetry} />
        <SecondaryBtn label="Manage storage" onClick={onStorage} />
      </div>
    </div>
  );
}

