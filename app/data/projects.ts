export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  image: string;
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
      "Tailwind CSS",
    ],
    type: "Projet académique",
    image: "/projects/cua.png",
    github: "#",
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
    image: "/projects/mybiz.png",
    github: "#",
  },
  {
    id: 3,
    title: "Application Web Angular & Laravel",
    description:
      "Développement d’une application web avec une interface Angular et une API backend développée avec Laravel.",
    technologies: [
      "Angular",
      "Laravel",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    type: "Projet académique",
    image: "/projects/angular-laravel.png",
    github: "#",
  },
];