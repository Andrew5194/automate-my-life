'use client';

import { useState, useEffect } from 'react';
import { fetchContributions, ContributionDay } from '../lib/githubAPI';
import { calculateStatistics, getContributionLevel, Statistics } from '../lib/analytics';

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
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const handleCellHover = (contrib: ContributionDay, event: React.MouseEvent) => {
    setHoveredDay(contrib);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleCellLeave = () => {
    setHoveredDay(null);
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

        <div className="overflow-x-auto pb-4">
          <div className="inline-flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const level = getContributionLevel(day.count, maxContributions);
                  return (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gray-300 ${
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
                      onMouseEnter={(e) => handleCellHover(day, e)}
                      onMouseLeave={handleCellLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
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

      {/* Rolling Average Chart */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Rolling Averages</h3>
        <div className="h-64 flex items-end gap-1">
          {stats.rolling7Data.slice(-90).map((point, i) => {
            const height = (point.value / Math.max(...stats.rolling7Data.map(p => p.value))) * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-emerald-600 to-cyan-500 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                style={{ height: `${height}%`, minHeight: '2px' }}
                title={`${point.date}: ${point.value.toFixed(2)} avg`}
              />
            );
          })}
        </div>
        <div className="text-sm text-gray-400 mt-4 text-center">
          Last 90 days • 7-day rolling average
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-semibold text-white">
            {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
      )}
    </div>
  );
}
