import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: String(project.id),
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FBF1E4] px-5 py-12 text-[#201B16] md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Retour */}
        <Link
          href="/#projets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C1662E] transition hover:text-[#A95124]"
        >
          <span aria-hidden="true">←</span>
          Retour aux projets
        </Link>

        {/* En-tête */}
        <div className="mt-8">
          <span className="inline-block rounded-full border border-[#E4D2AC] bg-[#F8EDDD] px-4 py-2 text-xs font-semibold text-[#C1662E]">
            {project.type}
          </span>

          <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#6B5B4A]">
            {project.description}
          </p>
        </div>

        {/* Image du projet */}
        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-[#E4D2AC] bg-[#F8EDDD] shadow-sm">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>

        {/* Fonctionnalités */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
            Fonctionnalités principales
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-[#E4D2AC] bg-[#F8EDDD] p-5"
              >
                <span className="mt-0.5 font-bold text-[#C1662E]">
                  ✓
                </span>

                <span className="text-sm leading-6 text-[#5C5042]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
            Technologies utilisées
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[#DCC49F] bg-[#F8EDDD] px-4 py-2 text-sm font-medium text-[#5C5042]"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* Liens */}
        <div className="mt-12 flex flex-wrap gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#C1662E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#A95124]"
            >
              Accéder au site
            </a>
          )}

          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#DCC49F] px-6 py-3 text-sm font-semibold text-[#4A4136] transition hover:bg-[#F4E6CF]"
            >
              Voir le code sur GitHub
            </a>
          )}
        </div>
      </div>
    </main>
  );
}