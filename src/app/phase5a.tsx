import { useState } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Shield, RefreshCw, Globe, Copy, Trash2,
  X, Check, Info, Download, ChevronDown, Pencil,
  FileText, Star, Lock, Eye, EyeOff, Share2,
  ArrowLeftRight, Package, CreditCard, Wallet, Receipt,
  DollarSign, Tag, Users, ExternalLink, Filter, Heart,
  MoreHorizontal, Phone,
} from "lucide-react";
import {
  Screen, cn, Scroll, BackBtn, PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

// ─── Phase 5 Shared ───────────────────────────────────────────────────────────

type ExpenseStatus = "paid" | "pending" | "refunded" | "disputed" | "estimated";
const STATUS_CFG: Record<ExpenseStatus, { label: string; cls: string }> = {
  paid:      { label: "Paid",      cls: "bg-emerald-50 text-emerald-700" },
  pending:   { label: "Pending",   cls: "bg-amber-50 text-amber-700" },
  refunded:  { label: "Refunded",  cls: "bg-sky-50 text-sky-700" },
  disputed:  { label: "Disputed",  cls: "bg-red-50 text-red-700" },
  estimated: { label: "Estimated", cls: "bg-muted text-muted-foreground" },
};
function ExpenseBadge({ status }: { status: ExpenseStatus }) {
  const s = STATUS_CFG[status];
  return <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest", s.cls)}>{s.label}</span>;
}
function MaskedNumber({ value }: { value: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[13px] font-mono font-semibold">{show ? value : "•••• " + value.slice(-4)}</span>
      <button onClick={() => setShow(v => !v)} className="text-muted-foreground">
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
  );
}
function AffiliateLabel() {
  return <span className="text-[9px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase tracking-widest">Affiliate</span>;
}
function PriceFreshness({ time }: { time: string }) {
  return <p className="text-[10px] text-muted-foreground">Price checked {time}</p>;
}
const EXPENSE_CATS = [
  { id: "flights",    label: "Flights",    icon: <Plane size={14} />,          color: "bg-sky-50 text-sky-600" },
  { id: "stays",      label: "Stays",      icon: <Hotel size={14} />,           color: "bg-amber-50 text-amber-600" },
  { id: "transport",  label: "Transport",  icon: <Train size={14} />,           color: "bg-emerald-50 text-emerald-600" },
  { id: "food",       label: "Food",       icon: <UtensilsCrossed size={14} />, color: "bg-red-50 text-red-500" },
  { id: "activities", label: "Activities", icon: <Star size={14} />,            color: "bg-purple-50 text-purple-600" },
  { id: "shopping",   label: "Shopping",   icon: <Tag size={14} />,             color: "bg-pink-50 text-pink-600" },
  { id: "fees",       label: "Fees",       icon: <DollarSign size={14} />,      color: "bg-slate-50 text-slate-600" },
  { id: "insurance",  label: "Insurance",  icon: <Shield size={14} />,          color: "bg-teal-50 text-teal-600" },
  { id: "other",      label: "Other",      icon: <Package size={14} />,         color: "bg-muted text-muted-foreground" },
];

// ─── 1. Travel Wallet Home ────────────────────────────────────────────────────

export function WalletHomeScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const [locked, setLocked] = useState(false);
  if (locked) return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center bg-[#1C2B3A]" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6"><Lock size={36} className="text-white" /></div>
      <h2 className="text-[22px] font-bold text-white mb-2">Wallet is locked</h2>
      <p className="text-white/60 text-[13px] mb-10">Use Face ID or your device passcode.</p>
      <button onClick={() => setLocked(false)} className="w-full h-[52px] bg-[#E07B5A] text-white rounded-2xl font-bold text-[15px] mb-3">Unlock with Face ID</button>
      <button onClick={onBack} className="text-white/50 text-[13px] font-medium">Cancel</button>
    </div>
  );
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Settings" onPress={onBack} />
          <div className="flex items-center gap-3">
            <button onClick={() => setLocked(true)}><Lock size={18} className="text-muted-foreground" /></button>
            <button onClick={() => onNav("add-payment-method")} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center"><Plus size={16} className="text-white" strokeWidth={2.5} /></button>
          </div>
        </div>
        <div className="px-5 pb-4">
          <h1 className="text-[26px] font-bold">Travel Wallet</h1>
          <div className="flex items-center gap-1.5 mt-0.5"><Shield size={12} className="text-emerald-500" /><span className="text-[11px] text-emerald-700 font-medium">Protected with Face ID</span></div>
        </div>
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 shadow-lg text-white">
          <p className="text-white/50 text-[11px] font-medium">Lisbon & Porto · Upcoming spend</p>
          <p className="text-[36px] font-bold leading-none mt-1">€ 1,240</p>
          <p className="text-white/50 text-[12px] mt-0.5">Confirmed + planned · 27 Jun – 5 Jul</p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => onNav("journey-expenses")} className="flex-1 h-9 bg-white/10 rounded-xl text-[12px] font-semibold">Expenses</button>
            <button onClick={() => onNav("refund-tracker")} className="flex-1 h-9 bg-white/10 rounded-xl text-[12px] font-semibold">Refunds</button>
          </div>
        </div>
        <div className="px-5 mb-2 flex items-center justify-between"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Payment methods</p><button onClick={() => onNav("payment-methods")} className="text-[12px] font-bold text-[#E07B5A]">See all</button></div>
        <div onClick={() => onNav("payment-methods")} className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm cursor-pointer active:opacity-80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1C2B3A] flex items-center justify-center"><CreditCard size={18} className="text-white" /></div>
            <div className="flex-1"><MaskedNumber value="4242 4242 4242 4242" /><p className="text-[11px] text-muted-foreground">Visa · Expires 09/27 · Default</p></div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">No FX fee</span>
          </div>
        </div>
        <div className="px-5 mb-2 flex items-center justify-between"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Travel credits</p><button onClick={() => onNav("travel-passes-credits")} className="text-[12px] font-bold text-[#E07B5A]">See all</button></div>
        <div className="mx-5 space-y-2 mb-4">
          {[{ label: "TAP Air Portugal credit", value: "€85.00", expiry: "Expires 31 Dec 2026" }, { label: "Priority Pass · Lounge", value: "2 visits", expiry: "Expires 28 Feb 2027" }].map(c => (
            <div key={c.label} onClick={() => onNav("travel-credit-detail")} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center"><Wallet size={15} className="text-[#E07B5A]" /></div>
              <div className="flex-1"><p className="text-[13px] font-semibold">{c.label}</p><p className="text-[11px] text-muted-foreground">{c.expiry}</p></div>
              <p className="text-[14px] font-bold">{c.value}</p>
            </div>
          ))}
        </div>
        <div onClick={() => onNav("refund-tracker")} className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer shadow-sm">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
          <div className="flex-1"><p className="text-[13px] font-semibold text-amber-900">1 refund processing</p><p className="text-[11px] text-amber-700">TAP TP791 · €285.00</p></div>
          <ChevronRight size={14} className="text-amber-500" />
        </div>
      </div>
    </Scroll>
  );
}

// ─── 2. Payment Methods ───────────────────────────────────────────────────────

export function PaymentMethodsScreen({ onBack, onAdd }: { onBack: () => void; onAdd: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Wallet" onPress={onBack} /><button onClick={onAdd} className="text-[#E07B5A] font-bold text-[14px]">Add card</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Payment methods</h1></div>
        <div className="px-5 mb-4 space-y-3">
          {[{ brand: "Visa", last4: "4242", expiry: "09/27", fxFee: false, isDefault: true }, { brand: "Mastercard", last4: "8391", expiry: "04/26", fxFee: true, isDefault: false }].map(card => (
            <div key={card.last4} className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1C2B3A] flex items-center justify-center"><CreditCard size={18} className="text-white" /></div>
                  <div><div className="flex items-center gap-2"><p className="font-bold text-[15px]">{card.brand}</p>{card.isDefault && <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Default</span>}</div><MaskedNumber value={`•••• •••• •••• ${card.last4}`} /></div>
                </div>
                <button><MoreHorizontal size={18} className="text-muted-foreground" /></button>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <span>Expires {card.expiry}</span><span>·</span>
                <span className={card.fxFee ? "text-amber-700 font-medium" : "text-emerald-700 font-medium"}>{card.fxFee ? "FX fees apply" : "No FX fee"}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-5 bg-muted rounded-2xl p-3.5 mb-4"><div className="flex items-start gap-2"><Shield size={13} className="text-muted-foreground mt-0.5" /><p className="text-[11px] text-muted-foreground leading-relaxed">Card details are stored securely through our payment provider. Onward does not store full card numbers.</p></div></div>
        <div className="mx-5"><PrimaryBtn label="Add payment method" onClick={onAdd} /></div>
      </div>
    </Scroll>
  );
}

// ─── 3. Add Payment Method ────────────────────────────────────────────────────

export function AddPaymentMethodScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [isDefault, setIsDefault] = useState(false);
  const [faceId, setFaceId] = useState(true);
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Add card</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 mb-4 space-y-3">
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Cardholder name</label><input className={fieldCls} placeholder="As it appears on the card" /></div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Card number</label><div className="bg-muted rounded-2xl px-4 py-3.5 flex items-center gap-3"><CreditCard size={18} className="text-muted-foreground" /><input className="flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-muted-foreground/50" placeholder="•••• •••• •••• ••••" /></div></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Expiry</label><input className={fieldCls} placeholder="MM / YY" /></div>
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">CVC</label><input className={fieldCls} placeholder="CVC" /></div>
          </div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Billing country</label><select className={cn(fieldCls, "appearance-none")}><option>United Kingdom</option><option>United States</option><option>Portugal</option></select></div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Set as default travel card", value: isDefault, set: setIsDefault }, { label: "Require Face ID to view details", value: faceId, set: setFaceId }].map((row, i) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i === 0 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button onClick={() => row.set(!row.value)} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", row.value ? "bg-[#1C2B3A]" : "bg-muted")}><div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", row.value ? "left-6" : "left-1")} /></button>
            </div>
          ))}
        </div>
        <div className="mx-5 bg-muted rounded-2xl p-3.5"><div className="flex items-start gap-2"><Shield size={13} className="text-muted-foreground mt-0.5" /><p className="text-[11px] text-muted-foreground leading-relaxed">Card entry is handled by a PCI-compliant payment provider.</p></div></div>
      </div>
    </Scroll>
  );
}

// ─── 4. Travel Passes & Credits ───────────────────────────────────────────────

export function TravelPassesCreditsScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const [filter, setFilter] = useState("all");
  const items = [
    { label: "TAP Air Portugal credit", value: "€85.00", expiry: "31 Dec 2026", expiring: false },
    { label: "Priority Pass · Lounge", value: "2 visits", expiry: "28 Feb 2027", expiring: false },
    { label: "Interrail Global Pass", value: "4 days remaining", expiry: "31 Jul 2026", expiring: true },
  ];
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Wallet" onPress={onBack} /><button className="text-[#E07B5A] font-bold text-[14px]">Add</button></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Passes & credits</h1></div>
        {items.some(i => i.expiring) && <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2.5"><AlertCircle size={14} className="text-amber-600" /><p className="text-[12px] text-amber-800 font-semibold">Interrail pass expires in 31 days</p></div>}
        <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["All", "Airline", "Rail", "Lounge"].map(f => <button key={f} onClick={() => setFilter(f.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0", filter === f.toLowerCase() ? "bg-[#1C2B3A] text-white" : "bg-muted text-muted-foreground")}>{f}</button>)}
        </div>
        <div className="px-5 space-y-2">
          {items.map(item => (
            <div key={item.label} onClick={onItem} className={cn("bg-card border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm", item.expiring ? "border-amber-200" : "border-border")}>
              <div className="w-9 h-9 rounded-xl bg-[#E07B5A]/10 flex items-center justify-center"><Wallet size={16} className="text-[#E07B5A]" /></div>
              <div className="flex-1"><p className="font-semibold text-[14px]">{item.label}</p><p className="text-[11px] text-muted-foreground">Expires: {item.expiry}</p></div>
              <div className="text-right"><p className="font-bold text-[14px]">{item.value}</p>{item.expiring && <span className="text-[10px] font-bold text-amber-700">Expiring</span>}</div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── 5. Travel Credit Detail ──────────────────────────────────────────────────

export function TravelCreditDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Passes" onPress={onBack} /><button><Pencil size={18} className="text-muted-foreground" /></button></div>
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/50 text-[12px] mb-1">TAP Air Portugal</p>
          <p className="text-[36px] font-bold leading-none">€ 85.00</p>
          <p className="text-white/50 text-[12px] mt-0.5">Airline credit · Original: €285.00</p>
          <div className="mt-4 pt-4 border-t border-white/10"><div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-[#E07B5A] rounded-full" style={{ width: "30%" }} /></div><p className="text-white/40 text-[11px] mt-1">€85 remaining of €285</p></div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Provider", value: "TAP Air Portugal" }, { label: "Type", value: "Airline credit — cancellation" }, { label: "Expiry", value: "31 December 2026" }, { label: "Eligible for", value: "TAP flights, upgrades" }].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className="text-[13px] font-semibold">{row.value}</span></div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><ExternalLink size={15} className="text-muted-foreground" />Open TAP website<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Remove</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 6. Refund Tracker ────────────────────────────────────────────────────────

export function RefundTrackerScreen({ onBack, onItem, onAdd }: { onBack: () => void; onItem: () => void; onAdd: () => void }) {
  const refunds = [
    { title: "TP791 Porto → London", provider: "TAP Air Portugal", amount: "€285.00", status: "processing", date: "Requested 28 Jun" },
    { title: "Hotel cancellation", provider: "The Yeatman Hotel", amount: "€120.00", status: "refunded", date: "Received 22 Jun" },
    { title: "Activity booking", provider: "Viator", amount: "€45.00", status: "disputed", date: "Requested 15 Jun" },
  ];
  const statusColor: Record<string, string> = { processing: "bg-amber-50 text-amber-700", refunded: "bg-emerald-50 text-emerald-700", disputed: "bg-red-50 text-red-700" };
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Wallet" onPress={onBack} /><button onClick={onAdd} className="text-[#E07B5A] font-bold text-[14px]">Track refund</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Refund Tracker</h1></div>
        <div className="px-5 space-y-3">
          {refunds.map(r => (
            <div key={r.title} onClick={onItem} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1"><p className="font-semibold text-[14px]">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.provider}</p></div>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest", statusColor[r.status])}>{r.status}</span>
              </div>
              <div className="flex items-center justify-between"><p className="text-[11px] text-muted-foreground">{r.date}</p><p className="font-bold text-[16px]">{r.amount}</p></div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── 7. Refund Detail ─────────────────────────────────────────────────────────

export function RefundDetailScreen({ onBack }: { onBack: () => void }) {
  const steps = [{ label: "Refund requested", date: "28 Jun", done: true }, { label: "Acknowledged by TAP", date: "29 Jun", done: true }, { label: "Processing", date: "Expected 5–7 days", done: false }, { label: "Refund received", date: "Expected 7–10 Jul", done: false }];
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Tracker" onPress={onBack} /></div>
        <div className="px-5 pb-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 uppercase tracking-widest">Processing</span><h1 className="text-[22px] font-bold mt-2">TP791 Porto → London</h1><p className="text-muted-foreground text-[13px]">TAP Air Portugal</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Original charge", value: "€285.00" }, { label: "Expected refund", value: "€285.00" }, { label: "Received", value: "€0.00" }, { label: "Refund method", value: "Original payment card" }, { label: "Reference", value: "REF-TAP-2026-4419" }].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className="text-[13px] font-semibold">{row.value}</span></div>
          ))}
        </div>
        <div className="px-5 mb-4 relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-border" />
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-3 mb-3">
              <div className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 relative z-10 bg-card", step.done ? "border-emerald-500" : "border-muted-foreground/30")}>
                {step.done ? <Check size={14} className="text-emerald-500" strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
              </div>
              <div className="pt-2.5"><p className={cn("text-[13px] font-semibold", !step.done && "text-muted-foreground")}>{step.label}</p><p className="text-[11px] text-muted-foreground">{step.date}</p></div>
            </div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><Phone size={15} className="text-muted-foreground" />Contact TAP Air Portugal<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Update status</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 8. Add Refund ────────────────────────────────────────────────────────────

export function AddRefundScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#1C2B3A]/20 transition-all placeholder:text-muted-foreground/50";
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Track refund</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 space-y-3 mt-2">
          {[{ label: "Journey", placeholder: "Lisbon & Porto" }, { label: "Related reservation", placeholder: "e.g. TP791 Porto → London" }, { label: "Provider", placeholder: "e.g. TAP Air Portugal" }, { label: "Original amount", placeholder: "€ 0.00" }, { label: "Expected refund", placeholder: "€ 0.00" }, { label: "Reference number", placeholder: "Provider reference" }].map(f => (
            <div key={f.label}><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label><input className={fieldCls} placeholder={f.placeholder} /></div>
          ))}
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Request date</label><input type="date" className={fieldCls} /></div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label><textarea className={cn(fieldCls, "resize-none h-16")} placeholder="Any notes…" /></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 9. Journey Expenses Home ─────────────────────────────────────────────────

export function JourneyExpensesScreen({ onBack, onAdd, onNav }: { onBack: () => void; onAdd: () => void; onNav: (s: Screen) => void }) {
  const categories = [
    { cat: "Flights", spent: 820, budget: 900, color: "bg-sky-500" },
    { cat: "Stays", spent: 340, budget: 400, color: "bg-amber-500" },
    { cat: "Transport", spent: 45, budget: 100, color: "bg-emerald-500" },
    { cat: "Food", spent: 89, budget: 150, color: "bg-red-500" },
    { cat: "Activities", spent: 35, budget: 100, color: "bg-purple-500" },
  ];
  const total = categories.reduce((s, c) => s + c.spent, 0);
  const budgetTotal = categories.reduce((s, c) => s + c.budget, 0);
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <div className="flex items-center gap-3"><button onClick={() => onNav("receipt-scanner")}><Receipt size={18} className="text-muted-foreground" /></button><button onClick={onAdd} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center"><Plus size={16} className="text-white" strokeWidth={2.5} /></button></div>
        </div>
        <div className="px-5 pb-4"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Lisbon & Porto</p><h1 className="text-[26px] font-bold">Expenses</h1></div>
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/50 text-[12px]">Total spent · EUR</p>
          <p className="text-[44px] font-bold leading-none mt-0.5">€ {total.toLocaleString()}</p>
          <div className="flex items-center gap-4 mt-3">
            <div><p className="text-white/40 text-[10px]">Budget</p><p className="text-white font-semibold text-[13px]">€{budgetTotal.toLocaleString()}</p></div>
            <div><p className="text-white/40 text-[10px]">Remaining</p><p className="text-emerald-300 font-semibold text-[13px]">€{budgetTotal - total}</p></div>
            <div><p className="text-white/40 text-[10px]">Refunded</p><p className="text-sky-300 font-semibold text-[13px]">€120</p></div>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mt-3"><div className="h-full bg-[#E07B5A] rounded-full" style={{ width: `${(total / budgetTotal) * 100}%` }} /></div>
        </div>
        <div className="px-5 mb-2 flex items-center justify-between"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">By category</p><button onClick={() => onNav("journey-budget-expenses")} className="text-[12px] font-bold text-[#E07B5A]">Budget →</button></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {categories.map((cat, i) => (
            <div key={cat.cat} className={cn("flex items-center gap-3 px-5 py-3.5", i < categories.length - 1 && "border-b border-border")}>
              <div className={cn("w-2 h-8 rounded-full flex-shrink-0", cat.color)} />
              <div className="flex-1"><div className="flex justify-between mb-1"><p className="text-[13px] font-semibold">{cat.cat}</p><p className="text-[13px] font-bold">€{cat.spent}</p></div><div className="w-full h-1 bg-muted rounded-full overflow-hidden"><div className={cn("h-full rounded-full", cat.color)} style={{ width: `${(cat.spent / cat.budget) * 100}%` }} /></div></div>
            </div>
          ))}
        </div>
        <div className="px-5 grid grid-cols-3 gap-2">
          {[{ label: "Shared", icon: <Users size={16} />, screen: "group-expense-summary" as Screen }, { label: "Report", icon: <FileText size={16} />, screen: "expense-report-builder" as Screen }, { label: "Export", icon: <Download size={16} />, screen: "export-journey-data" as Screen }].map(a => (
            <button key={a.label} onClick={() => onNav(a.screen)} className="flex flex-col items-center gap-1.5 bg-card border border-border rounded-2xl py-3 active:opacity-70 shadow-sm"><span className="text-muted-foreground">{a.icon}</span><span className="text-[11px] font-semibold">{a.label}</span></button>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── 10. Add Expense ──────────────────────────────────────────────────────────

export function AddExpenseScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [amount, setAmount] = useState("");
  const [selectedCat, setSelectedCat] = useState("food");
  const [split, setSplit] = useState(false);
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Add expense</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 py-4 flex flex-col items-center border-b border-border mb-4">
          <p className="text-[13px] text-muted-foreground mb-2">EUR</p>
          <div className="flex items-baseline gap-2"><span className="text-[32px] font-bold text-muted-foreground">€</span><input className="text-[52px] font-bold leading-none outline-none bg-transparent w-48 text-center" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} type="decimal" /></div>
          <button className="text-[12px] text-[#E07B5A] font-semibold mt-2">Change currency</button>
        </div>
        <div className="px-5 space-y-3">
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Merchant</label><input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" placeholder="Where did you spend?" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Date</label><input type="date" className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="2026-06-30" /></div>
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Paid by</label><select className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none appearance-none"><option>Sarah Chen</option><option>James Chen</option></select></div>
          </div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2 block">Category</label><div className="grid grid-cols-3 gap-1.5">{EXPENSE_CATS.slice(0, 9).map(cat => (<button key={cat.id} onClick={() => setSelectedCat(cat.id)} className={cn("flex flex-col items-center gap-1 py-2.5 rounded-2xl border-2 text-[10px] font-semibold transition-all", selectedCat === cat.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card text-muted-foreground")}><span className={selectedCat === cat.id ? "text-[#1C2B3A]" : "text-muted-foreground"}>{cat.icon}</span>{cat.label}</button>))}</div></div>
          <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between"><div><p className="text-[14px] font-semibold">Split with others</p><p className="text-[11px] text-muted-foreground">Divide between Journey members</p></div><button onClick={() => setSplit(v => !v)} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", split ? "bg-[#1C2B3A]" : "bg-muted")}><div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", split ? "left-6" : "left-1")} /></button></div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Notes</label><textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] outline-none resize-none h-16 placeholder:text-muted-foreground/50" placeholder="Optional notes…" /></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 11. Expense Detail ───────────────────────────────────────────────────────

export function ExpenseDetailScreen({ onBack, onEdit, onNav }: { onBack: () => void; onEdit: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between"><BackBtn label="Expenses" onPress={onBack} /><button onClick={onEdit}><Pencil size={18} className="text-muted-foreground" /></button></div>
        <div className="px-5 pt-3 pb-4"><div className="flex items-center gap-2 mb-1"><ExpenseBadge status="paid" /></div><p className="text-[36px] font-bold leading-none">€ 68.40</p><p className="text-muted-foreground text-[13px] mt-0.5">Taberna da Rua das Flores · 30 Jun 2026</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Category", value: "Food" }, { label: "Journey", value: "Lisbon & Porto" }, { label: "Paid by", value: "Sarah Chen" }, { label: "Payment method", value: "Visa ••••4242" }, { label: "Split", value: "Equally · 2 people" }, { label: "Each owes", value: "€34.20" }].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className="text-[13px] font-semibold">{row.value}</span></div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          {[{ label: "Split expense", screen: "split-expense" as Screen, icon: <Users size={15} /> }, { label: "Track a refund", screen: "add-refund" as Screen, icon: <Receipt size={15} /> }].map(a => (
            <button key={a.label} onClick={() => onNav(a.screen)} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70 shadow-sm"><span className="text-muted-foreground">{a.icon}</span>{a.label}<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          ))}
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Delete expense</button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 12. Edit Expense ─────────────────────────────────────────────────────────

export function EditExpenseScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Edit expense</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-2.5"><AlertCircle size={13} className="text-amber-600 mt-0.5 flex-shrink-0" /><p className="text-[12px] text-amber-800 leading-relaxed">Changing the payer or split will update shared balances for all Journey members.</p></div>
        <div className="px-5 space-y-3">
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Amount</label><div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-3.5"><span className="text-[15px] font-bold text-muted-foreground">€</span><input className="flex-1 bg-transparent text-[22px] font-bold outline-none" defaultValue="68.40" /><span className="text-[13px] text-muted-foreground">EUR</span></div></div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Merchant</label><input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="Taberna da Rua das Flores" /></div>
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Date</label><input type="date" className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="2026-06-30" /></div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── 13. Receipt Scanner ──────────────────────────────────────────────────────

export function ReceiptScannerScreen({ onBack, onCapture }: { onBack: () => void; onCapture: () => void }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-white/70"><X size={22} /></button><p className="text-white font-semibold">Scan Receipt</p><button className="text-white/70 text-[13px] font-medium">Import</button></div>
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-64 h-96 relative">
          <div className="absolute inset-0 rounded-2xl border-2 border-[#E07B5A]/70" />
          {[0,1,2,3].map(i => (<div key={i} className={cn("absolute w-6 h-6 border-[#E07B5A]", i===0&&"top-0 left-0 border-t-2 border-l-2 rounded-tl-lg", i===1&&"top-0 right-0 border-t-2 border-r-2 rounded-tr-lg", i===2&&"bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg", i===3&&"bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg")} />))}
          <div className="absolute inset-0 flex items-center justify-center"><p className="text-white/50 text-[13px] text-center">Position receipt within frame</p></div>
        </div>
      </div>
      <div className="flex-shrink-0 px-5 pb-10 flex items-center justify-center">
        <button onClick={onCapture} className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg"><div className="w-16 h-16 rounded-full border-4 border-black bg-white" /></button>
      </div>
    </div>
  );
}

// ─── 14. Receipt Review ───────────────────────────────────────────────────────

export function ReceiptReviewScreen({ onBack, onSave, onNav }: { onBack: () => void; onSave: () => void; onNav: (s: Screen) => void }) {
  const detected = [{ label: "Merchant", value: "Taberna da Rua das Flores", ok: true }, { label: "Date", value: "30 Jun 2026", ok: true }, { label: "Total", value: "€68.40", ok: true }, { label: "Currency", value: "EUR", ok: true }, { label: "Category", value: "Food (suggested)", ok: true }, { label: "Tax", value: "Not detected", ok: false }];
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Retake</button><h2 className="text-[17px] font-bold">Review receipt</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="mx-5 h-44 bg-muted rounded-3xl flex items-center justify-center mb-4 border border-border"><Receipt size={40} className="text-muted-foreground" /></div>
        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4 flex items-start gap-2.5"><AlertCircle size={13} className="text-amber-600 mt-0.5 flex-shrink-0" /><p className="text-[12px] text-amber-800 leading-relaxed">Always verify extracted information. Automated extraction may not be accurate.</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {detected.map((row, i) => (<div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5", i < detected.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><div className="flex items-center gap-2"><span className={cn("text-[13px] font-semibold", !row.ok && "text-muted-foreground")}>{row.value}</span>{row.ok ? <Check size={13} className="text-emerald-500" /> : <AlertCircle size={13} className="text-amber-500" />}</div></div>))}
        </div>
        <div className="mx-5 space-y-2"><PrimaryBtn label="Create expense from receipt" onClick={() => onNav("add-expense")} /><SecondaryBtn label="Save receipt only" onClick={onSave} /></div>
      </div>
    </Scroll>
  );
}

// ─── 15. Expense Categories ───────────────────────────────────────────────────

export function ExpenseCategoriesScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold text-[14px]">Add</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Expense categories</h1></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {EXPENSE_CATS.map((cat, i) => (<div key={cat.id} className={cn("flex items-center gap-3 px-5 py-3.5 cursor-pointer active:bg-muted/30", i < EXPENSE_CATS.length - 1 && "border-b border-border")}><div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", cat.color)}>{cat.icon}</div><p className="text-[14px] font-semibold flex-1">{cat.label}</p><ChevronRight size={14} className="text-muted-foreground" /></div>))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── 16–20: Budget, Currency ──────────────────────────────────────────────────

export function JourneyBudgetExpensesScreen({ onBack, onEdit }: { onBack: () => void; onEdit: () => void }) {
  const spent = 1329, budget = 1650, pct = (spent / budget) * 100;
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Expenses" onPress={onBack} /><button onClick={onEdit} className="text-[#E07B5A] font-bold text-[14px]">Edit budget</button></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Budget</h1><p className="text-[12px] text-muted-foreground">Lisbon & Porto</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-end justify-between mb-3"><div><p className="text-[12px] text-muted-foreground">Spent</p><p className="text-[36px] font-bold leading-none">€{spent.toLocaleString()}</p></div><div className="text-right"><p className="text-[12px] text-muted-foreground">Budget</p><p className="text-[20px] font-bold text-muted-foreground">€{budget.toLocaleString()}</p></div></div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-1"><div className={cn("h-full rounded-full transition-all", pct > 90 ? "bg-red-500" : pct > 75 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${pct}%` }} /></div>
          <p className="text-[12px] text-muted-foreground">€{budget - spent} remaining · €{Math.round(spent / 4)}/day avg</p>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {EXPENSE_CATS.slice(0, 5).map((cat, i, arr) => {
            const s = [820,340,45,89,35][i], b = [900,400,100,150,100][i];
            return (<div key={cat.id} className={cn("flex items-center gap-3 px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><div className={cn("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0", cat.color)}>{cat.icon}</div><div className="flex-1"><div className="flex justify-between mb-1"><p className="text-[13px] font-semibold">{cat.label}</p><p className="text-[13px] font-bold">€{s} / €{b}</p></div><div className="w-full h-1 bg-muted rounded-full overflow-hidden"><div className={cn("h-full rounded-full", s > b ? "bg-red-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, (s/b)*100)}%` }} /></div></div></div>);
          })}
        </div>
      </div>
    </Scroll>
  );
}

export function EditJourneyBudgetScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [total, setTotal] = useState(1650);
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Edit budget</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 mb-4"><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Total Journey budget</label><div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-3.5"><span className="text-[18px] font-bold text-muted-foreground">€</span><input className="flex-1 bg-transparent text-[28px] font-bold outline-none" value={total} onChange={e => setTotal(+e.target.value)} type="number" /><span className="text-[13px] text-muted-foreground">EUR</span></div></div>
        <div className="px-5 mb-4"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Category allocations</p><div className="space-y-2">{EXPENSE_CATS.slice(0, 5).map(cat => (<div key={cat.id} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3"><div className={cn("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0", cat.color)}>{cat.icon}</div><span className="flex-1 text-[14px] font-medium">{cat.label}</span><input className="w-24 bg-muted rounded-xl px-3 py-2 text-[14px] font-bold text-right outline-none" defaultValue="€400" /></div>))}</div></div>
      </div>
    </Scroll>
  );
}

export function BudgetCategoryDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Budget" onPress={onBack} /></div>
        <div className="px-5 pb-4"><div className="flex items-center gap-3 mb-1"><div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center"><UtensilsCrossed size={18} className="text-red-500" /></div><h1 className="text-[24px] font-bold">Food</h1></div></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-end justify-between mb-3"><div><p className="text-[12px] text-muted-foreground">Spent</p><p className="text-[32px] font-bold">€89</p></div><div className="text-right"><p className="text-[12px] text-muted-foreground">Budget</p><p className="text-[20px] font-bold text-muted-foreground">€150</p></div></div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: "59%" }} /></div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">€61 remaining</p>
        </div>
        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Expenses</p></div>
        {[{ merchant: "Taberna da Rua das Flores", date: "30 Jun", amount: "€68.40" }, { merchant: "Café A Brasileira", date: "29 Jun", amount: "€12.50" }, { merchant: "LX Factory food stall", date: "28 Jun", amount: "€8.20" }].map(e => (
          <div key={e.merchant} className="mx-5 mb-2 bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm"><UtensilsCrossed size={14} className="text-red-500 flex-shrink-0" /><div className="flex-1"><p className="text-[13px] font-semibold">{e.merchant}</p><p className="text-[11px] text-muted-foreground">{e.date}</p></div><p className="font-bold text-[13px]">{e.amount}</p></div>
        ))}
      </div>
    </Scroll>
  );
}

export function CurrencyConversionScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("GBP");
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Expenses" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Currency conversion</h1></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-muted rounded-2xl px-4 py-3"><p className="text-[10px] text-muted-foreground">{from}</p><input className="text-[28px] font-bold bg-transparent outline-none w-full" value={amount} onChange={e => setAmount(e.target.value)} /></div>
            <button onClick={() => { setFrom(to); setTo(from); }} className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0"><ArrowLeftRight size={16} className="text-muted-foreground" /></button>
            <div className="flex-1 bg-muted rounded-2xl px-4 py-3"><p className="text-[10px] text-muted-foreground">{to}</p><p className="text-[28px] font-bold">{(parseFloat(amount || "0") * 0.855).toFixed(2)}</p></div>
          </div>
          <div className="bg-muted rounded-2xl px-4 py-2.5"><p className="text-[12px] text-muted-foreground">1 {from} = 0.8553 {to} · Rate from 30 Jun 2026</p></div>
        </div>
        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5"><p className="text-[11px] text-amber-800 leading-relaxed">Exchange rates are indicative and may differ from your bank's rate.</p></div>
      </div>
    </Scroll>
  );
}

export function ExchangeRateSettingsScreen({ onBack }: { onBack: () => void }) {
  const [rateMethod, setRateMethod] = useState("transaction");
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Exchange rates</h1></div>
        <div className="px-5 mb-5"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Rate method</p>
          {[{ id: "transaction", label: "Use transaction-date rate", sub: "Rate on the day of each expense" }, { id: "latest", label: "Use latest rate", sub: "Current exchange rate for all expenses" }, { id: "manual", label: "Manual rate", sub: "You set the rate yourself" }].map(opt => (
            <button key={opt.id} onClick={() => setRateMethod(opt.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left mb-2 transition-all", rateMethod === opt.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", rateMethod === opt.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>{rateMethod === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}</div>
              <div><p className="font-semibold text-[14px]">{opt.label}</p><p className="text-[12px] text-muted-foreground">{opt.sub}</p></div>
            </button>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── 21–28: Group Expenses ────────────────────────────────────────────────────

export function GroupExpenseSummaryScreen({ onBack, onMember, onSettle, onNav }: { onBack: () => void; onMember: () => void; onSettle: () => void; onNav: (s: Screen) => void }) {
  const members = [{ name: "Sarah Chen", color: "#1C2B3A", initials: "SC", balance: 34.20, owesYou: true, settled: false }, { name: "James Chen", color: "#E07B5A", initials: "JC", balance: 0, owesYou: false, settled: true }, { name: "Priya Patel", color: "#059669", initials: "PP", balance: 22.10, owesYou: false, settled: false }];
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Expenses" onPress={onBack} /><button onClick={() => onNav("add-expense")} className="text-[#E07B5A] font-bold text-[14px]">Add shared</button></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Shared expenses</h1><p className="text-[12px] text-muted-foreground">Lisbon & Porto · 3 members</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <p className="text-[11px] text-muted-foreground mb-1">Total shared spend</p><p className="text-[36px] font-bold leading-none">€ 342.00</p>
          <div className="flex gap-4 mt-3 pt-3 border-t border-border"><div><p className="text-[10px] text-muted-foreground">Owed to you</p><p className="text-[16px] font-bold text-emerald-700">€34.20</p></div><div><p className="text-[10px] text-muted-foreground">You owe</p><p className="text-[16px] font-bold text-red-600">€22.10</p></div><div><p className="text-[10px] text-muted-foreground">Net</p><p className="text-[16px] font-bold text-emerald-700">+€12.10</p></div></div>
        </div>
        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Balances</p></div>
        <div className="px-5 space-y-2 mb-4">
          {members.map(m => (
            <div key={m.name} onClick={onMember} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[12px] flex-shrink-0" style={{ background: m.color }}>{m.initials}</div>
              <div className="flex-1"><p className="font-semibold text-[14px]">{m.name}</p>{m.settled ? <p className="text-[11px] text-emerald-700 font-semibold">Settled ✓</p> : m.owesYou ? <p className="text-[11px] text-emerald-700">{m.name.split(" ")[0]} owes you €{m.balance.toFixed(2)}</p> : <p className="text-[11px] text-red-600">You owe {m.name.split(" ")[0]} €{m.balance.toFixed(2)}</p>}</div>
              {!m.settled && <button onClick={e => { e.stopPropagation(); onSettle(); }} className="text-[11px] font-bold text-[#E07B5A]">Settle</button>}
            </div>
          ))}
        </div>
        <div className="mx-5"><PrimaryBtn label="Settle up" onClick={onSettle} /></div>
      </div>
    </Scroll>
  );
}

export function SplitExpenseScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [method, setMethod] = useState("equally");
  const methods = ["Equally", "Exact amounts", "Percentages", "Shares"];
  const members = [{ name: "Sarah Chen", initials: "SC", color: "#1C2B3A", selected: true }, { name: "James Chen", initials: "JC", color: "#E07B5A", selected: true }, { name: "Priya Patel", initials: "PP", color: "#059669", selected: false }];
  const perPerson = (68.40 / members.filter(m => m.selected).length).toFixed(2);
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Split expense</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="mx-5 bg-muted/50 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between"><p className="font-semibold text-[15px]">Taberna da Rua das Flores</p><p className="font-bold text-[17px]">€68.40</p></div>
        <div className="px-5 mb-4"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Split method</p><div className="grid grid-cols-2 gap-2">{methods.map(m => (<button key={m} onClick={() => setMethod(m.toLowerCase())} className={cn("py-2.5 rounded-2xl text-[13px] font-semibold border-2 transition-all", method === m.toLowerCase() ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>{m}</button>))}</div></div>
        <div className="px-5 mb-4"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Participants</p><div className="space-y-2">{members.map(m => (<div key={m.name} className={cn("flex items-center gap-3 bg-card border-2 rounded-2xl px-4 py-3.5 transition-all", m.selected ? "border-[#1C2B3A]" : "border-border")}><div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0" style={{ background: m.color }}>{m.initials}</div><p className="flex-1 font-semibold text-[14px]">{m.name}</p>{m.selected && <p className="font-bold text-[14px]">€{perPerson}</p>}</div>))}</div></div>
        <div className="mx-5 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center justify-between"><span className="text-[13px] font-semibold text-emerald-800">Total allocated</span><span className="font-bold text-[15px] text-emerald-800">€68.40 ✓</span></div>
      </div>
    </Scroll>
  );
}

export function MemberBalanceDetailScreen({ onBack, onSettle }: { onBack: () => void; onSettle: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Shared" onPress={onBack} /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm flex items-center gap-4"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-[16px] flex-shrink-0" style={{ background: "#059669" }}>PP</div><div><p className="font-bold text-[17px]">Priya Patel</p><p className="text-[14px] text-red-600 font-semibold">You owe Priya €22.10</p></div></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Total shared expenses", value: "€89.40" }, { label: "Priya paid", value: "€89.40" }, { label: "Your share", value: "€44.70" }, { label: "You owe", value: "€22.10" }].map((row, i, arr) => (<div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className={cn("text-[13px] font-bold", row.label === "You owe" && "text-red-600")}>{row.value}</span></div>))}
        </div>
        <div className="mx-5 space-y-2"><PrimaryBtn label="Settle up — €22.10" onClick={onSettle} /><SecondaryBtn label="Send reminder" /></div>
      </div>
    </Scroll>
  );
}

export function SettleUpScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [method, setMethod] = useState("bank");
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Settle up</h2><div className="w-12" /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm"><p className="text-[12px] text-muted-foreground mb-1">You owe Priya Patel</p><p className="text-[44px] font-bold leading-none">€ 22.10</p><p className="text-[12px] text-muted-foreground mt-0.5">EUR · Lisbon & Porto</p></div>
        <div className="px-5 mb-4"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Payment method</p>
          {[{ id: "bank", label: "Bank transfer", sub: "Transfer directly outside Onward" }, { id: "cash", label: "Cash", sub: "Paid in person" }, { id: "link", label: "Share payment link", sub: "Generate a link for Priya to request" }].map(opt => (
            <button key={opt.id} onClick={() => setMethod(opt.id)} className={cn("w-full flex items-start gap-3 rounded-2xl p-4 border-2 text-left mb-2 transition-all", method === opt.id ? "border-[#1C2B3A] bg-card shadow-sm" : "border-border bg-card")}>
              <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center", method === opt.id ? "border-[#1C2B3A]" : "border-muted-foreground/30")}>{method === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C2B3A]" />}</div>
              <div><p className="font-semibold text-[14px]">{opt.label}</p><p className="text-[12px] text-muted-foreground">{opt.sub}</p></div>
            </button>
          ))}
        </div>
        <div className="mx-5 bg-muted rounded-2xl p-3.5 mb-5"><p className="text-[11px] text-muted-foreground leading-relaxed">Onward records this settlement for your shared balance. It does not transfer money on your behalf.</p></div>
        <div className="mx-5"><PrimaryBtn label="Mark as paid" onClick={onConfirm} /></div>
      </div>
    </Scroll>
  );
}

export function SettlementConfirmationScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6"><CheckCircle size={36} className="text-emerald-500" /></div>
        <h2 className="text-[26px] font-bold mb-1">Settlement recorded</h2>
        <p className="text-[14px] text-muted-foreground mb-8">€22.10 marked as paid to Priya Patel</p>
        <div className="w-full bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-6">
          {[{ label: "Amount", value: "€22.10 EUR" }, { label: "From", value: "Sarah Chen" }, { label: "To", value: "Priya Patel" }, { label: "Method", value: "Bank transfer" }, { label: "Date", value: "30 Jun 2026" }].map((row, i, arr) => (<div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className="text-[13px] font-semibold">{row.value}</span></div>))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 w-full"><p className="text-[13px] text-emerald-800 font-semibold">Balance with Priya: Settled ✓</p></div>
      </div>
      <div className="space-y-2.5"><PrimaryBtn label="Done" onClick={onDone} /></div>
    </div>
  );
}

export function PaymentReminderScreen({ onBack, onSend }: { onBack: () => void; onSend: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Send reminder</h2><div className="w-12" /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#E07B5A] flex items-center justify-center text-white font-bold flex-shrink-0">JC</div><div><p className="font-bold text-[15px]">James Chen</p><p className="text-[13px] text-red-600">Owes you €34.20</p></div></div>
        <div className="px-5 space-y-3"><div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Message (optional)</label><textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none h-20 placeholder:text-muted-foreground/50" placeholder="Hey, just a reminder about the shared expenses from Lisbon…" /></div></div>
        <div className="mx-5 mt-4 space-y-2"><PrimaryBtn label="Share payment request" onClick={onSend} /><SecondaryBtn label="Copy reminder" /></div>
      </div>
    </Scroll>
  );
}

export function SettlementHistoryScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const items = [{ member: "Priya Patel", amount: "€22.10", date: "30 Jun", method: "Bank transfer", initials: "PP", color: "#059669" }, { member: "James Chen", amount: "€45.60", date: "28 Jun", method: "Cash", initials: "JC", color: "#E07B5A" }];
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Shared" onPress={onBack} /><button className="text-muted-foreground"><Search size={18} /></button></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Settlement history</h1></div>
        <div className="px-5 space-y-2">
          {items.map(item => (<div key={item.member + item.date} onClick={onItem} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm"><div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0" style={{ background: item.color }}>{item.initials}</div><div className="flex-1"><p className="font-semibold text-[14px]">{item.member}</p><p className="text-[11px] text-muted-foreground">{item.date} · {item.method}</p></div><div className="text-right"><p className="font-bold text-[14px]">{item.amount}</p><span className="text-[10px] font-bold text-emerald-700">Settled</span></div></div>))}
        </div>
      </div>
    </Scroll>
  );
}

export function SplitDisputeScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Expenses" onPress={onBack} /></div>
        <div className="px-5 pb-4"><div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><AlertCircle size={20} className="text-amber-600" /></div><h1 className="text-[22px] font-bold">Split dispute</h1><p className="text-[13px] text-muted-foreground mt-1">Taberna da Rua das Flores · €68.40</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">James Chen's concern</p><p className="text-[13px] text-muted-foreground leading-relaxed">"I didn't order the starter — should be excluded from my share."</p></div>
        <div className="grid grid-cols-2 gap-2 px-5 mb-4"><div className="bg-muted/50 rounded-2xl p-3 border border-border"><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Current split</p><p className="font-bold text-[14px]">€34.20 each</p></div><div className="bg-amber-50 rounded-2xl p-3 border border-amber-200"><p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-2">Proposed</p><p className="font-bold text-[14px]">€40.20 / €28.20</p></div></div>
        <div className="mx-5 space-y-2"><PrimaryBtn label="Accept adjustment" /><SecondaryBtn label="Keep current split" onClick={onBack} /><button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Edit split manually</button></div>
      </div>
    </Scroll>
  );
}

// ─── 29–34: Loyalty ───────────────────────────────────────────────────────────

export function LoyaltyWalletScreen({ onBack, onProgramme, onAdd }: { onBack: () => void; onProgramme: () => void; onAdd: () => void }) {
  const programmes = [{ name: "TAP Miles&Go", tier: "Silver", points: "12,450", expiring: "2,000 pts exp. Jan", color: "#0078D4" }, { name: "Marriott Bonvoy", tier: "Gold", points: "34,200", expiring: null, color: "#C8932A" }, { name: "Comboios CP Club", tier: "Basic", points: "850", expiring: null, color: "#1C2B3A" }];
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Wallet" onPress={onBack} /><button onClick={onAdd} className="w-8 h-8 bg-[#E07B5A] rounded-full flex items-center justify-center"><Plus size={16} className="text-white" strokeWidth={2.5} /></button></div>
        <div className="px-5 pb-5"><h1 className="text-[26px] font-bold">Loyalty Wallet</h1></div>
        {programmes.some(p => p.expiring) && <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2.5"><AlertCircle size={14} className="text-amber-600" /><p className="text-[12px] text-amber-800 font-semibold">TAP Miles&Go: 2,000 points expiring January 2027</p></div>}
        <div className="px-5 space-y-3">
          {programmes.map(p => (
            <div key={p.name} onClick={onProgramme} className="bg-card border border-border rounded-3xl p-5 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0" style={{ background: p.color }}>{p.name[0]}</div><div><p className="font-bold text-[15px]">{p.name}</p><p className="text-[12px] text-muted-foreground">{p.tier} member</p></div></div>
                <div className="text-right"><p className="font-bold text-[18px]">{p.points}</p><p className="text-[10px] text-muted-foreground">points</p></div>
              </div>
              {p.expiring && <div className="flex items-center gap-1.5 bg-amber-50 rounded-xl px-3 py-1.5"><AlertCircle size={11} className="text-amber-600" /><p className="text-[11px] text-amber-700 font-medium">{p.expiring}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function AddLoyaltyProgrammeScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between"><button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button><h2 className="text-[17px] font-bold">Add programme</h2><button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 space-y-3 mt-2">
          <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Provider</label><div className="relative"><input className={cn(fieldCls, "pl-10")} placeholder="Search airlines, hotels, rail…" /><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /></div></div>
          {[{ label: "Programme name", placeholder: "e.g. TAP Miles&Go" }, { label: "Membership number", placeholder: "Your member number" }, { label: "Member name", placeholder: "Name as on account" }, { label: "Points balance", placeholder: "Current points" }].map(f => (<div key={f.label}><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label><input className={fieldCls} placeholder={f.placeholder} /></div>))}
          <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between"><div><p className="text-[14px] font-semibold">Secure membership storage</p><p className="text-[11px] text-muted-foreground">Require Face ID to view number</p></div><div className="w-12 h-7 rounded-full bg-[#1C2B3A] relative"><div className="absolute top-1 left-6 w-5 h-5 rounded-full bg-white shadow-sm" /></div></div>
        </div>
      </div>
    </Scroll>
  );
}

export function LoyaltyProgrammeDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Loyalty" onPress={onBack} /><button><Pencil size={18} className="text-muted-foreground" /></button></div>
        <div className="mx-5 rounded-3xl p-5 mb-4 text-white shadow-lg" style={{ background: "#0078D4" }}>
          <p className="text-white/60 text-[12px]">TAP Air Portugal</p><p className="text-[26px] font-bold">TAP Miles&Go</p>
          <div className="flex items-end justify-between mt-4"><div><p className="text-white/60 text-[11px]">Points balance</p><p className="text-[36px] font-bold leading-none">12,450</p></div><div className="text-right"><p className="text-white/60 text-[11px]">Tier</p><p className="text-[18px] font-bold">Silver</p></div></div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[{ label: "Membership number", value: "TAP-••••-7821" }, { label: "Member", value: "Sarah Chen" }, { label: "Tier", value: "Silver" }, { label: "Expiry", value: "31 Dec 2027" }].map((row, i, arr) => (<div key={row.label} className={cn("flex items-center justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}><span className="text-[13px] text-muted-foreground">{row.label}</span><span className="text-[13px] font-semibold">{row.value}</span></div>))}
        </div>
        <div className="mx-5 space-y-2">
          <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><ExternalLink size={15} className="text-muted-foreground" />Open TAP Miles&Go<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          <button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Remove programme</button>
        </div>
      </div>
    </Scroll>
  );
}

export function LoyaltyMatchSuggestionScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-4"><Star size={22} className="text-sky-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Loyalty match found</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">Your TAP Miles&Go membership may be eligible for miles on this flight.</p>
        <div className="bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"><Plane size={16} className="text-[#1C2B3A]" /></div><div><p className="font-semibold text-[14px]">TP791 Porto → London</p><p className="text-[11px] text-muted-foreground">30 Jun 2026 · TAP Air Portugal</p></div></div>
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[12px]" style={{ background: "#0078D4" }}>T</div><div><p className="font-semibold text-[14px]">TAP Miles&Go</p><p className="text-[12px] text-muted-foreground">TAP-••••-7821</p></div></div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5"><p className="text-[12px] text-sky-800 leading-relaxed">Verify eligibility directly with TAP. Onward cannot guarantee miles will be awarded.</p></div>
      </div>
      <div className="space-y-2.5"><PrimaryBtn label="Add number to reservation" /><SecondaryBtn label="Ignore" onClick={onBack} /><button className="w-full text-[13px] text-muted-foreground font-medium">Never suggest for TAP</button></div>
    </div>
  );
}

export function PointsStatusProgressScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Programme" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[22px] font-bold">Status progress</h1><p className="text-[12px] text-muted-foreground">TAP Miles&Go · Silver</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4"><div><p className="text-[12px] text-muted-foreground">Current tier</p><p className="text-[22px] font-bold">Silver</p></div><div className="text-right"><p className="text-[12px] text-muted-foreground">Next tier</p><p className="text-[22px] font-bold text-[#C8932A]">Gold</p></div></div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2"><div className="h-full rounded-full" style={{ width: "62%", background: "#0078D4" }} /></div>
          <p className="text-[12px] text-muted-foreground">12,450 / 20,000 qualifying points · 7,550 to Gold</p>
        </div>
        <div className="mx-5 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4"><p className="text-[11px] text-amber-800 leading-relaxed">Points and tier calculations are indicative based on information you entered. Verify with TAP Air Portugal directly.</p></div>
        <div className="mx-5"><button className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl h-11 text-[13px] font-semibold"><ExternalLink size={14} />Open TAP Miles&Go</button></div>
      </div>
    </Scroll>
  );
}

export function ExpiringPointsAlertScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4"><AlertCircle size={22} className="text-amber-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Points expiring soon</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">2,000 TAP Miles&Go points will expire on 31 January 2027.</p>
        <div className="bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm"><p className="font-bold text-[15px] mb-0.5">TAP Miles&Go</p><p className="text-[13px] text-muted-foreground">2,000 points · Expires 31 Jan 2027</p></div>
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Potential options</p>
          {["Upgrade on TAP flight · from 1,500 pts", "Use for TAP ancillaries · from 500 pts", "Donate to charity · any amount"].map(o => (<div key={o} className="flex items-center gap-2.5 bg-muted rounded-2xl px-4 py-3"><Check size={13} className="text-emerald-500" /><span className="text-[13px]">{o}</span></div>))}
        </div>
      </div>
      <div className="space-y-2.5"><PrimaryBtn label="Open TAP Miles&Go" /><SecondaryBtn label="Remind me in 30 days" onClick={onBack} /><button className="w-full text-[13px] text-muted-foreground font-medium">Dismiss</button></div>
    </div>
  );
}
