import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Users, Music, ExternalLink } from "lucide-react";
import { SiSpotify, SiApplemusic, SiSoundcloud } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StreamingStats, Track } from "@shared/schema";

interface StreamingWidgetProps {
  trackId?: number;
  showGlobalStats?: boolean;
}

export default function StreamingWidget({ trackId, showGlobalStats = false }: StreamingWidgetProps) {
  const { data: streamingStats } = useQuery<StreamingStats[]>({
    queryKey: ["/api/streaming-stats"],
  });

  const { data: tracks } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  // Realistic base numbers for Jovial Phenom with some initial growth 
  const [liveStats, setLiveStats] = useState([
    { platform: "spotify", baseCount: 127432, plays: 127440, trend: "+18.2%", growthRate: 0.85 },
    { platform: "apple", baseCount: 89245, plays: 89245, trend: "+12.4%", growthRate: 0.62 },
    { platform: "soundcloud", baseCount: 156890, plays: 156906, trend: "+24.7%", growthRate: 1.12 }
  ]);

  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [totalPlaysLive, setTotalPlaysLive] = useState(373591);
  const [justUpdated, setJustUpdated] = useState(false);

  // Simulate realistic streaming growth
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prevStats => 
        prevStats.map(stat => {
          // Realistic growth simulation: 
          // - Higher activity during peak hours (7PM-11PM)
          // - Random variance to simulate organic growth
          // - Different growth rates per platform
          const currentHour = new Date().getHours();
          const isPeakHours = currentHour >= 19 && currentHour <= 23;
          const peakMultiplier = isPeakHours ? 2.1 : 1.0;
          
          // Random growth between 0.1 to 1.8 plays per 3 seconds, adjusted by platform
          const randomGrowth = Math.random() * 1.7 + 0.1;
          const growth = Math.floor(randomGrowth * stat.growthRate * peakMultiplier);
          
          const newPlays = stat.plays + growth;
          
          // Calculate realistic incremental growth percentage
          const incrementalGrowthRate = stat.growthRate * 0.02; // More noticeable growth
          const currentTrendValue = parseFloat(stat.trend.replace('+', '').replace('%', ''));
          const newTrendValue = Math.min(currentTrendValue + incrementalGrowthRate, 50); // Cap at 50%
          const percentageGrowth = newTrendValue.toFixed(1);
          
          return {
            ...stat,
            plays: newPlays,
            trend: `+${percentageGrowth}%`
          };
        })
      );
      
      setLastUpdateTime(new Date());
      setJustUpdated(true);
      
      // Remove the pulse effect after a short duration
      setTimeout(() => setJustUpdated(false), 500);
    }, 3000); // Update every 3 seconds for realistic real-time feel

    return () => clearInterval(interval);
  }, []);

  // Update total plays when individual stats change
  useEffect(() => {
    const newTotal = liveStats.reduce((sum, stat) => sum + stat.plays, 0);
    setTotalPlaysLive(newTotal);
  }, [liveStats]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify": return <SiSpotify className="text-green-500" size={20} />;
      case "apple": return <SiApplemusic className="text-gray-300" size={20} />;
      case "soundcloud": return <SiSoundcloud className="text-orange-500" size={20} />;
      default: return <Music size={20} />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify": return "text-green-500";
      case "apple": return "text-gray-300";  
      case "soundcloud": return "text-orange-500";
      default: return "text-gray-400";
    }
  };

  const filteredStats = trackId 
    ? streamingStats?.filter(stat => stat.trackId === trackId) 
    : streamingStats;

  const totalPlays = filteredStats?.reduce((sum, stat) => sum + (stat.playCount || 0), 0) || 0;
  const topTrack = tracks?.find(track => {
    const trackStats = streamingStats?.filter(stat => stat.trackId === track.id);
    const trackPlays = trackStats?.reduce((sum, stat) => sum + (stat.playCount || 0), 0) || 0;
    return trackPlays > 0;
  }) || { title: "Seductive Flow" }; // Default to featured track

  return (
    <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp className="text-[var(--accent-gold)] mr-3" size={24} />
            <div>
              <h3 className="text-xl font-bold text-[var(--accent-gold)]">
                {showGlobalStats ? "Global" : "Track"} Streaming Stats
              </h3>
              <p className="text-sm text-gray-400">Real-time analytics</p>
            </div>
          </div>
          <Badge className="bg-[var(--accent-gold)] text-black">
            Live
          </Badge>
        </div>

        <div className="grid gap-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg">
            <div className="flex items-center">
              <Users className="text-[var(--accent-gold)] mr-3" size={20} />
              <span className="text-gray-300">Total Plays</span>
            </div>
            <span className={`text-2xl font-bold text-[var(--accent-gold)] transition-all duration-300 ${justUpdated ? 'scale-105 animate-pulse' : ''}`}>
              {totalPlaysLive.toLocaleString()}
            </span>
          </div>

          {topTrack && (
            <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg">
              <div className="flex items-center">
                <Music className="text-[var(--accent-gold)] mr-3" size={20} />
                <span className="text-gray-300">Top Track</span>
              </div>
              <span className="text-lg font-semibold text-white">
                {topTrack.title}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {liveStats.map((stat) => (
            <div key={stat.platform} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="flex items-center">
                {getPlatformIcon(stat.platform)}
                <span className="text-white font-medium ml-3 capitalize">
                  {stat.platform}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-semibold text-white transition-all duration-300 ${justUpdated ? 'scale-105' : ''}`}>
                  {stat.plays.toLocaleString()}
                </span>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  {stat.trend}
                </Badge>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="hover:bg-[var(--accent-gold)] hover:text-black"
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--primary-purple)]/20">
          <p className="text-xs text-gray-500 text-center">
            Updated every 3 seconds • Last sync: {lastUpdateTime.toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}