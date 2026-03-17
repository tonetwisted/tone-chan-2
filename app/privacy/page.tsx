import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tone Chan's Adventures — how we collect and use your information.",
};

const LAST_UPDATED = "March 17, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-tc-black text-tc-cream pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="font-pixel text-[8px] text-tc-pink tracking-widest block mb-4">LEGAL</span>
        <h1 className="font-pixel text-2xl sm:text-3xl text-tc-cream mb-2">PRIVACY POLICY</h1>
        <p className="text-tc-cream/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-tc-cream/70 text-sm leading-relaxed">
          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">1. INFORMATION WE COLLECT</h2>
            <p>
              We collect information you voluntarily provide, such as your email address when you sign up for our newsletter or community updates. We do not collect sensitive personal information.
            </p>
            <p className="mt-3">
              We may automatically collect certain technical data when you visit our site, including IP address, browser type, pages visited, and time spent on pages, through analytics tools like Vercel Analytics and Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">2. HOW WE USE YOUR INFORMATION</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To send you game updates, announcements, and community news (email subscribers only)</li>
              <li>To analyze site usage and improve the platform</li>
              <li>To respond to press and collaboration inquiries</li>
              <li>To detect and prevent technical issues or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">3. EMAIL COMMUNICATIONS</h2>
            <p>
              If you subscribe to our newsletter, you may unsubscribe at any time by clicking the unsubscribe link in any email we send, or by contacting us directly. We will not sell or share your email address with third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">4. COOKIES AND TRACKING</h2>
            <p>
              Our site uses cookies and similar tracking technologies to remember your preferences (such as save states and skin selections stored in localStorage) and to gather analytics data. You can disable cookies in your browser settings, though some site features may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">5. THIRD-PARTY SERVICES</h2>
            <p>We use the following third-party services, each governed by their own privacy policies:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Vercel — hosting and analytics</li>
              <li>ConvertKit / Mailchimp — email marketing</li>
              <li>EmulatorJS (CDN) — browser-based game emulation</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">6. DATA RETENTION</h2>
            <p>
              We retain email addresses for as long as you remain subscribed. Analytics data is retained per the policies of our analytics providers. You may request deletion of your personal data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">7. CHILDREN&apos;S PRIVACY</h2>
            <p>
              Our site is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">8. CONTACT</h2>
            <p>
              For privacy-related inquiries, contact us at{" "}
              <a href="mailto:privacy@tonechanadventures.com" className="text-tc-pink hover:text-tc-pink/70 transition-colors">
                privacy@tonechanadventures.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <Link href="/" className="font-pixel text-[8px] text-tc-cream/30 hover:text-tc-cream/60 tracking-widest transition-colors">
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
