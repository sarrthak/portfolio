import { NextResponse } from 'next/server';

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

type ContributionDay = {
  date: string;
  count: number;
  level: string;
};

type CalendarWeek = {
  contributionDays: {
    date: string;
    contributionCount: number;
    contributionLevel: string;
  }[];
};

function flattenCalendar(weeks: CalendarWeek[]): ContributionDay[] {
  return weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel,
    }));
}

function summarizeRecentDays(days: ContributionDay[]) {
  const recent = days.slice(-28);
  const bucketSize = 4;

  return Array.from({ length: 7 }, (_, index) => {
    const bucket = recent.slice(index * bucketSize, index * bucketSize + bucketSize);
    return bucket.reduce((total, day) => total + day.count, 0);
  });
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

async function getGitHubActivity() {
  const token = process.env.GITHUB_ACTIVITY_TOKEN;

  if (!token) {
    throw Object.assign(new Error('GitHub activity token is not configured.'), {
      statusCode: 503,
    });
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
    throw Object.assign(new Error('GitHub API request failed.'), {
      statusCode: githubResponse.status,
    });
  }

  const payload = await githubResponse.json();

  if (payload.errors?.length) {
    throw Object.assign(new Error('GitHub GraphQL returned an error.'), {
      statusCode: 502,
    });
  }

  const user = payload.data?.user;

  if (!user) {
    throw Object.assign(new Error('GitHub user not found.'), {
      statusCode: 404,
    });
  }

  const contributions = user.contributionsCollection;
  const days = flattenCalendar(contributions.contributionCalendar.weeks);
  const totalContributions = contributions.contributionCalendar.totalContributions;
  const publicRepos = user.repositories.totalCount;
  const recentRepos = user.repositories.nodes
    .slice(0, 3)
    .map((repo: { name: string; url: string; updatedAt: string; stargazerCount: number; primaryLanguage: { name: string } | null }) => ({
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

export async function GET() {
  try {
    const activity = await getGitHubActivity();

    return NextResponse.json(activity, {
      headers: {
        'Cache-Control':
          'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };

    return NextResponse.json(
      { error: err.message ?? 'GitHub activity is unavailable.' },
      { status: err.statusCode ?? 500 },
    );
  }
}
