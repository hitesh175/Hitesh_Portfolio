import { useEffect, useRef } from 'react';

export default function PortfolioCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cursor.current;
    const root = element?.closest('.cosmic-portfolio');
    if (!element || !root) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
    const hide = () => {
      root.classList.remove('has-portfolio-cursor');
      delete element.dataset.pressed;
    };
    const move = (event: PointerEvent) => {
      const target = event.target;
      if (!media.matches || event.pointerType !== 'mouse' || !(target instanceof Element) ||
          !root.contains(target) || target.closest('input, textarea, select, [contenteditable], dialog, iframe, video')) {
        hide();
        return;
      }
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      element.dataset.mode = target.closest('.explorer-row') ? 'project'
        : target.closest('a[href], button:not(:disabled), summary, [role="button"]') ? 'action' : 'point';
      root.classList.add('has-portfolio-cursor');
    };
    const press = (event: PointerEvent) => {
      if (event.button === 0 && root.classList.contains('has-portfolio-cursor')) element.dataset.pressed = '';
    };
    const release = () => { delete element.dataset.pressed; };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', hide);
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    media.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      media.removeEventListener('change', hide);
    };
  }, []);

  return <div ref={cursor} className="portfolio-cursor" aria-hidden="true">
    <span className="portfolio-cursor-mark"><span>↗</span></span>
  </div>;
}
