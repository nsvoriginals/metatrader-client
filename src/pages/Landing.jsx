import { useState, useEffect, useRef } from "react";

const TICKERS = [
  { symbol: "BTC/USDT", price: "43,250.50", change: "+2.34%" },
  { symbol: "ETH/USDT", price: "2,641.20",  change: "+1.12%" },
  { symbol: "SOL/USDT", price: "98.44",     change: "-0.87%" },
  { symbol: "BNB/USDT", price: "312.10",    change: "+0.54%" },
  { symbol: "ADA/USDT", price: "0.5821",    change: "+3.21%" },
  { symbol: "DOGE/USDT",price: "0.0921",    change: "-1.44%" },
  { symbol: "AVAX/USDT",price: "36.78",     change: "+4.02%" },
  { symbol: "LINK/USDT",price: "14.33",     change: "+1.76%" },
  { symbol: "DOT/USDT", price: "7.44",      change: "-0.23%" },
  { symbol: "MATIC/USDT",price:"0.8912",    change: "+2.91%" },
];

const FEATURES = [
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 16L8 9L12 12.5L18 5" stroke="#00c97a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="5" r="2" fill="#00c97a"/></svg>, accent:"#00c97a", tag:"STREAMING",    title:"Live Market Data",    desc:"Real-time prices from Binance WebSocket for BTC, ETH, SOL and 7 more. Updates every 1–5 seconds." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="11" width="4" height="8" rx="1" fill="#0099cc" opacity="0.5"/><rect x="9" y="6" width="4" height="13" rx="1" fill="#0099cc" opacity="0.75"/><rect x="15" y="2" width="4" height="17" rx="1" fill="#0099cc"/></svg>, accent:"#0099cc", tag:"3 ORDER TYPES",title:"Advanced Orders",     desc:"Market, limit, and stop-loss orders with atomic execution and a full audit trail on every trade." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#d97706" strokeWidth="2"/><path d="M11 7V11L14 13" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/></svg>, accent:"#d97706", tag:"INSTANT",       title:"Instant Execution",   desc:"Market orders fill in milliseconds. Limit orders match the moment price targets are hit." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 14l4-4 3.5 3.5L17 7" stroke="#00c97a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 19h14" stroke="#00c97a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg>, accent:"#00c97a", tag:"REAL-TIME",     title:"Portfolio Analytics",  desc:"Track P&L per position, win rates, and total portfolio returns. Portfolio value updates automatically." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0099cc" strokeWidth="2"/><rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#0099cc" strokeWidth="2"/><rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#0099cc" strokeWidth="2"/><rect x="12" y="12" width="7" height="7" rx="1.5" stroke="#0099cc" strokeWidth="2" opacity="0.4"/></svg>, accent:"#0099cc", tag:"JWT + BCRYPT",  title:"Secure Auth",         desc:"JWT-based auth with bcrypt password hashing, Redis session management and rate-limited endpoints." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C7 3 4 6 4 9c0 4 7 10 7 10s7-6 7-10c0-3-3-6-7-6z" stroke="#d97706" strokeWidth="2"/><circle cx="11" cy="9" r="2.5" fill="#d97706"/></svg>, accent:"#d97706", tag:"SUB-MS CACHE",  title:"Redis Caching",       desc:"Sub-millisecond market data responses via Redis. Order book, sessions, and rate limits all cached." },
];

const STEPS = [
  { num:"01", title:"Create an account",      desc:"Sign up in seconds. No KYC, no bank details. Just an email and you're in." },
  { num:"02", title:"Get $100k virtual cash", desc:"Your account is instantly funded with $100,000 in paper money, ready to deploy." },
  { num:"03", title:"Trade live markets",     desc:"Execute real market and limit orders against live Binance prices — no simulated fills." },
  { num:"04", title:"Analyse & improve",      desc:"Review your P&L, trade history, and win rate. Iterate until your strategy is bulletproof." },
];

const STATS = [
  { value:"$100K", label:"Starting virtual balance" },
  { value:"10+",   label:"Live crypto pairs" },
  { value:"<5ms",  label:"Order execution time" },
  { value:"24/7",  label:"Market data streaming" },
];

const m = (size = 11) => ({ fontFamily:"'Disket Mono',monospace", fontSize: size });

function PulseDot({ color = "#00c97a" }) {
  return <span className="inline-block rounded-full flex-shrink-0"
    style={{ width:7, height:7, background:color, animation:"pulseDot 1.6s ease-in-out infinite" }} />;
}

function TickerBar() {
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="overflow-hidden py-1.5 border-b border-green-500/10 bg-green-500/[0.03]" style={m(11)}>
      <div style={{ display:"flex", gap:48, whiteSpace:"nowrap", animation:"ticker 32s linear infinite" }}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-gray-400 dark:text-gray-600">{t.symbol}</span>
            <span className="text-gray-800 dark:text-gray-200">{t.price}</span>
            <span style={{ color: t.change.startsWith("+") ? "#00c97a" : "#e05555" }}>{t.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b font-disket border-gray-200/70 dark:border-zinc-800/80 ${scrolled ? "bg-white/90 dark:bg-zinc-950/90" : "bg-white/60 dark:bg-zinc-950/60"}`}
      style={{ backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,#00c97a,#0099cc)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 7L9 10L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold tracking-[0.15em] text-gray-900 dark:text-gray-100" style={m(15)}>MIRAGE</span>
        </div>

        <div className="hidden md:flex items-center gap-8" style={m(12)}>
          {["Features","How it works","Markets"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/login"
            className="hidden md:block rounded-lg text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
            style={{ ...m(12), padding:"8px 16px", textDecoration:"none" }}>Log in</a>
          <a href="/register"
            className="font-bold text-white rounded-lg"
            style={{ ...m(12), padding:"8px 20px", background:"linear-gradient(135deg,#00c97a,#0099cc)", textDecoration:"none" }}>Start Free →</a>
        </div>
      </div>
    </nav>
  );
}

function HeroCard() {
  const bars = [30,45,35,60,50,70,65,80,90,100];
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800"
      style={{ boxShadow:"0 40px 100px rgba(0,201,122,0.08)", animation:"float 4.5s ease-in-out infinite" }}>

      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex gap-1.5">
          {["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background:c }}/>)}
        </div>
        <span className="text-gray-400 dark:text-gray-600" style={m(11)}>portfolio · overview</span>
        <div className="flex items-center gap-1.5" style={{ ...m(11), color:"#00c97a" }}><PulseDot /> LIVE</div>
      </div>

      <div className="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800">
        {[
          { label:"TOTAL VALUE", val:"$105,340", sub:"+5.34% all time", green:true },
          { label:"CASH",        val:"$62,500",  sub:"available",        green:false },
          { label:"TODAY P&L",   val:"+$2,140",  sub:"+2.07%",           green:true },
        ].map((s,i) => (
          <div key={i} className={`px-4 py-4 ${i<2 ? "border-r border-gray-100 dark:border-zinc-800" : ""}`}>
            <div className="text-gray-400 dark:text-gray-600 mb-1" style={m(10)}>{s.label}</div>
            <div className="text-gray-900 dark:text-gray-100 font-bold" style={m(18)}>{s.val}</div>
            <div className="mt-0.5" style={{ ...m(10), color: s.green ? "#00c97a" : undefined,
              ...(s.green ? {} : {}) }}>
              <span className={s.green ? "" : "text-gray-400 dark:text-gray-600"}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 p-5">
        <div className="flex items-end gap-1 flex-1" style={{ height:60 }}>
          {bars.map((h,i) => (
            <div key={i} className="flex-1 rounded-sm" style={{
              height:`${h}%`,
              background: i===bars.length-1 ? "#00c97a" : `rgba(0,201,122,${0.10+i*0.04})`,
              animation:`growBar 0.8s ease ${i*0.07}s both`, transformOrigin:"bottom",
            }}/>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-36">
          {[["BTC","+3.2%",true],["ETH","+1.8%",true],["SOL","-0.4%",false],["AVAX","+2.1%",true]].map(([sym,chg,up]) => (
            <div key={sym} className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-600" style={m(11)}>{sym}</span>
              <span style={{ ...m(11), color: up ? "#00c97a" : "#e05555" }}>{chg}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height:1, background:"linear-gradient(90deg,transparent,#00c97a,#0099cc,transparent)", backgroundSize:"200% 100%", animation:"borderBeam 3s linear infinite" }}/>
    </div>
  );
}

function FeatureCard({ feat, index }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold:0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className="rounded-2xl p-6 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 transition-all duration-300 cursor-default"
      style={{
        opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(32px)",
        transition:`opacity .6s ease ${index*.08}s, transform .6s ease ${index*.08}s, border-color .25s, box-shadow .25s`,
      }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=feat.accent+"55";e.currentTarget.style.boxShadow=`0 20px 60px ${feat.accent}18`;e.currentTarget.style.transform="translateY(-4px)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="";e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background:feat.accent+"18" }}>
        {feat.icon}
      </div>
      <h3 className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">{feat.title}</h3>
      <p className="text-gray-500 dark:text-gray-500 mb-4" style={{ ...m(11), lineHeight:1.8 }}>{feat.desc}</p>
      <span className="inline-block px-2 py-1 rounded" style={{ ...m(10), background:feat.accent+"18", color:feat.accent }}>{feat.tag}</span>
    </div>
  );
}

function Reveal({ children, delay=0 }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:`opacity .7s ease ${delay}s, transform .7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{`
        @keyframes ticker      { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
        @keyframes pulseDot    { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)} }
        @keyframes float       { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
        @keyframes growBar     { from{transform:scaleY(0)}to{transform:scaleY(1)} }
        @keyframes borderBeam  { 0%{background-position:0% 50%}100%{background-position:200% 50%} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
        @keyframes scrollBounce{ 0%,100%{transform:translateY(0);opacity:1}60%{transform:translateY(8px);opacity:.3} }
        @keyframes orbit       { from{transform:rotate(0deg) translateX(140px) rotate(0deg)}to{transform:rotate(360deg) translateX(140px) rotate(-360deg)} }
        @keyframes orbit2      { from{transform:rotate(180deg) translateX(100px) rotate(-180deg)}to{transform:rotate(540deg) translateX(100px) rotate(-540deg)} }
        .fade-1{animation:fadeUp .8s ease .10s both}
        .fade-2{animation:fadeUp .8s ease .25s both}
        .fade-3{animation:fadeUp .8s ease .40s both}
        .fade-4{animation:fadeUp .8s ease .55s both}
        .fade-5{animation:fadeUp .8s ease .70s both}
        .lp-grid { background-image: linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px); background-size:64px 64px; }
        .dark .lp-grid { background-image: linear-gradient(rgba(0,201,122,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,122,.03) 1px,transparent 1px); }
        /* stats gradient flips in dark */
        .stat-val { background: linear-gradient(135deg,#111827 30%,#00c97a 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .dark .stat-val { background: linear-gradient(135deg,#e8edf5 30%,#00c97a 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
      `}</style>

      <div className="lp-grid min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors font-disket">
    

        {/* Ticker */}
        <div className="fixed left-0 right-0 z-40 mt-10" style={{ top:61 }}>
          <TickerBar />
        </div>

        {/* ─── HERO ──────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center pt-36 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute rounded-full" style={{ top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:800,background:"radial-gradient(circle,rgba(0,201,122,.07) 0%,transparent 65%)",filter:"blur(40px)" }}/>
            <div className="absolute rounded-full" style={{ top:"30%",right:"-10%",width:400,height:400,background:"radial-gradient(circle,rgba(0,153,204,.05) 0%,transparent 70%)",filter:"blur(60px)" }}/>
          </div>
          <div className="absolute pointer-events-none" style={{ top:"50%",left:"50%",width:1,height:1 }}>
            <div className="absolute rounded-full" style={{ width:6,height:6,background:"#00c97a",opacity:.3,animation:"orbit 10s linear infinite" }}/>
            <div className="absolute rounded-full" style={{ width:4,height:4,background:"#0099cc",opacity:.25,animation:"orbit2 14s linear infinite" }}/>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="fade-1 inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border"
                  style={{ background:"rgba(0,201,122,.07)", borderColor:"rgba(0,201,122,.2)", ...m(11), color:"#00c97a" }}>
                  <PulseDot /> LIVE MARKET DATA · ZERO RISK
                </div>

                <h1 className="fade-2 font-extrabold leading-none tracking-tight mb-6 text-gray-900 dark:text-gray-100"
                  style={{ fontSize:"clamp(2.8rem,6vw,5rem)" }}>
                  Trade like a pro.<br />
                  <span style={{ background:"linear-gradient(135deg,#00c97a,#0099cc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    Risk nothing.
                  </span>
                </h1>

                <p className="fade-3 mb-10 text-gray-500 dark:text-gray-500" style={{ maxWidth:420, ...m(13), lineHeight:2 }}>
                  Mirage gives you{" "}
                  <span className="text-gray-900 dark:text-gray-100 font-bold">$100,000 virtual cash</span>
                  {" "}and live crypto prices to sharpen your strategy — before real money is ever on the line.
                </p>

                <div className="fade-4 flex flex-col sm:flex-row gap-3">
                  <a href="/profile"
                    className="inline-flex items-center justify-center font-bold text-white rounded-xl transition-all"
                    style={{ ...m(13), padding:"14px 28px", background:"linear-gradient(135deg,#00c97a,#0099cc)", textDecoration:"none" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,201,122,.32)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                    → Start with $100k Free
                  </a>
                  <a href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
                    style={{ ...m(13), padding:"14px 28px", textDecoration:"none" }}>
                    See how it works
                  </a>
                </div>

                <div className="fade-5 flex items-center gap-4 mt-8 text-gray-400 dark:text-gray-600" style={m(11)}>
                  {["No credit card","No KYC","Free forever"].map(t=>(
                    <span key={t} className="flex items-center gap-1.5">
                      <span style={{ color:"#00c97a" }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="fade-5 hidden lg:block"><HeroCard /></div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 dark:text-gray-700"
            style={{ ...m(10), animation:"scrollBounce 2s ease-in-out infinite" }}>
            <span>scroll</span>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </section>

        {/* ─── STATS ─────────────────────────────────── */}
        <section className="py-16 px-6 border-t border-b border-gray-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s,i) => (
              <Reveal key={i} delay={i*.08}>
                <div className="text-center">
                  <div className="stat-val font-extrabold mb-1" style={{ fontSize:"clamp(2rem,5vw,3rem)", ...m() }}>{s.value}</div>
                  <div className="text-gray-400 dark:text-gray-600" style={m(11)}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ──────────────────────────────── */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <div style={{ ...m(11), color:"#00c97a", marginBottom:12 }}>// PLATFORM FEATURES</div>
                <h2 className="font-extrabold mb-4 text-gray-900 dark:text-gray-100" style={{ fontSize:"clamp(2rem,4vw,3.2rem)", lineHeight:1.15 }}>
                  Everything a real<br />trading desk needs.
                </h2>
                <p className="text-gray-500 dark:text-gray-500" style={{ ...m(13), maxWidth:400, margin:"0 auto", lineHeight:2 }}>
                  Professional-grade tools. Zero financial risk.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f,i) => <FeatureCard key={i} feat={f} index={i} />)}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ──────────────────────────── */}
        <section id="how-it-works" className="py-24 px-6 bg-gray-100 dark:bg-black">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <div style={{ ...m(11), color:"#0099cc", marginBottom:12 }}>// HOW IT WORKS</div>
                <h2 className="font-extrabold text-gray-900 dark:text-gray-100" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
                  Up and trading in{" "}
                  <span style={{ background:"linear-gradient(135deg,#00c97a,#0099cc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>4 steps.</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4">
              {STEPS.map((s,i) => (
                <Reveal key={i} delay={i*.1}>
                  <div className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold"
                      style={{ background:"rgba(0,201,122,.08)", border:"1px solid rgba(0,201,122,.18)", ...m(13), color:"#00c97a" }}>
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100" style={{ fontSize:16 }}>{s.title}</h3>
                      <p className="text-gray-500 dark:text-gray-500" style={{ ...m(11), lineHeight:1.9 }}>{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MARKETS ───────────────────────────────── */}
        <section id="markets" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <div style={{ ...m(11), color:"#d97706", marginBottom:12 }}>// LIVE MARKETS</div>
                <h2 className="font-extrabold text-gray-900 dark:text-gray-100" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>
                  Top 10 pairs, streaming now.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={.15}>
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
                <div className="grid grid-cols-4 px-6 py-3 border-b border-gray-100 dark:border-zinc-800 text-gray-400 dark:text-gray-600" style={m(10)}>
                  <span>PAIR</span><span className="text-right">PRICE</span>
                  <span className="text-right">24H CHANGE</span><span className="text-right">STATUS</span>
                </div>
                {TICKERS.map((t,i) => (
                  <div key={i}
                    className={`grid grid-cols-4 px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900 ${i<TICKERS.length-1 ? "border-b border-gray-100 dark:border-zinc-800" : ""}`}>
                    <span className="font-bold text-gray-900 dark:text-gray-100" style={m(12)}>{t.symbol}</span>
                    <span className="text-right text-gray-600 dark:text-gray-300" style={m(12)}>{t.price}</span>
                    <span className="text-right font-bold" style={{ ...m(12), color:t.change.startsWith("+")?"#00c97a":"#e05555" }}>{t.change}</span>
                    <span className="text-right flex items-center justify-end gap-1.5" style={{ ...m(10), color:"#00c97a" }}>
                      <PulseDot /> LIVE
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="rounded-3xl p-12 text-center relative overflow-hidden border"
                style={{ background:"linear-gradient(135deg,rgba(0,201,122,.06),rgba(0,153,204,.04))", borderColor:"rgba(0,201,122,.2)" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"radial-gradient(ellipse at center,rgba(0,201,122,.05) 0%,transparent 70%)" }}/>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-4" style={{ ...m(11), color:"#00c97a" }}>
                    <PulseDot /> READY TO START?
                  </div>
                  <h2 className="font-extrabold mb-4 text-gray-900 dark:text-gray-100" style={{ fontSize:"clamp(2rem,4vw,3rem)", lineHeight:1.2 }}>
                    Your $100,000 is<br />
                    <span style={{ background:"linear-gradient(135deg,#00c97a,#0099cc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                      waiting for you.
                    </span>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-500 mb-8" style={{ ...m(12), lineHeight:2 }}>
                    No credit card. No KYC. Just create an account and start trading against live markets.
                  </p>
                  <a href="/profile"
                    className="inline-flex items-center font-bold text-white rounded-xl transition-all"
                    style={{ ...m(14), padding:"16px 36px", background:"linear-gradient(135deg,#00c97a,#0099cc)", textDecoration:"none" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 20px 60px rgba(0,201,122,.32)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                    → Launch Mirage Free
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── FOOTER ────────────────────────────────── */}
        <footer className="border-t border-gray-200 dark:border-zinc-800" style={{ padding:"32px 24px" }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
             
              <span className="font-bold tracking-[0.15em] text-gray-900 dark:text-gray-100" style={m(13)}>MIRAGE</span>
            </div>
            <div className="text-gray-400 dark:text-gray-600" style={m(11)}>
              © 2024 Mirage · Paper trading. Real markets. Zero risk.
            </div>
            <div className="flex gap-6" style={m(11)}>
              {["GitHub","Docs","MIT License"].map(l=>(
                <a key={l} href="#" className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}