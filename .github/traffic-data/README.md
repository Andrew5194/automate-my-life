# Repository Traffic Data

This folder contains historical traffic data for the repository, automatically collected daily.

## Data File

**`traffic-history.csv`** - Cumulative historical traffic data

### CSV Structure

| Column | Description |
|--------|-------------|
| `date` | Date (YYYY-MM-DD) |
| `views` | Repository views on that specific day |
| `unique_visitors` | Unique visitors on that specific day |
| `clones` | Repository clones on that specific day |
| `unique_cloners` | Unique cloners on that specific day |

### Example Data

```csv
date,views,unique_visitors,clones,unique_cloners
2025-10-18,162,1,33,17
2025-10-19,45,2,5,3
2025-10-20,38,1,8,5
2025-10-21,52,3,7,4
2025-10-22,41,2,6,3
```

**Note:**
- Each row represents metrics for that specific day only (not cumulative)
- The workflow runs daily and extracts all available daily data from GitHub's API
- GitHub API provides up to 14 days of daily breakdowns
- On first run, it will backfill available historical data from the past 14 days
- Subsequent runs add only new days that don't already exist in the CSV

## How It Works

The `track-traffic.yml` workflow runs daily at midnight UTC and:
1. Fetches current traffic data from GitHub API
2. Extracts daily metrics for each day
3. Appends new days to the CSV (avoiding duplicates)
4. Commits changes to the repository

GitHub only retains 14 days of traffic data, so this workflow archives it for long-term analysis.

## Setup Required

**Create a Personal Access Token (PAT):**

1. Go to GitHub Settings → [Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Name it: `Traffic Data Access`
4. Set expiration: Choose your preference (recommend: No expiration or 1 year)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
     - This includes access to traffic data
6. Click **Generate token**
7. Copy the token immediately (you won't see it again!)

**Add the token to your repository:**

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Name: `TRAFFIC_PAT`
4. Value: Paste your token
5. Click **Add secret**

The workflow will now be able to access traffic data.

## Automation

- **Scheduled**: Runs automatically every day at 00:00 UTC
- **Manual**: Can be triggered manually from the Actions tab (workflow_dispatch)

## Privacy

All data comes from GitHub's traffic API and contains no personal information about visitors.
