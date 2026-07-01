import { useState, useEffect } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  Calendar, ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Bell, User, ArrowRight, Shield,
  RefreshCw, MoreHorizontal, Copy, Trash2,
  X, Check, Info, Download, Pencil,
  FileText, Star, Lock, Eye, Users, Share2,
  Send, Cloud, CloudOff, Phone, Mic,
  Volume2, SkipForward, Pause, Play, Settings,
  BookOpen, Bookmark, Sun, Package,
  Zap, MessageSquare, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  Screen, Tab, cn, Scroll, BackBtn,
  PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

function SuggestedBadge() {
  return <span className="text-[9px] font-bold text-[#E07B5A] bg-[#E07B5A]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Suggested</span>;
}

function SourceLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
      <span className="text-[10px] text-muted-foreground">{text}</span>
    </div>
  );
}

// ─── Screen 43: Today's Journey Brief ─────────────────────────────────────────

export function TodaysJourneyBriefScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <button onClick={() => onNav("audio-briefing-player")} className="flex items-center gap-1.5 text-[12px] font-bold text-[#E07B5A]">
            <Play size={13} />Play brief
          </button>
        </div>

        <div className="px-5 pb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Today's Brief</p>
          <h1 className="text-[24px] font-bold">Monday 30 June</h1>
          <p className="text-muted-foreground text-[13px]">Lisbon → Porto · Day 4 of 9</p>
        </div>

        {/* Weather */}
        <div className="mx-5 bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
          <Sun size={20} className="text-amber-500" />
          <div><p className="text-[13px] font-semibold text-sky-900">Sunny, 28°C</p><p className="text-[11px] text-sky-700">Lisbon · Perfect for outdoor plans</p></div>
        </div>

        {/* Key items */}
        {[
          { time: "12:00", icon: <Hotel size={14} />, title: "Check-out — Hotel Vista do Tejo", note: "Confirm luggage storage if needed", urgent: false },
          { time: "15:30", icon: <Train size={14} />, title: "AP 122 to Porto", note: "Platform 2 · Car 3 · Seat 22A", urgent: false },
          { time: "20:00", icon: <UtensilsCrossed size={14} />, title: "Taberna da Rua das Flores", note: "Dinner · Party of 2 — confirm booking", urgent: false },
        ].map((item) => (
          <div key={item.title} className="mx-5 mb-2 flex items-start gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 shadow-sm">
            <p className="text-[12px] font-semibold text-muted-foreground w-10 flex-shrink-0 pt-0.5">{item.time}</p>
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{item.icon}</div>
            <div>
              <p className="font-semibold text-[13px] leading-tight">{item.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.note}</p>
            </div>
          </div>
        ))}

        <div className="mx-5 mt-4 bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl p-3.5 mb-4">
          <p className="text-[11px] font-bold text-[#E07B5A] uppercase tracking-widest mb-1">Free time this afternoon</p>
          <p className="text-[13px] text-muted-foreground leading-relaxed">2h 30m between checkout and your train. <button className="font-semibold text-[#E07B5A]" onClick={() => onNav("fill-free-time")}>See suggestions →</button></p>
        </div>

        <div className="flex gap-2 px-5">
          <button onClick={() => onNav("journey-assistant")} className="flex-1 h-10 bg-[#1C2B3A] text-white rounded-2xl text-[12px] font-semibold">Ask Onward</button>
          <button onClick={() => onNav("audio-briefing-player")} className="flex-1 h-10 border border-border rounded-2xl text-[12px] font-semibold">Audio</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 44: Tomorrow's Preview ────────────────────────────────────────────

export function TomorrowsPreviewScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Brief" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Tomorrow</p>
          <h1 className="text-[24px] font-bold">Tuesday 1 July</h1>
          <p className="text-muted-foreground text-[13px]">Porto · Day 5 of 9</p>
        </div>

        <div className="mx-5 bg-muted rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
          <Cloud size={18} className="text-slate-500" />
          <p className="text-[13px]">Overcast, 22°C · Light rain possible afternoon</p>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Key plans</p>
          {[
            { icon: <Hotel size={13} />, title: "The Yeatman Hotel", note: "Check-in from 15:00 · Porto" },
            { icon: <MapPin size={13} />, title: "Ribeira district walk", note: "Suggested · 10:00" },
            { icon: <UtensilsCrossed size={13} />, title: "Majestic Café lunch", note: "Suggested · 13:00 · Book ahead" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-[#1C2B3A]">{p.icon}</div>
              <div><p className="text-[13px] font-semibold">{p.title}</p><p className="text-[11px] text-muted-foreground">{p.note}</p></div>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4">
          <p className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-1">Preparation reminders</p>
          <div className="flex items-center gap-2 mt-1"><Check size={12} className="text-emerald-500" /><span className="text-[12px]">Download train ticket offline</span></div>
          <div className="flex items-center gap-2 mt-1"><X size={12} className="text-red-500" /><span className="text-[12px]">Hotel address not yet saved to Maps</span></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 45: Journey Summary ───────────────────────────────────────────────

export function JourneySummaryAIScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Assistant" onPress={onBack} />
          <button onClick={() => onNav("audio-briefing-player")} className="flex items-center gap-1.5 text-[12px] font-bold text-[#E07B5A]"><Play size={13} />Audio</button>
        </div>
        <div className="px-5 pb-4">
          <h1 className="text-[24px] font-bold" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Lisbon & Porto</h1>
          <p className="text-muted-foreground text-[13px]">27 Jun – 5 Jul · 9 days · Portugal</p>
        </div>

        <div className="mx-5 grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Days", value: "9" },
            { label: "Reservations", value: "14" },
            { label: "Cities", value: "2" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl py-3 text-center shadow-sm">
              <p className="text-[20px] font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {[
          { label: "27–30 Jun", title: "Lisbon", sub: "Hotel Vista do Tejo · 4 planned activities" },
          { label: "30 Jun – 5 Jul", title: "Porto", sub: "The Yeatman Hotel · Douro valley day trip" },
        ].map((seg) => (
          <div key={seg.title} className="mx-5 mb-3 bg-card border border-border rounded-2xl px-4 py-3.5 shadow-sm">
            <p className="text-[11px] text-muted-foreground">{seg.label}</p>
            <p className="font-bold text-[15px]">{seg.title}</p>
            <p className="text-[12px] text-muted-foreground">{seg.sub}</p>
          </div>
        ))}

        <div className="flex gap-2 px-5 mt-2">
          <button onClick={() => onNav("journey-assistant")} className="flex-1 h-10 bg-[#1C2B3A] text-white rounded-2xl text-[12px] font-semibold">Ask a question</button>
          <button className="flex-1 h-10 border border-border rounded-2xl text-[12px] font-semibold">Export</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 46: Audio Briefing Player ────────────────────────────────────────

export function AudioBriefingPlayerScreen({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.3);
  const [speed, setSpeed] = useState("1×");

  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60"><X size={22} /></button>
        <p className="text-white font-semibold">Today's Brief</p>
        <button className="text-white/60"><Share2 size={18} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#E07B5A] flex items-center justify-center mb-8 shadow-lg">
          <Volume2 size={36} className="text-white" />
        </div>
        <p className="text-white font-bold text-[20px] mb-1">Monday 30 June</p>
        <p className="text-white/60 text-[13px] mb-8">Lisbon & Porto · Day 4 · 3 min 45 sec</p>

        <div className="w-full mb-2">
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#E07B5A] rounded-full" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="flex justify-between text-white/40 text-[11px]">
            <span>1:07</span><span>3:45</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSpeed(speed === "1×" ? "1.5×" : "2×")} className="text-white/60 text-[14px] font-bold w-12">{speed}</button>
          <div className="flex items-center gap-6">
            <button className="text-white/60"><SkipForward size={22} className="rotate-180" /></button>
            <button onClick={() => setPlaying(!playing)} className="w-16 h-16 rounded-full bg-[#E07B5A] flex items-center justify-center shadow-lg">
              {playing ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
            </button>
            <button className="text-white/60"><SkipForward size={22} /></button>
          </div>
          <button onClick={onBack} className="text-white/60 text-[13px] font-bold w-12 text-right">Transcript</button>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
          <CloudOff size={13} className="text-white/40" />
          <span className="text-white/40 text-[11px]">Available offline</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 47: Briefing Settings ─────────────────────────────────────────────

export function BriefingSettingsScreen({ onBack }: { onBack: () => void }) {
  const items = ["Daily briefing", "Tomorrow preview", "Audio briefing", "Weather", "Reservations", "Documents", "Suggestions", "Budget", "Collaboration updates"];
  const [toggles, setToggles] = useState(items.map((_, i) => i < 6));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Settings" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Briefing settings</h2>
          <div className="w-12" />
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {items.map((item, i) => (
            <div key={item} className={cn("flex items-center justify-between px-5 py-4", i < items.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{item}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 shadow-sm">
          <p className="text-[13px] text-muted-foreground mb-2">Daily delivery time</p>
          <div className="flex gap-1.5">
            {["07:00", "08:00", "09:00"].map((t) => (
              <button key={t} className={cn("flex-1 h-9 rounded-xl text-[12px] font-semibold transition-colors", t === "07:00" ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 48–53: Travel preferences ───────────────────────────────────────

export function TravelPreferencesScreen({ onBack }: { onBack: () => void }) {
  const [pace, setPace] = useState("balanced");
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Travel preferences</h1></div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Travel pace</p>
          <div className="grid grid-cols-3 gap-2">
            {["Relaxed", "Balanced", "Full"].map((p) => (
              <button key={p} onClick={() => setPace(p.toLowerCase())} className={cn("py-3 rounded-2xl text-[13px] font-semibold border-2 transition-all text-center", pace === p.toLowerCase() ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                <div className="mb-1">{p === "Relaxed" ? "🌅" : p === "Balanced" ? "⚖️" : "⚡"}</div>{p}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "Typical start time", value: "09:00" },
            { label: "Typical end time", value: "21:00" },
            { label: "Planning flexibility", value: "Moderate" },
            { label: "Popular vs local", value: "Mixed" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button className="flex items-center gap-1 text-[14px] font-semibold text-[#E07B5A]">{row.value}<ChevronDown size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function FoodPreferencesScreen({ onBack }: { onBack: () => void }) {
  const [dietary, setDietary] = useState<string[]>([]);
  const diets = ["Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-free", "Nut-free", "Dairy-free", "Pescatarian"];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Food preferences</h1></div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Dietary requirements</p>
          <div className="flex flex-wrap gap-2">
            {diets.map((d) => (
              <button key={d} onClick={() => setDietary((s) => s.includes(d) ? s.filter((x) => x !== d) : [...s, d])} className={cn("px-3.5 py-2 rounded-2xl text-[13px] font-semibold border-2 transition-all", dietary.includes(d) ? "border-[#E07B5A] bg-[#E07B5A]/10 text-[#E07B5A]" : "border-border bg-card text-muted-foreground")}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "Dining style", value: "Casual to mid-range" },
            { label: "Spice preference", value: "Moderate" },
            { label: "Budget per meal", value: "€15–35" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <span className="text-[13px] font-semibold text-[#E07B5A]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function AccessibilityPreferencesScreen({ onBack }: { onBack: () => void }) {
  const options = [
    { label: "Step-free access required", on: false },
    { label: "Wheelchair accessible", on: false },
    { label: "Avoid stairs", on: false },
    { label: "Accessible transport only", on: false },
    { label: "Hearing support needed", on: false },
    { label: "Visual support needed", on: false },
  ];
  const [toggles, setToggles] = useState(options.map((o) => o.on));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Accessibility</h1><p className="text-[12px] text-muted-foreground mt-0.5">Preferences affect recommendations and routing</p></div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {options.map((opt, i) => (
            <div key={opt.label} className={cn("flex items-center justify-between px-5 py-4", i < options.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium flex-1 pr-4">{opt.label}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function BudgetPreferencesScreen({ onBack }: { onBack: () => void }) {
  const [daily, setDaily] = useState(150);
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Budget preferences</h1></div>

        <div className="mx-5 bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between mb-4 shadow-sm">
          <button onClick={() => setDaily(Math.max(20, daily - 10))} className="w-9 h-9 rounded-full bg-muted text-lg font-bold text-muted-foreground">−</button>
          <div className="text-center"><p className="text-[36px] font-bold leading-none">€{daily}</p><p className="text-[12px] text-muted-foreground">typical daily budget</p></div>
          <button onClick={() => setDaily(daily + 10)} className="w-9 h-9 rounded-full bg-muted text-lg font-bold text-muted-foreground">+</button>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "Accommodation", value: "Mid-range" },
            { label: "Food", value: "Casual to mid-range" },
            { label: "Activities", value: "Mix of free and paid" },
            { label: "Local transport", value: "Public transit preferred" },
            { label: "Budget flexibility", value: "Moderate" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold text-[#E07B5A]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function TravellerPreferenceDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Travellers" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-5 flex items-center gap-3.5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#E07B5A] flex items-center justify-center text-white font-bold text-[15px]">JC</div>
          <div><p className="font-bold text-[16px]">James Chen</p><p className="text-[12px] text-muted-foreground">Travel companion</p></div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "Interests", value: "Food, History, Architecture" },
            { label: "Dietary", value: "No restrictions" },
            { label: "Pace", value: "Balanced" },
            { label: "Accessibility", value: "None required" },
            { label: "Budget", value: "Mid-range" },
            { label: "Wake time", value: "08:00" },
          ].map((row, i, arr) => (
            <div key={row.label} onClick={() => {}} className={cn("flex items-center justify-between px-5 py-4 cursor-pointer active:bg-muted/30", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <div className="flex items-center gap-1"><span className="text-[13px] text-muted-foreground">{row.value}</span><ChevronDown size={13} className="text-muted-foreground" /></div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function PersonalisationSummaryScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-muted-foreground text-[14px] font-semibold">Reset all</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Personalisation</h1></div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Explicit preferences (you set these)</p></div>
          {["Balanced pace · Start 09:00", "Interests: Food, History, Architecture", "Budget: ~€150/day", "No dietary restrictions"].map((p, i, arr) => (
            <div key={p} className={cn("flex items-center justify-between px-5 py-3", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px]">{p}</span>
              <button className="text-muted-foreground"><Pencil size={14} /></button>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 border-b border-border"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Inferred (from your activity)</p></div>
          {["Prefers outdoor viewpoints", "Often visits museums on first day", "Tends to have a light breakfast stop"].map((p, i, arr) => (
            <div key={p} className={cn("flex items-center justify-between px-5 py-3", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{p}</span>
              <button className="text-[11px] text-red-500 font-semibold">Forget</button>
            </div>
          ))}
        </div>

        <div className="mx-5"><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Disable inferred personalisation</button></div>
      </div>
    </Scroll>
  );
}

// ─── Screens 54–58: Packing and preparation ───────────────────────────────────

export function SmartPackingListScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const categories = [
    { label: "Essentials", items: [{ name: "Passport", packed: true }, { name: "EU Health Insurance Card", packed: true }, { name: "Travel insurance docs", packed: false }] },
    { label: "Clothing", items: [{ name: "Light jacket", packed: false }, { name: "Comfortable walking shoes", packed: true }] },
    { label: "Electronics", items: [{ name: "Phone charger", packed: true }, { name: "Travel adapter (EU)", packed: false }] },
  ];
  const total = categories.flatMap((c) => c.items).length;
  const packed = categories.flatMap((c) => c.items).filter((i) => i.packed).length;

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <button className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center"><Plus size={16} className="text-white" strokeWidth={2.5} /></button>
        </div>
        <div className="px-5 pb-4">
          <h1 className="text-[24px] font-bold">Packing list</h1>
          <p className="text-[12px] text-muted-foreground">Lisbon & Porto · {packed} of {total} packed</p>
        </div>

        <div className="mx-5 mb-4">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(packed / total) * 100}%` }} />
          </div>
        </div>

        <div className="mx-5 bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl p-3.5 mb-4 flex items-center gap-3">
          <Zap size={14} className="text-[#E07B5A] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[12px] font-bold text-[#E07B5A]">3 suggestions from Onward</p>
            <p className="text-[11px] text-muted-foreground">Based on weather and planned activities</p>
          </div>
          <button className="text-[11px] font-bold text-[#E07B5A]">Review</button>
        </div>

        {categories.map((cat) => (
          <div key={cat.label} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{cat.label}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {cat.items.map((item, i) => (
                <div key={item.name} onClick={onItem} className={cn("flex items-center gap-3 px-5 py-3.5 cursor-pointer active:opacity-70", i < cat.items.length - 1 && "border-b border-border")}>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors", item.packed ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30")}>
                    {item.packed && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={cn("text-[14px] font-medium", item.packed && "line-through text-muted-foreground")}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

export function PackingSuggestionDetailScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-5 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex justify-end mb-4"><button onClick={onBack}><X size={20} className="text-muted-foreground" /></button></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3"><SuggestedBadge /><span className="text-[11px] text-muted-foreground">Onward suggestion</span></div>
        <h2 className="text-[22px] font-bold mb-2">Umbrella or light raincoat</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">Rain is forecast for Tuesday 1 July in Porto. Your plans include outdoor walking in Ribeira which may be affected.</p>
        <div className="bg-muted rounded-2xl p-4 mb-4 space-y-1.5">
          <div className="flex items-center gap-2"><Cloud size={13} className="text-sky-600" /><span className="text-[12px]">Rain forecast · 1 Jul · Porto</span></div>
          <div className="flex items-center gap-2"><CheckIcon size={13} className="text-emerald-500" /><span className="text-[12px]">Compact umbrella fits in day bag</span></div>
        </div>
        <p className="text-[12px] text-muted-foreground">Quantity: 1 · For: Sarah Chen</p>
        <SourceLabel text="Onward · Based on weather forecast and plans" />
      </div>
      <div className="space-y-2">
        <PrimaryBtn label="Add to packing list" onClick={onAdd} />
        <SecondaryBtn label="Dismiss" onClick={onBack} />
        <button className="w-full text-[13px] text-muted-foreground font-medium">Never suggest again</button>
      </div>
    </div>
  );
}

function CheckIcon({ size, className }: { size: number; className?: string }) {
  return <Check size={size} className={className} />;
}

export function PackingItemDetailScreen({ onBack }: { onBack: () => void }) {
  const [packed, setPacked] = useState(false);
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Packing list" onPress={onBack} />
          <button className="text-red-500"><Trash2 size={18} /></button>
        </div>

        <div className="px-5 mb-5">
          <button onClick={() => setPacked((v) => !v)} className={cn("w-full flex items-center gap-4 rounded-3xl p-4 border-2 transition-all", packed ? "border-emerald-500 bg-emerald-50" : "border-border bg-card")}>
            <div className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors", packed ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30")}>
              {packed && <Check size={16} className="text-white" strokeWidth={3} />}
            </div>
            <span className="text-[16px] font-bold">{packed ? "Packed ✓" : "Not packed"}</span>
          </button>
        </div>

        <div className="px-5 space-y-3 mb-4">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Item</label>
            <input className={fieldCls} defaultValue="Travel adapter (EU)" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Category</label>
            <input className={fieldCls} defaultValue="Electronics" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label>
            <textarea className={cn(fieldCls, "resize-none h-16")} placeholder="Any notes…" />
          </div>
        </div>
      </div>
    </Scroll>
  );
}

export function PreparationAssistantScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const [input, setInput] = useState("");
  const prompts = ["What am I forgetting?", "What documents do I need?", "What must I do before departure?", "What should I download offline?"];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border flex items-center justify-between">
        <BackBtn label="Journey" onPress={onBack} />
        <p className="text-[15px] font-bold">Preparation</p>
        <button onClick={() => onNav("preparation-checklist")} className="text-[12px] font-bold text-[#E07B5A]">Checklist</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <div className="mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Suggested</p>
          <div className="flex flex-wrap gap-2">{prompts.map((p) => <button key={p} className="flex-shrink-0 px-3 py-1.5 bg-muted rounded-full text-[12px] font-medium text-muted-foreground">{p}</button>)}</div>
        </div>

        <div className="flex items-start gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#1C2B3A] flex items-center justify-center flex-shrink-0 mt-0.5"><Plane size={12} className="text-white" style={{ transform: "rotate(-15deg)" }} /></div>
          <div className="flex-1 bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-[14px] leading-relaxed">Before your Journey to Lisbon & Porto I'd recommend:</p>
            {["✓ Check passport validity (6+ months)", "✓ Download offline maps", "✓ Confirm restaurant reservations", "✗ Missing: travel insurance docs saved offline", "✗ Missing: Hotel Vista do Tejo address in Maps"].map((item) => (
              <div key={item} className="flex items-start gap-2 mt-2">
                <span className={cn("text-[13px]", item.startsWith("✓") ? "text-emerald-700" : "text-amber-700")}>{item}</span>
              </div>
            ))}
            <button onClick={() => onNav("preparation-checklist")} className="mt-3 text-[12px] font-bold text-[#E07B5A]">Open full checklist →</button>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5">
            <textarea className="w-full bg-transparent text-[14px] outline-none resize-none max-h-20 placeholder:text-muted-foreground/60" placeholder="What do I need for this Journey?" value={input} onChange={(e) => setInput(e.target.value)} rows={1} />
          </div>
          <button className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", input ? "bg-[#1C2B3A]" : "bg-muted")}>
            <Send size={16} className={input ? "text-white" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PreparationChecklistScreen({ onBack }: { onBack: () => void }) {
  const sections = [
    { title: "Documents", items: [{ task: "Check passport validity", done: true, due: "Before travel" }, { task: "Save e-ticket offline", done: false, due: "Today" }] },
    { title: "Check-in", items: [{ task: "Online check-in for TP791", done: false, due: "28 Jun" }] },
    { title: "Transport", items: [{ task: "Download train ticket", done: false, due: "Before 30 Jun" }, { task: "Save hotel address to Maps", done: false, due: "Before arrival" }] },
    { title: "Connectivity", items: [{ task: "Enable roaming or buy eSIM", done: true, due: "Done" }] },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Preparation" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Preparation checklist</h1></div>

        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{section.title}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {section.items.map((item, i) => (
                <div key={item.task} className={cn("flex items-center gap-3 px-5 py-4", i < section.items.length - 1 && "border-b border-border")}>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", item.done ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30")}>
                    {item.done && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-[14px] font-medium", item.done && "line-through text-muted-foreground")}>{item.task}</p>
                    <p className="text-[11px] text-muted-foreground">{item.due}</p>
                  </div>
                  <Bell size={14} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

// ─── Screens 59–62: Language and local assistance ─────────────────────────────

export function PhrasebookScreen({ onBack, onPhrase }: { onBack: () => void; onPhrase: () => void }) {
  const categories = ["Greetings", "Directions", "Transport", "Food", "Hotel", "Emergency", "Shopping", "Medical"];
  const [selected, setSelected] = useState("Greetings");
  const phrases = {
    Greetings: ["Olá — Hello", "Bom dia — Good morning", "Boa tarde — Good afternoon", "Obrigado/a — Thank you", "Por favor — Please", "Desculpe — Excuse me"],
    Directions: ["Onde fica…? — Where is…?", "À esquerda — Left", "À direita — Right", "Em frente — Straight ahead"],
  };
  const currentPhrases = (phrases as any)[selected] || phrases.Greetings;

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-2 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Assistant" onPress={onBack} />
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold">Portuguese</span>
            <span className="text-[11px] text-muted-foreground">· Offline ✓</span>
          </div>
          <button className="text-muted-foreground"><Search size={18} /></button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setSelected(c)} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0", selected === c ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <div className="space-y-2">
          {currentPhrases.map((phrase: string) => {
            const [pt, en] = phrase.split(" — ");
            return (
              <div key={phrase} onClick={onPhrase} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70">
                <div className="flex-1">
                  <p className="font-bold text-[15px]">{pt}</p>
                  <p className="text-[12px] text-muted-foreground">{en}</p>
                </div>
                <button className="text-muted-foreground flex-shrink-0"><Volume2 size={16} /></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TranslatePhraseScreen({ onBack, onFullscreen }: { onBack: () => void; onFullscreen: () => void }) {
  const [input, setInput] = useState("Where is the train station?");
  const translation = "Onde fica a estação de comboios?";

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border flex items-center justify-between">
        <BackBtn label="Phrasebook" onPress={onBack} />
        <div className="flex items-center gap-2"><span className="text-[13px] font-semibold">EN</span><ArrowRight size={14} className="text-muted-foreground" /><span className="text-[13px] font-semibold">PT</span></div>
        <button className="text-muted-foreground"><Mic size={18} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <div className="mb-4">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">English</label>
          <textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[16px] outline-none resize-none h-28 leading-relaxed" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>

        {input && (
          <div className="bg-[#1C2B3A] rounded-3xl p-5 text-white shadow-lg">
            <p className="text-white/50 text-[11px] font-medium mb-2">Portuguese</p>
            <p className="text-[20px] font-bold leading-relaxed mb-4">{translation}</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold active:bg-white/20"><Volume2 size={14} />Listen</button>
              <button className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold active:bg-white/20"><Copy size={14} />Copy</button>
              <button onClick={onFullscreen} className="flex items-center gap-2 bg-[#E07B5A] rounded-xl px-3 py-2 text-[12px] font-semibold ml-auto">Full screen</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FullscreenTranslationScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60"><X size={22} /></button>
        <p className="text-white/50 text-[13px]">Show this to someone</p>
        <button className="text-white/60"><Volume2 size={20} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-white/40 text-[14px] mb-4">Portuguese</p>
        <p className="text-white font-bold leading-tight" style={{ fontSize: 48, lineHeight: 1.2 }}>
          Onde fica a estação de comboios?
        </p>
        <p className="text-white/40 text-[16px] mt-8">Where is the train station?</p>
      </div>

      <div className="flex-shrink-0 px-5 pb-8 flex gap-3">
        <button className="flex-1 h-12 bg-white/10 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"><ArrowRight size={16} className="rotate-180" />Reverse</button>
        <button onClick={onBack} className="flex-1 h-12 bg-white/10 text-white rounded-2xl font-semibold">Close</button>
      </div>
    </div>
  );
}

export function LocalEssentialsScreen({ onBack }: { onBack: () => void }) {
  const sections = [
    { title: "Emergency", items: ["Emergency: 112", "Police: 112", "UK Embassy: +351 21 392 4000"] },
    { title: "Currency & tipping", items: ["Euro (€) · Card widely accepted", "Tip 5–10% at restaurants (not mandatory)", "ATMs widely available"] },
    { title: "Power", items: ["Type F sockets (EU standard)", "230V / 50Hz"] },
    { title: "Transport", items: ["Metro, trams, buses and ferries", "24-hour Viva Viagem card from stations", "Bolt and Uber available"] },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Assistant" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Local essentials</h1><p className="text-[12px] text-muted-foreground">Lisbon · Portugal</p></div>

        {sections.map((s) => (
          <div key={s.title} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{s.title}</p>
            <div className="mx-5 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              {s.items.map((item, i) => (
                <div key={item} className={cn("px-4 py-3 text-[13px]", i < s.items.length - 1 && "border-b border-border")}>{item}</div>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-5 bg-muted rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Information sourced from official sources. Always verify current requirements directly. Last reviewed May 2026.</p>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 63–70: Assistant controls ───────────────────────────────────────

export function AssistantSettingsScreen({ onBack, onData, onMemory }: { onBack: () => void; onData: () => void; onMemory: () => void }) {
  const [master, setMaster] = useState(true);
  const settings = [
    { label: "Journey context access", on: true },
    { label: "Reservation access", on: true },
    { label: "Document access", on: true },
    { label: "Location access", on: false },
    { label: "Live data access", on: true },
    { label: "Weather access", on: true },
    { label: "Voice responses", on: true },
    { label: "Personalised recommendations", on: true },
    { label: "Proactive suggestions", on: true },
  ];
  const [toggles, setToggles] = useState(settings.map((s) => s.on));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Onward Assistant</h1></div>

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 mb-4 flex items-center justify-between shadow-sm">
          <div><p className="font-semibold text-[15px]">Enable Onward Assistant</p><p className="text-[12px] text-muted-foreground">All AI features</p></div>
          <button onClick={() => setMaster((m) => !m)} className={cn("w-12 h-7 rounded-full relative transition-colors", master ? "bg-[#1C2B3A]" : "bg-muted")}>
            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", master ? "left-6" : "left-1")} />
          </button>
        </div>

        <div className={cn("mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm", !master && "opacity-40 pointer-events-none")}>
          {settings.map((s, i) => (
            <div key={s.label} className={cn("flex items-center justify-between px-5 py-4", i < settings.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{s.label}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={onData} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70 shadow-sm">
            <Shield size={15} className="text-muted-foreground" />Data controls<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button onClick={onMemory} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70 shadow-sm">
            <Zap size={15} className="text-muted-foreground" />Manage memory<ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function AssistantDataControlsScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Assistant settings" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Data controls</h1></div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Conversation history", value: "47 conversations" },
            { label: "Journey data accessed", value: "5 Journeys" },
            { label: "Reservations accessed", value: "32 reservations" },
            { label: "Documents accessed", value: "8 documents" },
            { label: "Personalisation data", value: "Active" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          {[
            { label: "Delete assistant history", destructive: false },
            { label: "Reset personalisation", destructive: false },
            { label: "Pause personalisation", destructive: false },
            { label: "Export assistant data", destructive: false },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70 shadow-sm">
              {a.label}<ChevronRight size={14} className="text-muted-foreground ml-auto" />
            </button>
          ))}
        </div>

        <div className="mx-5 mt-4 bg-muted rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Your Journey data is used only to personalise responses in this app. Onward does not sell or share your data. Plain language always.</p>
        </div>
      </div>
    </Scroll>
  );
}

export function ManageAssistantMemoryScreen({ onBack }: { onBack: () => void }) {
  const memories = [
    { label: "Balanced travel pace", type: "explicit" },
    { label: "Interests: Food, History, Architecture", type: "explicit" },
    { label: "Budget: ~€150/day", type: "explicit" },
    { label: "Often visits museums on first day", type: "inferred" },
    { label: "Prefers outdoor viewpoints", type: "inferred" },
    { label: "Frequent destination: Portugal", type: "inferred" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Data controls" onPress={onBack} />
          <button className="text-red-500 text-[13px] font-semibold">Clear all</button>
        </div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Assistant memory</h1></div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Your preferences</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {memories.filter((m) => m.type === "explicit").map((m, i, arr) => (
            <div key={m.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] font-medium">{m.label}</span>
              <div className="flex gap-2"><button className="text-muted-foreground"><Pencil size={14} /></button><button className="text-red-500"><Trash2 size={14} /></button></div>
            </div>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Inferred by Onward</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {memories.filter((m) => m.type === "inferred").map((m, i, arr) => (
            <div key={m.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{m.label}</span>
              <button className="text-[11px] text-red-500 font-semibold">Forget</button>
            </div>
          ))}
        </div>

        <div className="mx-5"><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Pause memory</button></div>
      </div>
    </Scroll>
  );
}

export function ClearConversationConfirmScreen({ onClear, onCancel }: { onClear: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5"><Trash2 size={24} className="text-muted-foreground" /></div>
        <h2 className="text-[22px] font-bold mb-2">Clear conversation?</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
          <span className="font-semibold text-foreground">Free afternoon ideas</span> — Lisbon & Porto
        </p>
        <p className="text-[13px] text-muted-foreground leading-relaxed">This conversation and its suggestions will be deleted. Your Journey reservations and plans are not affected.</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Clear conversation" onClick={onClear} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export function UncertainAnswerScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Assistant" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><AlertCircle size={20} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Onward is not certain</h1>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">The assistant couldn't find a reliable answer for "What are the entry requirements for UK citizens entering Portugal?"</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "What is known", value: "Portugal is in the Schengen Area" },
            { label: "What is uncertain", value: "Current visa rules for UK citizens post-Brexit" },
            { label: "Sources checked", value: "3 sources — outdated or conflicting" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5">
          <p className="text-[12px] text-amber-800 leading-relaxed font-medium">Onward does not fabricate visa or entry information. Always verify with official government sources before travel.</p>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Check UK Government website" />
          <SecondaryBtn label="Ask differently" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

export function ConflictingInformationScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Assistant" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <h1 className="text-[22px] font-bold">Conflicting information</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Two sources disagree on the hotel check-in time.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 mb-5">
          {[
            { title: "Reservation email", value: "15:00", type: "Imported · 15 Jun", badge: "bg-sky-50 text-sky-700 border-sky-200" },
            { title: "Hotel website", value: "14:00", type: "External source · Today", badge: "bg-amber-50 text-amber-700 border-amber-200" },
          ].map((s) => (
            <div key={s.title} className={cn("border rounded-3xl p-4", s.badge.split(" ").slice(-1)[0])}>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">{s.title}</p>
              <p className="text-[28px] font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{s.type}</p>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-2xl p-3.5 mb-5">
          <p className="text-[12px] text-muted-foreground leading-relaxed">Onward recommends verifying directly with The Yeatman Hotel before arrival. Your reservation email shows 15:00 — use that as the confirmed time until otherwise confirmed.</p>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Contact hotel" />
          <SecondaryBtn label="Keep email value (15:00)" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

export function AssistantOfflineScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-5"><CloudOff size={32} className="text-muted-foreground" /></div>
      <h2 className="text-[22px] font-bold mb-2">Assistant unavailable offline</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">Onward's assistant needs a connection. Your cached Journey data, saved briefings and phrasebook are still available.</p>
      <div className="w-full space-y-2.5">
        <button onClick={() => onNav("journey-timeline")} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px]">Open Timeline</button>
        <button onClick={() => onNav("phrasebook")} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px]">Phrasebook</button>
        <button onClick={() => onNav("todays-brief")} className="w-full h-[48px] border border-border rounded-2xl font-semibold text-[14px]">Saved briefing</button>
        <button className="w-full text-[13px] text-muted-foreground font-medium">Retry connection</button>
      </div>
    </div>
  );
}

export function ConfirmAssistantActionScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold text-[15px]">Cancel</button>
          <h2 className="text-[17px] font-bold">Confirm changes</h2>
          <div className="w-16" />
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-amber-800 leading-relaxed font-medium">The assistant is about to modify your Journey. Review every change before confirming.</p>
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Proposed action</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <p className="font-bold text-[15px] mb-1">Optimise Day 4 — Monday 30 June</p>
          <p className="text-[13px] text-muted-foreground">2 flexible plans will be moved. Confirmed reservations remain unchanged.</p>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Changes</p>
          <div className="space-y-2">
            {[
              { item: "LX Factory", from: "12:30", to: "13:00", type: "moved" },
              { item: "Café stop", from: "—", to: "12:15 (new)", type: "added" },
            ].map((c) => (
              <div key={c.item} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 border", c.type === "moved" ? "bg-sky-50 border-sky-200" : "bg-emerald-50 border-emerald-200")}>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0", c.type === "moved" ? "bg-sky-200" : "bg-emerald-200")}>
                  {c.type === "moved" ? <ArrowRight size={12} className="text-sky-700" /> : <Plus size={12} className="text-emerald-700" />}
                </div>
                <div>
                  <p className="text-[13px] font-semibold">{c.item}</p>
                  <p className="text-[11px] text-muted-foreground">{c.from} → {c.to}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={onConfirm} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] active:opacity-90">Confirm</button>
          <SecondaryBtn label="Cancel" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 4 System States (71–80) ────────────────────────────────────────────

export function AssistantFirstUseScreen({ onStart, onPrivacy }: { onStart: () => void; onPrivacy: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-[#1C2B3A] flex items-center justify-center mb-6 shadow-lg">
          <Plane size={28} className="text-[#E07B5A]" style={{ transform: "rotate(-15deg)" }} />
        </div>
        <h2 className="text-[26px] font-bold mb-3">Meet the Onward Assistant</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">Your journey companion for planning, questions and personalised suggestions. It uses your Journey context — not generic advice.</p>
        <div className="space-y-3 mb-6">
          {["Answers questions about your Journey", "Suggests ways to use free time", "Helps you replan after disruptions", "Finds places that match your interests", "Always shows its sources"].map((c) => (
            <div key={c} className="flex items-start gap-2.5"><Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" /><span className="text-[13px]">{c}</span></div>
          ))}
        </div>
        <div className="bg-muted rounded-2xl p-3.5">
          <div className="flex items-start gap-2"><AlertCircle size={13} className="text-muted-foreground mt-0.5" /><p className="text-[12px] text-muted-foreground leading-relaxed">The assistant makes suggestions — it never changes your confirmed reservations without your approval.</p></div>
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Get started" onClick={onStart} />
        <button onClick={onPrivacy} className="w-full text-[13px] text-muted-foreground font-medium">Review privacy settings first</button>
      </div>
    </div>
  );
}

export function NoJourneyContextScreen({ onSelect, onGeneral, onCreate }: { onSelect: () => void; onGeneral: () => void; onCreate: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Zap size={32} className="text-muted-foreground" /></div>}
      title="No Journey selected"
      body="Choose a Journey to get personalised help, or ask general travel questions without a Journey."
    >
      <PrimaryBtn label="Choose a Journey" onClick={onSelect} />
      <SecondaryBtn label="Continue generally" onClick={onGeneral} />
      <button onClick={onCreate} className="w-full text-[13px] text-muted-foreground font-medium">Plan a new Journey</button>
    </EmptyStateShell>
  );
}

export function GeneratingResponseScreen({ onCancel }: { onCancel: () => void }) {
  const [dot, setDot] = useState(0);
  const tasks = ["Reviewing your Journey…", "Checking reservations…", "Finding suggestions…"];
  const [task, setTask] = useState(0);

  useEffect(() => {
    const d = setInterval(() => setDot((v) => (v + 1) % 3), 400);
    const t = setInterval(() => setTask((v) => Math.min(v + 1, tasks.length - 1)), 1500);
    return () => { clearInterval(d); clearInterval(t); };
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-16 h-16 rounded-full bg-[#1C2B3A] flex items-center justify-center mb-6 shadow-lg">
        <Zap size={24} className="text-[#E07B5A]" />
      </div>
      <h2 className="text-[20px] font-bold mb-2">Working on it…</h2>
      <p className="text-[13px] text-muted-foreground mb-8 min-h-[20px]">{tasks[task]}</p>
      <div className="flex gap-1.5 mb-10">
        {[0, 1, 2].map((i) => <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === dot ? "bg-[#E07B5A] scale-125" : "bg-muted-foreground/30")} />)}
      </div>
      <button onClick={onCancel} className="text-[13px] text-muted-foreground font-medium">Cancel</button>
    </div>
  );
}

export function PlanGenerationFailedScreen({ onRetry, onAdjust }: { onRetry: () => void; onAdjust: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5"><AlertCircle size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Plan generation failed</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">The assistant could not generate a plan. This may be due to conflicting constraints or a service issue.</p>
        <div className="bg-muted rounded-2xl p-3.5 mb-6"><p className="text-[12px] text-muted-foreground">Your planning inputs have been saved. You can adjust preferences and try again.</p></div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry" onClick={onRetry} />
        <SecondaryBtn label="Adjust preferences" onClick={onAdjust} />
      </div>
    </div>
  );
}

export function NoRecommendationsScreen({ onExpand, onPreferences, onKeepFree }: { onExpand: () => void; onPreferences: () => void; onKeepFree: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Bookmark size={32} className="text-muted-foreground" /></div>}
      title="No recommendations found"
      body="No suitable suggestions matched your preferences and constraints for this time slot."
    >
      <PrimaryBtn label="Expand search area" onClick={onExpand} />
      <SecondaryBtn label="Change preferences" onClick={onPreferences} />
      <button onClick={onKeepFree} className="w-full text-[13px] text-muted-foreground font-medium">Keep this time free</button>
    </EmptyStateShell>
  );
}

export function SourceUnavailableScreen({ onRetry, onProvider }: { onRetry: () => void; onProvider: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><AlertCircle size={32} className="text-muted-foreground" /></div>}
      title="Source unavailable"
      body="The data source for this recommendation is temporarily unavailable. Last known information is shown."
    >
      <PrimaryBtn label="Retry" onClick={onRetry} />
      <SecondaryBtn label="Open official provider" onClick={onProvider} />
    </EmptyStateShell>
  );
}

export function OutdatedRecommendationScreen({ onRefresh, onBack }: { onRefresh: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center mb-5"><Clock size={28} className="text-amber-600" /></div>
      <h2 className="text-[22px] font-bold mb-2">Recommendation may be outdated</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">Last updated 3 days ago. Opening hours, prices or availability may have changed.</p>
      <p className="text-[12px] text-muted-foreground mb-8">Verify with the official source before acting on this information.</p>
      <div className="w-full space-y-2.5">
        <PrimaryBtn label="Refresh" onClick={onRefresh} />
        <SecondaryBtn label="Verify with provider" onClick={onBack} />
      </div>
    </div>
  );
}

export function PersonalisationDisabledScreen({ onEnable, onContinue }: { onEnable: () => void; onContinue: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5"><Settings size={24} className="text-muted-foreground" /></div>
        <h2 className="text-[22px] font-bold mb-2">Personalisation is off</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Recommendations will not use your travel preferences, past activity or saved places. Results may be less relevant.</p>
        <div className="bg-muted rounded-2xl p-3.5 mb-6"><p className="text-[12px] text-muted-foreground">You can enable personalisation at any time in Assistant Settings.</p></div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Enable personalisation" onClick={onEnable} />
        <SecondaryBtn label="Continue without personalisation" onClick={onContinue} />
      </div>
    </div>
  );
}

export function PackingListCompleteScreen({ onView, onAdd }: { onView: () => void; onAdd: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"><CheckCircle size={36} className="text-emerald-500" /></div>}
      title="Packing list complete"
      body="You have packed every item on your list for Lisbon & Porto. Have a great journey."
    >
      <SecondaryBtn label="Review list" onClick={onView} />
      <button onClick={onAdd} className="w-full text-[13px] text-muted-foreground font-medium">Add another item</button>
    </EmptyStateShell>
  );
}

export function PreparationCompleteScreen({ onJourney, onSuggestions }: { onJourney: () => void; onSuggestions: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"><CheckCircle size={36} className="text-emerald-500" /></div>}
      title="You appear ready for this Journey"
      body="All required preparation tasks are complete for Lisbon & Porto. Enjoy your trip."
    >
      <PrimaryBtn label="Open Journey" onClick={onJourney} />
      <SecondaryBtn label="Review optional suggestions" onClick={onSuggestions} />
    </EmptyStateShell>
  );
}
