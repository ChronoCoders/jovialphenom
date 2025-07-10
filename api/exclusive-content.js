export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const exclusiveContent = [
    {
      id: 1,
      title: "Producer Commentary: Seductive Flow",
      description: "Behind the scenes look at the creative process",
      type: "video",
      isActive: true
    }
  ];
  
  res.status(200).json(exclusiveContent);
}