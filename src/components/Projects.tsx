/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from 'motion/react';
import { projects } from '../data';

import ProjectCard, { stockVideos } from './ProjectCard';
const ProjectDemo = lazy(() => import('./ProjectDemo'));

export type ProjectFilterCategory = 'all' | 'data-science' | 'ai' | 'ml' | 'web-dev' | 'bi';

const featured = new Map([["artemis", "Applied AI"], ["aircraft-analytics", "Data engineering"], ["supply-chain-delay", "Machine learning"], ["retail-bi-dashboard", "Business intelligence"], ["crypto-prediction", "Time-series analysis"], ["store-sales-analysis", "Retail analytics"]]);

const featuredProjects = Array.from(featured).flatMap(([id, discipline]) => {
  const project = projects.find(item => item.id === id);
  return project ? [{ project, discipline }] : [];
});

const frameSummaries: Record<string, string> = {
  artemis: 'Chat with a local AI assistant using voice or text.',
  'aircraft-analytics': 'Turn flight records into aircraft performance metrics.',
  'supply-chain-delay': 'Predict delivery delays from logistics data.',
  'retail-bi-dashboard': 'Explore revenue and customer trends in Power BI.',
  'crypto-prediction': 'Forecast price direction from historical market data.',
  'store-sales-analysis': 'Clean retail data and uncover purchasing patterns.',
};

function GalleryFrame({ index, active, position, onSelect }: {
  key?: string;
  index: number;
  active: number;
  position: ReturnType<typeof useMotionValue<number>>;
  onSelect: () => void;
}) {
  const { project } = featuredProjects[index];
  const relative = useTransform(position, value => index - value);
  const glow = useTransform(relative, value => Math.max(0, 1 - Math.abs(value)));
  const x = useTransform(relative, value => `calc(${value} * var(--frame-step))`);
  const z = useTransform(relative, value => -180 * (1 - Math.exp(-.24 * value * value)));
  const rotateY = useTransform(relative, value => -28 * Math.tanh(value * .85));
  const zIndex = useTransform(relative, value => 20 - Math.round(Math.abs(value) * 4));
  const poster = ['store-sales-analysis', 'interactive-data-platform'].includes(project.id) ? undefined : `/showcase/${project.id}.png`;
  const source = project.id === 'artemis' ? '/videos/artemis-render.mp4' : `https://videos.pexels.com/video-files/${stockVideos[project.id]}`;
  const reduced = useReducedMotion();
  const play = !reduced && Math.abs(index - active) <= 1;

  return (
    <motion.a className="reel-frame" href={`#work/${project.id}`} style={{ x, z, rotateY, zIndex }}
      tabIndex={Math.abs(index - active) <= 1 ? 0 : -1}
      onClick={event => { if (index !== active) { event.preventDefault(); onSelect(); } }}>
      {play ? <video src={source} poster={poster} autoPlay muted loop playsInline aria-hidden="true" />
        : poster && <img src={poster} alt="" loading="lazy" />}
      <motion.i className="reel-glow" aria-hidden="true" style={{ opacity: glow }} />
      <span><span className="reel-caption"><small>{featuredProjects[index].discipline}</small>{project.title}<small className="reel-summary">{frameSummaries[project.id]}</small></span><b aria-hidden="true">↗</b></span>
    </motion.a>
  );
}

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

  const carouselTrack = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const swipeStart = useRef<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const reelPosition = useMotionValue(0);
  const easedPosition = useSpring(reelPosition, { stiffness: 105, damping: 23, mass: .85 });
  const scrollRange = () => {
    const track = carouselTrack.current;
    if (!track || reducedMotion) return 0;
    return Math.max(0, track.clientHeight - (track.firstElementChild?.clientHeight ?? track.clientHeight) - 24);
  };

  useMotionValueEvent(scrollY, 'change', () => {
    const range = scrollRange();
    if (!range || selectedSimulator) return;
    const top = carouselTrack.current!.getBoundingClientRect().top;
    const stickyTop = parseFloat(getComputedStyle(carouselTrack.current!.firstElementChild!).top);
    if (!Number.isFinite(stickyTop)) return;
    const progress = Math.max(0, Math.min(1, (stickyTop - top) / range));
    const position = progress * (featuredProjects.length - 1);
    reelPosition.set(position);
    setActiveSlide(Math.round(position));
  });

  const moveGallery = (direction: number) => {
    const next = (activeSlide + direction + featuredProjects.length) % featuredProjects.length;
    const range = scrollRange();
    if (range && carouselTrack.current) {
      const track = carouselTrack.current;
      const stickyTop = parseFloat(getComputedStyle(track.firstElementChild!).top);
      window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top - stickyTop + range * next / (featuredProjects.length - 1), behavior: 'instant' });
    }
    reelPosition.set(next);
    setActiveSlide(next);
    setSelectedSimulator(null);
  };

  const gallery = (
          <motion.div key={showAll ? "index" : activeSlide} initial={reducedMotion || showAll ? false : { opacity: .45, x: 32, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: .4 }} id="project-gallery" className={showAll ? "project-gallery work-index" : "project-gallery work-featured project-rail"}>
              {(showAll ? filteredProjects : [featuredProjects[activeSlide].project]).map((project) => {
                const isActive = selectedSimulator === project.id;
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    staticCard={showAll}
                    hideCover={!showAll}
                    discipline={featured.get(project.id)}
                    isActive={isActive}
                    onClick={() => handleProjectSelect(project.id)}
                  />
                );
              })}
          </motion.div>
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
          {showAll ? gallery : (
            <div className="carousel-track" ref={carouselTrack}>
            
            <div className="carousel-stage" aria-label="Featured projects. Swipe to browse on touchscreens."
              onTouchStart={event => { swipeStart.current = event.touches[0]?.clientX ?? null; }}
              onTouchCancel={() => { swipeStart.current = null; }}
              onTouchEnd={event => {
                const start = swipeStart.current;
                swipeStart.current = null;
                const end = event.changedTouches[0]?.clientX;
                if (start !== null && end !== undefined && Math.abs(end - start) > 60) {
                  moveGallery(end < start ? 1 : -1);
                }
              }}>
              <span className="sr-only" role="status">Project {activeSlide + 1} of {featuredProjects.length}</span>
              {featuredProjects.map(({ project }, index) => (
                <GalleryFrame key={project.id} index={index} active={activeSlide} position={reducedMotion ? reelPosition : easedPosition}
                  onSelect={() => moveGallery(index - activeSlide)} />
              ))}
            </div>
            </div>
          )}

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
