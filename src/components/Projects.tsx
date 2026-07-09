/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, Sliders } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  // Normalized mouse position (ranges from 0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Fluid physics settings for smooth rotations and hover actions
  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  
  // Custom transforms to convert normalized coordinate mouse pointers to rotational coordinates (between -8 and 8 degrees)
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), springConfig);
  const scale = useSpring(1, springConfig);

  // Dynamic light reflection/glare effect following mouse coordinates
  const glareBg = useTransform(
    [x, y] as any,
    ([latestX, latestY]: [number, number]) =>
      `radial-gradient(circle at ${latestX * 100}% ${latestY * 100}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    scale.set(1.035); // Gentle scale up for premium layout detail
  };

  const handleMouseLeave = () => {
    scale.set(1);
    x.set(0.5);
    y.set(0.5);
  };

  const cardColor = isActive
    ? 'bg-neutral-900 border-neutral-700 shadow-[0_4px_24px_rgba(255,255,255,0.04)] text-white'
    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400 text-neutral-700 dark:bg-neutral-950/45 dark:border-neutral-900/80 dark:hover:border-neutral-800 dark:text-neutral-300';

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className={`p-6 rounded border relative overflow-hidden flex flex-col justify-between group cursor-pointer select-none transition-colors duration-300 w-full h-full ${cardColor}`}
        onClick={onClick}
      >
        {/* Shiny glare effect container */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
          style={{ background: glareBg }}
        />

        {/* Outer subtle glow highlight */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/5 dark:border-white/5 rounded" />

        {/* Content elevated relative to the backplate for 3D parallax feel */}
        <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex justify-between items-start gap-4 mb-3 text-left">
            <h3 className={`text-sm sm:text-base font-display font-bold uppercase tracking-tight transition-colors ${isActive ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
              {project.title}
            </h3>
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              <a
                id={`btn-proj-github-${project.id}`}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded border transition-all flex items-center justify-center ${isActive ? 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700' : 'bg-neutral-100 text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:border-neutral-400 dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-900 dark:hover:text-white dark:hover:border-neutral-700'}`}
                aria-label="GitHub link"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className={`text-xs leading-relaxed mb-4 text-left transition-colors duration-300 ${isActive ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-300'}`}>
            {project.description}
          </p>
        </div>

        {/* Footer/actions with even higher 3D elevation */}
        <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex flex-wrap gap-1.5 mb-5 justify-start">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 text-[9px] font-mono rounded border transition-all ${isActive ? 'bg-neutral-950 text-neutral-400 border-neutral-800' : 'bg-neutral-100 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-900 group-hover:border-neutral-300 dark:group-hover:border-neutral-800'}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Simulator Trigger Button */}
          <button
            id={`btn-proj-simulate-${project.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`text-[10px] font-bold font-mono tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isActive
                ? 'text-white'
                : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white hover:text-neutral-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isActive ? "✔ Sandbox Running [▲]" : "▶ Launch Sandbox [▶]"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
