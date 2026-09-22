"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Montserrat, Playfair_Display } from "next/font/google";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const skills = [
  {
    category: "Frontend & Web",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "React",
      "Angular",
      "Next.js",
    ],
  },
  {
    category: "Backend",
    items: ["Laravel", "NestJS", "Node.js"],
  },
  {
    category: "Données & outils",
    items: ["PostgreSQL", "Prisma", "Git & GitHub", "MySQL"],
  },
];

function Sparkle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`twinkle ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <path d="M12 0c.8 5.6 2.2 9.2 4.8 11.2C19.4 13.2 23 14.4 24 12c-1 2.4-2.6 4.6-4.8 6.4C17 20.2 14.6 21.4 12 24c-.8-5.6-2.2-9.2-4.8-11.2C4.6 10.8 1 9.6 0 12c1 2.4 2.6 4.6 4.8 6.4C7 20.2 9.4 21.4 12 24c.8-5.6 2.2-9.2 4.8-11.2C19.4 10.8 23 9.6 24 12c-1-2.4-2.6-4.6-4.8-6.4C17 3.8 14.6 2.6 12 0z" />
    </svg>
  );
}

function LeafDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 175C59 125 55 76 25 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M51 124C28 116 15 101 11 82C30 84 45 96 51 124Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M55 101C77 93 91 77 96 57C76 61 61 76 55 101Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M47 76C27 67 17 53 15 37C32 41 43 53 47 76Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M42 52C57 45 66 32 68 17C54 21 45 32 42 52Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Fait apparaître son contenu en fondu + léger décalage vertical au scroll. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen overflow-hidden bg-[#FBF1E4] font-[family-name:var(--font-body)] text-[#201B16]`}
    >
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-in {
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        .twinkle {
          animation: twinkle 3.4s ease-in-out infinite;
        }
        .card-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -20px rgba(120, 72, 24, 0.28);
          border-color: #C1662E;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-in, .twinkle, .card-lift {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ==================== NAVBAR ==================== */}
      <header className="sticky top-0 z-50 border-b border-[#E4D2AC]/70 bg-[#FBF1E4]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-8">
          <a
            href="#accueil"
            className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight"
          >
            Sylvia<span className="text-[#C1662E]">Dev</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#accueil"
              className="border-b-2 border-[#C1662E] pb-1 text-sm font-medium"
            >
              Accueil
            </a>

            <a
              href="#a-propos"
              className="text-sm font-medium text-[#4A4136] transition-colors hover:text-[#C1662E]"
            >
              À propos
            </a>

            <a
              href="#competences"
              className="text-sm font-medium text-[#4A4136] transition-colors hover:text-[#C1662E]"
            >
              Compétences
            </a>

            <a
              href="#projets"
              className="text-sm font-medium text-[#4A4136] transition-colors hover:text-[#C1662E]"
            >
              Projets
            </a>

            <a
              href="#services"
              className="text-sm font-medium text-[#4A4136] transition-colors hover:text-[#C1662E]"
            >
              Services
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-[#4A4136] transition-colors hover:text-[#C1662E]"
            >
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-[#201B16] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C1662E] sm:block"
          >
            Me contacter
          </a>

          <a
            href="#contact"
            className="rounded-full bg-[#201B16] px-4 py-2.5 text-xs font-semibold text-white sm:hidden"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section
        id="accueil"
        className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-8 lg:px-8 lg:pt-10"
      >
        <div className="relative min-h-[650px] overflow-hidden rounded-[2.5rem] border border-[#DCC49F] bg-[#F8EDDD] shadow-[0_25px_70px_rgba(87,55,28,0.10)] sm:min-h-[680px] sm:rounded-[3rem]">
          {/* ================= DECORATIONS ================= */}

          <Sparkle className="absolute right-[7%] top-[8%] h-7 w-7 text-[#201B16]" delay={0} />

          <Sparkle className="absolute left-[48%] top-[22%] h-4 w-4 text-[#C1662E]" delay={400} />

          <Sparkle className="absolute bottom-[14%] left-[48%] h-5 w-5 text-[#C1662E]" delay={800} />

          <div className="absolute right-[16%] top-[24%] h-2 w-2 rounded-full bg-[#C1662E]" />

          <div className="absolute bottom-8 left-8 hidden h-24 w-40 sm:block">
            <svg
              viewBox="0 0 180 100"
              fill="none"
              className="h-full w-full text-[#C1662E]/35"
            >
              <path
                d="M2 80C35 35 78 28 115 45C142 57 160 45 178 8"
                stroke="currentColor"
                strokeWidth="1"
              />

              <path
                d="M0 94C32 53 72 45 109 59C140 71 158 57 180 22"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="relative z-10 grid min-h-[650px] items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
            {/* ================= PHOTO ================= */}

            <div className="hero-in relative mx-auto flex w-full max-w-[390px] justify-center lg:justify-start" style={{ animationDelay: "0ms" }}>
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#C1662E]/20 sm:h-[450px] sm:w-[370px]" />

              <div className="absolute left-1/2 top-1/2 h-[335px] w-[275px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#C1662E]/35 sm:h-[425px] sm:w-[345px]" />

              <div className="relative z-10 w-[250px] sm:w-[300px]">
                <div className="rounded-[50%] border border-[#C1662E]/50 bg-[#FBF1E4] p-3 shadow-[0_20px_45px_rgba(84,53,27,0.14)] transition-transform duration-500 hover:scale-[1.02]">
                  <div className="rounded-[50%] border border-[#C1662E]/30 bg-[#F4E6CF] p-2">
                    <Image
                      src="/sary.jpg"
                      alt="Sylvia - Développeuse Web"
                      width={500}
                      height={650}
                      priority
                      className="aspect-[4/5] w-full rounded-[50%] object-cover"
                    />
                  </div>
                </div>

                <Sparkle className="absolute -right-8 top-[48%] h-7 w-7 text-[#C1662E]" delay={200} />

                <div className="absolute -left-7 top-[30%] h-3 w-3 rounded-full border border-[#C1662E] bg-[#F8EDDD]" />
              </div>

              <div className="absolute bottom-[3%] right-[6%] z-20 flex h-[72px] w-[72px] rotate-[-8deg] items-center justify-center rounded-full border-[7px] border-[#F8EDDD] bg-[#C1662E] text-white shadow-lg transition-transform duration-300 hover:rotate-0 sm:right-[2%]">
                <span className="font-mono text-xl font-bold">
                  &lt;/&gt;
                </span>
              </div>
            </div>

            {/* ================= TEXT ================= */}

            <div className="relative text-center lg:text-left">
              <p className="hero-in text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C1662E] sm:text-xs" style={{ animationDelay: "80ms" }}>
                Portfolio personnel
              </p>

              <h1 className="hero-in mt-4 font-[family-name:var(--font-display)] text-[4rem] font-bold leading-[0.9] tracking-[-0.04em] text-[#201B16] sm:text-7xl lg:text-[6.5rem]" style={{ animationDelay: "160ms" }}>
                Sylvia
              </h1>

              <div className="hero-in mt-6 flex items-center justify-center gap-4 lg:justify-start" style={{ animationDelay: "240ms" }}>
                <span className="h-px w-10 bg-[#C1662E] sm:w-14" />

                <p className="font-[family-name:var(--font-display)] text-lg italic text-[#A75B2D] sm:text-2xl">
                  Développeuse Web
                </p>
              </div>

              <h2 className="hero-in mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight text-[#201B16] sm:text-4xl" style={{ animationDelay: "300ms" }}>
                & Applications
              </h2>

              <p className="hero-in mx-auto mt-7 max-w-lg text-sm leading-7 text-[#5C5042] sm:text-base lg:mx-0" style={{ animationDelay: "380ms" }}>
                Je transforme les idées en applications web modernes,
                fonctionnelles et adaptées aux besoins de chaque projet.
              </p>

              <div className="hero-in mt-7 flex flex-wrap justify-center gap-2 lg:justify-start" style={{ animationDelay: "460ms" }}>
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "Tailwind CSS",
                  "Angular",
                  "Laravel",
                ].map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#DCC49F] bg-[#FBF1E4] px-3 py-1.5 text-[10px] font-medium text-[#5C5042] transition-colors hover:border-[#C1662E] hover:text-[#C1662E] sm:text-xs"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="hero-in mt-9 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ animationDelay: "540ms" }}>
                <a
                  href="#projets"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#201B16] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#C1662E] sm:px-7 sm:text-sm"
                >
                  Découvrir mes projets
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-[#201B16] bg-transparent px-6 py-3.5 text-xs font-semibold text-[#201B16] transition duration-300 hover:-translate-y-0.5 hover:bg-[#201B16] hover:text-white sm:px-7 sm:text-sm"
                >
                  Me contacter
                </a>
              </div>

              <p className="hero-in mt-8 font-[family-name:var(--font-display)] text-sm italic text-[#806D58]" style={{ animationDelay: "620ms" }}>
                Code · Create · Innovate
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 right-7 hidden sm:block">
            <p className="font-[family-name:var(--font-display)] text-xs italic text-[#806D58]">
              By Sylvia
            </p>
          </div>
        </div>
      </section>

      {/* ==================== À PROPOS ==================== */}
      <section
        id="a-propos"
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal className="relative mx-auto w-full max-w-[300px]">
            <div className="absolute -inset-4 rounded-[3rem] bg-[#F4E6CF]" />

            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border-2 border-[#C1662E]/30 bg-[#F7EADA] p-2 transition-transform duration-500 hover:-translate-y-1">
              <Image
                src="/sary.jpg"
                alt="Sylvia Dev"
                width={420}
                height={520}
                className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2rem] object-cover"
              />
            </div>

            <Sparkle className="absolute -right-5 top-10 h-5 w-5 text-[#C1662E]" delay={300} />
          </Reveal>

          <Reveal delay={120}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
              À propos
            </p>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
              Qui je suis
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4A4136]">
              Je suis développeuse web passionnée par la création
              d&apos;applications modernes et utiles. J&apos;aime transformer une
              idée ou un besoin concret en une solution numérique claire,
              fonctionnelle et agréable à utiliser.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#4A4136]">
              Mon approche combine développement frontend, backend,
              bases de données et conception d&apos;interfaces afin de créer
              des applications complètes.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="card-lift rounded-2xl border border-[#E4D2AC] bg-[#F7EADA] p-5">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C1662E]">
                  Web
                </p>

                <p className="mt-1 text-sm text-[#6B5B4A]">
                  Applications modernes
                </p>
              </div>

              <div className="card-lift rounded-2xl border border-[#E4D2AC] bg-[#F7EADA] p-5">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C1662E]">
                  Full-stack
                </p>

                <p className="mt-1 text-sm text-[#6B5B4A]">
                  Frontend & Backend
                </p>
              </div>

              <div className="card-lift rounded-2xl border border-[#E4D2AC] bg-[#F7EADA] p-5">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C1662E]">
                  Sur mesure
                </p>

                <p className="mt-1 text-sm text-[#6B5B4A]">
                  Selon le projet
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== FORMATION / EXPÉRIENCE ==================== */}
      <section className="border-y border-[#E4D2AC] bg-[#F4E6CF] px-6 py-20 sm:px-10 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <Reveal className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#FBF1E4] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
              Formation
            </p>

            <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">
              Licence en Informatique de Gestion
            </h3>

            <p className="mt-4 leading-7 text-[#4A4136]">
              Formation académique complétée par un apprentissage continu
              du développement web moderne et la réalisation de projets
              concrets.
            </p>
          </Reveal>

          <Reveal delay={140} className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#FBF1E4] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
              Expérience
            </p>

            <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">
              Stage — Commune Urbaine d&apos;Antananarivo
            </h3>

            <p className="mt-4 leading-7 text-[#4A4136]">
              Expérience en développement web autour d&apos;une application
              destinée à la commune, avec utilisation de technologies
              frontend, backend et base de données.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================== COMPÉTENCES ==================== */}
      <section
        id="competences"
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-8"
      >
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
            Compétences
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
              Technologies que j&apos;utilise
            </h2>

            <p className="max-w-md text-sm leading-6 text-[#6B5B4A]">
              Les technologies que j&apos;utilise pour concevoir des sites et
              applications web modernes.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 120} className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#F7EADA] p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#C1662E]">
                  {group.category}
                </h3>

                <Sparkle className="h-4 w-4 text-[#C1662E]/60" delay={index * 250} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#E4D2AC] bg-[#FBF1E4] px-3.5 py-2 text-xs font-medium text-[#4A4136] transition-colors hover:border-[#C1662E] hover:text-[#C1662E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== PROJETS ==================== */}
      <section
        id="projets"
        className="border-y border-[#E4D2AC] bg-[#F4E6CF] px-6 py-20 sm:px-10 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
              Portfolio
            </p>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
                Mes projets
              </h2>

              <p className="max-w-md text-sm leading-6 text-[#6B5B4A]">
                Quelques réalisations et projets personnels.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 100} className="card-lift rounded-[2rem]">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section
        id="services"
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-8"
      >
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C1662E]">
            Services
          </p>

          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
            Ce que je peux développer
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Reveal delay={0} className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#F7EADA] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C1662E] font-mono text-xl text-white">
              &lt;/&gt;
            </div>

            <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold">
              Applications web
            </h3>

            <p className="mt-3 leading-7 text-[#4A4136]">
              Applications modernes adaptées aux besoins spécifiques
              d&apos;un projet.
            </p>
          </Reveal>

          <Reveal delay={120} className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#F7EADA] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C1662E] text-xl text-white">
              ◉
            </div>

            <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold">
              Sites web
            </h3>

            <p className="mt-3 leading-7 text-[#4A4136]">
              Sites modernes, responsifs et adaptés aux différents
              appareils.
            </p>
          </Reveal>

          <Reveal delay={240} className="card-lift rounded-[2rem] border border-[#E4D2AC] bg-[#F7EADA] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C1662E] text-xl text-white">
              ⚙
            </div>

            <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold">
              Applications de gestion
            </h3>

            <p className="mt-3 leading-7 text-[#4A4136]">
              Outils pour gérer les ventes, stocks, utilisateurs et
              données d&apos;une activité.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 pb-20 sm:px-10 lg:px-8"
      >
        <Reveal className="relative overflow-hidden rounded-[2.8rem] bg-[#C1662E] px-8 py-14 text-white sm:px-14 sm:py-16">
          <Sparkle className="absolute right-10 top-8 h-6 w-6 text-white/50" delay={100} />

          <LeafDecoration className="absolute bottom-[-35px] right-8 h-44 w-28 rotate-12 text-white/20" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Collaborons
            </p>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
              Vous avez un projet ?
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-white/85">
              Parlons de votre idée et voyons ensemble comment la
              transformer en une application web.
            </p>

            <a
              href="mailto:vololonandrasanasylvia@gmail.com"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#FBF1E4] px-7 py-3.5 text-sm font-semibold text-[#201B16] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Me contacter
              <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[#E4D2AC] px-6 py-10 sm:px-10 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold">
              Sylvia<span className="text-[#C1662E]">Dev</span>
            </p>

            <p className="mt-1 text-xs text-[#6B5B4A]">
              Développeuse Web & Applications
            </p>
          </div>

          <p className="text-xs text-[#6B5B4A]">
            © {new Date().getFullYear()} Sylvia Dev. Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  );
}