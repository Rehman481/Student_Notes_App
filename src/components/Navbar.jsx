import { supabase } from '../lib/supabase'
import './Navbar.css'

export default function Navbar({ session }) {
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

  // Check if user signed in with GitHub
  const isGitHubUser = user?.app_metadata?.provider === 'github'
  const providerIcon = isGitHubUser ? '🐙' : '👤'

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>📚 Student Notes</h2>
      </div>
      
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
    </nav>
  )
}