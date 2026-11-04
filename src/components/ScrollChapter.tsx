import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollChapter({ children }: { children: ReactNode }) {
  const chapter = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia(chapter);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.chapter-marker', { scaleX: 0 }, {
        scaleX: 1,
        duration: .55,
        ease: 'power3.out',
        scrollTrigger: { trigger: chapter.current, start: 'top 84%', once: true },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <div className="scroll-chapter" ref={chapter}>
      <div className="chapter-marker" aria-hidden="true" />
      <div className="chapter-content">{children}</div>
    </div>
  );
}
