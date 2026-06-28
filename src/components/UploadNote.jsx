import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './UploadNote.css'

export default function UploadNote({ onUpload }) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    file: null,
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, file })
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!formData.file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('User not authenticated')

      // Upload file to storage
      const fileExt = formData.file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notes')
        .upload(fileName, formData.file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('notes')
        .getPublicUrl(fileName)

      // Save note metadata to database
      const { error: dbError } = await supabase
        .from('notes')
        .insert([
          {
            user_id: user.id,
            title: formData.title || formData.file.name,
            description: formData.description,
            file_url: publicUrl,
            file_name: formData.file.name,
            file_size: formData.file.size,
            subject: formData.subject,
          },
        ])

      if (dbError) throw dbError

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        subject: '',
        file: null,
      })
      setShowModal(false)
      
      // Notify parent to refresh notes
      onUpload()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        className="upload-button" 
        onClick={() => setShowModal(true)}
      >
        + Upload Note
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload New Note</h2>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpload} className="upload-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter subject (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description (optional)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="file">File *</label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xlsx,.xls"
                />
                {formData.file && (
                  <div className="file-info">
                    {formData.file.name} ({(formData.file.size / 1024).toFixed(2)} KB)
                  </div>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}