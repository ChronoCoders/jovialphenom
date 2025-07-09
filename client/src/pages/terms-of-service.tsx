import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold gradient-text mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-gray-400">Last updated: January 1, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service are governed by United States federal and New York state law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily access the materials on Jovial Phenom's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">3. Intellectual Property Rights</h2>
              <p>All content, including but not limited to music, images, text, graphics, logos, and software, is the property of Jovial Phenom and protected by United States and international copyright laws. Unauthorized use is prohibited under the Digital Millennium Copyright Act (DMCA) and other applicable laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">4. Music Streaming and Downloads</h2>
              <p>Music provided on this website is for personal, non-commercial use only. Redistribution, public performance, or commercial use without explicit written permission is strictly prohibited under U.S. Copyright Law (17 U.S.C. § 101 et seq.).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">5. User Conduct</h2>
              <p>You agree not to use the website to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Violate any applicable federal, state, or local laws</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">6. Disclaimers</h2>
              <p>The materials on Jovial Phenom's website are provided on an 'as is' basis. Jovial Phenom makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">7. Limitations of Liability</h2>
              <p>In no event shall Jovial Phenom or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Jovial Phenom or its authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">8. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of New York State and the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">9. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us at: legal@jovialphenom.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}