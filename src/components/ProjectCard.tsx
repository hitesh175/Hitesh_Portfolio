/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Github, Sliders, ArrowUpRight, Bot, Plane, Truck, TrendingUp, BarChart3, Table2, PanelsTopLeft } from 'lucide-react';
import { Project } from '../types';
import { workflows } from './CaseStudy';

interface ProjectCardProps {
  key?: string;
  project: Project;
  number: number;
  discipline?: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCard({ project, number, discipline, isActive, onClick }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const tile = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tile, offset: ['start end', 'start 48%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const depth = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [34, 0]);

  const icons = {
    artemis: Bot,
    'aircraft-analytics': Plane,
    'supply-chain-delay': Truck,
    'crypto-prediction': TrendingUp,
    'retail-bi-dashboard': BarChart3,
    'store-sales-analysis': Table2,
    'interactive-data-platform': PanelsTopLeft,
  };
  const ProjectIcon = icons[project.id as keyof typeof icons] || PanelsTopLeft;
  const cardColor = isActive
    ? 'bg-neutral-900 border-neutral-700 shadow-[0_4px_24px_rgba(255,255,255,0.04)] text-white'
    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400 text-neutral-700 dark:bg-neutral-950/45 dark:border-neutral-900/80 dark:hover:border-neutral-800 dark:text-neutral-300';

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'data-science': return 'Data Science';
      case 'ai': return 'AI';
      case 'ml': return 'Machine Learning';
      case 'web-dev': return 'Web Dev';
      case 'bi': return 'BI & Analytics';
      default: return cat.toUpperCase();
    }
  };

  return (
    <div ref={tile} className="project-tile w-full h-full">
      <motion.div
        layout
        style={reducedMotion ? undefined : { rotateX, z: depth, y: lift }}
        initial={reducedMotion ? false : { opacity: 0.65 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}

        className={`project-card p-6 rounded border relative overflow-hidden flex flex-col justify-between group select-text transition-colors duration-300 w-full h-full ${cardColor}`}

      >
        <a className="project-icon-cover" href={`#work/${project.id}`} aria-label={`Explore ${project.title}`}>
          <ProjectIcon size={26} strokeWidth={1.5} aria-hidden="true" />
          <ol className="work-preview" aria-hidden="true">
            {workflows[project.id].map(step => <li key={step}>{step}</li>)}
          </ol>
        </a>
        {/* Project content */}
        <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex justify-between items-start gap-4 mb-2 text-left">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-wider block mb-1 ${isActive ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'}`}>
                {String(number).padStart(2, "0")} · {discipline ?? getCategoryLabel(project.category)}
              </span>
              <h3 className={`text-sm sm:text-base font-display font-bold uppercase tracking-tight transition-colors ${isActive ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                {project.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <a
                id={`btn-proj-github-${project.id}`}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded border transition-all flex items-center justify-center ${isActive ? 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700' : 'bg-neutral-100 text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:border-neutral-400 dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-900 dark:hover:text-white dark:hover:border-neutral-700'}`}
                aria-label={`View ${project.title} source on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className={`text-xs leading-relaxed mb-4 text-left transition-colors duration-300 font-normal ${isActive ? 'text-neutral-100' : 'text-neutral-750 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white'}`}>
            {project.description}
          </p>
        </div>

        <a className="work-case-link" href={`#work/${project.id}`}>Read case study <ArrowUpRight size={16} aria-hidden="true" /></a>

        {/* Project actions */}
        <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex flex-wrap gap-1.5 mb-5 justify-start">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 text-xs font-mono font-medium rounded border transition-all ${isActive ? 'bg-neutral-900 text-neutral-200 border-neutral-700' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-400 dark:group-hover:border-neutral-600'}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Simulator Trigger Button */}
          {project.hasInteractiveDemo === false ? (
            <a
              href={`${project.githubLink.replace(/\.git$/, "")}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white underline underline-offset-4"
              aria-label={`Read ${project.title} project overview`}
            >
              Read project overview <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : <button
            id={`btn-proj-simulate-${project.id}`} aria-expanded={isActive} aria-controls="project-demo" aria-label={`${isActive ? 'Close' : 'Open'} ${project.title} demo`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`text-xs font-bold font-mono tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isActive
                ? 'text-white'
                : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white hover:text-neutral-950'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isActive ? "Close demo" : "Explore demo"}</span>
          </button>}
        </div>
      </motion.div>
    </div>
  );
}
