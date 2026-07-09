/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { research } from '../data';
import { BookOpen, Award, Share2, Check, ExternalLink } from 'lucide-react';

export default function Research() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="research"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
            Scholarly Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Research Publication
          </h2>
          <div className="w-12 h-0.5 bg-neutral-950 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Highlight publication card */}
        <div className="max-w-4xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="bg-neutral-100 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-900 p-8 sm:p-10 shadow-sm relative overflow-hidden group hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              
              {/* Publication Badge Circle */}
              <div className="p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 shadow-inner">
                <BookOpen className="w-8 h-8" />
              </div>

              {/* Research Text */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-wrap gap-2.5 justify-center md:justify-start items-center">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white dark:bg-neutral-900 text-[10px] font-mono font-medium text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded">
                    <Award className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>Published Paper</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    // {research.journal}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-750 dark:group-hover:text-neutral-300 transition-colors uppercase tracking-tight">
                  {research.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                  {research.description}
                </p>

                {/* Additional contextual information */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">// Focus Fields</h4>
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-350 mt-1">Spatial Human-Computer Interaction (HCI)</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">// Core Technology</h4>
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-350 mt-1">Augmented Reality & Holographic Projections</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  {research.paperUrl && (
                    <a
                      id="btn-research-preview"
                      href={research.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-semibold text-xs rounded transition-all cursor-pointer shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white dark:text-black" />
                      <span>Read Publication</span>
                    </a>
                  )}
                  <button
                    id="btn-research-share"
                    onClick={handleShare}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 text-neutral-900 dark:text-white font-semibold text-xs rounded border border-neutral-200 dark:border-neutral-800 transition-all cursor-pointer shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                        <span>Share Publication</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
