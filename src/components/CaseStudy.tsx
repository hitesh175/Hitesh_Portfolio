import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import type { Project } from '../types';

export const workflows: Record<string, [string, string, string]> = {
  artemis: ['Voice or text input', 'Local model and tools', 'Desktop response'],
  'aircraft-analytics': ['Aircraft records', 'Preprocess with Python', 'Performance KPIs'],
  'supply-chain-delay': ['Logistics data', 'Engineer model features', 'Predict delivery delays'],
  'retail-bi-dashboard': ['Retail data', 'Query with SQL', 'Visualize in Power BI'],
  'crypto-prediction': ['Historical market data', 'Build time-series features', 'Predict price direction'],
  'store-sales-analysis': ['Store sales records', 'Clean and explore', 'Identify purchasing patterns'],
  'interactive-data-platform': ['Project data', 'React components', 'Interactive charts and demos'],
};

export default function CaseStudy({ project }: { project: Project }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="case-study">
      <a className="work-case-link" href="#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a>
      <h1>{project.title}</h1>
      <p className="case-summary">{project.description}</p>
      <section className="work-case">
        <h2>How it works</h2>
        <ol aria-label="Project workflow">
          {workflows[project.id].map(step => <li key={step}>{step}</li>)}
        </ol>
      </section>
      <section>
        <h2>What to inspect</h2>
        <p>{project.hasInteractiveDemo === false
          ? 'The repository documents the desktop interface, local model integration, and storage.'
          : 'The linked repository documents the implementation. Where the portfolio provides a simulator, use it to explore the workflow with illustrative data.'}</p>
      </section>
      <section>
        <h2>Tools and techniques</h2>
        <p>{project.techStack.join(' · ')}</p>
        <a className="work-case-link" href={project.githubLink.replace(/\.git$/, '')} target="_blank" rel="noopener noreferrer">
          View source and documentation <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
      <a className="case-next work-case-link" href={`#work/${next.id}`}>
        Next project · {next.title} <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
