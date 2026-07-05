/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { services } from '../data';
import { Brain, BarChart3, LayoutDashboard, Cpu } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Brain: Brain,
  BarChart3: BarChart3,
  LayoutDashboard: LayoutDashboard,
  Cpu: Cpu
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            Specialized Problem Solving
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Professional Services
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/10 text-left"
              >
                <div className="space-y-4 text-left">
                  {/* Icon with sleek tech frame */}
                  <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-center transition-colors group-hover:border-neutral-400 dark:group-hover:border-neutral-700">
                    {IconComponent && <IconComponent className="w-5 h-5 text-neutral-800 dark:text-white" />}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-display font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                </div>
                
                {/* Visual Accent */}
                <div className="w-12 h-0.5 bg-neutral-200 dark:bg-neutral-900 mt-6 group-hover:bg-neutral-950 dark:group-hover:bg-white transition-colors" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
