// Vercel serverless function wrapper for Express server
import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
await registerRoutes(app);

// Export for Vercel
export default app;