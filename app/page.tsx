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

/** Technologies qui tournent en orbite dans le hero. */
const orbitTech = ["React", "Next.js", "NestJS", "Laravel", "Angular", "Tailwind"];
const ORBIT_DURATION = 18; // secondes (doit rester identique dans le CSS)

/** Phrases qui s'écrivent puis s'effacent dans le cercle. */
const typedWords = [
  "Bonjour, je suis Sylvia",
  "Développeuse Web",
  "Applications sur mesure",
  "Full-stack",
  "Next.js & NestJS",
  "Prête à créer",
];

/** Effet machine à écrire : écrit un mot, le garde, l'efface, puis passe au suivant. */
function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respecte « réduire les animations » : on affiche juste le premier mot
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setText(words[0]);
    }
  }, [words]);

  useEffect(() => {
    if (reduced) return;

    const word = words[index];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1)
          ),
        deleting ? 40 : 90
      );
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text, deleting, index, words, reduced]);

  return (
    <p className="mt-2 flex min-h-[3.5rem] items-center justify-center font-mono text-base font-semibold leading-snug sm:min-h-[4.5rem] sm:text-lg">
      <span>
        {text}
        <span className="caret ml-0.5 inline-block h-[1em] w-0.5 bg-white align-middle" />
      </span>
    </p>
  );
}

/* ---------- Contact ---------- */
const CONTACT_EMAIL = "vololonandrasanasylvia@gmail.com";

const contactInfo = [
  {
    icon: "mail",
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: "phone",
    label: "Téléphone",
    value: "038 16 004 33",
    href: "tel:+261381600433",
  },
  {
    icon: "pin",
    label: "Localisation",
    value: "Antananarivo, Madagascar",
    href: undefined,
  },
] as const;

// À remplacer par tes vrais liens (ajoute ton pseudo à la fin)
const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

const projectTypes = [
  "Site web",
  "Application web",
  "Application de gestion",
  "Autre",
];

const fieldClass =
  "w-full rounded-2xl border border-[#E4D2AC] bg-white/70 px-4 py-3 text-sm text-[#201B16] placeholder:text-[#9A8A76] outline-none transition focus:border-[#C1662E] focus:bg-white focus:ring-4 focus:ring-[#C1662E]/15";

function ContactIcon({ name }: { name: "mail" | "phone" | "pin" }) {
  const icons = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

// Clé publique Web3Forms (gratuite) : les messages arrivent dans ta boîte mail.
// Mets-la dans le fichier .env.local : NEXT_PUBLIC_WEB3FORMS_KEY=ta_cle
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const initialForm = {
  name: "",
  email: "",
  project: projectTypes[0],
  message: "",
};

/** Formulaire : envoie le message directement dans ta boîte mail. */
function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const update =
    (key: keyof typeof form) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  // Vide tous les champs et revient au formulaire
  const resetForm = () => {
    setForm(initialForm);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    if (!WEB3FORMS_KEY) {
      console.warn("NEXT_PUBLIC_WEB3FORMS_KEY est manquante dans .env.local");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau message de ${form.name} - ${form.project}`,
          from_name: "Portfolio SylviaDev",
          name: form.name,
          email: form.email,
          project: form.project,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setForm(initialForm);
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] bg-[#FBF1E4] p-8 text-center text-[#201B16] shadow-[0_25px_60px_rgba(60,25,5,0.25)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C1662E] text-3xl text-white">
          ✓
        </div>

        <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold">
          Message envoyé
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-6 text-[#5C5042]">
          Merci ! Votre message est bien arrivé. Je vous répondrai dès que
          possible.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-6 rounded-full border border-[#201B16] px-6 py-2.5 text-xs font-semibold transition hover:bg-[#201B16] hover:text-white"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-[#FBF1E4] p-6 text-[#201B16] shadow-[0_25px_60px_rgba(60,25,5,0.25)] sm:p-8"
    >
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
        Envoyez-moi un message
      </h3>

      <p className="mt-1 text-sm text-[#6B5B4A]">
        Décrivez votre idée en quelques lignes.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-[#4A4136]">
            Nom complet
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={update("name")}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-[#4A4136]">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            placeholder="nom@exemple.com"
            value={form.email}
            onChange={update("email")}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-project" className="mb-1.5 block text-xs font-semibold text-[#4A4136]">
          Type de projet
        </label>
        <select
          id="contact-project"
          value={form.project}
          onChange={update("project")}
          className={fieldClass}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="contact-message" className="text-xs font-semibold text-[#4A4136]">
            Message
          </label>
          <span className="text-[11px] text-[#9A8A76]">
            {form.message.length}/500
          </span>
        </div>
        <textarea
          id="contact-message"
          required
          rows={5}
          maxLength={500}
          placeholder="Bonjour Sylvia, j'aimerais créer..."
          value={form.message}
          onChange={update("message")}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-2xl bg-[#FBE3DA] px-4 py-3 text-sm leading-6 text-[#8A2E14]"
        >
          Le message n&apos;a pas pu être envoyé. Réessayez, ou écrivez-moi
          directement à {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#201B16] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#C1662E] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        {status !== "sending" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        )}
      </button>
    </form>
  );
}

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
        /* ---------- Apparition au scroll ---------- */
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

        /* ---------- Visuel animé du hero ---------- */

        /* Badges en orbite : ils tournent mais restent droits */
        .orbit-item {
          --r: 135px;
          animation: orbit ${ORBIT_DURATION}s linear infinite;
          transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateX(var(--r)) rotate(calc(var(--a, 0deg) * -1));
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--r)) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--r)) rotate(-360deg); }
        }
        @media (min-width: 640px) {
          .orbit-item { --r: 170px; }
        }

        /* Anneau en pointillés */
        .spin-slow { animation: spinSlow 30s linear infinite; }
        @keyframes spinSlow { to { transform: rotate(360deg); } }

        /* Ondes qui partent du centre */
        .pulse-ring { animation: pulseRing 2.4s ease-out infinite; }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.65); opacity: 0; }
        }

        /* Cercle central qui respire */
        .core-glow { animation: coreGlow 2.4s ease-in-out infinite; }
        @keyframes coreGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(193, 102, 46, 0.5), 0 15px 35px rgba(193, 102, 46, 0.35); transform: scale(1); }
          50%      { box-shadow: 0 0 0 18px rgba(193, 102, 46, 0), 0 15px 35px rgba(193, 102, 46, 0.35); transform: scale(1.06); }
        }

        /* Cercle : bordure lumineuse qui tourne + ligne de scan */
        .core-ring {
          background: conic-gradient(
            from 0deg,
            #C1662E,
            #F4C27A,
            #FBF1E4,
            #F4C27A,
            #C1662E,
            #7A3514,
            #C1662E
          );
          animation: spinSlow 6s linear infinite;
        }
        .core-scan {
          background: linear-gradient(to bottom, transparent, rgba(244, 194, 122, 0.22), transparent);
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          from { transform: translateY(-100%); }
          to   { transform: translateY(260%); }
        }

        /* Quadrillage à l'intérieur du cercle */
        .core-grid {
          background-image:
            linear-gradient(rgba(251, 241, 228, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 241, 228, 0.2) 1px, transparent 1px);
          background-size: 22px 22px;
          animation: coreGridMove 10s linear infinite;
        }
        @keyframes coreGridMove {
          to { background-position: 22px 22px, 22px 22px; }
        }

        /* Curseur qui clignote */
        .caret { animation: blink 1s steps(1) infinite; }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* ---------- Fond du hero : vagues ---------- */
        /* Vagues : le SVG fait 200 % de large et glisse de 50 % */
        .wave { animation: waveMove 18s linear infinite; }
        .wave-2 { animation-duration: 12s; animation-direction: reverse; }
        .wave-3 { animation-duration: 8s; }
        @keyframes waveMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Symboles de code : grands, brillants, ils montent, tournent et grossissent */
        .drift { animation: drift 6s ease-in-out infinite; }
        .drift-rev { animation: drift 8s ease-in-out infinite reverse; }
        @keyframes drift {
          0%, 100% { transform: translateY(0) rotate(-8deg) scale(1); opacity: 0.7; }
          50%      { transform: translateY(-38px) rotate(14deg) scale(1.2); opacity: 1; }
        }

        /* ---------- Accessibilité : moins d'animation ---------- */
        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-in, .twinkle, .card-lift {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .orbit-item, .spin-slow, .pulse-ring, .core-glow, .core-ring, .core-scan,
          .caret, .core-grid, .wave, .drift, .drift-rev {
            animation: none !important;
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
          {/* ================= FOND ================= */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {/* base crème */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FBF1E4] to-[#F6E4CB]" />

            {/* symboles de code bien visibles */}
            {[
              { s: "{ }", cls: "left-[4%] top-[9%] text-6xl text-[#C1662E]/80 [text-shadow:0_6px_18px_rgba(193,102,46,0.45)]", d: "0s", rev: false },
              { s: "</>", cls: "left-[40%] top-[6%] text-4xl text-[#201B16]/60", d: "-2s", rev: true },
              { s: "( )", cls: "left-[3%] bottom-[30%] text-5xl text-[#201B16]/55", d: "-4s", rev: false },
              { s: ";", cls: "right-[5%] top-[38%] text-7xl text-[#C1662E]/80 [text-shadow:0_6px_18px_rgba(193,102,46,0.45)]", d: "-1s", rev: true },
              { s: "[ ]", cls: "right-[8%] bottom-[24%] text-5xl text-[#C1662E]/80 [text-shadow:0_6px_18px_rgba(193,102,46,0.45)]", d: "-3s", rev: false },
              { s: "=>", cls: "left-[42%] bottom-[16%] text-4xl text-[#201B16]/55", d: "-5s", rev: true },
            ].map((item) => (
              <span
                key={item.s}
                className={`${item.rev ? "drift-rev" : "drift"} absolute font-mono font-bold ${item.cls}`}
                style={{ animationDelay: item.d }}
              >
                {item.s}
              </span>
            ))}

            {/* vagues en bas */}
            <svg
              className="wave wave-1 absolute bottom-0 left-0 h-36 w-[200%]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="#F2C9A0"
              fillOpacity="0.5"
            >
              <path d="M0 60 C150 20 150 100 300 60 S450 100 600 60 C750 20 750 100 900 60 S1050 100 1200 60 V120 H0 Z" />
            </svg>
            <svg
              className="wave wave-2 absolute bottom-0 left-0 h-28 w-[200%]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="#E8A26B"
              fillOpacity="0.35"
            >
              <path d="M0 60 C150 20 150 100 300 60 S450 100 600 60 C750 20 750 100 900 60 S1050 100 1200 60 V120 H0 Z" />
            </svg>
            <svg
              className="wave wave-3 absolute bottom-0 left-0 h-20 w-[200%]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="#C1662E"
              fillOpacity="0.2"
            >
              <path d="M0 60 C150 20 150 100 300 60 S450 100 600 60 C750 20 750 100 900 60 S1050 100 1200 60 V120 H0 Z" />
            </svg>
          </div>

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
            {/* ================= VISUEL ANIMÉ ================= */}

            <div
              className="hero-in relative mx-auto flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px]"
              style={{ animationDelay: "0ms" }}
              aria-hidden="true"
            >
              {/* anneaux */}
              <div className="spin-slow absolute inset-4 rounded-full border-2 border-dashed border-[#C1662E]/40 sm:inset-2" />

              {/* ondes qui pulsent */}
              <div className="pulse-ring absolute h-44 w-44 rounded-full border-2 border-[#C1662E] sm:h-56 sm:w-56" />
              <div
                className="pulse-ring absolute h-44 w-44 rounded-full border-2 border-[#C1662E] sm:h-56 sm:w-56"
                style={{ animationDelay: "1.2s" }}
              />

              {/* cercle central avec le texte animé */}
              <div className="core-glow relative z-10 h-44 w-44 rounded-full sm:h-56 sm:w-56">
                {/* bordure lumineuse qui tourne */}
                <div className="core-ring absolute inset-0 rounded-full" />

                {/* intérieur brun chocolat avec quadrillage */}
                <div
                  className="absolute inset-[4px] overflow-hidden rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, #8A5A3C 0%, #5A3A28 55%, #3A2418 100%)",
                  }}
                >
                  <div className="core-grid absolute inset-0" />
                  <div className="core-scan absolute inset-x-0 top-0 h-2/5" />
                  <div className="absolute -bottom-8 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-[#C1662E]/50 blur-2xl" />

                  <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center text-[#FBF1E4]">
                    <span className="font-mono text-xs text-[#F4C27A] sm:text-sm">
                      &lt;/&gt;
                    </span>
                    <TypingText words={typedWords} />
                  </div>
                </div>
              </div>

              {/* badges en orbite */}
              {orbitTech.map((tech, i) => (
                <span
                  key={tech}
                  className="orbit-item absolute left-1/2 top-1/2 z-20 whitespace-nowrap rounded-full border border-[#C1662E]/50 bg-[#FBF1E4] px-3 py-1.5 text-[11px] font-semibold text-[#201B16] shadow-md sm:text-xs"
                  style={
                    {
                      animationDelay: `${-(i * ORBIT_DURATION) / orbitTech.length}s`,
                      "--a": `${(360 / orbitTech.length) * i}deg`,
                    } as React.CSSProperties
                  }
                >
                  {tech}
                </span>
              ))}
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
        <Reveal className="relative overflow-hidden rounded-[2.8rem] bg-[#C1662E] px-6 py-12 text-white sm:px-12 sm:py-16">
          <Sparkle className="absolute right-10 top-8 h-6 w-6 text-white/50" delay={100} />
          <Sparkle className="absolute bottom-10 left-[46%] hidden h-4 w-4 text-white/40 lg:block" delay={600} />

          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <LeafDecoration className="pointer-events-none absolute -bottom-8 left-6 h-44 w-28 -rotate-12 text-white/15" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            {/* ---------- Infos ---------- */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Collaborons
              </p>

              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
                Vous avez un projet ?
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/85">
                Parlons de votre idée et voyons ensemble comment la
                transformer en une application web.
              </p>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8FE3A0] opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8FE3A0]" />
                </span>
                Disponible pour de nouveaux projets
              </div>

              <ul className="mt-8 space-y-3">
                {contactInfo.map((item) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBF1E4] text-[#C1662E]">
                        <ContactIcon name={item.icon} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
                          {item.label}
                        </span>
                        <span className="block break-words text-sm font-semibold sm:text-base">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  const cardClass =
                    "flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 transition duration-300";

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`${cardClass} hover:-translate-y-0.5 hover:bg-white/20`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={cardClass}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-white/70">Me suivre</span>

                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-[#FBF1E4] hover:text-[#201B16]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ---------- Formulaire ---------- */}
            <ContactForm />
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