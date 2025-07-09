import { SiSpotify, SiApplemusic, SiSoundcloud, SiYoutube } from "react-icons/si";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="py-12 bg-[var(--bg-primary)] border-t border-[var(--primary-purple)]/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold gradient-text mb-4 md:mb-0">Jovial Phenom</div>
          <div className="flex items-center space-x-6">
            <a href="https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors">
              <SiSpotify size={20} />
            </a>
            <a href="https://music.apple.com/ca/artist/jovial-phenom/1790666838" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors">
              <SiApplemusic size={20} />
            </a>
            <a href="https://soundcloud.com/jovial-phenom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors">
              <SiSoundcloud size={20} />
            </a>
            <a href="https://www.youtube.com/channel/UC8CllLIMTah6-YHJm6mJywA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors">
              <SiYoutube size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--primary-purple)]/20 text-center text-gray-400">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
            <Link href="/privacy-policy" className="hover:text-[var(--accent-gold)] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[var(--accent-gold)] transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/fair-use" className="hover:text-[var(--accent-gold)] transition-colors text-sm">
              Fair Use
            </Link>
            <Link href="/disclaimer" className="hover:text-[var(--accent-gold)] transition-colors text-sm">
              Disclaimer
            </Link>
          </div>
          <p>&copy; 2025 Jovial Phenom. All rights reserved.</p>
          <p className="mt-2">Proudly made with ❤️ in New York By Jovial Phenom</p>
        </div>
      </div>
    </footer>
  );
}
