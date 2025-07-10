// Vercel serverless function for API endpoints
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple storage for demo
const storage = {
  tracks: [
    {
      id: 1,
      title: "Seductive Flow",
      description: "A mesmerizing blend of lo-fi hip-hop and R&B that takes you on a sensual journey through urban landscapes.",
      duration: "3:45",
      imageUrl: "/assets/seductive-flow.png",
      audioUrl: "/assets/seductive-flow.mp3",
      isFeatured: true
    }
  ],
  press: [
    {
      id: 1,
      publication: "Muse Chronicle",
      title: "Seductive Flow Review",
      quote: "A masterpiece of modern lo-fi production that captivates from the first beat.",
      rating: 5
    }
  ],
  gallery: [
    {
      id: 1,
      imageUrl: "/assets/sweet-sting.png",
      caption: "Sweet Sting - Album Art"
    }
  ],
  exclusiveContent: [
    {
      id: 1,
      title: "Producer Commentary: Seductive Flow",
      description: "Behind the scenes look at the creative process",
      type: "video",
      isActive: true
    }
  ]
};

// API Routes
app.get('/api/tracks', (req, res) => {
  res.json(storage.tracks);
});

app.get('/api/tracks/featured', (req, res) => {
  res.json(storage.tracks.filter(t => t.isFeatured));
});

app.get('/api/press', (req, res) => {
  res.json(storage.press);
});

app.get('/api/gallery', (req, res) => {
  res.json(storage.gallery);
});

app.get('/api/exclusive-content', (req, res) => {
  res.json(storage.exclusiveContent);
});

app.get('/api/streaming-stats', (req, res) => {
  res.json([]);
});

app.post('/api/contact', (req, res) => {
  res.json({ success: true, message: "Message sent successfully" });
});

app.post('/api/newsletter', (req, res) => {
  res.json({ success: true, message: "Subscribed successfully" });
});

// Export for Vercel
export default app;