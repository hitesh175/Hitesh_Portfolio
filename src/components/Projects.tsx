/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { projects } from '../data';

import ProjectCard from './ProjectCard';
import WorkShowcase from './WorkShowcase';
const ProjectDemo = lazy(() => import('./ProjectDemo'));

export type ProjectFilterCategory = 'all' | 'data-science' | 'ai' | 'ml' | 'web-dev' | 'bi';

const featured = new Map([["artemis", "Applied AI"], ["aircraft-analytics", "Data engineering"], ["supply-chain-delay", "Machine learning"], ["retail-bi-dashboard", "Business intelligence"]]);

const featuredProjects = projects.flatMap(project => {
  const discipline = featured.get(project.id);
  return discipline ? [{ project, discipline }] : [];
});

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<ProjectFilterCategory>('all');
  const [selectedSimulator, setSelectedSimulator] = useState<string | null>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = (projectId: string) => {
    setSelectedSimulator(current => current === projectId ? null : projectId);
    setTimeout(() => {
      sandboxRef.current?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'nearest' });
    }, 150);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'bi') {
      return (
        project.category === 'bi' ||
        project.category === 'analytics' ||
        project.categories?.includes('bi') ||
        project.categories?.includes('analytics')
      );
    }
    return project.category === filter || project.categories?.includes(filter);
  });

  const handleFilterChange = (newFilter: ProjectFilterCategory) => {
    setFilter(newFilter);
    const visible = projects.filter((project) => {
      if (newFilter === 'all') return true;
      if (newFilter === 'bi') {
        return (
          project.category === 'bi' ||
          project.category === 'analytics' ||
          project.categories?.includes('bi') ||
          project.categories?.includes('analytics')
        );
      }
      return project.category === newFilter || project.categories?.includes(newFilter);
    });
    if (selectedSimulator && !visible.some((p) => p.id === selectedSimulator)) {
      setSelectedSimulator(null);
    }
  };

  const categoryFilters: { id: ProjectFilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: projects.length },
    {
      id: 'data-science',
      label: 'Data Science',
      count: projects.filter((p) => p.categories?.includes('data-science') || p.category === 'data-science').length,
    },
    {
      id: 'ai',
      label: 'AI',
      count: projects.filter((p) => p.categories?.includes('ai') || p.category === 'ai').length,
    },
    {
      id: 'ml',
      label: 'Machine Learning',
      count: projects.filter((p) => p.categories?.includes('ml') || p.category === 'ml').length,
    },
    {
      id: 'web-dev',
      label: 'Web Dev',
      count: projects.filter((p) => p.categories?.includes('web-dev') || p.category === 'web-dev').length,
    },
    {
      id: 'bi',
      label: 'BI & Analytics',
      count: projects.filter(
        (p) =>
          p.categories?.includes('bi') ||
          p.category === 'bi' ||
          p.categories?.includes('analytics') ||
          p.category === 'analytics'
      ).length,
    },
  ];

  const gallery = (
          <div className={showAll ? "project-gallery work-index" : "project-gallery work-featured"}>
              {(showAll ? filteredProjects : featuredProjects.map(({ project }) => project)).map((project) => {
                const isActive = selectedSimulator === project.id;
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    number={(showAll ? projects.indexOf(project) : featuredProjects.findIndex(item => item.project === project)) + 1}
                    discipline={featured.get(project.id)}
                    isActive={isActive}
                    onClick={() => handleProjectSelect(project.id)}
                  />
                );
              })}
          </div>
  );

  return (
    <section
      id="projects"
      className="py-10 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="projects-heading mb-8">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Projects
          </h2>
          <div className="w-12 h-1 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        <div className="work-views" role="group" aria-label="Project views">
          <button aria-pressed={!showAll} onClick={() => { setShowAll(false); setSelectedSimulator(null); }}>Featured ({featuredProjects.length})</button>
          <button aria-pressed={showAll} onClick={() => { setShowAll(true); handleFilterChange('all'); }}>All projects ({projects.length})</button>
        </div>

        {/* Categories Tab Bar */}
        <div hidden={!showAll} className={showAll ? "project-filters flex flex-wrap gap-2 mb-12" : ""}>
          {categoryFilters.map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                id={`filter-btn-${cat.id}`} aria-pressed={isSelected}
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-2 rounded text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-neutral-950 text-white border-neutral-800 dark:bg-white dark:text-neutral-950 dark:border-neutral-200 shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:text-neutral-950 border-neutral-200 hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                    isSelected
                      ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-200 dark:text-neutral-900'
                      : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Layout Grid */}
        <div className="space-y-10">

          {/* Projects Multi-Column Grid (Eliminates vertical stretching & dynamically centers fewer items) */}
          {showAll || reducedMotion ? gallery : <WorkShowcase items={featuredProjects}>{gallery}</WorkShowcase>}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 px-4 bg-neutral-100/50 dark:bg-neutral-950/50 rounded border border-dashed border-neutral-300 dark:border-neutral-800 max-w-md mx-auto">
              <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300 font-medium">
                No projects found in this category.
              </p>
              <button
                onClick={() => handleFilterChange('all')}
                className="mt-4 px-4 py-2 text-xs font-mono font-bold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded cursor-pointer transition-transform hover:scale-105"
              >
                Reset to All Projects
              </button>
            </div>
          )}

          {/* Active Sandbox Guidance Banner */}
          {selectedSimulator && (
            <div className="max-w-4xl mx-auto w-full mb-3 p-3.5 bg-neutral-100/90 dark:bg-neutral-950/95 hover:bg-neutral-200/95 dark:hover:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-850 hover:border-neutral-300 dark:hover:border-neutral-700 rounded flex items-center justify-between text-xs font-mono text-neutral-800 dark:text-neutral-200 tracking-wide shadow-sm group transition-all duration-300">
              <div className="flex items-center space-x-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className=" absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900 dark:bg-white"></span>
                </span>
                <span className="group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                  SANDBOX ACTIVE // <strong className="text-neutral-900 dark:text-white font-bold">{(projects.find(p => p.id === selectedSimulator))?.title}</strong> is running below.
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center text-xs text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-sky-400 font-bold gap-1  transition-colors duration-300">
                Scroll & interact below to test raw data simulations ↓
              </span>
            </div>
          )}

          {/* Interactive Visualization Simulator Console (Centered full-width layout) */}
          <div id="project-demo" ref={sandboxRef} className="max-w-4xl mx-auto w-full transition-all duration-300">
            <AnimatePresence mode="wait">
              {selectedSimulator && (
                <Suspense fallback={<p role="status" className="p-6">Loading demonstration…</p>}><ProjectDemo key={selectedSimulator} projectId={selectedSimulator}/></Suspense>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
