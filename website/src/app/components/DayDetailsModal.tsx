'use client';

import { useEffect, useState } from 'react';

interface Repository {
  name: string;
  owner: { login: string };
  url: string;
}

interface Issue {
  title: string;
  url: string;
  number: number;
  repository: Repository;
}

interface PullRequest {
  title: string;
  url: string;
  number: number;
  repository: Repository;
}

interface Commit {
  sha: string;
  message: string;
  url: string;
  timestamp: string;
}

interface CommitContribution {
  repository: Repository;
  contributions: {
    nodes: Array<{
      commitCount: number;
      occurredAt: string;
    }>;
  };
}

interface CommitDetail {
  repository: Repository;
  commits: Commit[];
}

interface DayDetails {
  commitContributionsByRepository: CommitContribution[];
  commitDetails?: CommitDetail[];
  issueContributions: {
    nodes: Array<{
      issue: Issue;
      occurredAt: string;
    }>;
  };
  pullRequestContributions: {
    nodes: Array<{
      pullRequest: PullRequest;
      occurredAt: string;
    }>;
  };
  pullRequestReviewContributions: {
    nodes: Array<{
      pullRequest: PullRequest;
      occurredAt: string;
    }>;
  };
}

interface DayDetailsModalProps {
  username: string;
  date: string;
  contributionCount: number;
  onClose: () => void;
}

type CategoryType = 'commits' | 'prs' | 'issues' | 'reviews' | null;

export default function DayDetailsModal({ username, date, onClose }: DayDetailsModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<DayDetails | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('commits');

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/github-day-details?username=${encodeURIComponent(username)}&date=${encodeURIComponent(date)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch details');
        }

        const data = await response.json();
        setDetails(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [username, date]);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate totals
  const totalCommits = details?.commitContributionsByRepository.reduce(
    (sum, repo) => sum + repo.contributions.nodes.reduce((s, c) => s + c.commitCount, 0),
    0
  ) || 0;
  const totalIssues = details?.issueContributions.nodes.length || 0;
  const totalPRs = details?.pullRequestContributions.nodes.length || 0;
  const totalReviews = details?.pullRequestReviewContributions.nodes.length || 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Activity Details</h2>
            <p className="text-gray-400">{formattedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] overscroll-contain">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Commits', value: totalCommits, icon: '📝', category: 'commits' as CategoryType },
                  { label: 'Pull Requests', value: totalPRs, icon: '🔀', category: 'prs' as CategoryType },
                  { label: 'Issues', value: totalIssues, icon: '🐛', category: 'issues' as CategoryType },
                  { label: 'Reviews', value: totalReviews, icon: '👀', category: 'reviews' as CategoryType }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-gray-800/50 border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      selectedCategory === stat.category
                        ? 'border-emerald-500 bg-gray-800'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onMouseEnter={() => setSelectedCategory(stat.category)}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Content Section with Fixed Height */}
              <div className="min-h-[400px]">
                {/* Commits by Repository */}
                {selectedCategory === 'commits' && details && details.commitDetails && details.commitDetails.length > 0 && (
                  <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    📝 Commits
                  </h3>
                  <div className="space-y-4">
                    {details.commitDetails.map((repoCommits, i) => (
                      <div key={i}>
                        {repoCommits.commits.length > 0 && (
                          <>
                            <div className="text-sm font-semibold text-gray-300 mb-2">
                              {repoCommits.repository.owner.login}/{repoCommits.repository.name}
                            </div>
                            <div className="space-y-2">
                              {repoCommits.commits.map((commit, j) => (
                                <a
                                  key={j}
                                  href={commit.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block bg-gray-800/30 border border-gray-700 rounded-lg p-3 hover:border-emerald-500/50 transition-all"
                                >
                                  <div className="flex items-start gap-3">
                                    <code className="text-xs text-emerald-400 font-mono bg-gray-900 px-2 py-1 rounded flex-shrink-0">
                                      {commit.sha}
                                    </code>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm text-white break-words">
                                        {commit.message.split('\n')[0]}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {new Date(commit.timestamp).toLocaleTimeString('en-US', {
                                          hour: 'numeric',
                                          minute: '2-digit',
                                          hour12: true
                                        })}
                                      </div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pull Requests */}
              {selectedCategory === 'prs' && details && details.pullRequestContributions.nodes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    🔀 Pull Requests Opened
                  </h3>
                  <div className="space-y-2">
                    {details.pullRequestContributions.nodes.map((pr, i) => (
                      <a
                        key={i}
                        href={pr.pullRequest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate">
                              {pr.pullRequest.title}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {pr.pullRequest.repository.owner.login}/{pr.pullRequest.repository.name} #{pr.pullRequest.number}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues */}
              {selectedCategory === 'issues' && details && details.issueContributions.nodes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    🐛 Issues Opened
                  </h3>
                  <div className="space-y-2">
                    {details.issueContributions.nodes.map((issue, i) => (
                      <a
                        key={i}
                        href={issue.issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate">
                              {issue.issue.title}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {issue.issue.repository.owner.login}/{issue.issue.repository.name} #{issue.issue.number}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* PR Reviews */}
              {selectedCategory === 'reviews' && details && details.pullRequestReviewContributions.nodes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    👀 Pull Request Reviews
                  </h3>
                  <div className="space-y-2">
                    {details.pullRequestReviewContributions.nodes.map((review, i) => (
                      <a
                        key={i}
                        href={review.pullRequest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate">
                              {review.pullRequest.title}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {review.pullRequest.repository.owner.login}/{review.pullRequest.repository.name} #{review.pullRequest.number}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

                {/* Empty state for selected category */}
                {selectedCategory === 'commits' && (!details?.commitDetails || details.commitDetails.length === 0) && (
                  <div className="text-center py-16 text-gray-400">
                    <p>No commits found for this day</p>
                  </div>
                )}
                {selectedCategory === 'prs' && details?.pullRequestContributions.nodes.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p>No pull requests found for this day</p>
                  </div>
                )}
                {selectedCategory === 'issues' && details?.issueContributions.nodes.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p>No issues found for this day</p>
                  </div>
                )}
                {selectedCategory === 'reviews' && details?.pullRequestReviewContributions.nodes.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p>No reviews found for this day</p>
                  </div>
                )}
              </div>

              {/* No activity message */}
              {details &&
               totalCommits === 0 &&
               totalIssues === 0 &&
               totalPRs === 0 &&
               totalReviews === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p>No detailed activity found for this day</p>
                  <p className="text-sm mt-2">GitHub may count some private contributions</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
