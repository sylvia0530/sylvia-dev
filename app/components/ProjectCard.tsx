import Image from "next/image";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#E4D2AC] bg-[#FBF1E4] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-[#F8EDDD]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-[#FBF1E4]/95 px-3 py-1.5 text-xs font-semibold text-[#C1662E] shadow-sm">
          {project.type}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#201B16]">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#6B5B4A]">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[#E4D2AC] bg-[#F8EDDD] px-3 py-1 text-xs font-medium text-[#5C5042]"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Boutons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#C1662E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A95124]"
            >
              Voir le projet
            </a>
          )}

          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#DCC49F] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#4A4136] transition hover:bg-[#F4E6CF]"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}