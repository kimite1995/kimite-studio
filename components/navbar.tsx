"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteConfig } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#works", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  site: SiteConfig;
}

export function Navbar({ site }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-lg border-b border-[#222228]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#A78BFA]" />
          <span className="font-display text-2xl font-semibold tracking-[-1px]">
            {site.name}
          </span>
          <span className="text-xs text-[#A1A1AA] font-mono ml-1 tracking-[2px]">STUDIO</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn btn-primary !py-2 !px-6 !text-sm"
          >
            문의하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#A1A1AA] hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu (Sheet style) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#111114] border-l border-[#222228] z-50 md:hidden p-8"
            >
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left text-2xl font-medium text-white hover:text-[#00F0FF] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn btn-primary mt-4 w-full justify-center"
                >
                  프로젝트 문의하기
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
