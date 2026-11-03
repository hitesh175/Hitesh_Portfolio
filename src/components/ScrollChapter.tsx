import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function ScrollChapter({ children, direction = 1 }: {
  children: React.ReactNode;
  direction?: number;
}) {
  const chapter = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: chapter, offset: ['start end', 'start 25%'] });
  const x = useTransform(scrollYProgress, [0, 1], [direction * 110, 0]);
  const rotation = useTransform(scrollYProgress, [0, 1], [direction * 9, 0]);
  const sweep = useTransform(scrollYProgress, [0, 1], [direction * -240, 0]);
  const depth = useTransform(scrollYProgress, [0, 1], [-95, 0]);
  const rule = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cut = useTransform(scrollYProgress, [0, 1], [
    direction > 0 ? 'polygon(18% 12%,100% 0%,100% 100%,0% 100%)' : 'polygon(0% 0%,82% 12%,100% 100%,0% 100%)',
    'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
  ]);

  return (
    <div className="scroll-chapter" ref={chapter}>
      <motion.div aria-hidden="true" className="chapter-orbit" style={reducedMotion ? undefined : { x: sweep, rotate: rotation }} />
      <motion.div aria-hidden="true" className="chapter-rule" style={reducedMotion ? undefined : { scaleX: rule, transformOrigin: direction > 0 ? "left" : "right" }} />
      <motion.div className="chapter-content" style={reducedMotion ? undefined : { x, z: depth, rotateY: rotation, clipPath: cut }}>
        {children}
      </motion.div>
    </div>
  );
}
