export default function Footer() {
  return (
    <footer style={S.footer}>
      <div style={S.inner}>
        <div style={S.left}>
          <span style={S.logo}><span style={{ color: "#D4A843" }}>FIFTYK</span>UP</span>
          <p style={S.disclaimer}>FiftyKUp is an educational financial tracking tool. Nothing on this platform constitutes financial, investment, tax, or legal advice. All projections are estimates for educational purposes only. Consult a licensed financial advisor before making any financial decisions.</p>
          <p style={S.copy}>© {new Date().getFullYear()} FiftyKUp LLC. All rights reserved.</p>
        </div>
        <div style={S.links}>
          <p style={S.linkHead}>LEGAL</p>
          {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Data & Compliance", "/compliance"]].map(([label, href]) => (
            <a key={href} href={href} style={S.link}>{label}</a>
          ))}
          <p style={S.linkHead} style={{ marginTop: "16px" }}>CONTACT</p>
          <a href="mailto:support@fiftykup.com" style={S.link}>support@fiftykup.com</a>
        </div>
      </div>
    </footer>
  );
}

const S = {
  footer: { background: "#0D0D0D", borderTop: "1px solid #1A1A1A", padding: "40px 20px", marginTop: "60px" },
  inner: { maxWidth: "900px", margin: "0 auto", display: "flex", gap: "40px", flexWrap: "wrap" },
  left: { flex: 2, minWidth: "260px" },
  logo: { fontWeight: 900, fontSize: "1rem", color: "#E8E8E8", display: "block", marginBottom: "12px" },
  disclaimer: { color: "#444", fontSize: "0.75rem", lineHeight: 1.6, marginBottom: "10px", maxWidth: "480px" },
  copy: { color: "#333", fontSize: "0.72rem" },
  links: { flex: 1, minWidth: "160px", display: "flex", flexDirection: "column" },
  linkHead: { color: "#555", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" },
  link: { color: "#888", fontSize: "0.8rem", textDecoration: "none", marginBottom: "6px", transition: "color 0.15s" },
};
