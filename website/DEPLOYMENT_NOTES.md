# GitHub Heatmap - Deployment Checklist

## For Production (Vercel)

### 🔧 Environment Variables Required:

1. **Add these to Vercel:**
   - Go to your Vercel project settings
   - Navigate to: Settings → Environment Variables
   - Add the following:
     - `NEXT_PUBLIC_GITHUB_USERNAME` = `Andrew5194`
     - `GITHUB_TOKEN` = `your-github-token` (with `read:user` scope)

2. **Redeploy:**
   - Vercel will automatically redeploy when you push changes
   - Or trigger a manual redeploy from the Vercel dashboard

### ✅ Security Features:
- `.env.local` is gitignored (tokens never committed)
- Token is only used server-side via API route
- Client never has access to the token

## For Local Development

1. **Edit `.env.local`:**
   ```bash
   NEXT_PUBLIC_GITHUB_USERNAME=Andrew5194
   GITHUB_TOKEN=your_github_token_here
   ```

2. **Create a GitHub Token:**
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Select scopes:
     - `read:user` (for contribution calendar)
     - `repo` (for accessing repository activity details when clicking on days)
   - Copy and paste into `.env.local`

3. **Restart dev server:**
   ```bash
   node_modules/.bin/next dev -p 3000
   ```

## How It Works

The GitHub API calls are made server-side via `/api/github-contributions`:
- ✅ Client calls `/api/github-contributions?username=Andrew5194`
- ✅ API route uses `GITHUB_TOKEN` from environment
- ✅ Token stays secure on the server
- ✅ No rate limit issues (5,000 requests/hour with token)

## Rate Limits

- **Without token**: 60 requests/hour (not enough)
- **With token**: 5,000 requests/hour ✅
