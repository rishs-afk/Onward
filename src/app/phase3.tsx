import { useState, useEffect } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  Calendar, ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Bell, User, ArrowRight, Shield,
  RefreshCw, MoreHorizontal, Navigation, Globe, Copy,
  Trash2, X, Check, Info, Download, LogOut,
  Pencil, FileText, Star, Ticket, Lock, Eye,
  Map, Users, Link, Share2, FolderOpen,
  UserPlus, CloudOff, HardDrive, QrCode,
  Layers, CalendarCheck, AlignLeft, Wifi,
  ChevronDown, Phone, Filter, Send, ArrowLeftRight,
  MessageSquare, Activity, Zap, Timer, UserCheck, UserX,
  BellRing, Crosshair, Signal, ThumbsUp, ThumbsDown,
  Package, Inbox,
} from "lucide-react";
import {
  Screen, Tab, cn, Scroll, StatusPill, BackBtn,
  JourneyNavBar, PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

// ─── Phase 3 Shared Components ────────────────────────────────────────────────

type LiveStatus = "on-time" | "boarding" | "gate-closing" | "delayed" | "cancelled" | "diverted" | "landed" | "scheduled" | "no-data";

const STATUS_CONFIG: Record<LiveStatus, { label: string; dot: string; bg: string; text: string }> = {
  "on-time":     { label: "On time",      dot: "bg-emerald-400", bg: "bg-emerald-50",  text: "text-emerald-700" },
  "boarding":    { label: "Boarding",     dot: "bg-sky-400",     bg: "bg-sky-50",      text: "text-sky-700" },
  "gate-closing":{ label: "Gate closing", dot: "bg-orange-400",  bg: "bg-orange-50",   text: "text-orange-700" },
  "delayed":     { label: "Delayed",      dot: "bg-amber-400",   bg: "bg-amber-50",    text: "text-amber-700" },
  "cancelled":   { label: "Cancelled",    dot: "bg-red-500",     bg: "bg-red-50",      text: "text-red-700" },
  "diverted":    { label: "Diverted",     dot: "bg-purple-400",  bg: "bg-purple-50",   text: "text-purple-700" },
  "landed":      { label: "Landed",       dot: "bg-slate-400",   bg: "bg-slate-50",    text: "text-slate-600" },
  "scheduled":   { label: "Scheduled",   dot: "bg-slate-300",   bg: "bg-muted",       text: "text-muted-foreground" },
  "no-data":     { label: "No live data", dot: "bg-muted-foreground/30", bg: "bg-muted", text: "text-muted-foreground" },
};

function LiveStatusBadge({ status, delay }: { status: LiveStatus; delay?: string }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide", cfg.bg, cfg.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
      {cfg.label}{delay ? ` +${delay}` : ""}
    </span>
  );
}

function Countdown({ to, label }: { to: string; label?: string }) {
  return (
    <div className="text-center">
      <p className="text-[40px] font-bold leading-none tracking-tight" style={{ fontFamily: "'Figtree', sans-serif" }}>{to}</p>
      {label && <p className="text-[12px] text-muted-foreground mt-1 font-medium">{label}</p>}
    </div>
  );
}

function DisruptionBanner({ status, message, action, onAction }: { status: "warning" | "danger"; message: string; action?: string; onAction?: () => void }) {
  const color = status === "danger" ? "bg-red-50 border-red-200 text-red-800" : "bg-amber-50 border-amber-200 text-amber-800";
  const iconColor = status === "danger" ? "text-red-500" : "text-amber-600";
  return (
    <div className={cn("mx-5 mb-3 border rounded-2xl px-4 py-3 flex items-center gap-3", color)}>
      <AlertCircle size={16} className={cn("flex-shrink-0", iconColor)} />
      <p className="text-[13px] font-semibold flex-1">{message}</p>
      {action && <button onClick={onAction} className="text-[12px] font-bold flex-shrink-0" style={{ color: status === "danger" ? "#dc2626" : "#d97706" }}>{action}</button>}
    </div>
  );
}

function DataFreshness({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Signal size={11} />
      <span className="text-[10px] font-medium">Updated {time}</span>
    </div>
  );
}

function MemberAvatar({ name, color = "#1C2B3A", size = 36 }: { name: string; color?: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
      {initials}
    </div>
  );
}

const JOURNEY_MEMBERS = [
  { name: "Sarah Chen", role: "Owner", color: "#1C2B3A", last: "Just now" },
  { name: "James Chen", role: "Editor", color: "#E07B5A", last: "5 min ago" },
  { name: "Priya Patel", role: "Viewer", color: "#059669", last: "1 hour ago" },
];

// ─── Screen 1: Live Journey Home ─────────────────────────────────────────────

export function LiveJourneyHomeScreen({ onBack, onStatus, onAlert, onDisruption, onBoardingPass, onMap, onNowNext }: {
  onBack: () => void; onStatus: () => void; onAlert: () => void;
  onDisruption: () => void; onBoardingPass: () => void; onMap: () => void; onNowNext: () => void;
}) {
  const [variant, setVariant] = useState<"on-time" | "delayed" | "boarding" | "cancelled">("on-time");

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Journey</p>
            <h1 className="text-[22px] font-bold tracking-tight">Lisbon & Porto</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onAlert} className="relative">
              <BellRing size={20} className="text-muted-foreground" />
              {variant !== "on-time" && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">1</span>}
            </button>
            <button onClick={onStatus}><Signal size={20} className="text-[#E07B5A]" /></button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] text-muted-foreground">Mon 30 Jun · Lisbon → Porto</p>
          <DataFreshness time="2m ago" />
        </div>
        {/* Variant picker for demo */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-2" style={{ scrollbarWidth: "none" }}>
          {(["on-time","delayed","boarding","cancelled"] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0 capitalize", variant === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {v}
            </button>
          ))}
        </div>
        <JourneyNavBar active="timeline" onTimeline={() => {}} onMap={onMap} onDocuments={() => {}} />
      </div>

      {(variant === "delayed" || variant === "cancelled") && (
        <DisruptionBanner
          status={variant === "cancelled" ? "danger" : "warning"}
          message={variant === "cancelled" ? "TAP TP791 Porto → London has been cancelled" : "TAP TP791 delayed 45 min — connection may be affected"}
          action="View"
          onAction={onDisruption}
        />
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Now card */}
        <div className="bg-[#1C2B3A] rounded-3xl p-5 mb-3 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulse 2s infinite" }} />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Now</span>
            </div>
            <LiveStatusBadge status={variant === "cancelled" ? "cancelled" : "on-time"} />
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0"><Hotel size={18} className="text-white" /></div>
            <div>
              <p className="font-bold text-[17px]">Hotel Vista do Tejo</p>
              <p className="text-white/60 text-[13px]">Check-out 12:00</p>
            </div>
          </div>
          <p className="text-white/50 text-[12px]">Ends in 2h 14m</p>
        </div>

        {/* Leave-by card */}
        <div onClick={onNowNext} className="bg-[#E07B5A]/10 border border-[#E07B5A]/25 rounded-2xl px-4 py-3 flex items-center gap-3 mb-3 cursor-pointer active:opacity-80">
          <Timer size={16} className="text-[#E07B5A] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[12px] font-bold text-[#E07B5A]">Leave by 14:45</p>
            <p className="text-[11px] text-muted-foreground">for 15:30 train · 30 min to Oriente</p>
          </div>
          <ChevronRight size={14} className="text-[#E07B5A] flex-shrink-0" />
        </div>

        {/* Next card */}
        <div className="bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E07B5A]" />
              <span className="text-[10px] font-bold text-[#E07B5A] uppercase tracking-widest">Next</span>
              <span className="text-[11px] text-muted-foreground">in 3h 46m</span>
            </div>
            <LiveStatusBadge status={variant === "delayed" ? "delayed" : variant === "boarding" ? "boarding" : "on-time"} delay={variant === "delayed" ? "45m" : undefined} />
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0"><Train size={18} className="text-[#1C2B3A]" /></div>
            <div>
              <p className="font-bold text-[17px]">Alfa Pendular to Porto</p>
              <p className="text-muted-foreground text-[13px]">{variant === "delayed" ? "Departs ~16:15 (was 15:30)" : "Departs 15:30 · AP 122"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: "Platform", value: "2" }, { label: "Car", value: "3" }, { label: "Seat", value: "22A" }].map((i) => (
              <div key={i.label} className="bg-muted rounded-xl py-2 text-center"><p className="text-[10px] text-muted-foreground">{i.label}</p><p className="text-[16px] font-bold">{i.value}</p></div>
            ))}
          </div>
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button onClick={onBoardingPass} className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-1.5 active:opacity-70 shadow-sm">
            <QrCode size={20} className="text-[#1C2B3A]" />
            <span className="text-[10px] font-semibold">Boarding pass</span>
          </button>
          <button onClick={onMap} className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-1.5 active:opacity-70 shadow-sm">
            <Map size={20} className="text-[#1C2B3A]" />
            <span className="text-[10px] font-semibold">Journey map</span>
          </button>
          <button onClick={onAlert} className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-1.5 active:opacity-70 shadow-sm relative">
            <AlertCircle size={20} className="text-[#1C2B3A]" />
            <span className="text-[10px] font-semibold">All alerts</span>
          </button>
        </div>

        {/* Rest of timeline */}
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Later today</p>
        <div className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center"><UtensilsCrossed size={15} className="text-[#1C2B3A]" /></div>
          <div className="flex-1"><p className="text-[14px] font-semibold">Taberna da Rua das Flores</p><p className="text-[12px] text-muted-foreground">Dinner · 20:00</p></div>
          <ChevronRight size={14} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Live Status Centre ────────────────────────────────────────────

export function LiveStatusCentreScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const [filter, setFilter] = useState("all");
  const filters = ["All", "Flights", "Trains", "Stays"];
  const items = [
    { type: "flight", icon: <Plane size={14} />, title: "TAP TP791 Porto → London", status: "delayed" as LiveStatus, delay: "45m", orig: "18:55", updated: "19:40", note: "Connection may be affected", action: true },
    { type: "train", icon: <Train size={14} />, title: "Alfa Pendular AP 122", status: "on-time" as LiveStatus, orig: "15:30", updated: "15:30", note: "" },
    { type: "stay", icon: <Hotel size={14} />, title: "The Yeatman Hotel", status: "scheduled" as LiveStatus, orig: "Check-in 15:00", updated: "Check-in 15:00", note: "" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <button className="text-muted-foreground"><RefreshCw size={18} /></button>
        </div>
        <div className="px-5 pb-4">
          <h1 className="text-[24px] font-bold">Live Status</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[12px] text-muted-foreground">Lisbon & Porto · 30 Jun</p>
            <DataFreshness time="just now" />
          </div>
        </div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
        </div>

        {items.filter((i) => filter === "all" || i.type === filter.slice(0, -1)).map((item, idx) => (
          <div key={idx} onClick={onItem} className="mx-5 mb-3 bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
            <div className="flex items-start gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", item.action ? "bg-amber-50 text-amber-600" : "bg-muted text-[#1C2B3A]")}>{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-[14px] leading-tight">{item.title}</p>
                  <LiveStatusBadge status={item.status} delay={item.delay} />
                </div>
                <div className="flex items-center gap-3 text-[12px] text-muted-foreground mb-1">
                  <span>{item.orig}</span>
                  {item.delay && <><ArrowRight size={11} /><span className="font-semibold text-amber-700">{item.updated}</span></>}
                </div>
                {item.note && <p className="text-[11px] text-amber-700 font-medium">{item.note}</p>}
              </div>
            </div>
          </div>
        ))}

        <p className="text-[11px] text-center text-muted-foreground px-8 mt-4 leading-relaxed">Live data is provided by third-party sources and may not reflect real-time conditions.</p>
      </div>
    </Scroll>
  );
}

// ─── Screen 3: Flight Live Status ────────────────────────────────────────────

export function FlightLiveStatusScreen({ onBack, onBoardingPass, onConnection, onDisruption }: {
  onBack: () => void; onBoardingPass: () => void; onConnection: () => void; onDisruption: () => void;
}) {
  const [variant, setVariant] = useState<LiveStatus>("on-time");

  const cfg = STATUS_CONFIG[variant];
  const isDelayed = variant === "delayed";
  const isCancelled = variant === "cancelled";
  const isBoarding = variant === "boarding" || variant === "gate-closing";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn label="Status" onPress={onBack} />
          <DataFreshness time="1m ago" />
        </div>

        {/* Variant picker */}
        <div className="flex gap-1.5 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(["on-time","boarding","gate-closing","delayed","cancelled","landed","no-data"] as LiveStatus[]).map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0 capitalize", variant === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {v}
            </button>
          ))}
        </div>

        {isCancelled && <DisruptionBanner status="danger" message="This flight has been cancelled" action="Alternatives" onAction={onDisruption} />}
        {isDelayed && <DisruptionBanner status="warning" message="Delayed 45 minutes — check connection" action="Impact" onAction={onDisruption} />}

        {/* Hero */}
        <div className={cn("mx-5 rounded-3xl p-5 mb-4 shadow-lg", isCancelled ? "bg-red-600" : "bg-[#1C2B3A]")}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-[12px] font-medium">TAP Air Portugal</p>
              <p className="text-white font-bold text-[22px]">TP 791</p>
            </div>
            <LiveStatusBadge status={variant} delay={isDelayed ? "45m" : undefined} />
          </div>

          {/* Route */}
          <div className="flex items-center gap-3 mb-4">
            <div className="text-center">
              <p className="text-[28px] font-bold text-white leading-none">{isDelayed ? "19:40" : "18:55"}</p>
              {isDelayed && <p className="text-white/40 text-[11px] line-through">18:55</p>}
              <p className="text-white/60 text-[12px] mt-1">OPO</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-white/40 text-[11px]">2h 25m</p>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
                <div className="flex-1 h-[1px] bg-white/20" />
                <Plane size={12} className="text-white/40" />
                <div className="flex-1 h-[1px] bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
              </div>
              <p className="text-white/40 text-[11px]">Non-stop</p>
            </div>
            <div className="text-center">
              <p className="text-[28px] font-bold text-white leading-none">{isDelayed ? "22:05" : "21:20"}</p>
              {isDelayed && <p className="text-white/40 text-[11px] line-through">21:20</p>}
              <p className="text-white/60 text-[12px] mt-1">LHR</p>
            </div>
          </div>

          {/* Key info */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: isBoarding ? "Now boarding" : "Gate", value: "B14" },
              { label: "Terminal", value: "1" },
              { label: "Seat", value: "22A" },
            ].map((i) => (
              <div key={i.label} className="bg-white/10 rounded-xl py-2.5 text-center">
                <p className="text-[10px] text-white/40">{i.label}</p>
                <p className={cn("font-bold", isBoarding ? "text-[13px] text-emerald-300" : "text-[15px] text-white")}>{i.value}</p>
              </div>
            ))}
          </div>

          {isBoarding && (
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulse 2s infinite" }} />
              <p className="text-emerald-300 text-[12px] font-bold">Group 2 now boarding · Closes 19:25</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mx-5 grid grid-cols-2 gap-2 mb-4">
          <button onClick={onBoardingPass} className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70 shadow-sm">
            <QrCode size={16} className="text-[#1C2B3A]" />Boarding pass
          </button>
          <button onClick={onConnection} className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70 shadow-sm">
            <ArrowRight size={16} className="text-[#1C2B3A]" />Connection
          </button>
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70 shadow-sm">
            <Map size={16} className="text-[#1C2B3A]" />Airport map
          </button>
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70 shadow-sm">
            <Phone size={16} className="text-[#1C2B3A]" />Contact airline
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 4: Ground Transport Live Status ───────────────────────────────────

export function GroundTransportLiveStatusScreen({ onBack, onTicket }: { onBack: () => void; onTicket: () => void }) {
  const [status, setStatus] = useState<LiveStatus>("on-time");
  const isDelayed = status === "delayed";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn label="Status" onPress={onBack} />
          <DataFreshness time="3m ago" />
        </div>

        <div className="flex gap-1.5 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(["on-time","delayed","cancelled","no-data"] as LiveStatus[]).map((v) => (
            <button key={v} onClick={() => setStatus(v)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0 capitalize", status === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {v}
            </button>
          ))}
        </div>

        {isDelayed && <DisruptionBanner status="warning" message="AP 122 delayed 20 minutes — expect 15:50 departure" />}

        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-[12px]">Comboios de Portugal</p>
              <p className="text-white font-bold text-[22px]">AP 122</p>
            </div>
            <LiveStatusBadge status={status} delay={isDelayed ? "20m" : undefined} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-center">
              <p className="text-[26px] font-bold leading-none">{isDelayed ? "15:50" : "15:30"}</p>
              {isDelayed && <p className="text-white/40 text-[11px] line-through">15:30</p>}
              <p className="text-white/60 text-[12px] mt-1">Lisboa Oriente</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-white/40 text-[11px]">2h 15m</p>
              <div className="w-full h-[1px] bg-white/20 my-1" />
            </div>
            <div className="text-center">
              <p className="text-[26px] font-bold leading-none">{isDelayed ? "18:05" : "17:45"}</p>
              {isDelayed && <p className="text-white/40 text-[11px] line-through">17:45</p>}
              <p className="text-white/60 text-[12px] mt-1">Porto Campanhã</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: "Platform", value: "2" }, { label: "Car", value: "3" }, { label: "Seat", value: "22A" }].map((i) => (
              <div key={i.label} className="bg-white/10 rounded-xl py-2.5 text-center">
                <p className="text-[10px] text-white/40">{i.label}</p>
                <p className="text-[15px] font-bold">{i.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 grid grid-cols-2 gap-2">
          <button onClick={onTicket} className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70"><QrCode size={16} />View ticket</button>
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70"><Navigation size={16} />Station map</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 5: Disruption Alert Detail ───────────────────────────────────────

export function DisruptionAlertScreen({ onBack, onAlternatives, onConnection }: { onBack: () => void; onAlternatives: () => void; onConnection: () => void }) {
  const [variant, setVariant] = useState("delay");
  const variants = ["delay", "gate change", "cancellation", "diversion"];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <BackBtn label="Alerts" onPress={onBack} />
          <button className="text-muted-foreground"><Share2 size={18} /></button>
        </div>

        <div className="flex gap-1.5 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {variants.map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0 capitalize", variant === v ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {v}
            </button>
          ))}
        </div>

        <div className="px-5 mb-5">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", variant === "cancellation" ? "bg-red-50" : "bg-amber-50")}>
            <AlertCircle size={26} className={variant === "cancellation" ? "text-red-500" : "text-amber-600"} />
          </div>
          <h1 className="text-[22px] font-bold leading-tight mb-1">
            {variant === "delay" ? "45-minute delay detected" :
             variant === "gate change" ? "Gate changed to B22" :
             variant === "cancellation" ? "Flight cancelled" : "Flight diverted to Gatwick"}
          </h1>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {variant === "delay" ? "TAP TP791 Porto → London is now expected to depart at 19:40 instead of 18:55." :
             variant === "gate change" ? "The departure gate for TP791 has changed from B14 to B22 at Porto Airport." :
             variant === "cancellation" ? "TAP TP791 Porto → London has been cancelled by the airline." :
             "TP791 has been diverted to London Gatwick (LGW) due to air traffic control restrictions."}
          </p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Affected reservation</p></div>
          {[
            { label: "Flight", value: "TAP TP791 · Porto → London" },
            { label: "Original", value: "30 Jun · 18:55 → 21:20" },
            { label: "Updated", value: variant === "delay" ? "30 Jun · 19:40 → 22:05" : variant === "gate change" ? "Gate B22 (was B14)" : "—" },
            { label: "Journey", value: "Lisbon & Porto" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        {(variant === "delay" || variant === "cancellation") && (
          <div className="mx-5 bg-amber-50 border border-amber-200 rounded-3xl p-4 mb-5">
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-2">Impact on your Journey</p>
            <p className="text-[13px] text-amber-800 leading-relaxed">
              {variant === "delay" ? "This delay may affect your connection to hotel check-in in London. You have approximately 20 minutes less than planned." : "You will need to arrange alternative travel from Porto to London."}
            </p>
          </div>
        )}

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="View alternatives" onClick={onAlternatives} />
          {(variant === "delay" || variant === "cancellation") && (
            <button onClick={onConnection} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] active:opacity-70">Review connection</button>
          )}
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] text-muted-foreground active:opacity-70">Contact TAP Air Portugal</button>
          <button className="w-full text-[13px] text-muted-foreground font-medium py-2">Dismiss</button>
        </div>

        <p className="text-[11px] text-muted-foreground text-center px-8 mt-5">Last updated just now · Source: FlightAware</p>
      </div>
    </Scroll>
  );
}

// ─── Screen 6: Cancellation Detail ───────────────────────────────────────────

export function CancellationDetailScreen({ onBack, onAlternatives }: { onBack: () => void; onAlternatives: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Alerts" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><X size={22} className="text-red-500" /></div>
          <h1 className="text-[22px] font-bold">Flight cancelled</h1>
          <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">TAP Air Portugal has cancelled TP791. You will need to arrange alternative travel.</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Flight", value: "TP791 Porto → London" },
            { label: "Original date", value: "30 Jun 2026 · 18:55" },
            { label: "Provider", value: "TAP Air Portugal" },
            { label: "Booking ref", value: "TAP-2026-9922" },
            { label: "Cancellation source", value: "Airline" },
            { label: "Refund eligibility", value: "Contact TAP for details" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="View alternative flights" onClick={onAlternatives} />
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] active:opacity-70">Contact TAP Air Portugal</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] active:opacity-70">Add replacement manually</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] text-muted-foreground active:opacity-70">Keep in Timeline as cancelled</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 7: Delay Impact Summary ──────────────────────────────────────────

export function DelayImpactSummaryScreen({ onBack, onConnection, onAlternatives }: { onBack: () => void; onConnection: () => void; onAlternatives: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Flight status" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[22px] font-bold">Delay impact</h1>
          <p className="text-[13px] text-muted-foreground mt-1">How the 45-minute delay may affect the rest of your Journey.</p>
        </div>

        {/* Delayed reservation */}
        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-3xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-amber-600" />
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">Delayed</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center"><Plane size={14} className="text-amber-700" /></div>
            <div>
              <p className="font-semibold text-[14px]">TP791 Porto → London</p>
              <div className="flex items-center gap-2 text-[12px]">
                <span className="text-muted-foreground line-through">18:55</span>
                <ArrowRight size={11} className="text-amber-600" />
                <span className="font-bold text-amber-700">19:40 (+45m)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact chain */}
        <div className="mx-5 space-y-2 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Potentially affected</p>
          {[
            { icon: <Hotel size={14} />, title: "Heathrow hotel check-in", orig: "23:00", risk: "low", note: "Enough time, inform hotel" },
            { icon: <UtensilsCrossed size={14} />, title: "Dinner reservation", orig: "21:30", risk: "medium", note: "Arrival at 22:00 — may be late" },
          ].map((item) => {
            const riskColor = item.risk === "medium" ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200";
            const riskText = item.risk === "medium" ? "text-amber-700" : "text-emerald-700";
            return (
              <div key={item.title} className={cn("border rounded-2xl p-3.5", riskColor)}>
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-7 h-7 rounded-xl bg-card flex items-center justify-center text-muted-foreground">{item.icon}</div>
                  <p className="font-semibold text-[13px]">{item.title}</p>
                </div>
                <p className={cn("text-[12px] font-medium ml-9", riskText)}>{item.note}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Review connection" onClick={onConnection} />
          <SecondaryBtn label="View alternatives" onClick={onAlternatives} />
        </div>

        <p className="text-[11px] text-muted-foreground text-center px-8 mt-5">These are estimates only. Actual impact may differ.</p>
      </div>
    </Scroll>
  );
}

// ─── Screen 8: Connection Risk ────────────────────────────────────────────────

export function ConnectionRiskScreen({ onBack, onRoute, onAlternatives }: { onBack: () => void; onRoute: () => void; onAlternatives: () => void }) {
  const [risk, setRisk] = useState<"comfortable" | "tight" | "at-risk" | "likely-missed">("tight");

  const riskConfig = {
    comfortable: { label: "Comfortable", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", bar: "bg-emerald-400", width: "25%" },
    tight:       { label: "Tight",       bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   bar: "bg-amber-400",   width: "55%" },
    "at-risk":   { label: "At risk",     bg: "bg-orange-50",  border: "border-orange-200",  text: "text-orange-700",  bar: "bg-orange-400",  width: "75%" },
    "likely-missed": { label: "Likely missed", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", bar: "bg-red-500", width: "95%" },
  };
  const cfg = riskConfig[risk];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Impact" onPress={onBack} /></div>

        <div className="flex gap-1.5 px-5 my-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(Object.keys(riskConfig) as (keyof typeof riskConfig)[]).map((r) => (
            <button key={r} onClick={() => setRisk(r)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0", risk === r ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {riskConfig[r].label}
            </button>
          ))}
        </div>

        <div className="px-5 pb-4">
          <h1 className="text-[22px] font-bold">Connection risk</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Porto Airport · Terminal 1 to 1</p>
        </div>

        {/* Risk indicator */}
        <div className={cn("mx-5 border rounded-3xl p-5 mb-4", cfg.bg, cfg.border)}>
          <div className="flex items-center justify-between mb-3">
            <p className={cn("text-[17px] font-bold", cfg.text)}>{cfg.label}</p>
            <span className={cn("text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/70", cfg.text)}>{risk === "comfortable" ? "55 min buffer" : risk === "tight" ? "25 min buffer" : risk === "at-risk" ? "10 min buffer" : "Likely missed"}</span>
          </div>
          <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all", cfg.bar)} style={{ width: cfg.width }} />
          </div>
          <p className={cn("text-[12px] mt-2 leading-relaxed", cfg.text)}>
            {risk === "comfortable" ? "You have comfortable time to transfer between gates." :
             risk === "tight" ? "This connection may be difficult if the first flight is delayed further." :
             risk === "at-risk" ? "We recommend alerting the airline and preparing to run between gates." :
             "This connection is likely to be missed. We recommend checking alternatives now."}
          </p>
        </div>

        {/* Transfer details */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {[
            { label: "Arriving flight", value: "TP791 · Gate B22 · 19:40 est." },
            { label: "Next departure", value: "BA285 · Gate C5 · 20:05" },
            { label: "Transfer time", value: risk === "comfortable" ? "55 minutes" : risk === "tight" ? "25 minutes" : "10 minutes" },
            { label: "Terminal change", value: "Same terminal" },
            { label: "Security", value: "Not required (landside transfer)" },
            { label: "Estimated walk", value: "12 minutes" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="View connection route" onClick={onRoute} />
          <SecondaryBtn label="View alternatives" onClick={onAlternatives} />
          <button className="w-full text-[13px] text-muted-foreground font-medium py-2">Ignore this warning</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 9: Connection Route ───────────────────────────────────────────────

export function ConnectionRouteScreen({ onBack }: { onBack: () => void }) {
  const steps = [
    { icon: <Plane size={14} />, label: "Arrive Gate B22", sub: "TP791 · Terminal 1", time: "19:40 est." },
    { icon: <ArrowRight size={14} />, label: "Walk to Terminal 1C", sub: "Follow signs for Schengen departures", time: "~8 min" },
    { icon: <Shield size={14} />, label: "Security check (if needed)", sub: "Usually bypassed for internal transfer", time: "~0–5 min" },
    { icon: <Plane size={14} />, label: "Depart Gate C5", sub: "BA285 · London Heathrow", time: "Boards 19:35" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 flex items-center justify-between">
          <BackBtn label="Connection" onPress={onBack} />
          <button className="text-[#E07B5A] text-[13px] font-semibold">Save offline</button>
        </div>
        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[22px] font-bold">Connection route</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Porto Airport · Estimated 12 min</p>
        </div>

        <div className="px-5 relative mb-5">
          <div className="absolute left-[43px] top-8 bottom-8 w-[1px] bg-border" />
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 mb-5">
              <div className="w-[52px] text-right flex-shrink-0 pt-3">
                <span className="text-[10px] font-semibold text-muted-foreground">{step.time}</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#1C2B3A] flex items-center justify-center flex-shrink-0 mt-3 relative z-10">
                <span className="text-white">{step.icon}</span>
              </div>
              <div className="flex-1 bg-card border border-border rounded-2xl p-3.5">
                <p className="font-semibold text-[14px]">{step.label}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70"><Navigation size={15} />Start directions</button>
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 text-[13px] font-semibold active:opacity-70"><Map size={15} />Airport map</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 10: Alternative Options ──────────────────────────────────────────

export function AlternativeOptionsScreen({ onBack, onReplace }: { onBack: () => void; onReplace: () => void }) {
  const [sort, setSort] = useState("earliest");
  const alts = [
    { airline: "TAP Air Portugal", flight: "TP793", dep: "21:15", arr: "23:40", stops: 0, status: "Available" },
    { airline: "Ryanair", flight: "FR7712", dep: "22:00", arr: "00:25", stops: 0, status: "Available" },
    { airline: "easyJet", flight: "U28843", dep: "06:40", arr: "09:05+1", stops: 0, status: "Next day" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Disruption" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-4">
          <h1 className="text-[22px] font-bold">Alternatives</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Porto → London · 30 Jun</p>
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 flex items-start gap-2.5">
          <Info size={13} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-amber-800 leading-relaxed">Availability and booking must be confirmed directly with the airline. Onward does not guarantee these options.</p>
        </div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["Earliest", "Fewest stops", "Same airline"].map((s) => (
            <button key={s} onClick={() => setSort(s.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0", sort === s.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {s}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-3">
          {alts.map((alt, i) => (
            <div key={i} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-[14px]">{alt.airline}</p>
                  <p className="text-[12px] text-muted-foreground">{alt.flight} · Non-stop</p>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", alt.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground")}>{alt.status}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-center"><p className="text-[20px] font-bold">{alt.dep}</p><p className="text-[10px] text-muted-foreground">OPO</p></div>
                <div className="flex-1 h-[1px] bg-border" />
                <div className="text-center"><p className="text-[20px] font-bold">{alt.arr}</p><p className="text-[10px] text-muted-foreground">LHR</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={onReplace} className="flex-1 h-9 bg-[#1C2B3A] text-white rounded-xl text-[12px] font-semibold">Replace reservation</button>
                <button className="flex-1 h-9 border border-border rounded-xl text-[12px] font-medium">Open airline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 11: Replace Reservation ──────────────────────────────────────────

export function ReplaceReservationScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [action, setAction] = useState("replace");

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Alternatives" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[22px] font-bold">Replace reservation</h1></div>

        <div className="mx-5 grid grid-cols-2 gap-2 mb-5">
          {[
            { label: "Existing", sub: "TP791 · Cancelled", bg: "bg-red-50 border-red-100" },
            { label: "Replacement", sub: "TP793 · 21:15", bg: "bg-emerald-50 border-emerald-100" },
          ].map((c) => (
            <div key={c.label} className={cn("border rounded-3xl p-4", c.bg)}>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{c.label}</p>
              <p className="font-semibold text-[14px]">{c.sub}</p>
              <p className="text-[12px] text-muted-foreground">Porto → London</p>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2 mb-5">
          {[
            { id: "replace", label: "Replace in Timeline", sub: "Original marked as cancelled" },
            { id: "both", label: "Keep both", sub: "Add replacement without removing original" },
            { id: "manual", label: "Save details manually", sub: "Copy flight info to add yourself" },
          ].map((opt) => (
            <button key={opt.id} onClick={() => setAction(opt.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left transition-all", action === opt.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", action === opt.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {action === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
              </div>
              <div><p className="font-semibold text-[14px]">{opt.label}</p><p className="text-[12px] text-muted-foreground">{opt.sub}</p></div>
            </button>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Confirm" onClick={onConfirm} />
          <SecondaryBtn label="Cancel" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 12: Leave-By Planner ─────────────────────────────────────────────

export function LeaveByPlannerScreen({ onBack, onDirections, onReminder }: { onBack: () => void; onDirections: () => void; onReminder: () => void }) {
  const [buffer, setBuffer] = useState(30);

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <button className="text-[#E07B5A] font-semibold text-[13px]">Settings</button>
        </div>

        <div className="px-5 pt-3 pb-5">
          <h1 className="text-[22px] font-bold">Leave-by planner</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Alfa Pendular AP 122 · 15:30 departure</p>
        </div>

        {/* Leave-by time big display */}
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-6 mb-4 text-center text-white shadow-lg">
          <p className="text-white/60 text-[13px] font-medium mb-2">Recommended leave-by time</p>
          <p className="text-[52px] font-bold leading-none mb-1">14:45</p>
          <p className="text-white/50 text-[13px]">{buffer} min buffer included</p>
        </div>

        {/* Breakdown */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Starting point", value: "Hotel Vista do Tejo, Lisbon" },
            { label: "Destination", value: "Lisboa Oriente Station" },
            { label: "Required arrival", value: "15:20 (10 min before departure)" },
            { label: "Travel time (taxi)", value: "~25 minutes" },
            { label: "Your buffer", value: `${buffer} minutes` },
            { label: "Leave by", value: "14:45" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Buffer slider */}
        <div className="mx-5 bg-card border border-border rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-semibold">Buffer time</p>
            <p className="text-[14px] font-bold text-[#E07B5A]">{buffer} min</p>
          </div>
          <input type="range" min={10} max={60} step={5} value={buffer} onChange={(e) => setBuffer(+e.target.value)} className="w-full accent-[#E07B5A]" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">10m</span>
            <span className="text-[10px] text-muted-foreground">60m</span>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Start directions" onClick={onDirections} />
          <button onClick={onReminder} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 active:opacity-70">
            <Bell size={15} />Set reminder for 14:45
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 13: Leave-By Settings ────────────────────────────────────────────

export function LeaveBySettingsScreen({ onBack }: { onBack: () => void }) {
  const [buffers, setBuffers] = useState({ domestic: 90, international: 150, train: 30, restaurant: 15, activity: 20 });
  const [useLiveTraffic, setUseLiveTraffic] = useState(true);
  type BufferKey = keyof typeof buffers;

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Leave-by" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Leave-by settings</h1></div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Buffers (minutes)</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { key: "domestic" as BufferKey, label: "Domestic flight" },
            { key: "international" as BufferKey, label: "International flight" },
            { key: "train" as BufferKey, label: "Train or bus" },
            { key: "restaurant" as BufferKey, label: "Restaurant" },
            { key: "activity" as BufferKey, label: "Activity" },
          ].map((row, i, arr) => (
            <div key={row.key} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setBuffers((b) => ({ ...b, [row.key]: Math.max(5, b[row.key] - 5) }))} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">−</button>
                <span className="w-10 text-center font-bold text-[14px]">{buffers[row.key]}</span>
                <button onClick={() => setBuffers((b) => ({ ...b, [row.key]: Math.min(240, b[row.key] + 5) }))} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="text-[14px] font-medium">Use live traffic</span>
            <button onClick={() => setUseLiveTraffic((v) => !v)} className={cn("w-12 h-7 rounded-full relative transition-colors", useLiveTraffic ? "bg-[#1C2B3A]" : "bg-muted")}>
              <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", useLiveTraffic ? "left-6" : "left-1")} />
            </button>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] font-medium">Include security estimate</span>
            <div className="w-12 h-7 rounded-full bg-[#1C2B3A] relative"><div className="absolute top-1 left-6 w-5 h-5 rounded-full bg-white shadow-sm" /></div>
          </div>
        </div>

        <div className="mx-5"><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Reset to defaults</button></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 14: Live Journey Map ──────────────────────────────────────────────

export function LiveJourneyMapScreen({ onBack, onPin }: { onBack: () => void; onPin: () => void }) {
  const [mode, setMode] = useState("current");

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Timeline" onPress={onBack} />
          <p className="text-[13px] font-bold">Live Journey Map</p>
          <div className="w-12" />
        </div>
        <JourneyNavBar active="map" onTimeline={() => {}} onMap={() => {}} onDocuments={() => {}} />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E8E4DC 0%, #DDD8CE 100%)" }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
            <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#B8B4A8" strokeWidth="3" />
            <line x1="20%" y1="30%" x2="20%" y2="75%" stroke="#B8B4A8" strokeWidth="2" />
          </svg>
          {/* Live route */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline points="25%,35% 50%,55% 72%,68%" fill="none" stroke="#E07B5A" strokeWidth="3" strokeDasharray="8,5" opacity="0.8" />
          </svg>
          {/* Current location */}
          <div className="absolute" style={{ left: "25%", top: "35%", transform: "translate(-50%,-50%)" }}>
            <div className="w-5 h-5 rounded-full bg-blue-500 border-3 border-white shadow-lg flex items-center justify-center" style={{ border: "3px solid white" }}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          {/* Delayed pin */}
          <div className="absolute cursor-pointer" onClick={onPin} style={{ left: "72%", top: "68%", transform: "translate(-50%,-100%)" }}>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-lg border-2 border-white">
              <Plane size={16} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white">
              <span className="text-white text-[9px] font-bold">!</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto mt-0.5" />
          </div>
        </div>

        {/* Mode selector */}
        <div className="absolute top-3 left-3 right-3 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["Current route", "All days", "Travellers"].map((m) => (
            <button key={m} onClick={() => setMode(m.toLowerCase())} className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 shadow-sm", mode === m.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-card/90 text-foreground")}>
              {m}
            </button>
          ))}
        </div>

        {/* Leave-by overlay */}
        <div className="absolute bottom-16 left-3 right-3 bg-[#E07B5A]/95 rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
          <Timer size={14} className="text-white flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-[12px] font-bold">Leave by 14:45</p>
            <p className="text-white/70 text-[10px]">for 15:30 train at Oriente</p>
          </div>
          <button className="text-white/80 text-[11px] font-bold">Navigate</button>
        </div>

        {/* Controls */}
        <div className="absolute right-3 bottom-24 flex flex-col gap-2">
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center"><Crosshair size={16} className="text-[#1C2B3A]" /></button>
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center"><Navigation size={16} className="text-[#1C2B3A]" /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 15: Directions Handoff ────────────────────────────────────────────

export function DirectionsHandoffScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 relative bg-muted/40 flex items-center justify-center">
        <p className="text-muted-foreground text-[13px]">Map preview</p>
        <button onClick={onBack} className="absolute top-4 right-4 w-9 h-9 bg-card rounded-full shadow-md flex items-center justify-center">
          <X size={16} />
        </button>
      </div>
      <div className="flex-shrink-0 bg-card rounded-t-3xl shadow-2xl px-5 pt-4 pb-8">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center"><MapPin size={18} className="text-red-500" /></div>
          <div>
            <p className="font-bold text-[16px]">Lisboa Oriente Station</p>
            <p className="text-[12px] text-muted-foreground">Av. Dom João II · ~25 min by taxi</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="flex items-center justify-center gap-2 bg-[#1C2B3A] text-white rounded-2xl py-3.5 font-semibold text-[14px]"><Navigation size={15} />Apple Maps</button>
          <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3.5 font-semibold text-[14px]"><Map size={15} />Google Maps</button>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl py-2.5 text-[13px] font-medium text-muted-foreground"><Copy size={13} />Copy address</button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl py-2.5 text-[13px] font-medium text-muted-foreground"><Share2 size={13} />Share</button>
          <button onClick={onBack} className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl py-2.5 text-[13px] font-medium text-muted-foreground">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 16: Airport Mode ──────────────────────────────────────────────────

export function AirportModeScreen({ onBack, onBoardingPass, onMap, onConnection }: { onBack: () => void; onBoardingPass: () => void; onMap: () => void; onConnection: () => void }) {
  const [status, setStatus] = useState<LiveStatus>("boarding");

  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-3 pb-3">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white/60 text-[14px] font-semibold flex items-center gap-0.5">
            <ChevronDown size={18} className="rotate-90 text-white/60" />Back
          </button>
          <div className="flex gap-1.5">
            {(["boarding","gate-closing","delayed","on-time"] as LiveStatus[]).map((v) => (
              <button key={v} onClick={() => setStatus(v)} className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap", status === v ? "bg-white/20 text-white" : "text-white/30")}>
                {v}
              </button>
            ))}
          </div>
          <DataFreshness time="just now" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center text-white">
        <div className="mb-6">
          <p className="text-white/50 text-[14px] font-medium mb-1">TAP Air Portugal · TP791</p>
          <div className="flex items-center justify-center gap-4">
            <div><p className="text-[44px] font-bold leading-none">OPO</p><p className="text-white/50 text-[13px]">Porto</p></div>
            <Plane size={24} className="text-white/40" />
            <div><p className="text-[44px] font-bold leading-none">LHR</p><p className="text-white/50 text-[13px]">London</p></div>
          </div>
        </div>

        <LiveStatusBadge status={status} delay={status === "delayed" ? "45m" : undefined} />

        {/* Key info */}
        <div className="grid grid-cols-2 gap-4 mt-8 w-full">
          <div className="bg-white/10 rounded-3xl p-5">
            <p className="text-white/50 text-[11px] font-medium mb-1">Gate</p>
            <p className="text-[42px] font-bold leading-none">B14</p>
            {status === "boarding" && <p className="text-emerald-300 text-[11px] font-bold mt-1">Now boarding</p>}
            {status === "gate-closing" && <p className="text-orange-300 text-[11px] font-bold mt-1">Closing soon</p>}
          </div>
          <div className="bg-white/10 rounded-3xl p-5">
            <p className="text-white/50 text-[11px] font-medium mb-1">Boarding</p>
            <p className="text-[42px] font-bold leading-none">{status === "delayed" ? "20:10" : "18:25"}</p>
            {status === "boarding" && <p className="text-emerald-300 text-[11px] font-bold mt-1">Group 2</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 w-full">
          {[{ label: "Terminal", value: "1" }, { label: "Seat", value: "22A" }, { label: "Group", value: "2" }].map((i) => (
            <div key={i.label} className="bg-white/10 rounded-2xl py-3">
              <p className="text-white/50 text-[10px]">{i.label}</p>
              <p className="text-[20px] font-bold">{i.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 px-5 pb-8 grid grid-cols-3 gap-2">
        <button onClick={onBoardingPass} className="flex flex-col items-center gap-1.5 bg-white/10 rounded-2xl py-3 active:opacity-70">
          <QrCode size={20} className="text-white" /><span className="text-[10px] text-white/70 font-semibold">Boarding pass</span>
        </button>
        <button onClick={onMap} className="flex flex-col items-center gap-1.5 bg-white/10 rounded-2xl py-3 active:opacity-70">
          <Map size={20} className="text-white" /><span className="text-[10px] text-white/70 font-semibold">Airport map</span>
        </button>
        <button onClick={onConnection} className="flex flex-col items-center gap-1.5 bg-white/10 rounded-2xl py-3 active:opacity-70">
          <ArrowRight size={20} className="text-white" /><span className="text-[10px] text-white/70 font-semibold">Connection</span>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 17: Station Mode ──────────────────────────────────────────────────

export function StationModeScreen({ onBack, onTicket }: { onBack: () => void; onTicket: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60 text-[14px] font-semibold flex items-center gap-0.5">
          <ChevronDown size={18} className="rotate-90 text-white/60" />Back
        </button>
        <DataFreshness time="1m ago" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center text-white">
        <p className="text-white/50 text-[14px] font-medium mb-1">Comboios de Portugal · AP 122</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div><p className="text-[36px] font-bold leading-none">LIS</p><p className="text-white/50 text-[12px]">Lisboa Oriente</p></div>
          <Train size={20} className="text-white/40" />
          <div><p className="text-[36px] font-bold leading-none">OPO</p><p className="text-white/50 text-[12px]">Porto Campanhã</p></div>
        </div>
        <LiveStatusBadge status="on-time" />

        <div className="grid grid-cols-2 gap-4 mt-8 w-full">
          <div className="bg-white/10 rounded-3xl p-5">
            <p className="text-white/50 text-[11px] font-medium mb-1">Platform</p>
            <p className="text-[52px] font-bold leading-none">2</p>
          </div>
          <div className="bg-white/10 rounded-3xl p-5">
            <p className="text-white/50 text-[11px] font-medium mb-1">Departs</p>
            <p className="text-[38px] font-bold leading-none">15:30</p>
            <p className="text-emerald-300 text-[11px] font-bold mt-1">On time</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 w-full">
          {[{ label: "Car", value: "3" }, { label: "Seat", value: "22A" }].map((i) => (
            <div key={i.label} className="bg-white/10 rounded-2xl py-3"><p className="text-white/50 text-[10px]">{i.label}</p><p className="text-[24px] font-bold">{i.value}</p></div>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-8 grid grid-cols-2 gap-2">
        <button onClick={onTicket} className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl py-3.5 text-white font-semibold active:opacity-70"><QrCode size={18} />Ticket</button>
        <button className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl py-3.5 text-white font-semibold active:opacity-70"><Navigation size={18} />Directions</button>
      </div>
    </div>
  );
}

// ─── Screen 18: Boarding Pass Quick View ─────────────────────────────────────

export function BoardingPassViewScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60"><X size={22} /></button>
        <p className="text-white font-semibold text-[15px]">Boarding Pass</p>
        <button className="text-white/60"><Share2 size={20} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Boarding pass card */}
        <div className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-[#1C2B3A] px-5 py-4">
            <div className="flex items-center justify-between">
              <div><p className="text-white/60 text-[11px]">TAP Air Portugal</p><p className="text-white font-bold text-[18px]">TP 791</p></div>
              <div className="text-right"><p className="text-white/60 text-[11px]">Economy</p><p className="text-white font-bold">Group 2</p></div>
            </div>
          </div>
          {/* Route */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-muted">
            <div><p className="text-[32px] font-bold">OPO</p><p className="text-muted-foreground text-[12px]">Porto</p></div>
            <Plane size={20} className="text-muted-foreground" />
            <div className="text-right"><p className="text-[32px] font-bold">LHR</p><p className="text-muted-foreground text-[12px]">London</p></div>
          </div>
          {/* Details */}
          <div className="grid grid-cols-3 px-5 py-3 border-b border-dashed border-muted gap-2">
            {[{ label: "Date", value: "30 JUN" }, { label: "Gate", value: "B14" }, { label: "Seat", value: "22A" }, { label: "Boarding", value: "18:25" }, { label: "Departs", value: "18:55" }, { label: "Class", value: "Economy" }].map((i) => (
              <div key={i.label} className="text-center py-1"><p className="text-[10px] text-muted-foreground">{i.label}</p><p className="font-bold text-[13px]">{i.value}</p></div>
            ))}
          </div>
          {/* Passenger */}
          <div className="px-5 py-3 border-b border-dashed border-muted">
            <p className="text-[10px] text-muted-foreground">Passenger</p>
            <p className="font-bold text-[16px]">CHEN / SARAH</p>
          </div>
          {/* QR */}
          <div className="flex flex-col items-center py-5">
            <div className="w-40 h-40 bg-muted/30 rounded-2xl flex items-center justify-center">
              <QrCode size={100} className="text-[#1C2B3A]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-8 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white rounded-2xl py-3 font-semibold text-[13px]"><Download size={15} />Add to Wallet</button>
        <button onClick={onBack} className="px-4 bg-white/10 text-white rounded-2xl py-3 font-semibold text-[13px]">Close</button>
      </div>
    </div>
  );
}

// ─── Screen 19: Ticket Quick View ─────────────────────────────────────────────

export function TicketViewScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60"><X size={22} /></button>
        <p className="text-white font-semibold text-[15px]">Train Ticket</p>
        <button className="text-white/60"><Share2 size={20} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden shadow-2xl">
          <div className="bg-[#1C2B3A] px-5 py-4 flex items-center justify-between">
            <div><p className="text-white/60 text-[11px]">Comboios de Portugal</p><p className="text-white font-bold text-[18px]">AP 122</p></div>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-muted">
            <div><p className="text-[24px] font-bold">Lisboa</p><p className="text-muted-foreground text-[11px]">Oriente · Platform 2</p></div>
            <Train size={18} className="text-muted-foreground" />
            <div className="text-right"><p className="text-[24px] font-bold">Porto</p><p className="text-muted-foreground text-[11px]">Campanhã</p></div>
          </div>
          <div className="grid grid-cols-3 px-5 py-3 border-b border-dashed border-muted gap-2">
            {[{ label: "Date", value: "30 JUN" }, { label: "Departs", value: "15:30" }, { label: "Seat", value: "22A" }, { label: "Car", value: "3" }, { label: "Class", value: "1st" }, { label: "Ref", value: "CP-882" }].map((i) => (
              <div key={i.label} className="text-center py-1"><p className="text-[10px] text-muted-foreground">{i.label}</p><p className="font-bold text-[13px]">{i.value}</p></div>
            ))}
          </div>
          <div className="flex flex-col items-center py-5">
            <div className="w-40 h-40 bg-muted/30 rounded-2xl flex items-center justify-center"><QrCode size={100} className="text-[#1C2B3A]" /></div>
            <p className="text-muted-foreground text-[11px] mt-2">CHEN / SARAH</p>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-8">
        <button onClick={onBack} className="w-full h-[48px] bg-white/10 text-white rounded-2xl font-semibold text-[14px]">Close</button>
      </div>
    </div>
  );
}

// ─── Screen 20: Airport/Station Map ──────────────────────────────────────────

export function AirportStationMapScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 flex items-center justify-between bg-background">
        <BackBtn label="Airport mode" onPress={onBack} />
        <h2 className="text-[17px] font-bold">Terminal 1</h2>
        <button className="text-muted-foreground"><Search size={18} /></button>
      </div>

      <div className="flex-1 relative overflow-hidden" style={{ background: "#EDE9E3" }}>
        {/* Simplified terminal map */}
        <div className="absolute inset-4 rounded-3xl border-2 border-muted-foreground/20 bg-card/50 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-3 p-6 w-full">
            {[
              { label: "B14", sub: "Your gate", highlight: true },
              { label: "B16", sub: "" },
              { label: "B18", sub: "" },
              { label: "B20", sub: "" },
              { label: "C5", sub: "Next flight", highlight: true },
              { label: "C7", sub: "" },
              { label: "Security", sub: "" },
              { label: "Lounge", sub: "" },
            ].map((loc) => (
              <div key={loc.label} className={cn("rounded-xl p-2 text-center", loc.highlight ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
                <p className={cn("font-bold text-[12px]", loc.highlight ? "text-white" : "")}>{loc.label}</p>
                {loc.sub && <p className={cn("text-[9px]", loc.highlight ? "text-white/70" : "")}>{loc.sub}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 bg-card/90 rounded-2xl px-4 py-2.5 border border-border">
          <p className="text-[11px] text-muted-foreground text-center">Indoor maps are illustrative. Coverage may vary. Always follow official airport signage.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Screens 21–23: Baggage ────────────────────────────────────────────────────

export function BaggageSummaryScreen({ onBack, onBagDetail }: { onBack: () => void; onBagDetail: () => void }) {
  const bags = [
    { tag: "TG-4429-81", status: "at-carousel", flight: "TP791", carousel: "Belt 4", color: "text-emerald-700 bg-emerald-50" },
    { tag: "TG-4429-82", status: "in-transit", flight: "TP791", carousel: "—", color: "text-amber-700 bg-amber-50" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Airport mode" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[22px] font-bold">Baggage</h1><p className="text-[12px] text-muted-foreground mt-0.5">TP791 · Porto → London</p></div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Sarah Chen · 2 checked bags</p></div>
        <div className="px-5 space-y-3 mb-5">
          {bags.map((bag) => (
            <div key={bag.tag} onClick={onBagDetail} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", bag.color)}>{bag.status.replace("-", " ").toUpperCase()}</div>
                {bag.carousel !== "—" && <p className="text-[12px] font-semibold text-emerald-700">Carousel: {bag.carousel}</p>}
              </div>
              <p className="text-[13px] text-muted-foreground font-mono">{bag.tag}</p>
              <p className="text-[12px] text-muted-foreground">{bag.flight}</p>
            </div>
          ))}
        </div>

        <div className="mx-5"><button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Report baggage issue</button></div>
        <p className="text-[11px] text-muted-foreground text-center mt-4 px-8">Baggage status is provided by the airline and may not update in real time.</p>
      </div>
    </Scroll>
  );
}

export function BaggageDetailScreen({ onBack, onReport }: { onBack: () => void; onReport: () => void }) {
  const timeline = [
    { status: "At carousel", loc: "London Heathrow T2 · Belt 4", time: "22:05", done: true },
    { status: "Arrived LHR", loc: "London Heathrow", time: "21:58", done: true },
    { status: "Transferred", loc: "OPO → LHR hold", time: "18:30", done: true },
    { status: "Loaded", loc: "Porto Airport · Ramp", time: "18:10", done: true },
    { status: "Checked in", loc: "Porto Check-in", time: "16:45", done: true },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Baggage" onPress={onBack} /></div>
        <div className="mx-5 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 mb-4 flex items-center gap-2.5">
          <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
          <div>
            <p className="text-[13px] font-bold text-emerald-800">At carousel — Belt 4</p>
            <p className="text-[11px] text-emerald-700">London Heathrow T2</p>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Bag tag", value: "TG-4429-81" },
            { label: "Passenger", value: "Sarah Chen" },
            { label: "Flight", value: "TP791 Porto → London" },
            { label: "Carousel", value: "Belt 4 · Terminal 2" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Journey</p></div>
        <div className="px-5 relative mb-5">
          <div className="absolute left-[21px] top-3 bottom-3 w-[1px] bg-border" />
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <div className={cn("w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center mt-1 relative z-10", step.done ? "bg-emerald-500 border-emerald-500" : "bg-card border-border")}>
                {step.done && <Check size={10} className="text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold text-[13px]">{step.status}</p>
                  <p className="text-[11px] text-muted-foreground">{step.time}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">{step.loc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5"><button onClick={onReport} className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Report issue</button></div>
      </div>
    </Scroll>
  );
}

export function ReportBaggageIssueScreen({ onBack }: { onBack: () => void }) {
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Baggage" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Report issue</h2>
          <div className="w-12" />
        </div>

        <div className="mx-5 bg-sky-50 border border-sky-200 rounded-2xl p-3.5 mb-5">
          <p className="text-[12px] text-sky-800 leading-relaxed">Onward helps you organise your information. To file an official claim, contact the airline directly. Their contact details are below.</p>
        </div>

        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Bag tag number</label>
            <input className={fieldCls} defaultValue="TG-4429-81" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Issue type</label>
            <select className={cn(fieldCls, "appearance-none")}>
              <option>Bag not arrived</option>
              <option>Bag damaged</option>
              <option>Wrong bag delivered</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Report reference (from airline)</label>
            <input className={fieldCls} placeholder="e.g. LHR-12345" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label>
            <textarea className={cn(fieldCls, "resize-none h-20")} placeholder="Describe the issue…" />
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">TAP Air Portugal contact</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-muted rounded-2xl py-2.5 text-[13px] font-semibold"><Phone size={14} />Call airline</button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-muted rounded-2xl py-2.5 text-[13px] font-semibold"><Globe size={14} />Website</button>
          </div>
        </div>

        <div className="mx-5"><PrimaryBtn label="Save report" /></div>
      </div>
    </Scroll>
  );
}

// ─── Screens 24–25: Collaboration ─────────────────────────────────────────────

export function JourneyMembersScreen({ onBack, onInvite, onMember }: { onBack: () => void; onInvite: () => void; onMember: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <button onClick={onInvite} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center shadow-sm">
            <UserPlus size={15} className="text-white" />
          </button>
        </div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Journey members</h1><p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto · 3 members</p></div>

        <div className="px-5 space-y-3 mb-5">
          {JOURNEY_MEMBERS.map((m) => (
            <div key={m.name} onClick={onMember} className="bg-card border border-border rounded-3xl p-4 flex items-center gap-3.5 cursor-pointer active:opacity-80 shadow-sm">
              <MemberAvatar name={m.name} color={m.color} />
              <div className="flex-1">
                <div className="flex items-center gap-2"><p className="font-bold text-[15px]">{m.name}</p>
                  {m.role === "Owner" && <span className="text-[9px] font-bold text-[#E07B5A] bg-[#E07B5A]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Owner</span>}
                </div>
                <p className="text-[12px] text-muted-foreground">{m.role} · Active {m.last}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        {/* Pending */}
        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Pending invitation</p></div>
        <div className="mx-5 bg-muted/50 border border-border rounded-3xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><User size={18} className="text-muted-foreground" /></div>
          <div className="flex-1"><p className="font-semibold text-[14px]">alex.morgan@gmail.com</p><p className="text-[12px] text-muted-foreground">Viewer · Sent 2 days ago</p></div>
          <button className="text-[12px] font-bold text-[#E07B5A]">Resend</button>
        </div>
      </div>
    </Scroll>
  );
}

export function InviteToJourneyScreen({ onBack, onSend }: { onBack: () => void; onSend: () => void }) {
  const [permission, setPermission] = useState("view");
  const perms = [
    { id: "view", label: "Can view", sub: "See Timeline, reservations and documents" },
    { id: "add", label: "Can add plans", sub: "Add reservations and documents" },
    { id: "edit", label: "Can edit Journey", sub: "Edit reservations, invite others" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Invite to Journey</h2>
          <button onClick={onSend} className="text-[#E07B5A] font-bold text-[15px]">Send</button>
        </div>

        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Email or phone</label>
            <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" placeholder="name@email.com or +44…" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Message (optional)</label>
            <textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] outline-none resize-none h-20 placeholder:text-muted-foreground/50" placeholder="Join my journey to Lisbon…" />
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Permission</p>
          <div className="space-y-2">
            {perms.map((p) => (
              <button key={p.id} onClick={() => setPermission(p.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left transition-all", permission === p.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", permission === p.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {permission === p.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                </div>
                <div><p className="font-semibold text-[14px]">{p.label}</p><p className="text-[12px] text-muted-foreground">{p.sub}</p></div>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
          <Link size={15} className="text-muted-foreground flex-shrink-0" />
          <div className="flex-1"><p className="text-[13px] font-semibold">Share invitation link</p><p className="text-[11px] text-muted-foreground">Anyone with the link can join</p></div>
          <button className="text-[#E07B5A] text-[12px] font-bold">Copy</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 26: Invitation Received ───────────────────────────────────────────

export function InvitationReceivedScreen({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-6">
          <MemberAvatar name="Sarah Chen" color="#1C2B3A" size={48} />
          <div>
            <p className="font-bold text-[16px]">Sarah Chen</p>
            <p className="text-[13px] text-muted-foreground">invited you to join a Journey</p>
          </div>
        </div>

        <div className="bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/60 text-[12px] mb-1">Journey</p>
          <h2 className="text-[24px] font-bold" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Lisbon & Porto</h2>
          <p className="text-white/60 text-[13px] mt-1">Portugal · 27 Jun – 5 Jul 2026</p>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              {JOURNEY_MEMBERS.slice(0,2).map((m) => (
                <MemberAvatar key={m.name} name={m.name} color={m.color} size={24} />
              ))}
            </div>
            <p className="text-white/60 text-[12px]">2 members</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Your access</p>
          <div className="flex items-center gap-2 mb-1"><Check size={14} className="text-emerald-500" /><span className="text-[13px]">View Timeline and reservations</span></div>
          <div className="flex items-center gap-2 mb-1"><Check size={14} className="text-emerald-500" /><span className="text-[13px]">View documents</span></div>
          <div className="flex items-center gap-2"><X size={14} className="text-muted-foreground" /><span className="text-[13px] text-muted-foreground">Cannot edit or add plans</span></div>
        </div>
      </div>

      <div className="space-y-2.5">
        <PrimaryBtn label="Accept invitation" onClick={onAccept} />
        <SecondaryBtn label="Decline" onClick={onDecline} />
        <button className="w-full text-[13px] text-muted-foreground font-medium py-1">View privacy details</button>
      </div>
    </div>
  );
}

// ─── Screen 27: Member Permissions ────────────────────────────────────────────

export function MemberPermissionsScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [role, setRole] = useState("viewer");
  const roles = [
    { id: "viewer", label: "Viewer", sub: "Can see the Journey" },
    { id: "contributor", label: "Contributor", sub: "Can add plans and documents" },
    { id: "editor", label: "Editor", sub: "Can edit reservations and invite members" },
  ];
  const advancedPerms = ["View Timeline", "View documents", "View confirmation numbers", "Add plans", "Edit reservations", "Invite members"];
  const enabledByRole = { viewer: [0,1], contributor: [0,1,3], editor: [0,1,2,3,4,5] };

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Members" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Permissions</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold text-[15px]">Save</button>
        </div>

        <div className="mx-5 flex items-center gap-3 mb-5 bg-muted/50 rounded-3xl p-4">
          <MemberAvatar name="James Chen" color="#E07B5A" />
          <div><p className="font-bold text-[15px]">James Chen</p><p className="text-[12px] text-muted-foreground capitalize">Currently: {role}</p></div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Role</p>
          <div className="space-y-2">
            {roles.map((r) => (
              <button key={r.id} onClick={() => setRole(r.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left transition-all", role === r.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", role === r.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {role === r.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                </div>
                <div><p className="font-semibold text-[14px]">{r.label}</p><p className="text-[12px] text-muted-foreground">{r.sub}</p></div>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Permissions granted</p></div>
          {advancedPerms.map((p, i) => {
            const enabled = (enabledByRole[role as keyof typeof enabledByRole] as number[]).includes(i);
            return (
              <div key={p} className={cn("flex items-center justify-between px-5 py-3", i < advancedPerms.length - 1 && "border-b border-border")}>
                <span className={cn("text-[13px]", enabled ? "text-foreground" : "text-muted-foreground/50")}>{p}</span>
                {enabled ? <Check size={15} className="text-emerald-500" /> : <X size={15} className="text-muted-foreground/30" />}
              </div>
            );
          })}
        </div>

        <div className="mx-5"><button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Remove from Journey</button></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 28: Journey Activity ──────────────────────────────────────────────

export function JourneyActivityScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const [filter, setFilter] = useState("all");
  const activities = [
    { member: JOURNEY_MEMBERS[1], action: "Added a restaurant", item: "Taberna da Rua das Flores", time: "5 min ago", icon: <UtensilsCrossed size={13} /> },
    { member: JOURNEY_MEMBERS[2], action: "Uploaded a document", item: "Travel insurance policy.pdf", time: "1 hour ago", icon: <FileText size={13} /> },
    { member: JOURNEY_MEMBERS[0], action: "Accepted an import", item: "Alfa Pendular AP 122", time: "2 hours ago", icon: <Train size={13} /> },
    { member: JOURNEY_MEMBERS[1], action: "Changed hotel dates", item: "The Yeatman Hotel", time: "Yesterday", icon: <Hotel size={13} /> },
    { member: JOURNEY_MEMBERS[0], action: "Created Journey", item: "Lisbon & Porto", time: "15 Jun", icon: <MapPin size={13} /> },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Activity</h1></div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["All", "Reservations", "Documents", "Members", "Comments"].map((f) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 transition-colors", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-2">
          {activities.map((act, i) => (
            <div key={i} onClick={onItem} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-start gap-3 cursor-pointer active:opacity-70">
              <MemberAvatar name={act.member.name} color={act.member.color} size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px]"><span className="font-semibold">{act.member.name.split(" ")[0]}</span> {act.action}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-muted-foreground">{act.icon}</span>
                  <p className="text-[11px] text-muted-foreground truncate">{act.item}</p>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground flex-shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 29: Activity Detail ───────────────────────────────────────────────

export function ActivityDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Activity" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <MemberAvatar name="James Chen" color="#E07B5A" size={40} />
            <div>
              <p className="font-bold text-[15px]">James Chen</p>
              <p className="text-[12px] text-muted-foreground">Changed hotel dates · 30 Jun · 14:22</p>
            </div>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Change</p></div>
          {[
            { label: "Reservation", value: "The Yeatman Hotel" },
            { label: "Field", value: "Check-out date" },
          ].map((r, i) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i === 0 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
          <div className="px-5 py-4 border-t border-border">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Value changed</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-red-50 rounded-xl px-3 py-2 text-center"><p className="text-[10px] text-red-600 font-semibold">Before</p><p className="text-[14px] font-bold text-red-700 line-through">4 Jul</p></div>
              <ArrowRight size={14} className="text-muted-foreground" />
              <div className="flex-1 bg-emerald-50 rounded-xl px-3 py-2 text-center"><p className="text-[10px] text-emerald-600 font-semibold">After</p><p className="text-[14px] font-bold text-emerald-700">5 Jul</p></div>
            </div>
          </div>
        </div>

        <div className="mx-5"><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Restore previous value</button></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 30: Reservation Comments ─────────────────────────────────────────

export function ReservationCommentsScreen({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  const comments = [
    { member: JOURNEY_MEMBERS[0], text: "Check-out is at 12:00 — we need to sort luggage storage beforehand.", time: "14:20" },
    { member: JOURNEY_MEMBERS[1], text: "Hotel said they can keep bags until 18:00. I'll confirm.", time: "14:35" },
    { member: JOURNEY_MEMBERS[2], text: "Great, that works. The Yeatman has a lovely bar if we have time 😊", time: "14:52" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border">
        <BackBtn label="Reservation" onPress={onBack} />
        <div className="flex items-center gap-2 mt-2">
          <div className="w-7 h-7 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center"><Hotel size={14} className="text-[#E07B5A]" /></div>
          <p className="text-[13px] font-semibold">The Yeatman Hotel</p>
          <p className="text-[12px] text-muted-foreground">· 3 comments</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
        {comments.map((c, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <MemberAvatar name={c.member.name} color={c.member.color} size={28} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[12px] font-bold">{c.member.name.split(" ")[0]}</p>
                <p className="text-[11px] text-muted-foreground">{c.time}</p>
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                <p className="text-[13px] leading-snug">{c.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5">
            <textarea className="w-full bg-transparent text-[14px] outline-none resize-none max-h-20 placeholder:text-muted-foreground/60" placeholder="Add a comment…" value={text} onChange={(e) => setText(e.target.value)} rows={1} />
          </div>
          <button className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", text.length > 0 ? "bg-[#1C2B3A] active:opacity-80" : "bg-muted")}>
            <Send size={16} className={text.length > 0 ? "text-white" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 31: Journey Discussion ────────────────────────────────────────────

export function JourneyDiscussionScreen({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  const messages = [
    { member: JOURNEY_MEMBERS[0], text: "I've updated the train ticket for the 30th — seat 22A, car 3.", time: "09:15", pinned: true },
    { member: JOURNEY_MEMBERS[1], text: "Should we book the Belém tower tour in advance or just turn up?", time: "10:02" },
    { member: JOURNEY_MEMBERS[2], text: "Definitely book ahead — it gets very busy in summer.", time: "10:17" },
    { member: JOURNEY_MEMBERS[1], text: "Done! I've added it as a reservation — check the Timeline.", time: "10:45" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border flex items-center justify-between">
        <BackBtn label="Journey" onPress={onBack} />
        <h2 className="text-[17px] font-bold">Discussion</h2>
        <button className="text-muted-foreground"><Search size={18} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
        {messages.map((m, i) => (
          <div key={i}>
            {m.pinned && (
              <div className="flex items-center gap-1.5 mb-1 ml-9">
                <MapPin size={10} className="text-[#E07B5A]" />
                <span className="text-[10px] font-bold text-[#E07B5A] uppercase tracking-wide">Pinned</span>
              </div>
            )}
            <div className="flex items-start gap-2.5">
              <MemberAvatar name={m.member.name} color={m.member.color} size={28} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[12px] font-bold">{m.member.name.split(" ")[0]}</p>
                  <p className="text-[11px] text-muted-foreground">{m.time}</p>
                </div>
                <div className={cn("rounded-2xl rounded-tl-sm px-3.5 py-2.5", m.pinned ? "bg-[#E07B5A]/10 border border-[#E07B5A]/20" : "bg-muted")}>
                  <p className="text-[13px] leading-snug">{m.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5">
            <textarea className="w-full bg-transparent text-[14px] outline-none resize-none max-h-20 placeholder:text-muted-foreground/60" placeholder="Message the group…" value={text} onChange={(e) => setText(e.target.value)} rows={1} />
          </div>
          <button className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", text.length > 0 ? "bg-[#1C2B3A]" : "bg-muted")}>
            <Send size={16} className={text.length > 0 ? "text-white" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 32: Change Approval ───────────────────────────────────────────────

export function ChangeApprovalScreen({ onBack, onApprove, onReject }: { onBack: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Activity" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <MemberAvatar name="James Chen" color="#E07B5A" size={40} />
            <div>
              <p className="text-[12px] text-muted-foreground">James Chen proposes a change</p>
              <p className="font-bold text-[15px]">Alfa Pendular AP 122</p>
            </div>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Proposed change</p></div>
          <div className="px-5 py-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Departure time</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-red-50 rounded-xl px-3 py-2 text-center"><p className="text-[10px] text-red-600 font-semibold">Current</p><p className="text-[17px] font-bold text-red-700 line-through">15:30</p></div>
              <ArrowRight size={14} className="text-muted-foreground" />
              <div className="flex-1 bg-sky-50 rounded-xl px-3 py-2 text-center"><p className="text-[10px] text-sky-600 font-semibold">Proposed</p><p className="text-[17px] font-bold text-sky-700">16:00</p></div>
            </div>
            <p className="text-[12px] text-muted-foreground mt-3 leading-relaxed">"Changed to give us more time after hotel checkout." — James</p>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={onApprove} className="w-full h-[52px] bg-emerald-600 text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2"><ThumbsUp size={16} />Approve change</button>
          <button onClick={onReject} className="w-full h-[48px] bg-red-50 border border-red-100 rounded-2xl font-semibold text-[14px] text-red-600 flex items-center justify-center gap-2"><ThumbsDown size={16} />Reject</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2"><MessageSquare size={15} />Discuss</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 33: Collaboration Notification Settings ───────────────────────────

export function CollaborationNotificationSettingsScreen({ onBack }: { onBack: () => void }) {
  const [master, setMaster] = useState(true);
  const items = ["Invitations", "Reservation changes", "New plans", "Deleted plans", "Comments", "Mentions", "Documents", "Member changes", "Approval requests", "Daily summary"];
  const [toggles, setToggles] = useState(items.map(() => true));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Collaboration alerts</h1><p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto</p></div>

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 mb-4 flex items-center justify-between shadow-sm">
          <div><p className="font-semibold text-[15px]">Enable collaboration alerts</p><p className="text-[12px] text-muted-foreground">All collaboration notifications</p></div>
          <button onClick={() => setMaster((m) => !m)} className={cn("w-12 h-7 rounded-full relative transition-colors", master ? "bg-[#1C2B3A]" : "bg-muted")}>
            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", master ? "left-6" : "left-1")} />
          </button>
        </div>

        <div className={cn("mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm", !master && "opacity-40 pointer-events-none")}>
          {items.map((item, i) => (
            <div key={item} className={cn("flex items-center justify-between px-5 py-3.5", i < items.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{item}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Use global defaults</button>
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Reset to defaults</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 34–36: Location sharing ─────────────────────────────────────────

export function TravellerLocationsScreen({ onBack, onShareLocation, onPrivacy }: { onBack: () => void; onShareLocation: () => void; onPrivacy: () => void }) {
  const sharingMembers = [JOURNEY_MEMBERS[0], JOURNEY_MEMBERS[1]];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <BackBtn label="Journey" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Traveller locations</h2>
          <button onClick={onPrivacy} className="text-muted-foreground"><Lock size={18} /></button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#E8E4DC,#DDD8CE)" }}>
        {/* Traveller markers */}
        <div className="absolute" style={{ left: "35%", top: "40%", transform: "translate(-50%,-100%)" }}>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden flex items-center justify-center text-white font-bold" style={{ background: "#1C2B3A" }}>SC</div>
          <div className="text-center mt-1"><div className="bg-card rounded-full px-2 py-0.5 shadow text-[10px] font-semibold">Sarah</div></div>
        </div>
        <div className="absolute" style={{ left: "60%", top: "55%", transform: "translate(-50%,-100%)" }}>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden flex items-center justify-center text-white font-bold" style={{ background: "#E07B5A" }}>JC</div>
          <div className="text-center mt-1"><div className="bg-card rounded-full px-2 py-0.5 shadow text-[10px] font-semibold">James</div></div>
        </div>

        <div className="absolute right-3 bottom-3 flex flex-col gap-2">
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center"><Crosshair size={16} className="text-[#1C2B3A]" /></button>
        </div>
      </div>

      {/* Member list */}
      <div className="flex-shrink-0 bg-card border-t border-border px-5 pt-3 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Sharing now ({sharingMembers.length})</p>
          <button onClick={onShareLocation} className="text-[12px] font-bold text-[#E07B5A]">Share my location</button>
        </div>
        <div className="flex gap-3">
          {sharingMembers.map((m) => (
            <div key={m.name} className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2">
              <MemberAvatar name={m.name} color={m.color} size={24} />
              <div>
                <p className="text-[12px] font-semibold">{m.name.split(" ")[0]}</p>
                <p className="text-[10px] text-muted-foreground">Just now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShareMyLocationScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  const [duration, setDuration] = useState("journey");
  const [precision, setPrecision] = useState("approximate");
  const [selectedMembers, setSelectedMembers] = useState([0, 1, 2]);
  const durations = [{ id: "1h", label: "1 hour" }, { id: "day", label: "Until end of day" }, { id: "journey", label: "During this Journey" }, { id: "custom", label: "Custom" }];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Share my location</h2>
          <button onClick={onStart} className="text-[#E07B5A] font-bold text-[15px]">Start</button>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Duration</p>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((d) => (
              <button key={d.id} onClick={() => setDuration(d.id)} className={cn("rounded-2xl py-3 text-[13px] font-semibold border-2 transition-all", duration === d.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>{d.label}</button>
            ))}
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Precision</p>
          <div className="grid grid-cols-2 gap-2">
            {["Approximate", "Precise"].map((p) => (
              <button key={p} onClick={() => setPrecision(p.toLowerCase())} className={cn("rounded-2xl py-3 text-[13px] font-semibold border-2 transition-all", precision === p.toLowerCase() ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>{p}</button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">Approximate shows your general area, not your exact location.</p>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Share with</p>
          {JOURNEY_MEMBERS.map((m, i) => (
            <button key={m.name} onClick={() => setSelectedMembers((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className="flex items-center gap-3 w-full mb-2.5">
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selectedMembers.includes(i) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {selectedMembers.includes(i) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <MemberAvatar name={m.name} color={m.color} size={28} />
              <p className="text-[14px] font-medium">{m.name}</p>
              {m.role === "Owner" && <span className="text-[10px] text-muted-foreground">(you)</span>}
            </button>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-2xl p-3.5">
          <div className="flex items-start gap-2"><Shield size={13} className="text-muted-foreground mt-0.5 flex-shrink-0" /><p className="text-[12px] text-muted-foreground leading-relaxed">Location sharing runs in the background and uses battery. You can stop sharing at any time. Onward does not store your location history.</p></div>
        </div>
      </div>
    </Scroll>
  );
}

export function LocationSharingPrivacyScreen({ onBack, onStop }: { onBack: () => void; onStop: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Locations" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Location sharing</h1></div>

        <div className="mx-5 bg-emerald-50 border border-emerald-200 rounded-3xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><p className="text-[12px] font-bold text-emerald-700">Sharing your location</p></div>
          <p className="text-[13px] text-emerald-800">During this Journey · Approximate precision</p>
          <p className="text-[12px] text-emerald-700 mt-1">Visible to: James Chen, Priya Patel</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Sharing with", value: "2 Journey members" },
            { label: "Duration", value: "During this Journey" },
            { label: "Precision", value: "Approximate" },
            { label: "Last update", value: "Just now" },
            { label: "Last accessed", value: "James Chen · 3 min ago" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px]">Change recipients</button>
          <button className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px]">Change precision</button>
          <button onClick={onStop} className="w-full h-[48px] bg-red-50 border border-red-100 rounded-2xl font-semibold text-[14px] text-red-600">Stop sharing immediately</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 37–39: Travel alerts ─────────────────────────────────────────────

export function TravelAlertInboxScreen({ onBack, onAlert }: { onBack: () => void; onAlert: () => void }) {
  const alerts = [
    { badge: "danger", title: "TP791 cancelled", sub: "Porto → London · Action required", journey: "Lisbon & Porto", time: "Now", read: false },
    { badge: "warning", title: "Connection at risk", sub: "45 min delay may affect BA285", journey: "Lisbon & Porto", time: "5m ago", read: false },
    { badge: "warning", title: "Leave by 14:45", sub: "For 15:30 train to Porto", journey: "Lisbon & Porto", time: "1h ago", read: true },
    { badge: "info", title: "Gate changed to B22", sub: "TP791 · Was B14", journey: "Lisbon & Porto", time: "2h ago", read: true },
    { badge: "info", title: "Bag at carousel — Belt 4", sub: "LHR Terminal 2", journey: "Lisbon & Porto", time: "Yesterday", read: true },
  ];

  const badgeColor: Record<string, string> = {
    danger: "bg-red-500", warning: "bg-amber-500", info: "bg-sky-400"
  };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <h1 className="text-[20px] font-bold">Alerts</h1>
          <button className="text-[12px] font-bold text-[#E07B5A]">Mark all read</button>
        </div>

        <div className="px-5 space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} onClick={onAlert} className={cn("bg-card border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm", alert.read ? "border-border" : "border-[#1C2B3A]/20")}>
              <div className="flex items-start gap-3">
                <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5", alert.read ? "bg-transparent" : badgeColor[alert.badge])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-[14px] leading-tight", alert.read ? "font-medium" : "font-bold")}>{alert.title}</p>
                    <span className="text-[11px] text-muted-foreground flex-shrink-0">{alert.time}</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{alert.sub}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{alert.journey}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function TravelAlertPreferencesScreen({ onBack }: { onBack: () => void }) {
  const groups = [
    { title: "Live travel", items: ["Flight status changes", "Gate changes", "Platform changes", "Delays", "Cancellations", "Diversions"] },
    { title: "Connections", items: ["Connection risk warnings", "Leave-by reminders"] },
    { title: "Baggage", items: ["Baggage status updates", "Carousel assignments"] },
    { title: "Collaboration", items: ["Member activity", "Change approvals", "Comments and mentions"] },
  ];
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Alert preferences</h1></div>

        {groups.map((g) => (
          <div key={g.title} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{g.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {g.items.map((item, i) => (
                <div key={item} className={cn("flex items-center justify-between px-5 py-3.5", i < g.items.length - 1 && "border-b border-border")}>
                  <span className="text-[14px] font-medium">{item}</span>
                  <button onClick={() => setToggles((t) => ({ ...t, [item]: !t[item] }))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[item] !== false ? "bg-[#1C2B3A]" : "bg-muted")}>
                    <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[item] !== false ? "left-6" : "left-1")} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

export function CriticalTravelAlertScreen({ onBack, onAlternatives, onConnection }: { onBack: () => void; onAlternatives: () => void; onConnection: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex justify-end"><button onClick={onBack} className="text-muted-foreground"><X size={22} /></button></div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-red-500 flex items-center justify-center mb-6 shadow-lg">
          <BellRing size={30} className="text-white" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-widest">Action required</span>
        </div>
        <h1 className="text-[26px] font-bold mb-3 leading-tight">Your flight has been cancelled</h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">TAP TP791 Porto → London on 30 June has been cancelled by the airline. You will need to arrange alternative travel.</p>

        <div className="bg-card border border-border rounded-3xl p-4 mb-5 shadow-sm">
          {[
            { label: "Flight", value: "TP791 OPO → LHR" },
            { label: "Was scheduled", value: "30 Jun · 18:55" },
            { label: "Booking ref", value: "TAP-2026-9922" },
            { label: "Next reservation", value: "Heathrow hotel · 23:00" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between py-2.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground mb-6 text-center">Last updated just now · Source: TAP Air Portugal</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="View alternatives" onClick={onAlternatives} />
        <button onClick={onConnection} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px]">Contact airline</button>
        <button onClick={onBack} className="w-full text-[13px] text-muted-foreground font-medium py-1">Dismiss</button>
      </div>
    </div>
  );
}

// ─── Screens 40–42: Live data settings ────────────────────────────────────────

export function LiveDataSettingsScreen({ onBack, onSource }: { onBack: () => void; onSource: () => void }) {
  const settings = [
    { label: "Live flight status", sub: "Gate, departure times, delays", on: true },
    { label: "Train and transport updates", sub: "Platform, schedule changes", on: true },
    { label: "Traffic and leave-by estimates", sub: "Uses device location", on: true },
    { label: "Indoor airport maps", sub: "Available for major airports", on: false },
    { label: "Baggage status", sub: "Where supported by airline", on: true },
    { label: "Use cellular data", sub: "Disable to use Wi-Fi only", on: true },
    { label: "Background refresh", sub: "Updates when app is closed", on: true },
  ];
  const [toggles, setToggles] = useState(settings.map((s) => s.on));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Live data</h1></div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {settings.map((s, i) => (
            <div key={s.label} className={cn("flex items-center justify-between px-5 py-4", i < settings.length - 1 && "border-b border-border")}>
              <div className="flex-1 pr-4"><p className="text-[14px] font-medium">{s.label}</p><p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p></div>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Data sources</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "FlightAware", sub: "Flight status and tracking" },
            { label: "Raildata UK", sub: "Train platform and delays" },
            { label: "Apple Maps", sub: "Traffic and directions" },
          ].map((src, i, arr) => (
            <div key={src.label} onClick={onSource} className={cn("flex items-center justify-between px-5 py-4 cursor-pointer active:bg-muted/40", i < arr.length - 1 && "border-b border-border")}>
              <div><p className="font-semibold text-[14px]">{src.label}</p><p className="text-[12px] text-muted-foreground">{src.sub}</p></div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function LiveDataSourceScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Live data" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-3"><Signal size={22} className="text-sky-600" /></div>
          <h1 className="text-[24px] font-bold">FlightAware</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Flight tracking and live status</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Data provided", value: "Flight status, gate, delays" },
            { label: "Coverage", value: "Global commercial flights" },
            { label: "Refresh rate", value: "Every 5 minutes" },
            { label: "Last update", value: "Just now" },
            { label: "Known limitations", value: "Charter and private flights may not appear" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-2xl p-3.5 mb-5">
          <div className="flex items-start gap-2"><Info size={13} className="text-muted-foreground mt-0.5 flex-shrink-0" /><p className="text-[12px] text-muted-foreground leading-relaxed">Onward uses FlightAware data for informational purposes. Always verify with your airline for official status. Onward is not responsible for inaccurate data from third-party providers.</p></div>
        </div>

        <div className="mx-5"><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold flex items-center justify-center gap-2"><RefreshCw size={14} />Refresh now</button></div>
      </div>
    </Scroll>
  );
}

export function UnsupportedLiveDataScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Reservation" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3"><Signal size={22} className="text-muted-foreground" /></div>
          <h1 className="text-[22px] font-bold">No live data available</h1>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">Onward cannot retrieve live status for this reservation. Check directly with the provider for real-time information.</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {[
            { label: "Reservation", value: "Taberna da Rua das Flores" },
            { label: "Provider", value: "OpenTable" },
            { label: "Date", value: "30 Jun 2026 · 20:00" },
            { label: "Reason", value: "Restaurant reservations do not have live status" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><Globe size={15} className="text-muted-foreground" />Open OpenTable<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><Pencil size={15} className="text-muted-foreground" />Enter status manually<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 3 System States (43–50) ────────────────────────────────────────────

export function LiveDataUnavailableScreen({ onRetry, onBack }: { onRetry: () => void; onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Signal size={32} className="text-muted-foreground" /></div>}
      title="Live data unavailable"
      body="Onward cannot reach the flight data service. Cached reservation details are shown below."
    >
      <PrimaryBtn label="Retry" onClick={onRetry} />
      <SecondaryBtn label="Open provider website" />
      <button onClick={onBack} className="w-full text-[14px] text-muted-foreground font-medium">Continue offline</button>
    </EmptyStateShell>
  );
}

export function StatusOutOfDateScreen({ onRefresh, onBack }: { onRefresh: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center mb-5"><Clock size={28} className="text-amber-600" /></div>
      <h2 className="text-[22px] font-bold mb-2">Status may be out of date</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">Last updated 12 minutes ago. Real-time conditions may have changed.</p>
      <p className="text-[12px] text-muted-foreground mb-8">Always verify with your airline or provider for the latest information.</p>
      <div className="w-full space-y-2.5">
        <PrimaryBtn label="Refresh" onClick={onRefresh} />
        <SecondaryBtn label="Verify with provider" onClick={onBack} />
      </div>
    </div>
  );
}

export function NoDisruptionsScreen({ onBack }: { onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"><CheckCircle size={36} className="text-emerald-500" /></div>}
      title="Everything looks on schedule"
      body="No delays, cancellations or disruptions detected for your current Journey. Last checked just now."
    >
      <PrimaryBtn label="View Timeline" onClick={onBack} />
    </EmptyStateShell>
  );
}

export function NoJourneyMembersScreen({ onInvite, onBack }: { onInvite: () => void; onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Users size={32} className="text-muted-foreground" /></div>}
      title="Just you so far"
      body="Invite friends, family or travel companions to view or collaborate on this Journey."
    >
      <PrimaryBtn label="Invite someone" onClick={onInvite} />
      <SecondaryBtn label="Continue alone" onClick={onBack} />
    </EmptyStateShell>
  );
}

export function PendingJourneyInvitationScreen({ onResend, onCancel }: { onResend: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-5"><Mail size={24} className="text-sky-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Invitation pending</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Waiting for alex.morgan@gmail.com to respond.</p>

        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          {[
            { label: "Sent to", value: "alex.morgan@gmail.com" },
            { label: "Permission", value: "Can view" },
            { label: "Sent", value: "2 days ago" },
            { label: "Expires", value: "In 5 days" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Resend invitation" onClick={onResend} />
        <SecondaryBtn label="Change permission" />
        <button onClick={onCancel} className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl font-semibold text-[14px] text-red-600">Cancel invitation</button>
      </div>
    </div>
  );
}

export function CollaborationOfflineScreen({ onRetry, onBack }: { onRetry: () => void; onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><CloudOff size={32} className="text-muted-foreground" /></div>}
      title="Collaboration offline"
      body="Your changes are saved locally and will sync when you're back online. 3 changes pending."
    >
      <PrimaryBtn label="Retry" onClick={onRetry} />
      <SecondaryBtn label="Continue offline" onClick={onBack} />
      <button className="w-full text-[13px] text-muted-foreground font-medium">View pending changes</button>
    </EmptyStateShell>
  );
}

export function LocationPermissionRequiredScreen({ onSettings, onSkip }: { onSettings: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-[#E07B5A]/10 flex items-center justify-center mb-6"><MapPin size={28} className="text-[#E07B5A]" /></div>
        <h2 className="text-[24px] font-bold mb-3">Location access</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">Onward uses your location for leave-by timing, live journey maps, and traveller location sharing (when you choose to share).</p>
        <div className="space-y-2.5 mb-6">
          {["Leave-by time calculations", "Your position on the live Journey Map", "Optional traveller location sharing"].map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-[13px]">{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-muted rounded-2xl p-3.5 mb-6">
          <div className="flex items-start gap-2"><Shield size={13} className="text-muted-foreground mt-0.5" /><p className="text-[12px] text-muted-foreground leading-relaxed">Location is only shared with Journey members when you explicitly start sharing. Onward does not store or track your location history.</p></div>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Open Settings" onClick={onSettings} />
        <SecondaryBtn label="Continue without location" onClick={onSkip} />
        <button className="w-full text-[13px] text-muted-foreground font-medium">Privacy details</button>
      </div>
    </div>
  );
}

export function LocationSharingEndedScreen({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center"><MapPin size={32} className="text-muted-foreground" /></div>}
      title="Location sharing ended"
      body="Your location is no longer visible to Journey members. Sharing stopped at 16:32 — During this Journey."
    >
      <SecondaryBtn label="Restart sharing" onClick={onRestart} />
      <button onClick={onBack} className="w-full text-[14px] font-semibold text-muted-foreground">Return to Journey</button>
    </EmptyStateShell>
  );
}
