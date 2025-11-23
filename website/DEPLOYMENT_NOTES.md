# GitHub Heatmap - Deployment Checklist

## For Production (Vercel)

The heatmap is configured to use your existing `TRAFFIC_PAT` secret automatically.

### ✅ Already Configured:
- Code uses `TRAFFIC_PAT` as fallback token
- `.env.local` is gitignored
- Component handles authentication properly

### 🔧 What You Need to Do:

1. **Add Environment Variable to Vercel:**
   - Go to your Vercel project settings
   - Navigate to: Settings → Environment Variables
   - Add: `NEXT_PUBLIC_GITHUB_USERNAME` = `your-actual-username`
   - `TRAFFIC_PAT` should already be configured

2. **Redeploy** (if needed)
   - Vercel will automatically pick up the new environment variable
   - Or trigger a manual redeploy

## For Local Development

1. **Edit `.env.local`:**
   ```bash
   NEXT_PUBLIC_GITHUB_USERNAME=your-actual-username
   GITHUB_TOKEN=your_token_or_traffic_pat
   ```

2. **Restart dev server:**
   ```bash
   node_modules/.bin/next dev -p 3000
   ```

## Token Fallback Priority

The code tries tokens in this order:
1. `GITHUB_TOKEN` (local dev)
2. `TRAFFIC_PAT` (production)

```tsx
token={process.env.GITHUB_TOKEN || process.env.TRAFFIC_PAT}
```

## Rate Limits

- **Without token**: 60 requests/hour (will hit rate limit quickly)
- **With token**: 5,000 requests/hour (plenty for production)

Your `TRAFFIC_PAT` should handle this perfectly in production!
