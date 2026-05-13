import { getClient } from './client';

export async function getProjects() {
  const client = getClient();
  if (!client) return [];

  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      title,
      badge,
      href,
      summary,
      outcomes,
      stack[] { label, text }
    }`,
    {},
    { next: { tags: ['projects'] } },
  );
}

export async function getExperiences() {
  const client = getClient();
  if (!client) return [];

  return client.fetch(
    `*[_type == "experience"] | order(order asc) {
      _id,
      title,
      org,
      period,
      icon,
      href,
      star
    }`,
    {},
    { next: { tags: ['experiences'] } },
  );
}

export async function getEducation() {
  const client = getClient();
  if (!client) return [];

  return client.fetch(
    `*[_type == "education"] | order(order asc) {
      _id,
      school,
      degree,
      dates,
      cgpa,
      subjects
    }`,
    {},
    { next: { tags: ['education'] } },
  );
}

export async function getTechStack() {
  const client = getClient();
  if (!client) return [];

  return client.fetch(
    `*[_type == "techStack"] | order(order asc) {
      _id,
      category,
      items[] { label, tone }
    }`,
    {},
    { next: { tags: ['techStack'] } },
  );
}
