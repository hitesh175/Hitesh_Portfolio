import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import Modal from './Modal';
import { personalInfo } from '../data';
export default function CVModal({isOpen,onClose}: {isOpen:boolean;onClose:()=>void}) {
  if (!isOpen) return null;
  return <Modal label="Curriculum vitae" onClose={onClose}>
    <div className="fixed inset-0 bg-black/70 p-0 sm:p-4 flex justify-center items-center" onClick={onClose}>
      <section className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white w-full max-w-5xl h-full sm:h-[92vh] flex flex-col" onClick={e=>e.stopPropagation()}>
        <header className="flex flex-wrap items-center gap-2 p-3 border-b border-neutral-300 dark:border-neutral-700">
          <h2 className="min-w-0 flex-1 text-base font-bold">Curriculum vitae</h2>
          <a className="inline-flex items-center gap-2 px-3 py-2 underline" href={personalInfo.resumeUrl} download="Hitesh_Kanagala_CV.pdf"><Download size={18}/> <span className="hidden sm:inline">Download PDF</span><span className="sr-only sm:hidden">Download PDF</span></a>
          <button data-autofocus className="p-3" onClick={onClose} aria-label="Close CV"><X size={20}/></button>
        </header>
        <p className="px-4 py-3 text-sm">Preview and download use the same CV. <a className="underline inline-flex gap-1 items-center" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Open PDF in a new tab <ExternalLink size={14}/></a></p>
        <object data={personalInfo.resumeUrl} type="application/pdf" aria-label="Hitesh Kanagala CV" className="flex-1 w-full min-h-0 bg-neutral-100">
          <p className="p-6">Your browser cannot display this PDF. <a className="underline" href={personalInfo.resumeUrl}>Open the CV</a> to read, print or save it.</p>
        </object>
      </section>
    </div>
  </Modal>;
}
