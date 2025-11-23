# GitHub Contribution Heatmap

This feature adds a GitHub-style contribution heatmap to your website with advanced analytics capabilities.

## Features

- **Real-time GitHub Data**: Fetches contribution data directly from GitHub's GraphQL API
- **Statistics Dashboard**:
  - Total contributions
  - Current streak
  - Longest streak
  - Daily average
  - 7-day rolling average
  - 30-day rolling average
- **Visual Heatmap**: GitHub-style calendar view with color-coded activity levels
- **Rolling Average Chart**: Visualize trends over the last 90 days
- **Interactive Tooltips**: Hover over any day to see detailed contribution counts

## Setup

### 1. Replace Username

In [page.tsx](src/app/page.tsx#L186), replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```tsx
<GitHubHeatmap username="your-username-here" />
```

### 2. (Optional) Add GitHub Token

For higher rate limits and private contribution data, you can provide a GitHub Personal Access Token:

```tsx
<GitHubHeatmap username="your-username" token="your-github-token" />
```

**To create a GitHub token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `read:user` (for public data only)
4. Copy the token and store it securely

**Important**: Never commit tokens to your repository! Use environment variables:

```tsx
<GitHubHeatmap
  username={process.env.NEXT_PUBLIC_GITHUB_USERNAME}
  token={process.env.GITHUB_TOKEN}
/>
```

## Files Structure

```
src/app/
├── components/
│   └── GitHubHeatmap.tsx        # Main React component
├── lib/
│   ├── githubAPI.ts             # GitHub API integration
│   └── analytics.ts             # Analytics and calculations
└── page.tsx                      # Homepage integration
```

## Component Architecture

### GitHubHeatmap.tsx
The main React component that:
- Fetches contribution data on mount
- Manages loading and error states
- Renders the heatmap grid
- Displays statistics
- Shows rolling average visualization

### githubAPI.ts
Handles all GitHub API interactions:
- `fetchContributions()`: Fetches data via GraphQL API
- Parses response into normalized format

### analytics.ts
Provides analytical functions:
- `calculateStatistics()`: Comprehensive stats calculation
- `calculateRollingAverage()`: Rolling window averages
- `calculateCurrentStreak()`: Active contribution streak
- `calculateLongestStreak()`: Historical best streak
- `getContributionLevel()`: Maps contribution count to color level (0-4)

## Customization

### Colors
The heatmap uses Tailwind CSS classes. To customize colors, edit [GitHubHeatmap.tsx](src/app/components/GitHubHeatmap.tsx):

```tsx
// Current colors (emerald/cyan theme)
level === 1 ? 'bg-emerald-900' :
level === 2 ? 'bg-emerald-700' :
level === 3 ? 'bg-emerald-500' :
'bg-emerald-400'

// Example: Change to blue theme
level === 1 ? 'bg-blue-900' :
level === 2 ? 'bg-blue-700' :
level === 3 ? 'bg-blue-500' :
'bg-blue-400'
```

### Layout
The component is fully responsive and matches your existing design system. You can:
- Adjust grid columns in the stats section
- Change the rolling average timeframe (currently 90 days)
- Modify the chart height

### Additional Analysis

The analytics module provides many calculated fields you can display:

```tsx
stats.activeDays          // Days with at least 1 contribution
stats.totalDays          // Total days tracked
stats.maxDay             // Day with most contributions
stats.byDayOfWeek        // Average by day of week
stats.byMonth            // Monthly breakdown
```

To add these to your component:

```tsx
<div className="text-sm text-gray-400">
  Most productive day: {stats.maxDay.date} ({stats.maxDay.count} contributions)
</div>
```

## API Rate Limits

**Without token**: 60 requests per hour
**With token**: 5,000 requests per hour

The component fetches data once on mount, so rate limits are rarely an issue.

## Browser Compatibility

- Modern browsers with ES6+ support
- CSS Grid support required
- Fetch API required (or polyfill)

## Performance

- Initial fetch: ~500ms (depends on network)
- Rendering: <100ms for full year of data
- No external dependencies beyond Next.js and React

## Troubleshooting

### "User not found" error
- Verify the username is correct
- Check if the user's profile is public

### "Rate limit exceeded"
- Add a GitHub token to increase limits
- Cache the data to reduce API calls

### Empty heatmap
- User may have no public contributions
- Private contributions require authentication with appropriate token scopes

## Future Enhancements

Possible additions you could implement:
- **Daily/Weekly/Monthly views**: Switch between different time ranges
- **Export functionality**: Download contribution data as CSV
- **Comparison mode**: Compare multiple users
- **Language breakdown**: Show most-used programming languages
- **Repository highlights**: Link to top contributed repos
- **Streak notifications**: Alert when approaching a streak milestone

## License

This implementation uses GitHub's public API. Make sure to follow GitHub's API terms of service and rate limiting guidelines.
