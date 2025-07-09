import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold gradient-text mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-gray-400">Last updated: January 1, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Subscribe to our newsletter</li>
                <li>Submit contact forms</li>
                <li>Interact with our music streaming features</li>
                <li>Access our website and use our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you newsletters and promotional materials (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist us in operating our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction in accordance with applicable US federal and state laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">5. Your Rights</h2>
              <p>Under applicable US privacy laws, including state privacy laws such as the California Consumer Privacy Act (CCPA), you may have the right to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Opt-out of the sale of personal information</li>
                <li>Non-discrimination for exercising privacy rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">6. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--accent-gold)] mb-4">7. Contact Us</h2>
              <p>For questions about this Privacy Policy, please contact us at: privacy@jovialphenom.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}