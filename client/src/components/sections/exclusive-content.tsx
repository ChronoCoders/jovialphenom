import { useQuery } from "@tanstack/react-query";
import { Lock, Play, Video, Music, FileText, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExclusiveContent } from "@shared/schema";

export default function ExclusiveContentSection() {
  const { data: exclusiveContent, isLoading } = useQuery<ExclusiveContent[]>({
    queryKey: ["/api/exclusive-content"],
  });

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case "track": return <Music size={20} />;
      case "video": return <Video size={20} />;
      case "article": return <FileText size={20} />;
      case "behind_scenes": return <Camera size={20} />;
      default: return <Play size={20} />;
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case "track": return "bg-purple-600";
      case "video": return "bg-red-600";
      case "article": return "bg-blue-600";
      case "behind_scenes": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

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
          <div className="flex items-center justify-center mb-6">
            <Lock className="text-[var(--accent-gold)] mr-3" size={32} />
            <h2 className="text-4xl md:text-6xl font-bold gradient-text">Exclusive Content</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Members-only access to unreleased tracks, behind-the-scenes footage, 
            and exclusive insights into the creative process.
          </p>
        </div>

        {exclusiveContent && exclusiveContent.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusiveContent.map((content) => (
              <Card key={content.id} className="glass-card hover-glow transition-all bg-[var(--bg-card)] border-[var(--primary-purple)]/20 group flex flex-col h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div 
                    className="aspect-video bg-cover bg-center relative rounded-t-lg"
                    style={{ 
                      backgroundImage: content.thumbnailUrl ? `url('${content.thumbnailUrl}')` : 
                        `linear-gradient(135deg, var(--primary-purple), var(--accent-gold))`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg">
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getContentTypeColor(content.contentType)} text-white`}>
                          {content.contentType.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black"
                          size="lg"
                        >
                          {getContentIcon(content.contentType)}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-3 text-[var(--accent-gold)]">{content.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{content.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-400">
                        {new Date(content.createdAt || '').toLocaleDateString()}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black"
                      >
                        Access Content
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Lock className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">Exclusive Content Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Join the newsletter to be the first to know when exclusive content becomes available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}