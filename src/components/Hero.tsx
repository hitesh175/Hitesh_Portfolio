import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { personalInfo } from '../data';
import CosmicBackdrop from './CosmicBackdrop';
export default function Hero({ onContactClick, onViewCVClick }: {onContactClick:()=>void;onViewCVClick:()=>void}) {
  const hero = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '34%']);
  const introY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85], [1, 1, 0.16]);

  return <section ref={hero} id="home" className="cosmic-hero">
    <motion.div className="hero-scroll-layer" style={reducedMotion ? undefined : { y: backdropY }} aria-hidden="true">
      <CosmicBackdrop/>
    </motion.div>
    <motion.div className="cosmic-intro" style={reducedMotion ? undefined : { y: introY, opacity: introOpacity }}>
      <motion.h1
        initial={reducedMotion ? false : { clipPath: 'inset(0 0 75% 0)', y: 24 }}
        animate={{ clipPath: 'inset(0%)', y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >Hitesh Kanagala<br/><em>Rajendra Prasad.</em></motion.h1>
      <p className="cosmic-role">Applied Data Science & AI</p>
      <p className="cosmic-summary">I build AI tools, data pipelines, predictive models, and dashboards.</p>
      <p className="cosmic-description">{personalInfo.title}<br/>{personalInfo.location}</p>
      <div className="cosmic-actions">
        <a href="#projects" className="cosmic-button cosmic-button-primary">Explore my work <ArrowDownRight size={17}/></a>
        <button id="hero-btn-contact" onClick={onContactClick} className="cosmic-button cosmic-button-outline">Let's talk <ArrowUpRight size={17}/></button>
        <a className="cosmic-cv" href="/Hitesh_Kanagala_CV.pdf">Download PDF</a>
        <button id="hero-btn-view-cv" onClick={onViewCVClick} className="cosmic-cv"><FileText size={16}/>View CV</button>
      </div>
      <p className="cosmic-availability"><span aria-hidden="true"/>{personalInfo.status}</p>
    </motion.div>
  </section>;
}
