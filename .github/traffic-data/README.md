# Repository Traffic Data

This folder contains historical traffic data for the repository, automatically collected daily.

## Data Files

- `views-YYYY-MM-DD.json` - Daily snapshot of repository views
- `clones-YYYY-MM-DD.json` - Daily snapshot of repository clones
- `latest-summary.json` - Most recent combined stats

## Data Structure

### Views Data
```json
{
  "count": 162,
  "uniques": 1,
  "views": [
    {
      "timestamp": "2025-10-18T00:00:00Z",
      "count": 162,
      "uniques": 1
    }
  ]
}
```

### Clones Data
```json
{
  "count": 37,
  "uniques": 20,
  "clones": [
    {
      "timestamp": "2025-10-18T00:00:00Z",
      "count": 33,
      "uniques": 17
    }
  ]
}
```

## How It Works

The `track-traffic.yml` workflow runs daily at midnight UTC and:
1. Fetches current traffic data from GitHub API
2. Stores snapshots with timestamps
3. Updates the latest summary
4. Commits changes to the repository

GitHub only retains 14 days of traffic data, so this workflow archives it for long-term analysis.

## Automation

- **Scheduled**: Runs automatically every day at 00:00 UTC
- **Manual**: Can be triggered manually from the Actions tab

## Privacy

All data comes from GitHub's public traffic API and contains no personal information about visitors.
