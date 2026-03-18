# 📚 EduLearn - Gamified E-Learning Platform

A modern, gamified educational platform designed for rural areas with interactive learning experiences, 3D animations, and seamless authentication.

## 🚀 Live Demo

- **Login Page:** [http://localhost:3001/login](http://localhost:3001/login)
- **Dashboard:** [http://localhost:3001/dashboard](http://localhost:3001/dashboard)

## ✨ Features

### 🎮 Gamified Learning Experience
- **XP System** - Earn experience points for completing lessons
- **Badge Collection** - Unlock achievements for milestones
- **Quest System** - Complete learning challenges
- **Progress Tracking** - Real-time learning analytics

### 🎨 Modern UI/UX
- **3D Animations** - Interactive floating book scenes with Three.js
- **Smooth Transitions** - Framer Motion powered animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Educational-focused gradient backgrounds

### 🔐 Secure Authentication
- **Google OAuth** - One-click social login
- **Firebase Auth** - Secure user management
- **Protected Routes** - Dashboard access control

### 📱 Rural-Friendly Features
- **Offline Support** - Progressive Web App capabilities
- **Low Bandwidth Mode** - Optimized content delivery
- **Multiple Languages** - Localization support ready

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15.5.3 + React 19.1.1
- **Language:** TypeScript 5.9.2
- **Styling:** Tailwind CSS 3.4.17 + PostCSS
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animations:** Framer Motion
- **UI Components:** Headless UI + Heroicons
- **State Management:** Zustand + React Query + Context API

### Backend
- **Runtime:** Node.js + Next.js API Routes
- **Database:** MongoDB + Mongoose 8.18.1
- **Authentication:** Firebase Auth + Admin SDK
- **Cloud Services:** Firebase (Firestore, Storage, Analytics)

### Development Tools
- **Build System:** Next.js + SWC + Webpack
- **Type Safety:** TypeScript + ESLint
- **Version Control:** Git + GitHub
- **Deployment:** Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishabh0702-web/E_Learning_SIH.git
   cd E_Learning_SIH
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Login page: [http://localhost:3000/login](http://localhost:3000/login)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── login/          # Authentication page
│   ├── dashboard/      # Main dashboard
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   └── three/          # 3D components
├── lib/                # Core utilities
│   ├── firebase.ts     # Firebase configuration
│   ├── AuthContext.tsx # Authentication context
│   └── mongodb.ts      # Database connection
├── styles/             # Global styles
└── types/              # TypeScript definitions
```

## 🎯 Key Features Implementation

### 3D Learning Environment
```typescript
// Interactive floating book with Three.js
<Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
  <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
    <Book />
  </Float>
</Canvas>
```

### Gamified Progress System
- XP tracking with visual progress bars
- Badge system with unlock animations
- Quest completion mechanics
- Leaderboard integration ready

### Responsive Authentication
- Google OAuth integration
- Secure JWT token management
- Auto-redirect based on auth state
- Mobile-optimized login flow

## 🌟 Future Enhancements

### Phase 1: Enhanced Gamification
- [ ] Leaderboards and competitions
- [ ] Advanced badge system
- [ ] Social learning features
- [ ] Peer collaboration tools

### Phase 2: AI Integration
- [ ] AI-powered tutoring
- [ ] Personalized learning paths
- [ ] Content recommendation engine
- [ ] Voice interaction support

### Phase 3: Rural Optimization
- [ ] Offline content synchronization
- [ ] SMS integration for low-connectivity areas
- [ ] Local language support
- [ ] Community learning hubs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishabh Sharma**
- GitHub: [@Rishabh0702-web](https://github.com/Rishabh0702-web)
- Project: [E_Learning_SIH](https://github.com/Rishabh0702-web/E_Learning_SIH)

## 🙏 Acknowledgments

- Smart India Hackathon 2025
- Firebase for authentication services
- Vercel for deployment platform
- Three.js community for 3D graphics support

---

**Built with ❤️ for rural education empowerment**