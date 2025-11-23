/**
 * GitHub API module for fetching contribution data
 */

const GITHUB_API = 'https://api.github.com';

export interface ContributionDay {
  date: string;
  count: number;
  weekday?: number;
}

export interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

/**
 * Fetches contribution data using GitHub's GraphQL API
 * @param username - GitHub username
 * @param token - GitHub personal access token (optional but recommended)
 * @returns Contribution data
 */
export async function fetchContributions(
  username: string,
  token?: string
): Promise<ContributionData> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`${GITHUB_API}/graphql`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: query,
      variables: { username }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  if (!data.data || !data.data.user) {
    throw new Error('User not found');
  }

  return parseContributionData(data.data.user.contributionsCollection.contributionCalendar);
}

interface GraphQLDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

interface GraphQLWeek {
  contributionDays: GraphQLDay[];
}

interface GraphQLCalendar {
  totalContributions: number;
  weeks: GraphQLWeek[];
}

/**
 * Parses contribution data from GraphQL response
 */
function parseContributionData(calendar: GraphQLCalendar): ContributionData {
  const contributions: ContributionDay[] = [];

  calendar.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      contributions.push({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday
      });
    });
  });

  return {
    total: calendar.totalContributions,
    contributions: contributions
  };
}
