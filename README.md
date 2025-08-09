# Jovial Phenom Music Portfolio

A professional full-stack music portfolio website for Jovial Phenom, a lo-fi hip-hop and R&B music producer from New York. This application provides an immersive digital music experience with comprehensive streaming analytics, audio playback, and fan engagement features.

## 🎵 Features

### Music Experience
- **Audio Player**: Global audio context with play, pause, seek, and volume controls
- **Track Management**: Featured tracks, full discography, and streaming links
- **Download Capabilities**: Direct MP3 downloads for fans
- **Multiple Formats**: Support for various audio formats and streaming platforms

### Content Management
- **Press Coverage**: Media articles and publications with ratings
- **Photo Gallery**: Categorized visual content and album artwork
- **Exclusive Content**: Premium content for newsletter subscribers
- **Contact System**: Professional inquiry handling with SendGrid integration

### Analytics & Admin
- **Streaming Stats**: Real-time analytics from multiple platforms
- **Admin Panel**: Content management and user interaction tracking
- **Google Analytics**: Comprehensive user behavior tracking
- **Newsletter Management**: Email subscriptions with opt-out capability

### Social Integration
- **Platform Links**: Spotify, Apple Music, SoundCloud integration
- **Social Media**: Instagram, Twitter/X, TikTok, YouTube connectivity
- **SEO Optimized**: Meta tags and Open Graph for social sharing

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript and ES modules
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with shadcn/ui component library
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **Framer Motion** for smooth animations

### Backend
- **Express.js** with TypeScript serving RESTful APIs
- **PostgreSQL** database with Neon serverless hosting
- **Drizzle ORM** for type-safe database operations
- **PM2** process management for production deployment

### Audio System
- **Custom Audio Context**: Global playback state management
- **Progress Tracking**: Real-time playback position updates
- **Cross-browser Support**: Optimized for all modern browsers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChronoCoders/jovialphenom.git
   cd jovialphenom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Database setup**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5000` to see the application.

## 📁 Project Structure

```
jovial-phenom/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── contexts/      # React contexts (audio player)
│   └── public/            # Static assets
├── server/                # Express.js backend
│   ├── routes/           # API route definitions
│   └── index.ts          # Main server file
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
├── deployment/           # Deployment configurations
│   ├── apache-setup.md   # Apache server setup
│   ├── windows-iis-setup.md # Windows IIS deployment
│   └── deploy-cmd.bat    # Windows CMD deployment
└── assets/              # Project assets and media
```

## 🎛 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_postgresql_connection_string
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Required Services
- **Database**: PostgreSQL (Neon recommended for serverless)
- **Email**: SendGrid for contact forms and newsletters
- **Analytics**: Google Analytics 4 for user tracking

## 📊 Database Schema

The application uses a comprehensive schema with the following main entities:

- **Tracks**: Music metadata with streaming links and featured status
- **Press Articles**: Media coverage with publications and ratings
- **Gallery Images**: Visual content with categorization
- **Contact Submissions**: User inquiries with timestamps
- **Newsletter Subscriptions**: Email list with opt-out capability
- **Exclusive Content**: Premium content for subscribers
- **Admin Users**: Administrative access control
- **Streaming Stats**: Platform-specific play counts and metrics

## 🎨 UI Components

Built with **shadcn/ui** component library featuring:
- Accessible design with Radix UI primitives
- Dark/light mode support
- Responsive layout for all devices
- Custom audio player interface
- Interactive gallery and press sections
- Professional contact forms

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push database schema changes
npm run check        # TypeScript type checking
```

### Code Quality
- **TypeScript**: Full type safety across frontend and backend
- **ESLint**: Code linting and formatting
- **Zod**: Runtime type validation
- **Drizzle ORM**: Type-safe database queries

## 🚢 Deployment

The project supports multiple deployment options:

### Production Deployment
```bash
npm run build
npm start
```

### Platform-Specific Guides
- **Windows IIS**: See `deployment/windows-iis-setup.md`
- **Apache Server**: See `deployment/apache-setup.md`
- **Windows CMD**: Use `deployment/deploy-cmd.bat`

### Process Management
Production deployments use PM2 for:
- Process clustering and auto-restart
- Memory management and monitoring
- Zero-downtime deployments
- Log management

## 🎵 Audio Features

### Global Audio Player
- **Context-based**: Centralized state management
- **Track Queue**: Automatic progression through tracks
- **Seek Controls**: Precise playback position control
- **Volume Management**: User-preferred volume settings
- **Format Support**: MP3, WAV, and streaming links

### Streaming Integration
- Direct links to Spotify, Apple Music, SoundCloud
- Embedded players for immediate listening
- Download options for offline access
- Play count tracking and analytics

## 📈 Analytics & Monitoring

### Google Analytics Integration
- Page view tracking for single-page application
- Custom event tracking for music plays
- User interaction analytics
- Performance monitoring

### Streaming Analytics
- Platform-specific play counts
- Geographic listener data
- Track popularity metrics
- Growth trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Maintain responsive design principles
- Test audio features across browsers
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎼 About Jovial Phenom

Jovial Phenom is a talented music producer from New York who specializes in lo-fi hip-hop and R&B. Combining traditional musical artistry with modern technology and AI-assisted production techniques, Jovial Phenom creates unique soundscapes that resonate with contemporary audiences.

### Musical Style
- **Lo-fi Hip-Hop**: Smooth, atmospheric beats with vintage feel
- **R&B Fusion**: Modern R&B elements with classic influences
- **AI Integration**: Innovative use of AI in music production
- **Tech-Forward**: Software engineering background influences creative process

## 🔗 Links

- **Live Site**: jovialphenom.com
- **Spotify**: [Jovial Phenom on Spotify]
- **Apple Music**: [Jovial Phenom on Apple Music]
- **SoundCloud**: [Jovial Phenom on SoundCloud]
- **Instagram**: [@jovialphenom]
- **Twitter**: [@jovialphenom]

## 📞 Support

For technical issues or questions about the codebase:
- Open an issue on GitHub
- Check existing documentation in `/deployment`
- Review component examples in `/client/src/components`

For music-related inquiries:
- Use the contact form on the live site
- Follow on social media platforms
- Subscribe to the newsletter for updates

---

Built with ❤️ for the music community. Experience the intersection of technology and artistry with Jovial Phenom.
