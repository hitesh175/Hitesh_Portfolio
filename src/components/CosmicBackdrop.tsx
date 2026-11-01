import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
export default function CosmicBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (reduced || paused) { ref.current?.pause(); return; }
    const video = ref.current!;
    let dispose = () => {};
    let cancelled = false;
    const source = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
    const play = () => { if (!document.hidden) video.play().catch(() => {}); };
    import('hls.js/light').then(({default: Hls}) => {
      if (cancelled) return;
      if (!Hls.isSupported()) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = source; play(); }
        return;
      }
      const player = new Hls({capLevelToPlayerSize:true, maxBufferLength:10});
      player.loadSource(source); player.attachMedia(video);
      player.on(Hls.Events.MANIFEST_PARSED, play);
      dispose = () => player.destroy();
    });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !document.hidden) play(); else video.pause(); });
    observer.observe(video);
    const visibility = () => { if (document.hidden) video.pause(); else if (video.getBoundingClientRect().bottom > 0) play(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelled = true; video.pause(); dispose(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [reduced, paused]);
  return <>
    <div className="cosmic-backdrop" aria-hidden="true"><img src="/images/cosmic-poster.jpg" alt="" fetchPriority="high"/><video ref={ref} muted loop playsInline preload="none" onPlaying={() => setReady(true)} className={ready ? 'is-playing' : ''}/></div>
    {!reduced && <button className="cosmic-motion-control" aria-label={paused ? 'Play background animation' : 'Pause background animation'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Play motion' : 'Pause motion'}</span></button>}
  </>;
}
