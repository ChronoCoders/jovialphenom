import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">Where Tech Meets Soul</h2>
            <p className="text-xl text-gray-300 mb-6">
              By day, I'm a software engineer and tech CEO, building the future through code. 
              By night, I transform into Jovial Phenom, crafting sensual soundscapes that blend 
              lo-fi hip-hop with R&B.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              My unique background in technology influences every aspect of my creative process. 
              I utilize AI and analytical thinking to create music that's both technically sophisticated 
              and emotionally resonant. Each track is a carefully crafted journey through mood and atmosphere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-[var(--primary-purple)] text-white px-4 py-2">
                Lo-Fi Hip-Hop
              </Badge>
              <Badge className="bg-[var(--primary-purple)] text-white px-4 py-2">
                R&B
              </Badge>
              <Badge className="bg-[var(--primary-purple)] text-white px-4 py-2">
                AI-Enhanced
              </Badge>
              <Badge className="bg-[var(--primary-purple)] text-white px-4 py-2">
                Tech CEO
              </Badge>
            </div>
          </div>
          <div className="relative">
            <div 
              className="aspect-square bg-cover bg-center rounded-3xl"
              style={{
                backgroundImage: `url('/assets/jovial-phenom.jpeg')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-gold)]/20 to-transparent rounded-3xl"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[var(--accent-gold)] text-black p-6 rounded-2xl animate-float">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm">Years Creating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
