export default function CompliancePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-3xl font-bold text-white mb-2">Compliance</h1>
      <p className="text-white/40 text-sm mb-10">Last updated: June 29, 2026</p>
      <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg px-5 py-4 mb-10">
        <p className="text-yellow-300 text-sm font-medium leading-relaxed">⚠️ FiftyKUp is NOT a registered investment advisor, broker-dealer, or financial institution. The App does not execute trades, hold funds, or provide personalized investment advice.</p>
      </div>
      <section className="mb-8"><h2 className="text-lg font-semibold text-white mb-2">Regulatory Status</h2><p className="text-sm leading-relaxed text-white/70">FiftyKUp is an educational software application, not registered with the SEC, FINRA, or any state securities regulator.</p></section>
      <section className="mb-8"><h2 className="text-lg font-semibold text-white mb-2">Age Advisory</h2><p className="text-sm leading-relaxed text-white/70">There is no strict age requirement to use FiftyKUp. However, the app is advised for users 18 and older given its financial education content. Users under 18 are encouraged to use the app with parental guidance.</p></section>
      <section className="mb-8"><h2 className="text-lg font-semibold text-white mb-2">Data Security</h2><p className="text-sm leading-relaxed text-white/70">User data is encrypted at rest and in transit (TLS 1.2+). Payment processing is handled by Stripe, a PCI DSS Level 1 compliant provider.</p></section>
      <section className="mb-8"><h2 className="text-lg font-semibold text-white mb-2">Contact</h2><p className="text-sm leading-relaxed text-white/70">fiftykup@yahoo.com</p></section>
    </div>
  );
}
