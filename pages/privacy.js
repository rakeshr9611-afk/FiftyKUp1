import Nav from "../components/Nav";
import { useSession } from "next-auth/react";

export default function PrivacyPage() {
  const { data: session } = useSession();
  const S = {
    wrap: { background: "#0A0A0A", minHeight: "100vh" },
    inner: { maxWidth: "768px", margin: "0 auto", padding: "64px 24px 100px" },
    h1: { fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: "8px" },
    date: { color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "48px", display: "block" },
    h2: { fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "8px", marginTop: "0" },
    p: { fontSize: "0.875rem", lineHeight: "1.8", color: "rgba(255,255,255,0.65)", marginBottom: "0" },
    section: { marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid #1A1A1A" },
    banner: { background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "40px" },
    bannerText: { color: "#D4A843", fontSize: "0.85rem", lineHeight: "1.7", margin: 0 },
  };
  return (
    <div style={S.wrap}>
      {session && <Nav />}
      <div style={S.inner}>
        <h1 style={S.h1}>Privacy Policy</h1>
        <span style={S.date}>Last updated: June 29, 2026 · Effective immediately</span>

        <div style={S.banner}>
          <p style={S.bannerText}>FiftyKUp ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights — including rights under the California Consumer Privacy Act (CCPA) and the EU General Data Protection Regulation (GDPR).</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>1. Information We Collect</h2>
          <p style={S.p}>We collect the following categories of personal information:<br/><br/>
          <strong style={{color:"white"}}>Account Data:</strong> Your email address and authentication credentials when you create an account via Google OAuth or email/password.<br/><br/>
          <strong style={{color:"white"}}>Financial Tracking Data:</strong> Income figures, bill amounts, portfolio values, and savings targets that you voluntarily enter into the app. This data is stored locally in your browser (localStorage) and is not transmitted to our servers unless you explicitly sync it.<br/><br/>
          <strong style={{color:"white"}}>Payment Data:</strong> Subscription billing is handled entirely by Stripe. We receive only a Stripe customer ID and subscription status — never your full card number, CVV, or bank details.<br/><br/>
          <strong style={{color:"white"}}>Usage Data:</strong> Standard server logs including IP address, browser type, pages visited, and timestamps. This is used for security and performance monitoring only.<br/><br/>
          <strong style={{color:"white"}}>Communications:</strong> If you email us, we retain that correspondence to respond to your inquiry.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>2. How We Use Your Information</h2>
          <p style={S.p}>We use your information solely to:<br/><br/>
          • Authenticate your account and maintain your session<br/>
          • Process and manage your subscription via Stripe<br/>
          • Provide, maintain, and improve the FiftyKUp platform<br/>
          • Respond to your support requests<br/>
          • Comply with legal obligations<br/><br/>
          We do <strong style={{color:"white"}}>not</strong> sell, rent, lease, or trade your personal information to any third party for marketing or commercial purposes. We do not use your financial tracking data to make credit decisions, insurance determinations, or employment assessments.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>3. Data Sharing & Third Parties</h2>
          <p style={S.p}>We share your data only with the following categories of service providers, solely to operate the platform:<br/><br/>
          <strong style={{color:"white"}}>Stripe:</strong> Payment processing. Subject to Stripe's Privacy Policy at stripe.com/privacy. PCI DSS Level 1 certified.<br/><br/>
          <strong style={{color:"white"}}>Vercel:</strong> Hosting and deployment infrastructure. Subject to Vercel's Privacy Policy.<br/><br/>
          <strong style={{color:"white"}}>NextAuth.js / Google OAuth:</strong> Authentication services. If you sign in with Google, Google's privacy policy applies to that authentication step.<br/><br/>
          We may disclose your information if required by law, court order, or to protect the rights, property, or safety of FiftyKUp, our users, or the public.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>4. Cookies & Local Storage</h2>
          <p style={S.p}>We use strictly necessary session cookies for authentication. We do not use advertising cookies, tracking pixels, or third-party analytics cookies.<br/><br/>
          Your financial data (income, bills, portfolio) is stored in your browser's localStorage — it stays on your device and is not uploaded to our servers. Clearing your browser data will erase this information.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>5. Data Retention</h2>
          <p style={S.p}>We retain your account data for as long as your account is active. If you cancel your subscription or delete your account, we will:<br/><br/>
          • Immediately revoke your access<br/>
          • Permanently delete your personal data within 30 days<br/>
          • Retain anonymized, aggregated usage statistics (non-identifiable)<br/>
          • Retain transaction records as required by applicable tax and financial laws (typically 7 years)<br/><br/>
          Stripe may retain billing records independently per their data retention policies.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>6. California Residents — CCPA Rights</h2>
          <p style={S.p}>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):<br/><br/>
          <strong style={{color:"white"}}>Right to Know:</strong> You may request a copy of the personal information we have collected about you in the past 12 months, including categories, sources, and purposes.<br/><br/>
          <strong style={{color:"white"}}>Right to Delete:</strong> You may request deletion of your personal information, subject to certain legal exceptions.<br/><br/>
          <strong style={{color:"white"}}>Right to Correct:</strong> You may request correction of inaccurate personal information.<br/><br/>
          <strong style={{color:"white"}}>Right to Opt-Out of Sale:</strong> We do not sell personal information. You do not need to opt out.<br/><br/>
          <strong style={{color:"white"}}>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of these rights.<br/><br/>
          To exercise your CCPA rights, email fiftykup@yahoo.com with the subject line "CCPA Request." We will respond within 45 days.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>7. EU/EEA & UK Residents — GDPR Rights</h2>
          <p style={S.p}>If you are located in the European Union, European Economic Area, or United Kingdom, you have the following rights under the General Data Protection Regulation (GDPR) or UK GDPR:<br/><br/>
          <strong style={{color:"white"}}>Legal Basis:</strong> We process your data based on (a) contract performance — to provide the service you subscribed to; (b) legitimate interests — to operate and improve the platform; and (c) legal obligation — to comply with applicable laws.<br/><br/>
          <strong style={{color:"white"}}>Right of Access:</strong> Request a copy of your personal data (Article 15).<br/><br/>
          <strong style={{color:"white"}}>Right to Rectification:</strong> Correct inaccurate data (Article 16).<br/><br/>
          <strong style={{color:"white"}}>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten") (Article 17).<br/><br/>
          <strong style={{color:"white"}}>Right to Restrict Processing:</strong> Limit how we use your data (Article 18).<br/><br/>
          <strong style={{color:"white"}}>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format (Article 20).<br/><br/>
          <strong style={{color:"white"}}>Right to Object:</strong> Object to processing based on legitimate interests (Article 21).<br/><br/>
          <strong style={{color:"white"}}>Right to Withdraw Consent:</strong> Where processing is based on consent, withdraw it at any time.<br/><br/>
          To exercise any GDPR right, email fiftykup@yahoo.com with subject "GDPR Request." We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>8. Data Security</h2>
          <p style={S.p}>We implement industry-standard security measures including TLS 1.2+ encryption for all data in transit, secure authentication via NextAuth.js, and PCI-compliant payment processing via Stripe. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security and encourage you to use a strong, unique password.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>9. Children's Privacy (COPPA)</h2>
          <p style={S.p}>FiftyKUp is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided personal data, we will delete it promptly. If you believe a child has submitted data, contact us at fiftykup@yahoo.com.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>10. Changes to This Policy</h2>
          <p style={S.p}>We may update this Privacy Policy from time to time. Material changes will be communicated via email to your registered address or via a prominent notice in the app. Continued use after changes are posted constitutes acceptance of the updated policy. We encourage you to review this page periodically.</p>
        </div>

        <div style={{marginBottom:"36px"}}>
          <h2 style={S.h2}>11. Contact & Data Controller</h2>
          <p style={S.p}>FiftyKUp is the data controller for personal information collected through this platform.<br/><br/>
          Email: fiftykup@yahoo.com<br/>
          For account deletion or data requests, visit your <a href="/profile" style={{color:"#D4A843"}}>Profile page</a> or email us directly.</p>
        </div>
      </div>
    </div>
  );
}
