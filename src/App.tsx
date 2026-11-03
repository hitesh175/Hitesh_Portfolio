/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion, MotionConfig } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import CaseStudy from './components/CaseStudy';
import { projects } from './data';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';


import Projects from './components/Projects';
import ScrollChapter from './components/ScrollChapter';
import Blog from './components/Blog';
import Education from './components/Education';
import Research from './components/Research';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const reducedMotion = useReducedMotion();
  const [hash, setHash] = useState(() => location.hash);
  const caseStudy = projects.find(project => hash === `#work/${project.id}`);

  useEffect(() => {
    const syncHash = () => setHash(location.hash);
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, []);

  useEffect(() => {
    if (caseStudy) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [caseStudy]);

  const [activeTab, setActiveTab] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync theme selection to document element and persistent local storage
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      try { localStorage.setItem('theme', 'light'); } catch {}
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Set up dynamic scroll checks to trigger scroll-to-top visibility past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('home');
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        // Show after scrolling past the Hero section minus header height
        setShowScrollTop(window.scrollY > heroHeight - 80);
      } else {
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top of viewport
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'instant' : 'smooth'
    });
  };

  // Set up smooth scrolling with high-fidelity offset
  const handleNavClick = (id: string) => {
    if (caseStudy) { location.hash = id; return; }
    setActiveTab(id);
    history.pushState(null, '', '#' + id);
    const element = document.getElementById(id);
    if (element) {
      element.tabIndex = -1;
      element.focus({ preventScroll: true });
      const offset = 80; // height of floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'instant' : 'smooth'
      });
    }
  };

  useEffect(() => {
    const sync = () => {
      const id = location.hash.slice(1);
      if (!id || id.startsWith('article-')) return;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
    };
    sync(); window.addEventListener('popstate', sync); window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);

  // Set up intersection observer to dynamically highlight the active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'academic', 'skills', 'certifications', 'projects', 'research', 'blog', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // targets the sweet spot of viewport focus
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (['academic', 'skills', 'certifications'].includes(id)) {
            setActiveTab('about');
          } else if (id === 'research' || id === 'blog') {
            setActiveTab('research-writing');
          } else {
            setActiveTab(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [caseStudy]);

  return (
    <MotionConfig reducedMotion="user"><div className="cosmic-portfolio min-h-screen relative text-neutral-800 bg-white dark:text-neutral-100 dark:bg-black selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white overflow-x-hidden font-sans scroll-smooth transition-colors duration-300">
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Thin animated scroll progress bar at the top of the screen */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900 dark:bg-white origin-left z-[100] shadow-[0_1px_6px_rgba(0,0,0,0.15)] dark:shadow-[0_1px_6px_rgba(255,255,255,0.4)]"
        style={{ scaleX }}
      />

      {/* Sticky Top Navbar */}
      <Navbar activeTab={activeTab} onNavClick={handleNavClick} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Single-Page Scroller */}
      <main id="main-content" tabIndex={-1} className="relative z-10 space-y-8">

        {caseStudy ? <CaseStudy project={caseStudy} /> : <>
        <Hero />
        <section className="scroll-mt-24">
          <Projects />
        </section>



        <div className="portfolio-chapter">
          <ScrollChapter><About /></ScrollChapter>
          <ScrollChapter direction={-1}><section id="academic" className="scroll-mt-24"><Education /></section></ScrollChapter>
          <ScrollChapter><Skills /></ScrollChapter>
          <ScrollChapter direction={-1}><section id="certifications" className="scroll-mt-24"><Certificates /></section></ScrollChapter>
        </div>

        <section id="research-writing" className="portfolio-chapter scroll-mt-24" aria-labelledby="research-writing-title">
          <h2 id="research-writing-title" className="chapter-title">Research &amp; writing</h2>
          <ScrollChapter><Research /></ScrollChapter>
          <ScrollChapter direction={-1}><Blog /></ScrollChapter>
        </section>

        {/* 7. Get in touch / Contact */}
        <section className="scroll-mt-24 pb-12">
          <ScrollChapter><Contact /></ScrollChapter>
        </section>

        </>}
      </main>

      {/* Symmetrical Footer */}
      <Footer />

      {/* Scroll to Top floating action button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="btn-scroll-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-850 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Embedded PDF Resume Modal */}
    </div></MotionConfig>
  );
}
