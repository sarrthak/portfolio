const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'sarrthak';

const query = `
  query PortfolioGitHubActivity($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          url
          updatedAt
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
        hasAnyRestrictedContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function startOfYear() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();
}

function flattenCalendar(weeks) {
  return weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel,
    }));
}

function summarizeRecentDays(days) {
  const recent = days.slice(-28);
  const bucketSize = 4;

  return Array.from({ length: 7 }, (_, index) => {
    const bucket = recent.slice(index * bucketSize, index * bucketSize + bucketSize);
    return bucket.reduce((total, day) => total + day.count, 0);
  });
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

export async function getGitHubActivity() {
  const token = process.env.GITHUB_ACTIVITY_TOKEN;

  if (!token) {
    const error = new Error('GitHub activity token is not configured.');
    error.statusCode = 503;
    throw error;
  }

  const to = new Date().toISOString();

  const githubResponse = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'sarrthak-portfolio',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: GITHUB_USERNAME,
        from: startOfYear(),
        to,
      },
    }),
  });

  if (!githubResponse.ok) {
    const error = new Error('GitHub API request failed.');
    error.statusCode = githubResponse.status;
    throw error;
  }

  const payload = await githubResponse.json();

  if (payload.errors?.length) {
    const error = new Error('GitHub GraphQL returned an error.');
    error.statusCode = 502;
    throw error;
  }

  const user = payload.data?.user;

  if (!user) {
    const error = new Error('GitHub user not found.');
    error.statusCode = 404;
    throw error;
  }

  const contributions = user.contributionsCollection;
  const days = flattenCalendar(contributions.contributionCalendar.weeks);
  const totalContributions = contributions.contributionCalendar.totalContributions;
  const publicRepos = user.repositories.totalCount;
  const recentRepos = user.repositories.nodes.slice(0, 3).map((repo) => ({
    name: repo.name,
    url: repo.url,
    updatedAt: repo.updatedAt,
    stars: repo.stargazerCount,
    language: repo.primaryLanguage?.name ?? 'Code',
  }));

  return {
    updatedAt: to,
    username: GITHUB_USERNAME,
    includesPrivateContributions: contributions.hasAnyRestrictedContributions,
    stats: [
      {
        label: 'Contributions (YTD)',
        value: formatCompactNumber(totalContributions),
      },
      {
        label: 'Public Repos',
        value: formatCompactNumber(publicRepos),
      },
      {
        label: 'Private Mode',
        value: 'On',
      },
    ],
    totals: {
      commits: contributions.totalCommitContributions,
      pullRequests: contributions.totalPullRequestContributions,
      issues: contributions.totalIssueContributions,
      reviews: contributions.totalPullRequestReviewContributions,
      restricted: contributions.restrictedContributionsCount,
    },
    chart: summarizeRecentDays(days),
    recentRepos,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const activity = await getGitHubActivity();

    response.setHeader(
      'Cache-Control',
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    );

    return response.status(200).json(activity);
  } catch (error) {
    return response.status(error.statusCode ?? 500).json({
      error: error.message ?? 'GitHub activity is unavailable.',
    });
  }
}
