import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const PRESET_BILLS = [
  { id:"rent",    label:"Rent",          emoji:"🏠", amount:0 },
  { id:"food",    label:"Food/Groceries",emoji:"🍔", amount:0 },
  { id:"phone",   label:"Phone",         emoji:"📱", amount:0 },
  { id:"sub",     label:"Subscriptions", emoji:"📺", amount:0 },
  { id:"trans",   label:"Transport",     emoji:"🚌", amount:0 },
  { id:"tuition", label:"Tuition",       emoji:"🎓", amount:0 },
  { id:"gym",     label:"Gym",           emoji:"💪", amount:0 },
  { id:"misc",    label:"Miscellaneous", emoji:"📦", amount:0 },
];

export default function Bills() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bills, setBills] = useState(PRESET_BILLS);
  const [custom, setCustom] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAmt, setNewAmt] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    const saved = localStorage.getItem("fku_bills");
    if (saved) {
      const parsed = JSON.parse(saved);
      const presets = parsed.filter(b => PRESET_BILLS.find(p => p.id === b.id));
      const customs = parsed.filter(b => !PRESET_BILLS.find(p => p.id === b.id));
      setBills(PRESET_BILLS.map(p => ({ ...p, amount: presets.find(x => x.id === p.id)?.amount || 0 })));
      setCustom(customs);
    }
  }, [status]);

  function saveBills(b, c) { localStorage.setItem("fku_bills", JSON.stringify([...b, ...c])); }
  function updateBill(id, val) { const updated = bills.map(b => b.id === id ? { ...b, amount: Number(val) || 0 } : b); setBills(updated); saveBills(updated, custom); }
  function addCustom() {
    if (!newName.trim() || !newAmt) return;
    const newBill = { id: `custom_${Date.now()}`, label: newName, emoji: "💸", amount: Number(newAmt) };
    const updated = [...custom, newBill];
    setCustom(updated); saveBills(bills, updated); setNewName(""); setNewAmt("");
  }
  function removeCustom(id) { const updated = custom.filter(c => c.id !== id); setCustom(updated); saveBills(bills, updated); }

  if (status === "loading" || !session) return null;

  const totalBills = [...bills, ...custom].reduce((sum, b) => sum + (b.amount || 0), 0);
  const stack = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("fku_stack") || "[]" : "[]");
  const totalIncome = stack.reduce((sum, s) => sum + (s.monthly || 0), 0);
  const netMonthly = totalIncome - totalBills;

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <main style={S.main}>
        <h1 style={S.h1}>Bills <span style={{ color: "#6B8ED4" }}>Tracker</span></h1>
        <p style={S.sub}>Enter your monthly expenses to calculate your real net income.</p>

        <div style={S.summary}>
          {[["Gross Income", `$${totalIncome.toLocaleString()}/mo`, "#D4A843"], ["Total Bills", `-$${totalBills.toLocaleString()}/mo`, "#FF5F57"], ["Net Monthly", `$${netMonthly.toLocaleString()}/mo`, netMonthly >= 0 ? "#4CAF7D" : "#FF5F57"]].map(([label, val, color], i, arr) => (
            <>
              {i > 0 && <span key={`sep${i}`} style={{ color: "#333", fontSize: "1.4rem", fontWeight: 300 }}>{i === 1 ? "−" : "="}</span>}
              <div key={label} style={S.sumItem}>
                <span style={S.sumLabel}>{label}</span>
                <span style={{ ...S.sumVal, color }}>{val}</span>
              </div>
            </>
          ))}
        </div>

        <div style={S.grid}>
          {bills.map(b => (
            <div key={b.id} style={S.billCard}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.4rem" }}>{b.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{b.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#555", fontSize: "0.9rem" }}>$</span>
                <input type="number" min="0" placeholder="0" value={b.amount || ""} onChange={e => updateBill(b.id, e.target.value)} style={S.input} />
                <span style={{ color: "#555", fontSize: "0.75rem" }}>/mo</span>
              </div>
            </div>
          ))}
        </div>

        {custom.length > 0 && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <p style={S.sectionTitle}>Custom Bills</p>
            {custom.map(c => (
              <div key={c.id} style={S.customRow}>
                <span>{c.emoji}</span>
                <span style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem" }}>{c.label}</span>
                <span style={{ color: "#FF5F57", fontWeight: 700 }}>${c.amount.toLocaleString()}/mo</span>
                <button style={{ background: "transparent", border: "none", color: "#333", fontSize: "0.85rem" }} onClick={() => removeCustom(c.id)}>✕</button>
              </div>
            ))}
          </div>
        )}

        <div style={S.addCustom}>
          <p style={S.sectionTitle}>Add Custom Bill</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input style={S.nameInput} placeholder="Bill name" value={newName} onChange={e => setNewName(e.target.value)} />
            <input style={S.amtInput} type="number" placeholder="Amount" value={newAmt} onChange={e => setNewAmt(e.target.value)} />
            <button style={S.addBtn} onClick={addCustom}>Add</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
          <button style={S.outlineBtn} onClick={() => router.push("/stack")}>← Stack</button>
          <button style={S.goldBtn} onClick={() => router.push("/timeline")}>See Timeline →</button>
        </div>
      </main>
    </div>
  );
}

const S = {
  main: { maxWidth: "740px", margin: "0 auto", padding: "40px 20px 80px" },
  h1: { fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" },
  sub: { color: "#555", fontSize: "0.95rem", marginBottom: "28px" },
  summary: { display: "flex", alignItems: "center", gap: "16px", background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px 24px", marginBottom: "28px", flexWrap: "wrap" },
  sumItem: { display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: "100px" },
  sumLabel: { color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 },
  sumVal: { fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-0.5px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" },
  billCard: { background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" },
  input: { flex: 1, background: "#0A0A0A", border: "1px solid #222", borderRadius: "8px", padding: "7px 10px", color: "#E8E8E8", fontSize: "0.95rem", minWidth: 0 },
  sectionTitle: { color: "#555", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" },
  customRow: { display: "flex", alignItems: "center", gap: "12px", background: "#111", border: "1px solid #222", borderRadius: "10px", padding: "12px 16px", marginBottom: "8px" },
  addCustom: { background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px" },
  nameInput: { flex: 2, background: "#0A0A0A", border: "1px solid #222", borderRadius: "8px", padding: "10px 14px", color: "#E8E8E8", fontSize: "0.9rem", minWidth: "120px" },
  amtInput: { flex: 1, background: "#0A0A0A", border: "1px solid #222", borderRadius: "8px", padding: "10px 14px", color: "#E8E8E8", fontSize: "0.9rem", minWidth: "80px" },
  addBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: 800, fontSize: "0.9rem" },
  outlineBtn: { background: "transparent", border: "1px solid #222", color: "#555", borderRadius: "10px", padding: "10px 20px", fontWeight: 600, fontSize: "0.85rem" },
  goldBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: 800, fontSize: "0.9rem" },
};
