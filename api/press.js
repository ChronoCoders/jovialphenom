export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const press = [
    {
      id: 1,
      publication: "Muse Chronicle",
      title: "Seductive Flow Review",
      quote: "A masterpiece of modern lo-fi production that captivates from the first beat.",
      rating: 5
    }
  ];
  
  res.status(200).json(press);
}