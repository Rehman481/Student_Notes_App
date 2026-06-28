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

 **Clone the repository**
```bash
git clone https://github.com/yourusername/student-notes-app.git
cd student-notes-app
npm install

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

