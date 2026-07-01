import { useState } from "react";
import {
  Plane, Train, Hotel, UtensilsCrossed, MapPin, Clock,
  Calendar, ChevronRight, Mail, CheckCircle, AlertCircle,
  Search, Plus, Bell, User, ArrowRight, Shield,
  RefreshCw, MoreHorizontal, Globe, Copy, Trash2,
  X, Check, Info, Download, ChevronDown, Pencil,
  FileText, Star, Lock, Eye, Share2, Send,
  ArrowLeftRight, Package, Settings, CreditCard,
  Wallet, Receipt, DollarSign, TrendingUp, Tag,
  Users, AlertTriangle, ExternalLink, Filter, Heart,
  BarChart2, PieChart, BookOpen,
} from "lucide-react";
import {
  Screen, cn, Scroll, BackBtn, PrimaryBtn, SecondaryBtn, EmptyStateShell,
} from "./screens";

function SponsoredLabel() {
  return <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded uppercase tracking-widest">Sponsored</span>;
}
function AffiliateLabel() {
  return <span className="text-[9px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase tracking-widest">Affiliate</span>;
}
function PriceFreshness({ time }: { time: string }) {
  return <p className="text-[10px] text-muted-foreground">Price checked {time}</p>;
}

// ─── Screen 35: Booking Hub ────────────────────────────────────────────────────

export function BookingHubScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const categories = [
    { label: "Flights", icon: <Plane size={22} />, color: "bg-sky-50 text-sky-600", screen: "search-flights" as Screen },
    { label: "Stays", icon: <Hotel size={22} />, color: "bg-amber-50 text-amber-600", screen: "search-stays" as Screen },
    { label: "Activities", icon: <Star size={22} />, color: "bg-purple-50 text-purple-600", screen: "activity-booking-options" as Screen },
    { label: "Insurance", icon: <Shield size={22} />, color: "bg-teal-50 text-teal-600", screen: "insurance-comparison" as Screen },
    { label: "eSIM", icon: <Globe size={22} />, color: "bg-emerald-50 text-emerald-600", screen: "esim-connectivity" as Screen },
    { label: "Transfers", icon: <Train size={22} />, color: "bg-slate-50 text-slate-600", screen: "airport-transfer-options" as Screen },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journey" onPress={onBack} /></div>
        <div className="px-5 pb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Lisbon & Porto · 27 Jun – 5 Jul</p>
          <h1 className="text-[26px] font-bold">Booking Hub</h1>
        </div>

        {/* Missing essentials */}
        <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5">
          <p className="text-[12px] font-bold text-amber-800 mb-1">Missing from your Journey</p>
          <div className="flex items-center gap-2 mb-1"><X size={11} className="text-amber-600" /><span className="text-[12px] text-amber-800">No travel insurance</span></div>
          <div className="flex items-center gap-2"><X size={11} className="text-amber-600" /><span className="text-[12px] text-amber-800">No eSIM for Portugal</span></div>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Find and book</p>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button key={cat.label} onClick={() => onNav(cat.screen)} className="flex flex-col items-center gap-2 bg-card border border-border rounded-2xl py-4 active:opacity-70 shadow-sm">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", cat.color)}>{cat.icon}</div>
                <span className="text-[12px] font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-muted/50 border border-border rounded-2xl p-3.5 mb-4">
          <div className="flex items-start gap-2">
            <Info size={13} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">Results include affiliate and sponsored options. <button onClick={() => onNav("commercial-transparency")} className="underline">Commercial transparency →</button></p>
          </div>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 36: Search Flights ─────────────────────────────────────────────────

export function SearchFlightsScreen({ onBack, onSearch }: { onBack: () => void; onSearch: () => void }) {
  const [tripType, setTripType] = useState("return");
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Booking Hub" onPress={onBack} />
          <div className="flex gap-1 bg-muted rounded-full p-1">
            {["Return", "One-way"].map((t) => (
              <button key={t} onClick={() => setTripType(t.toLowerCase())} className={cn("px-3 py-1 rounded-full text-[12px] font-semibold transition-all", tripType === t.toLowerCase() ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Search flights</h1></div>

        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">From</label>
            <div className="relative"><input className={cn(fieldCls, "pl-10")} placeholder="Origin airport or city" defaultValue="Porto (OPO)" /><Plane size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /></div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">To</label>
            <div className="relative"><input className={cn(fieldCls, "pl-10")} placeholder="Destination airport or city" defaultValue="London (LHR)" /><MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Depart</label><input type="date" className={fieldCls} defaultValue="2026-07-05" /></div>
            {tripType === "return" && <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Return</label><input type="date" className={fieldCls} /></div>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Travellers</label>
              <select className={cn(fieldCls, "appearance-none")}><option>1 adult</option><option>2 adults</option></select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Cabin</label>
              <select className={cn(fieldCls, "appearance-none")}><option>Economy</option><option>Business</option></select>
            </div>
          </div>
        </div>

        <div className="mx-5"><PrimaryBtn label="Search flights" onClick={onSearch} /></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 37: Flight Search Results ────────────────────────────────────────

export function FlightSearchResultsScreen({ onBack, onFlight, onNav }: { onBack: () => void; onFlight: () => void; onNav: (s: Screen) => void }) {
  const results = [
    { airline: "TAP Air Portugal", flight: "TP791", dep: "18:55", arr: "21:20", dur: "2h 25m", stops: 0, price: "€189", baggage: "1 bag", fare: "Economy Flex", sponsored: false },
    { airline: "Ryanair", flight: "FR7712", dep: "07:00", arr: "09:35", dur: "2h 35m", stops: 0, price: "€54", baggage: "Bag fee", fare: "Basic", sponsored: false },
    { airline: "easyJet", flight: "U28843", dep: "12:45", arr: "15:20", dur: "2h 35m", stops: 0, price: "€89", baggage: "Cabin only", fare: "Standard", sponsored: true },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <BackBtn label="Search" onPress={onBack} />
          <button className="text-muted-foreground"><Filter size={18} /></button>
        </div>
        <p className="font-bold text-[15px]">Porto → London · 5 Jul · 1 adult</p>
        <p className="text-[12px] text-muted-foreground">3 results · Economy</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
        {results.map((r, i) => (
          <div key={i} onClick={onFlight} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="font-bold text-[14px]">{r.airline}</p>
                <p className="text-[11px] text-muted-foreground">{r.flight}</p>
                {r.sponsored && <SponsoredLabel />}
              </div>
              <p className="font-bold text-[20px]">{r.price}</p>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-center"><p className="text-[22px] font-bold leading-none">{r.dep}</p><p className="text-[10px] text-muted-foreground">OPO</p></div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[11px] text-muted-foreground">{r.dur}</p>
                <div className="w-full flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" /><div className="flex-1 h-[1px] bg-border" /><Plane size={11} className="text-muted-foreground" /><div className="flex-1 h-[1px] bg-border" /><div className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" /></div>
                <p className="text-[10px] text-muted-foreground">{r.stops === 0 ? "Non-stop" : `${r.stops} stop`}</p>
              </div>
              <div className="text-center"><p className="text-[22px] font-bold leading-none">{r.arr}</p><p className="text-[10px] text-muted-foreground">LHR</p></div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>{r.fare}</span><span>·</span><span>{r.baggage}</span>
            </div>
            <PriceFreshness time="2 min ago" />
          </div>
        ))}
        <div className="mx-0 bg-muted/50 rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Prices are indicative and may change. Booking is completed on the provider's website. <button onClick={() => onNav("commercial-transparency")} className="underline">Affiliate disclosure →</button></p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 38: Flight Option Detail ──────────────────────────────────────────

export function FlightOptionDetailScreen({ onBack, onHandoff, onNav }: { onBack: () => void; onHandoff: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Results" onPress={onBack} />
          <div className="flex gap-2">
            <button><Heart size={18} className="text-muted-foreground" /></button>
            <button><Share2 size={18} className="text-muted-foreground" /></button>
          </div>
        </div>

        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div><p className="text-white/50 text-[12px]">TAP Air Portugal · TP791</p><p className="font-bold text-[20px]">Porto → London</p></div>
            <div className="text-right"><p className="text-white/50 text-[11px]">Total price</p><p className="font-bold text-[28px]">€189</p></div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-center"><p className="text-[26px] font-bold leading-none">18:55</p><p className="text-white/50 text-[11px]">OPO · T1</p></div>
            <div className="flex-1 text-center"><p className="text-white/40 text-[11px]">2h 25m · Non-stop</p><div className="w-full h-[1px] bg-white/20 my-1" /></div>
            <div className="text-center"><p className="text-[26px] font-bold leading-none">21:20</p><p className="text-white/50 text-[11px]">LHR · T2</p></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            {[{ l: "Fare", v: "Economy Flex" }, { l: "Baggage", v: "1 x 23kg" }, { l: "Changes", v: "Allowed" }].map((i) => (
              <div key={i.l} className="bg-white/10 rounded-xl py-2"><p className="text-white/40">{i.l}</p><p className="text-white font-semibold">{i.v}</p></div>
            ))}
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Cancellation", value: "Refundable (fee may apply)" },
            { label: "Seat selection", value: "Available from €12" },
            { label: "Meals", value: "Included" },
            { label: "Provider", value: "TAP Air Portugal" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 mb-4"><PriceFreshness time="2 min ago" /><AffiliateLabel /></div>

        <div className="mx-5 space-y-2">
          <button onClick={onHandoff} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 active:opacity-90"><ExternalLink size={16} />Continue to TAP Air Portugal</button>
          <SecondaryBtn label="Compare options" onClick={() => onNav("compare-flight-options")} />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 39: Compare Flight Options ───────────────────────────────────────

export function CompareFlightOptionsScreen({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const [selected, setSelected] = useState(0);
  const options = [
    { airline: "TAP", dep: "18:55", arr: "21:20", price: "€189", stops: "Non-stop", bag: "1 x 23kg", refund: "Refundable" },
    { airline: "Ryanair", dep: "07:00", arr: "09:35", price: "€54", stops: "Non-stop", bag: "Cabin only", refund: "Non-refundable" },
  ];

  const rows = ["Airline", "Departure", "Arrival", "Price", "Stops", "Baggage", "Refundable"];
  const vals = (opt: typeof options[0]) => [opt.airline, opt.dep, opt.arr, opt.price, opt.stops, opt.bag, opt.refund];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Results" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Compare</h2>
          <button onClick={onSelect} className="text-[#E07B5A] font-bold">Select</button>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex border-b border-border">
            <div className="w-28 flex-shrink-0 px-4 py-3 bg-muted/30"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Option</p></div>
            {options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)} className={cn("flex-1 px-3 py-3 text-center border-l border-border transition-all", selected === i ? "bg-[#1C2B3A] text-white" : "bg-card")}>
                <p className={cn("text-[13px] font-bold", selected === i ? "text-white" : "text-foreground")}>{opt.airline}</p>
                <p className={cn("text-[11px]", selected === i ? "text-white/60" : "text-muted-foreground")}>{opt.price}</p>
              </button>
            ))}
          </div>
          {rows.map((row, ri) => (
            <div key={row} className={cn("flex", ri < rows.length - 1 && "border-b border-border")}>
              <div className="w-28 flex-shrink-0 px-4 py-3 bg-muted/30"><p className="text-[11px] text-muted-foreground font-medium">{row}</p></div>
              {options.map((opt, oi) => (
                <div key={oi} className={cn("flex-1 px-3 py-3 border-l border-border text-center", selected === oi && "bg-[#1C2B3A]/5")}>
                  <p className="text-[12px] font-semibold">{vals(opt)[ri]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 40: Search Stays ───────────────────────────────────────────────────

export function SearchStaysScreen({ onBack, onSearch }: { onBack: () => void; onSearch: () => void }) {
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none";
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Booking Hub" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Search stays</h1></div>

        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Destination</label>
            <div className="relative"><input className={cn(fieldCls, "pl-10")} placeholder="City or area" defaultValue="Porto, Portugal" /><MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Check-in</label><input type="date" className={fieldCls} defaultValue="2026-06-30" /></div>
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Checkout</label><input type="date" className={fieldCls} defaultValue="2026-07-05" /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Guests</label>
              <select className={cn(fieldCls, "appearance-none")}><option>1 guest</option><option>2 guests</option></select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Rooms</label>
              <select className={cn(fieldCls, "appearance-none")}><option>1 room</option><option>2 rooms</option></select>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Property type</label>
            <div className="flex gap-2 flex-wrap">
              {["Hotel", "Apartment", "Villa", "Hostel"].map((t) => (
                <button key={t} className="px-3.5 py-2 rounded-2xl border border-border text-[13px] font-semibold">{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-5"><PrimaryBtn label="Search stays" onClick={onSearch} /></div>
      </div>
    </Scroll>
  );
}

// ─── Screen 41: Stay Search Results ───────────────────────────────────────────

export function StaySearchResultsScreen({ onBack, onStay, onNav }: { onBack: () => void; onStay: () => void; onNav: (s: Screen) => void }) {
  const results = [
    { name: "The Yeatman Hotel", loc: "Vila Nova de Gaia", rating: "9.2", reviews: "1,847", price: "€185/night", total: "€925", cancel: "Free cancellation", dist: "12 min from Ribeira", sponsored: false },
    { name: "Hotel Infante Sagres", loc: "Porto city centre", rating: "8.8", reviews: "3,204", price: "€139/night", total: "€695", cancel: "Non-refundable", dist: "Central Porto", sponsored: true },
    { name: "Pestana Porto", loc: "Ribeira", rating: "8.5", reviews: "2,109", price: "€112/night", total: "€560", cancel: "Free cancellation", dist: "Ribeira waterfront", sponsored: false },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <BackBtn label="Search" onPress={onBack} />
          <button className="text-muted-foreground"><Filter size={18} /></button>
        </div>
        <p className="font-bold text-[15px]">Porto · 30 Jun – 5 Jul · 5 nights</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
        {results.map((r) => (
          <div key={r.name} onClick={onStay} className="bg-card border border-border rounded-3xl overflow-hidden cursor-pointer active:opacity-80 shadow-sm">
            <div className="h-32 bg-muted flex items-center justify-center border-b border-border">
              <Hotel size={32} className="text-muted-foreground" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2"><p className="font-bold text-[15px]">{r.name}</p>{r.sponsored && <SponsoredLabel />}</div>
                  <p className="text-[12px] text-muted-foreground">{r.loc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[18px]">{r.price}</p>
                  <p className="text-[11px] text-muted-foreground">Total: {r.total}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{r.rating}</span>
                <span className="text-muted-foreground">{r.reviews} reviews</span>
                <span className="text-muted-foreground">·</span>
                <span className={cn("font-medium", r.cancel.includes("Free") ? "text-emerald-700" : "text-muted-foreground")}>{r.cancel}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">{r.dist}</p>
              <PriceFreshness time="5 min ago" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 42: Stay Option Detail ────────────────────────────────────────────

export function StayOptionDetailScreen({ onBack, onHandoff }: { onBack: () => void; onHandoff: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <BackBtn label="Results" onPress={onBack} />
          <div className="flex gap-3"><button><Heart size={18} className="text-muted-foreground" /></button><button><Share2 size={18} className="text-muted-foreground" /></button></div>
        </div>

        <div className="mx-5 h-44 bg-muted rounded-3xl flex items-center justify-center mb-4 border border-border"><Hotel size={36} className="text-muted-foreground" /></div>

        <div className="px-5 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div><h1 className="text-[22px] font-bold">The Yeatman Hotel</h1><p className="text-muted-foreground text-[13px]">Vila Nova de Gaia · Porto</p></div>
            <div className="text-right flex-shrink-0">
              <p className="text-[24px] font-bold">€185</p>
              <p className="text-[11px] text-muted-foreground">per night</p>
            </div>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Check-in", value: "30 Jun 2026 · from 15:00" },
            { label: "Checkout", value: "5 Jul 2026 · by 12:00" },
            { label: "Total (5 nights)", value: "€925 incl. taxes" },
            { label: "Cancellation", value: "Free cancellation until 28 Jun" },
            { label: "Distance", value: "12 min by taxi from Ribeira" },
            { label: "Provider", value: "booking.com (affiliate)" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold text-right max-w-[55%]">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 mb-4"><AffiliateLabel /><PriceFreshness time="5 min ago" /></div>

        <div className="mx-5 space-y-2">
          <button onClick={onHandoff} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 active:opacity-90"><ExternalLink size={16} />Continue to provider</button>
          <SecondaryBtn label="Save option" />
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 43: Activity Booking Options ──────────────────────────────────────

export function ActivityBookingOptionsScreen({ onBack, onHandoff }: { onBack: () => void; onHandoff: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Booking Hub" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[22px] font-bold">Activity options</h1><p className="text-[12px] text-muted-foreground">Belém Tower · Lisbon · 28 Jun</p></div>

        <div className="px-5 space-y-3 mb-4">
          {[
            { provider: "GetYourGuide", title: "Skip-the-line ticket", price: "€16", dur: "Flexible · 1–2h", cancel: "Free cancellation", sponsored: false },
            { provider: "Viator", title: "Guided tour + ticket", price: "€34", dur: "2h guided tour", cancel: "24h cancellation", sponsored: true },
          ].map((a) => (
            <div key={a.provider} onClick={onHandoff} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div><p className="font-bold text-[14px]">{a.title}</p><p className="text-[11px] text-muted-foreground">{a.provider}{a.sponsored && " · "}{a.sponsored && <SponsoredLabel />}</p></div>
                <p className="font-bold text-[20px] flex-shrink-0">{a.price}</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2"><span>{a.dur}</span><span>·</span><span className={a.cancel.includes("Free") ? "text-emerald-700 font-medium" : ""}>{a.cancel}</span></div>
              <PriceFreshness time="just now" />
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted/50 rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Booking is completed on the provider's website. Onward earns a commission on purchases through these links.</p>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screen 44: Booking Handoff Confirmation ──────────────────────────────────

export function BookingHandoffConfirmScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-5"><ExternalLink size={24} className="text-sky-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Continuing to TAP Air Portugal</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">You will be taken to the provider's website to complete your booking. Onward does not process the payment.</p>

        <div className="bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Option", value: "TP791 Porto → London" },
            { label: "Price last checked", value: "€189 · 2 min ago" },
            { label: "Cancellation", value: "Refundable" },
            { label: "Shared with provider", value: "Your name (pre-filled)" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold text-right">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5">
          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">Price and availability may change before you complete your booking. Onward is not responsible for differences between displayed and final prices.</p>
        </div>

        <AffiliateLabel />
      </div>
      <div className="space-y-2.5 mt-4">
        <button onClick={onContinue} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2"><ExternalLink size={16} />Open TAP Air Portugal</button>
        <SecondaryBtn label="Cancel" onClick={onBack} />
      </div>
    </div>
  );
}

// ─── Screen 45: Booking Return & Import ───────────────────────────────────────

export function BookingReturnImportScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5"><Plane size={24} className="text-muted-foreground" /></div>
        <h2 className="text-[22px] font-bold mb-2">Did you complete the booking?</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">If you booked, Onward can import your confirmation or you can add it manually.</p>

        <div className="space-y-2">
          {[
            { label: "Search connected inbox for confirmation", screen: "imports-home" as Screen, icon: <Mail size={15} /> },
            { label: "Add confirmation number manually", screen: "add-edit-reservation" as Screen, icon: <Pencil size={15} /> },
            { label: "Import confirmation email", screen: "imports-home" as Screen, icon: <Download size={15} /> },
          ].map((a) => (
            <button key={a.label} onClick={() => onNav(a.screen)} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70 shadow-sm">
              <span className="text-muted-foreground">{a.icon}</span>{a.label}<ChevronRight size={14} className="text-muted-foreground ml-auto" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <SecondaryBtn label="Booking not completed" onClick={onBack} />
        <button onClick={onBack} className="w-full text-[13px] text-muted-foreground font-medium">Not now</button>
      </div>
    </div>
  );
}

// ─── Screen 46: Saved Booking Options ─────────────────────────────────────────

export function SavedBookingOptionsScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const saved = [
    { type: "flight", title: "TP791 Porto → London", saved: "€189", current: "€209", delta: "+€20", date: "Saved 28 Jun", stale: true },
    { type: "stay", title: "The Yeatman Hotel · Porto", saved: "€925", current: "€925", delta: "—", date: "Saved 27 Jun", stale: false },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Booking Hub" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Saved options</h1></div>

        <div className="px-5 space-y-3">
          {saved.map((s) => (
            <div key={s.title} onClick={onItem} className={cn("bg-card border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm", s.stale ? "border-amber-200" : "border-border")}>
              {s.stale && <div className="flex items-center gap-1.5 mb-2"><AlertCircle size={12} className="text-amber-600" /><span className="text-[11px] text-amber-700 font-semibold">Price has changed</span></div>}
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-[14px] flex-1">{s.title}</p>
                <div className="text-right flex-shrink-0">
                  {s.stale ? (
                    <div><p className="font-bold text-[16px]">{s.current}</p><p className="text-[11px] text-amber-700 line-through">{s.saved}</p></div>
                  ) : <p className="font-bold text-[16px]">{s.current}</p>}
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">{s.date}</p>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 47–53: Travel Services ───────────────────────────────────────────

export function TravelInsuranceScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <button onClick={() => onNav("insurance-comparison")} className="text-[#E07B5A] font-bold text-[14px]">Compare</button>
        </div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Travel insurance</h1></div>

        <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2.5">
          <AlertCircle size={14} className="text-amber-600" />
          <p className="text-[12px] text-amber-800 font-semibold">No insurance found for Lisbon & Porto</p>
        </div>

        <div className="mx-5"><PrimaryBtn label="Compare travel insurance" onClick={() => onNav("insurance-comparison")} /></div>
        <p className="text-[11px] text-muted-foreground text-center px-8 mt-4">Results include affiliate links. Onward may earn a commission.</p>
      </div>
    </Scroll>
  );
}

export function InsurancePolicyDetailScreen({ onBack, onOpen }: { onBack: () => void; onOpen: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insurance" onPress={onBack} /></div>
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/50 text-[12px]">Allianz Travel</p>
          <p className="font-bold text-[20px]">Multi-trip Annual Policy</p>
          <p className="text-white/60 text-[13px] mt-0.5">Policy #ALZ-2026-884421</p>
          <div className="mt-3 pt-3 border-t border-white/10"><p className="text-white/50 text-[11px]">Covered</p><p className="text-white font-semibold">Sarah Chen · James Chen</p></div>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Medical coverage", value: "€10,000,000" },
            { label: "Cancellation", value: "Up to €5,000" },
            { label: "Baggage", value: "Up to €2,000" },
            { label: "Delay coverage", value: "€200 after 6h" },
            { label: "Deductible", value: "€100" },
            { label: "Coverage dates", value: "1 Jan – 31 Dec 2026" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          <button onClick={onOpen} className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 text-[14px] font-semibold active:opacity-70"><ExternalLink size={15} className="text-muted-foreground" />Open Allianz portal<ChevronRight size={14} className="text-muted-foreground ml-auto" /></button>
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">File a claim</button>
        </div>
      </div>
    </Scroll>
  );
}

export function InsuranceComparisonScreen({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const policies = [
    { provider: "Allianz Travel", price: "€45", medical: "€10M", cancel: "€5,000", baggage: "€2,000", deductible: "€100", sponsored: false },
    { provider: "AXA Travel", price: "€38", medical: "€5M", cancel: "€3,000", baggage: "€1,500", deductible: "€150", sponsored: true },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insurance" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[22px] font-bold">Compare insurance</h1><p className="text-[12px] text-muted-foreground">Lisbon & Porto · 27 Jun – 5 Jul · 1 traveller</p></div>

        <div className="px-5 space-y-3 mb-4">
          {policies.map((p) => (
            <div key={p.provider} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2"><p className="font-bold text-[15px]">{p.provider}</p>{p.sponsored && <SponsoredLabel />}</div>
                <div className="text-right"><p className="font-bold text-[22px]">{p.price}</p><p className="text-[10px] text-muted-foreground">per trip</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Medical", value: p.medical },
                  { label: "Cancellation", value: p.cancel },
                  { label: "Baggage", value: p.baggage },
                  { label: "Deductible", value: p.deductible },
                ].map((item) => (
                  <div key={item.label} className="bg-muted rounded-xl px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-[12px] font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <button onClick={onSelect} className="w-full h-10 bg-[#1C2B3A] text-white rounded-xl text-[13px] font-semibold">Continue to provider</button>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground text-center px-8">Results include affiliate links. Read policy documents carefully before purchasing. Onward does not provide insurance advice.</p>
      </div>
    </Scroll>
  );
}

export function InsuranceClaimTrackerScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Insurance" onPress={onBack} /></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Claim tracker</h1></div>
        <div className="mx-5 bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-[15px]">Flight cancellation claim</p>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Processing</span>
          </div>
          {[
            { label: "Claim number", value: "CLM-2026-77411" },
            { label: "Type", value: "Cancellation" },
            { label: "Claimed", value: "€285.00" },
            { label: "Approved", value: "Pending" },
            { label: "Status", value: "Under review · 7 days" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between py-2.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
          <button className="w-full mt-3 h-9 bg-muted rounded-xl text-[12px] font-semibold text-muted-foreground">Contact Allianz</button>
        </div>
      </div>
    </Scroll>
  );
}

export function EsimConnectivityScreen({ onBack, onItem }: { onBack: () => void; onItem: () => void }) {
  const plans = [
    { provider: "Airalo", data: "5 GB", validity: "30 days", countries: "38 EU countries", network: "4G/5G", hotspot: true, price: "€9.00", sponsored: false },
    { provider: "Holafly", data: "Unlimited", validity: "7 days", countries: "Portugal only", network: "4G", hotspot: false, price: "€19.00", sponsored: true },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Booking Hub" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[22px] font-bold">eSIM & connectivity</h1><p className="text-[12px] text-muted-foreground">Portugal · 27 Jun – 5 Jul · 9 days</p></div>

        <div className="px-5 space-y-3 mb-4">
          {plans.map((p) => (
            <div key={p.provider} onClick={onItem} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2"><p className="font-bold text-[15px]">{p.provider}</p>{p.sponsored && <SponsoredLabel />}</div>
                <p className="font-bold text-[20px]">{p.price}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {[
                  { label: "Data", value: p.data },
                  { label: "Validity", value: p.validity },
                  { label: "Coverage", value: p.countries },
                  { label: "Hotspot", value: p.hotspot ? "Supported" : "Not supported" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted rounded-xl px-3 py-2">
                    <p className="text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-[12px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground text-center px-8">Plans include affiliate links. Prices may vary.</p>
      </div>
    </Scroll>
  );
}

export function EsimDetailScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="eSIM" onPress={onBack} /></div>
        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/50 text-[12px]">Airalo</p>
          <p className="font-bold text-[22px]">Europe 5 GB</p>
          <p className="text-white/60 text-[13px]">38 countries · 30 days · 4G/5G</p>
          <p className="text-[32px] font-bold mt-3">€ 9.00</p>
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Data", value: "5 GB" },
            { label: "Validity", value: "30 days from activation" },
            { label: "Hotspot", value: "Supported" },
            { label: "Activation", value: "Instant after purchase" },
            { label: "Refund policy", value: "Refundable before activation" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          <button onClick={onContinue} className="w-full h-[52px] bg-[#1C2B3A] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2"><ExternalLink size={16} />Continue to Airalo</button>
          <SecondaryBtn label="Save option" />
        </div>
        <div className="mx-5 mt-3"><AffiliateLabel /></div>
      </div>
    </Scroll>
  );
}

export function AirportTransferOptionsScreen({ onBack }: { onBack: () => void }) {
  const options = [
    { type: "Public transport", icon: <Train size={15} />, desc: "Metro + bus to Porto city centre", time: "~55 min", est: "€2.00", note: "Andante card required" },
    { type: "Taxi / rideshare", icon: <Plane size={15} className="rotate-90" />, desc: "Uber or taxi to hotel", time: "~25 min", est: "€20–35", note: "Estimate only · varies with traffic" },
    { type: "Private transfer", icon: <Users size={15} />, desc: "Pre-booked private car", time: "~20 min", est: "€45–60", note: "Book in advance" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Booking Hub" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[22px] font-bold">Airport transfers</h1><p className="text-[12px] text-muted-foreground">Porto Airport → The Yeatman Hotel · 30 Jun · 17:45</p></div>

        <div className="px-5 space-y-3 mb-4">
          {options.map((opt) => (
            <div key={opt.type} className="bg-card border border-border rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-[#1C2B3A]">{opt.icon}</div>
                <div className="flex-1"><p className="font-bold text-[14px]">{opt.type}</p><p className="text-[12px] text-muted-foreground">{opt.desc}</p></div>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-[12px] font-semibold">{opt.time}</p><p className="text-[10px] text-amber-700">{opt.note}</p></div>
                <p className="font-bold text-[16px]">{opt.est}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 bg-muted rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Cost and time estimates are indicative. Actual fares depend on conditions at time of travel.</p>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 54–60: Post-Journey ──────────────────────────────────────────────

export function JourneyRecapScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journeys" onPress={onBack} />
          <div className="flex gap-2">
            <button><Share2 size={18} className="text-muted-foreground" /></button>
            <button><Download size={18} className="text-muted-foreground" /></button>
          </div>
        </div>

        <div className="px-5 pb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Journey recap</p>
          <h1 className="text-[28px] font-bold" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>Lisbon & Porto</h1>
          <p className="text-muted-foreground text-[13px]">27 Jun – 5 Jul 2026 · Portugal · 9 days</p>
        </div>

        <div className="mx-5 grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "Reservations", value: "14" },
            { label: "Total spent", value: "€1,329" },
            { label: "Travellers", value: "2" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl py-3 text-center shadow-sm">
              <p className="text-[20px] font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {[
          { label: "Spending summary", screen: "journey-spending-summary" as Screen, icon: <Receipt size={15} /> },
          { label: "Journey reflection", screen: "journey-reflection" as Screen, icon: <FileText size={15} /> },
          { label: "Save as template", screen: "save-journey-template" as Screen, icon: <BookOpen size={15} /> },
          { label: "Export Journey data", screen: "export-journey-data" as Screen, icon: <Download size={15} /> },
        ].map((a) => (
          <div key={a.label} onClick={() => onNav(a.screen)} className="mx-5 mb-2 flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 cursor-pointer active:opacity-70 shadow-sm">
            <span className="text-muted-foreground">{a.icon}</span>
            <span className="text-[14px] font-semibold">{a.label}</span>
            <ChevronRight size={14} className="text-muted-foreground ml-auto" />
          </div>
        ))}
      </div>
    </Scroll>
  );
}

export function JourneySpendingSummaryScreen({ onBack, onExport }: { onBack: () => void; onExport: () => void }) {
  const cats = [
    { label: "Flights", amount: "€820", pct: 62 },
    { label: "Stays", amount: "€340", pct: 26 },
    { label: "Food", amount: "€89", pct: 7 },
    { label: "Other", amount: "€80", pct: 6 },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Recap" onPress={onBack} />
          <button onClick={onExport} className="text-[#E07B5A] font-bold text-[14px]">Export</button>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Spending summary</h1></div>

        <div className="mx-5 bg-[#1C2B3A] rounded-3xl p-5 mb-4 text-white shadow-lg">
          <p className="text-white/50 text-[12px]">Total spent · EUR</p>
          <p className="text-[44px] font-bold leading-none">€ 1,329</p>
          <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 text-[12px]">
            <div><p className="text-white/40">Confirmed</p><p className="font-semibold">€1,209</p></div>
            <div><p className="text-white/40">Refunded</p><p className="font-semibold text-sky-300">€120</p></div>
            <div><p className="text-white/40">Per day</p><p className="font-semibold">€148</p></div>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {cats.map((cat, i) => (
            <div key={cat.label} className={cn("flex items-center gap-3 px-5 py-3.5", i < cats.length - 1 && "border-b border-border")}>
              <div className="flex-1">
                <div className="flex justify-between mb-1"><p className="text-[13px] font-semibold">{cat.label}</p><p className="text-[13px] font-bold">{cat.amount}</p></div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#1C2B3A] rounded-full" style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground w-8 text-right">{cat.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function JourneyArchiveScreen({ onBack, onJourney }: { onBack: () => void; onJourney: () => void }) {
  const journeys = [
    { name: "New York", dates: "3–8 Mar 2026", dest: "United States", spend: "USD 1,240", days: 5 },
    { name: "Barcelona", dates: "14–18 Jan 2026", dest: "Spain", spend: "€680", days: 4 },
    { name: "Tokyo & Kyoto", dates: "Nov 2025", dest: "Japan", spend: "¥142,000", days: 14 },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Journeys" onPress={onBack} />
          <button className="text-muted-foreground"><Search size={18} /></button>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Journey archive</h1></div>

        <div className="px-5 space-y-3">
          {journeys.map((j) => (
            <div key={j.name} onClick={onJourney} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div><p className="font-bold text-[16px]">{j.name}</p><p className="text-muted-foreground text-[12px]">{j.dest} · {j.dates}</p></div>
                <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase">Past</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                <span>{j.days} days</span><span>·</span><span>Spent {j.spend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function JourneyReflectionScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const fieldCls = "w-full bg-muted rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none placeholder:text-muted-foreground/50";

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Skip</button>
          <h2 className="text-[17px] font-bold">Reflection</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button>
        </div>
        <div className="px-5 pb-4"><p className="text-[13px] text-muted-foreground">Private notes only visible to you.</p></div>

        <div className="px-5 space-y-4">
          {[
            { label: "Favourite places", placeholder: "Where did you love?" },
            { label: "Favourite meals", placeholder: "Best food you had?" },
            { label: "What worked well", placeholder: "What would you do again?" },
            { label: "What to avoid next time", placeholder: "What to do differently?" },
            { label: "Private notes", placeholder: "Anything else…" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label>
              <textarea className={cn(fieldCls, "h-16")} placeholder={f.placeholder} />
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function ProviderReviewPromptScreen({ onBack }: { onBack: () => void }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center"><Hotel size={22} className="text-amber-600" /></div>
          <div><p className="font-bold text-[16px]">The Yeatman Hotel</p><p className="text-[12px] text-muted-foreground">30 Jun – 5 Jul 2026 · Porto</p></div>
        </div>
        <h2 className="text-[20px] font-bold mb-4">How was your stay?</h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          {[1,2,3,4,5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star size={36} className={star <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <div className="mb-4">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Review (optional)</label>
            <textarea className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none h-20 placeholder:text-muted-foreground/50" placeholder="Share your experience…" />
          </div>
        )}

        <div className="bg-muted rounded-2xl p-3.5 mb-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Reviews are posted on the provider's platform. Onward will open their website for you to submit.</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {rating > 0 && <PrimaryBtn label="Open booking.com to review" />}
        <SecondaryBtn label="Skip" onClick={onBack} />
        <button className="w-full text-[13px] text-muted-foreground font-medium">Remind me later</button>
      </div>
    </div>
  );
}

export function SaveJourneyTemplateScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [exclude, setExclude] = useState({ dates: true, travellers: true, refs: true, expenses: true, docs: false });
  type ExKey = keyof typeof exclude;

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={onBack} className="text-muted-foreground font-semibold">Cancel</button>
          <h2 className="text-[17px] font-bold">Save as template</h2>
          <button onClick={onSave} className="text-[#E07B5A] font-bold">Save</button>
        </div>
        <div className="px-5 space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">Template name</label>
            <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="Lisbon & Porto trip" />
          </div>
        </div>
        <div className="px-5 mb-2"><p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Exclude from template</p></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-5">
          {([
            { key: "dates" as ExKey, label: "Travel dates" },
            { key: "travellers" as ExKey, label: "Traveller details" },
            { key: "refs" as ExKey, label: "Confirmation numbers" },
            { key: "expenses" as ExKey, label: "Expense data" },
            { key: "docs" as ExKey, label: "Attached documents" },
          ]).map((item, i, arr) => (
            <div key={item.key} onClick={() => setExclude((e) => ({ ...e, [item.key]: !e[item.key] }))} className={cn("flex items-center gap-3 px-5 py-4 cursor-pointer active:bg-muted/30", i < arr.length - 1 && "border-b border-border")}>
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", exclude[item.key] ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                {exclude[item.key] && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-[14px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function JourneyTemplatesScreen({ onBack, onTemplate }: { onBack: () => void; onTemplate: () => void }) {
  const templates = [
    { name: "Lisbon & Porto trip", dest: "Portugal", duration: "9 days", plans: 12 },
    { name: "Copenhagen weekend", dest: "Denmark", duration: "4 days", plans: 6 },
    { name: "Tokyo & Kyoto", dest: "Japan", duration: "14 days", plans: 22 },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4"><BackBtn label="Journeys" onPress={onBack} /></div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Journey templates</h1></div>

        <div className="px-5 space-y-3">
          {templates.map((t) => (
            <div key={t.name} onClick={onTemplate} className="bg-card border border-border rounded-3xl p-4 cursor-pointer active:opacity-80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-[15px]">{t.name}</p>
                <div className="flex gap-2">
                  <button className="text-muted-foreground" onClick={(e) => e.stopPropagation()}><Pencil size={14} /></button>
                  <button className="text-muted-foreground" onClick={(e) => e.stopPropagation()}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground">{t.dest} · {t.duration} · {t.plans} plans</p>
              <button className="mt-3 h-8 px-4 bg-[#1C2B3A] text-white rounded-xl text-[12px] font-semibold">Create Journey from template</button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

// ─── Screens 61–65: Financial Reports ─────────────────────────────────────────

export function ExpenseReportBuilderScreen({ onBack, onPreview }: { onBack: () => void; onPreview: () => void }) {
  const [reimbursable, setReimbursable] = useState(false);
  const [includeReceipts, setIncludeReceipts] = useState(true);

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Expenses" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Expense report</h2>
          <button onClick={onPreview} className="text-[#E07B5A] font-bold">Preview</button>
        </div>

        <div className="px-5 space-y-3 mb-5">
          {[
            { label: "Report title", value: "Lisbon & Porto · Jun–Jul 2026" },
            { label: "Journey", value: "Lisbon & Porto" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">{f.label}</label>
              <input className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue={f.value} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">From</label><input type="date" className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="2026-06-27" /></div>
            <div><label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1.5 block">To</label><input type="date" className="w-full bg-muted rounded-2xl px-4 py-3.5 text-[15px] font-medium outline-none" defaultValue="2026-07-05" /></div>
          </div>
        </div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Reimbursable expenses only", value: reimbursable, set: setReimbursable },
            { label: "Include receipts", value: includeReceipts, set: setIncludeReceipts },
          ].map((row, i) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i === 0 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button onClick={() => row.set(!row.value)} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", row.value ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", row.value ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>

        <div className="mx-5"><PrimaryBtn label="Generate report" onClick={onPreview} /></div>
      </div>
    </Scroll>
  );
}

export function ExpenseReportPreviewScreen({ onBack, onExport }: { onBack: () => void; onExport: () => void }) {
  const rows = [
    { date: "28 Jun", merchant: "Café A Brasileira", cat: "Food", amount: "€12.50" },
    { date: "29 Jun", merchant: "Museu Nacional", cat: "Activities", amount: "€10.00" },
    { date: "30 Jun", merchant: "Taberna das Flores", cat: "Food", amount: "€68.40" },
    { date: "30 Jun", merchant: "AP 122 train", cat: "Transport", amount: "€45.00" },
  ];

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Builder" onPress={onBack} />
          <div className="flex gap-2">
            <button onClick={onExport} className="text-[#E07B5A] font-bold text-[14px]">Export PDF</button>
          </div>
        </div>

        <div className="mx-5 mb-4">
          <h2 className="text-[20px] font-bold">Lisbon & Porto · Jun–Jul 2026</h2>
          <p className="text-[12px] text-muted-foreground">27 Jun – 5 Jul · Sarah Chen</p>
        </div>

        {/* Totals */}
        <div className="mx-5 grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Total", value: "€1,329" },
            { label: "Reimbursable", value: "€89" },
            { label: "Refunded", value: "€120" },
          ].map((s) => (
            <div key={s.label} className="bg-muted rounded-2xl py-3 text-center">
              <p className="font-bold text-[16px]">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-4">
          <div className="flex bg-muted/50 px-4 py-2.5 border-b border-border">
            {["Date", "Merchant", "Category", "Amount"].map((h) => (
              <p key={h} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex-1">{h}</p>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} className={cn("flex px-4 py-3", i < rows.length - 1 && "border-b border-border")}>
              <p className="text-[12px] text-muted-foreground flex-1">{row.date}</p>
              <p className="text-[12px] font-medium flex-1">{row.merchant}</p>
              <p className="text-[12px] text-muted-foreground flex-1">{row.cat}</p>
              <p className="text-[12px] font-bold flex-1 text-right">{row.amount}</p>
            </div>
          ))}
        </div>

        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Export PDF" onClick={onExport} />
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold">Export CSV</button>
          <button className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Share</button>
        </div>
      </div>
    </Scroll>
  );
}

export function ReceiptLibraryScreen({ onBack, onReceipt }: { onBack: () => void; onReceipt: () => void }) {
  const receipts = [
    { merchant: "Taberna da Rua das Flores", date: "30 Jun", amount: "€68.40", linked: true, journey: "Lisbon & Porto" },
    { merchant: "Café A Brasileira", date: "29 Jun", amount: "€12.50", linked: true, journey: "Lisbon & Porto" },
    { merchant: "Unlinked receipt", date: "28 Jun", amount: "€24.00", linked: false, journey: "" },
  ];

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Settings" onPress={onBack} />
          <button className="text-muted-foreground"><Search size={18} /></button>
        </div>
        <div className="px-5 pb-4"><h1 className="text-[24px] font-bold">Receipt library</h1></div>

        {receipts.some((r) => !r.linked) && (
          <div className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2.5">
            <AlertCircle size={14} className="text-amber-600" />
            <p className="text-[12px] text-amber-800 font-semibold">1 receipt not linked to an expense</p>
          </div>
        )}

        <div className="px-5 space-y-2">
          {receipts.map((r) => (
            <div key={r.merchant} onClick={onReceipt} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70 shadow-sm">
              <div className="w-10 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><Receipt size={18} className="text-muted-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px] truncate">{r.merchant}</p>
                <p className="text-[11px] text-muted-foreground">{r.date} · {r.linked ? r.journey : "Not linked"}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-[13px]">{r.amount}</p>
                {!r.linked && <span className="text-[10px] font-bold text-amber-700">Unlinked</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function ReceiptDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <BackBtn label="Library" onPress={onBack} />
          <button className="text-muted-foreground"><Trash2 size={18} /></button>
        </div>

        <div className="mx-5 h-48 bg-muted rounded-3xl flex items-center justify-center mb-4 border border-border"><Receipt size={40} className="text-muted-foreground" /></div>

        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Merchant", value: "Taberna da Rua das Flores" },
            { label: "Date", value: "30 Jun 2026" },
            { label: "Amount", value: "€68.40" },
            { label: "Currency", value: "EUR" },
            { label: "Linked expense", value: "Dinner · 30 Jun" },
            { label: "Category", value: "Food" },
            { label: "Extraction", value: "Automatic · Verified" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className="text-[13px] font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl h-11 text-[13px] font-semibold"><Download size={14} />Download</button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl h-11 text-[13px] font-semibold"><Share2 size={14} />Share</button>
        </div>
      </div>
    </Scroll>
  );
}

export function ExportJourneyDataScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>(["timeline", "reservations", "expenses"]);
  const items = ["timeline", "reservations", "expenses", "receipts", "documents", "travellers", "change-history", "comments", "refunds"];
  const formats = ["PDF", "CSV", "JSON", "ZIP"];
  const [fmt, setFmt] = useState("PDF");

  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <BackBtn label="Journey" onPress={onBack} />
          <h2 className="text-[17px] font-bold">Export data</h2>
          <button className="text-[#E07B5A] font-bold">Export</button>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Include</p>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {items.map((item, i) => (
              <div key={item} onClick={() => setSelected((s) => s.includes(item) ? s.filter((x) => x !== item) : [...s, item])} className={cn("flex items-center gap-3 px-5 py-3.5 cursor-pointer", i < items.length - 1 && "border-b border-border")}>
                <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors", selected.includes(item) ? "bg-[#1C2B3A] border-[#1C2B3A]" : "border-muted-foreground/30")}>
                  {selected.includes(item) && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-[14px] font-medium capitalize">{item.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Format</p>
          <div className="flex gap-2">
            {formats.map((f) => (
              <button key={f} onClick={() => setFmt(f)} className={cn("flex-1 h-10 rounded-2xl text-[13px] font-semibold border-2 transition-all", fmt === f ? "border-[#1C2B3A] bg-card" : "border-border bg-card text-muted-foreground")}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mx-5"><PrimaryBtn label="Export and share" /></div>
      </div>
    </Scroll>
  );
}

// ─── Screens 66–70: Settings ───────────────────────────────────────────────────

export function WalletPaymentSettingsScreen({ onBack }: { onBack: () => void }) {
  const rows = [
    { label: "Require Face ID for Wallet", on: true },
    { label: "Lock when app backgrounds", on: true },
    { label: "Foreign-transaction alerts", on: false },
    { label: "Refund tracking", on: true },
  ];
  const [toggles, setToggles] = useState(rows.map((r) => r.on));

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><h2 className="text-[17px] font-bold">Wallet & payments</h2><div className="w-12" /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {rows.map((row, i) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < rows.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
        <div className="mx-5"><button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Remove all saved payment data</button></div>
      </div>
    </Scroll>
  );
}

export function ExpenseSettingsScreen({ onBack }: { onBack: () => void }) {
  const rows = ["Automatic categorisation", "Receipt scanning", "Budget alerts", "Include tips in totals"];
  const [toggles, setToggles] = useState([true, true, true, false]);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><h2 className="text-[17px] font-bold">Expense settings</h2><div className="w-12" /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {[
            { label: "Default currency", value: "EUR" },
            { label: "Default split method", value: "Equally" },
            { label: "Export format", value: "PDF" },
          ].map((row, i) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < 2 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button className="flex items-center gap-1 text-[#E07B5A] font-semibold text-[13px]">{row.value}<ChevronDown size={13} /></button>
            </div>
          ))}
        </div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {rows.map((row, i) => (
            <div key={row} className={cn("flex items-center justify-between px-5 py-4", i < rows.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row}</span>
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

export function LoyaltySettingsScreen({ onBack }: { onBack: () => void }) {
  const rows = ["Expiry reminders", "Missing-membership suggestions", "Tier alerts", "Secure membership storage", "Sync balances"];
  const [toggles, setToggles] = useState([true, true, true, true, false]);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><h2 className="text-[17px] font-bold">Loyalty settings</h2><div className="w-12" /></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden mb-4 shadow-sm">
          {rows.map((row, i) => (
            <div key={row} className={cn("flex items-center justify-between px-5 py-4", i < rows.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row}</span>
              <button onClick={() => setToggles((t) => t.map((v, j) => j === i ? !v : v))} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", toggles[i] ? "bg-[#1C2B3A]" : "bg-muted")}>
                <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", toggles[i] ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
        <div className="mx-5"><button className="w-full h-[46px] bg-red-50 border border-red-100 rounded-2xl text-[14px] font-semibold text-red-600">Delete all loyalty data</button></div>
      </div>
    </Scroll>
  );
}

export function BookingPreferencesScreen({ onBack }: { onBack: () => void }) {
  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3 pb-4 flex items-center justify-between"><BackBtn label="Settings" onPress={onBack} /><button className="text-[#E07B5A] font-bold">Save</button></div>
        <div className="px-5 pb-5"><h1 className="text-[24px] font-bold">Booking preferences</h1></div>
        <div className="mx-5 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[
            { label: "Preferred cabin", value: "Economy" },
            { label: "Seat preference", value: "Window" },
            { label: "Maximum stops", value: "Non-stop only" },
            { label: "Cancellation", value: "Prefer refundable" },
            { label: "Baggage", value: "1 checked bag" },
            { label: "Budget range", value: "Mid-range" },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex items-center justify-between px-5 py-4", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[14px] font-medium">{row.label}</span>
              <button className="flex items-center gap-1 text-[#E07B5A] font-semibold text-[13px]">{row.value}<ChevronDown size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
}

export function CommercialTransparencyScreen({ onBack }: { onBack: () => void }) {
  const [disableSponsored, setDisableSponsored] = useState(false);

  return (
    <Scroll>
      <div className="pb-8" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-3"><BackBtn label="Settings" onPress={onBack} /></div>
        <div className="px-5 pt-3 pb-5"><h1 className="text-[24px] font-bold">Commercial transparency</h1></div>

        {[
          { title: "How results are ranked", body: "Flight and stay results are ranked primarily by price and relevance to your Journey. Some placements are sponsored — these are always labelled." },
          { title: "Affiliate relationships", body: "Onward uses affiliate links for some booking providers. When you click through and complete a booking, Onward may receive a commission. This never affects the price you pay." },
          { title: "Sponsored placements", body: "Providers can pay to appear in highlighted positions. Every sponsored result is clearly labelled. You can disable sponsored results below." },
          { title: "Price comparisons", body: "Prices are fetched from providers and may change. Onward cannot guarantee the accuracy or completeness of price comparisons." },
        ].map((section) => (
          <div key={section.title} className="px-5 mb-4">
            <p className="font-bold text-[15px] mb-1">{section.title}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{section.body}</p>
          </div>
        ))}

        <div className="mx-5 bg-card border border-border rounded-3xl px-5 py-4 mb-4 flex items-center justify-between shadow-sm">
          <div><p className="font-semibold text-[14px]">Disable sponsored results</p><p className="text-[11px] text-muted-foreground">Organic results only</p></div>
          <button onClick={() => setDisableSponsored((v) => !v)} className={cn("w-12 h-7 rounded-full relative transition-colors flex-shrink-0", disableSponsored ? "bg-[#1C2B3A]" : "bg-muted")}>
            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all", disableSponsored ? "left-6" : "left-1")} />
          </button>
        </div>
      </div>
    </Scroll>
  );
}

// ─── Phase 5 System States (71–84) ────────────────────────────────────────────

export function NoExpensesScreen({ onAdd, onScan }: { onAdd: () => void; onScan: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><Receipt size={32} className="text-muted-foreground" /></div>}
      title="No expenses yet"
      body="Track spending, split costs and manage your Journey budget."
    >
      <PrimaryBtn label="Add expense" onClick={onAdd} />
      <SecondaryBtn label="Scan a receipt" onClick={onScan} />
    </EmptyStateShell>
  );
}

export function BudgetExceededScreen({ onAdjust, onReview, onDismiss }: { onAdjust: () => void; onReview: () => void; onDismiss: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5"><AlertCircle size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Budget exceeded</h2>
        <p className="text-[14px] text-muted-foreground mb-3">You have spent <span className="font-bold text-red-600">€79 over budget</span> on Lisbon & Porto.</p>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
          <p className="text-[12px] font-bold text-red-700 mb-2">Categories over budget</p>
          {[{ cat: "Food", over: "+€29" }, { cat: "Activities", over: "+€50" }].map((c) => (
            <div key={c.cat} className="flex justify-between text-[13px] mb-1"><span className="text-red-800">{c.cat}</span><span className="font-bold text-red-700">{c.over}</span></div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Adjust budget" onClick={onAdjust} />
        <SecondaryBtn label="Review expenses" onClick={onReview} />
        <button onClick={onDismiss} className="w-full text-[13px] text-muted-foreground font-medium">Dismiss</button>
      </div>
    </div>
  );
}

export function UnsettledBalancesScreen({ onSettle, onRemind }: { onSettle: () => void; onRemind: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5"><Users size={24} className="text-amber-600" /></div>
        <h2 className="text-[22px] font-bold mb-3">Unsettled balances</h2>
        {[
          { name: "James Chen", you: true, amount: "€34.20" },
          { name: "Priya Patel", you: false, amount: "€22.10" },
        ].map((b) => (
          <div key={b.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div><p className="font-semibold text-[14px]">{b.name}</p><p className={cn("text-[12px] font-medium", b.you ? "text-emerald-700" : "text-red-600")}>{b.you ? `${b.name.split(" ")[0]} owes you` : `You owe ${b.name.split(" ")[0]}`}</p></div>
            <p className="font-bold text-[16px]">{b.amount}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Settle up" onClick={onSettle} />
        <SecondaryBtn label="Send reminder" onClick={onRemind} />
      </div>
    </div>
  );
}

export function ExchangeRateUnavailableScreen({ onRetry, onManual, onContinue }: { onRetry: () => void; onManual: () => void; onContinue: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center"><ArrowLeftRight size={32} className="text-muted-foreground" /></div>}
      title="Exchange rate unavailable"
      body="Could not fetch the current rate. Last saved rate: 1 EUR = 0.8553 GBP (28 Jun 2026)."
    >
      <PrimaryBtn label="Retry" onClick={onRetry} />
      <SecondaryBtn label="Enter rate manually" onClick={onManual} />
      <button onClick={onContinue} className="w-full text-[13px] text-muted-foreground font-medium">Continue without conversion</button>
    </EmptyStateShell>
  );
}

export function RefundOverdueScreen({ onContact, onUpdate, onResolve }: { onContact: () => void; onUpdate: () => void; onResolve: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5"><Clock size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Refund overdue</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Your refund of <span className="font-bold text-foreground">€285.00</span> from TAP Air Portugal was expected by 10 Jul 2026 and has not been received.</p>
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          {[{ label: "Provider", value: "TAP Air Portugal" }, { label: "Expected by", value: "10 Jul 2026" }, { label: "Amount", value: "€285.00" }].map((r, i, arr) => (
            <div key={r.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{r.label}</span>
              <span className="text-[13px] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Contact TAP Air Portugal" onClick={onContact} />
        <SecondaryBtn label="Add update" onClick={onUpdate} />
        <button onClick={onResolve} className="w-full text-[13px] text-muted-foreground font-medium">Mark as resolved</button>
      </div>
    </div>
  );
}

export function PaymentFailedScreen({ onRetry, onChange, onCancel }: { onRetry: () => void; onChange: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5"><AlertCircle size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Payment failed</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">The payment could not be processed. Your card ending 4242 was declined.</p>
        <div className="bg-muted rounded-2xl p-3.5 mb-6"><p className="text-[12px] text-muted-foreground">Reason: Insufficient funds. No charge was made.</p></div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Retry payment" onClick={onRetry} />
        <SecondaryBtn label="Use another method" onClick={onChange} />
        <button onClick={onCancel} className="w-full text-[13px] text-muted-foreground font-medium">Cancel</button>
      </div>
    </div>
  );
}

export function BookingPriceChangedScreen({ onContinue, onSearch }: { onContinue: () => void; onSearch: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5"><AlertTriangle size={24} className="text-amber-600" /></div>
        <h2 className="text-[22px] font-bold mb-2">Price has changed</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">The price for this option has changed since you last viewed it.</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-muted/50 rounded-2xl p-4 text-center border border-border"><p className="text-[11px] text-muted-foreground">Original price</p><p className="text-[28px] font-bold line-through text-muted-foreground">€189</p></div>
          <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-200"><p className="text-[11px] text-amber-700">Current price</p><p className="text-[28px] font-bold text-amber-800">€209</p></div>
        </div>
        <p className="text-[12px] text-muted-foreground text-center">Checked just now · +€20 difference</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Continue at €209" onClick={onContinue} />
        <SecondaryBtn label="Search again" onClick={onSearch} />
      </div>
    </div>
  );
}

export function BookingHandoffFailedScreen({ onRetry, onCopy, onBack }: { onRetry: () => void; onCopy: () => void; onBack: () => void }) {
  return (
    <EmptyStateShell
      icon={<div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center"><AlertCircle size={32} className="text-red-500" /></div>}
      title="Provider unavailable"
      body="Could not open TAP Air Portugal. The provider's website may be temporarily down."
    >
      <PrimaryBtn label="Retry" onClick={onRetry} />
      <SecondaryBtn label="Copy booking details" onClick={onCopy} />
      <button onClick={onBack} className="w-full text-[13px] text-muted-foreground font-medium">Return to results</button>
    </EmptyStateShell>
  );
}

export function LoyaltyBalanceUnavailableScreen({ onOpen, onRefresh, onManual }: { onOpen: () => void; onRefresh: () => void; onManual: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5"><Star size={24} className="text-muted-foreground" /></div>
        <h2 className="text-[22px] font-bold mb-2">Balance unavailable</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">Could not fetch your TAP Miles&Go balance. Last known: 12,450 points (28 Jun 2026).</p>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Open TAP Miles&Go" onClick={onOpen} />
        <SecondaryBtn label="Refresh" onClick={onRefresh} />
        <button onClick={onManual} className="w-full text-[13px] text-muted-foreground font-medium">Enter balance manually</button>
      </div>
    </div>
  );
}

export function ExpenseSyncConflictScreen({ onLocal, onShared, onMerge }: { onLocal: () => void; onShared: () => void; onMerge: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><ArrowLeftRight size={20} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Expense sync conflict</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Two versions of this expense exist.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 px-5 mb-5">
          {[
            { label: "Your version", amount: "€72.40", note: "Edited offline · 30 Jun", cls: "bg-sky-50 border-sky-200" },
            { label: "Shared version", amount: "€68.40", note: "James updated · 30 Jun", cls: "bg-muted/50 border-border" },
          ].map((v) => (
            <div key={v.label} className={cn("border rounded-3xl p-4", v.cls)}>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">{v.label}</p>
              <p className="font-bold text-[22px]">{v.amount}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{v.note}</p>
            </div>
          ))}
        </div>
        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Keep my version (€72.40)" onClick={onLocal} />
          <SecondaryBtn label="Keep shared version (€68.40)" onClick={onShared} />
          <button onClick={onMerge} className="w-full h-[46px] border border-border rounded-2xl text-[14px] font-semibold text-muted-foreground">Merge manually</button>
        </div>
      </div>
    </Scroll>
  );
}

export function WalletLockedScreen({ onUnlock, onCancel }: { onUnlock: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2B3A] items-center justify-center px-8 text-center" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6"><Lock size={36} className="text-white" /></div>
      <h2 className="text-[24px] font-bold text-white mb-2">Wallet locked</h2>
      <p className="text-white/60 text-[13px] leading-relaxed mb-2">Payment details and membership numbers are protected.</p>
      <p className="text-white/40 text-[11px] mb-10">Locked automatically when app enters background.</p>
      <div className="w-full space-y-3">
        <button onClick={onUnlock} className="w-full h-[52px] bg-[#E07B5A] text-white rounded-2xl font-bold text-[15px] active:opacity-90">Unlock with Face ID</button>
        <button onClick={onUnlock} className="w-full h-[48px] bg-white/10 text-white rounded-2xl font-semibold text-[14px]">Use device passcode</button>
        <button onClick={onCancel} className="text-white/50 text-[13px] font-medium">Cancel</button>
      </div>
    </div>
  );
}

export function ReceiptUnreadableScreen({ onManual, onRetake, onImport, onSaveOnly }: { onManual: () => void; onRetake: () => void; onImport: () => void; onSaveOnly: () => void }) {
  return (
    <Scroll>
      <div className="pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
        <div className="px-5 pt-5 pb-4">
          <div className="mx-0 h-32 bg-muted rounded-3xl flex items-center justify-center mb-4 opacity-50"><Receipt size={32} className="text-muted-foreground" /></div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><AlertCircle size={22} className="text-amber-600" /></div>
          <h1 className="text-[22px] font-bold">Receipt unreadable</h1>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">The image is too blurry or the text is unclear. Amount, merchant and date could not be detected.</p>
        </div>
        <div className="mx-5 space-y-2">
          <PrimaryBtn label="Enter details manually" onClick={onManual} />
          <SecondaryBtn label="Retake photo" onClick={onRetake} />
          <button onClick={onImport} className="w-full h-[46px] border border-border rounded-2xl font-semibold text-[14px]">Import another image</button>
          <button onClick={onSaveOnly} className="w-full text-[13px] text-muted-foreground font-medium">Save receipt image only</button>
        </div>
      </div>
    </Scroll>
  );
}

export function SplitNotBalancedScreen({ onFix, onCancel }: { onFix: () => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5"><AlertCircle size={24} className="text-red-500" /></div>
        <h2 className="text-[22px] font-bold mb-2">Split doesn't balance</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">The individual amounts don't add up to the total expense.</p>
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm mb-5">
          {[
            { label: "Expense total", value: "€68.40" },
            { label: "Allocated", value: "€60.00" },
            { label: "Remaining", value: "€8.40", red: true },
          ].map((row, i, arr) => (
            <div key={row.label} className={cn("flex justify-between px-5 py-3.5", i < arr.length - 1 && "border-b border-border")}>
              <span className="text-[13px] text-muted-foreground">{row.label}</span>
              <span className={cn("text-[13px] font-bold", (row as any).red && "text-red-600")}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <PrimaryBtn label="Fix split" onClick={onFix} />
        <SecondaryBtn label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export function SponsoredDisclosureScreen({ onContinue, onHide, onTransparency }: { onContinue: () => void; onHide: () => void; onTransparency: () => void }) {
  return (
    <div className="flex flex-col h-full px-5 pt-8 pb-10" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4"><SponsoredLabel /><p className="text-[13px] font-semibold">Sponsored result</p></div>
        <h2 className="text-[20px] font-bold mb-3">Why is this sponsored?</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">easyJet has paid to appear in a highlighted position in Onward's flight results. Sponsored results are always labelled and do not replace relevant organic results.</p>

        <div className="bg-card border border-border rounded-3xl p-4 mb-4 shadow-sm">
          <p className="font-semibold text-[14px] mb-0.5">easyJet · U28843</p>
          <p className="text-[12px] text-muted-foreground">Porto → London · €89 · Sponsored placement</p>
        </div>

        <div className="bg-muted rounded-2xl p-3.5">
          <p className="text-[11px] text-muted-foreground leading-relaxed">Onward receives a fee for this placement. The price shown is the same as on the provider's website. <button onClick={onTransparency} className="underline font-semibold">Commercial transparency →</button></p>
        </div>
      </div>
      <div className="space-y-2.5 mt-6">
        <PrimaryBtn label="Continue to result" onClick={onContinue} />
        <SecondaryBtn label="Hide this sponsored result" onClick={onHide} />
      </div>
    </div>
  );
}
