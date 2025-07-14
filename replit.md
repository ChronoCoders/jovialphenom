# Jovial Phenom Music Portfolio Website

## Overview

This is a full-stack web application for Jovial Phenom, a lo-fi hip-hop and R&B music producer from New York. The application serves as a comprehensive music portfolio featuring streaming capabilities, press coverage, gallery sections, exclusive content, and fan engagement tools. The site combines modern web technologies with a sophisticated music-focused design system.

## Recent Changes (January 14, 2025)

✓ Completely removed Vercel deployment configuration and serverless functions
✓ Restored pure Express.js backend architecture with unified API routes
✓ Fixed asset structure by moving files to correct client/public/assets/ location
✓ Cleaned up attached_assets folder confusion and corrected all asset references
✓ Project now platform-agnostic and ready for any deployment environment
✓ All API endpoints working correctly with 200 responses in Express server
✓ Fixed gradient text rendering issue in Press Coverage section with cross-browser compatibility
✓ Created comprehensive Windows IIS deployment guide with SSL support
✓ Added Apache deployment configuration for Linux hosting
✓ Created Windows batch files for easy development and production startup

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between client and server responsibilities:

- **Frontend**: React-based SPA using Vite for fast development and building
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **Deployment**: Platform-agnostic (Express.js server)

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Email**: SendGrid integration for contact forms and newsletters

### Database Schema
The database includes tables for:
- `tracks`: Music tracks with metadata and streaming URLs
- `press_articles`: Press coverage and reviews
- `gallery_images`: Visual content with categorization
- `contact_submissions`: User inquiries and messages
- `newsletters`: Email subscriptions for fan engagement
- `exclusive_content`: Premium content for subscribers
- `admin_users`: Administrative access control
- `streaming_stats`: Analytics for music streaming

## Data Flow

1. **Music Streaming**: Audio files are served statically with a custom audio player context for global playback control
2. **Content Management**: Static JSON files serve as a content source with plans for database integration
3. **User Interactions**: Forms submit to API endpoints that store data in PostgreSQL
4. **Analytics**: Google Analytics integration for user behavior tracking
5. **SEO**: Structured data and comprehensive meta tags for search optimization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **drizzle-orm**: Type-safe database ORM
- **@sendgrid/mail**: Email service integration

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundling for production

### Third-party Integrations
- **Google Analytics**: User behavior tracking
- **Streaming Platforms**: Spotify, Apple Music, SoundCloud integration
- **SendGrid**: Email delivery service
- **Vercel**: Hosting and serverless functions

## Deployment Strategy

### Deployment Strategy
- **Express Server**: Single unified backend serving API and static assets
- **Static Assets**: Served from client build output and assets folder
- **API Routes**: Express routes handling all `/api/*` endpoints
- **Environment**: Node.js with Express.js framework

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: ESBuild bundles Express server for serverless deployment
3. **Database Migrations**: Drizzle handles schema migrations
4. **Asset Optimization**: Automatic optimization of images and code splitting

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Vite handles asset bundling and optimization
- **Caching**: Appropriate cache headers for static assets
- **Serverless**: Reduced cold start times with optimized bundle sizes

The architecture prioritizes developer experience with TypeScript throughout, fast development cycles with Vite, and production performance with serverless deployment on Vercel.