import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (!ageConfirmed) return setError("You must confirm you are 18 or older.");
      if (!agreed) return setError("You must agree to the Terms of Service and Privacy Policy.");
    }
    setLoading(true);
    try {
      const res = await signIn("credentials", { redirect: false, email, password, name, action: mode });
      if (res?.error) { setError(res.error); }
      else { router.push(mode === "signup" ? "/subscribe" : "/"); }
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  }

  return (
    <div style={S.page}>
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(212,168,67,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={S.card}>
        <div style={S.logo}><span style={{ color: "#D4A843" }}>FIFTYK</span><span>UP</span></div>
        <p style={S.tagline}>Your path to the first fifty thousand.</p>

        <div style={S.tabs}>
          <button style={{ ...S.tab, ...(mode === "login" ? S.tabActive : {}) }} onClick={() => { setMode("login"); setError(""); }}>Log In</button>
          <button style={{ ...S.tab, ...(mode === "signup" ? S.tabActive : {}) }} onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} style={S.form}>
          {mode === "signup" && (
            <div style={S.field}>
              <label style={S.label}>First Name</label>
              <input style={S.input} type="text" placeholder="Alex" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div style={S.field}>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" placeholder="you@college.edu" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={S.field}>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </div>

          {mode === "signup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#0A0A0A", borderRadius: "10px", padding: "14px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={ageConfirmed} onChange={e => setAgeConfirmed(e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "#D4A843", flexShrink: 0 }} />
                <span style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  I confirm that I am <strong style={{ color: "#E8E8E8" }}>18 years of age or older</strong>. Users under 18 require parental consent.
                </span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "#D4A843", flexShrink: 0 }} />
                <span style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  I agree to the{" "}
                  <a href="/terms" target="_blank" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 600 }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy" target="_blank" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a>.
                  FiftyKUp is not financial advice.
                </span>
              </label>
            </div>
          )}

          {error && <p style={S.error}>{error}</p>}

          <button style={S.btn} type="submit" disabled={loading}>
            {loading ? "Loading…" : mode === "login" ? "Log In →" : "Create Account →"}
          </button>
        </form>

        <p style={S.switch}>
          {mode === "login" ? "Don't have an account? " : "Already have one? "}
          <span style={S.switchLink} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up" : "Log in"}
          </span>
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
          {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Compliance", "/compliance"]].map(([label, href]) => (
            <a key={href} href={href} style={{ color: "#444", fontSize: "0.72rem", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "40px 36px", width: "100%", maxWidth: "440px" },
  logo: { textAlign: "center", fontSize: "2rem", fontWeight: 900, letterSpacing: "-1px", marginBottom: "6px", color: "#E8E8E8" },
  tagline: { textAlign: "center", color: "#555", fontSize: "0.85rem", marginBottom: "28px" },
  tabs: { display: "flex", background: "#0A0A0A", borderRadius: "10px", padding: "4px", marginBottom: "24px", gap: "4px" },
  tab: { flex: 1, padding: "10px", borderRadius: "7px", border: "none", background: "transparent", color: "#555", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" },
  tabActive: { background: "#161616", color: "#E8E8E8" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.78rem", color: "#555", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" },
  input: { background: "#0A0A0A", border: "1px solid #222", borderRadius: "10px", padding: "13px 16px", color: "#E8E8E8", fontSize: "0.95rem", outline: "none" },
  error: { color: "#FF5F57", fontSize: "0.85rem", background: "rgba(255,95,87,0.1)", padding: "10px 14px", borderRadius: "8px" },
  btn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "14px", fontWeight: 800, fontSize: "1rem", cursor: "pointer", marginTop: "4px" },
  switch: { textAlign: "center", color: "#555", fontSize: "0.85rem", marginTop: "20px" },
  switchLink: { color: "#D4A843", cursor: "pointer", fontWeight: 600 },
  demo: { textAlign: "center", color: "#333", fontSize: "0.78rem", marginTop: "12px" },
};
