import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { workflows } from './CaseStudy';
import type { Project } from '../types';
import type React from 'react';

export default function WorkShowcase({ items, children }: {
  items: { project: Project; discipline: string }[];
  children: React.ReactNode;
}) {
  const section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY, scrollYProgress } = useScroll({ target: section, offset: ['start center', 'end center'] });

  useMotionValueEvent(scrollY, 'change', () => {
    const cards = section.current?.querySelectorAll('.project-tile');
    if (!cards) return;

    const readingLine = window.innerHeight * .48;
    const next = Array.from(cards as NodeListOf<Element>).reduce((current, card, index) => card.getBoundingClientRect().top <= readingLine ? index : current, 0);
    setActive(next);
  });

  const { project, discipline } = items[active];
  return (
    <div className="work-showcase" ref={section}>
      <div className="work-stage" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={project.id}
            className={`work-scene work-scene-${active + 1}`}
            initial={{ clipPath: 'inset(100% 0 0 0)', zIndex: 1 }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ scale: .92, opacity: .45, zIndex: 0 }}
            transition={{ duration: .72, ease: [.22, 1, .36, 1] }}
          >
            <motion.span className="work-scene-number" initial={{ y: 90 }} animate={{ y: 0 }} transition={{ duration: .78, ease: [.22, 1, .36, 1] }}>0{active + 1}</motion.span>
            <div className="work-scene-content">
              <p>{discipline}</p>
              <ol>
                {workflows[project.id].map((step, index) => (
                  <motion.li key={step} initial={{ x: 32, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .45, delay: .2 + index * .09 }}>
                    {index > 0 && <ArrowRight size={15} />}{step}
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div className="work-stage-progress" style={{ scaleX: scrollYProgress }} />
      </div>
      {children}
    </div>
  );
}
