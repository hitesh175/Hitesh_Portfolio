/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import SpaceBackground from './components/SpaceBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Expertise from './components/Expertise';
import Services from './components/Services';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Education from './components/Education';
import Research from './components/Research';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/cvmodal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
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
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
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
      behavior: 'smooth'
    });
  };

  // Set up smooth scrolling with high-fidelity offset
  const handleNavClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
          if (id === 'certifications' || id === 'research') {
            setActiveTab('academic');
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
  }, []);

  return (
    <div className="min-h-screen relative text-neutral-800 bg-white dark:text-neutral-100 dark:bg-black selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white overflow-x-hidden font-sans scroll-smooth transition-colors duration-300">
      {/* Thin animated scroll progress bar at the top of the screen */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900 dark:bg-white origin-left z-[100] shadow-[0_1px_6px_rgba(0,0,0,0.15)] dark:shadow-[0_1px_6px_rgba(255,255,255,0.4)]"
        style={{ scaleX }}
      />

      {/* Moving space stars background */}
      <SpaceBackground />

      {/* Sticky Top Navbar */}
      <Navbar activeTab={activeTab} onNavClick={handleNavClick} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Single-Page Scroller */}
      <main className="relative z-10 space-y-24 pt-16">
        
        {/* 1. Home / Hero section */}
        <Hero onContactClick={() => handleNavClick('contact')} onViewCVClick={() => setIsCVModalOpen(true)} />

        {/* 2. About me & Services flow */}
        <section id="about" className="scroll-mt-24 space-y-12">
          <About onViewCVClick={() => setIsCVModalOpen(true)} />
          <Services />
        </section>

        {/* 3. Academic flow: Education */}
        <section id="academic" className="scroll-mt-24 space-y-16">
          <Education />
        </section>

        {/* 4. Skills & Expertise stack */}
        <section id="skills" className="scroll-mt-24 space-y-12">
          <Skills />
          <Expertise />
        </section>

        {/* 5. Certifications */}
        <section id="certifications" className="scroll-mt-24">
          <Certificates />
        </section>

        {/* 6. Work / Projects section */}
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        {/* 7. Research publication below Projects */}
        <section id="research" className="scroll-mt-24">
          <Research />
        </section>

        {/* 6. Blog Insights */}
        <section id="blog" className="scroll-mt-24">
          <Blog />
        </section>

        {/* 7. Get in touch / Contact */}
        <section id="contact" className="scroll-mt-24 pb-12">
          <Contact />
        </section>
        
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
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
