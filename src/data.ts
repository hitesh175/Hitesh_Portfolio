/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, BlogPost, Certification, EducationItem, ResearchItem } from './types';

export const personalInfo = {
  name: "Hitesh Kanagala Rajendra Prasad",
  title: "Applied Data Science & Artificial Intelligence Master's Student",
  subtitle: "Transforming Data into Intelligent Solutions through Machine Learning, Analytics and Artificial Intelligence.",
  location: "Hamburg, Germany",
  university: "SRH University Hamburg",
  status: "Open to Internship & Werkstudent Opportunities",
  resumeUrl: "https://mega.nz/file/S2BzTK4K#kw-cxL2v-NWkc3fct9aLAro_VNsHYvWGkQ0D9Zm5YlU", // Anchor/button or simulated resume view
  githubUrl: "https://github.com/hitesh175", // Custom GitHub
  linkedinUrl: "https://linkedin.com/in/hitesh-k-r", // Custom LinkedIn
  email: "kanagalahitesh@gmail.com",
  careerObjective: "Aspiring Data Analyst with a strong foundation in Machine Learning, Artificial Intelligence, Data Analytics, and Business Intelligence. Passionate about leveraging data to solve complex business problems and continuously learning emerging technologies."
};

export const technicalExpertise = [
  "Python",
  "SQL",
  "R",
  "Power BI",
  "Machine Learning",
  "Pandas",
  "NumPy",
  "Scikit-Learn",
  "EDA",
  "ETL",
  "NLP",
  "Time Series",
  "Git",
  "GitHub"
];

export const services = [
  {
    id: "ML",
    title: "Machine Learning",
    description: "Develop predictive models using supervised and unsupervised learning techniques to extract value from historical data.",
    icon: "Brain"
  },
  {
    id: "Analytics",
    title: "Data Analytics",
    description: "Extract meaningful insights from structured and unstructured datasets to guide strategic decision-making.",
    icon: "BarChart3"
  },
  {
    id: "BI",
    title: "Business Intelligence",
    description: "Design interactive dashboards and KPI reports using Power BI for deep-dive reporting and executive summaries.",
    icon: "LayoutDashboard"
  },
  {
    id: "Engineering",
    title: "Data Engineering",
    description: "Build scalable data pipelines, automate data ingestion and workflows, and ensure clean datasets.",
    icon: "Cpu"
  }
];

export const skills = {
  languages: ["Python", "SQL", "R"],
  dataScience: ["Pandas", "NumPy", "Scikit-Learn", "Feature Engineering", "Data Cleaning", "Exploratory Data Analysis (EDA)"],
  machineLearning: ["Classification", "Regression", "Time-Series Forecasting", "Model Evaluation", "Hyperparameter Tuning"],
  visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
  databases: ["MySQL", "MongoDB"],
  tools: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Google Colab"],
  softSkills: ["Problem Solving", "Critical Thinking", "Team Collaboration", "Communication", "Analytical Thinking"]
};

export const projects: Project[] = [
  {
    id: "aircraft-analytics",
    title: "Aircraft Performance Analytics Pipeline",
    techStack: ["Python", "Pandas", "NumPy", "ETL", "Analytics"],
    description: "Developed an end-to-end analytics pipeline to process aircraft performance data. Built automated preprocessing workflows, generated KPIs, and analyzed operational performance to derive actionable insights.",
    category: "engineering",
    githubLink: "https://github.com/hitesh175/aircraft-performance-analytics-pipeline.git"
  },
  {
    id: "supply-chain-delay",
    title: "Supply Chain Delivery Delay Prediction",
    techStack: ["Python", "Machine Learning", "Scikit-Learn"],
    description: "Built a predictive machine learning model to forecast delivery delays using logistics and supply chain data. Applied feature engineering, model evaluation, and performance optimization.",
    category: "ml",
    githubLink: "https://github.com/hitesh175/supply-chain-delay-prediction-ml.git"
  },
  {
    id: "crypto-prediction",
    title: "Crypto Price Direction Prediction",
    techStack: ["Python", "Time-Series Analysis", "Machine Learning"],
    description: "Developed a time-series machine learning model to predict cryptocurrency price direction using historical market data and feature engineering techniques.",
    category: "ml",
    githubLink: "https://github.com/hitesh175/Crypto-Price-Direction-Prediction-Time-Series-ML-.git"
  },
  {
    id: "retail-bi-dashboard",
    title: "Retail Sales Analytics Dashboard",
    techStack: ["SQL", "Power BI", "Business Intelligence"],
    description: "Designed an interactive dashboard to visualize sales KPIs, revenue trends, customer behavior, and business performance using SQL and Power BI.",
    category: "bi",
    githubLink: "https://github.com/hitesh175/retail-sales-dashboard.git"
  },
  {
    id: "store-sales-analysis",
    title: "Retail Store Sales",
    techStack: ["Tableau","Data Cleaning", "Analytics"],
    description: "Performed extensive data cleaning and exploratory analysis to identify customer purchasing patterns and sales trends for business decision-making.",
    category: "analytics",
    githubLink: "https://github.com/hitesh175/Retail-Store-Sales---Data-Cleaning-Performance-Analysis.git"
  }
];

export const education: EducationItem[] = [
  {
    institution: "SRH University Hamburg",
    degree: "Master of Science",
    field: "Applied Data Science & Artificial Intelligence",
    period: "2025 – Present"
  },
  {
    institution: "Presidency University",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    period: "2020 – 2024"
  },
  {
    institution: "Narayana E-techno School",
    degree: "High School",
    field: "Science & Mathematics",
    period: "2020"
  }
];

export const research: ResearchItem = {
  title: "Augmented Reality and Holography: Redefining the Way of Human-Computer Interaction",
  journal: "International Publication",
  description: "Published research exploring the integration of augmented reality and holography technologies to enhance immersive human-computer interaction, investigating spatial rendering techniques and sensory-driven feedback.",
  paperUrl: "https://www.ijsred.com/volume6/issue5/IJSRED-V6I5P58.pdf"
};

export const certifications: Certification[] = [
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/9ee194fcbbae929b49015b04d2eac96e"
  },
  {
    name: "Databases and SQL for Data Science with Python",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/e1e505b60570af0c6e5213a7d4e823dc"
  },
  {
    name: "Machine Learning with Python",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/3ab1eef390d183f5863c67859ebe1d4a"
  },
  {
    name: "Data Science Methodology",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/68acc5c893ef2e4ef4c16f83b76c1bab"
  },
  {
    name: "Tools for Data Science",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/a66cfad2f9cb1c2c06b4520573489068"
  },
  {
    name: "Data Analysis with Python",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/81ecc9e1272ed18c4103763baf94f8ac"
  },
  {
    name: "Applied Data Science Capstone",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/b79561fd89a15884f28835a435d4d228"
  },
  {
    name: "Python Project for Data Science",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/9721d2ca18c7179799c45127217553aa"
  },
  {
    name: "Foundations of User Experience (UX) Design",
    issuer: "Google / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/share/9dbb3e96d1a9c0425f1bf4714286dea3"
  }
];

export const stats = [
  { value: "15+", label: "Featured Projects" },
  { value: "10+", label: "Technical Skills" },
  { value: "1", label: "Research Publication" },
  { value: "Open", label: "To Internship Opportunities" }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Mechanics of Predictive Modeling in Supply Chain Delivery Delays",
    date: "June 15, 2026",
    readTime: "5 min read",
    excerpt: "Exploring the challenges and strategies of forecasting logistical bottlenecks using Scikit-Learn and custom feature engineering.",
    tags: ["Machine Learning", "Supply Chain", "Python"],
    category: "Machine Learning",
    content: `
# The Mechanics of Predictive Modeling in Supply Chain Delivery Delays

Timely delivery is one of the most critical aspects of supply chain management, directly influencing customer satisfaction and operational efficiency. However, predicting delays is challenging due to the large number of variables involved, including shipping methods, warehouse operations, transportation routes, and order priorities.

In this project, I developed a machine learning model using Python and Scikit-Learn to predict delivery delays based on historical logistics data. The workflow involved data cleaning, feature engineering, exploratory data analysis, model training, and performance evaluation. Special attention was given to handling missing values, encoding categorical features, and selecting meaningful predictors that improved model performance.

Multiple classification algorithms were evaluated using metrics such as Precision, Recall, F1-Score, and Accuracy to identify the most reliable model. The project demonstrated how predictive analytics can help organizations proactively identify high-risk deliveries, optimize logistics planning, and reduce operational costs.

Beyond model development, this project strengthened my understanding of the complete machine learning lifecycle—from raw data preprocessing to model evaluation—and reinforced the importance of data-driven decision-making in supply chain operations.
`
  },
  {
    id: "blog-2",
    title: "Building Scalable ETL Pipelines for Aircraft Performance Data",
    date: "May 02, 2026",
    readTime: "7 min read",
    excerpt: "How to structure low-latency stream preprocessing pipelines using Pandas, NumPy and high-performance file formats.",
    tags: ["Data Engineering", "ETL", "Pandas"],
    category: "Data Engineering",
    content: `
# Building Scalable ETL Pipelines for Aircraft Performance Data

Modern aircraft generate vast amounts of operational data that must be processed efficiently before meaningful analysis can be performed. Building reliable ETL (Extract, Transform, Load) pipelines is essential for converting raw aviation data into structured datasets suitable for analytics and reporting.

In this project, I developed a scalable ETL pipeline using Python, Pandas, and NumPy to automate data ingestion, preprocessing, transformation, and validation. The pipeline handled missing values, standardized data formats, removed inconsistencies, and generated performance metrics that could be used for further analysis.

A major focus of the project was creating a modular workflow that improves data quality while reducing manual effort. The processed data enabled faster exploratory analysis and supported the generation of operational insights related to aircraft performance and efficiency.

This project enhanced my practical knowledge of data engineering, ETL workflow design, data preprocessing, and scalable analytics pipelines, highlighting the critical role of clean and reliable data in building successful analytical solutions.
`
  },
  {
    id: "blog-3",
    title: "Designing Interactive Executive Dashboards: A BI Case Study",
    date: "March 20, 2026",
    readTime: "4 min read",
    excerpt: "Bridging the gap between raw database tables and actionable business decisions with highly focused Power BI reports.",
    tags: ["Business Intelligence", "Power BI", "SQL"],
    category: "Business Intelligence",
    content: `
# Designing Interactive Executive Dashboards: A Business Intelligence Case Study

Organizations rely on Business Intelligence dashboards to transform large volumes of business data into meaningful insights that support strategic decision-making. A well-designed dashboard not only presents information clearly but also enables stakeholders to explore trends, monitor key performance indicators, and identify opportunities for improvement.

In this project, I designed an interactive executive dashboard using SQL and Power BI to analyze retail sales performance. After extracting and preparing data with SQL, I developed dynamic visualizations that displayed revenue trends, product performance, customer insights, and regional sales metrics through interactive charts, KPIs, and drill-down reports.

The dashboard was designed with a strong focus on usability, allowing decision-makers to filter data, compare business performance across different dimensions, and quickly identify patterns that influence growth and profitability.

This project strengthened my expertise in SQL, Power BI, dashboard development, and data visualization while demonstrating how Business Intelligence solutions can convert raw business data into actionable insights that drive informed decision-making.
`
  }
];
