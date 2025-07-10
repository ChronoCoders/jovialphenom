export default function handler(req, res) {
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