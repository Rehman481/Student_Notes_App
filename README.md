# 📚 Student Notes App

A full-stack note management application built with **React** and **Supabase** that allows students to securely upload, store, and access their study materials from anywhere.

---

## ✨ Features

### 🔐 Authentication
- Email/password sign-up and login
- GitHub OAuth integration
- Secure session management
- Protected routes

### 📤 Note Management
- Upload notes (PDF, DOC, PPT, images, and more)
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

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | CSS3 with animations |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| File Storage | Supabase Storage |
| Routing | React Router v6 |
| Hosting | Vercel / Netlify |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed/set up:

- [Node.js](https://nodejs.org/) v16 or higher
- npm or yarn
- A [Supabase](https://supabase.com/) account and project

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Rehman481/Student_Notes_App.git
cd student-notes-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory and add the following:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> You can find these values in your Supabase project under **Project Settings → API**.

**4. Run the development server**
```bash
npm run dev
```

The app should now be running at `http://localhost:5173` (or the port shown in your terminal).

**5. Build for production**
```bash
npm run build
```

---

## 🗄️ Supabase Setup

To get the backend working correctly, you'll need to configure your Supabase project:

1. **Create a new Supabase project** at [supabase.com](https://supabase.com/).
2. **Enable Authentication providers**:
   - Email/Password (enabled by default)
   - GitHub OAuth (configure under **Authentication → Providers → GitHub**)
3. **Create a Storage bucket** (e.g., `notes`) for file uploads, and set appropriate access policies so users can only access their own files.
4. **Set up your database table(s)** for note metadata (title, subject, description, file URL, user ID, timestamps).
5. **Copy your project URL and anon key** into the `.env` file as shown above.

---

## 📁 Project Structure

```
student-notes-app/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/             # Route-level pages
│   ├── context/           # Auth/session context providers
│   ├── lib/                # Supabase client & helper functions
│   ├── styles/            # CSS files
│   ├── App.jsx
│   └── main.jsx
├── .env                    # Environment variables (not committed)
├── package.json
└── README.md
```

> Adjust this section to match your actual folder layout.

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase public anon/public API key |

---

## 🌐 Deployment

This project can be deployed easily to **Vercel** or **Netlify**:

1. Push your repository to GitHub.
2. Import the project into Vercel/Netlify.
3. Add the same environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the hosting platform's dashboard.
4. Deploy — the platform will automatically build and serve the app.

---

## 🧭 Roadmap

- [ ] Note sharing between users
- [ ] Folder/tag-based organization
- [ ] Full-text search across notes
- [ ] Offline access / PWA support
- [ ] Note versioning and history

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built as a student project to demonstrate full-stack development with React and Supabase, covering authentication, file storage, and a polished user experience.
