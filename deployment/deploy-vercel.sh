#!/bin/bash

# Vercel Deployment Script for Jovial Phenom
echo "🚀 Deploying Jovial Phenom to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Set up environment variables
echo "⚙️ Setting up environment variables..."
vercel env add NODE_ENV production
vercel env add VITE_GA_MEASUREMENT_ID G-38JGPGTZ8C

# Deploy to preview first
echo "🔍 Deploying preview version..."
vercel

echo "✅ Preview deployment complete!"
echo "🔗 Check the preview URL above to test your deployment."
echo ""
echo "To deploy to production, run:"
echo "vercel --prod"
echo ""
echo "To set up a custom domain:"
echo "1. Go to your Vercel dashboard"
echo "2. Navigate to Settings → Domains"
echo "3. Add your domain (e.g., jovialphenom.com)"
echo "4. Configure DNS as instructed by Vercel"