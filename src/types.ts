/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  category: 'ml' | 'analytics' | 'bi' | 'engineering';
  githubLink: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface ResearchItem {
  title: string;
  journal: string;
  description: string;
  paperUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
