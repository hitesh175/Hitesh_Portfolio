/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { skills } from '../data';
import { Code, Database, Brain, BarChart, HardDrive, Wrench, Sparkles } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'soft'>('all');

  const categories = [
    {
      key: 'languages',
      label: ' Programming',
      icon: Code,
      items: skills.languages,
      type: 'technical'
    },
    {
      key: 'dataScience',
      label: ' Data Science',
      icon: Database,
      items: skills.dataScience,
      type: 'technical'
    },
    {
      key: 'machineLearning',
      label: ' Machine Learning',
      icon: Brain,
      items: skills.machineLearning,
      type: 'technical'
    },
    {
      key: 'visualization',
      label: ' Visualization',
      icon: BarChart,
      items: skills.visualization,
      type: 'technical'
    },
    {
      key: 'databases',
      label: ' Databases',
      icon: HardDrive,
      items: skills.databases,
      type: 'technical'
    },
    {
      key: 'tools',
      label: ' Tools & Platforms',
      icon: Wrench,
      items: skills.tools,
      type: 'technical'
    },
    {
      key: 'softSkills',
      label: ' Interpersonal',
      icon: Sparkles,
      items: skills.softSkills,
      type: 'soft'
    }
  ];

  const filteredCategories = categories.filter(cat => {
    if (activeTab === 'all') return true;
    return cat.type === activeTab;
  });

  return (
    <section
      id="skills"
      className="py-16 bg-transparent transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            My Superpowers
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Skills & Capabilities
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center space-x-2 mb-12">
          {['all', 'technical', 'soft'].map((tab) => (
            <button
              key={tab}
              id={`skills-tab-${tab}`}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4.5 py-2 rounded text-[10px] font-bold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                activeTab === tab
                  ? 'bg-neutral-950 text-white border-neutral-800 dark:bg-white dark:text-neutral-950 dark:border-neutral-200 shadow-sm'
                  : 'bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300 dark:bg-black dark:text-neutral-400 dark:border-neutral-900 dark:hover:border-neutral-800'
              }`}
            >
              {tab === 'all' ? 'All Skills' : tab === 'technical' ? 'Technical' : 'Interpersonal'}
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-wider">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Skills tags/badges with hover background highlights */}
                  <div className="flex flex-wrap gap-2 justify-start">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 rounded text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
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
