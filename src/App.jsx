import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { ThemeProvider } from './context/ThemeContext'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import './App.css'

const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/" replace />
  }
  return children
}

function AppContent() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Handle OAuth callback automatically
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      
      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        // Clean up URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname)
        // Fetch session after exchange
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      }
    }

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)

      if (session && window.location.pathname === '/') {
        navigate('/dashboard')
      }
    }

    handleAuthCallback()
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setLoading(false)

        if (!session && window.location.pathname !== '/') {
          navigate('/')
        } else if (session && window.location.pathname === '/') {
          navigate('/dashboard')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute session={session}>
            <Dashboard session={session} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={session ? '/dashboard' : '/'} />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      
        <AppContent />
      
    </ThemeProvider>
  )
}

export default App