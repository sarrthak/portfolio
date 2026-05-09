import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  Box,
  Code2,
  Database,
  Download,
  Eye,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Moon,
  Network,
  Send,
  SquareTerminal,
  Sun,
  Trophy,
  Workflow,
} from 'lucide-react';
import { TransformerHero } from './TransformerHero';

type TechStackGroup = {
  category: string;
  items: {
    label: string;
    tone: 'blue' | 'cyan' | 'green' | 'orange' | 'purple' | 'red';
  }[];
};

const stats = [
  { label: 'Contributions (YTD)', value: '1.2K' },
  { label: 'Public Repos', value: '42' },
  { label: 'Private Mode', value: '--' },
];

type GitHubActivity = {
  updatedAt: string;
  includesPrivateContributions: boolean;
  stats: {
    label: string;
    value: string;
  }[];
  totals: {
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
    restricted: number;
  };
  chart: number[];
  recentRepos: {
    name: string;
    url: string;
    updatedAt: string;
    stars: number;
    language: string;
  }[];
};

const techStack: TechStackGroup[] = [
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

const educationItems = [
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

const resumeUrl = '/Sarrthak_Tripathi_Resume.pdf';
const footerLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sarrthak',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tripsarrthak28',
    icon: Linkedin,
  },
  {
    label: 'Scholar',
    href: 'https://scholar.google.com/',
    icon: GraduationCap,
  },
  {
    label: 'Email',
    href: 'mailto:sarrtrip@iu.edu',
    icon: FileText,
  },
];
const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Stack', href: '#stack' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];
const newsTrackingUrl = 'https://github.com/sarrthak/News-Tracking-Cloudfare';

const luddyHackathonUrl =
  'https://www.linkedin.com/feed/update/urn:li:activity:7452144862788853760/';
const luddyProjectUrl = 'https://github.com/sarrthak/bloomington-transit-starter';

const achievementHighlights = [
  {
    label: 'Situation',
    text: 'Luddy Hackathon challenged graduate teams to design a Bloomington Transit System as a real Android transit app using the public Bloomington Transit API, live vehicle data, route maps, schedules, and arrival alerts.',
  },
  {
    label: 'Task',
    text: 'Deliver a working demo in 24 hours with individual bus tracking, 10-second API polling, accurate expected-arrival calculations, an interactive route view, a schedule table, and a clear 3-minute judge presentation.',
  },
  {
    label: 'Action',
    text: 'Worked through the problem statement by connecting Bloomington Transit and GTFS feeds, structuring the app around an MVVM-style architecture, building live map and route surfaces, adding polling-backed vehicle updates, and shaping the demo around reliability and usability.',
  },
  {
    label: 'Result',
    text: 'Won 1st place at Luddy Hackathon and earned $1,000 in prize money.',
  },
];

const achievementChips = [
  '1st Place',
  '$1,000 Prize',
  '24 Hr Build',
  'Bloomington Transit API',
  'GTFS Realtime',
  'MVVM Architecture',
];

const projectCards = [
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
    href: newsTrackingUrl,
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

const timelineItems = [
  {
    icon: Network,
    period: 'Jan 2022 - 2025',
    title: 'Sr. Software Engineer',
    org: 'Optum Global Solutions',
    href: undefined,
    star: [
      'Situation: Healthcare member platforms needed faster, more reliable product experiences across frontend, backend, claims data, and deployment surfaces.',
      'Task: Modernize legacy AEM experiences, improve service response paths, support Kubernetes migration, and turn member experience data into actionable leadership insight.',
      'Action: Migrated key widgets to React and Next.js, built Spring Boot services for login/member APIs, helped configure Kafka claims topics, contributed Kubernetes service/proxy files, built KPI dashboards, modeled pain points with Python/Keras/Scikit-Learn, and prototyped LLM features for patient claim forms.',
      'Result: Expanded from frontend delivery into full-stack, platform, ML, and LLM production work while supporting high-volume healthcare workflows and sub-50ms response-time goals.',
    ],
  },
  {
    icon: Database,
    period: 'Aug 2025 - Present',
    title: 'Data Scientist',
    org: 'Indiana University Bloomington',
    href: undefined,
    star: [
      'Situation: Complex Olympic diving records required faster search, review, and classification across large-scale text and video data.',
      'Task: Build multimodal retrieval and model-training systems that could support natural language querying, domain classification, and automated scoring.',
      'Action: Engineered a Hadoop-backed RAG pipeline with vector embeddings and GLM-4.5 synthesis, fine-tuned LLaMA with LoRA on 10,000 records, and adapted VideoMAE V2 spatio-temporal attention layers for dive biomechanics across historical videos.',
      'Result: Improved retrieval accuracy by 40%, reduced manual review by 15 hours per week, increased few-shot prediction accuracy by 60%, and mapped multi-frame videos to an automated grading metric.',
    ],
  },
];

type Theme = 'light' | 'dark';
type ActivityState =
  | { status: 'loading'; data: GitHubActivity | null; error: null }
  | { status: 'ready'; data: GitHubActivity; error: null }
  | { status: 'error'; data: GitHubActivity | null; error: string };

const githubActivityCacheKey = 'portfolio-github-activity';

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem('portfolio-theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function buildActivityPath(points = [4, 8, 5, 16, 13, 23, 28]) {
  const maxValue = Math.max(...points, 1);
  const width = 284;
  const height = 70;
  const originX = 3;
  const originY = 78;
  const step = width / Math.max(points.length - 1, 1);
  const coordinates = points.map((point, index) => {
    const x = originX + index * step;
    const y = originY - (point / maxValue) * height;

    return [Number(x.toFixed(1)), Number(y.toFixed(1))];
  });

  return coordinates
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ');
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activity, setActivity] = useState<ActivityState>(() => {
    const cachedActivity = window.localStorage.getItem(githubActivityCacheKey);

    if (!cachedActivity) {
      return { status: 'loading', data: null, error: null };
    }

    try {
      return {
        status: 'loading',
        data: JSON.parse(cachedActivity) as GitHubActivity,
        error: null,
      };
    } catch {
      return { status: 'loading', data: null, error: null };
    }
  });
  const isDark = theme === 'dark';
  const activityStats = activity.data?.stats ?? stats;
  const activityChartPath = useMemo(
    () => buildActivityPath(activity.data?.chart),
    [activity.data?.chart],
  );
  const activityUpdatedAt = activity.data
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date(activity.data.updatedAt))
    : null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);

    return () => window.removeEventListener('resize', closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/github-activity')
      .then((response) => {
        if (!response.ok) {
          throw new Error('GitHub activity is unavailable.');
        }

        return response.json() as Promise<GitHubActivity>;
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        window.localStorage.setItem(githubActivityCacheKey, JSON.stringify(data));
        setActivity({ status: 'ready', data, error: null });
      })
      .catch((error: Error) => {
        if (!isMounted) {
          return;
        }

        setActivity((current) => ({
          status: 'error',
          data: current.data,
          error: error.message,
        }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Portfolio navigation">
        <a className="wordmark" href="#top">
          Sarrthak_v1.0
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button desktop-only"
            type="button"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </button>
          <button className="icon-button desktop-only" type="button" aria-label="Open terminal">
            <SquareTerminal size={18} strokeWidth={2} />
          </button>
          <button className="icon-button desktop-only" type="button" aria-label="Open code view">
            <Code2 size={18} strokeWidth={2} />
          </button>
          <a className="resume-button" href="#resume">
            Resume
          </a>
        </div>
        <button
          className={menuOpen ? 'mobile-menu-button is-open' : 'mobile-menu-button'}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
        </button>
        <nav
          className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}
          id="mobile-menu"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setTheme(isDark ? 'light' : 'dark');
              setMenuOpen(false);
            }}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </header>

      <section className="hero-panel neural-hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="availability-chip">Open for ML engineering roles</p>
          <h1 id="hero-title">Building intelligent systems from data to deployment.</h1>
          <p className="hero-subtitle">
            Machine learning engineer focused on applied AI, production data
            systems, and agentic software that survives real users.
          </p>
          <div className="hero-actions">
            <a className="primary-action hero-action" href="#projects">
              View Projects
              <ArrowDown size={15} strokeWidth={2} />
            </a>
            <a className="secondary-action hero-action" href={resumeUrl} target="_blank" rel="noreferrer">
              Resume
              <FileText size={15} strokeWidth={2} />
            </a>
          </div>
        </div>
        <TransformerHero />
        <a className="scroll-cue" href="#projects" aria-label="Scroll to featured projects">
          <ArrowDown size={17} strokeWidth={2.2} />
        </a>
      </section>

      <div className="portfolio-grid" id="projects">
        <section className="card projects-card" aria-labelledby="projects-title">
          <div className="section-heading compact">
            <span className="section-icon">
              <Workflow size={15} strokeWidth={2} />
            </span>
            <p className="eyebrow">Featured Projects</p>
          </div>
          <h2 id="projects-title">Projects recruiters can scan quickly</h2>
          <p className="body-copy">
            The work below emphasizes product scope, architecture choices, and
            measurable technical value instead of just listing tools.
          </p>
          <div className="featured-project-grid">
            {projectCards.map((project) => (
              <article className="featured-project" key={project.title}>
                <div className="project-header">
                  <span className="project-badge">{project.badge}</span>
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} repository`}
                  >
                    <Github size={15} strokeWidth={2} />
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-columns">
                  <div>
                    <h4>Recruiter Signals</h4>
                    <ul className="project-outcomes">
                      {project.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Architecture</h4>
                    <dl className="stack-breakdown">
                      {project.stack.map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="side-column">
          <section className="card activity-card" id="activity" aria-labelledby="activity-title">
            <div className="section-heading">
              <span className="section-icon">
                <Github size={15} strokeWidth={2} />
              </span>
              <h2 id="activity-title">GitHub Activity</h2>
            </div>
            <div className="stats-grid">
              {activityStats.map((item) => (
                <div className="stat" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <p className={`activity-status ${activity.status}`}>
              {activity.status === 'ready' && activityUpdatedAt
                ? `Live from GitHub - updated ${activityUpdatedAt}`
                : null}
              {activity.status === 'loading' ? 'Syncing GitHub activity...' : null}
              {activity.status === 'error'
                ? activity.data
                  ? 'Showing cached GitHub activity'
                  : 'GitHub activity fallback'
                : null}
            </p>
            <div className="activity-preview" aria-label="Contribution trend preview">
              <div className="mini-window">
                <span />
                <span />
                <span />
              </div>
              <div className="chart-grid">
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg viewBox="0 0 290 88" role="img" aria-label="Rising contribution line">
                <path
                  d={activityChartPath}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                <path
                  d="M3 80 C38 77, 54 70, 74 68 S102 55, 126 58 160 45, 188 38 218 42, 239 31 287 26"
                  fill="none"
                  opacity="0.34"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            {activity.data ? (
              <div className="activity-details" aria-label="GitHub contribution details">
                <span>{activity.data.totals.commits} commits</span>
                <span>{activity.data.totals.pullRequests} PRs</span>
                <span>{activity.data.totals.issues} issues</span>
                <span>{activity.data.totals.reviews} reviews</span>
                <span>
                  {activity.data.totals.restricted > 0
                    ? `${activity.data.totals.restricted} private`
                    : 'private enabled'}
                </span>
              </div>
            ) : null}
            {activity.data?.recentRepos.length ? (
              <div className="repo-list" aria-label="Recently updated public repositories">
                {activity.data.recentRepos.map((repo) => (
                  <a href={repo.url} key={repo.name} target="_blank" rel="noreferrer">
                    <span>{repo.name}</span>
                    <small>{repo.language}</small>
                  </a>
                ))}
              </div>
            ) : null}
          </section>

          <section className="card education-card" aria-labelledby="education-title">
            <div className="card-topline">
              <span className="soft-icon">
                <GraduationCap size={18} strokeWidth={1.9} />
              </span>
              <span className="year-chip">Education</span>
            </div>
            <div className="education-list">
              {educationItems.map((item, index) => (
                <article className="education-entry" key={item.school}>
                  <div className="education-heading">
                    <h2 id={index === 0 ? 'education-title' : undefined}>{item.degree}</h2>
                    <span className="year-chip">{item.dates}</span>
                  </div>
                  <p className="body-copy">{item.school}</p>
                  {item.cgpa ? <p className="education-meta">{item.cgpa}</p> : null}
                  <div className="subject-row" aria-label={`${item.school} subjects`}>
                    {item.subjects.map((subject) => (
                      <span className="subject-chip" key={subject}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="card achievement-card" id="achievements" aria-labelledby="achievements-title">
          <div className="achievement-header">
            <div>
              <div className="section-heading compact">
                <span className="achievement-icon">
                  <Trophy size={16} strokeWidth={2} />
                </span>
                <p className="eyebrow">Recent Achievement</p>
              </div>
              <h2 id="achievements-title">Winner - Luddy Hackathon</h2>
            </div>
            <div className="achievement-actions">
              <a
                className="text-action achievement-link"
                href={luddyProjectUrl}
                target="_blank"
                rel="noreferrer"
              >
                Project Repo
                <Github size={15} strokeWidth={1.9} />
              </a>
              <a
                className="text-action achievement-link"
                href={luddyHackathonUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Post
                <ExternalLink size={15} strokeWidth={1.9} />
              </a>
            </div>
          </div>
          <p className="body-copy achievement-summary">
            Designed a Bloomington Transit app that turns public transit data into
            live bus tracking, route visibility, arrival estimates, schedules, and
            commute alerts for students navigating campus.
          </p>
          <div className="achievement-chips" aria-label="Luddy Hackathon highlights">
            {achievementChips.map((chip) => (
              <span className="subject-chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
          <dl className="star-list achievement-star" aria-label="Luddy Hackathon STAR summary">
            {achievementHighlights.map((item) => (
              <div className="star-item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="card timeline-card" id="experience" aria-labelledby="timeline-title">
          <div className="section-heading compact">
            <span className="section-icon">
              <Workflow size={15} strokeWidth={2} />
            </span>
            <p className="eyebrow">Experience Timeline</p>
          </div>
          <h2 id="timeline-title">Professional experience</h2>
          <div className="timeline-list">
            {timelineItems.map(({ href, icon: Icon, org, period, star, title }, index) => (
              <article className="timeline-item" key={title}>
                <div className="timeline-marker" aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-step">Step {index + 1}</span>
                  <div className="timeline-heading">
                    <div>
                      <h3>{title}</h3>
                      <p>{org}</p>
                    </div>
                    <span className="year-chip">{period}</span>
                  </div>
                  <ul className="timeline-star">
                    {star.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {href ? (
                    <a className="text-action timeline-link" href={href} target="_blank" rel="noreferrer">
                      View Project
                      <ExternalLink size={15} strokeWidth={1.9} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card stack-card" id="stack" aria-labelledby="stack-title">
          <div className="section-heading compact">
            <span className="accent-icon">
              <Box size={15} strokeWidth={2} />
            </span>
            <h2 id="stack-title">Core Stack</h2>
          </div>
          <div className="tech-table" aria-label="Grouped technology stack">
            {techStack.map((group) => (
              <div className="tech-row" key={group.category}>
                <h3>{group.category}</h3>
                <div>
                  {group.items.map((item) => (
                    <span className={`tech-badge ${item.tone}`} key={item.label}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card resume-card" id="resume" aria-labelledby="resume-title">
          <div className="section-heading compact">
            <span className="section-icon">
              <FileText size={15} strokeWidth={2} />
            </span>
            <h2 id="resume-title">Resume</h2>
          </div>
          <p className="body-copy">
            Machine learning engineering resume with project, research, and
            production software experience.
          </p>
          <div className="resume-actions" aria-label="Resume actions">
            <a className="primary-action" href={resumeUrl} target="_blank" rel="noreferrer">
              View Resume
              <Eye size={15} strokeWidth={2} />
            </a>
            <a className="secondary-action" href={resumeUrl} download>
              Download PDF
              <Download size={15} strokeWidth={2} />
            </a>
          </div>
        </section>

        <section className="card contact-card" id="contact" aria-labelledby="contact-title">
          <div className="section-heading compact">
            <span className="section-icon">
              <Mail size={15} strokeWidth={2} />
            </span>
            <h2 id="contact-title">Contact</h2>
          </div>
          <p className="body-copy">
            Recruiters, collaborators, and hiring teams can reach me directly.
            The form opens your email client with the message fields prefilled.
          </p>
          <form
            className="contact-form"
            action="mailto:sarrtrip@iu.edu"
            method="post"
            encType="text/plain"
          >
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Subject</span>
              <input name="subject" type="text" required />
            </label>
            <label className="message-field">
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>
            <button className="primary-action contact-submit" type="submit">
              Send Message
              <Send size={15} strokeWidth={2} />
            </button>
          </form>
        </section>
      </div>

      <footer className="footer">
        <p>(c) 2026 Sarrthak :: System.Ready</p>
        <nav aria-label="Social links">
          {footerLinks.map(({ href, icon: Icon, label }) => (
            <a
              href={href}
              key={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <Icon size={13} strokeWidth={2} />
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}

export default App;
