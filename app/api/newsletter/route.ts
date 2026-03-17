import { NextRequest, NextResponse } from "next/server";
import type { NewsletterSignup, NewsletterResponse } from "@/types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<NewsletterSignup>;
    const { email, source } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json<NewsletterResponse>(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // ── ConvertKit integration ──────────────────────────────────────────────
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID  = process.env.CONVERTKIT_FORM_ID;

    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: CONVERTKIT_API_KEY,
            email,
            tags: source ? [source] : [],
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("ConvertKit error:", error);
        return NextResponse.json<NewsletterResponse>(
          { success: false, message: "Failed to subscribe. Please try again." },
          { status: 502 }
        );
      }

      return NextResponse.json<NewsletterResponse>({
        success: true,
        message: "You're in! Welcome to the Tone Chan Crew.",
      });
    }

    // ── Mailchimp integration (fallback) ────────────────────────────────────
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_DC      = process.env.MAILCHIMP_DC ?? "us1";

    if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
      const res = await fetch(
        `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            tags: source ? [source] : [],
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        // Mailchimp returns 400 for already-subscribed members
        if (error.title === "Member Exists") {
          return NextResponse.json<NewsletterResponse>({
            success: true,
            message: "You're already in the crew!",
          });
        }
        return NextResponse.json<NewsletterResponse>(
          { success: false, message: "Failed to subscribe. Please try again." },
          { status: 502 }
        );
      }

      return NextResponse.json<NewsletterResponse>({
        success: true,
        message: "You're in! Welcome to the Tone Chan Crew.",
      });
    }

    // ── No provider configured — log and return success for dev ─────────────
    console.log(`[Newsletter] New signup: ${email} (source: ${source ?? "unknown"})`);
    console.log("Tip: Configure CONVERTKIT_API_KEY or MAILCHIMP_API_KEY in .env.local");

    return NextResponse.json<NewsletterResponse>({
      success: true,
      message: "You're in! (Dev mode — no provider configured yet)",
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json<NewsletterResponse>(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
