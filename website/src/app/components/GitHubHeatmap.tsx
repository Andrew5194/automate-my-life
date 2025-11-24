'use client';

import { useState, useEffect } from 'react';
import { fetchContributions, ContributionDay } from '../lib/githubAPI';
import { calculateStatistics, getContributionLevel, Statistics } from '../lib/analytics';
import DayDetailsModal from './DayDetailsModal';

interface GitHubHeatmapProps {
  username: string;
  token?: string;
}

export default function GitHubHeatmap({ username, token }: GitHubHeatmapProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [hoveredChartDay, setHoveredChartDay] = useState<{ day: ContributionDay; index: number; rolling14: number } | null>(null);

  useEffect(() => {
    async function loadContributions() {
      try {
        setLoading(true);
        const data = await fetchContributions(username, token);
        setContributions(data.contributions);
        setStats(calculateStatistics(data.contributions));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, [username, token]);

  const handleCellHover = (contrib: ContributionDay) => {
    setHoveredDay(contrib);
  };

  const handleCellLeave = () => {
    setHoveredDay(null);
  };

  const handleCellClick = (contrib: ContributionDay) => {
    setSelectedDay(contrib);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!stats || contributions.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-400">No contribution data available</p>
      </div>
    );
  }

  const maxContributions = Math.max(...contributions.map(c => c.count));
  const sorted = [...contributions].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group contributions by week
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  sorted.forEach((contrib, index) => {
    const date = new Date(contrib.date);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(contrib);

    if (index === sorted.length - 1) {
      weeks.push(currentWeek);
    }
  });

  return (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Contributions', value: stats.total },
          { label: 'Current Streak', value: `${stats.currentStreak} days` },
          { label: 'Longest Streak', value: `${stats.longestStreak} days` },
          { label: 'Daily Average', value: stats.avgDaily },
          { label: '7-Day Rolling Avg', value: stats.rolling7 },
          { label: '30-Day Rolling Avg', value: stats.rolling30 }
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-lg p-4 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Contribution Heatmap</h3>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Heatmap Grid */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-1 w-fit p-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1 flex-shrink-0">
                    {week.map((day, dayIndex) => {
                      const level = getContributionLevel(day.count, maxContributions);
                      return (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-emerald-400 hover:scale-125 ${
                            level === 0
                              ? 'bg-gray-800 border border-gray-700'
                              : level === 1
                              ? 'bg-emerald-900'
                              : level === 2
                              ? 'bg-emerald-700'
                              : level === 3
                              ? 'bg-emerald-500'
                              : 'bg-emerald-400'
                          }`}
                          onMouseEnter={() => handleCellHover(day)}
                          onMouseLeave={handleCellLeave}
                          onClick={() => handleCellClick(day)}
                          title="Click to view details"
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-800 border border-gray-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Details Panel */}
          <div className="flex-1 min-w-0 lg:min-w-[300px]">
            {hoveredDay ? (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-full min-h-[200px]">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Date</div>
                    <div className="text-sm font-semibold text-white">
                      {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Contributions</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {hoveredDay.count}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Activity Level</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((hoveredDay.count / maxContributions) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {maxContributions > 0 ? Math.round((hoveredDay.count / maxContributions) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  {hoveredDay.count > 0 && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="text-xs text-emerald-400">
                        {hoveredDay.count === 1 ? '1 contribution' : `${hoveredDay.count} contributions`} on this day
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/30 border border-gray-700 border-dashed rounded-lg p-4 h-full min-h-[200px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Hover over a day to see details</p>
                  <p className="text-xs mt-2">Click any day for full activity breakdown</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <DayDetailsModal
          username={username}
          date={selectedDay.date}
          contributionCount={selectedDay.count}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* Contribution Trend Chart */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Contribution Trends</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500/50 rounded"></div>
              <span className="text-gray-400">Daily Contributions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-cyan-400"></div>
              <span className="text-gray-400">14-Day Avg</span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
            {[...Array(6)].map((_, i) => {
              const value = Math.round((5 - i) * (Math.max(...contributions.slice(-90).map(c => c.count)) / 5));
              return <div key={i}>{value}</div>;
            })}
          </div>

          {/* Chart container */}
          <div className="ml-10 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full border-t border-gray-800"></div>
              ))}
            </div>

            {/* Bars and line */}
            <div className="absolute inset-0 flex items-end gap-px">
              {contributions.slice(-90).map((day, i) => {
                const last90 = contributions.slice(-90);
                const maxContrib = Math.max(...last90.map(c => c.count));
                const height = maxContrib > 0 ? (day.count / maxContrib) * 100 : 0;

                // Calculate 14-day rolling average for this day
                const start = Math.max(0, i - 7);
                const end = Math.min(last90.length, i + 7);
                const window = last90.slice(start, end);
                const rolling14 = window.reduce((sum, d) => sum + d.count, 0) / window.length;

                return (
                  <div
                    key={i}
                    className="flex-1 relative group"
                    onMouseEnter={() => setHoveredChartDay({ day, index: i, rolling14 })}
                    onMouseLeave={() => setHoveredChartDay(null)}
                  >
                    <div
                      className="w-full bg-emerald-500/50 hover:bg-emerald-500/70 transition-colors rounded-t cursor-pointer"
                      style={{ height: `${height}%`, minHeight: day.count > 0 ? '2px' : '0' }}
                    ></div>
                  </div>
                );
              })}
            </div>

            {/* 14-day rolling average line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="rgb(34, 211, 238)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                points={(() => {
                  const last90 = contributions.slice(-90);
                  const maxContrib = Math.max(...last90.map(c => c.count));

                  if (maxContrib === 0) return '0,100 100,100';

                  const points: string[] = [];

                  last90.forEach((day, i) => {
                    // Calculate 14-day rolling average centered on current day
                    const start = Math.max(0, i - 7);
                    const end = Math.min(last90.length, i + 7);
                    const window = last90.slice(start, end);
                    const avg = window.reduce((sum, d) => sum + d.count, 0) / window.length;

                    const x = (i / (last90.length - 1)) * 100;
                    const y = 100 - (avg / maxContrib) * 100;
                    points.push(`${x},${y}`);
                  });

                  return points.join(' ');
                })()}
              />
            </svg>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredChartDay && (
          <div className="absolute bottom-0 left-10 right-0 mb-2 flex justify-center pointer-events-none">
            <div className="bg-gray-900 border border-cyan-500/50 rounded-lg px-4 py-3 shadow-xl">
              <div className="text-xs text-gray-400 mb-1">
                {new Date(hoveredChartDay.day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <div className="text-xs text-gray-400">Daily:</div>
                <div className="text-sm font-semibold text-emerald-400">
                  {hoveredChartDay.day.count} {hoveredChartDay.day.count === 1 ? 'contribution' : 'contributions'}
                </div>
                <div className="text-xs text-gray-400">14-Day Avg:</div>
                <div className="text-sm font-semibold text-cyan-400">
                  {hoveredChartDay.rolling14.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* X-axis timeline */}
        <div className="ml-10 mt-2 flex justify-between text-xs text-gray-500">
          <span>{new Date(contributions.slice(-90)[0]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span>Last 90 Days</span>
          <span>{new Date(contributions.slice(-1)[0]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
