# Portfolio Website

Professional portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark mode support
- ⚡ Optimized performance with Next.js 15 and React 19
- 🎯 Type-safe with TypeScript
- 💅 Styled with Tailwind CSS v4
- 🚀 Automated deployment to Vercel
- 🤖 AI-powered development assistance with Claude Code

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
website/
├── src/
│   └── app/
│       ├── page.tsx       # Main landing page
│       ├── layout.tsx     # Root layout
│       └── globals.css    # Global styles
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com)

## Deployment

The site is automatically deployed to Vercel on every push to the main branch via GitHub Actions.

Manual deployment:

```bash
npm run build
vercel deploy --prod
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
