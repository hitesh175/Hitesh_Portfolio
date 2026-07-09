/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { technicalExpertise } from '../data';
import { Cpu } from 'lucide-react';

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            Core Skill Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Technical Expertise
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Custom Minimal Glass Container */}
        <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-950 p-8 sm:p-10 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm relative overflow-hidden group">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Info panel */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="p-2.5 w-11 h-11 bg-neutral-100 dark:bg-neutral-900 text-neutral-850 dark:text-white rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                Skill Pipeline
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed font-mono">
                These represent my primary focus areas in machine learning, statistical computing, and analytical visualization.
              </p>
            </div>

            {/* Tags Grid */}
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2.5">
                {technicalExpertise.map((tech, index) => {
                  return (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02, type: 'spring' }}
                      whileHover={{ scale: 1.04 }}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-950 border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <span>{tech}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
