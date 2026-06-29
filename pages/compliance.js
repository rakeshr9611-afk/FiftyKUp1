export default function CompliancePage() {
  return (
    <div style={{maxWidth:"768px",margin:"0 auto",padding:"64px 24px",color:"rgba(255,255,255,0.8)"}}>
      <h1 style={{fontSize:"1.875rem",fontWeight:"700",color:"white",marginBottom:"8px"}}>Compliance</h1>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.875rem",marginBottom:"40px"}}>Last updated: June 29, 2026</p>
      <div style={{border:"1px solid rgba(234,179,8,0.3)",background:"rgba(234,179,8,0.1)",borderRadius:"8px",padding:"16px 20px",marginBottom:"40px"}}>
        <p style={{color:"rgb(253,224,71)",fontSize:"0.875rem",fontWeight:"500",lineHeight:"1.75"}}>⚠️ FiftyKUp is NOT a registered investment advisor, broker-dealer, or financial institution. The App does not execute trades, hold funds, or provide personalized investment advice.</p>
      </div>
      <section style={{marginBottom:"32px"}}><h2 style={{fontSize:"1.125rem",fontWeight:"600",color:"white",marginBottom:"8px"}}>Regulatory Status</h2><p style={{fontSize:"0.875rem",lineHeight:"1.75",color:"rgba(255,255,255,0.7)"}}>FiftyKUp is an educational software application, not registered with the SEC, FINRA, or any state securities regulator.</p></section>
      <section style={{marginBottom:"32px"}}><h2 style={{fontSize:"1.125rem",fontWeight:"600",color:"white",marginBottom:"8px"}}>Age Advisory</h2><p style={{fontSize:"0.875rem",lineHeight:"1.75",color:"rgba(255,255,255,0.7)"}}>There is no strict age requirement. FiftyKUp is advised for users 18 and older given its financial education content. Users under 18 are encouraged to use the app with parental guidance.</p></section>
      <section style={{marginBottom:"32px"}}><h2 style={{fontSize:"1.125rem",fontWeight:"600",color:"white",marginBottom:"8px"}}>Data Security</h2><p style={{fontSize:"0.875rem",lineHeight:"1.75",color:"rgba(255,255,255,0.7)"}}>User data is encrypted at rest and in transit (TLS 1.2+). Payments are handled by Stripe, a PCI DSS Level 1 compliant provider.</p></section>
      <section style={{marginBottom:"32px"}}><h2 style={{fontSize:"1.125rem",fontWeight:"600",color:"white",marginBottom:"8px"}}>Contact</h2><p style={{fontSize:"0.875rem",lineHeight:"1.75",color:"rgba(255,255,255,0.7)"}}>fiftykup@yahoo.com</p></section>
    </div>
  );
}
