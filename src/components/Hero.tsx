import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { personalInfo } from '../data';
import CosmicBackdrop from './CosmicBackdrop';
export default function Hero({ onContactClick, onViewCVClick }: {onContactClick:()=>void;onViewCVClick:()=>void}) {
  return <section id="home" className="cosmic-hero">
    <CosmicBackdrop/>
    <motion.div className="cosmic-intro" initial={false} animate={{opacity:1}}>
      <h1>Hitesh Kanagala<br/><em>Rajendra Prasad.</em></h1>
      <p className="cosmic-role">Data, intelligence <span>&</span> the things I build.</p>
      <p className="cosmic-description">{personalInfo.title}<br/>{personalInfo.location}</p>
      <div className="cosmic-actions">
        <a href="#projects" className="cosmic-button cosmic-button-primary">Explore my work <ArrowDownRight size={17}/></a>
        <button id="hero-btn-contact" onClick={onContactClick} className="cosmic-button cosmic-button-outline">Let's talk <ArrowUpRight size={17}/></button>
        <button id="hero-btn-view-cv" onClick={onViewCVClick} className="cosmic-cv"><FileText size={16}/>View CV</button>
      </div>
      <p className="cosmic-availability"><span aria-hidden="true"/>{personalInfo.status}</p>
    </motion.div>
    <div className="cosmic-hero-footer"><span>Applied data science & AI</span><a href="#projects">Scroll to discover <ArrowDownRight size={16}/></a><span>Hamburg, DE</span></div>
  </section>;
}
