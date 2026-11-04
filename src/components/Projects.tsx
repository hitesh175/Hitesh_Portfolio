import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import { projectEvidence, workflows } from './CaseStudy';

gsap.registerPlugin(ScrollTrigger);

const ProjectDemo = lazy(() => import('./ProjectDemo'));

const disciplines: Record<string, string> = {
  artemis: 'Applied AI',
  'aircraft-analytics': 'Data engineering',
  'supply-chain-delay': 'Machine learning',
  'crypto-prediction': 'Time-series analysis',
  'retail-bi-dashboard': 'Business intelligence',
  'store-sales-analysis': 'Retail analytics',
  'interactive-data-platform': 'Web development',
};

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const demo = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const visualPosition = useRef(0);
  const mouseDrag = useRef<{ id: number; x: number; position: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const reel = useRef<HTMLDivElement>(null);
  const scrollTrigger = useRef<ScrollTrigger | null>(null);

  function paintReel(value: number) {
    visualPosition.current = value;
    reel.current?.querySelectorAll<HTMLElement>('.explorer-row').forEach((element, index) => {
      const distance = index - value;
      const angle = gsap.utils.clamp(-1.2, 1.2, distance * .67);
      const outsideArc = Math.max(0, Math.abs(distance) - 1.2 / .67);
      const horizontal = Math.sin(angle) * 1.58 + Math.sign(distance) * outsideArc * .8;
      const depth = (Math.cos(angle) - 1) * 430 - outsideArc * 85;
      const lift = (Math.cos(angle) - 1) * 38;
      element.style.transform = `translate3d(calc(${horizontal} * var(--reel-step)), ${lift}px, ${depth}px) rotateY(${-angle}rad)`;
      element.style.opacity = String(.55 + .45 * Math.cos(angle) ** 2);
      element.style.zIndex = String(projects.length - Math.round(Math.abs(distance) * 2));
      element.dataset.front = String(index === Math.round(value));
    });
  }

  useLayoutEffect(() => {
    paintReel(position);
  }, [position]);

  function goToFrame(index: number) {
    paintReel(index);
    setPosition(index);
    const trigger = scrollTrigger.current;
    if (trigger?.isActive) trigger.scroll(trigger.start + (trigger.end - trigger.start) * index / (projects.length - 1));
  }

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const track = { position: 0 };
      const motion = gsap.to(track, {
        position: projects.length - 1,
        ease: 'none',
        onUpdate: () => { if (!mouseDrag.current?.moved) paintReel(track.position); },
        scrollTrigger: {
          trigger: reel.current,
          start: 'top 100px',
          end: () => '+=' + Math.round(window.innerHeight * 2.6),
          pin: true,
          scrub: .85,
          invalidateOnRefresh: true,
        },
      });
      scrollTrigger.current = motion.scrollTrigger ?? null;
      return () => { scrollTrigger.current = null; };
    });
    return () => media.revert();
  }, []);
  const swipeStart = useRef<{ x: number; y: number; position: number } | null>(null);

  function moveFrame(direction: number) {
    goToFrame(Math.max(0, Math.min(projects.length - 1, Math.round(visualPosition.current) + direction)));
    setSelected(null);
    setDemoOpen(false);
  }
  const pointerSelection = useRef(false);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [selected, demoOpen]);

  useLayoutEffect(() => {
    if (!selected || !pointerSelection.current || !preview.current) return;
    const media = gsap.matchMedia(preview);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(preview.current, { opacity: .35, scale: .94, duration: .28, ease: 'power4.out' });
    });
    return () => media.revert();
  }, [selected]);

  useEffect(() => {
    if (demoOpen) demo.current?.focus();
  }, [demoOpen]);

  return (
    <section id="projects" className="project-explorer">
      <header className="explorer-heading">
        <h2>Projects</h2>
        <p className="reel-hint"><span className="reel-hint-scroll">Scroll or drag to explore</span><span className="reel-hint-swipe">Swipe to explore ↔</span></p>
      </header>

      <div ref={reel} className="explorer-layout perspective-reel" data-dragging={dragging} aria-label="Project reel"
        onPointerDown={event => {
          if (event.pointerType !== 'mouse' || event.button !== 0 || selected) return;
          suppressClick.current = false;
          mouseDrag.current = { id: event.pointerId, x: event.clientX, position: visualPosition.current, moved: false };
        }}
        onPointerMove={event => {
          const drag = mouseDrag.current;
          if (!drag || drag.id !== event.pointerId || !(event.buttons & 1)) return;
          const dx = drag.x - event.clientX;
          if (!drag.moved && Math.abs(dx) < 6) return;
          if (!drag.moved) {
            drag.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }
          const next = gsap.utils.clamp(0, projects.length - 1, drag.position + dx / (event.currentTarget.clientWidth * .42));
          paintReel(next);
          const trigger = scrollTrigger.current;
          if (trigger?.isActive) trigger.scroll(trigger.start + (trigger.end - trigger.start) * next / (projects.length - 1));
        }}
        onPointerUp={() => {
          suppressClick.current = mouseDrag.current?.moved ?? false;
          mouseDrag.current = null;
          setDragging(false);
          if (suppressClick.current) scrollTrigger.current?.getTween()?.progress(1);
        }}
        onPointerCancel={() => {
          mouseDrag.current = null;
          setDragging(false);
        }}
        onDragStart={event => event.preventDefault()}
        onKeyDown={event => {
          if (event.target !== event.currentTarget && !(event.target instanceof HTMLElement && event.target.classList.contains('explorer-row'))) return;
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          const direction = event.key === 'ArrowRight' ? 1 : -1;
          const next = Math.max(0, Math.min(projects.length - 1, Math.round(visualPosition.current) + direction));
          moveFrame(direction);
          document.getElementById('select-' + projects[next].id)?.focus({ preventScroll: true });
        }}
        onTouchStart={event => {
          const touch = event.touches[0];
          swipeStart.current = touch ? { x: touch.clientX, y: touch.clientY, position } : null;
        }}
        onTouchMove={event => {
          const start = swipeStart.current;
          const touch = event.touches[0];
          if (!start || !touch || scrollTrigger.current || selected) return;
          const dx = start.x - touch.clientX;
          if (Math.abs(dx) > Math.abs(start.y - touch.clientY)) {
            setDragging(true);
            setPosition(gsap.utils.clamp(0, projects.length - 1, start.position + dx / (window.innerWidth * .75)));
          }
        }}
        onTouchCancel={() => {
          setDragging(false);
          if (swipeStart.current && !scrollTrigger.current) setPosition(Math.round(position));
          swipeStart.current = null;
        }}
        onTouchEnd={event => {
          setDragging(false);
          if (selected) { swipeStart.current = null; return; }
          const start = swipeStart.current;
          const end = event.changedTouches[0];
          swipeStart.current = null;
          if (start && end && Math.abs(end.clientX - start.x) > Math.max(45, Math.abs(end.clientY - start.y))) {
            if (scrollTrigger.current) {
              moveFrame(end.clientX < start.x ? 1 : -1);
            } else {
              const delta = end.clientX < start.x ? 1 : -1;
              goToFrame(gsap.utils.clamp(0, projects.length - 1, Math.round(start.position) + delta));
            }
          } else if (start && !scrollTrigger.current) {
            setPosition(Math.round(start.position));
          }
        }}>
        {projects.map((project, index) => {
          const active = selected === project.id;
          const panelId = 'preview-' + project.id;
          const evidence = projectEvidence[project.id];
          const cover = project.id === 'artemis' ? '/showcase/artemis.png' : '/case-studies/' + project.id + '.png';
          return (
            <div className="explorer-entry" key={project.id}>
              <button type="button" className="explorer-row"
                id={'select-' + project.id} aria-expanded={active}
                onFocus={event => {
                  if (event.currentTarget.matches(':focus-visible') && index !== Math.round(visualPosition.current)) {
                    goToFrame(index);
                    setSelected(null);
                    setDemoOpen(false);
                  }
                }} aria-controls={panelId}
                onClick={event => {
                  if (event.detail > 0 && suppressClick.current) return;
                  pointerSelection.current = event.detail > 0;
                  goToFrame(index);
                  setSelected(active ? null : project.id);
                  setDemoOpen(false);
                }}>
                <span className="explorer-thumbnail" aria-hidden="true" style={evidence ? { backgroundImage: `url(${cover})` } : undefined}>
                  {evidence ? <img src={cover} alt="" loading="lazy" decoding="async" />
                    : <span className="platform-thumbnail">{workflows[project.id].map(step => <span key={step}>{step}</span>)}</span>}
                </span>
                <span className="explorer-number">{String(index + 1).padStart(2, '0')}</span>
                <span><strong>{project.title}</strong><small>{disciplines[project.id]}</small></span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
              <article ref={active ? preview : undefined} className="explorer-preview" id={panelId} hidden={!active} aria-labelledby={'select-' + project.id}>
                {active && <>
                  <button type="button" className="reel-close" aria-label="Close project details" onClick={() => {
                    setSelected(null);
                    setDemoOpen(false);
                    document.getElementById('select-' + project.id)?.focus({ preventScroll: true });
                  }}>×</button>
                  <div className="explorer-media">
                    {evidence ? (
                      <img src={'/case-studies/' + project.id + '.png'} alt={evidence} decoding="async" />
                    ) : (
                      <ol className="explorer-workflow" aria-label="Project workflow">
                        {workflows[project.id].map(step => <li key={step}>{step}</li>)}
                      </ol>
                    )}
                  </div>
                  <div className="explorer-description">
                    <p>{project.description}</p>
                    <p className="explorer-tools">{project.techStack.join(' · ')}</p>
                    <div className="explorer-actions">
                      <a href={'#work/' + project.id}>Read case study <ArrowUpRight size={16} aria-hidden="true" /></a>
                      <a href={project.githubLink}>GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
                      {project.hasInteractiveDemo !== false && (
                        <button type="button" id={'btn-proj-simulate-' + project.id} aria-expanded={demoOpen}
                          aria-controls="project-demo" onClick={() => setDemoOpen(open => !open)}>
                          {demoOpen ? 'Close demo' : 'Open demo'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div id="project-demo" ref={demo} tabIndex={-1} role="region" aria-label="Project demo" hidden={!demoOpen}>
                    {demoOpen && selected && (
                      <Suspense fallback={<p role="status">Loading demonstration…</p>}>
                        <ProjectDemo key={selected} projectId={selected} />
                      </Suspense>
                    )}
                  </div>
                </>}
              </article>
            </div>
          );
        })}
      </div>

    </section>
  );
}
