import type { ProjectCard, TimelineItem, EducationItem, TechStackGroup } from './portfolioData';

type MachineViewProps = {
  projects: ProjectCard[];
  experiences: TimelineItem[];
  education: EducationItem[];
  techStack: TechStackGroup[];
};

function serializeToMarkdown({
  projects,
  experiences,
  education,
  techStack,
}: MachineViewProps): string {
  const lines: string[] = [];

  lines.push('# Sarrthak Tripathi — Portfolio');
  lines.push('');
  lines.push('Machine learning engineer focused on applied AI, production data');
  lines.push('systems, and agentic software that survives real users.');
  lines.push('');

  // Projects
  lines.push('## Projects');
  lines.push('');
  for (const project of projects) {
    lines.push(`### ${project.title}`);
    if (project.badge) lines.push(`> ${project.badge}`);
    lines.push('');
    lines.push(project.summary);
    lines.push('');
    if (project.href) lines.push(`GitHub: ${project.href}`);
    lines.push('');
    lines.push('**Outcomes:**');
    for (const outcome of project.outcomes) {
      lines.push(`- ${outcome}`);
    }
    lines.push('');
    lines.push('**Architecture:**');
    for (const item of project.stack) {
      lines.push(`- **${item.label}**: ${item.text}`);
    }
    lines.push('');
  }

  // Experience
  lines.push('## Experience');
  lines.push('');
  for (const exp of experiences) {
    lines.push(`### ${exp.title} — ${exp.org}`);
    lines.push(`*${exp.period}*`);
    lines.push('');
    for (const bullet of exp.star) {
      lines.push(`- ${bullet}`);
    }
    lines.push('');
  }

  // Education
  lines.push('## Education');
  lines.push('');
  for (const edu of education) {
    lines.push(`### ${edu.degree}`);
    lines.push(`${edu.school} (${edu.dates})`);
    if (edu.cgpa) lines.push(`${edu.cgpa}`);
    lines.push('');
    lines.push(`Subjects: ${edu.subjects.join(', ')}`);
    lines.push('');
  }

  // Tech Stack
  lines.push('## Tech Stack');
  lines.push('');
  for (const group of techStack) {
    lines.push(`**${group.category}:** ${group.items.map((i) => i.label).join(', ')}`);
  }
  lines.push('');

  // Contact
  lines.push('## Contact');
  lines.push('');
  lines.push('- GitHub: https://github.com/sarrthak');
  lines.push('- LinkedIn: https://linkedin.com/in/tripsarrthak28');
  lines.push('- Email: sarrtrip@iu.edu');
  lines.push('');

  return lines.join('\n');
}

export function MachineView(props: MachineViewProps) {
  const markdown = serializeToMarkdown(props);

  return (
    <div className="machine-view">
      <div className="machine-header">
        <span className="machine-badge">Machine Mode</span>
        <span className="machine-meta">text/markdown • structured for AI agents & crawlers</span>
      </div>
      <pre className="machine-content">{markdown}</pre>
    </div>
  );
}
