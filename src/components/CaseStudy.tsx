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

const projectEvidence: Record<string, string> = {
  artemis: 'Artemis desktop chat interface for the local AI assistant.',
  'aircraft-analytics': 'Dashboard data preview from the aircraft performance pipeline.',
  'supply-chain-delay': 'Shipping delay prediction interface showing an example order and its predicted delay.',
  'retail-bi-dashboard': 'Power BI dashboard for exploring retail sales performance.',
  'crypto-prediction': 'Confusion matrix for the best-performing model reported in the project repository.',
};

const technicalNotes: Record<string, string> = {
  artemis: 'Python connects the WebView2 interface to Ollama and desktop tools. SQLite stores local history and memory.',
  'aircraft-analytics': 'Pandas prepares the aircraft records for MySQL and the Streamlit dashboard. The range model uses an 80/20 random split. Dropping incomplete rows may exclude some helicopters.',
  'supply-chain-delay': 'The Random Forest uses an 80/20 random split with a fixed seed. The saved dashboard reports a mean absolute error of 0.55 days. The project has no separate evaluation on a later shipment period.',
  'retail-bi-dashboard': 'PostgreSQL supports the sales analysis, and Power BI brings revenue, profit, orders, and margin into one report. The monthly trend and category breakdown help show which products contribute to revenue and how sales change over time.',
  'crypto-prediction': 'The notebook reports 52.12% accuracy for logistic regression and 52.65% for the selected Random Forest. The final 365 days were held out chronologically, but the forest was selected using that same period, so the comparison is exploratory.',
};

export default function CaseStudy({ project }: { project: Project }) {
  const evidence = projectEvidence[project.id];
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
      {evidence ? (
        <section>
          <h2>Project output</h2>
          <figure>
            <a href={`/case-studies/${project.id}.png`} target="_blank" rel="noopener noreferrer" aria-label="Open full-size project screenshot (opens in a new tab)">
              <img className="case-evidence-image" src={`/case-studies/${project.id}.png`} alt={evidence} loading="lazy" decoding="async" />
            </a>
            <figcaption className="mt-3 text-sm">{evidence} Select the image to view it full size.</figcaption>
          </figure>
        </section>
      ) : <section>
        <h2>What to inspect</h2>
        <p>{project.hasInteractiveDemo === false
          ? 'The repository documents the desktop interface, local model integration, and storage.'
          : 'The linked repository documents the implementation. Where the portfolio provides a simulator, use it to explore the workflow with illustrative data.'}</p>
      </section>}
      {technicalNotes[project.id] && (
        <section>
          <h2>Technical decisions and results</h2>
          <p>{technicalNotes[project.id]}</p>
        </section>
      )}
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
