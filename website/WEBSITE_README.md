# Digital Solutions Pro Website

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional layout with dark mode support
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance**: Built with Next.js for optimal loading speeds
- **SEO Optimized**: Proper metadata and semantic HTML structure
- **Type Safe**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel with GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Navigate to the website directory:
   ```bash
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Deployment

The website is automatically deployed to Vercel via GitHub Actions:

- **Production**: Deploys when changes are pushed to the `main` branch
- **Preview**: Deploys preview environments for pull requests

### Required Secrets

To enable automatic deployment, add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Project Structure

```
website/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout component
│       ├── page.tsx            # Homepage component
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── .github/workflows/          # GitHub Actions workflows
├── vercel.json                 # Vercel configuration
└── package.json               # Dependencies and scripts
```

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- The project uses Tailwind CSS v4 with CSS-first configuration

### Content
- Edit `src/app/page.tsx` to modify the homepage content
- Update `src/app/layout.tsx` to change site metadata
- Add new pages by creating new files in the `src/app/` directory

### Branding
- Replace company name "Digital Solutions Pro" with your brand
- Update contact information in the footer
- Modify the color scheme by updating Tailwind classes

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run dev`
4. Run linting with `npm run lint`
5. Submit a pull request

## License

This project is part of the automate-my-life repository.