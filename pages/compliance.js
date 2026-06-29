import Footer from "../components/Footer";
export default function Compliance() {
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <a href="/" style={S.back}>← Back to FiftyKUp</a>
        <h1 style={S.h1}>Data & Compliance</h1>
        <p style={S.updated}>Last updated: June 28, 2026 · Covers GDPR, CCPA, COPPA, and Data Rights</p>

        {/* GDPR */}
        <div style={S.section}>
          <div style={S.badge}>🇪🇺 GDPR</div>
          <h2 style={S.h2}>General Data Protection Regulation (EU/UK)</h2>
          <p style={S.body}>If you are located in the European Union or United Kingdom, you have the following rights under GDPR:</p>
          <ul style={S.list}>
            {["Right to Access — You may request a copy of all personal data we hold about you.", "Right to Rectification — You may request correction of inaccurate personal data.", "Right to Erasure (\"Right to be Forgotten\") — You may request deletion of your personal data.", "Right to Restrict Processing — You may request that we limit how we use your data.", "Right to Data Portability — You may request your data in a portable format.", "Right to Object — You may object to processing of your data for certain purposes.", "Right to Withdraw Consent — Where processing is based on consent, you may withdraw it at any time."].map(r => (
              <li key={r} style={S.li}>{r}</li>
            ))}
          </ul>
          <p style={S.body}>Our legal basis for processing your data is contractual necessity (to provide the Service) and legitimate interests. We do not engage in automated decision-making or profiling that produces legal effects. To exercise any GDPR right, email: gdpr@fiftykup.com. We will respond within 30 days.</p>
        </div>

        {/* CCPA */}
        <div style={S.section}>
          <div style={S.badge}>🇺🇸 CCPA</div>
          <h2 style={S.h2}>California Consumer Privacy Act (CCPA / CPRA)</h2>
          <p style={S.body}>If you are a California resident, you have the following rights under the CCPA and CPRA:</p>
          <ul style={S.list}>
            {["Right to Know — You may request disclosure of the personal information we collect, use, disclose, and sell.", "Right to Delete — You may request deletion of personal information we have collected from you.", "Right to Opt-Out of Sale — We do not sell your personal information. You have the right to opt out if we ever do.", "Right to Non-Discrimination — We will not discriminate against you for exercising your CCPA rights.", "Right to Correct — You may request correction of inaccurate personal information.", "Right to Limit Use of Sensitive Personal Information — We collect minimal sensitive data and do not use it beyond providing the Service."].map(r => (
              <li key={r} style={S.li}>{r}</li>
            ))}
          </ul>
          <p style={S.body}>To submit a CCPA request, email: privacy@fiftykup.com or use our in-app data request form. We will respond within 45 days. We do not sell personal information to third parties.</p>
        </div>

        {/* COPPA */}
        <div style={S.section}>
          <div style={S.badge}>👶 COPPA</div>
          <h2 style={S.h2}>Children's Online Privacy Protection Act</h2>
          <p style={S.body}>FiftyKUp is not directed to children under 13 years of age. We do not knowingly collect, use, or disclose personal information from children under 13. Users must be at least 18 years old to create an account. Users between 13–17 require verifiable parental consent.</p>
          <p style={S.body} style={{ marginTop: "10px" }}>If you believe a child under 13 has provided us with personal information without parental consent, please contact us immediately at: coppa@fiftykup.com. We will promptly delete such information from our records.</p>
        </div>

        {/* IP */}
        <div style={S.section}>
          <div style={S.badge}>©️ IP</div>
          <h2 style={S.h2}>Intellectual Property & Copyright</h2>
          <p style={S.body}>All content on FiftyKUp — including but not limited to course materials, text, graphics, UI design, code, logos, and branding — is the intellectual property of FiftyKUp LLC and is protected under:</p>
          <ul style={S.list}>
            {["United States Copyright Act (17 U.S.C.)", "Digital Millennium Copyright Act (DMCA)", "Lanham Act (trademark protection)", "International copyright treaties including the Berne Convention"].map(r => (
              <li key={r} style={S.li}>{r}</li>
            ))}
          </ul>
          <p style={S.body}>To report copyright infringement or submit a DMCA takedown notice, contact: dmca@fiftykup.com. Include: (1) identification of the copyrighted work, (2) identification of the infringing material, (3) your contact information, (4) a statement of good faith belief, (5) a statement of accuracy under penalty of perjury.</p>
        </div>

        {/* Data Retention */}
        <div style={S.section}>
          <div style={S.badge}>🗄 Data</div>
          <h2 style={S.h2}>Data Retention & Storage</h2>
          <p style={S.body}>Your financial tracking data (income, portfolio balances, goals) is stored locally in your browser using localStorage. It is not transmitted to or stored on our servers. Authentication data (email, hashed password) is retained for as long as your account is active. Upon account deletion, we remove your personal data within 30 days, except where retention is required by law.</p>
          <p style={S.body} style={{ marginTop: "10px" }}>Payment records are retained for 7 years as required by tax and financial regulations. We use industry-standard encryption for data in transit (TLS 1.2+).</p>
        </div>

        {/* Age */}
        <div style={S.section}>
          <div style={S.badge}>🔞 Age</div>
          <h2 style={S.h2}>Age Verification & Requirements</h2>
          <ul style={S.list}>
            {["Under 13: Not permitted under any circumstances (COPPA compliance).", "13–17: May use with verifiable parental/guardian written consent only.", "18+: Full access. By creating an account you confirm you are 18 or older.", "We reserve the right to request age verification at any time.", "Accounts found to be operated by underage users without parental consent will be terminated immediately."].map(r => (
              <li key={r} style={S.li}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div style={{ background: "#111", border: "1px solid #D4A84330", borderRadius: "12px", padding: "24px" }}>
          <p style={{ color: "#D4A843", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>CONTACT FOR DATA & LEGAL REQUESTS</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[["General Privacy", "privacy@fiftykup.com"], ["GDPR Requests", "gdpr@fiftykup.com"], ["CCPA Requests", "privacy@fiftykup.com"], ["DMCA / Copyright", "dmca@fiftykup.com"], ["COPPA Concerns", "coppa@fiftykup.com"], ["Legal", "legal@fiftykup.com"]].map(([label, email]) => (
              <div key={label} style={{ background: "#0A0A0A", borderRadius: "8px", padding: "10px 14px" }}>
                <p style={{ color: "#555", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</p>
                <p style={{ color: "#D4A843", fontSize: "0.82rem" }}>{email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  page: { background: "#0A0A0A", minHeight: "100vh", padding: "40px 20px 80px" },
  wrap: { maxWidth: "720px", margin: "0 auto" },
  back: { color: "#D4A843", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "32px" },
  h1: { color: "#E8E8E8", fontSize: "2rem", fontWeight: 900, marginBottom: "6px" },
  updated: { color: "#555", fontSize: "0.82rem", marginBottom: "40px" },
  section: { marginBottom: "36px", borderBottom: "1px solid #1A1A1A", paddingBottom: "36px" },
  badge: { display: "inline-block", background: "#D4A84315", border: "1px solid #D4A84330", borderRadius: "6px", padding: "4px 10px", fontSize: "0.75rem", fontWeight: 700, color: "#D4A843", marginBottom: "10px" },
  h2: { color: "#E8E8E8", fontSize: "1.1rem", fontWeight: 800, marginBottom: "12px" },
  body: { color: "#888", fontSize: "0.9rem", lineHeight: 1.7 },
  list: { color: "#888", fontSize: "0.88rem", lineHeight: 1.9, paddingLeft: "20px", margin: "12px 0" },
  li: { marginBottom: "4px" },
};
