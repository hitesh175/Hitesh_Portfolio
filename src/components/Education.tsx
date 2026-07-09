/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { education } from '../data';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section
      id="education"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            My Educational Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Education History
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Technical timeline layout */}
        <div className="max-w-3xl mx-auto relative border-l border-neutral-200 dark:border-neutral-900 pl-8 space-y-12">
          {education.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline bubble bullet marker */}
                <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-white text-neutral-900 dark:bg-black dark:text-white flex items-center justify-center border border-neutral-200 dark:border-neutral-900 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-neutral-800 dark:text-white" />
                </div>

                {/* Box container */}
                <div className="bg-neutral-50 dark:bg-neutral-950 p-6 sm:p-8 rounded border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 hover:scale-[1.01] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 text-left">
                    <div>
                      <span className="inline-flex items-center px-3 py-1 bg-neutral-200 dark:bg-neutral-900 text-[10px] font-mono font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 rounded">
                        {item.degree}
                      </span>
                      <h3 className="text-base sm:text-lg font-display font-bold text-neutral-900 dark:text-white mt-3 uppercase tracking-tight">
                        {item.field}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-450">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-450" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-neutral-600 dark:text-neutral-400 text-left">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{item.institution}</span>
                    <span className="text-neutral-400 dark:text-neutral-750 hidden sm:inline">•</span>
                    <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-450">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{index === 0 ? "Hamburg, Germany" : "Bengaluru, India"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
