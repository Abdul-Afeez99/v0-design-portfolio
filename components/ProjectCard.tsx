'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[color:var(--color-success)]/15 text-[color:var(--color-success)] border-[color:var(--color-success)]/30';
      case 'pending':
        return 'bg-accent/15 text-accent border-accent/30';
      case 'in-development':
        return 'bg-[color:var(--color-in-development)]/15 text-[color:var(--color-in-development)] border-[color:var(--color-in-development)]/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Spotlight follows the pointer inside the card.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      data-cursor-hover
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-500 hover:border-accent/40"
    >
      {/* Pointer spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--glow) / 0.12), transparent 60%)',
        }}
      />
      {/* Big index watermark */}
      <span className="pointer-events-none absolute -right-4 -top-8 font-display text-9xl font-bold text-accent/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:rotate-45"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${getStatusColor(
              project.status
            )}`}
          >
            {project.statusLabel}
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-accent hover:underline"
          >
            View Project
          </a>
        </div>

        <p className="mb-6 leading-relaxed text-muted-foreground">
          {project.fullDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
