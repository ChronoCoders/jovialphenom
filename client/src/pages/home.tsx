import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Music from "@/components/sections/music";
import About from "@/components/sections/about";
import Press from "@/components/sections/press";
import Gallery from "@/components/sections/gallery";
import ExclusiveContentSection from "@/components/sections/exclusive-content";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import NewsletterSignup from "@/components/newsletter-signup";
import StreamingWidget from "@/components/streaming-widget";
import StructuredData from "@/components/structured-data";

export default function Home() {
  useEffect(() => {
    // Add parallax effect to hero section
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <StructuredData />
      <Navigation />
      <Hero />
      <Music />
      
      {/* Fan Engagement Section with Newsletter and Streaming Stats */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Join the Journey</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get exclusive access to new music, behind-the-scenes content, and connect with the Jovial Phenom community.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <NewsletterSignup />
            <StreamingWidget showGlobalStats={true} />
          </div>
        </div>
      </section>

      <About />
      <Press />
      <ExclusiveContentSection />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
