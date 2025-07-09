import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PressArticle } from "@shared/schema";

export default function Press() {
  const { data: pressArticles, isLoading } = useQuery<PressArticle[]>({
    queryKey: ["/api/press"],
  });

  if (isLoading) {
    return (
      <section id="press" className="py-20 bg-[var(--bg-secondary)]">
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
    <section id="press" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text" data-text="Press Coverage">Press Coverage</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            What the music industry is saying about Jovial Phenom's unique sound and artistic vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pressArticles?.map((article) => (
            <Card key={article.id} className="glass-card hover-glow transition-all bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[var(--accent-gold)] rounded-full flex items-center justify-center mr-4">
                    <Quote className="text-black" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--accent-gold)]">{article.publication}</h4>
                    <p className="text-sm text-gray-400">{article.title}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-300 mb-4">
                  "{article.quote}"
                </p>
                <div className="flex text-[var(--accent-gold)]">
                  {[...Array(article.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
