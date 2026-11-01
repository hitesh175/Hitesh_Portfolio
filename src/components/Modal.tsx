import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** Native modality provides focus containment, Escape and an inert background. */
export default function Modal({ label, onClose, children }: {
  label: string; onClose: () => void; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    (dialog.querySelector('[data-autofocus], button') as HTMLElement | null)?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog ref={ref} aria-label={label} className="portfolio-dialog"
      onCancel={event => { event.preventDefault(); closeRef.current(); }}>
      {children}
    </dialog>, document.body,
  );
}
