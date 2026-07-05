import React, { useMemo } from 'react';

export default function SpaceBackground() {
  const starsCount = 80;
  
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < starsCount; i++) {
      const sizeNum = Math.random();
      let size = '1.5px';
      if (sizeNum > 0.85) size = '3.8px';
      else if (sizeNum > 0.55) size = '2.6px';

      const colorNum = Math.random();
      let colorClass = 'bg-neutral-700 dark:bg-white';
      if (colorNum > 0.9) {
        colorClass = 'bg-indigo-900/80 dark:bg-sky-200';
      } else if (colorNum > 0.8) {
        colorClass = 'bg-amber-800/80 dark:bg-amber-100';
      }

      list.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size,
        colorClass,
        opacity: Math.random() * 0.4 + 0.15,
        delay: `${Math.random() * -20}s`, // Negative delay so they are pre-warmed and immediately visible
        duration: `${Math.random() * 40 + 50}s`, // Very slow, elegant space glide
        pulseDuration: `${Math.random() * 6 + 4}s`,
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-neutral-50 dark:bg-black transition-colors duration-300">
      {/* Hardware-accelerated keyframe animation overrides for drifting space */}
      <style>{`
        @keyframes spaceDrift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(20px, -40px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.85; }
        }
        .space-star {
          animation: spaceDrift var(--drift-dur) ease-in-out infinite, twinkle var(--twinkle-dur) ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Soft, deep ambient space nebulae gas glows */}
      <div className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-indigo-100/40 dark:bg-neutral-900/10 blur-[130px] transition-colors duration-300" />
      <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-100/35 dark:bg-neutral-900/15 blur-[160px] transition-colors duration-300" />
      <div className="absolute top-[60%] left-[50%] w-[35vw] h-[35vw] rounded-full bg-cyan-100/25 dark:bg-neutral-900/5 blur-[100px] transition-colors duration-300" />

      {/* Render stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.colorClass} space-star transition-colors duration-300`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            '--drift-dur': star.duration,
            '--twinkle-dur': star.pulseDuration,
            animationDelay: `${star.delay}, ${Math.random() * -5}s`,
          } as any}
        />
      ))}
    </div>
  );
}
