"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-tc-black/90 backdrop-blur-md border-b border-tc-purple/20 shadow-glow-purple/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-pixel text-xs sm:text-sm text-tc-pink group-hover:text-tc-cyan transition-colors duration-200 leading-tight">
              TONE CHAN
            </span>
            <span className="font-pixel text-[8px] sm:text-[10px] text-tc-cyan/60 leading-tight hidden sm:block">
              ADVENTURES
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-pixel text-[10px] tracking-widest transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-tc-pink"
                      : "text-tc-cream/60 hover:text-tc-cream"
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/play"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-tc-pink text-white font-pixel text-[9px] tracking-wider rounded hover:bg-tc-pink/80 transition-all duration-200 shadow-glow-pink hover:shadow-glow-pink animate-glow-pulse"
            >
              ▶ PLAY NOW
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block w-6 h-0.5 bg-tc-cream transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-tc-cream transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-tc-cream transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-tc-black/98 backdrop-blur-lg pt-16 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 pt-12">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-pixel text-lg tracking-widest transition-colors duration-200 ${
                      pathname === link.href ? "text-tc-pink" : "text-tc-cream/80 hover:text-tc-cream"
                    }`}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/play"
                  className="flex items-center gap-2 px-6 py-3 bg-tc-pink text-white font-pixel text-xs tracking-wider rounded shadow-glow-pink"
                >
                  ▶ PLAY NOW
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
