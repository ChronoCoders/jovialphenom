import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function FairUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--accent-gold)] hover:text-[var(--accent-gold)]/80 transition-colors mb-6">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-8">Fair Use Doctrine</h1>
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-gray-400">Last updated: January 1, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Fair Use Statement</h2>
              <p>This website may contain copyrighted material that has not always been specifically authorized by the copyright owner. We believe this constitutes a 'fair use' of any such copyrighted material as provided for in section 107 of the US Copyright Law (17 U.S.C. § 107).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Legal Foundation</h2>
              <p>Fair use is a doctrine in United States copyright law that allows limited use of copyrighted material without requiring permission from the rights holders. The fair use doctrine is codified at 17 U.S.C. § 107 and provides:</p>
              <blockquote className="border-l-4 border-[var(--accent-gold)] pl-4 italic">
                "The fair use of a copyrighted work, including such use by reproduction in copies or phonorecords or by any other means specified by that section, for purposes such as criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship, or research, is not an infringement of copyright."
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Four Factors Test</h2>
              <p>In determining whether the use made of a work in any particular case is a fair use, the factors to be considered include:</p>
              <ol className="list-decimal ml-6 space-y-3">
                <li><strong>Purpose and character of use:</strong> Whether the use is of a commercial nature or is for nonprofit educational purposes, and whether the use is transformative.</li>
                <li><strong>Nature of the copyrighted work:</strong> Whether the work is factual or creative, published or unpublished.</li>
                <li><strong>Amount and substantiality:</strong> The amount and substantiality of the portion used in relation to the copyrighted work as a whole.</li>
                <li><strong>Effect on the market:</strong> The effect of the use upon the potential market for or value of the copyrighted work.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Our Application</h2>
              <p>Any copyrighted material used on this website is done so under the fair use doctrine for purposes of:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Commentary and criticism of musical works</li>
                <li>Educational content about music production and technology</li>
                <li>News reporting on industry developments</li>
                <li>Transformative artistic expression</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">DMCA Compliance</h2>
              <p>If you believe that material on this website infringes your copyright, please provide our Copyright Agent with the following information as required by the Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>A physical or electronic signature of the copyright owner</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing</li>
                <li>Information reasonably sufficient to permit us to contact you</li>
                <li>A statement that you have a good faith belief that use of the material is not authorized</li>
                <li>A statement that the information is accurate and that you are authorized to act on behalf of the copyright owner</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Music Industry Fair Use</h2>
              <p>In the music industry, fair use often applies to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Brief excerpts for review or commentary purposes</li>
                <li>Parody and transformative works (Campbell v. Acuff-Rose Music, Inc.)</li>
                <li>Educational use in music theory and criticism</li>
                <li>Research and scholarship in musicology</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Contact for Copyright Issues</h2>
              <p>Copyright Agent: Jovial Phenom<br/>
              Email: copyright@jovialphenom.com<br/>
              Address: New York, NY, United States</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Disclaimer</h2>
              <p>This fair use statement does not constitute legal advice. Fair use is determined on a case-by-case basis, and the application of fair use factors can vary. When in doubt, seek permission from copyright holders or consult with a qualified attorney specializing in intellectual property law.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}