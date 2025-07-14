# Jovial Phenom Music Portfolio

## Overview

This is a full-stack music portfolio website for Jovial Phenom, a lo-fi hip-hop and R&B music producer from New York. The application combines a React frontend with an Express.js backend, featuring music streaming, contact forms, newsletter subscriptions, and administrative capabilities. The project emphasizes a sleek, modern aesthetic with integrated audio playback and social media connectivity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React 18 with TypeScript, using Vite for bundling and Tailwind CSS for styling
- **Backend**: Express.js with TypeScript serving both API endpoints and static assets
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Deployment**: PM2 process management with support for Windows IIS and Apache servers
- **Styling**: shadcn/ui component library with custom design system for music industry aesthetics

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript and ES modules
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state
- **Audio System**: Custom audio player context for global music playback control
- **UI Components**: shadcn/ui with Radix primitives for accessibility
- **Analytics**: Google Analytics integration with event tracking

### Backend Architecture
- **Server**: Express.js with TypeScript serving RESTful APIs
- **File Serving**: Static asset serving for music files and images
- **Development**: Vite middleware integration for hot reloading
- **Process Management**: PM2 configuration for production deployment

### Database Schema
- **Tracks**: Music metadata with streaming links and featured status
- **Press Articles**: Media coverage with publications and ratings
- **Gallery Images**: Visual content with categorization
- **Contact Submissions**: User inquiries with timestamps
- **Newsletter**: Email subscriptions with opt-out capability
- **Exclusive Content**: Premium content for subscribers
- **Admin Users**: Administrative access control
- **Streaming Stats**: Platform-specific play counts and metrics

### Audio Player System
- **Global Context**: Centralized audio playback state across components
- **Track Management**: Play, pause, seek, and volume controls
- **Multiple Formats**: Support for MP3 streaming and downloads
- **Progress Tracking**: Real-time playback position updates

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **API Processing**: Express routes handle CRUD operations via Drizzle ORM
3. **Database Operations**: PostgreSQL stores structured music and user data
4. **Real-time Updates**: Query invalidation triggers UI updates
5. **Asset Delivery**: Static files served directly by Express for optimal performance

## External Dependencies

### Core Technologies
- **React Ecosystem**: React 18, React Hook Form, React Query
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
- **UI Framework**: Radix UI primitives with Tailwind CSS
- **Email Service**: SendGrid for newsletter and contact form delivery
- **Analytics**: Google Analytics 4 for user behavior tracking

### Music Industry Integrations
- **Streaming Platforms**: Spotify, Apple Music, SoundCloud links
- **Social Media**: Instagram, Twitter/X, TikTok, YouTube connectivity
- **Audio Hosting**: Direct MP3 serving with download capabilities

### Development Tools
- **Build System**: Vite for frontend bundling and ESBuild for backend
- **Type Safety**: TypeScript across all layers with Zod validation
- **Code Quality**: ESLint and PostCSS for consistent styling

## Deployment Strategy

The application supports multiple deployment environments:

### Production Setup
- **Process Manager**: PM2 with clustering and auto-restart capabilities
- **Static Assets**: Direct file serving for music and images
- **Environment**: Production-optimized builds with minification

### Platform Support
- **Windows IIS**: Complete PowerShell automation scripts for IIS deployment
- **Apache**: Configuration guides for Linux server deployment
- **SSL/HTTPS**: Let's Encrypt integration for secure connections

### Development Workflow
- **Hot Reloading**: Vite development server with Express API proxy
- **Database Migrations**: Drizzle Kit for schema management
- **Asset Management**: Public directory structure for organized file serving

The architecture prioritizes performance for audio streaming, SEO optimization for music discovery, and maintainable code organization for ongoing development.