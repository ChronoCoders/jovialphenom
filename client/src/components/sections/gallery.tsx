import { useQuery } from "@tanstack/react-query";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const { data: galleryImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Visual Gallery</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Behind the scenes glimpses into the creative process and artistic vision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages?.map((image) => (
            <div
              key={image.id}
              className="aspect-square bg-cover bg-center rounded-2xl hover-glow transition-all cursor-pointer group"
              style={{ backgroundImage: `url('${image.imageUrl}')` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-6">
                <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
