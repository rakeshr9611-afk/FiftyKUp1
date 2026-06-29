import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const GOAL = 50000;

export default function Timeline() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stack, setStack] = useState([]);
  const [bills, setBills] = useState([]);
  const [saved, setSaved] = useState(0);
  const [saveRate, setSaveRate] = useState(70);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    const raw = localStorage.getItem("fku_v4");
    if (raw) {
      const d = JSON.parse(raw);
      if (d.income) setStack(d.income);
      const rawBills = localStorage.getItem("fku_bills"); if (rawBills) setBills(JSON.parse(rawBills));
      if (d.saveRate) setSaveRate(d.saveRate);
    }
  }, [status]);

  if (status === "loading" || !session) return null;

  const totalIncome = stack.reduce((sum, s) => sum + ((parseFloat(s.weekly) || 0) * 4.33), 0);
  const totalBills = bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const netMonthly = Math.max(0, totalIncome - totalBills);
  const monthlySaved = (netMonthly * saveRate) / 100;
  const remaining = Math.max(0, GOAL - saved);
  const monthsToGoal = monthlySaved > 0 ? Math.ceil(remaining / monthlySaved) : null;
  const yearsToGoal = monthsToGoal ? (monthsToGoal / 12).toFixed(1) : null;
  const pctDone = Math.min(100, (saved / GOAL) * 100);

  const milestones = [10000, 20000, 30000, 40000, 50000].map(m => {
    const mo = monthlySaved > 0 ? Math.ceil(Math.max(0, m - saved) / monthlySaved) : null;
    if (mo === null) return null;
    const d = new Date(); d.setMonth(d.getMonth() + mo);
    return { amount: m, months: mo, date: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) };
  });

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <main style={S.main}>
        <h1 style={S.h1}><span style={{ color: "#D4A843" }}>$50K</span> Timeline</h1>
        <p style={S.sub}>See exactly when you'll hit your goal based on your stack and savings rate.</p>

        <div style={S.controlsGrid}>
          <div style={S.control}>
            <label style={S.label}>Savings Already Banked</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#555" }}>$</span>
              <input type="number" min="0" max="50000" value={saved} onChange={e => setSaved(Number(e.target.value))} style={S.input} />
            </div>
          </div>
          <div style={S.control}>
            <label style={S.label}>Monthly Save Rate: <span style={{ color: "#D4A843" }}>{saveRate}%</span></label>
            <input type="range" min="10" max="100" step="5" value={saveRate} onChange={e => setSaveRate(Number(e.target.value))} style={{ width: "100%", accentColor: "#D4A843" }} />
          </div>
        </div>

        <div style={S.summaryGrid}>
          {[["Gross Income", `$${totalIncome.toLocaleString()}/mo`, "#D4A843"], ["Monthly Bills", `-$${totalBills.toLocaleString()}/mo`, "#FF5F57"], ["Net Monthly", `$${netMonthly.toLocaleString()}/mo`, "#4CAF7D"], ["Saving/Month", `$${Math.round(monthlySaved).toLocaleString()}/mo`, "#F0C75A"]].map(([label, val, color]) => (
            <div key={label} style={S.summaryCard}>
              <span style={S.sumLabel}>{label}</span>
              <span style={{ ...S.sumVal, color }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={S.progressBlock}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Progress to $50K</span>
            <span style={{ color: "#D4A843", fontWeight: 700 }}>{pctDone.toFixed(1)}%</span>
          </div>
          <div style={{ height: "12px", background: "#111", borderRadius: "100px", overflow: "hidden", marginBottom: "10px" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #D4A843, #F0C75A)", borderRadius: "100px", width: `${pctDone}%`, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#555" }}>
            <span>${saved.toLocaleString()} saved</span>
            <span>${(GOAL - saved).toLocaleString()} to go</span>
          </div>
        </div>

        {monthsToGoal !== null ? (
          <div style={S.goalCard}>
            <div style={{ fontSize: "2rem", flexShrink: 0 }}>🎯</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "6px" }}>
                You'll hit <span style={{ color: "#D4A843" }}>$50,000</span> in{" "}
                <span style={{ color: "#4CAF7D" }}>{monthsToGoal} months</span>
                {yearsToGoal && ` (${yearsToGoal} yrs)`}
              </p>
              <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Saving ${Math.round(monthlySaved).toLocaleString()}/mo at {saveRate}% of your ${netMonthly.toLocaleString()} net income.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "28px", textAlign: "center", marginBottom: "24px" }}>
            <p style={{ color: "#555", marginBottom: "12px" }}>
              {totalIncome === 0 ? "Add income streams to your stack first." : "Increase income or lower bills to make progress."}
            </p>
            <button style={S.goldBtn} onClick={() => router.push(totalIncome === 0 ? "/methods" : "/bills")}>
              {totalIncome === 0 ? "Browse Methods →" : "Review Bills →"}
            </button>
          </div>
        )}

        {monthlySaved > 0 && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px" }}>
            <p style={{ color: "#555", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>Milestone Roadmap</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {milestones.map((m, i) => {
                if (!m) return null;
                const isPast = saved >= m.amount;
                return (
                  <div key={m.amount} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: isPast ? "#D4A843" : "#1A1A1A", border: isPast ? "2px solid #D4A843" : "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0, color: "#0A0A0A" }}>
                      {isPast && "✓"}
                    </div>
                    <div>
                      <span style={{ fontWeight: 800, color: isPast ? "#D4A843" : "#E8E8E8" }}>${m.amount.toLocaleString()}</span>
                      <span style={{ color: "#555", fontSize: "0.82rem", marginLeft: "8px" }}>{isPast ? "Reached!" : `${m.date} · ${m.months}mo`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stack.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <button style={S.goldBtn} onClick={() => router.push("/methods")}>Start by browsing methods →</button>
          </div>
        )}
      </main>
    </div>
  );
}

const S = {
  main: { maxWidth: "740px", margin: "0 auto", padding: "40px 20px 80px" },
  h1: { fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" },
  sub: { color: "#555", fontSize: "0.95rem", marginBottom: "28px" },
  controlsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" },
  control: { background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" },
  label: { color: "#555", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { flex: 1, background: "#0A0A0A", border: "1px solid #222", borderRadius: "8px", padding: "8px 12px", color: "#E8E8E8", fontSize: "1rem", fontWeight: 700 },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "24px" },
  summaryCard: { background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "14px 12px", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" },
  sumLabel: { color: "#555", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" },
  sumVal: { fontSize: "1rem", fontWeight: 900 },
  progressBlock: { background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px", marginBottom: "20px" },
  goalCard: { background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: "14px", padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "24px" },
  goldBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "10px 22px", fontWeight: 800, fontSize: "0.9rem" },
};
