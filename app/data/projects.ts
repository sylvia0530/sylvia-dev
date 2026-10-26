export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  image: string;
  features: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Commune Urbaine d’Antananarivo",
    description:
      "Conception et développement d’une plateforme web moderne pour la présentation des services de la Commune Urbaine d’Antananarivo et la gestion de ses contenus.",
    technologies: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "CSS",
    ],
    type: "Projet académique",
    image: "/cua.JPG",
    features: [
      "Présentation des services de la commune",
      "Gestion et publication des contenus",
      "Affichage des actualités et des projets",
      "Interface bilingue français et malgache",
    ],
    demo: "https://site.cua.mg",
  },
  {
    id: 2,
    title: "MyBiz Manager",
    description:
      "Application web de gestion destinée aux petites activités et entreprises pour faciliter le suivi des ventes, produits et opérations quotidiennes.",
    technologies: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    type: "Projet personnel",
    image: "/mybiz.JPG",
    features: [
      "Gestion des produits",
      "Suivi des ventes",
      "Organisation des opérations quotidiennes",
      "Centralisation des informations de gestion",
    ],
  },
];