# 📚 Student Notes App

A full-stack note management application built with React and Supabase that allows students to securely upload, store, and access their study materials from anywhere.

## ✨ Features

### 🔐 Authentication
- Email/Password sign-up and login
- GitHub OAuth integration
- Secure session management
- Protected routes

### 📤 Note Management
- Upload notes (PDF, DOC, PPT, images, etc.)
- Add titles, subjects, and descriptions
- View notes in a clean grid layout
- Download or preview notes
- Delete notes when no longer needed

### ☁️ Cloud Storage
- Files stored securely in Supabase Storage
- Access notes from any device
- Automatic file organization by user

### 🎨 User Experience
- Clean, modern interface with animations
- Fully responsive design
- Dark mode support
- Real-time updates
- Glass morphism effects
- Smooth transitions

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js |
| **Styling** | CSS3 with animations |
| **Authentication** | Supabase Auth |
| **Database** | Supabase PostgreSQL |
| **File Storage** | Supabase Storage |
| **Routing** | React Router v6 |
| **Hosting** | Vercel / Netlify |

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/student-notes-app.git
cd student-notes-app
npm install

2. Install Dependencies
bash
npm install
3. Set up Environment Variables
bash
cp .env.example .env
Add your Supabase credentials to .env:

env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Set up Supabase Database
Run this SQL in your Supabase SQL Editor:

sql
-- Create notes table
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  subject TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own notes"
ON notes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
ON notes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
ON notes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
ON notes FOR DELETE
USING (auth.uid() = user_id);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('notes', 'notes', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage policies
CREATE POLICY "Users can upload their own notes"
ON storage.objects FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' 
  AND bucket_id = 'notes'
);

CREATE POLICY "Users can delete their own notes"
ON storage.objects FOR DELETE
USING (auth.uid() = owner AND bucket_id = 'notes');

CREATE POLICY "Public can view notes"
ON storage.objects FOR SELECT
USING (bucket_id = 'notes');
5. Configure GitHub OAuth
Go to GitHub Developer Settings

Click "New OAuth App"

Fill in the details:

Application name: Student Notes App

Homepage URL: http://localhost:5173

Authorization callback URL: https://your-project-ref.supabase.co/auth/v1/callback

Click "Register application"

Copy the Client ID and Client Secret

Go to Supabase Dashboard → Authentication → Providers

Enable GitHub and paste your credentials

6. Run the Application
bash
npm run dev
7. Open Your Browser

http://localhost:5173

 



