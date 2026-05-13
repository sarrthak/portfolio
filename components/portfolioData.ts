// Hardcoded portfolio data used as fallback when Sanity is not configured.
// This file is imported by app/page.tsx and passed as props to the App component.

export type TechStackGroup = {
  category: string;
  items: {
    label: string;
    tone: 'blue' | 'cyan' | 'green' | 'orange' | 'purple' | 'red';
  }[];
};

export type ProjectCard = {
  title: string;
  badge: string;
  href: string;
  summary: string;
  outcomes: string[];
  stack: { label: string; text: string }[];
};

export type TimelineItem = {
  icon?: string;
  period: string;
  title: string;
  org: string;
  href?: string;
  star: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  dates: string;
  cgpa?: string;
  subjects: string[];
};

export const projectCards: ProjectCard[] = [
  {
    title: 'Noteboard.ai',
    badge: 'Cheng Wu Challenge Finalist Project',
    href: 'https://github.com/sarrthak',
    summary:
      'AI-native project workspace that turns product discovery into architecture, tickets, agent-assisted implementation, and traceable engineering activity.',
    outcomes: [
      'Voice-to-ticket capture for product huddles',
      'Auto-generated HLDs with Mermaid/canvas architecture views',
      'Planner/drafter/verifier agent loop with checkpoint approvals',
      "Finalist at IUB's flagship Cheng Wu Challenge 2026",
    ],
    stack: [
      {
        label: 'LangGraph',
        text: 'orchestrates planner, drafter, verifier, and approval-state agent workflows.',
      },
      {
        label: 'Neo4j',
        text: 'stores project dependency graphs so service relationships and architecture decisions stay queryable.',
      },
      {
        label: 'Redis',
        text: 'powers queues, session checkpoints, durable approvals, and real-time workflow state.',
      },
      {
        label: 'Gemma 4',
        text: 'supports dynamic prompting for context-aware reasoning across tickets, designs, and dev tasks.',
      },
      {
        label: 'Next.js',
        text: 'ships the product UI for huddles, architecture review, and developer mission control.',
      },
    ],
  },
  {
    title: 'News-Tracking-Cloudfare',
    badge: 'Fake News / News Intelligence Platform',
    href: 'https://github.com/sarrthak/News-Tracking-Cloudfare',
    summary:
      'Cloud-native news tracking system built for the modern fake-news problem: finding related coverage, grounding claims, and helping readers inspect credibility and neutrality.',
    outcomes: [
      'Tracks news context instead of treating articles as isolated posts',
      'Uses embeddings and semantic retrieval to connect related coverage',
      'Supports neutrality-aware ranking and citation-grounded topic histories',
      'Built to make misinformation analysis measurable for readers and reviewers',
    ],
    stack: [
      {
        label: 'Next.js',
        text: 'delivers a fast, recruiter-demoable interface for search, topics, and article review.',
      },
      {
        label: 'Cloudflare Workers',
        text: 'runs edge logic close to users for low-latency news retrieval and ranking.',
      },
      {
        label: 'D1',
        text: 'stores article metadata, labels, and evaluation artifacts in a serverless SQL layer.',
      },
      {
        label: 'Vectorize',
        text: 'indexes article embeddings for semantic search across a large news corpus.',
      },
      {
        label: 'RAG',
        text: 'builds citation-backed topic summaries and timelines instead of unsupported summaries.',
      },
    ],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    icon: 'Database',
    period: 'Aug 2025 - Present',
    title: 'Data Scientist',
    org: 'Indiana University Bloomington',
    star: [
      'Situation: Complex Olympic diving records required faster search, review, and classification across large-scale text and video data.',
      'Task: Build multimodal retrieval and model-training systems that could support natural language querying, domain classification, and automated scoring.',
      'Action: Engineered a Hadoop-backed RAG pipeline with vector embeddings and GLM-4.5 synthesis, fine-tuned LLaMA with LoRA on 10,000 records, and adapted VideoMAE V2 spatio-temporal attention layers for dive biomechanics across historical videos.',
      'Result: Improved retrieval accuracy by 40%, reduced manual review by 15 hours per week, increased few-shot prediction accuracy by 60%, and mapped multi-frame videos to an automated grading metric.',
    ],
  },
  {
    icon: 'Network',
    period: 'Jan 2022 - 2025',
    title: 'Sr. Software Engineer',
    org: 'Optum Global Solutions',
    star: [
      'Situation: Healthcare member platforms needed faster, more reliable product experiences across frontend, backend, claims data, and deployment surfaces.',
      'Task: Modernize legacy AEM experiences, improve service response paths, support Kubernetes migration, and turn member experience data into actionable leadership insight.',
      'Action: Migrated key widgets to React and Next.js, built Spring Boot services for login/member APIs, helped configure Kafka claims topics, contributed Kubernetes service/proxy files, built KPI dashboards, modeled pain points with Python/Keras/Scikit-Learn, and prototyped LLM features for patient claim forms.',
      'Result: Expanded from frontend delivery into full-stack, platform, ML, and LLM production work while supporting high-volume healthcare workflows and sub-50ms response-time goals.',
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    school: 'Indiana University Bloomington',
    degree: 'M.S. Data Science',
    dates: '2025 - 2027',
    subjects: [
      'Applied Machine Learning',
      'Applied Database Technologies',
      'Computer Vision',
    ],
  },
  {
    school: 'Vellore Institute of Technology',
    degree: 'B.Tech Computer Science',
    dates: '2019 - 2023',
    cgpa: 'CGPA 3.8/4',
    subjects: [
      'Data Mining',
      'Neural Networks',
      'Machine Learning',
      'Cloud Computing',
      'Git',
      'Artificial Intelligence',
    ],
  },
];

export const techStack: TechStackGroup[] = [
  {
    category: 'Languages',
    items: [
      { label: 'Python', tone: 'blue' },
      { label: 'TypeScript', tone: 'blue' },
      { label: 'SQL', tone: 'cyan' },
      { label: 'R', tone: 'blue' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { label: 'PyTorch', tone: 'red' },
      { label: 'TensorFlow', tone: 'orange' },
      { label: 'LangGraph', tone: 'purple' },
      { label: 'OpenAI', tone: 'purple' },
      { label: 'Computer Vision', tone: 'orange' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { label: 'Next.js', tone: 'green' },
      { label: 'React', tone: 'cyan' },
      { label: 'Tailwind CSS', tone: 'cyan' },
      { label: 'AEM', tone: 'purple' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { label: 'FastAPI', tone: 'green' },
      { label: 'Spring Boot', tone: 'green' },
      { label: 'PostgreSQL', tone: 'blue' },
      { label: 'Redis', tone: 'red' },
      { label: 'Neo4j', tone: 'blue' },
      { label: 'Kafka', tone: 'orange' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { label: 'Docker', tone: 'blue' },
      { label: 'Kubernetes', tone: 'cyan' },
      { label: 'GitHub Actions', tone: 'blue' },
      { label: 'Cloudflare', tone: 'orange' },
      { label: 'Vercel', tone: 'green' },
    ],
  },
];
