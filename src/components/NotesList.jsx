import { supabase } from '../lib/supabase'
import './NotesList.css'

export default function NotesList({ notes, onDelete }) {
  const handleDelete = async (noteId) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      // First get the note to get file URL
      const { data: note, error: fetchError } = await supabase
        .from('notes')
        .select('file_url')
        .eq('id', noteId)
        .single()

      if (fetchError) throw fetchError

      // Extract file path from URL
      const filePath = note.file_url.split('/').slice(-2).join('/')

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('notes')
        .remove([filePath])

      if (storageError) throw storageError

      // Delete note from database
      const { error: dbError } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)

      if (dbError) throw dbError

      onDelete(noteId)
    } catch (error) {
      alert('Failed to delete note: ' + error.message)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <p>No notes uploaded yet. Upload your first note!</p>
      </div>
    )
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3>{note.title}</h3>
            <button 
              className="delete-button"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
          
          {note.subject && (
            <div className="note-subject">{note.subject}</div>
          )}
          
          {note.description && (
            <p className="note-description">{note.description}</p>
          )}
          
          <div className="note-meta">
            <span>📄 {note.file_name}</span>
            <span>{formatFileSize(note.file_size)}</span>
          </div>
          
          <div className="note-actions">
            <a 
              href={note.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-button"
            >
              View File
            </a>
          </div>
          
          <div className="note-date">
            Uploaded: {new Date(note.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}