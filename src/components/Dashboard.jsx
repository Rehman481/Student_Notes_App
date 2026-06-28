import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import NotesList from './NotesList'
import UploadNote from './UploadNote'
import Navbar from './Navbar'
import './Dashboard.css'

export default function Dashboard({ session }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleNoteUpload = () => {
    fetchNotes()
  }

  const handleNoteDelete = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId))
  }

  return (
    <div className="dashboard">
      <Navbar session={session} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>My Notes</h1>
          <UploadNote onUpload={handleNoteUpload} />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NotesList 
            notes={notes} 
            onDelete={handleNoteDelete}
          />
        )}
      </div>
    </div>
  )
}