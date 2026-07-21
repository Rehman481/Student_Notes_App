import { supabase } from '../lib/supabase'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar({ session }) {
  const { theme, toggleTheme } = useTheme()
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const user = session?.user
  const userEmail = user?.email
  const userName = user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.user_metadata?.user_name ||
                   userEmail
  const userAvatar = user?.user_metadata?.avatar_url

  const isGitHubUser = user?.app_metadata?.provider === 'github'
  const providerIcon = isGitHubUser ? '🐙' : '👤'

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>📚 Student Notes</h2>
      </div>
      
      <div className="navbar-controls">
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        <div className="navbar-user">
          {userAvatar && (
            <img 
              src={userAvatar} 
              alt={userName}
              className="user-avatar"
            />
          )}
          <div className="user-info">
            <span className="user-name">
              {providerIcon} {userName}
            </span>
            <span className="user-email">{userEmail}</span>
            {isGitHubUser && (
              <span className="user-provider">via GitHub</span>
            )}
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}