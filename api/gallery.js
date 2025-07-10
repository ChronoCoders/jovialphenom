export default function handler(req, res) {
  const gallery = [
    {
      id: 1,
      imageUrl: "/assets/sweet-sting.png",
      caption: "Sweet Sting - Album Art"
    }
  ];
  
  res.status(200).json(gallery);
}