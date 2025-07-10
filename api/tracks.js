export default function handler(req, res) {
  const tracks = [
    {
      id: 1,
      title: "Seductive Flow",
      description: "A mesmerizing blend of lo-fi hip-hop and R&B that takes you on a sensual journey through urban landscapes.",
      duration: "3:45",
      imageUrl: "/assets/seductive-flow.png",
      audioUrl: "/assets/Seductive Flow_1751839140526.mp3",
      isFeatured: true
    }
  ];
  
  res.status(200).json(tracks);
}