import { useState, useEffect, useRef } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  Calendar, ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Bell, User, ArrowRight, Shield,
  RefreshCw, MoreHorizontal, Globe, Copy, Trash2,
  X, Check, Info, Download, ChevronDown, Pencil,
  FileText, Star, Ticket, Lock, Eye, Map, Users,
  Share2, FolderOpen, Zap, MessageSquare, Activity,
  Send, ArrowLeftRight, CloudOff, Phone, Mic, MicOff,
  Volume2, SkipForward, Pause, Play, Settings,
  BookOpen, Bookmark, Filter, Heart, Coffee,
  Sun, Cloud, Umbrella, Package, ChevronUp, AlignLeft,
} from "lucide-react";
import {
  Screen, Tab, cn, Scroll, StatusPill, BackBtn,
  PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

// ─── Phase 4 Shared Components ────────────────────────────────────────────────

function SuggestedBadge() {
  return <span className="text-[9px] font-bold text-[#E07B5A] bg-[#E07B5A]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Suggested</span>;
}

function ConfirmedBadge() {
  return <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Confirmed</span>;
}

function OptionalBadge() {
  return <span className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-widest">Optional</span>;
}

function SourceLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
      <span className="text-[10px] text-muted-foreground">{text}</span>
    </div>
  );
}

function AssistantMessage({ children, loading }: { children?: React.ReactNode; loading?: boolean }) {
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#1C2B3A] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Plane size={12} className="text-white" style={{ transform: "rotate(-15deg)" }} />
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
            {[0,1,2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" style={{ animation: `pulse 1.2s ${i * 0.2}s infinite` }} />
            ))}
          </div>
        ) : (
          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-[#1C2B3A] text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] text-[14px] leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function SuggestedPlanCard({ icon, title, time, duration, reason, source, onAdd, onDismiss }: {
  icon: React.ReactNode; title: string; time: string; duration: string;
  reason: string; source: string; onAdd?: () => void; onDismiss?: () => void;
}) {
  return (
    <div className="border border-dashed border-[#E07B5A]/40 bg-[#E07B5A]/5 rounded-2xl p-4 mb-3">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center flex-shrink-0 text-[#E07B5A]">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-[14px] leading-tight">{title}</p>
            <SuggestedBadge />
          </div>
          <p className="text-[12px] text-muted-foreground">{time} · {duration}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 italic">{reason}</p>
          <SourceLabel text={source} />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onAdd} className="flex-1 h-8 bg-[#1C2B3A] text-white rounded-xl text-[12px] font-semibold">Add to plan</button>
        <button className="flex-1 h-8 border border-border bg-card rounded-xl text-[12px] font-medium">Save</button>
        <button onClick={onDismiss} className="w-8 h-8 border border-border bg-card rounded-xl flex items-center justify-center text-muted-foreground"><X size={13} /></button>
      </div>
    </div>
  );
}

function ConfirmedReservationCard({ icon, title, time, sub }: { icon: React.ReactNode; title: string; time: string; sub: string }) {
  return (
    <div className="border border-border bg-card rounded-2xl px-4 py-3 mb-2 flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold truncate">{title}</p>
          <ConfirmedBadge />
        </div>
        <p className="text-[11px] text-muted-foreground">{time} · {sub}</p>
      </div>
    </div>
  );
}

function PromptChip({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <button onClick={onPress} className="flex-shrink-0 px-3 py-1.5 bg-muted rounded-full text-[12px] font-medium text-muted-foreground hover:bg-muted/80 active:opacity-70 whitespace-nowrap">
      {label}
    </button>
  );
}

const PROMPTS = [
  "What is next?", "Plan my free afternoon.", "Make tomorrow less rushed.",
  "Find dinner near my hotel.", "What should I pack?", "Summarise this Journey.",
];

// ─── Screen 1: Assistant Home ─────────────────────────────────────────────────

export function AssistantHomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Onward</p>
            <h1 className="text-[24px] font-bold tracking-tight">Assistant</h1>
          </div>
          <button onClick={() => onNav("conversation-history")} className="text-muted-foreground"><MoreHorizontal size={20} /></button>
        </div>

        {/* Active Journey card */}
        <div className="mx-5 mb-4 bg-[#1C2B3A] rounded-3xl p-4 shadow-lg">
          <p className="text-white/50 text-[11px] font-medium mb-1">Active Journey</p>
          <p className="text-white font-bold text-[17px]">Lisbon & Porto</p>
          <p className="text-white/60 text-[12px]">Day 4 of 9 · 30 Jun</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onNav("journey-assistant")} className="flex-1 h-9 bg-[#E07B5A] text-white rounded-xl text-[12px] font-bold active:opacity-90">Ask about this Journey</button>
            <button onClick={() => onNav("todays-brief")} className="flex-1 h-9 bg-white/10 text-white rounded-xl text-[12px] font-semibold">Today's Brief</button>
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Suggested</p>
          <div className="flex flex-wrap gap-2">
            {PROMPTS.map((p) => <PromptChip key={p} label={p} onPress={() => onNav("journey-assistant")} />)}
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Tools</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <MapPin size={18} />, label: "Explore destination", screen: "explore-destination" as Screen },
              { icon: <Calendar size={18} />, label: "Plan a new Journey", screen: "plan-new-journey" as Screen },
              { icon: <Zap size={18} />, label: "Fill free time", screen: "fill-free-time" as Screen },
              { icon: <Package size={18} />, label: "Packing list", screen: "smart-packing-list" as Screen },
              { icon: <BookOpen size={18} />, label: "Phrasebook", screen: "phrasebook" as Screen },
              { icon: <MessageSquare size={18} />, label: "General chat", screen: "general-assistant" as Screen },
            ].map((a) => (
              <button key={a.label} onClick={() => onNav(a.screen)} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 text-left active:opacity-70 shadow-sm">
                <span className="text-muted-foreground">{a.icon}</span>
                <span className="text-[13px] font-semibold">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent conversations */}
        <div className="px-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Recent</p>
          {[
            { title: "Free afternoon in Lisbon", journey: "Lisbon & Porto", time: "Yesterday" },
            { title: "What restaurants near Belém?", journey: "Lisbon & Porto", time: "2 days ago" },
          ].map((c) => (
            <button key={c.title} onClick={() => onNav("journey-assistant")} className="w-full flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><MessageSquare size={14} className="text-muted-foreground" /></div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-semibold">{c.title}</p>
                <p className="text-[11px] text-muted-foreground">{c.journey} · {c.time}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 2: Journey Assistant Conversation ────────────────────────────────

export function JourneyAssistantScreen({ onBack, onContext, onSources, onAction }: {
  onBack: () => void; onContext: () => void; onSources: () => void; onAction: () => void;
}) {
  const [input, setInput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(true);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <BackBtn label="Assistant" onPress={onBack} />
          <button onClick={onContext} className="text-[12px] font-semibold text-[#E07B5A] flex items-center gap-1"><Info size={13} />Context</button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-bold">Lisbon & Porto</p>
          <span className="text-muted-foreground text-[12px]">· Day 4 · 30 Jun</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
        <UserMessage text="Plan my free afternoon in Lisbon after checkout." />

        {showAnswer && (
          <AssistantMessage>
            <p className="mb-3">You have around 3 hours free between your hotel checkout at 12:00 and your train at 15:30. Here are a few ways to use that time in central Lisbon.</p>
            <SuggestedPlanCard
              icon={<MapPin size={15} />}
              title="LX Factory Market"
              time="12:30"
              duration="~1h 30m"
              reason="Popular Sunday market, 12 min walk from your hotel"
              source="Google Places · Open now"
              onAction={onAction}
            />
            <SuggestedPlanCard
              icon={<Coffee size={15} />}
              title="Café A Brasileira"
              time="14:00"
              duration="~45m"
              reason="Historic café near Chiado, close to Oriente route"
              source="Google Places"
            />
            <button onClick={onSources} className="text-[11px] text-muted-foreground underline mt-1">View sources</button>
          </AssistantMessage>
        )}

        {showLoading && <AssistantMessage loading />}

        {/* Follow-up chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-2" style={{ scrollbarWidth: "none" }}>
          {["Show more options", "What about a museum?", "Near the station"].map((p) => (
            <PromptChip key={p} label={p} onPress={() => { setShowLoading(true); setTimeout(() => setShowLoading(false), 1500); }} />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5 flex items-end gap-2">
            <textarea className="flex-1 bg-transparent text-[14px] outline-none resize-none max-h-24 placeholder:text-muted-foreground/60" placeholder="Ask anything about this Journey…" value={input} onChange={(e) => setInput(e.target.value)} rows={1} />
            <button onClick={() => onAction()} className="text-muted-foreground flex-shrink-0"><Mic size={17} /></button>
          </div>
          <button onClick={() => { if (input) { setInput(""); setShowLoading(true); setTimeout(() => setShowLoading(false), 1500); } }} className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors", input ? "bg-[#1C2B3A]" : "bg-muted")}>
            <Send size={16} className={input ? "text-white" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: General Assistant Conversation ────────────────────────────────

export function GeneralAssistantScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border flex items-center justify-between">
        <BackBtn label="Assistant" onPress={onBack} />
        <p className="text-[15px] font-bold">General travel</p>
        <button onClick={() => onNav("journey-assistant")} className="text-[12px] font-semibold text-[#E07B5A]">Add Journey</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={{ scrollbarWidth: "none" }}>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5 mb-5 flex items-center gap-2">
          <Info size={13} className="text-amber-600 flex-shrink-0" />
          <p className="text-[12px] text-amber-800">Not connected to a Journey — answers are general and not personalised.</p>
        </div>
        <UserMessage text="What are the best neighbourhoods to stay in Lisbon?" />
        <AssistantMessage>
          <p className="mb-2">Lisbon's most popular neighbourhoods for visitors:</p>
          {["Alfama — historic, hilly, fado bars", "Bairro Alto — nightlife, restaurants", "Chiado — shopping, cafés, central", "Príncipe Real — boutiques, quieter"].map((n) => (
            <div key={n} className="flex items-start gap-2 mb-1.5"><Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" /><span className="text-[13px]">{n}</span></div>
          ))}
          <SourceLabel text="Onward Knowledge · Updated May 2026" />
        </AssistantMessage>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {["Create a Journey for Lisbon", "Tell me more about Alfama", "Best time to visit?"].map((p) => (
            <PromptChip key={p} label={p} />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5">
            <textarea className="w-full bg-transparent text-[14px] outline-none resize-none max-h-24 placeholder:text-muted-foreground/60" placeholder="Ask anything about travel…" value={input} onChange={(e) => setInput(e.target.value)} rows={1} />
          </div>
          <button className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", input ? "bg-[#1C2B3A]" : "bg-muted")}>
            <Send size={16} className={input ? "text-white" : "text-muted-foreground"} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Assistant Context Sheet ───────────────────────────────────────

export function AssistantContextScreen({ onBack }: { onBack: () => void }) {
  const contexts = [
    { type: "Journey", value: "Lisbon & Porto", scope: "Full Journey", confirmed: true, icon: <MapPin size={14} /> },
    { type: "Day", value: "Monday 30 June", scope: "Current day", confirmed: true, icon: <Calendar size={14} /> },
    { type: "Reservations", value: "7 reservations", scope: "All included", confirmed: true, icon: <Ticket size={14} /> },
    { type: "Documents", value: "3 documents", scope: "Included", confirmed: true, icon: <FileText size={14} /> },
    { type: "Travellers", value: "Sarah Chen", scope: "Preferences included", confirmed: true, icon: <User size={14} /> },
    { type: "Location", value: "Approximate", scope: "Permission granted", confirmed: true, icon: <MapPin size={14} /> },
    { type: "Weather", value: "Lisbon forecast", scope: "7-day", confirmed: false, icon: <Cloud size={14} /> },
    { type: "Live data", value: "Flight + train", scope: "Active", confirmed: false, icon: <Zap size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
        <BackBtn label="Assistant" onPress={onBack} />
        <h2 className="text-[17px] font-bold">Context</h2>
        <button className="text-[12px] font-semibold text-red-500">Clear all</button>
      </div>

      <Scroll>
        <div className="px-5 pt-4 pb-6">
          <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">The assistant is using this information to answer your questions. You can remove any item.</p>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-4">
            {contexts.map((ctx, i) => (
              <div key={ctx.type} className={cn("flex items-center gap-3 px-5 py-3.5", i < contexts.length - 1 && "border-b border-border")}>
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{ctx.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold">{ctx.type}</p>
                    {ctx.confirmed ? <ConfirmedBadge /> : <SuggestedBadge />}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{ctx.value} · {ctx.scope}</p>
                </div>
                <button className="text-muted-foreground"><X size={15} /></button>
              </div>
            ))}
          </div>

          <button className="w-full h-11 border border-dashed border-muted-foreground/30 rounded-2xl text-[13px] font-semibold text-muted-foreground flex items-center justify-center gap-2">
            <Plus size={15} />Add context
          </button>
        </div>
      </Scroll>
    </div>
  );
}

// ─── Screen 5: Assistant Sources ──────────────────────────────────────────────

export function AssistantSourcesScreen({ onBack }: { onBack: () => void }) {
  const sources = [
    { type: "Confirmed reservation", title: "Hotel Vista do Tejo", sub: "Imported from booking email · 15 Jun", icon: <Hotel size={14} />, badge: "confirmed" },
    { type: "External source", title: "LX Factory official website", sub: "lxfactory.com · Accessed today", icon: <Globe size={14} />, badge: "external" },
    { type: "Google Places", title: "Café A Brasileira", sub: "google.com/maps · Reviewed 2 days ago", icon: <MapPin size={14} />, badge: "external" },
    { type: "Assistant inference", title: "Walking time estimate", sub: "Based on locations in your Journey", icon: <Zap size={14} />, badge: "inferred" },
  ];

  const badgeStyle: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700",
    external: "bg-sky-50 text-sky-700",
    inferred: "bg-muted text-muted-foreground",
  };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Assistant" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[22px] font-bold">Sources</h1><p className="text-[12px] text-muted-foreground mt-0.5">Information used in the last response</p></div>

        <div className="px-5 space-y-3">
          {sources.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{s.type}</p>
                    <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide", badgeStyle[s.badge])}>{s.badge}</span>
                  </div>
                  <p className="font-semibold text-[14px]">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
                </div>
              </div>
              {s.badge === "external" && (
                <button className="flex items-center gap-1.5 mt-3 text-[12px] font-semibold text-[#E07B5A]">
                  <Globe size={12} />Open source
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mx-5 mt-4 bg-muted rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Onward uses external sources for informational purposes. Always verify time-sensitive information with official providers.</p>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 6: Voice Assistant ────────────────────────────────────────────────

export function VoiceAssistantScreen({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<"idle" | "listening" | "responding">("idle");
  const [transcript, setTranscript] = useState("");

  function handleListen() {
    setState("listening");
    setTranscript("");
    setTimeout(() => { setTranscript("Find lunch near the museum."); }, 1500);
    setTimeout(() => setState("responding"), 3000);
    setTimeout(() => setState("idle"), 5000);
  }

  return (
    <div className="flex flex-col h-full bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/60"><X size={22} /></button>
        <p className="text-white font-semibold text-[15px]">Voice</p>
        <button className="text-white/60 text-[13px] font-medium">Text</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p className="text-white/50 text-[13px] mb-8">Lisbon & Porto · Day 4</p>

        {/* Audio visualiser */}
        <div className="relative mb-8">
          <div className={cn("w-28 h-28 rounded-full flex items-center justify-center transition-all", state === "listening" ? "bg-[#E07B5A]" : state === "responding" ? "bg-emerald-500" : "bg-white/10")}>
            {state === "idle" && <Mic size={40} className="text-white/60" />}
            {state === "listening" && <Mic size={40} className="text-white" />}
            {state === "responding" && <Volume2 size={40} className="text-white" />}
          </div>
          {state === "listening" && (
            <div className="absolute inset-0 rounded-full border-4 border-[#E07B5A]/30" style={{ animation: "ping 1s infinite" }} />
          )}
        </div>

        <p className="text-white text-[22px] font-bold mb-2 min-h-[32px]">
          {state === "idle" ? "Tap to speak" : state === "listening" ? "Listening…" : "Responding…"}
        </p>

        {transcript && (
          <p className="text-white/60 text-[14px] leading-relaxed mb-2">"{transcript}"</p>
        )}

        {state === "responding" && (
          <div className="bg-white/10 rounded-2xl px-4 py-3 mt-4 text-left w-full">
            <p className="text-white text-[13px] leading-relaxed">There are several good options near the National Museum of Ancient Art — I'll show you three that fit your afternoon window.</p>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 px-5 pb-8">
        <div className="flex items-center gap-4">
          {state !== "idle" && <button onClick={() => setState("idle")} className="flex-1 h-12 border border-white/20 rounded-2xl text-white/60 font-semibold text-[14px]">Cancel</button>}
          <button onClick={handleListen} className={cn("h-16 w-16 rounded-full flex items-center justify-center mx-auto flex-shrink-0 transition-all", state === "idle" ? "bg-[#E07B5A]" : "bg-white/20")}>
            {state === "idle" ? <Mic size={28} className="text-white" /> : <X size={24} className="text-white" />}
          </button>
          {state === "responding" && <button className="flex-1 h-12 border border-white/20 rounded-2xl text-white/60 font-semibold text-[14px]">Replay</button>}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: Conversation History ──────────────────────────────────────────

export function ConversationHistoryScreen({ onBack, onConversation }: { onBack: () => void; onConversation: () => void }) {
  const [filter, setFilter] = useState("all");
  const convos = [
    { title: "Free afternoon ideas", journey: "Lisbon & Porto", date: "Today", last: "You have 3 hours between checkout…", pinned: true },
    { title: "Restaurants near Belém", journey: "Lisbon & Porto", date: "Yesterday", last: "Here are four options within walking…", pinned: false },
    { title: "Copenhagen day plan", journey: "Copenhagen", date: "2 weeks ago", last: "Day 1 could include Nyhavn and…", pinned: false },
    { title: "What to pack for Japan", journey: "Tokyo & Kyoto", date: "1 month ago", last: "For November in Japan you'll want…", pinned: false },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Assistant" onPress={onBack} />
          <button className="text-muted-foreground"><Search size={18} /></button>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">History</h1></div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["All", "Active Journey", "Planning", "Discovery", "Preparation"].map((f) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 transition-colors", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-2">
          {convos.map((c) => (
            <div key={c.title} onClick={onConversation} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-start gap-3 cursor-pointer active:opacity-70">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><MessageSquare size={16} className="text-muted-foreground" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="font-semibold text-[14px] truncate">{c.title}</p>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0">{c.date}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{c.journey}</p>
                <p className="text-[12px] text-muted-foreground truncate mt-0.5">{c.last}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 8: Assistant Feedback ─────────────────────────────────────────────

export function AssistantFeedbackScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [rating, setRating] = useState<string | null>(null);
  const [note, setNote] = useState("");

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button>
          <h2 className="text-[17px] font-bold">Feedback</h2>
          <button onClick={onSubmit} className="text-[#E07B5A] font-bold">Submit</button>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[14px] text-muted-foreground leading-relaxed">Help improve Onward. Your Journey details won't be shared unless you choose to include them.</p>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Was this response helpful?</p>
          <div className="grid grid-cols-2 gap-2">
            {["Helpful", "Not helpful", "Incorrect", "Outdated", "Unsafe", "Missing source"].map((r) => (
              <button key={r} onClick={() => setRating(r)} className={cn("py-2.5 rounded-2xl text-[13px] font-semibold border-2 transition-all", rating === r ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Additional notes (optional)</p>
          <textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none h-24 placeholder:text-muted-foreground/50" placeholder="What went wrong or could be better?" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="mx-5 bg-muted rounded-2xl p-3.5">
          <div className="flex items-start gap-2"><Shield size={13} className="text-muted-foreground mt-0.5" /><p className="text-[12px] text-muted-foreground leading-relaxed">No personal Journey information is shared with this feedback unless you explicitly consent below.</p></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 9: Plan a New Journey ────────────────────────────────────────────

export function PlanNewJourneyScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [purpose, setPurpose] = useState("holiday");
  const purposes = ["Holiday", "Weekend", "Work", "Relaxation", "Adventure", "Food", "Culture", "Mixed"];
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button>
          <h2 className="text-[17px] font-bold">Plan a Journey</h2>
          <button onClick={onNext} className="text-[#E07B5A] font-bold">Next</button>
        </div>

        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Destination</label>
            <div className="relative"><input className={cn(fieldCls, "pl-10")} placeholder="Where to?" /><MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /></div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Starting from</label>
            <input className={fieldCls} placeholder="Your starting city" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">From</label>
              <input type="date" className={fieldCls} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">To</label>
              <input type="date" className={fieldCls} />
            </div>
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Journey purpose</p>
          <div className="flex flex-wrap gap-2">
            {purposes.map((p) => (
              <button key={p} onClick={() => setPurpose(p.toLowerCase())} className={cn("px-3.5 py-2 rounded-2xl text-[13px] font-semibold border-2 transition-all", purpose === p.toLowerCase() ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={onNext} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px]">Continue</button>
          <button className="w-full h-[46px] border border-border rounded-2xl font-semibold text-[14px] text-muted-foreground">Start from existing reservation</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 10: Planning Preferences ─────────────────────────────────────────

export function PlanningPreferencesScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [pace, setPace] = useState("balanced");
  const [selected, setSelected] = useState(["Food", "History", "Architecture"]);
  const interests = ["Food", "History", "Museums", "Nature", "Shopping", "Architecture", "Beaches", "Wellness", "Photography", "Family", "Adventure", "Nightlife"];

  function toggleInterest(i: string) {
    setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  }

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Preferences</h2>
          <button onClick={onNext} className="text-[#E07B5A] font-bold">Next</button>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Travel pace</p>
          <div className="grid grid-cols-3 gap-2">
            {["Relaxed", "Balanced", "Full"].map((p) => (
              <button key={p} onClick={() => setPace(p.toLowerCase())} className={cn("py-3 rounded-2xl text-[13px] font-semibold border-2 transition-all text-center", pace === p.toLowerCase() ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                <div className="mb-1">{p === "Relaxed" ? "🌅" : p === "Balanced" ? "⚖️" : "⚡"}</div>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <button key={i} onClick={() => toggleInterest(i)} className={cn("px-3.5 py-1.5 rounded-full text-[13px] font-semibold border-2 transition-all", selected.includes(i) ? "border-[#E07B5A] bg-[#E07B5A]/10 text-[#E07B5A]" : "border-border bg-card text-muted-foreground")}>
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Style</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {[
              { label: "Popular vs local", opts: ["Popular", "Mixed", "Local"] },
              { label: "Indoor vs outdoor", opts: ["Indoor", "Mixed", "Outdoor"] },
            ].map((row, i, arr) => (
              <div key={row.label} className={cn("px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
                <p className="text-[13px] text-muted-foreground mb-2">{row.label}</p>
                <div className="flex gap-1.5">
                  {row.opts.map((o) => (
                    <button key={o} className="flex-1 h-9 bg-muted rounded-xl text-[12px] font-semibold text-muted-foreground">{o}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5"><PrimaryBtn label="Continue" onClick={onNext} /></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 11: Journey Budget ────────────────────────────────────────────────

export function JourneyBudgetScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [daily, setDaily] = useState(150);
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Preferences" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Budget</h2>
          <button onClick={onNext} className="text-[#E07B5A] font-bold">Next</button>
        </div>

        <div className="px-5 mb-5">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Daily budget (approx.)</label>
          <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between">
            <button onClick={() => setDaily(Math.max(20, daily - 10))} className="w-9 h-9 rounded-full bg-muted text-lg font-bold text-muted-foreground">−</button>
            <div className="text-center">
              <p className="text-[36px] font-bold leading-none">€{daily}</p>
              <p className="text-[12px] text-muted-foreground mt-1">per day · EUR</p>
            </div>
            <button onClick={() => setDaily(daily + 10)} className="w-9 h-9 rounded-full bg-muted text-lg font-bold text-muted-foreground">+</button>
          </div>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Budget breakdown</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {[
              { cat: "Food & drinks", pct: "35%", est: `~€${Math.round(daily * 0.35)}` },
              { cat: "Activities", pct: "25%", est: `~€${Math.round(daily * 0.25)}` },
              { cat: "Local transport", pct: "15%", est: `~€${Math.round(daily * 0.15)}` },
              { cat: "Shopping", pct: "15%", est: `~€${Math.round(daily * 0.15)}` },
              { cat: "Other", pct: "10%", est: `~€${Math.round(daily * 0.10)}` },
            ].map((row, i, arr) => (
              <div key={row.cat} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
                <span className="text-[13px]">{row.cat}</span>
                <div className="text-right"><p className="text-[13px] font-semibold">{row.est}</p><p className="text-[10px] text-muted-foreground">{row.pct}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5">
          <p className="text-[12px] text-amber-800 leading-relaxed">Budget estimates are approximate. Actual prices vary and Onward does not guarantee availability.</p>
        </div>

        <div className="mx-5"><PrimaryBtn label="Continue" onClick={onNext} /></div>
      </div>
    </Scroll>
  );
}

// ─── Screens 12–13: Traveller Selection & Constraints ─────────────────────────

export function TravellerSelectionAIScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  function Counter({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
    return (
      <div className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
        <span className="text-[14px] font-medium">{label}</span>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange(Math.max(0, value - 1))} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">−</button>
          <span className="w-6 text-center font-bold text-[16px]">{value}</span>
          <button onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">+</button>
        </div>
      </div>
    );
  }

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Budget" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Travellers</h2>
          <button onClick={onNext} className="text-[#E07B5A] font-bold">Next</button>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-5 shadow-sm">
          <Counter label="Adults" value={adults} onChange={setAdults} />
          <Counter label="Children (2–17)" value={children} onChange={setChildren} />
        </div>
        {adults + children > 1 && (
          <div className="px-5 mb-5">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">From your Journey</p>
            {["Sarah Chen", "James Chen"].slice(0, adults).map((t) => (
              <div key={t} className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1C2B3A] flex items-center justify-center text-white font-bold text-[11px]">{t.split(" ").map((n) => n[0]).join("")}</div>
                <p className="text-[14px] font-medium">{t}</p>
                <ChevronRight size={14} className="text-muted-foreground ml-auto" />
              </div>
            ))}
          </div>
        )}
        <div className="mx-5"><PrimaryBtn label="Continue" onClick={onNext} /></div>
      </div>
    </Scroll>
  );
}

export function PlanningConstraintsScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [constraints, setConstraints] = useState<string[]>(["hotel-checkout", "must-do"]);
  const options = [
    { id: "hotel-checkout", label: "Hotel check-in / checkout times" },
    { id: "must-do", label: "Must-do places" },
    { id: "work-hours", label: "Work hours" },
    { id: "free-time", label: "Required free time" },
    { id: "mobility", label: "Mobility requirements" },
    { id: "earliest", label: "Earliest start time" },
    { id: "latest", label: "Latest end time" },
    { id: "dietary", label: "Dietary requirements" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Travellers" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Constraints</h2>
          <button onClick={onNext} className="text-[#E07B5A] font-bold">Plan</button>
        </div>
        <p className="px-5 text-[13px] text-muted-foreground mb-4 leading-relaxed">Tell the assistant what it must work around. Fixed reservations are included automatically.</p>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {options.map((opt, i) => (
            <div key={opt.id} onClick={() => setConstraints((c) => c.includes(opt.id) ? c.filter((x) => x !== opt.id) : [...c, opt.id])} className={cn("flex items-center gap-3 px-5 py-3.5 cursor-pointer", i < options.length - 1 && "border-b border-border")}>
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", constraints.includes(opt.id) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {constraints.includes(opt.id) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-[14px] font-medium">{opt.label}</span>
            </div>
          ))}
        </div>

        <div className="mx-5"><PrimaryBtn label="Generate plan" onClick={onNext} /></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 14: Generating Journey Plan ──────────────────────────────────────

export function GeneratingJourneyPlanScreen({ onDone }: { onDone: () => void }) {
  const stages = [
    "Reviewing your dates…",
    "Checking existing reservations…",
    "Grouping nearby places…",
    "Balancing each day…",
    "Estimating travel time…",
    "Adding breaks…",
    "Checking constraints…",
    "Preparing your plan…",
  ];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => {
      if (s >= stages.length - 1) { clearInterval(id); setTimeout(onDone, 600); return s; }
      return s + 1;
    }), 900);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-full bg-[#1C2B3A] flex items-center justify-center mb-7 shadow-lg">
        <Zap size={28} className="text-[#E07B5A]" />
      </div>
      <h2 className="text-[22px] font-bold mb-1">Planning your Journey</h2>
      <p className="text-[14px] text-muted-foreground mb-8">{stages[stage]}</p>

      <div className="w-full space-y-2 mb-8">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", i < stage ? "bg-emerald-500" : i === stage ? "bg-[#E07B5A]" : "bg-muted")}>
              {i < stage ? <Check size={11} className="text-white" strokeWidth={3} /> : i === stage ? <div className="w-2 h-2 rounded-full bg-white" /> : null}
            </div>
            <span className={cn("text-[12px]", i < stage ? "text-emerald-700 font-medium" : i === stage ? "font-semibold" : "text-muted-foreground")}>
              {s.replace("…", "")}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-2xl p-3.5 mb-5">
        <p className="text-[12px] text-muted-foreground leading-relaxed">Suggestions will need your review before they're added to the Journey.</p>
      </div>

      <button className="text-[13px] text-muted-foreground font-medium">Continue in background</button>
    </div>
  );
}

// ─── Screen 15: Generated Journey Overview ────────────────────────────────────

export function GeneratedJourneyOverviewScreen({ onBack, onDay, onSave }: {
  onBack: () => void; onDay: () => void; onSave: () => void;
}) {
  const days = [
    { day: "Fri 27 Jun", activities: 4, suggested: 3, free: "2h", highlights: "Arrival, Alfama walk" },
    { day: "Sat 28 Jun", activities: 5, suggested: 4, free: "1h", highlights: "Belém, LX Factory" },
    { day: "Sun 29 Jun", activities: 3, suggested: 2, free: "3h", highlights: "Sintra day trip" },
    { day: "Mon 30 Jun", activities: 3, suggested: 2, free: "2h", highlights: "Checkout, Porto train" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Planning" onPress={onBack} />
          <div className="flex gap-2">
            <button className="text-muted-foreground text-[13px] font-medium">Regenerate</button>
            <button onClick={onSave} className="text-[#E07B5A] font-bold text-[14px]">Save</button>
          </div>
        </div>

        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 mb-1"><SuggestedBadge /><span className="text-[11px] text-muted-foreground">AI-generated · Needs review</span></div>
          <h1 className="text-[24px] font-bold">Lisbon & Porto</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">27 Jun – 5 Jul · Balanced pace · ~€150/day</p>
        </div>

        <div className="mx-5 grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Confirmed", value: "7", color: "text-emerald-700" },
            { label: "Suggested", value: "14", color: "text-[#E07B5A]" },
            { label: "Optional", value: "6", color: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl py-3 text-center shadow-sm">
              <p className={cn("text-[22px] font-bold", s.color)}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Day by day</p></div>
        <div className="px-5 space-y-2 mb-5">
          {days.map((d) => (
            <div key={d.day} onClick={onDay} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="flex-1">
                <p className="font-semibold text-[14px]">{d.day}</p>
                <p className="text-[12px] text-muted-foreground">{d.highlights}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-emerald-700 font-semibold">{d.activities - d.suggested} confirmed</span>
                  <span className="text-[10px] text-[#E07B5A] font-semibold">{d.suggested} suggested</span>
                  <span className="text-[10px] text-muted-foreground">{d.free} free</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Review each day" onClick={onDay} />
          <button className="w-full h-[46px] border border-border rounded-2xl font-semibold text-[14px]">Compare alternatives</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 16: Generated Day Plan ────────────────────────────────────────────

export function GeneratedDayPlanScreen({ onBack, onAccept }: { onBack: () => void; onAccept: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Overview" onPress={onBack} />
          <div className="flex gap-2">
            <button className="text-muted-foreground text-[13px] font-medium">Regenerate</button>
            <button onClick={onAccept} className="text-[#E07B5A] font-bold text-[14px]">Accept</button>
          </div>
        </div>

        <div className="px-5 pb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Saturday 28 June</p>
          <h1 className="text-[22px] font-bold">Belém & LX Factory</h1>
          <p className="text-muted-foreground text-[12px] mt-0.5">Balanced day · ~€65 · Mostly outdoor</p>
        </div>

        <div className="px-5 space-y-2 mb-4">
          <ConfirmedReservationCard icon={<Hotel size={14} />} title="Hotel Vista do Tejo" time="10:00" sub="Checkout" />

          <SuggestedPlanCard
            icon={<MapPin size={15} />}
            title="Pastéis de Belém"
            time="10:30"
            duration="30 min"
            reason="Famous custard tarts, 15 min from hotel"
            source="Google Places · Usually busy, arrive early"
          />

          <SuggestedPlanCard
            icon={<MapPin size={15} />}
            title="Jerónimos Monastery"
            time="11:00"
            duration="1h 30m"
            reason="UNESCO World Heritage, matches your cultural interest"
            source="Onward Knowledge · €10 entry"
          />

          <div className="border border-dashed border-muted-foreground/20 rounded-2xl px-4 py-3 flex items-center gap-2">
            <Coffee size={14} className="text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-[13px] font-semibold">Lunch break</p>
              <p className="text-[11px] text-muted-foreground">13:00 · 1 hour · Near Belém Tower</p>
            </div>
            <OptionalBadge />
          </div>

          <SuggestedPlanCard
            icon={<MapPin size={15} />}
            title="LX Factory"
            time="15:00"
            duration="2h"
            reason="Sunday market, creative market — matches your interests"
            source="lxfactory.com · Open until 20:00"
          />

          <ConfirmedReservationCard icon={<Train size={14} />} title="Alfa Pendular AP 122" time="15:30" sub="Lisboa Oriente → Porto" />
        </div>

        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
          <div className="flex items-start gap-2"><AlertCircle size={13} className="text-amber-600 mt-0.5 flex-shrink-0" /><p className="text-[12px] text-amber-800 leading-relaxed">LX Factory closes at 14:00 on some Sundays. Verify opening hours before finalising.</p></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 17: Compare Generated Plans ──────────────────────────────────────

export function CompareGeneratedPlansScreen({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const [selected, setSelected] = useState(1);
  const plans = [
    { label: "Relaxed", activities: 8, free: "8h", move: "Low", cost: "~€90/day", start: "10:00", end: "19:00", diffs: "Fewer activities, longer breaks" },
    { label: "Balanced", activities: 14, free: "5h", move: "Moderate", cost: "~€140/day", start: "09:30", end: "21:00", diffs: "Recommended based on your preferences" },
    { label: "Packed", activities: 20, free: "2h", move: "High", cost: "~€190/day", start: "08:00", end: "22:00", diffs: "More to see, less time to rest" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Overview" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Compare plans</h2>
          <button onClick={onSelect} className="text-[#E07B5A] font-bold">Select</button>
        </div>

        <div className="px-5 space-y-3">
          {plans.map((plan, i) => (
            <div key={plan.label} onClick={() => setSelected(i)} className={cn("bg-card border-2 rounded-3xl p-4 cursor-pointer transition-all shadow-sm", selected === i ? "border-[#1C2B3A] shadow-md" : "border-border")}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", selected === i ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                    {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                  </div>
                  <p className="font-bold text-[17px]">{plan.label}</p>
                  {i === 1 && <SuggestedBadge />}
                </div>
                <p className="text-[13px] font-semibold text-muted-foreground">{plan.cost}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[
                  { label: "Activities", value: String(plan.activities) },
                  { label: "Free time", value: plan.free },
                  { label: "Movement", value: plan.move },
                  { label: "Hours", value: `${plan.start}–${plan.end}` },
                ].map((s) => (
                  <div key={s.label} className="bg-muted rounded-xl px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    <p className="text-[13px] font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-muted-foreground italic">{plan.diffs}</p>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 18: Review Suggested Additions ────────────────────────────────────

export function ReviewSuggestedAdditionsScreen({ onBack }: { onBack: () => void }) {
  const items = [
    { icon: <MapPin size={15} />, title: "Torre de Belém", day: "Sat 28 Jun", time: "11:00", duration: "1h", price: "€6", dist: "8 min walk", reason: "Iconic landmark, matches cultural interest", source: "visitlisboa.com" },
    { icon: <UtensilsCrossed size={15} />, title: "Time Out Market", day: "Sun 29 Jun", time: "13:00", duration: "1h 30m", price: "€15–25", dist: "Near LX Factory", reason: "Highly rated food market", source: "Google Places" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Day plan" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <h1 className="text-[22px] font-bold">Review additions</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">These aren't bookings yet — review before adding.</p>
        </div>

        <div className="px-5 space-y-4">
          {items.map((item) => (
            <div key={item.title} className="border border-dashed border-[#E07B5A]/40 bg-[#E07B5A]/5 rounded-3xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E07B5A]/10 flex items-center justify-center flex-shrink-0 text-[#E07B5A]">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5"><p className="font-bold text-[15px]">{item.title}</p><SuggestedBadge /></div>
                  <p className="text-[12px] text-muted-foreground">{item.day} · {item.time} · {item.duration}</p>
                  <p className="text-[12px] text-muted-foreground">{item.dist} · {item.price}</p>
                  <p className="text-[11px] text-muted-foreground italic mt-1">{item.reason}</p>
                  <SourceLabel text={item.source} />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 h-9 bg-[#1C2B3A] text-white rounded-xl text-[12px] font-semibold">Add as planned</button>
                <button className="flex-1 h-9 border border-border bg-card rounded-xl text-[12px] font-medium">Save for later</button>
                <button className="w-9 h-9 border border-border bg-card rounded-xl flex items-center justify-center text-muted-foreground"><X size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 19–20: Save & Revision History ───────────────────────────────────

export function SaveGeneratedJourneyScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [saveMode, setSaveMode] = useState("selected");
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Back</button>
          <h2 className="text-[17px] font-bold">Save Journey</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Confirmed reservations", value: "7", color: "text-emerald-700" },
            { label: "Suggested items (selected)", value: "11", color: "text-[#E07B5A]" },
            { label: "Optional items", value: "3", color: "text-muted-foreground" },
            { label: "Items to book", value: "4", color: "text-amber-700" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className={cn("text-[13px] font-bold", r.color)}>{r.value}</span>
            </div>
          ))}
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Save options</p>
          {[
            { id: "all", label: "Save all items", sub: "Including all optional suggestions" },
            { id: "selected", label: "Save selected items", sub: "Only reviewed and accepted items" },
            { id: "draft", label: "Save as draft", sub: "Continue reviewing later" },
          ].map((opt) => (
            <button key={opt.id} onClick={() => setSaveMode(opt.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left mb-2 transition-all", saveMode === opt.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", saveMode === opt.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {saveMode === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
              </div>
              <div><p className="font-semibold text-[14px]">{opt.label}</p><p className="text-[12px] text-muted-foreground">{opt.sub}</p></div>
            </button>
          ))}
        </div>

        <div className="mx-5"><PrimaryBtn label="Save Journey" onClick={onSave} /></div>
      </div>
    </Scroll>
  );
}

export function JourneyPlanHistoryScreen({ onBack }: { onBack: () => void }) {
  const versions = [
    { label: "Current version", date: "Today 14:30", changes: "Accepted 3 suggestions, removed 2", author: "You" },
    { label: "After replanning", date: "Today 11:15", changes: "Day 4 replanned after delay", author: "Assistant" },
    { label: "Original generated plan", date: "Yesterday 16:00", changes: "Initial AI-generated plan", author: "Assistant" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[22px] font-bold">Plan history</h1></div>
        <div className="px-5 space-y-3">
          {versions.map((v, i) => (
            <div key={i} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <p className="font-bold text-[14px]">{v.label}</p>
                {i === 0 && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Current</span>}
              </div>
              <p className="text-[12px] text-muted-foreground">{v.date} · {v.author}</p>
              <p className="text-[12px] text-muted-foreground mt-1">{v.changes}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 h-8 border border-border rounded-xl text-[12px] font-medium">Compare</button>
                {i !== 0 && <button className="flex-1 h-8 border border-border rounded-xl text-[12px] font-medium">Restore</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 21: Optimise This Day ────────────────────────────────────────────

export function OptimiseThisDayScreen({ onBack, onGenerate }: { onBack: () => void; onGenerate: () => void }) {
  const [goal, setGoal] = useState<string | null>(null);
  const goals = [
    "Reduce travel time", "Make the day more relaxed", "Add one more activity",
    "Lower cost", "Add more breaks", "End earlier", "Prioritise food",
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Optimise day</h2>
          <div className="w-12" />
        </div>

        <div className="px-5 pb-4">
          <p className="text-[13px] text-muted-foreground leading-relaxed">The assistant will suggest changes to your day. Confirmed reservations stay in place.</p>
        </div>

        {/* Current day summary */}
        <div className="mx-5 bg-muted/50 rounded-3xl p-4 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Monday 30 June · Current</p>
          <div className="space-y-1">
            <ConfirmedReservationCard icon={<Hotel size={13} />} title="Hotel checkout" time="12:00" sub="Confirmed" />
            <SuggestedPlanCard icon={<MapPin size={13} />} title="LX Factory" time="12:30" duration="1h 30m" reason="" source="" />
            <ConfirmedReservationCard icon={<Train size={13} />} title="AP 122 to Porto" time="15:30" sub="Confirmed" />
          </div>
          <div className="flex items-center gap-4 mt-3 text-[12px] text-muted-foreground">
            <span>3 plans</span><span>·</span><span>2h free</span><span>·</span><span>~35 min travel</span>
          </div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Optimisation goal</p>
          <div className="flex flex-wrap gap-2">
            {goals.map((g) => (
              <button key={g} onClick={() => setGoal(g)} className={cn("px-3.5 py-2 rounded-2xl text-[13px] font-semibold border-2 transition-all", goal === g ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>{g}</button>
            ))}
          </div>
        </div>

        <div className="mx-5">
          <button onClick={onGenerate} className={cn("w-full h-[52px] rounded-2xl font-semibold text-[15px] transition-all", goal ? "bg-[#1C2B3A] text-white active:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
            Generate optimisation
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 22: Optimised Day Preview ────────────────────────────────────────

export function OptimisedDayPreviewScreen({ onBack, onApply, onConfirm }: { onBack: () => void; onApply: () => void; onConfirm: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Optimise" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Day preview</h2>
          <button onClick={onApply} className="text-[#E07B5A] font-bold">Apply</button>
        </div>

        <div className="mx-5 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-4">
          <p className="text-[12px] text-emerald-800 font-semibold">Travel time reduced by 25 min · 30 min more free time</p>
        </div>

        <div className="px-5 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-2xl p-3 border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Before</p>
              {["12:00 Hotel checkout", "12:30 LX Factory", "15:30 Train"].map((i) => <p key={i} className="text-[11px] text-muted-foreground mb-1">{i}</p>)}
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-2">After</p>
              {["12:00 Hotel checkout", "12:15 Café stop ✨", "13:00 LX Factory", "15:30 Train"].map((i) => <p key={i} className="text-[11px] text-emerald-800 mb-1">{i}</p>)}
            </div>
          </div>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Changes explained</p>
          {[
            { change: "Added coffee break at 12:15", reason: "Creates a gentler start after checkout", type: "added" },
            { change: "LX Factory moved to 13:00", reason: "Avoids overlap with Saturday crowds", type: "moved" },
          ].map((c) => (
            <div key={c.change} className={cn("flex items-start gap-2.5 mb-2.5 rounded-xl p-3", c.type === "added" ? "bg-emerald-50" : "bg-sky-50")}>
              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", c.type === "added" ? "bg-emerald-200" : "bg-sky-200")}>
                {c.type === "added" ? <Plus size={11} className="text-emerald-700" /> : <ArrowRight size={11} className="text-sky-700" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold">{c.change}</p>
                <p className="text-[11px] text-muted-foreground">{c.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <button onClick={onConfirm} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-semibold text-[15px]">Apply all changes</button>
          <SecondaryBtn label="Keep original" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 23: Move Flexible Plans ──────────────────────────────────────────

export function MoveFlexiblePlansScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number[]>([0]);
  const items = [
    { icon: <MapPin size={13} />, title: "LX Factory", current: "Mon 30 Jun · 12:30", suggested: "Sat 28 Jun · 15:00", reason: "Better match with Belém route" },
    { icon: <UtensilsCrossed size={13} />, title: "Time Out Market", current: "Mon 30 Jun · 14:00", suggested: "Sun 29 Jun · 13:00", reason: "Frees up time before train" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Optimise" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Move plans</h2>
          <button className="text-[#E07B5A] font-bold">Apply</button>
        </div>

        <div className="px-5 space-y-3">
          {items.map((item, i) => (
            <div key={i} onClick={() => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className={cn("border-2 rounded-3xl p-4 cursor-pointer transition-all", selected.includes(i) ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selected.includes(i) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {selected.includes(i) && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-[#1C2B3A]">{item.icon}</div>
                <p className="font-semibold text-[14px]">{item.title}</p>
              </div>
              <div className="flex items-center gap-3 ml-9">
                <div className="text-center"><p className="text-[10px] text-muted-foreground">Now</p><p className="text-[12px] font-medium">{item.current}</p></div>
                <ArrowRight size={12} className="text-muted-foreground flex-shrink-0" />
                <div className="text-center"><p className="text-[10px] text-[#E07B5A] font-semibold">Suggested</p><p className="text-[12px] font-semibold text-[#E07B5A]">{item.suggested}</p></div>
              </div>
              <p className="text-[11px] text-muted-foreground italic mt-2 ml-9">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 24: Fill Free Time ────────────────────────────────────────────────

export function FillFreeTimeScreen({ onBack, onSuggestion }: { onBack: () => void; onSuggestion: () => void }) {
  const [filter, setFilter] = useState("all");
  const filters = ["All", "Nearby", "Free", "Indoor", "Food", "Relaxed"];
  const suggestions = [
    { icon: <MapPin size={15} />, title: "Carmo Archaeological Museum", cat: "Culture · Free", dist: "8 min walk", duration: "1h", cost: "€4", open: true },
    { icon: <Coffee size={15} />, title: "Café A Brasileira", cat: "Café · Historic", dist: "5 min walk", duration: "45m", cost: "€5–8", open: true },
    { icon: <MapPin size={15} />, title: "Miradouro da Graça", cat: "Viewpoint · Free", dist: "15 min walk", duration: "30m", cost: "Free", open: true },
    { icon: <MapPin size={15} />, title: "Intendente Market", cat: "Shopping", dist: "12 min walk", duration: "1h", cost: "Varies", open: false },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Timeline" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Fill free time</h2>
          <div className="w-12" />
        </div>

        <div className="mx-5 bg-muted rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
          <Clock size={15} className="text-[#E07B5A] flex-shrink-0" />
          <div>
            <p className="text-[13px] font-semibold">2h 30m free · Mon 30 Jun</p>
            <p className="text-[11px] text-muted-foreground">After checkout · Before 14:00 train</p>
          </div>
        </div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-2">
          {suggestions.map((s) => (
            <div key={s.title} onClick={onSuggestion} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", s.open ? "bg-[#E07B5A]/10 text-[#E07B5A]" : "bg-muted text-muted-foreground")}>{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[14px] truncate">{s.title}</p>
                  {!s.open && <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">Closed</span>}
                </div>
                <p className="text-[11px] text-muted-foreground">{s.cat} · {s.dist}</p>
                <p className="text-[11px] text-muted-foreground">{s.duration} · {s.cost}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 25: Free-Time Suggestion Detail ───────────────────────────────────

export function FreeTimeSuggestionScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Free time" onPress={onBack} />
          <button><Heart size={18} className="text-muted-foreground" /></button>
        </div>

        {/* Image placeholder */}
        <div className="mx-5 h-40 bg-muted rounded-3xl flex items-center justify-center mb-4">
          <MapPin size={32} className="text-muted-foreground" />
        </div>

        <div className="px-5 mb-4">
          <div className="flex items-center gap-2 mb-1"><SuggestedBadge /><span className="text-[11px] text-muted-foreground">Recommended for you</span></div>
          <h1 className="text-[22px] font-bold">Carmo Archaeological Museum</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Museum · Chiado · Lisbon</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Open now", value: "Until 18:00" },
            { label: "Visit duration", value: "45 min – 1h 30m" },
            { label: "Distance", value: "8 min walk from hotel" },
            { label: "Price", value: "€4" },
            { label: "Accessibility", value: "Step-free access available" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Why recommended</p>
          <div className="bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl p-3.5">
            <p className="text-[13px] text-muted-foreground leading-relaxed">Matches your interest in history and architecture. Close to your afternoon route and fits within your 2h 30m gap.</p>
            <SourceLabel text="Onward · Based on your journey context" />
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Add to Timeline" onClick={onAdd} />
          <SecondaryBtn label="Add as optional" />
          <button className="w-full text-[13px] text-muted-foreground font-medium">Not interested</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 26–27: Replan Day ────────────────────────────────────────────────

export function ReplanRemainingDayScreen({ onBack, onGenerate }: { onBack: () => void; onGenerate: () => void }) {
  const [goal, setGoal] = useState<string | null>(null);
  const goals = ["Preserve every plan", "Make day less rushed", "Prioritise one activity", "Return to accommodation", "End the day early"];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Disruption" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><RefreshCw size={20} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Replan remaining day</h1>
          <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">AP 122 delayed by 45 min. What matters most for the rest of your afternoon?</p>
        </div>

        <div className="mx-5 bg-muted/50 rounded-2xl p-4 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Remaining plans</p>
          <div className="flex items-center gap-2 mb-1.5"><MapPin size={12} className="text-[#E07B5A]" /><span className="text-[12px]">LX Factory · 12:30 (flexible)</span><OptionalBadge /></div>
          <div className="flex items-center gap-2"><Train size={12} className="text-foreground" /><span className="text-[12px]">AP 122 · Now 16:15 (delayed)</span><ConfirmedBadge /></div>
        </div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Replanning goal</p>
          <div className="space-y-2">
            {goals.map((g) => (
              <button key={g} onClick={() => setGoal(g)} className={cn("w-full flex items-center gap-3 rounded-2xl p-3.5 border-2 text-left transition-all", goal === g ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", goal === g ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {goal === g && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}
                </div>
                <span className="text-[14px] font-semibold">{g}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5">
          <button onClick={onGenerate} className={cn("w-full h-[52px] rounded-2xl font-semibold text-[15px] transition-all", goal ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground cursor-not-allowed")}>
            Replan
          </button>
        </div>
      </div>
    </Scroll>
  );
}

export function ReplannedDayPreviewScreen({ onBack, onApply }: { onBack: () => void; onApply: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Replan" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Revised plan</h2>
          <button onClick={onApply} className="text-[#E07B5A] font-bold">Apply</button>
        </div>

        <div className="px-5 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-2xl p-3 border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Original</p>
              {["12:30 LX Factory", "15:30 AP 122"].map((i) => <p key={i} className="text-[11px] text-muted-foreground mb-1">{i}</p>)}
              <p className="text-[10px] text-muted-foreground mt-2">1h 30m gap before train</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-2">Revised</p>
              {["12:30 LX Factory ✓", "14:30 Café break ✨", "16:15 AP 122"].map((i) => <p key={i} className="text-[11px] text-emerald-800 mb-1">{i}</p>)}
              <p className="text-[10px] text-emerald-700 mt-2">Uses extra 45 min well</p>
            </div>
          </div>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Changes</p>
          <div className="bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Plus size={13} className="text-[#E07B5A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[13px] font-semibold">Added café break at 14:30</p>
              <p className="text-[11px] text-muted-foreground">Uses the extra 45 minutes without rushing. Café da Garagem suggested — near Oriente station.</p>
              <SuggestedBadge />
            </div>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Apply revised plan" onClick={onApply} />
          <SecondaryBtn label="Keep current plan" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 28: Journey-Wide Optimisation ────────────────────────────────────

export function JourneyWideOptimisationScreen({ onBack, onDay }: { onBack: () => void; onDay: () => void }) {
  const issues = [
    { day: "Sat 28 Jun", issue: "Overloaded — 6 activities, 45 min total break", type: "overload", action: "Optimise day" },
    { day: "Sun 29 Jun", issue: "3h unscheduled gap in the afternoon", type: "gap", action: "Fill gap" },
    { day: "Mon 30 Jun", issue: "Repeated Belém route adds 35 min travel", type: "route", action: "Reorder" },
    { day: "Wed 2 Jul", issue: "No planned accommodation", type: "missing", action: "Add stay" },
  ];

  const typeColor: Record<string, string> = {
    overload: "text-red-600 bg-red-50",
    gap: "text-amber-600 bg-amber-50",
    route: "text-sky-600 bg-sky-50",
    missing: "text-purple-600 bg-purple-50",
  };

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[22px] font-bold">Journey optimisation</h1><p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto · 4 suggestions</p></div>

        <div className="px-5 space-y-3 mb-5">
          {issues.map((issue) => (
            <div key={issue.day} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-[14px]">{issue.day}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{issue.issue}</p>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 uppercase tracking-wide", typeColor[issue.type])}>{issue.type}</span>
              </div>
              <button onClick={onDay} className="mt-3 h-8 px-4 bg-muted rounded-xl text-[12px] font-semibold text-muted-foreground">{issue.action}</button>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Optimise entire Journey" />
          <SecondaryBtn label="Save report" />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 29: Explore Destination ──────────────────────────────────────────

export function ExploreDestinationScreen({ onBack, onPlace, onGuide }: { onBack: () => void; onPlace: () => void; onGuide: () => void }) {
  const [filter, setFilter] = useState("things to do");
  const cats = ["Things to do", "Food", "Cafés", "Nature", "Culture", "Day trips", "Hidden places", "Wellness"];

  const places = [
    { icon: <MapPin size={14} />, title: "Jerónimos Monastery", cat: "Culture · UNESCO", dist: "15 min", open: true, why: "Matches history interest" },
    { icon: <UtensilsCrossed size={14} />, title: "Time Out Market", cat: "Food market", dist: "10 min", open: true, why: "Top-rated food hall" },
    { icon: <Coffee size={14} />, title: "Café A Brasileira", cat: "Historic café", dist: "8 min", open: true, why: "Iconic Chiado landmark" },
    { icon: <MapPin size={14} />, title: "LX Factory", cat: "Creative market", dist: "20 min", open: false, why: "Matches your interests" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Assistant" onPress={onBack} />
          <button onClick={onGuide} className="text-[12px] font-bold text-[#E07B5A] flex items-center gap-1"><BookOpen size={13} />Destination guide</button>
        </div>
        <h1 className="text-[22px] font-bold">Explore Lisbon</h1>
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3.5 h-10 mt-2">
          <Search size={15} className="text-muted-foreground" />
          <input className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60" placeholder="Search places…" />
        </div>
      </div>

      <div className="flex gap-2 px-5 py-2 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: "none" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 transition-colors", filter === c.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ scrollbarWidth: "none" }}>
        <div className="space-y-2 mt-2">
          {places.map((p) => (
            <div key={p.title} onClick={onPlace} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center flex-shrink-0 text-[#E07B5A]">{p.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px] truncate">{p.title}</p>
                <p className="text-[11px] text-muted-foreground">{p.cat} · {p.dist} walk</p>
                <p className="text-[10px] text-muted-foreground italic">{p.why}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={cn("text-[10px] font-bold", p.open ? "text-emerald-600" : "text-muted-foreground")}>{p.open ? "Open" : "Closed"}</span>
                <button className="text-muted-foreground"><Bookmark size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 30: Destination Guide ────────────────────────────────────────────

export function DestinationGuideScreen({ onBack }: { onBack: () => void }) {
  const sections = [
    { title: "Overview", content: "Lisbon is Portugal's sun-drenched capital. Built across seven hills, it blends historic trams, tile-covered buildings and a vibrant food scene." },
    { title: "Neighbourhoods", content: "Alfama (historic), Bairro Alto (nightlife), Chiado (shopping), Belém (monuments), Príncipe Real (boutiques)." },
    { title: "Local transport", content: "Metro, trams 28 and 15E, and ferries across the Tagus. 24-hour tickets available at stations." },
    { title: "Opening hours", content: "Most shops 10:00–19:00. Restaurants from 12:30 for lunch and 19:30 for dinner." },
    { title: "Currency & tipping", content: "Euro (EUR). Tips not mandatory but 5–10% appreciated in restaurants." },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Explore" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <h1 className="text-[24px] font-bold">Lisbon</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Portugal · Atlantic coast</p>
        </div>

        {sections.map((s) => (
          <div key={s.title} className="px-5 mb-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{s.title}</p>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{s.content}</p>
          </div>
        ))}

        <div className="mx-5 bg-muted rounded-2xl p-3.5 mt-2">
          <div className="flex items-start gap-2"><Info size={13} className="text-muted-foreground mt-0.5" /><p className="text-[11px] text-muted-foreground leading-relaxed">Information sourced from Onward Knowledge and official tourism bodies. Always verify safety, visa and entry requirements directly with official sources. Last reviewed May 2026.</p></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 31: Recommendation Feed ──────────────────────────────────────────

export function RecommendationFeedScreen({ onBack, onPlace }: { onBack: () => void; onPlace: () => void }) {
  const [filter, setFilter] = useState("recommended");
  const filters = ["Recommended", "Near Timeline", "Saved", "Free", "Open now"];
  const places = [
    { title: "Carmo Convent", cat: "History · Free entry", dist: "8 min", why: "Matches history interest · Day 3 gap", day: "Sun 29 Jun" },
    { title: "Pastéis de Belém", cat: "Food · Iconic", dist: "15 min", why: "Famous, fits Day 2 morning route", day: "Sat 28 Jun" },
    { title: "Miradouro da Graça", cat: "Viewpoint · Free", dist: "20 min", why: "Great for photography interest", day: "Sat 28 Jun" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Explore" onPress={onBack} />
          <button onClick={() => {}} className="text-muted-foreground"><Filter size={18} /></button>
        </div>
        <div className="px-5 pb-3"><h1 className="text-[22px] font-bold">Recommendations</h1><p className="text-[12px] text-muted-foreground">Lisbon · Personalised for you</p></div>

        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 space-y-3">
          {places.map((p) => (
            <div key={p.title} onClick={onPlace} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-70 shadow-sm">
              <div className="h-28 bg-muted rounded-2xl mb-3 flex items-center justify-center"><MapPin size={28} className="text-muted-foreground" /></div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-bold text-[15px]">{p.title}</p>
                <Bookmark size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
              <p className="text-[12px] text-muted-foreground">{p.cat} · {p.dist} walk</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] text-muted-foreground italic">{p.why}</p>
                <button className="text-[11px] font-bold text-[#E07B5A]">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 32: Discovery Map ─────────────────────────────────────────────────

export function DiscoveryMapScreen({ onBack, onPin }: { onBack: () => void; onPin: () => void }) {
  const [filter, setFilter] = useState("all");
  const cats = ["All", "Food", "Culture", "Nature", "Saved"];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 bg-background px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Explore" onPress={onBack} />
          <p className="text-[15px] font-bold">Discovery Map</p>
          <button className="text-muted-foreground"><AlignLeft size={18} /></button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#E8E4DC,#DDD8CE)" }}>
        {/* Recommendation pins */}
        {[
          { x: "30%", y: "35%", color: "#E07B5A", label: "Jerónimos" },
          { x: "55%", y: "50%", color: "#059669", label: "Time Out" },
          { x: "70%", y: "30%", color: "#E07B5A", label: "Carmo" },
          { x: "45%", y: "65%", color: "#6366F1", label: "LX Factory" },
        ].map((pin) => (
          <button key={pin.label} onClick={onPin} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y, transform: "translate(-50%,-100%)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style={{ background: pin.color }}>
              <MapPin size={15} className="text-white" />
            </div>
            <div className="bg-card rounded-xl px-2 py-0.5 shadow mt-1 border border-border">
              <p className="text-[10px] font-bold whitespace-nowrap">{pin.label}</p>
            </div>
          </button>
        ))}

        <div className="absolute top-2 left-3 right-3 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c.toLowerCase())} className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 shadow-sm", filter === c.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-card/90 text-foreground")}>
              {c}
            </button>
          ))}
        </div>

        <div className="absolute right-3 bottom-3 flex flex-col gap-2">
          <button className="w-10 h-10 bg-card rounded-2xl shadow-md border border-border flex items-center justify-center"><Search size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 33: Place Detail ──────────────────────────────────────────────────

export function PlaceDetailScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <BackBtn label="Explore" onPress={onBack} />
          <div className="flex gap-3">
            <button><Bookmark size={18} className="text-muted-foreground" /></button>
            <button><Share2 size={18} className="text-muted-foreground" /></button>
          </div>
        </div>

        <div className="mx-5 h-40 bg-muted rounded-3xl flex items-center justify-center mb-4"><MapPin size={32} className="text-muted-foreground" /></div>

        <div className="px-5 mb-4">
          <p className="text-[12px] text-muted-foreground mb-0.5">Museum · Chiado</p>
          <h1 className="text-[22px] font-bold">Carmo Archaeological Museum</h1>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Address", value: "Largo do Carmo, Lisbon" },
            { label: "Open", value: "Mon–Sat 10:00–18:00" },
            { label: "Price", value: "€4 · Free for under 14" },
            { label: "Duration", value: "45 min – 1h 30m" },
            { label: "Accessibility", value: "Partial step-free access" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold text-right">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Why recommended</p>
          <div className="bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl p-3.5">
            <p className="text-[13px] text-muted-foreground leading-relaxed">Matches your interest in history and architecture. Close to your Sunday morning route and fits your 3-hour afternoon gap.</p>
            <SourceLabel text="Onward · Based on journey context" />
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Add to Journey" onClick={onAdd} />
          <SecondaryBtn label="Add as optional" />
          <button className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl h-11 text-[13px] font-semibold"><Globe size={14} />Open official website</button>
          <button className="w-full text-[13px] text-muted-foreground font-medium py-1">Not interested</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 34–36: Add Place, Saved, Preferences ────────────────────────────

export function AddPlaceToJourneyScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  const [flexible, setFlexible] = useState(true);
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button>
          <h2 className="text-[17px] font-bold">Add to Journey</h2>
          <button onClick={onAdd} className="text-[#E07B5A] font-bold">Add</button>
        </div>

        <div className="mx-5 bg-[#E07B5A]/5 border border-[#E07B5A]/20 rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center text-[#E07B5A]"><MapPin size={16} /></div>
          <div><p className="font-semibold text-[14px]">Carmo Archaeological Museum</p><SuggestedBadge /></div>
        </div>

        <div className="px-5 space-y-3 mb-5">
          {[
            { label: "Journey", value: "Lisbon & Porto" },
            { label: "Suggested day", value: "Sun 29 Jun (3h gap)" },
            { label: "Suggested time", value: "14:00" },
            { label: "Duration", value: "~1 hour" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label>
              <div className={fieldCls}><p className="text-muted-foreground">{f.value}</p></div>
            </div>
          ))}
          <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3.5">
            <div><p className="text-[14px] font-semibold">Flexible timing</p><p className="text-[11px] text-muted-foreground">Can be moved if plans change</p></div>
            <button onClick={() => setFlexible((v) => !v)} className={cn("w-12 h-7 rounded-full relative transition-colors", flexible ? "bg-[#1C2B3A]" : "bg-muted")}>
              <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", flexible ? "left-6" : "left-1")} />
            </button>
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Add to Timeline" onClick={onAdd} />
          <SecondaryBtn label="Add as optional" onClick={onAdd} />
        </div>
      </div>
    </Scroll>
  );
}

export function SavedPlacesScreen({ onBack, onPlace }: { onBack: () => void; onPlace: () => void }) {
  const saved = [
    { title: "Pastéis de Belém", dest: "Lisbon", cat: "Food", assigned: "Lisbon & Porto", icon: <UtensilsCrossed size={14} /> },
    { title: "Nyhavn Harbour", dest: "Copenhagen", cat: "Viewpoint", assigned: "Copenhagen", icon: <MapPin size={14} /> },
    { title: "Fushimi Inari Taisha", dest: "Kyoto", cat: "Culture", assigned: "Tokyo & Kyoto", icon: <MapPin size={14} /> },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Explore" onPress={onBack} />
          <button className="text-muted-foreground"><Map size={18} /></button>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Saved places</h1></div>

        <div className="px-5 space-y-2">
          {saved.map((p) => (
            <div key={p.title} onClick={onPlace} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 text-[#1C2B3A]">{p.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px] truncate">{p.title}</p>
                <p className="text-[11px] text-muted-foreground">{p.dest} · {p.cat}</p>
                <p className="text-[10px] text-[#E07B5A] font-semibold">{p.assigned}</p>
              </div>
              <button className="text-muted-foreground flex-shrink-0"><ChevronRight size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function RecommendationPreferencesScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(["Food", "History", "Architecture", "Photography"]);
  const interests = ["Food", "History", "Museums", "Nature", "Shopping", "Nightlife", "Architecture", "Beaches", "Wellness", "Photography", "Family", "Adventure"];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Explore" onPress={onBack} />
          <button className="text-[#E07B5A] font-bold">Save</button>
        </div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Recommendation preferences</h1></div>

        <div className="px-5 mb-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <button key={i} onClick={() => setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])} className={cn("px-3.5 py-1.5 rounded-full text-[13px] font-semibold border-2 transition-all", selected.includes(i) ? "border-[#E07B5A] bg-[#E07B5A]/10 text-[#E07B5A]" : "border-border bg-card text-muted-foreground")}>
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Popular vs local", opts: ["Popular", "Mixed", "Local"] },
            { label: "Budget", opts: ["Budget", "Mid-range", "Premium"] },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <p className="text-[13px] text-muted-foreground mb-2">{row.label}</p>
              <div className="flex gap-1.5">
                {row.opts.map((o) => <button key={o} className="flex-1 h-9 bg-muted rounded-xl text-[12px] font-semibold text-muted-foreground">{o}</button>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 37–42: Proactive intelligence ────────────────────────────────────

export function JourneyInsightsScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const insights = [
    { section: "Needs attention", icon: <AlertCircle size={14} />, title: "No accommodation on Thu 2 Jul", sub: "Porto · No stay found", severity: "high", action: "Find stay" },
    { section: "Needs attention", icon: <AlertCircle size={14} />, title: "Unreviewed import: TAP TP791", sub: "Porto → London · 5 Jul", severity: "medium", action: "Review" },
    { section: "Opportunities", icon: <Zap size={14} />, title: "3h gap on Sunday afternoon", sub: "Great conditions for Sintra", severity: "low", action: "Fill gap" },
    { section: "Opportunities", icon: <Sun size={14} />, title: "Weather looks perfect Sat–Sun", sub: "Outdoor plans recommended", severity: "low", action: "See suggestions" },
  ];

  const sevColor: Record<string, string> = { high: "bg-red-50 text-red-600", medium: "bg-amber-50 text-amber-600", low: "bg-sky-50 text-sky-600" };
  const groups = [...new Set(insights.map((i) => i.section))];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Journey Insights</h1><p className="text-[12px] text-muted-foreground mt-0.5">Lisbon & Porto · 4 items</p></div>

        {groups.map((group) => (
          <div key={group} className="mb-4">
            <p className="px-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{group}</p>
            <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              {insights.filter((i) => i.section === group).map((ins, i, arr) => (
                <div key={ins.title} onClick={onItem} className={cn("flex items-start gap-3 px-4 py-3.5 cursor-pointer active:opacity-70", i < arr.length - 1 && "border-b border-border")}>
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5", sevColor[ins.severity])}>{ins.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-[13px] leading-tight">{ins.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{ins.sub}</p>
                  </div>
                  <button className="text-[12px] font-bold text-[#E07B5A] flex-shrink-0 mt-1">{ins.action}</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
}

export function JourneyGapDetailScreen({ onBack, onFill }: { onBack: () => void; onFill: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insights" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-3"><Clock size={20} className="text-sky-600" /></div>
          <h1 className="text-[22px] font-bold">3h free — Sunday afternoon</h1>
          <p className="text-[13px] text-muted-foreground mt-1">29 Jun · 14:00 – 17:00</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Gap starts", value: "After Sintra day trip · ~14:00" },
            { label: "Gap ends", value: "Before dinner reservation · 20:00" },
            { label: "Available", value: "~3 hours" },
            { label: "Last location", value: "Sintra town centre" },
            { label: "Next location", value: "Taberna da Rua das Flores, Lisbon" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="View suggestions" onClick={onFill} />
          <SecondaryBtn label="Keep free" onClick={onBack} />
          <button className="w-full text-[13px] text-muted-foreground font-medium">Dismiss insight</button>
        </div>
      </div>
    </Scroll>
  );
}

export function OverloadedDayInsightScreen({ onBack, onOptimise }: { onBack: () => void; onOptimise: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insights" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-3"><AlertCircle size={20} className="text-red-500" /></div>
          <h1 className="text-[22px] font-bold">Busy day — Saturday 28 Jun</h1>
          <p className="text-[13px] text-muted-foreground mt-1">6 activities with only 45 min total breaks</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Activities", value: "6" },
            { label: "Total movement", value: "~2h 20m" },
            { label: "Total free time", value: "45 minutes" },
            { label: "Longest break", value: "20 minutes" },
            { label: "Potential conflicts", value: "Belém Tower closes at 17:30" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Optimise this day" onClick={onOptimise} />
          <SecondaryBtn label="Move some plans" onClick={onBack} />
          <button className="w-full text-[13px] text-muted-foreground font-medium">Keep plan as is</button>
        </div>
      </div>
    </Scroll>
  );
}

export function WeatherSuggestionScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insights" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-3"><Cloud size={20} className="text-sky-600" /></div>
          <h1 className="text-[22px] font-bold">Rain expected — Tuesday 1 Jul</h1>
          <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">2 outdoor activities may be affected.</p>
        </div>

        <div className="mx-5 bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 mb-4">
          <div className="flex items-center gap-2 mb-1"><Umbrella size={13} className="text-sky-600" /><p className="text-[12px] font-bold text-sky-800">Forecast: Rain, 70% chance · 12:00–18:00</p></div>
          <p className="text-[11px] text-sky-700">Source: Met.pt · Updated 1 hour ago. Forecasts may change.</p>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Affected plans</p>
          <div className="space-y-2">
            {["Sintra walk · 13:00 · Outdoor", "Belém riverside · 15:30 · Outdoor"].map((p) => (
              <div key={p} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
                <Umbrella size={14} className="text-amber-600 flex-shrink-0" />
                <span className="text-[13px]">{p}</span>
                <button className="ml-auto text-[12px] font-bold text-[#E07B5A]">Move</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="See indoor alternatives" />
          <SecondaryBtn label="Keep current plan" onClick={onBack} />
        </div>
      </div>
    </Scroll>
  );
}

export function LocalEventSuggestionScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insights" onPress={onBack} /></div>
        <div className="mx-5 h-36 bg-muted rounded-3xl flex items-center justify-center mb-4"><Star size={28} className="text-muted-foreground" /></div>
        <div className="px-5 mb-4">
          <div className="flex items-center gap-2 mb-1"><SuggestedBadge /><span className="text-[11px] text-muted-foreground">Local event · Matches your interests</span></div>
          <h1 className="text-[22px] font-bold">Fado Night at Tasca do Chico</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Fri 27 Jun · 21:30 · Alfama, Lisbon</p>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Venue", value: "Tasca do Chico, Alfama" },
            { label: "Distance", value: "12 min walk from hotel" },
            { label: "Tickets", value: "Required · ~€15" },
            { label: "Duration", value: "~2 hours" },
            { label: "Source", value: "visitlisboa.com" },
          ].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Add to Journey" onClick={onAdd} />
          <SecondaryBtn label="Add as optional" onClick={onAdd} />
          <button className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl h-11 text-[13px] font-semibold"><Globe size={14} />Open ticket provider</button>
          <button className="w-full text-[13px] text-muted-foreground font-medium">Not interested</button>
        </div>
      </div>
    </Scroll>
  );
}

export function MissingEssentialScreen({ onBack }: { onBack: () => void }) {
  const items = [
    { icon: <Hotel size={15} />, title: "No accommodation on Thu 2 Jul", why: "You have confirmed transport to Porto but no stay", date: "Thu 2 Jul", action: "Find stay", sev: "high" },
    { icon: <FileText size={15} />, title: "Entry requirements not reviewed", why: "Portugal → UK re-entry — check visa requirements", date: "5 Jul", action: "Review", sev: "medium" },
    { icon: <CloudOff size={15} />, title: "Documents not downloaded offline", why: "Train ticket and boarding pass not available offline", date: "Before travel", action: "Download", sev: "low" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insights" onBack={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[22px] font-bold">Missing essentials</h1></div>
        <div className="px-5 space-y-3">
          {items.map((item) => (
            <div key={item.title} className={cn("border rounded-3xl p-4 shadow-sm", item.sev === "high" ? "bg-red-50 border-red-200" : item.sev === "medium" ? "bg-amber-50 border-amber-200" : "bg-card border-border")}>
              <div className="flex items-start gap-3 mb-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", item.sev === "high" ? "bg-red-100 text-red-600" : item.sev === "medium" ? "bg-amber-100 text-amber-600" : "bg-muted text-muted-foreground")}>{item.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-[14px] leading-tight">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.why}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 h-8 bg-[#1C2B3A] text-white rounded-xl text-[12px] font-semibold">{item.action}</button>
                <button className="px-4 h-8 border border-border bg-card rounded-xl text-[12px] font-medium">Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}
