import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <div style={S.wrap}>
        <a href="/" style={S.back}>← Back to FiftyKUp</a>
        <h1 style={S.h1}>Privacy Policy</h1>
        <p style={S.updated}>Last updated: June 28, 2026</p>

        {[
          { title: "1. Information We Collect", body: "We collect your name, email address, and password (hashed) when you create an account. Financial data you enter (income, balances, goals) is stored locally in your browser and is not transmitted to our servers. We collect payment information through Stripe — we never see or store your full card details." },
          { title: "2. How We Use Your Information", body: "We use your information to provide authentication, process payments, and improve the Service. We do not sell, rent, or share your personal information with third parties for marketing purposes." },
          { title: "3. Financial Disclaimer", body: "FiftyKUp is an educational and tracking tool ONLY. Nothing on this platform constitutes financial advice, investment advice, tax advice, or legal advice. All projections are estimates for educational purposes only. Consult a licensed financial advisor before making any financial decisions. We are not liable for any financial losses." },
          { title: "4. Data Security", body: "We implement TLS encryption for data in transit. Passwords are hashed using industry-standard algorithms. Financial tracking data is stored only in your local browser storage. No method of transmission over the internet is 100% secure." },
          { title: "5. Third-Party Services", body: "We use Stripe for payment processing (subject to Stripe's Privacy Policy) and Gumroad for course purchases (subject to Gumroad's Privacy Policy). We may use analytics tools to understand app usage." },
          { title: "6. Your Rights (GDPR/CCPA)", body: "Depending on your location, you may have rights to access, correct, delete, or export your data. See our full Data & Compliance page for GDPR, CCPA, and COPPA details." },
          { title: "7. Data Retention", body: "Account data is retained while your account is active. Upon deletion, personal data is removed within 30 days. Payment records are retained 7 years for legal compliance." },
          { title: "8. Cookies", body: "We use session cookies for authentication only. No advertising or tracking cookies are used." },
          { title: "9. Children", body: "This Service is not directed to children under 13. Users must be 18+. See our Compliance page for full COPPA policy." },
          { title: "10. Contact", body: "Privacy questions: privacy@fiftykup.com · GDPR: gdpr@fiftykup.com · DMCA: dmca@fiftykup.com" },
        ].map(s => (
          <div key={s.title} style={S.section}>
            <h2 style={S.h2}>{s.title}</h2>
            <p style={S.body}>{s.body}</p>
          </div>
        ))}

        <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          <a href="/terms" style={S.legalLink}>Terms of Service</a>
          <a href="/compliance" style={S.legalLink}>Data & Compliance (GDPR/CCPA)</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const S = {
  wrap: { maxWidth: "720px", margin: "0 auto", padding: "40px 20px 40px" },
  back: { color: "#D4A843", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "32px" },
  h1: { color: "#E8E8E8", fontSize: "2rem", fontWeight: 900, marginBottom: "6px" },
  updated: { color: "#555", fontSize: "0.82rem", marginBottom: "40px" },
  section: { marginBottom: "28px", borderBottom: "1px solid #1A1A1A", paddingBottom: "28px" },
  h2: { color: "#D4A843", fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" },
  body: { color: "#888", fontSize: "0.88rem", lineHeight: 1.7 },
  legalLink: { color: "#D4A843", fontSize: "0.82rem", textDecoration: "none", background: "#D4A84315", border: "1px solid #D4A84330", borderRadius: "6px", padding: "6px 12px" },
};
