import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Box,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Menu,
  Moon,
  PackageCheck,
  SquareTerminal,
  Sun,
} from 'lucide-react';

type Chip = {
  label: string;
  tone: 'blue' | 'gray' | 'peach';
};

const stats = [
  { label: 'Commits (YTD)', value: '1,204' },
  { label: 'Repositories', value: '42' },
];

const skills: Chip[] = [
  { label: 'Python', tone: 'blue' },
  { label: 'PyTorch', tone: 'gray' },
  { label: 'SQL', tone: 'peach' },
  { label: 'React', tone: 'gray' },
  { label: 'Docker', tone: 'gray' },
];

const footerLinks = ['GitHub', 'LinkedIn', 'Scholar', 'Email'];
const navLinks = ['Projects', 'Experience', 'Stack', 'Research'];

const codeLines = [
  'def optimized_step(self, closure=None):',
  '    loss = None',
  '    if closure is not None:',
  '        loss = closure()',
  '',
  '    for group in self.param_groups:',
  '        for p in group["params"]:',
  '            if p.grad is None:',
  '                continue',
  '            grad = p.grad.data',
  '            # Apply custom momentum logic',
];

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem('portfolio-theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Portfolio navigation">
        <a className="wordmark" href="#top">
          DS_Portfolio_v1.0
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link}>
              {link}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
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
          <a className="resume-button" href="#research">
            Resume
          </a>
          <button className="icon-button mobile-only" type="button" aria-label="Open menu">
            <Menu size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      <section className="hero-panel" id="top" aria-labelledby="hero-title">
        <div className="constellation" aria-hidden="true">
          {Array.from({ length: 26 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">Data Science Portfolio</h1>
          <p className="availability-chip">Open for hire</p>
          <p className="terminal-pill">&gt; System.Ready()_</p>
        </div>
        <a className="scroll-cue" href="#featured" aria-label="Scroll to featured project">
          <ArrowDown size={17} strokeWidth={2.2} />
        </a>
      </section>

      <div className="portfolio-grid" id="projects">
        <section className="card project-card" id="featured" aria-labelledby="featured-title">
          <a className="floating-action" href="#activity" aria-label="View featured project">
            <ExternalLink size={20} strokeWidth={1.9} />
          </a>
          <p className="eyebrow">Featured Project</p>
          <h2 id="featured-title">Neural Network Optimization</h2>
          <p className="body-copy">
            Implemented a novel gradient descent variant that accelerates
            convergence in deep CNNs by 15% without sacrificing generalization
            accuracy.
          </p>
          <pre className="code-window" aria-label="Optimization code preview">
            <code>
              {codeLines.map((line, index) => (
                <span key={`${index}-${line}`}>{line}</span>
              ))}
            </code>
          </pre>
          <a className="primary-action mobile-project-action" href="#activity">
            View Project
            <ExternalLink size={16} strokeWidth={1.9} />
          </a>
        </section>

        <div className="side-column" id="experience">
          <section className="card activity-card" id="activity" aria-labelledby="activity-title">
            <div className="section-heading">
              <span className="section-icon">
                <Github size={15} strokeWidth={2} />
              </span>
              <h2 id="activity-title">GitHub Activity</h2>
            </div>
            <div className="stats-grid">
              {stats.map((item) => (
                <div className="stat" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
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
                  d="M3 70 C35 65, 42 61, 62 58 S98 33, 125 40 153 31, 172 23 202 18, 221 27 248 16, 287 7"
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
          </section>

          <section className="card education-card" aria-labelledby="education-title">
            <div className="card-topline">
              <span className="soft-icon">
                <GraduationCap size={18} strokeWidth={1.9} />
              </span>
              <span className="year-chip">2023 - 2025</span>
            </div>
            <h2 id="education-title">M.S. Data Science</h2>
            <p className="body-copy">Indiana University Bloomington</p>
          </section>
        </div>

        <section className="card stack-card" id="stack" aria-labelledby="stack-title">
          <div className="section-heading compact">
            <span className="accent-icon">
              <Box size={15} strokeWidth={2} />
            </span>
            <h2 id="stack-title">Core Stack</h2>
          </div>
          <div className="chip-row" aria-label="Core technologies">
            {skills.map((skill) => (
              <span className={`chip ${skill.tone}`} key={skill.label}>
                {skill.label}
              </span>
            ))}
          </div>
        </section>

        <section className="card publication-card" id="research" aria-labelledby="publication-title">
          <div className="publication-meta">
            <p className="publication-label">Latest Publication</p>
            <p className="status-line">
              <PackageCheck size={12} strokeWidth={2} />
              NeurIPS 2023 (Under Review)
            </p>
          </div>
          <h2 id="publication-title">Predictive Modeling of Temporal Graph Networks</h2>
          <p className="body-copy">
            Proposing a scalable framework for dynamic link prediction in
            large-scale temporal graphs utilizing attention-based message
            passing and temporal encoding...
          </p>
          <a className="text-action" href="#top">
            Read Abstract
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </section>
      </div>

      <footer className="footer">
        <p>(c) 2026 DS_Student@IUB :: System.Ready</p>
        <nav aria-label="Social links">
          {footerLinks.map((link) => (
            <a href="#top" key={link}>
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}

export default App;
