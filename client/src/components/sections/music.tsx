import { useQuery } from "@tanstack/react-query";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiSpotify, SiApplemusic, SiSoundcloud } from "react-icons/si";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { trackEvent } from "@/lib/analytics";
import type { Track } from "@shared/schema";

export default function Music() {
  const { data: featuredTracks, isLoading: featuredLoading } = useQuery<Track[]>({
    queryKey: ["/api/tracks/featured"],
  });

  const { data: allTracks, isLoading: allLoading } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioPlayer();
  const regularTracks = allTracks?.filter(track => !track.featured) || [];

  const handleTrackPlay = (track: Track) => {
    if (!track.audioUrl) return;
    
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack();
      trackEvent('pause_track', 'music', track.title);
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        audioUrl: track.audioUrl
      });
      trackEvent('play_track', 'music', track.title);
    }
  };

  const handleDownload = (track: Track) => {
    if (track.audioUrl) {
      trackEvent('download_track', 'music', track.title);
      const link = document.createElement('a');
      link.href = track.audioUrl;
      link.download = `${track.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (featuredLoading || allLoading) {
    return (
      <section id="music" className="py-20 bg-[var(--bg-secondary)]">
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
    <section id="music" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Featured Tracks</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the sonic landscapes that define Jovial Phenom's unique fusion of lo-fi hip-hop and R&B.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredTracks?.map((track) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            const isTrackPlaying = isCurrentTrack && isPlaying;
            
            return (
              <Card key={track.id} className="glass-card hover-glow transition-all bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-8">
                  <div 
                    className="aspect-square bg-cover bg-center rounded-2xl mb-6 relative group cursor-pointer"
                    style={{ backgroundImage: `url('${track.imageUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl flex items-end justify-between p-6">
                      <div className="flex space-x-2">
                        {track.audioUrl && (
                          <>
                            <Button 
                              className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black"
                              size="sm"
                              onClick={() => handleTrackPlay(track)}
                            >
                              {isTrackPlaying ? <Pause size={16} /> : <Play size={16} />}
                            </Button>
                            <Button 
                              className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black"
                              size="sm"
                              onClick={() => handleDownload(track)}
                            >
                              <Download size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 gradient-text">{track.title}</h3>
                  <p className="text-gray-300 mb-4">{track.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--accent-gold)]">{track.duration}</span>
                    <div className="flex space-x-3">
                      {track.spotifyUrl && (
                        <a 
                          href={track.spotifyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xl hover:text-[var(--accent-gold)] cursor-pointer transition-colors"
                        >
                          <SiSpotify />
                        </a>
                      )}
                      {track.appleUrl && (
                        <a 
                          href={track.appleUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xl hover:text-[var(--accent-gold)] cursor-pointer transition-colors"
                        >
                          <SiApplemusic />
                        </a>
                      )}
                      {track.soundcloudUrl && (
                        <a 
                          href={track.soundcloudUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xl hover:text-[var(--accent-gold)] cursor-pointer transition-colors"
                        >
                          <SiSoundcloud />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Discography */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Complete Discography</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTracks.map((track) => {
              const isCurrentTrack = currentTrack?.id === track.id;
              const isTrackPlaying = isCurrentTrack && isPlaying;
              
              return (
                <Card key={track.id} className="glass-card hover-glow transition-all bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[var(--accent-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
                      {isTrackPlaying ? <Pause className="text-black" size={20} /> : <Play className="text-black" size={20} />}
                    </div>
                    <h4 className="font-semibold mb-2 text-white">{track.title}</h4>
                    <p className="text-sm text-gray-400 mb-4">Jovial Phenom · {track.releaseYear}</p>
                    <Badge variant="outline" className="mb-4 text-[var(--accent-gold)] border-[var(--accent-gold)]">
                      {track.duration}
                    </Badge>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 mt-4">
                      {track.audioUrl && (
                        <Button 
                          className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                          onClick={() => handleTrackPlay(track)}
                        >
                          {isTrackPlaying ? <Pause size={16} /> : <Play size={16} />}
                          <span>{isTrackPlaying ? 'Pause' : 'Listen Now'}</span>
                        </Button>
                      )}
                      {track.audioUrl && (
                        <Button 
                          variant="outline"
                          className="border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                          onClick={() => handleDownload(track)}
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
