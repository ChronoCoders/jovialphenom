# Vercel Deployment Guide for Jovial Phenom

## Quick Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Directory
```bash
# In your project root directory
vercel

# For production deployment
vercel --prod
```

## Project Configuration

### Build Configuration
The project is configured with `vercel.json` to:
- Build the React frontend using Vite
- Deploy the Express.js backend as serverless functions
- Route API calls to the backend
- Serve static assets from the frontend build

### Environment Variables
Add these environment variables in your Vercel dashboard:

```
NODE_ENV=production
VITE_GA_MEASUREMENT_ID=G-38JGPGTZ8C
```

### Custom Domain Setup
1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain (e.g., jovialphenom.com)
4. Configure DNS records as instructed by Vercel

## File Structure for Vercel

```
project-root/
├── vercel.json              # Vercel configuration
├── client/                  # Frontend (React/Vite)
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/               # Built frontend (auto-generated)
├── server/                  # Backend (Express.js)
│   └── index.ts            # Main server file
└── shared/                 # Shared types and schemas
```

## Deployment Process

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Every push to main branch triggers automatic deployment
3. Preview deployments for pull requests

### Manual Deployment
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy with custom domain
vercel --prod --local-config=vercel.json
```

## Build Scripts

### Frontend Build (client/package.json)
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Backend Build
The backend is automatically built by Vercel using the TypeScript files.

## Performance Optimization

### Frontend Optimizations
- Vite automatically optimizes the build
- Assets are served from Vercel's global CDN
- Automatic code splitting and tree shaking

### Backend Optimizations
- Serverless functions with cold start optimization
- Automatic scaling based on traffic
- Edge caching for static content

## Monitoring and Analytics

### Vercel Analytics
Enable analytics in your Vercel dashboard for:
- Page views and user sessions
- Performance metrics
- Core Web Vitals

### Custom Analytics
The project includes Google Analytics integration:
- Pageview tracking
- Event tracking for music plays
- User interaction analytics

## Troubleshooting

### Common Issues

**Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

**API Route Issues**
- Verify routes are correctly configured in vercel.json
- Check serverless function logs
- Ensure proper CORS headers

**Asset Loading Issues**
- Verify asset paths in the build output
- Check public directory structure
- Ensure proper routing in vercel.json

### Debugging Commands
```bash
# Check deployment status
vercel list

# View deployment logs
vercel logs [deployment-url]

# Test locally
vercel dev
```

## Security Considerations

### Environment Variables
- Store sensitive data in Vercel environment variables
- Never commit secrets to repository
- Use preview/production environment separation

### CORS Configuration
```typescript
// In your Express server
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : ['http://localhost:3000', 'http://localhost:5000']
}));
```

## Cost Considerations

### Vercel Pricing
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial projects
- **Enterprise**: Custom pricing for large applications

### Resource Limits
- **Hobby**: 100GB bandwidth, 6000 build minutes
- **Pro**: 1TB bandwidth, 24000 build minutes
- **Functions**: 10s execution time (Hobby), 60s (Pro)

## Alternative Deployment Commands

### Using Git Integration
```bash
# Connect repository
vercel --confirm

# Set up automatic deployments
git push origin main  # Triggers deployment
```

### Using GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Support and Resources

### Vercel Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Static Site Generation](https://vercel.com/docs/concepts/next.js/static-site-generation)

### Project-Specific Help
- Check `deployment/README-Windows.md` for Windows-specific instructions
- Review `deployment/apache-setup.md` for self-hosting alternatives
- Use `manage-cmd.bat` for local development management

Your Jovial Phenom music portfolio is now ready for Vercel deployment with optimized performance and professional hosting capabilities!