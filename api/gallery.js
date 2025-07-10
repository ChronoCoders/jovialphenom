export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const gallery = [
    {
      id: 1,
      imageUrl: "/assets/sweet-sting.png",
      caption: "Sweet Sting - Album Art"
    },
    {
      id: 2,
      imageUrl: "/assets/lip-service.png",
      caption: "Lip Service - Artwork"
    },
    {
      id: 3,
      imageUrl: "/assets/seductive-flow.png",
      caption: "Seductive Flow - Cover Art"
    }
  ];
  
  res.status(200).json(gallery);
}