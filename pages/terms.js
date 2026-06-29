import Footer from "../components/Footer";
export default function Terms() {
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <a href="/" style={S.back}>← Back to FiftyKUp</a>
        <h1 style={S.h1}>Terms of Service</h1>
        <p style={S.updated}>Last updated: June 28, 2026</p>
        <div style={S.alert}>⚠ By using FiftyKUp, you agree to these terms. Please read them carefully.</div>

        {[
          { title: "1. Acceptance of Terms", body: `By accessing or using FiftyKUp ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service. These terms apply to all users, including visitors, registered users, and paying subscribers.` },
          { title: "2. Eligibility & Age Requirement", body: `You must be at least 18 years old to use FiftyKUp. By creating an account, you represent and warrant that you are 18 years of age or older. If you are between 13 and 17 years old, you may only use the Service with verified parental or guardian consent. We do not knowingly permit users under 13 to access the Service. We reserve the right to terminate accounts of users who misrepresent their age.` },
          { title: "3. Not Financial Advice", body: `FiftyKUp is an educational financial tracking tool. NOTHING on this platform constitutes financial advice, investment advice, tax advice, legal advice, or any professional advisory service. All projections, calculators, timelines, and content are for informational and educational purposes only. Results shown are estimates based on user-input data and mathematical assumptions — they do not guarantee any financial outcome. You should consult a licensed financial advisor, certified public accountant, or attorney before making any financial decisions. FiftyKUp LLC, its founders, employees, and contractors are not responsible for any financial losses incurred as a result of using this platform.` },
          { title: "4. Subscription & Payments", body: `FiftyKUp offers paid subscription plans billed monthly or annually. By subscribing, you authorize us to charge your payment method on a recurring basis. Your subscription will automatically renew unless cancelled before the renewal date. You may cancel at any time through your account settings. Refunds are issued at our sole discretion. We reserve the right to change pricing with 30 days notice. All payments are processed by Stripe and subject to Stripe's terms of service.` },
          { title: "5. Intellectual Property", body: `All content, features, branding, logos, course materials, text, graphics, and code on FiftyKUp are the exclusive property of FiftyKUp LLC and are protected by United States and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from FiftyKUp without express written permission. Unauthorized use of our intellectual property may result in civil and criminal liability. The course content (\"First $50K for College Students\") is copyright protected — purchasing access grants a personal, non-transferable license for individual use only. Redistribution, resale, or sharing of course content is strictly prohibited.` },
          { title: "6. User Conduct", body: `You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the Service; (c) interfere with the proper functioning of the Service; (d) share your account credentials with others; (e) reverse engineer or attempt to extract source code; (f) use the Service to build a competing product; (g) upload malicious code or attempt to compromise our infrastructure.` },
          { title: "7. Disclaimer of Warranties", body: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES. WE MAKE NO WARRANTY REGARDING THE ACCURACY OR RELIABILITY OF ANY FINANCIAL PROJECTIONS OR CALCULATIONS. YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.` },
          { title: "8. Limitation of Liability", body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, FIFTYKUP LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE OR INABILITY TO USE THE SERVICE. OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.` },
          { title: "9. Termination", body: `We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any other reason at our discretion. Upon termination, your right to use the Service ceases immediately. We are not liable to you or any third party for any termination of your access.` },
          { title: "10. Governing Law", body: `These Terms are governed by the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in New York County, New York. You consent to personal jurisdiction in such courts.` },
          { title: "11. Changes to Terms", body: `We reserve the right to modify these Terms at any time. We will notify you of material changes via email or in-app notice. Continued use of the Service after changes constitutes acceptance of the new Terms.` },
          { title: "12. Contact", body: `For questions about these Terms: legal@fiftykup.com` },
        ].map(s => (
          <div key={s.title} style={S.section}>
            <h2 style={S.h2}>{s.title}</h2>
            <p style={S.body}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const S = {
  page: { background: "#0A0A0A", minHeight: "100vh", padding: "40px 20px 80px" },
  wrap: { maxWidth: "720px", margin: "0 auto" },
  back: { color: "#D4A843", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", marginBottom: "32px" },
  h1: { color: "#E8E8E8", fontSize: "2rem", fontWeight: 900, marginBottom: "6px" },
  updated: { color: "#555", fontSize: "0.82rem", marginBottom: "20px" },
  alert: { background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", borderRadius: "10px", padding: "12px 16px", color: "#D4A843", fontSize: "0.85rem", marginBottom: "32px" },
  section: { marginBottom: "32px", borderBottom: "1px solid #1A1A1A", paddingBottom: "32px" },
  h2: { color: "#D4A843", fontSize: "1rem", fontWeight: 700, marginBottom: "10px" },
  body: { color: "#888", fontSize: "0.9rem", lineHeight: 1.7 },
};
