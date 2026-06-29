import Nav from "../components/Nav";
import { useSession } from "next-auth/react";

export default function CompliancePage() {
  const { data: session } = useSession();
  const S = {
    wrap: { background: "#0A0A0A", minHeight: "100vh" },
    inner: { maxWidth: "768px", margin: "0 auto", padding: "64px 24px 100px" },
    h1: { fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: "8px" },
    date: { color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "48px", display: "block" },
    h2: { fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "8px", marginTop: "0" },
    p: { fontSize: "0.875rem", lineHeight: "1.8", color: "rgba(255,255,255,0.65)", marginBottom: "0" },
    section: { marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid #1A1A1A" },
    banner: { background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "10px", padding: "16px 20px", marginBottom: "40px" },
    bannerText: { color: "rgb(253,224,71)", fontSize: "0.875rem", fontWeight: 600, lineHeight: "1.7", margin: 0 },
    badge: { display: "inline-block", background: "#1A1A1A", border: "1px solid #333", borderRadius: "6px", padding: "4px 10px", fontSize: "0.75rem", color: "#888", marginRight: "8px", marginBottom: "8px" },
  };
  return (
    <div style={S.wrap}>
      {session && <Nav />}
      <div style={S.inner}>
        <h1 style={S.h1}>Data & Compliance</h1>
        <span style={S.date}>Last updated: June 29, 2026</span>

        <div style={S.banner}>
          <p style={S.bannerText}>⚠️ FiftyKUp is NOT a registered investment advisor, broker-dealer, financial institution, or money services business. We do not execute trades, hold funds, provide personalized investment advice, or facilitate financial transactions of any kind.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>Regulatory Status</h2>
          <p style={S.p}>FiftyKUp is an educational software application. We are not registered with, licensed by, or affiliated with:<br/><br/>
          • U.S. Securities and Exchange Commission (SEC)<br/>
          • Financial Industry Regulatory Authority (FINRA)<br/>
          • Commodity Futures Trading Commission (CFTC)<br/>
          • Any state securities or financial services regulator<br/>
          • Any equivalent regulatory body in the EU, UK, or other jurisdiction<br/><br/>
          Use of FiftyKUp does not create a broker-client, investment advisor-client, attorney-client, or any other professional relationship.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>Data Protection Standards</h2>
          <div style={{marginBottom:"12px"}}>
            <span style={S.badge}>TLS 1.2+</span>
            <span style={S.badge}>PCI DSS via Stripe</span>
            <span style={S.badge}>CCPA Compliant</span>
            <span style={S.badge}>GDPR Aware</span>
            <span style={S.badge}>COPPA Compliant</span>
          </div>
          <p style={S.p}>All data transmitted between your browser and our servers is encrypted using TLS 1.2 or higher. Payment processing is handled exclusively by Stripe, a PCI DSS Level 1 certified provider — the highest level of payment security certification available. FiftyKUp never stores, transmits, or has access to raw payment card data.<br/><br/>
          Your financial tracking data (income, bills, portfolio) is stored in your browser's localStorage and does not leave your device unless you explicitly choose to sync it.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>California — CCPA / CPRA Compliance</h2>
          <p style={S.p}>FiftyKUp complies with the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA).<br/><br/>
          <strong style={{color:"white"}}>We do not sell personal information.</strong> We do not share personal information for cross-context behavioral advertising.<br/><br/>
          California residents have the right to:<br/>
          • Know what personal information is collected and how it is used<br/>
          • Delete personal information we hold about them<br/>
          • Correct inaccurate personal information<br/>
          • Opt out of the sale or sharing of personal information (not applicable — we don't sell data)<br/>
          • Non-discrimination for exercising privacy rights<br/>
          • Limit use of sensitive personal information<br/><br/>
          To submit a CCPA request: email fiftykup@yahoo.com with subject line "CCPA Request." We will respond within 45 calendar days. We may need to verify your identity before processing the request.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>European Union & UK — GDPR Compliance</h2>
          <p style={S.p}>FiftyKUp acknowledges the rights of EU/EEA and UK residents under the General Data Protection Regulation (GDPR) and UK GDPR.<br/><br/>
          <strong style={{color:"white"}}>Legal Bases for Processing:</strong><br/>
          • <strong style={{color:"white"}}>Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to provide the subscription service<br/>
          • <strong style={{color:"white"}}>Legitimate Interests (Art. 6(1)(f)):</strong> Security monitoring, fraud prevention, platform improvement<br/>
          • <strong style={{color:"white"}}>Legal Obligation (Art. 6(1)(c)):</strong> Tax records, legal compliance<br/><br/>
          <strong style={{color:"white"}}>Data Transfers:</strong> Our infrastructure is hosted on Vercel (US-based). Data transfers outside the EU/EEA are covered by Standard Contractual Clauses (SCCs) or equivalent safeguards where applicable.<br/><br/>
          <strong style={{color:"white"}}>Data Protection Officer:</strong> FiftyKUp does not currently have a designated DPO as we do not engage in large-scale systematic processing of sensitive personal data. Privacy inquiries may be directed to fiftykup@yahoo.com.<br/><br/>
          To exercise any GDPR right, email fiftykup@yahoo.com with subject "GDPR Request." Response within 30 days. You have the right to lodge a complaint with your local supervisory authority (e.g., ICO in the UK, CNIL in France).</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>COPPA — Children's Privacy</h2>
          <p style={S.p}>FiftyKUp complies with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe your child under 13 has submitted personal information to FiftyKUp, contact us immediately at fiftykup@yahoo.com and we will delete the information within 72 hours.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>Third-Party Services & Sub-Processors</h2>
          <p style={S.p}>We use the following sub-processors to operate the platform:<br/><br/>
          <strong style={{color:"white"}}>Stripe, Inc.</strong> — Payment processing. PCI DSS Level 1. Privacy: stripe.com/privacy<br/>
          <strong style={{color:"white"}}>Vercel, Inc.</strong> — Hosting & infrastructure. Privacy: vercel.com/legal/privacy-policy<br/>
          <strong style={{color:"white"}}>Google LLC</strong> — OAuth authentication (if you use "Sign in with Google"). Privacy: policies.google.com/privacy<br/><br/>
          We vet all sub-processors for security and compliance standards before integration.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>Security Vulnerability Reporting</h2>
          <p style={S.p}>If you discover a security vulnerability or potential data breach in FiftyKUp, please report it responsibly to fiftykup@yahoo.com with the subject line "Security Report." We commit to:<br/><br/>
          • Acknowledging your report within 48 hours<br/>
          • Investigating and responding with our findings within 14 days<br/>
          • Not pursuing legal action against good-faith security researchers<br/><br/>
          Please do not publicly disclose vulnerabilities before we have had a reasonable opportunity to address them.</p>
        </div>

        <div style={{marginBottom:"36px"}}>
          <h2 style={S.h2}>Contact</h2>
          <p style={S.p}>For all compliance, privacy, and data-related inquiries:<br/><br/>
          Email: fiftykup@yahoo.com<br/>
          Subject lines: "CCPA Request" / "GDPR Request" / "Data Deletion" / "Security Report"<br/><br/>
          To delete your account, visit your <a href="/profile" style={{color:"#D4A843"}}>Profile page</a>.</p>
        </div>
      </div>
    </div>
  );
}
