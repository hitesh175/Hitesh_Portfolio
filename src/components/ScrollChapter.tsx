import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

export default function ScrollChapter({ children, direction = 1 }: {
  children: React.ReactNode;
  direction?: number;
}) {
  const chapter = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: chapter, offset: ['start end', 'start 45%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 28 });
  const y = useTransform(progress, [0, 1], [24, 0]);
  const opacity = useTransform(progress, [0, 1], [.84, 1]);
  const rule = useTransform(progress, [0, 1], [0, 1]);
  const sweep = useTransform(progress, [0, 1], direction > 0 ? ['-45%', '45%'] : ['45%', '-45%']);

  return (
    <div className="scroll-chapter" ref={chapter}>
      {!reducedMotion && (
        <motion.div aria-hidden="true" className="chapter-rule" style={{ scaleX: rule, transformOrigin: direction > 0 ? 'left' : 'right' }}>
          <motion.div className="chapter-sweep" style={{ x: sweep }} />
        </motion.div>
      )}
      <motion.div className="chapter-content" style={reducedMotion ? undefined : { y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
