'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-development':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />

      <div className="relative bg-card border border-border rounded-2xl p-8 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-transparent" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {project.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.shortDescription}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon p-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            </motion.div>
          </div>

          {/* Status Badge */}
          <div className="mb-6 flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                project.status
              )}`}
            >
              {project.statusLabel}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View Project
            </a>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground hover:text-accent transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
