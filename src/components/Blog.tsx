/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight, X, BookOpen, Tag } from 'lucide-react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section
      id="blog"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
            Data Science Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Blog
          </h2>
          <div className="w-12 h-0.5 bg-neutral-950 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-neutral-100 dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-900 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6 space-y-4">
                  {/* Meta details */}
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-neutral-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-display font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors uppercase tracking-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white dark:bg-neutral-900 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 rounded border border-neutral-200 dark:border-neutral-800"
                        >
                          <Tag className="w-2.5 h-2.5 text-neutral-500" />
                          <span>{tag}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Read button */}
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-900 pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    // {post.category}
                  </span>
                  <button
                    id={`btn-blog-read-${post.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 flex items-center space-x-1 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full-Article Modal View */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                className="bg-white dark:bg-neutral-950 rounded w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-neutral-200 dark:border-neutral-900 shadow-lg relative text-neutral-800 dark:text-neutral-200"
                id="blog-modal-content"
              >
                {/* Modal header & sticky boundary */}
                <div className="sticky top-0 right-0 left-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 p-4 flex justify-between items-center z-10">
                  <div className="flex items-center space-x-2 text-neutral-900 dark:text-white">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-widest">
                      Data Science Insights // Reader Mode
                    </span>
                  </div>
                  <button
                    id="btn-close-blog-modal"
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded border border-neutral-200 dark:border-neutral-900 text-neutral-550 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Post detail */}
                <div className="p-8 space-y-6 text-left">
                  {/* Meta items */}
                  <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{selectedPost.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>{selectedPost.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
                    {selectedPost.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pb-4 border-b border-neutral-200 dark:border-neutral-900">
                    {selectedPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-xs font-mono text-neutral-600 dark:text-neutral-450 rounded border border-neutral-200 dark:border-neutral-850"
                      >
                        <Tag className="w-3 h-3 text-neutral-500" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Prose style rendering for Content */}
                  <div className="max-w-none text-neutral-700 dark:text-neutral-300 space-y-5 leading-relaxed text-sm">
                    {selectedPost.content.split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={i} className="text-lg font-display font-bold text-neutral-900 dark:text-white uppercase pt-4">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('#### ')) {
                        return (
                          <h5 key={i} className="text-sm font-display font-semibold text-neutral-900 dark:text-white uppercase pt-2">
                            {paragraph.replace('#### ', '')}
                          </h5>
                        );
                      }
                      if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                        return (
                          <ul key={i} className="list-disc list-inside pl-4 space-y-2">
                            {paragraph.split('\n').map((li, j) => (
                              <li key={j} className="text-neutral-600 dark:text-neutral-350">
                                {li.replace(/^[0-9]\.\s|\-\s/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.includes('```')) {
                        const code = paragraph.replace(/```python|```dax|```/g, '').trim();
                        return (
                          <pre key={i} className="bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-300 p-4 rounded border border-neutral-200 dark:border-neutral-900 font-mono text-xs overflow-x-auto leading-relaxed">
                            <code>{code}</code>
                          </pre>
                        );
                      }
                      return (
                        <p key={i} className="text-neutral-600 dark:text-neutral-350">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
