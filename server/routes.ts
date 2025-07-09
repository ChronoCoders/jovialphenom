import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSchema, insertExclusiveContentSchema, insertAdminUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tracks
  app.get("/api/tracks", async (req, res) => {
    try {
      const tracks = await storage.getTracks();
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tracks" });
    }
  });

  // Get featured tracks
  app.get("/api/tracks/featured", async (req, res) => {
    try {
      const tracks = await storage.getFeaturedTracks();
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured tracks" });
    }
  });

  // Get track by ID
  app.get("/api/tracks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const track = await storage.getTrackById(id);
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      res.json(track);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch track" });
    }
  });

  // Get press articles
  app.get("/api/press", async (req, res) => {
    try {
      const articles = await storage.getPressArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch press articles" });
    }
  });

  // Get gallery images
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ message: "Contact submission received successfully", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(validatedData);
      res.json({ message: "Successfully subscribed to newsletter", id: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Get exclusive content for subscribers
  app.get("/api/exclusive-content", async (req, res) => {
    try {
      const content = await storage.getActiveExclusiveContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exclusive content" });
    }
  });

  // Get streaming stats
  app.get("/api/streaming-stats", async (req, res) => {
    try {
      const stats = await storage.getStreamingStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch streaming stats" });
    }
  });

  // Admin routes (simplified for now - would need authentication in production)
  app.get("/api/admin/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.get("/api/admin/newsletter-subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
