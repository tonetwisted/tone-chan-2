import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Tone Chan's Adventures.",
};

const LAST_UPDATED = "March 17, 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-tc-black text-tc-cream pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="font-pixel text-[8px] text-tc-pink tracking-widest block mb-4">LEGAL</span>
        <h1 className="font-pixel text-2xl sm:text-3xl text-tc-cream mb-2">TERMS OF SERVICE</h1>
        <p className="text-tc-cream/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-tc-cream/70 text-sm leading-relaxed">
          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">1. ACCEPTANCE OF TERMS</h2>
            <p>
              By accessing or using the Tone Chan&apos;s Adventures website and browser demo (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">2. USE OF THE SERVICE</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Distribute, modify, or create derivative works of the game ROM or assets without permission</li>
              <li>Attempt to reverse engineer, decompile, or extract proprietary code or assets</li>
              <li>Use the Service to transmit harmful, offensive, or unlawful content</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">3. INTELLECTUAL PROPERTY</h2>
            <p>
              All content on this Service — including but not limited to game assets, artwork, music, characters, storylines, and branding — is the exclusive property of Tone Chan Studios and its creators. All rights reserved.
            </p>
            <p className="mt-3">
              The demo ROM is provided for personal, non-commercial play only. Redistribution of the ROM file is prohibited without express written consent.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">4. DISCLAIMER OF WARRANTIES</h2>
            <p>
              The Service is provided &quot;as is&quot; without warranty of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses. Browser-based emulation performance may vary by device and browser.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">5. LIMITATION OF LIABILITY</h2>
            <p>
              To the fullest extent permitted by law, Tone Chan Studios shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">6. COMMUNITY AND EMAIL</h2>
            <p>
              By subscribing to our newsletter or community updates, you consent to receive periodic emails from Tone Chan Studios. You may unsubscribe at any time. We will not spam you or sell your information.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">7. CHANGES TO TERMS</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms. We will update the &quot;last updated&quot; date above when changes are made.
            </p>
          </section>

          <section>
            <h2 className="font-pixel text-[10px] text-tc-cyan tracking-widest mb-3">8. CONTACT</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:legal@tonechanadventures.com" className="text-tc-pink hover:text-tc-pink/70 transition-colors">
                legal@tonechanadventures.com
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
