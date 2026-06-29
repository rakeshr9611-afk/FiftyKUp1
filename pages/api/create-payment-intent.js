import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  
  const stripeKey = process.env.STRIPE_SECRET_KEY || ''
  
  // Demo mode - bypass Stripe if no real key
  if (!stripeKey || stripeKey.includes('placeholder')) {
    return res.json({ demo: true })
  }

  const stripe = new Stripe(stripeKey)
  const { plan } = req.body
  const amount = plan === 'annual' ? 11999 : 1299
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
