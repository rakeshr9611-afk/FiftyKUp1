import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const METHODS = [
  { id:1,  name:"Web Design",              cat:"Freelancing", low:500,  high:2500, time:"5–10h/wk",  start:"This week",   emoji:"🖥️" },
  { id:2,  name:"Social Media Management", cat:"Freelancing", low:300,  high:1200, time:"3–6h/wk",   start:"This week",   emoji:"📱" },
  { id:3,  name:"Copywriting",             cat:"Freelancing", low:400,  high:1800, time:"4–8h/wk",   start:"This week",   emoji:"✍️" },
  { id:4,  name:"Video Editing",           cat:"Freelancing", low:300,  high:1500, time:"5–10h/wk",  start:"This week",   emoji:"🎬" },
  { id:5,  name:"Tutoring",                cat:"Services",    low:200,  high:900,  time:"3–8h/wk",   start:"This week",   emoji:"📐" },
  { id:6,  name:"Photography",             cat:"Services",    low:300,  high:1500, time:"Weekends",  start:"2–4 weeks",   emoji:"📷" },
  { id:7,  name:"Content Creation",        cat:"Creator",     low:0,    high:3000, time:"5–15h/wk",  start:"This week",   emoji:"🎥" },
  { id:8,  name:"Dropshipping",            cat:"eCommerce",   low:0,    high:2000, time:"10–20h/wk", start:"1–2 weeks",   emoji:"📦" },
  { id:9,  name:"Amazon FBA",              cat:"eCommerce",   low:300,  high:3000, time:"5–10h/wk",  start:"2–4 weeks",   emoji:"🛒" },
  { id:10, name:"Reselling / Flipping",    cat:"eCommerce",   low:200,  high:1200, time:"4–8h/wk",   start:"This week",   emoji:"🔄" },
  { id:11, name:"Graphic Design",          cat:"Freelancing", low:300,  high:2000, time:"5–10h/wk",  start:"This week",   emoji:"🎨" },
  { id:12, name:"Email Marketing",         cat:"Freelancing", low:400,  high:2000, time:"4–8h/wk",   start:"1–2 weeks",   emoji:"📧" },
  { id:13, name:"Cold Outreach Agency",    cat:"Agency",      low:500,  high:3000, time:"10–15h/wk", start:"1–2 weeks",   emoji:"📞" },
  { id:14, name:"AI Tools Consulting",     cat:"Agency",      low:500,  high:2500, time:"5–10h/wk",  start:"This week",   emoji:"🤖" },
  { id:15, name:"Delivery / DoorDash",     cat:"Gig",         low:200,  high:800,  time:"Flexible",  start:"This week",   emoji:"🚗" },
  { id:16, name:"TaskRabbit / Handy",      cat:"Gig",         low:200,  high:1000, time:"Weekends",  start:"This week",   emoji:"🔧" },
  { id:17, name:"Affiliate Marketing",     cat:"Passive",     low:0,    high:1500, time:"5h/wk",     start:"2–4 weeks",   emoji:"🔗" },
  { id:18, name:"Digital Products",        cat:"Passive",     low:0,    high:2000, time:"10h setup", start:"1–2 weeks",   emoji:"💾" },
  { id:19, name:"Online Courses",          cat:"Passive",     low:0,    high:2500, time:"20h setup", start:"2–4 weeks",   emoji:"🎓" },
  { id:20, name:"Notary Signing Agent",    cat:"Services",    low:300,  high:1200, time:"Weekends",  start:"1–2 months",  emoji:"📜" },
];

const CATS = ["All", ...Array.from(new Set(METHODS.map(m => m.cat)))];
const CAT_COLORS = { Freelancing:"#D4A843", Services:"#4CAF7D", Creator:"#F87171", eCommerce:"#F0C75A", Agency:"#CE93D8", Gig:"#80CBC4", Passive:"#FF8A65" };

export default function Methods() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [added, setAdded] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    const saved = localStorage.getItem("fku_stack");
    if (saved) setAdded(JSON.parse(saved).map(s => s.id));
  }, [status]);

  if (status === "loading" || !session) return null;

  const filtered = filter === "All" ? METHODS : METHODS.filter(m => m.cat === filter);

  function toggleAdd(method) {
    const existing = JSON.parse(localStorage.getItem("fku_stack") || "[]");
    const isIn = existing.find(s => s.id === method.id);
    const updated = isIn
      ? existing.filter(s => s.id !== method.id)
      : [...existing, { ...method, monthly: Math.round((method.low + method.high) / 2), hours: 10 }];
    localStorage.setItem("fku_stack", JSON.stringify(updated));
    setAdded(updated.map(s => s.id));
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <main style={S.main}>
        <h1 style={S.h1}>Income Methods <span style={{ color: "#D4A843" }}>Library</span></h1>
        <p style={S.sub}>20+ ways to earn — pick what fits your schedule and add to your stack.</p>
        <div style={S.filters}>
          {CATS.map(c => (
            <button key={c} style={{ ...S.filterBtn, ...(filter === c ? S.filterActive : {}) }} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div style={S.grid}>
          {filtered.map(m => {
            const isAdded = added.includes(m.id);
            const color = CAT_COLORS[m.cat] || "#D4A843";
            return (
              <div key={m.id} style={{ ...S.card, ...(isAdded ? { borderColor: color } : {}) }}>
                <div style={S.cardTop}>
                  <span style={{ fontSize: "1.6rem" }}>{m.emoji}</span>
                  <span style={{ ...S.catBadge, color, borderColor: `${color}40`, background: `${color}10` }}>{m.cat}</span>
                </div>
                <h3 style={S.cardName}>{m.name}</h3>
                <div style={S.meta}>
                  <span style={{ color: "#D4A843", fontWeight: 700, fontSize: "0.82rem" }}>${m.low.toLocaleString()}–${m.high.toLocaleString()}/mo</span>
                  <span style={{ color: "#333" }}>·</span>
                  <span style={{ color: "#555", fontSize: "0.78rem" }}>{m.time}</span>
                  <span style={{ color: "#333" }}>·</span>
                  <span style={{ color: "#555", fontSize: "0.78rem" }}>🟢 {m.start}</span>
                </div>
                <button
                  style={{ ...S.addBtn, background: isAdded ? `${color}20` : "transparent", color: isAdded ? color : "#555", borderColor: isAdded ? color : "#222" }}
                  onClick={() => toggleAdd(m)}
                >
                  {isAdded ? "✓ Added to Stack" : "+ Add to Stack"}
                </button>
              </div>
            );
          })}
        </div>
        {added.length > 0 && (
          <div style={S.stackBar}>
            <span>{added.length} method{added.length !== 1 ? "s" : ""} in your stack</span>
            <button style={S.stackBtn} onClick={() => router.push("/stack")}>View Stack →</button>
          </div>
        )}
      </main>
    </div>
  );
}

const S = {
  main: { maxWidth: "960px", margin: "0 auto", padding: "40px 20px 100px" },
  h1: { fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" },
  sub: { color: "#555", fontSize: "0.95rem", marginBottom: "28px" },
  filters: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" },
  filterBtn: { background: "#111", border: "1px solid #222", borderRadius: "100px", padding: "6px 16px", color: "#555", fontSize: "0.82rem", fontWeight: 600 },
  filterActive: { background: "rgba(212,168,67,0.1)", color: "#D4A843", borderColor: "#D4A843" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" },
  card: { background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s" },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  catBadge: { fontSize: "0.7rem", fontWeight: 700, border: "1px solid", borderRadius: "100px", padding: "2px 10px" },
  cardName: { fontWeight: 800, fontSize: "0.95rem" },
  meta: { display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" },
  addBtn: { border: "1px solid", borderRadius: "8px", padding: "8px 12px", fontSize: "0.8rem", fontWeight: 700, marginTop: "auto", transition: "all 0.2s" },
  stackBar: { position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#111", border: "1px solid #222", borderRadius: "100px", padding: "12px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", fontSize: "0.9rem", color: "#555", whiteSpace: "nowrap" },
  stackBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "100px", padding: "8px 18px", fontWeight: 800, fontSize: "0.85rem" },
};
