import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data';

gsap.registerPlugin(ScrollTrigger);

const contours = Array.from({ length: 29 }, (_, index) => {
  const y = 104 + index * 16;
  return `M -120 ${y + 90} C 112 ${y - 182} 293 ${y + 155} 500 ${y + 45} S 743 ${y - 148} 1010 ${y + 30}`;
});

export default function Hero() {
  const opening = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia(opening);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.signal-art', { opacity: 0, scale: 1.05, duration: 1.05 }, 0)
        .from('.opening-line > span', { yPercent: 104, duration: .86, stagger: .075 }, .09)
        .from('.opening-details', { opacity: 0, y: 12, duration: .52 }, .34);
      gsap.to('.signal-art svg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: opening.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={opening} id="home" className="portfolio-hero portfolio-opening">
      <div className="signal-art" aria-hidden="true">
        <svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <linearGradient id="signal-ink" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop className="signal-neutral" stopColor="#ffffff" stopOpacity=".12" />
              <stop offset=".58" stopColor="#c7ff00" stopOpacity=".52" />
              <stop className="signal-neutral" offset="1" stopColor="#ffffff" stopOpacity=".24" />
            </linearGradient>
          </defs>
          <g stroke="url(#signal-ink)" strokeWidth="1">
            {contours.map(path => <path key={path} d={path} />)}
          </g>
        </svg>
      </div>
      <div className="hero-copy">
        <p className="hero-name">{personalInfo.name}</p>
        <h1><span className="opening-line"><span>Data Analytics &amp;</span></span>{' '}
          <span className="opening-line"><span>Business Intelligence</span></span></h1>
      </div>
      <div className="opening-details">
        <p>I use SQL, Python, and Power BI to clean data, build dashboards, and develop predictive models.</p>
        <p>M.Sc. Applied Data Science &amp; AI<br />SRH University Hamburg</p>
        <p className="hero-availability">{personalInfo.status}</p>
        <div className="hero-actions">
          <a className="hero-resume-link" href="#projects">Explore projects ↓</a>
          <a className="hero-resume-link" href="#resumes-heading">View résumés ↗</a>
        </div>
      </div>
    </section>
  );
}
