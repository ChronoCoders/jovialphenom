import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MusicPlayer from "@/components/music-player";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import type { Track } from "@shared/schema";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { data: featuredTracks = [] } = useQuery<Track[]>({
    queryKey: ['/api/tracks/featured'],
  });
  
  const { currentTrack, isPlaying: globalIsPlaying, playTrack, pauseTrack } = useAudioPlayer();
  const featuredTrack = featuredTracks[0]; // Get the first featured track
  
  const handlePlayTrack = () => {
    if (!featuredTrack?.audioUrl) return;
    
    if (currentTrack?.id === featuredTrack.id && globalIsPlaying) {
      pauseTrack();
    } else {
      playTrack({
        id: featuredTrack.id,
        title: featuredTrack.title,
        audioUrl: featuredTrack.audioUrl
      });
    }
  };

  const handleDownload = () => {
    if (featuredTrack?.audioUrl) {
      const link = document.createElement('a');
      link.href = featuredTrack.audioUrl;
      link.download = `${featuredTrack.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isCurrentTrackPlaying = currentTrack?.id === featuredTrack?.id && globalIsPlaying;

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with atmospheric image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/jovial-phenom.jpeg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Jovial</span><br />
              <span className="gradient-text">Phenom</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Sensual lo-fi hip-hop meets R&B. Where technology and soul collide to create hypnotic soundscapes.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black px-8 py-3 hover-glow"
                onClick={handlePlayTrack}
                disabled={!featuredTrack?.audioUrl}
              >
                {isCurrentTrackPlaying ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                {isCurrentTrackPlaying ? 'Pause' : 'Listen Now'}
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black px-8 py-3"
                onClick={handleDownload}
                disabled={!featuredTrack?.audioUrl}
              >
                <Download className="mr-2" size={20} />
                Download
              </Button>
            </div>
          </div>
          
          {featuredTrack && (
            <MusicPlayer
              trackTitle={featuredTrack.title}
              duration={featuredTrack.duration}
              imageUrl={featuredTrack.imageUrl}
              audioUrl={featuredTrack.audioUrl ?? undefined}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
