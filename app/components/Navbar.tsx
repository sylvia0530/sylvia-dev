"use client";

import { useState } from "react";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-8">
        {/* Logo */}
        <a
          href="#accueil"
          className="text-xl font-bold tracking-tight text-zinc-900"
          onClick={() => setMenuOpen(false)}
        >
          Sylvia<span className="text-zinc-400">Dev</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-800 transition hover:bg-zinc-100 md:hidden"
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-5 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-zinc-100 py-4 text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

