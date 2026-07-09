/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Download, Printer, ZoomIn, ZoomOut, FileText, 
  Mail, MapPin, Github, Linkedin, Calendar, GraduationCap, 
  Award, Briefcase, ChevronRight, CheckCircle2, ShieldCheck,
  BookOpen, ExternalLink, RefreshCw
} from 'lucide-react';
import { personalInfo, education, skills, projects, certifications, research } from '../data';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [downloading, setDownloading] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    if (zoom < 130) setZoom(prev => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 70) setZoom(prev => prev - 10);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
      setDownloading(false);
    }, 800);
  };

  const handlePrint = () => {
    // Elegant Print capability
    const printContent = document.getElementById('printable-resume-area');
    if (!printContent) return;
    
    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '', 'height=900,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Hitesh_Kanagala_Resume</title>');
      // Inject Tailwind CDN & simple print stylesheet for beautiful offline format
      printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      printWindow.document.write('<style>@media print { body { -webkit-print-color-adjust: exact; } }</style>');
      printWindow.document.write('</head><body class="bg-white p-8">');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      // Delay slightly to allow assets/styles to load before printing
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative bg-neutral-900 border border-neutral-800 w-full h-full sm:h-[92vh] max-w-5xl rounded-none sm:rounded-lg shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Top Toolbar: Replicates high-tech PDF Viewer interface */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-neutral-300 select-none">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-850 flex items-center justify-center text-rose-500">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white tracking-tight block truncate max-w-[200px] sm:max-w-none">
                    Hitesh_Kanagala_CV.pdf
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase block">
                    Interactive PDF Preview
                  </span>
                </div>
              </div>

              {/* PDF Viewer Zoom Controls (Visually stunning and fully functional) */}
              <div className="hidden md:flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                <button 
                  onClick={handleZoomOut}
                  disabled={zoom <= 70}
                  className="p-1 hover:bg-neutral-800 hover:text-white rounded disabled:opacity-40 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1 min-w-[36px] text-center font-bold">
                  {zoom}%
                </span>
                <button 
                  onClick={handleZoomIn}
                  disabled={zoom >= 130}
                  className="p-1 hover:bg-neutral-800 hover:text-white rounded disabled:opacity-40 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="p-2 hover:bg-neutral-850 hover:text-white border border-transparent hover:border-neutral-800 rounded transition-all text-neutral-400"
                  title="Print Resume"
                >
                  <Printer className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-3 py-1.5 bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white font-bold rounded text-xs transition-all flex items-center space-x-2 shadow-sm disabled:opacity-50"
                  title="Download PDF"
                >
                  {downloading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">Download</span>
                </button>

                <div className="w-px h-6 bg-neutral-800 mx-1 hidden sm:block" />

                <button
                  onClick={onClose}
                  className="p-2 bg-neutral-900 hover:bg-rose-950/40 hover:text-rose-400 border border-neutral-850 hover:border-rose-900/40 rounded-full transition-all text-neutral-400"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Workspace Area */}
            <div className="flex-1 overflow-y-auto bg-neutral-950 p-4 sm:p-8 flex justify-center items-start scrollbar-thin">
              <div 
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-200 ease-out w-full max-w-[800px] shadow-2xl"
              >
                {/* PDF Paper Sheet */}
                <div 
                  id="printable-resume-area"
                  className="bg-white text-neutral-900 p-8 sm:p-12 md:p-14 font-sans text-left leading-relaxed relative rounded-sm shadow-md border border-neutral-200 overflow-hidden"
                  style={{ minHeight: '1050px' }}
                >
                  {/* Watermark/Grid line in print/preview styles */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900" />

                  {/* HEADER SECTION */}
                  <div className="border-b border-neutral-300 pb-6 mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
                      {personalInfo.name}
                    </h1>
                    <p className="text-sm font-semibold tracking-wide text-neutral-500 uppercase mt-1">
                      {personalInfo.title}
                    </p>
                    
                    {/* Contact details */}
                    <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-[11px] font-mono text-neutral-600">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{personalInfo.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Github className="w-3.5 h-3.5 text-neutral-400" />
                        <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/hitesh175</a>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                        <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/hitesh-k-r</a>
                      </div>
                    </div>
                  </div>

                  {/* TWO-COLUMN RESUME STRUCTURE */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Left Column: Education, Technical Stack, Publication */}
                    <div className="md:col-span-5 space-y-6">
                      
                      {/* CAREER OBJECTIVE */}
                      <div className="space-y-2">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <Briefcase className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Objective
                        </h2>
                        <p className="text-[11.5px] leading-relaxed text-neutral-600">
                          {personalInfo.careerObjective}
                        </p>
                      </div>

                      {/* ACADEMIC PROFILE */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Education
                        </h2>
                        <div className="space-y-3">
                          {education.map((edu, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <div className="flex justify-between items-baseline">
                                <span className="text-[11.5px] font-bold text-neutral-900">{edu.institution}</span>
                                <span className="text-[10px] font-mono text-neutral-500">{edu.period}</span>
                              </div>
                              <p className="text-[11px] text-neutral-700 font-medium">
                                {edu.degree} &mdash; <span className="text-neutral-500 font-normal">{edu.field}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* TECHNICAL EXPERTISE */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Expertise
                        </h2>
                        <div className="space-y-2.5">
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Languages &amp; Core</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.languages.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Data Science</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.dataScience.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Machine Learning</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.machineLearning.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Visualization</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.visualization.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Databases</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.databases.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block tracking-wide">Tools</span>
                            <p className="text-[11px] text-neutral-700 mt-0.5">{skills.tools.slice(0, 4).join(', ')}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Experience/Projects & Research Publications & Certifications */}
                    <div className="md:col-span-7 space-y-6">
                      
                      {/* REPRESENTATIVE PROJECTS */}
                      <div className="space-y-3.5">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Selected Projects
                        </h2>
                        <div className="space-y-4">
                          {projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="space-y-1 text-[11px]">
                              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                                <span>{project.title}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {project.techStack.map((tech) => (
                                  <span key={tech} className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded border border-neutral-200">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <p className="text-neutral-600 leading-relaxed mt-1">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RESEARCH PUBLICATION */}
                      <div className="space-y-2">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Publications
                        </h2>
                        <div className="space-y-1 text-[11px]">
                          <span className="font-bold text-neutral-900 block leading-tight">{research.title}</span>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wide mt-0.5">// {research.journal}</span>
                          <p className="text-neutral-600 leading-relaxed mt-1">
                            {research.description}
                          </p>
                        </div>
                      </div>

                      {/* CERTIFICATIONS SUMMARY */}
                      <div className="space-y-2">
                        <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-900 uppercase border-b border-neutral-300 pb-1 flex items-center">
                          <Award className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                          Key Certifications
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
                          {certifications.slice(0, 6).map((cert, index) => (
                            <div key={index} className="flex items-start space-x-1">
                              <span className="text-neutral-400 mt-0.5 select-none">&bull;</span>
                              <div>
                                <span className="font-semibold text-neutral-850 block leading-tight">{cert.name}</span>
                                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">{cert.issuer}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Footnote stamp */}
                  <div className="mt-12 pt-4 border-t border-neutral-200 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                    <span>Generated from hitesh-kanagala.com</span>
                    <span>Hamburg, DE &bull; M.Sc. Data Science &amp; AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar of modal */}
            <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-850 flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <span>Press Esc or click backdrop to dismiss preview</span>
              <div className="flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={handleDownload}>
                <span>Open in external viewer</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
