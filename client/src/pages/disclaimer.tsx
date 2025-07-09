import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Disclaimer() {
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
          <h1 className="text-4xl font-bold gradient-text mb-8">Disclaimer</h1>
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-gray-400">Last updated: January 1, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">General Disclaimer</h2>
              <p>The information contained on this website is for general information purposes only. The information is provided by Jovial Phenom and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Music and Audio Content</h2>
              <p>All music, audio recordings, and related content on this website are original works by Jovial Phenom unless otherwise noted. Any resemblance to existing musical works is coincidental. While AI technology may be used as a creative tool in the music production process, all final artistic decisions and creative direction remain under human control and ownership.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Technology and AI Disclaimer</h2>
              <p>References to artificial intelligence and technology in music production are for informational and artistic purposes. The use of AI tools in creative processes does not diminish the human creativity, skill, and artistic vision involved in the final musical works. All AI-assisted content remains subject to human oversight and creative control.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Limitation of Liability</h2>
              <p>In no event will Jovial Phenom be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. This limitation of liability applies to the fullest extent permitted by law in the State of New York and under federal law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">External Links Disclaimer</h2>
              <p>Through this website, you may be able to link to other websites which are not under the control of Jovial Phenom. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Streaming Platform Disclaimer</h2>
              <p>Links to external streaming platforms (Spotify, Apple Music, SoundCloud, YouTube) are provided for convenience. Jovial Phenom is not responsible for the availability, terms of service, privacy policies, or content policies of these third-party platforms. Users access these platforms at their own risk and subject to the platforms' respective terms and conditions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Professional Disclaimer</h2>
              <p>While Jovial Phenom has professional experience in software engineering and technology, nothing on this website should be construed as professional technical advice. For specific technical guidance, consult with qualified professionals in the relevant field.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Content Accuracy</h2>
              <p>Every effort is made to keep the website up and running smoothly. However, Jovial Phenom takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control. Music streaming, download functionality, and other interactive features may experience intermittent service interruptions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Age Restrictions</h2>
              <p>This website and its content are intended for general audiences. Some musical content may contain mature themes typical of hip-hop and R&B genres. Parental discretion is advised for users under 13 years of age, in accordance with the Children's Online Privacy Protection Act (COPPA).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Jurisdiction</h2>
              <p>This disclaimer is governed by the laws of the State of New York and the United States of America. Any disputes arising from the use of this website will be subject to the jurisdiction of New York state courts and federal courts located in New York.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Updates to Disclaimer</h2>
              <p>This disclaimer may be updated from time to time. Users are encouraged to review this page periodically for any changes. Continued use of the website after posting changes constitutes acceptance of those changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">Contact Information</h2>
              <p>For questions about this disclaimer, please contact us at: legal@jovialphenom.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}