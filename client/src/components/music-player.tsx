import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface MusicPlayerProps {
  trackTitle: string;
  duration: string;
  imageUrl: string;
  audioUrl?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export default function MusicPlayer({ 
  trackTitle, 
  duration, 
  imageUrl,
  audioUrl,
  isPlaying = false,
  onTogglePlay 
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isLocalPlaying, setIsLocalPlaying] = useState(false);
  
  const { 
    currentTrack, 
    isPlaying: globalIsPlaying, 
    currentTime: globalCurrentTime, 
    duration: globalDuration,
    skipBack: globalSkipBack,
    skipForward: globalSkipForward,
    seek: globalSeek
  } = useAudioPlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isLocalPlaying) {
      audio.pause();
      setIsLocalPlaying(false);
    } else {
      audio.play();
      setIsLocalPlaying(true);
    }
    onTogglePlay?.();
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * totalDuration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkipBack = () => {
    // Use global audio player if available, otherwise use local player
    if (globalSkipBack && currentTrack?.title === trackTitle) {
      globalSkipBack(10);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      
      const newTime = Math.max(0, audio.currentTime - 10);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkipForward = () => {
    // Use global audio player if available, otherwise use local player
    if (globalSkipForward && currentTrack?.title === trackTitle) {
      globalSkipForward(10);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      
      const newTime = Math.min(totalDuration, audio.currentTime + 10);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${trackTitle}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Use global state if current track matches, otherwise use local state
  const isGlobalTrack = currentTrack?.title === trackTitle;
  const displayCurrentTime = isGlobalTrack ? globalCurrentTime : currentTime;
  const displayDuration = isGlobalTrack ? globalDuration : totalDuration;
  const displayIsPlaying = isGlobalTrack ? globalIsPlaying : isLocalPlaying;
  
  const progressPercentage = displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0;

  return (
    <div className="animate-slide-up">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onEnded={() => setIsLocalPlaying(false)}
        />
      )}
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
          {displayIsPlaying ? <Pause className="text-black" size={20} /> : <Play className="text-black" size={20} />}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400">Now Playing</p>
          <p className="font-semibold">{trackTitle}</p>
        </div>
        {audioUrl && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDownload}
            className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-dark)]"
            title="Download Track"
          >
            <Download size={16} />
          </Button>
        )}
      </div>
      
      <div className="music-wave rounded-full mb-4"></div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <span>{formatTime(displayCurrentTime)}</span>
        <Slider
          value={[progressPercentage]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="flex-1"
          disabled={!audioUrl}
        />
        <span>{displayDuration > 0 ? formatTime(displayDuration) : duration}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSkipBack}
            disabled={!audioUrl}
            className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-dark)]"
            title="Skip back 10 seconds"
          >
            <SkipBack size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={audioUrl ? handleTogglePlay : onTogglePlay}
            className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black"
            disabled={!audioUrl}
          >
            {displayIsPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSkipForward}
            disabled={!audioUrl}
            className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-dark)]"
            title="Skip forward 10 seconds"
          >
            <SkipForward size={16} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 size={16} className="text-gray-400" />
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="w-16"
            disabled={!audioUrl}
          />
        </div>
      </div>
    </div>
  );
}
