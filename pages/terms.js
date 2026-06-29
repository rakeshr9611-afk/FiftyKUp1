import Nav from "../components/Nav";
import { useSession } from "next-auth/react";

export default function TermsPage() {
  const { data: session } = useSession();
  const S = {
    wrap: { background: "#0A0A0A", minHeight: "100vh" },
    inner: { maxWidth: "768px", margin: "0 auto", padding: "64px 24px 100px" },
    h1: { fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: "8px" },
    date: { color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "48px", display: "block" },
    h2: { fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "8px", marginTop: "0" },
    p: { fontSize: "0.875rem", lineHeight: "1.8", color: "rgba(255,255,255,0.65)", marginBottom: "0" },
    section: { marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid #1A1A1A" },
    warning: { background: "rgba(255,95,87,0.08)", border: "1px solid rgba(255,95,87,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "40px" },
    warningText: { color: "#FF5F57", fontSize: "0.85rem", lineHeight: "1.7", margin: 0, fontWeight: 600 },
  };
  return (
    <div style={S.wrap}>
      {session && <Nav />}
      <div style={S.inner}>
        <h1 style={S.h1}>Terms of Service</h1>
        <span style={S.date}>Last updated: June 29, 2026 · Effective immediately</span>

        <div style={S.warning}>
          <p style={S.warningText}>⚠️ IMPORTANT: FiftyKUp is an educational financial tracking tool — NOT a licensed financial advisor, broker, or investment platform. Nothing on this platform constitutes financial, investment, tax, or legal advice. Read Section 4 carefully.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>1. Acceptance of Terms</h2>
          <p style={S.p}>By accessing or using FiftyKUp ("the App," "the Service," "we," "us"), you ("User," "you") agree to be bound by these Terms of Service ("Terms") and our Privacy Policy, which is incorporated herein by reference. If you do not agree to all of these Terms, you must not use the App.<br/><br/>
          We reserve the right to update these Terms at any time. Continued use of the App after changes are posted constitutes your acceptance of the revised Terms. We will notify you of material changes via email or in-app notice.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>2. Eligibility</h2>
          <p style={S.p}>You must be at least 13 years of age to use FiftyKUp. The App is designed for and recommended for users aged 18 and older, given its financial education content. Users under 18 represent that they have obtained parental or guardian consent to use the App.<br/><br/>
          By using the App, you represent and warrant that you have the legal capacity to enter into a binding agreement in your jurisdiction.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>3. Account Registration & Security</h2>
          <p style={S.p}>To access most features, you must create an account. You agree to:<br/><br/>
          • Provide accurate, current, and complete registration information<br/>
          • Maintain the confidentiality of your account credentials<br/>
          • Notify us immediately at fiftykup@yahoo.com of any unauthorized access to your account<br/>
          • Accept responsibility for all activity that occurs under your account<br/><br/>
          We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a security risk to other users or the platform.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>4. No Financial Advice — Disclaimer</h2>
          <p style={S.p}>THIS IS THE MOST IMPORTANT SECTION. PLEASE READ CAREFULLY.<br/><br/>
          FiftyKUp is an <strong style={{color:"white"}}>educational and motivational financial tracking tool only</strong>. All content, calculators, projections, milestones, course materials, income estimates, investment allocation suggestions, and any other information provided through the App are for <strong style={{color:"white"}}>general informational and educational purposes only</strong>.<br/><br/>
          Nothing on FiftyKUp constitutes, nor should be construed as:<br/>
          • Financial, investment, securities, or trading advice<br/>
          • Tax planning or tax advice<br/>
          • Legal advice<br/>
          • Accounting or professional advice<br/>
          • A recommendation to buy, sell, or hold any security, cryptocurrency, ETF, or other financial instrument<br/><br/>
          Past performance shown in examples or projections is not indicative of future results. All projections are hypothetical, based on assumptions that may not reflect actual market conditions, and carry no guarantee of accuracy.<br/><br/>
          <strong style={{color:"white"}}>You should consult a licensed financial advisor, CPA, attorney, or other qualified professional before making any financial decisions.</strong> FiftyKUp is not liable for any financial decisions you make based on information provided through the App.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>5. Subscriptions, Billing & Refunds</h2>
          <p style={S.p}><strong style={{color:"white"}}>Subscription Plans:</strong> FiftyKUp offers monthly and annual subscription plans. All pricing is displayed at the time of purchase and subject to change with prior notice.<br/><br/>
          <strong style={{color:"white"}}>Free Trial:</strong> We may offer a free trial period. At the end of the trial, your subscription will automatically convert to a paid plan unless you cancel before the trial ends.<br/><br/>
          <strong style={{color:"white"}}>Billing:</strong> Subscriptions are billed on a recurring basis via Stripe. By subscribing, you authorize Stripe to charge your payment method on a recurring basis until you cancel.<br/><br/>
          <strong style={{color:"white"}}>Cancellation:</strong> You may cancel your subscription at any time via your Profile page or by emailing fiftykup@yahoo.com. Cancellation takes effect at the end of the current billing period. You will retain access until that date.<br/><br/>
          <strong style={{color:"white"}}>Refunds:</strong> We do not offer refunds for partial billing periods. Exceptions may be made at our sole discretion for documented technical failures on our part. Refund requests must be submitted within 7 days of the charge to fiftykup@yahoo.com.<br/><br/>
          <strong style={{color:"white"}}>Price Changes:</strong> We will provide at least 30 days' notice before changing subscription prices. Continued use after the effective date constitutes acceptance.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>6. Acceptable Use</h2>
          <p style={S.p}>You agree NOT to:<br/><br/>
          • Use the App for any unlawful purpose or in violation of any applicable law or regulation<br/>
          • Attempt to reverse engineer, decompile, disassemble, or extract source code from the App<br/>
          • Use automated bots, scrapers, or scripts to access the App without written permission<br/>
          • Upload, transmit, or distribute malicious code, viruses, or harmful content<br/>
          • Impersonate any person or entity or misrepresent your affiliation<br/>
          • Attempt to gain unauthorized access to any portion of the App or its infrastructure<br/>
          • Use the App to engage in spam, phishing, or fraudulent activity<br/>
          • Sell, resell, or sublicense access to the App without written permission<br/><br/>
          Violation of these terms may result in immediate account termination without refund.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>7. Intellectual Property</h2>
          <p style={S.p}>All content, features, functionality, design, code, trademarks, logos, and branding of FiftyKUp are owned by FiftyKUp and protected by applicable copyright, trademark, and intellectual property laws.<br/><br/>
          Your personal financial data (income figures, savings targets, etc.) that you enter into the App remains yours. We claim no ownership over your personal data.<br/><br/>
          You are granted a limited, non-exclusive, non-transferable license to access and use the App for your personal, non-commercial purposes during your active subscription.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>8. Disclaimers & Limitation of Liability</h2>
          <p style={S.p}>THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.<br/><br/>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FIFTYKUP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:<br/><br/>
          • Your use of or inability to use the App<br/>
          • Any financial decisions made based on App content<br/>
          • Unauthorized access to your account<br/>
          • Any interruption or cessation of the App<br/><br/>
          IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>9. Indemnification</h2>
          <p style={S.p}>You agree to indemnify, defend, and hold harmless FiftyKUp, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with your use of the App, your violation of these Terms, or your violation of any applicable law.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>10. Termination</h2>
          <p style={S.p}>We may suspend or terminate your account and access to the App at any time, with or without cause, and with or without notice. Upon termination, your right to use the App ceases immediately. You may also delete your account at any time via your Profile page.<br/><br/>
          Sections 4, 7, 8, 9, and 11 of these Terms survive termination.</p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>11. Governing Law & Dispute Resolution</h2>
          <p style={S.p}>These Terms are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.<br/><br/>
          Any dispute arising out of or relating to these Terms or the App shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in New York County, New York, under the rules of the American Arbitration Association, except that either party may seek injunctive or equitable relief in a court of competent jurisdiction.<br/><br/>
          You waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
        </div>

        <div style={{marginBottom:"36px"}}>
          <h2 style={S.h2}>12. Contact</h2>
          <p style={S.p}>Questions about these Terms? Contact us at:<br/><br/>
          Email: fiftykup@yahoo.com<br/>
          To cancel your subscription or delete your account, visit your <a href="/profile" style={{color:"#D4A843"}}>Profile page</a>.</p>
        </div>
      </div>
    </div>
  );
}
