# AML - Productivity Platform

A modern productivity platform built with Next.js, designed to help you master your time and amplify your impact.

## Features

- **GitHub Activity Dashboard**: Track contributions with interactive heatmaps and detailed analytics
- **Productivity Metrics**: Real-time insights into your work patterns and achievements
- **Smart Analytics**: 7-day and 30-day rolling averages, streak tracking, and more
- **Responsive Design**: Beautiful UI optimized for all devices

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform.

## Environment Setup

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_TOKEN=your-github-token
```

See [DEPLOYMENT_NOTES.md](DEPLOYMENT_NOTES.md) for detailed configuration instructions.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **APIs**: GitHub GraphQL & REST
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes for GitHub integration
│   ├── components/       # React components (Heatmap, Modal, etc.)
│   ├── lib/             # Utility functions and analytics
│   └── page.tsx         # Main landing page
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Tailwind CSS](https://tailwindcss.com/docs)
