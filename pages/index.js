import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const DEFAULT_INCOME = [
  { id: "job1", label: "Job / Part-time", emoji: "💼", weekly: "" },
  { id: "job2", label: "Side Hustle 1", emoji: "🔥", weekly: "" },
  { id: "job3", label: "Side Hustle 2", emoji: "⚡", weekly: "" },
  { id: "freelance", label: "Freelancing", emoji: "💻", weekly: "" },
  { id: "ecomm", label: "eCommerce / FBA", emoji: "📦", weekly: "" },
  { id: "trading", label: "Trading", emoji: "📈", weekly: "" },
  { id: "passive", label: "Passive Income", emoji: "💸", weekly: "" },
  { id: "other", label: "Other", emoji: "➕", weekly: "" },
];

const DEFAULT_PORTFOLIO = [
  { id: "checking", label: "Checking Account", emoji: "🏦", balance: "", target: "" },
  { id: "savings", label: "Savings Account", emoji: "💰", balance: "", target: "" },
  { id: "robinhood", label: "Brokerage / Robinhood", emoji: "📊", balance: "", target: "" },
  { id: "roth", label: "Roth IRA", emoji: "🏛️", balance: "", target: "" },
  { id: "crypto", label: "Crypto", emoji: "₿", balance: "", target: "" },
  { id: "mm", label: "Money Market", emoji: "💵", balance: "", target: "" },
  { id: "cd", label: "CD Account", emoji: "🔒", balance: "", target: "" },
  { id: "cash", label: "Cash", emoji: "💴", balance: "", target: "" },
];

const DEFAULT_INVEST = [
  { id: "sp500", label: "S&P 500 / VOO", emoji: "📊", pct: "55", weekly: "" },
  { id: "growth", label: "Growth / VUG", emoji: "🚀", pct: "21", weekly: "" },
  { id: "intl", label: "International / VXUS", emoji: "🌍", pct: "17", weekly: "" },
  { id: "small", label: "Small Cap / VBK", emoji: "📉", pct: "7", weekly: "" },
  { id: "roth_i", label: "Roth IRA", emoji: "🏦", pct: "", weekly: "" },
  { id: "mm_i", label: "Money Market", emoji: "💵", pct: "", weekly: "" },
];

function fmt(n) {
  const num = parseFloat(n) || 0;
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("income");
  const [goal, setGoal] = useState("50000");
  const [saveRate, setSaveRate] = useState(40);
  const [returnRate, setReturnRate] = useState(7);
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO);
  const [invest, setInvest] = useState(DEFAULT_INVEST);
  const [saveMsg, setSaveMsg] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    const d = localStorage.getItem("fku_v4");
    if (d) {
      const p = JSON.parse(d);
      if (p.income) setIncome(p.income);
      if (p.portfolio) setPortfolio(p.portfolio);
      if (p.invest) setInvest(p.invest);
      if (p.goal) setGoal(p.goal);
      if (p.saveRate) setSaveRate(p.saveRate);
      if (p.returnRate) setReturnRate(p.returnRate);
    }
  }, [status]);

  function saveAll(overrides = {}) {
    const data = { income, portfolio, invest, goal, saveRate, returnRate, ...overrides };
    localStorage.setItem("fku_v4", JSON.stringify(data));
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2000);
  }

  if (status === "loading" || !session) return <div style={{ background: "#0A0A0A", minHeight: "100vh" }} />;

  // === SHARED CALCULATIONS (single source of truth) ===
  const goalNum = parseFloat(goal) || 50000;

  // Income
  const weeklyIncome = income.reduce((s, i) => s + (parseFloat(i.weekly) || 0), 0);
  const monthlyIncome = weeklyIncome * 4.33;
  const annualIncome = weeklyIncome * 52;

  // Portfolio
  const totalPortfolio = portfolio.reduce((s, p) => s + (parseFloat(p.balance) || 0), 0);

  // Investing
  const weeklyInvest = invest.reduce((s, i) => s + (parseFloat(i.weekly) || 0), 0);
  const monthlyInvest = weeklyInvest * 4.33;

  // Savings
  const monthlySaved = monthlyIncome * (saveRate / 100);
  const remaining = Math.max(0, goalNum - totalPortfolio);
  const progress = Math.min(100, (totalPortfolio / goalNum) * 100);
  const toGo = goalNum - totalPortfolio;

  // Timeline (with investing returns)
  const monthlyRate = returnRate / 100 / 12;
  let monthsToGoal = null;
  if (monthlySaved > 0) {
    let bal = totalPortfolio;
    for (let m = 0; m <= 600; m++) {
      if (bal >= goalNum) { monthsToGoal = m; break; }
      bal = bal * (1 + monthlyRate) + monthlySaved;
    }
  }
  const monthsSimple = monthlySaved > 0 ? Math.ceil(remaining / monthlySaved) : null;

  // Monthly breakdown
  const monthlySpent = monthlyIncome - monthlySaved;
  const monthlyLeftAfterInvest = monthlySaved - monthlyInvest;

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px 100px" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg,#111 0%,#0f180f 100%)", border: "1px solid #222", borderRadius: "16px", padding: "40px", textAlign: "center", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(212,168,67,0.07), transparent 70%)", pointerEvents: "none" }} />
          <p style={{ color: "#555", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>PERSONAL PORTFOLIO · {new Date().getFullYear()}</p>
          <h1 style={{ fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 900, lineHeight: 1, marginBottom: "24px" }}>
            <span style={{ color: "#D4A843" }}>ROAD TO</span><br />
            <span style={{ color: "#E8E8E8" }}>{goalNum >= 1000 ? `${(goalNum / 1000).toFixed(0)}K` : goalNum}</span>
          </h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "20px", background: "#0A0A0A", border: "1px solid #222", borderRadius: "50px", padding: "14px 28px", marginBottom: "10px" }}>
            <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#D4A843" }}>${fmt(totalPortfolio)}</span>
            <span style={{ color: "#333", fontSize: "1.2rem" }}>→</span>
            <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#444" }}>${fmt(goalNum)}</span>
          </div>
          <p style={{ color: "#666", fontWeight: 600, marginBottom: "20px" }}>${fmt(toGo > 0 ? toGo : 0)} to go</p>
          <div style={{ background: "#111", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#555", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>PROGRESS</span>
              <span style={{ color: "#D4A843", fontWeight: 800 }}>{progress.toFixed(1)}%</span>
            </div>
            <div style={{ height: "8px", background: "#1A1A1A", borderRadius: "100px", overflow: "hidden", marginBottom: "6px" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#4CAF7D,#D4A843)", borderRadius: "100px", width: `${progress}%`, transition: "width 0.6s" }} />
            </div>
            {monthsToGoal !== null && (
              <p style={{ color: "#4CAF7D", fontSize: "0.75rem", fontWeight: 600 }}>
                At {saveRate}% save rate + {returnRate}% returns → goal in ~{monthsToGoal} months ({(monthsToGoal / 12).toFixed(1)} yrs)
              </p>
            )}
          </div>
        </div>

        {/* SETTINGS ROW - affects all tabs */}
        <div style={{ background: "#111", border: "1px solid #D4A84330", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
          <p style={{ color: "#D4A843", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>⚙ GLOBAL SETTINGS — affects all calculations</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px" }}>
            <div>
              <p style={C.label}>GOAL AMOUNT</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#555" }}>$</span>
                <input type="number" value={goal} onChange={e => setGoal(e.target.value)} onBlur={() => saveAll({ goal })}
                  style={{ ...C.bigInput, color: "#E8E8E8", fontSize: "1.4rem" }} placeholder="50000" />
              </div>
            </div>
            <div>
              <p style={C.label}>SAVE RATE: <span style={{ color: "#D4A843" }}>{saveRate}%</span></p>
              <input type="range" min="10" max="90" step="5" value={saveRate}
                onChange={e => { setSaveRate(Number(e.target.value)); saveAll({ saveRate: Number(e.target.value) }); }}
                style={{ width: "100%", accentColor: "#D4A843", marginTop: "8px" }} />
              <p style={{ color: "#4CAF7D", fontSize: "0.75rem", marginTop: "4px" }}>Saving ${Math.round(monthlySaved).toLocaleString()}/mo of ${Math.round(monthlyIncome).toLocaleString()} income</p>
            </div>
            <div>
              <p style={C.label}>AVG RETURN RATE: <span style={{ color: "#6B8ED4" }}>{returnRate}%/yr</span></p>
              <input type="range" min="0" max="15" step="0.5" value={returnRate}
                onChange={e => { setReturnRate(Number(e.target.value)); saveAll({ returnRate: Number(e.target.value) }); }}
                style={{ width: "100%", accentColor: "#6B8ED4", marginTop: "8px" }} />
              <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "4px" }}>S&P 500 historical avg ~10%/yr</p>
            </div>
          </div>
        </div>

        {/* SUMMARY ROW - all calculated from shared state */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "20px" }}>
          {[
            ["WEEKLY INCOME", `$${fmt(weeklyIncome)}`, "#D4A843", `$${fmt(weeklyIncome * 52)} /yr`],
            ["MONTHLY INCOME", `$${Math.round(monthlyIncome).toLocaleString()}`, "#4CAF7D", `${saveRate}% = $${Math.round(monthlySaved).toLocaleString()} saved`],
            ["TOTAL PORTFOLIO", `$${fmt(totalPortfolio)}`, "#6B8ED4", `${progress.toFixed(1)}% of goal`],
            ["MONTHS TO GOAL", monthsToGoal ? `${monthsToGoal}` : "—", "#F0C75A", monthsToGoal ? `${(monthsToGoal / 12).toFixed(1)} years` : "Add income first"],
          ].map(([label, val, color, sub]) => (
            <div key={label} style={C.card}>
              <p style={C.label}>{label}</p>
              <p style={{ color, fontSize: "1.2rem", fontWeight: 900, marginBottom: "2px" }}>{val}</p>
              <p style={{ color: "#444", fontSize: "0.68rem" }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={C.tabs}>
          {[["income", "💰 Income"], ["portfolio", "🏦 Portfolio"], ["invest", "📈 Investing"], ["breakdown", "📊 Breakdown"], ["course", "🎓 Course"]].map(([t, label]) => (
            <button key={t} style={{ ...C.tab, ...(tab === t ? C.tabActive : {}) }} onClick={() => setTab(t)}>{label}</button>
          ))}
        </div>

        {/* INCOME TAB */}
        {tab === "income" && (
          <div>
            <p style={C.note}>Enter weekly pay per stream → all calculations update automatically across every tab.</p>
            <div style={C.grid}>
              {income.map((s, i) => {
                const w = parseFloat(s.weekly) || 0;
                const mo = w * 4.33;
                const yr = w * 52;
                const sharePct = weeklyIncome > 0 ? (w / weeklyIncome) * 100 : 0;
                return (
                  <div key={s.id} style={C.card}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "1.2rem" }}>{s.emoji}</span>
                      <input style={C.nameInput} value={s.label}
                        onChange={e => setIncome(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                        onBlur={() => saveAll()} />
                    </div>
                    <p style={C.label}>WEEKLY</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                      <span style={{ color: "#555", fontSize: "0.85rem" }}>$</span>
                      <input type="number" placeholder="0.00" value={s.weekly}
                        onChange={e => setIncome(prev => prev.map((x, j) => j === i ? { ...x, weekly: e.target.value } : x))}
                        onBlur={() => saveAll()}
                        style={{ ...C.bigInput, color: "#D4A843", fontSize: "1.5rem" }} />
                    </div>
                    <div style={{ height: "3px", background: "#1A1A1A", borderRadius: "2px", marginBottom: "8px" }}>
                      <div style={{ height: "100%", background: "#D4A843", borderRadius: "2px", width: `${sharePct}%` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p style={C.label}>MONTHLY</p><p style={{ color: "#4CAF7D", fontWeight: 700, fontSize: "0.85rem" }}>${Math.round(mo).toLocaleString()}</p></div>
                      <div style={{ textAlign: "right" }}><p style={C.label}>YEARLY</p><p style={{ color: "#6B8ED4", fontWeight: 700, fontSize: "0.85rem" }}>${Math.round(yr).toLocaleString()}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px 20px", marginTop: "4px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div><p style={C.label}>TOTAL WEEKLY</p><p style={{ color: "#D4A843", fontSize: "1.2rem", fontWeight: 900 }}>${fmt(weeklyIncome)}</p></div>
              <div><p style={C.label}>TOTAL MONTHLY</p><p style={{ color: "#4CAF7D", fontSize: "1.2rem", fontWeight: 900 }}>${Math.round(monthlyIncome).toLocaleString()}</p></div>
              <div><p style={C.label}>TOTAL YEARLY</p><p style={{ color: "#6B8ED4", fontSize: "1.2rem", fontWeight: 900 }}>${Math.round(annualIncome).toLocaleString()}</p></div>
              <div><p style={C.label}>SAVED/MONTH ({saveRate}%)</p><p style={{ color: "#F0C75A", fontSize: "1.2rem", fontWeight: 900 }}>${Math.round(monthlySaved).toLocaleString()}</p></div>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {tab === "portfolio" && (
          <div>
            <p style={C.note}>Track where your money is sitting. Portfolio total auto-feeds into the progress bar above.</p>
            <div style={C.grid}>
              {portfolio.map((p, i) => {
                const bal = parseFloat(p.balance) || 0;
                const tgt = parseFloat(p.target) || 0;
                const pctVal = tgt > 0 ? Math.min(100, (bal / tgt) * 100) : 0;
                const hit = tgt > 0 && bal >= tgt;
                return (
                  <div key={p.id} style={{ ...C.card, borderColor: hit ? "#4CAF7D40" : "#222" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "1.2rem" }}>{p.emoji}</span>
                      <input style={C.nameInput} value={p.label}
                        onChange={e => setPortfolio(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                        onBlur={() => saveAll()} />
                    </div>
                    <p style={C.label}>BALANCE</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                      <span style={{ color: "#555", fontSize: "0.85rem" }}>$</span>
                      <input type="number" placeholder="0.00" value={p.balance}
                        onChange={e => setPortfolio(prev => prev.map((x, j) => j === i ? { ...x, balance: e.target.value } : x))}
                        onBlur={() => saveAll()}
                        style={{ ...C.bigInput, color: "#E8E8E8", fontSize: "1.5rem" }} />
                    </div>
                    <div style={{ height: "3px", background: "#1A1A1A", borderRadius: "2px", marginBottom: "8px" }}>
                      <div style={{ height: "100%", background: hit ? "#4CAF7D" : "linear-gradient(90deg,#D4A843,#F0C75A)", borderRadius: "2px", width: `${pctVal}%`, transition: "width 0.4s" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <p style={C.label}>TARGET</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <span style={{ color: "#444", fontSize: "0.75rem" }}>$</span>
                          <input type="number" placeholder="0" value={p.target}
                            onChange={e => setPortfolio(prev => prev.map((x, j) => j === i ? { ...x, target: e.target.value } : x))}
                            onBlur={() => saveAll()}
                            style={{ background: "transparent", border: "none", outline: "none", color: "#555", fontSize: "0.82rem", width: "80px" }} />
                        </div>
                      </div>
                      {hit && <span style={{ color: "#4CAF7D", fontSize: "0.7rem", fontWeight: 700 }}>✓ Target hit</span>}
                      {!hit && tgt > 0 && <span style={{ color: "#555", fontSize: "0.7rem" }}>{pctVal.toFixed(0)}%</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "#111", border: "1px solid #D4A84330", borderRadius: "12px", padding: "16px 20px", marginTop: "4px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div><p style={C.label}>TOTAL PORTFOLIO</p><p style={{ color: "#D4A843", fontSize: "1.4rem", fontWeight: 900 }}>${fmt(totalPortfolio)}</p></div>
              <div><p style={C.label}>GOAL</p><p style={{ color: "#E8E8E8", fontSize: "1.4rem", fontWeight: 900 }}>${fmt(goalNum)}</p></div>
              <div><p style={C.label}>TO GO</p><p style={{ color: "#FF5F57", fontSize: "1.4rem", fontWeight: 900 }}>${fmt(toGo > 0 ? toGo : 0)}</p></div>
              <div><p style={C.label}>PROGRESS</p><p style={{ color: "#4CAF7D", fontSize: "1.4rem", fontWeight: 900 }}>{progress.toFixed(1)}%</p></div>
            </div>
          </div>
        )}

        {/* INVEST TAB */}
        {tab === "invest" && (
          <div>
            <p style={C.note}>Log weekly investment contributions — totals feed into your breakdown calculations.</p>
            <div style={C.grid}>
              {invest.map((t, i) => {
                const w = parseFloat(t.weekly) || 0;
                const mo = w * 4.33;
                const yr = w * 52;
                return (
                  <div key={t.id} style={C.card}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "1.2rem" }}>{t.emoji}</span>
                      <span style={{ color: "#E8E8E8", fontSize: "0.85rem", fontWeight: 700 }}>{t.label}</span>
                      {t.pct && <span style={{ background: "#D4A84320", color: "#D4A843", fontSize: "0.62rem", fontWeight: 700, padding: "2px 5px", borderRadius: "3px" }}>{t.pct}%</span>}
                    </div>
                    <p style={C.label}>WEEKLY CONTRIBUTION</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                      <span style={{ color: "#555", fontSize: "0.85rem" }}>$</span>
                      <input type="number" placeholder="0.00" value={t.weekly}
                        onChange={e => setInvest(prev => prev.map((x, j) => j === i ? { ...x, weekly: e.target.value } : x))}
                        onBlur={() => saveAll()}
                        style={{ ...C.bigInput, color: "#6B8ED4", fontSize: "1.5rem" }} />
                    </div>
                    <div style={{ display: "flex", gap: "16px", borderTop: "1px solid #1A1A1A", paddingTop: "8px" }}>
                      <div><p style={C.label}>MONTHLY</p><p style={{ color: "#D4A843", fontWeight: 700 }}>${Math.round(mo).toLocaleString()}</p></div>
                      <div><p style={C.label}>YEARLY</p><p style={{ color: "#4CAF7D", fontWeight: 700 }}>${Math.round(yr).toLocaleString()}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px 20px", marginTop: "4px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div><p style={C.label}>WEEKLY INVESTING</p><p style={{ color: "#6B8ED4", fontSize: "1.2rem", fontWeight: 900 }}>${fmt(weeklyInvest)}</p></div>
              <div><p style={C.label}>MONTHLY INVESTING</p><p style={{ color: "#D4A843", fontSize: "1.2rem", fontWeight: 900 }}>${Math.round(monthlyInvest).toLocaleString()}</p></div>
              <div><p style={C.label}>YEARLY INVESTING</p><p style={{ color: "#4CAF7D", fontSize: "1.2rem", fontWeight: 900 }}>${Math.round(weeklyInvest * 52).toLocaleString()}</p></div>
            </div>
          </div>
        )}

        {/* BREAKDOWN TAB - everything connected */}
        {tab === "breakdown" && (
          <div>
            <p style={C.note}>Full picture — income, saving, investing, and timeline all from your real numbers.</p>

            {/* Monthly flow */}
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "20px", marginBottom: "14px" }}>
              <p style={{ color: "#D4A843", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>MONTHLY MONEY FLOW</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "12px" }}>
                {[
                  ["Total Monthly In", `$${Math.round(monthlyIncome).toLocaleString()}`, "#4CAF7D"],
                  [`Saved (${saveRate}%)`, `$${Math.round(monthlySaved).toLocaleString()}`, "#D4A843"],
                  ["Invested", `$${Math.round(monthlyInvest).toLocaleString()}`, "#6B8ED4"],
                  ["Spent", `$${Math.round(monthlySpent).toLocaleString()}`, "#FF5F57"],
                  ["Net after invest", `$${Math.round(monthlyLeftAfterInvest).toLocaleString()}`, "#F0C75A"],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ background: "#0A0A0A", borderRadius: "8px", padding: "12px" }}>
                    <p style={C.label}>{label}</p>
                    <p style={{ color, fontSize: "1.1rem", fontWeight: 900 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div style={{ ...C.card, textAlign: "center" }}>
                <p style={C.label}>SAVING ONLY (no returns)</p>
                <p style={{ color: "#E8E8E8", fontSize: "3rem", fontWeight: 900, margin: "12px 0", lineHeight: 1 }}>{monthsSimple || "—"}</p>
                <p style={{ color: "#555" }}>{monthsSimple ? `months · ${(monthsSimple / 12).toFixed(1)} years` : "Enter income first"}</p>
              </div>
              <div style={{ ...C.card, textAlign: "center", border: "1px solid #D4A843" }}>
                <p style={{ ...C.label, color: "#D4A843" }}>SAVING + {returnRate}% RETURNS</p>
                <p style={{ color: "#D4A843", fontSize: "3rem", fontWeight: 900, margin: "12px 0", lineHeight: 1 }}>{monthsToGoal || "—"}</p>
                <p style={{ color: "#555" }}>{monthsToGoal ? `months · ${(monthsToGoal / 12).toFixed(1)} years` : "Enter income first"}</p>
              </div>
            </div>

            {/* Milestones */}
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "20px" }}>
              <p style={{ color: "#D4A843", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>MILESTONE ROADMAP</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[goalNum * 0.1, goalNum * 0.25, goalNum * 0.5, goalNum * 0.75, goalNum].map((milestone) => {
                  const reached = totalPortfolio >= milestone;
                  let monthsToMilestone = null;
                  if (monthlySaved > 0 && !reached) {
                    let bal = totalPortfolio;
                    for (let m = 0; m <= 600; m++) {
                      if (bal >= milestone) { monthsToMilestone = m; break; }
                      bal = bal * (1 + monthlyRate) + monthlySaved;
                    }
                  }
                  const pctOfGoal = (milestone / goalNum) * 100;
                  return (
                    <div key={milestone} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: reached ? "#D4A843" : "#1A1A1A", border: reached ? "none" : "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, color: reached ? "#0A0A0A" : "#555", flexShrink: 0 }}>
                        {reached ? "✓" : ""}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 800, color: reached ? "#D4A843" : "#E8E8E8" }}>${milestone.toLocaleString()}</span>
                        <span style={{ color: "#555", fontSize: "0.78rem", marginLeft: "8px" }}>({pctOfGoal.toFixed(0)}% of goal)</span>
                      </div>
                      <span style={{ color: reached ? "#4CAF7D" : "#555", fontSize: "0.78rem", fontWeight: 600 }}>
                        {reached ? "Reached ✓" : monthsToMilestone ? `~${monthsToMilestone} months` : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* COURSE TAB */}
        {tab === "course" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <p style={{ ...C.label, marginBottom: "12px" }}>6-LESSON COURSE — $29.99</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                {[
                  { num: 1, title: "The $50K Blueprint", desc: "Mindset, math, the 3 pathways.", free: true },
                  { num: 2, title: "Your First Income Stream", desc: "Speed to $1K. 20+ methods.", free: false },
                  { num: 3, title: "Scaling to $3K–$5K/Month", desc: "Raise prices, stack skills.", free: false },
                  { num: 4, title: "Building Your Saving System", desc: "3-account setup, automation.", free: false },
                  { num: 5, title: "The Path to $50K", desc: "Income + saving + investing.", free: false },
                  { num: 6, title: "Mindset & Consistency", desc: "Why most people never get there.", free: false },
                ].map(l => (
                  <div key={l.num} style={{ ...C.card, padding: "12px", display: "flex", gap: "10px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: l.free ? "#D4A843" : "#1A1A1A", border: l.free ? "none" : "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, color: l.free ? "#0A0A0A" : "#555", flexShrink: 0 }}>{l.num}</div>
                    <div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "2px" }}>
                        <span style={{ color: "#E8E8E8", fontSize: "0.82rem", fontWeight: 700 }}>{l.title}</span>
                        {l.free ? <span style={{ background: "#4CAF7D20", color: "#4CAF7D", fontSize: "0.58rem", fontWeight: 700, padding: "1px 5px", borderRadius: "3px" }}>FREE</span> : <span style={{ color: "#555", fontSize: "0.62rem" }}>🔒</span>}
                      </div>
                      <p style={{ color: "#555", fontSize: "0.72rem" }}>{l.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://fiftykup.gumroad.com/l/jnjbad" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", fontWeight: 800, padding: "14px", borderRadius: "10px", textAlign: "center", textDecoration: "none" }}>
                Get Full Course — $29.99 →
              </a>
            </div>
            <div>
              <p style={{ ...C.label, marginBottom: "12px" }}>INVESTING BLUEPRINT</p>
              {[
                { topic: "ETF Split", detail: "VOO 55% · VUG 21% · VXUS 17% · VBK 7%" },
                { topic: "Roth IRA", detail: "$144/week = maxed Roth IRA ($7K/yr). Tax-free forever." },
                { topic: "Dollar Cost Average", detail: "Same amount every Friday. Market up or down." },
                { topic: "Crypto Max 10%", detail: "BTC 47% · ETH 26% · XRP 14% · SOL 13%." },
                { topic: "CD Ladder", detail: "$5K CD every 3 months for guaranteed returns." },
                { topic: "Money Market", detail: "$50/week into high-yield liquid savings." },
              ].map(i => (
                <div key={i.topic} style={{ ...C.card, padding: "12px", marginBottom: "8px" }}>
                  <p style={{ color: "#D4A843", fontSize: "0.78rem", fontWeight: 700, marginBottom: "2px" }}>{i.topic}</p>
                  <p style={{ color: "#666", fontSize: "0.72rem", lineHeight: 1.5 }}>{i.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* SAVE BAR */}
      <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#111", border: "1px solid #222", borderRadius: "100px", padding: "12px 28px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 8px 32px rgba(0,0,0,0.7)", whiteSpace: "nowrap", zIndex: 50 }}>
        <span style={{ color: "#555", fontSize: "0.82rem" }}>Auto-saves as you type</span>
        <button onClick={() => saveAll()} style={{ background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "100px", padding: "8px 20px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>
          {saveMsg ? "✓ Saved!" : "Save Everything"}
        </button>
      </div>
    </div>
  );
}

const C = {
  card: { background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "18px" },
  label: { color: "#555", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" },
  bigInput: { background: "transparent", border: "none", outline: "none", fontWeight: 800, width: "100%" },
  nameInput: { background: "transparent", border: "none", outline: "none", color: "#E8E8E8", fontSize: "0.85rem", fontWeight: 700, flex: 1, minWidth: 0 },
  tabs: { display: "flex", gap: "4px", background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: "12px", padding: "4px", marginBottom: "20px" },
  tab: { flex: 1, padding: "9px", borderRadius: "8px", border: "none", background: "transparent", color: "#555", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" },
  tabActive: { background: "#161616", color: "#E8E8E8" },
  note: { color: "#555", fontSize: "0.82rem", marginBottom: "14px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px", marginBottom: "14px" },
};
