import App from '@/components/App';
import { getProjects, getExperiences, getEducation, getTechStack } from '@/sanity/lib/queries';

// Fallback data used when Sanity is not configured (no project ID)
import {
  projectCards as fallbackProjects,
  timelineItems as fallbackTimeline,
  educationItems as fallbackEducation,
  techStack as fallbackTechStack,
} from '@/components/portfolioData';

export default async function Home() {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  let projects = fallbackProjects;
  let experiences = fallbackTimeline;
  let education = fallbackEducation;
  let stack = fallbackTechStack;

  if (hasSanity) {
    try {
      const [p, e, ed, s] = await Promise.all([
        getProjects(),
        getExperiences(),
        getEducation(),
        getTechStack(),
      ]);

      // Only use Sanity data if it exists (CMS may be empty)
      if (p?.length) projects = p;
      if (e?.length) experiences = e;
      if (ed?.length) education = ed;
      if (s?.length) stack = s;
    } catch {
      // Sanity fetch failed, use fallback data
    }
  }

  return (
    <App
      projects={projects}
      experiences={experiences}
      education={education}
      techStack={stack}
    />
  );
}
