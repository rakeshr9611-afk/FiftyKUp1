import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const COLORS = ["#D4A843","#4CAF7D","#F0C75A","#CE93D8","#6B8ED4","#80CBC4","#FF8A65","#F87171"];

export default function Stack() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stack, setStack] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
  }, [status]);

  useEffect(() => {
    const s = localStorage.getItem("fku_stack");
    if (s) setStack(JSON.parse(s));
    const b = localStorage.getItem("fku_bills");
    if (b) setBills(JSON.parse(b));
  }, []);

  if (status === "loading" || !session) return null;

  function save(updated) { setStack(updated); localStorage.setItem("fku_stack", JSON.stringify(updated)); }
  function updateMonthly(id, val) { save(stack.map(s => s.id === id ? { ...s, monthly: Number(val) } : s)); }
  function removeItem(id) { save(stack.filter(s => s.id !== id)); }

  const totalIncome = stack.reduce((sum, s) => sum + (s.monthly || 0), 0);
  const totalBills = bills.reduce((sum, b) => sum + (b.amount || 0), 0);
  const netMonthly = totalIncome - totalBills;

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <main style={S.main}>
        <h1 style={S.h1}>Stack <span style={{ color: "#D4A843" }}>Planner</span></h1>
        <p style={S.sub}>Adjust each stream's expected monthly earnings. Net = Income − Bills.</p>

        {stack.length === 0 ? (
          <div style={S.empty}>
            <p style={{ color: "#555", marginBottom: "16px" }}>No income methods added yet.</p>
            <button style={S.goldBtn} onClick={() => router.push("/methods")}>Browse Methods →</button>
          </div>
        ) : (
          <>
            <div style={S.summaryRow}>
              {[["Gross Monthly", `$${totalIncome.toLocaleString()}`, "#D4A843"], ["Monthly Bills", `-$${totalBills.toLocaleString()}`, "#FF5F57"], ["Net Monthly", `$${netMonthly.toLocaleString()}`, netMonthly >= 0 ? "#4CAF7D" : "#FF5F57"]].map(([label, val, color]) => (
                <div key={label} style={S.summaryCard}>
                  <span style={S.summaryLabel}>{label}</span>
                  <span style={{ ...S.summaryNum, color }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={S.barWrap}>
              {stack.map((s, i) => {
                const pct = totalIncome > 0 ? (s.monthly / totalIncome) * 100 : 0;
                return <div key={s.id} style={{ width: `${pct}%`, background: COLORS[i % COLORS.length], height: "100%", borderRadius: i === 0 ? "8px 0 0 8px" : i === stack.length - 1 ? "0 8px 8px 0" : 0, minWidth: pct > 0 ? "4px" : 0 }} title={`${s.name}: $${s.monthly}/mo`} />;
              })}
            </div>

            <div style={S.streamList}>
              {stack.map((s, i) => (
                <div key={s.id} style={S.streamRow}>
                  <div style={{ ...S.dot, background: COLORS[i % COLORS.length] }} />
                  <span style={S.streamName}>{s.emoji} {s.name}</span>
                  <div style={S.inputWrap}>
                    <span style={{ color: "#555", fontSize: "0.9rem" }}>$</span>
                    <input type="number" min="0" value={s.monthly} onChange={e => updateMonthly(s.id, e.target.value)} style={S.input} />
                    <span style={{ color: "#555", fontSize: "0.8rem" }}>/mo</span>
                  </div>
                  <span style={{ color: "#555", fontSize: "0.8rem", width: "36px", textAlign: "right" }}>{totalIncome > 0 ? Math.round((s.monthly / totalIncome) * 100) : 0}%</span>
                  <button style={S.removeBtn} onClick={() => removeItem(s.id)}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={S.outlineBtn} onClick={() => router.push("/methods")}>+ Add More Methods</button>
              <button style={S.goldBtn} onClick={() => router.push("/timeline")}>See Timeline →</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

const S = {
  main: { maxWidth: "740px", margin: "0 auto", padding: "40px 20px 80px" },
  h1: { fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" },
  sub: { color: "#555", fontSize: "0.95rem", marginBottom: "32px" },
  empty: { textAlign: "center", padding: "60px 20px" },
  summaryRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" },
  summaryCard: { background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" },
  summaryLabel: { color: "#555", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  summaryNum: { fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.5px" },
  barWrap: { display: "flex", height: "12px", borderRadius: "8px", overflow: "hidden", background: "#111", marginBottom: "28px", gap: "2px" },
  streamList: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" },
  streamRow: { display: "flex", alignItems: "center", gap: "12px", background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "14px 16px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0 },
  streamName: { flex: 1, fontWeight: 600, fontSize: "0.9rem", minWidth: "120px" },
  inputWrap: { display: "flex", alignItems: "center", gap: "4px" },
  input: { background: "#0A0A0A", border: "1px solid #222", borderRadius: "8px", padding: "6px 10px", color: "#E8E8E8", width: "90px", fontSize: "0.95rem", textAlign: "right" },
  removeBtn: { background: "transparent", border: "none", color: "#333", fontSize: "0.85rem", padding: "4px 6px" },
  outlineBtn: { background: "transparent", border: "1px solid #222", color: "#555", borderRadius: "10px", padding: "10px 20px", fontWeight: 600, fontSize: "0.85rem" },
  goldBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: 800, fontSize: "0.9rem" },
};
