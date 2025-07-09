import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-[var(--primary-purple)]/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">Jovial Phenom</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("music")}
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              Music
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("press")}
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              Press
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[var(--accent-gold)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("music")}
              className="block w-full text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              Music
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("press")}
              className="block w-full text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              Press
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
