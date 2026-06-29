import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Subscribe() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth')
  }, [status])

  if (status === 'loading') return <div style={{ background: '#0A0A0A', minHeight: '100vh' }} />

  const features = [
    'Income & bill tracking',
    'Portfolio tracker',
    '$50K Timeline projector',
    'First $50K course (6 lessons)',
    'Investing tab — ETFs, Roth IRA, Crypto',
    'Breakdown & methods library',
  ]

  return (
    <div style={S.page}>
      <div style={S.glow} />

      <div style={S.logo}>
        <span style={{ color: '#D4A843' }}>FIFTYK</span>
        <span style={{ color: '#E8E8E8' }}>UP</span>
      </div>

      <h1 style={S.headline}>Your Road to $50K Starts Here</h1>
      <p style={S.sub}>Full access to every tool, tracker, and lesson — cancel anytime.</p>

      <div style={S.cards}>
        {/* Monthly */}
        <div style={S.card}>
          <p style={S.planLabelCard}>MONTHLY</p>
          <p style={S.cardPrice}>$12.99<span style={S.cardPer}>/mo</span></p>
          <p style={{ color: '#555', fontSize: '0.82rem', marginBottom: '24px' }}>Billed monthly · Cancel anytime</p>
          <ul style={S.list}>
            {features.map(f => (
              <li key={f} style={S.listItem}><span style={{ color: '#D4A843' }}>✓</span> {f}</li>
            ))}
          </ul>
          <a href="https://buy.stripe.com/bJeaEY3pj8Ny9dq9JRfAc0g" style={S.btnOutline}>
            Get Started →
          </a>
        </div>

        {/* Annual */}
        <div style={{ ...S.card, border: '1px solid rgba(212,168,67,0.35)', position: 'relative' }}>
          <div style={S.badge}>BEST VALUE — SAVE $35</div>
          <p style={S.planLabelCard}>ANNUAL</p>
          <p style={S.cardPrice}>$119.99<span style={S.cardPer}>/yr</span></p>
          <p style={{ color: '#4CAF7D', fontSize: '0.82rem', marginBottom: '24px', fontWeight: 600 }}>Equivalent to $10/mo · Save $35.89</p>
          <ul style={S.list}>
            {features.map(f => (
              <li key={f} style={S.listItem}><span style={{ color: '#D4A843' }}>✓</span> {f}</li>
            ))}
            <li style={S.listItem}><span style={{ color: '#D4A843' }}>✓</span> <strong style={{ color: '#D4A843' }}>2 months free</strong></li>
          </ul>
          <a href="https://buy.stripe.com/fZu8wQ9NHfbWgFS2hpfAc0h" style={S.btnGold}>
            Get Annual — Best Deal →
          </a>
        </div>
      </div>

      {/* Course callout */}
      <div style={S.courseCard}>
        <div>
          <p style={{ color: '#E8E8E8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>📚 Includes: First $50K Course</p>
          <p style={{ color: '#555', fontSize: '0.82rem', margin: 0 }}>6 lessons on income streams, investing (VOO, Roth IRA, BTC), saving, and mindset.</p>
        </div>
        <span style={{ color: '#D4A843', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>Included free</span>
      </div>

      <p style={{ color: '#333', fontSize: '0.75rem', marginTop: '28px', textAlign: 'center' }}>
        🔒 Secure checkout via Stripe · Cancel anytime from your account
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        {[['Privacy Policy', '/privacy'], ['Terms', '/terms'], ['Compliance', '/compliance']].map(([label, href]) => (
          <a key={href} href={href} style={{ color: '#333', fontSize: '0.75rem', textDecoration: 'none' }}>{label}</a>
        ))}
      </div>
    </div>
  )
}

const S = {
  page: { minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  glow: { position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(212,168,67,0.07) 0%, transparent 70%)', pointerEvents: 'none' },
  logo: { fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.5px', marginBottom: '24px' },
  headline: { color: '#E8E8E8', fontSize: '2rem', fontWeight: 900, marginBottom: '8px', textAlign: 'center' },
  sub: { color: '#555', fontSize: '0.95rem', marginBottom: '40px', textAlign: 'center' },
  cards: { display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '680px', marginBottom: '20px' },
  card: { flex: 1, minWidth: '280px', background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column' },
  badge: { position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#D4A843', color: '#0A0A0A', fontWeight: 800, fontSize: '0.7rem', padding: '3px 14px', borderRadius: '100px', whiteSpace: 'nowrap' },
  planLabelCard: { color: '#555', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' },
  cardPrice: { color: '#E8E8E8', fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px' },
  cardPer: { fontSize: '0.9rem', color: '#555', fontWeight: 400 },
  list: { listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, padding: 0 },
  listItem: { color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' },
  btnOutline: { background: '#161616', border: '1px solid #333', color: '#E8E8E8', fontWeight: 700, padding: '14px', borderRadius: '10px', textAlign: 'center', fontSize: '0.95rem', textDecoration: 'none', display: 'block' },
  btnGold: { background: 'linear-gradient(135deg, #D4A843, #F0C75A)', color: '#0A0A0A', fontWeight: 800, padding: '14px', borderRadius: '10px', textAlign: 'center', fontSize: '0.95rem', textDecoration: 'none', display: 'block' },
  courseCard: { width: '100%', maxWidth: '680px', background: '#111', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' },
}
