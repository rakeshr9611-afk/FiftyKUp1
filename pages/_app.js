import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'rakeshr9611@gmail.com'

function AuthGate({ Component, pageProps }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    const publicPages = ['/auth', '/subscribe']
    const isPublic = publicPages.includes(router.pathname)
    const isAdmin = session?.user?.email === ADMIN_EMAIL
    const isSubscribed = typeof window !== 'undefined' && localStorage.getItem('fiftykup_subscribed') === 'true'

    if (!session && !isPublic) {
      router.replace('/auth')
    } else if (session && !isSubscribed && !isPublic && !isAdmin) {
      router.replace('/subscribe')
    } else if (session && (isSubscribed || isAdmin) && router.pathname === '/subscribe') {
      router.replace('/')
    }
  }, [session, status, router.pathname])

  if (status === 'loading') return <div style={{ background: '#0A0A0A', minHeight: '100vh' }} />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthGate Component={Component} pageProps={pageProps} />
    </SessionProvider>
  )
}
