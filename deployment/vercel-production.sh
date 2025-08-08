#!/bin/bash

# Production Deployment to Vercel
echo "🚀 Deploying Jovial Phenom to Vercel Production..."

# Confirm production deployment
read -p "Are you sure you want to deploy to production? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Deploy to production
echo "🔥 Deploying to production..."
vercel --prod

echo "✅ Production deployment complete!"
echo ""
echo "Your Jovial Phenom music portfolio is now live!"
echo ""
echo "Next steps:"
echo "1. Test your live site thoroughly"
echo "2. Set up custom domain if needed"
echo "3. Monitor performance in Vercel dashboard"
echo "4. Set up automatic deployments via Git integration"