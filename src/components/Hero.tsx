import { createPortal } from 'react-dom';
import { workflows } from './CaseStudy';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { personalInfo, projects } from '../data';
export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const previewTurn = useTransform(scrollYProgress, [0, .55], [-12, 0]);
  const previewShift = useTransform(scrollYProgress, [0, .55], [16, 0]);
  return <section ref={hero} id="home" className="portfolio-hero">
    {!reducedMotion && createPortal(<div className="hkr-intro" aria-hidden="true"><svg className="monogram" viewBox="0 0 220 85"><path pathLength="1" d="M12 12v61 M12 42h46 M58 12v61"/><path pathLength="1" d="M82 12v61 M130 12 82 49 M101 35l30 38"/><path pathLength="1" d="M154 73V12h32l17 9v14l-17 10h-32 M179 45l26 28"/></svg></div>, document.body)}
    <div className="hero-split">
    <div className="hero-copy">
      <p>{personalInfo.name}</p>
      <h1>Applied Data Science &amp; AI</h1>
      <p>I build AI tools, data pipelines, predictive models, and dashboards.</p>
      <p>Master’s student · {personalInfo.location}</p>
      <p className="hero-availability">{personalInfo.status}</p>
      <a className="hero-projects-link" href="#projects">Explore projects ↓</a>
    </div>
    <div className="hero-previews" aria-label="Project previews">
      {['artemis', 'aircraft-analytics', 'retail-bi-dashboard'].map(id => {
        const project = projects.find(item => item.id === id)!;
        return <motion.article key={id} className="hero-preview" style={reducedMotion ? undefined : { rotateY: previewTurn, x: previewShift }}>
          <h2>{project.title}</h2>
          <ul className="hero-workflow">{workflows[id].map(step => <li key={step}>{step}</li>)}</ul>
          <details><summary>See how it works</summary><p>{project.description}</p>
            <a href={`#work/${id}`}>Read case study</a> · <a href={project.githubLink.replace(/\.git$/, "")}>GitHub</a>
          </details>
        </motion.article>;
      })}
    </div>
    </div>
  </section>;
}
