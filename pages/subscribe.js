import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const CARD_STYLE = {
  style: {
    base: {
      color: '#E8E8E8',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#444' },
    },
    invalid: { color: '#FF5F57' },
  },
}

function CheckoutForm({ plan, onBack }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()

      // Demo mode - no real Stripe key, just bypass
      if (data.demo) {
        localStorage.setItem('fiftykup_subscribed', 'true')
        router.replace('/')
        return
      }

      if (data.error) throw new Error(data.error)
      if (!stripe || !elements) throw new Error('Stripe not loaded')

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement), billing_details: { name, email } },
      })
      if (result.error) { setError(result.error.message) }
      else { localStorage.setItem('fiftykup_subscribed', 'true'); router.replace('/') }
    } catch (err) {
      setError(err.message || 'Payment failed. Try again.')
    } finally { setLoading(false) }
  }

  const isAnnual = plan === 'annual'

  return (
    <div style={S.page}>
      <div style={S.glow} />
      <div style={S.formWrap}>
        <button onClick={onBack} style={S.back}>← Back to plans</button>
        <div style={S.logo}><span style={{ color: '#D4A843' }}>FIFTYK</span><span style={{ color: '#E8E8E8' }}>UP</span></div>

        <div style={S.planSummary}>
          <div>
            <p style={S.planLabel}>{isAnnual ? 'ANNUAL PLAN' : 'MONTHLY PLAN'}</p>
            <p style={S.planPrice}>{isAnnual ? '$119.99' : '$12.99'}<span style={S.planPer}>{isAnnual ? '/yr' : '/mo'}</span></p>
            {isAnnual && <p style={S.planSave}>You save $35.89 vs monthly</p>}
          </div>
          <div style={S.trialBadge}>7-day free trial</div>
        </div>

        <form onSubmit={handleSubmit} style={S.form}>
          <div style={S.field}>
            <label style={S.label}>Full Name</label>
            <input style={S.input} type="text" placeholder="Alex Johnson" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div style={S.field}>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" placeholder="you@college.edu" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={S.field}>
            <label style={S.label}>Card Details</label>
            <div style={S.cardBox}>
              <CardElement options={CARD_STYLE} />
            </div>
          </div>
          {error && <div style={S.errorBox}>⚠ {error}</div>}
          <button style={{ ...S.btn, opacity: loading || !stripe ? 0.7 : 1 }} type="submit" disabled={loading || !stripe}>
            {loading ? 'Processing...' : `Start Free Trial — ${isAnnual ? '$119.99/yr' : '$12.99/mo'}`}
          </button>
          <div style={S.security}>🔒 Secured by Stripe · Cancel anytime · No commitment</div>
        </form>
      </div>
    </div>
  )
}

function PlanSelect({ onSelect }) {
  const features = ['7-day free trial', 'All income methods', 'Stack planner', 'Bills tracker', '$50K timeline']
  return (
    <div style={S.page}>
      <div style={S.glow} />
      <div style={S.logo}><span style={{ color: '#D4A843' }}>FIFTYK</span><span style={{ color: '#E8E8E8' }}>UP</span></div>
      <h1 style={S.headline}>Your first <span style={{ color: '#D4A843' }}>$50,000</span></h1>
      <p style={S.sub}>The complete system for college students building real wealth.</p>

      <div style={S.cards}>
        <div style={S.card} onClick={() => onSelect('monthly')}>
          <p style={S.planLabelCard}>MONTHLY</p>
          <h2 style={S.cardPrice}>$12.99<span style={S.cardPer}>/mo</span></h2>
          <p style={S.cardNote}>$155.88/year</p>
          <ul style={S.list}>{features.map(f => <li key={f} style={S.listItem}><span style={{ color: '#4CAF7D' }}>✓</span> {f}</li>)}</ul>
          <div style={S.btnOutline}>Select →</div>
        </div>

        <div style={{ ...S.card, border: '2px solid #D4A843', position: 'relative' }} onClick={() => onSelect('annual')}>
          <div style={S.badge}>BEST VALUE</div>
          <p style={{ ...S.planLabelCard, color: '#D4A843' }}>ANNUAL</p>
          <h2 style={S.cardPrice}>$119.99<span style={S.cardPer}>/yr</span></h2>
          <p style={{ ...S.cardNote, color: '#D4A843' }}>Save $35.89 vs monthly 🎉</p>
          <ul style={S.list}>{features.map(f => <li key={f} style={S.listItem}><span style={{ color: '#4CAF7D' }}>✓</span> {f}</li>)}</ul>
          <div style={S.btnGold}>Select →</div>
        </div>
      </div>

      <div style={S.courseCard}>
        <div>
          <p style={{ color: '#D4A843', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>COURSE — SEPARATE PURCHASE</p>
          <p style={{ color: '#E8E8E8', fontWeight: 800, fontSize: '1rem', marginBottom: '3px' }}>First $50K for College Students</p>
          <p style={{ color: '#555', fontSize: '0.82rem' }}>6 lessons · Full blueprint · Instant access</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ color: '#E8E8E8', fontWeight: 900, fontSize: '1.4rem' }}>$29.99</p>
          <a href="https://fiftykup.gumroad.com/l/jnjbad" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A843', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
            Get Course →
          </a>
        </div>
      </div>

      <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '20px' }}>Cancel anytime. No commitment.</p>
    </div>
  )
}

export default function Subscribe() {
  const { status } = useSession()
  const router = useRouter()
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth')
  }, [status])

  if (status === 'loading') return <div style={{ background: '#0A0A0A', minHeight: '100vh' }} />

  return (
    <Elements stripe={stripePromise}>
      {plan ? <CheckoutForm plan={plan} onBack={() => setPlan(null)} /> : <PlanSelect onSelect={setPlan} />}
    </Elements>
  )
}

const S = {
  page: { minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  glow: { position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(212,168,67,0.07) 0%, transparent 70%)', pointerEvents: 'none' },
  logo: { fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.5px', marginBottom: '20px' },
  headline: { color: '#E8E8E8', fontSize: '2rem', fontWeight: 900, marginBottom: '8px', textAlign: 'center' },
  sub: { color: '#555', fontSize: '0.95rem', marginBottom: '40px', textAlign: 'center' },
  cards: { display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '680px', marginBottom: '20px' },
  card: { flex: 1, minWidth: '280px', background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', cursor: 'pointer' },
  badge: { position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#D4A843', color: '#0A0A0A', fontWeight: 800, fontSize: '0.7rem', padding: '3px 14px', borderRadius: '100px', whiteSpace: 'nowrap' },
  planLabelCard: { color: '#555', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' },
  cardPrice: { color: '#E8E8E8', fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px' },
  cardPer: { fontSize: '0.9rem', color: '#555', fontWeight: 400 },
  cardNote: { color: '#FF5F57', fontSize: '0.82rem', marginBottom: '24px' },
  list: { listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 },
  listItem: { color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' },
  btnOutline: { background: '#161616', border: '1px solid #333', color: '#E8E8E8', fontWeight: 700, padding: '14px', borderRadius: '10px', textAlign: 'center', fontSize: '0.95rem' },
  btnGold: { background: 'linear-gradient(135deg, #D4A843, #F0C75A)', color: '#0A0A0A', fontWeight: 800, padding: '14px', borderRadius: '10px', textAlign: 'center', fontSize: '0.95rem' },
  courseCard: { width: '100%', maxWidth: '680px', background: '#111', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' },
  formWrap: { width: '100%', maxWidth: '440px' },
  back: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '28px', padding: 0, display: 'block' },
  planSummary: { background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  planLabel: { color: '#555', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' },
  planPrice: { color: '#E8E8E8', fontSize: '1.8rem', fontWeight: 900 },
  planPer: { fontSize: '0.9rem', color: '#555', fontWeight: 400 },
  planSave: { color: '#D4A843', fontSize: '0.78rem', fontWeight: 600, marginTop: '2px' },
  trialBadge: { background: 'rgba(76,175,125,0.12)', border: '1px solid rgba(76,175,125,0.3)', color: '#4CAF7D', fontSize: '0.78rem', fontWeight: 700, padding: '6px 12px', borderRadius: '100px', whiteSpace: 'nowrap' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.78rem', color: '#555', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' },
  input: { background: '#111', border: '1px solid #222', borderRadius: '10px', padding: '13px 16px', color: '#E8E8E8', fontSize: '0.95rem', outline: 'none' },
  cardBox: { background: '#111', border: '1px solid #222', borderRadius: '10px', padding: '16px' },
  errorBox: { background: 'rgba(255,95,87,0.08)', border: '1px solid rgba(255,95,87,0.3)', borderRadius: '8px', padding: '12px 16px', color: '#FF5F57', fontSize: '0.85rem' },
  btn: { background: 'linear-gradient(135deg, #D4A843, #F0C75A)', color: '#0A0A0A', border: 'none', borderRadius: '10px', padding: '16px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' },
  security: { textAlign: 'center', color: '#444', fontSize: '0.78rem' },
}
