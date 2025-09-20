# Claude Code GitHub Action Setup

This repository is configured with the Claude Code GitHub Action to provide AI assistance for development tasks.

## How It Works

The Claude Code GitHub Action is triggered when you mention `@claude-code` in:
- Issue descriptions or comments
- Pull request descriptions or comments
- Pull request review comments

## Setup Requirements

To enable the Claude Code GitHub Action, you need to add your Anthropic API key as a repository secret:

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the following secret:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key (get one from [console.anthropic.com](https://console.anthropic.com))

## Usage Examples

### In Issues
```markdown
I need help implementing a login feature. @claude-code can you help me create:
1. A login form component
2. Authentication logic
3. User session management
```

### In Pull Requests
```markdown
@claude-code please review this code and suggest improvements for performance and security.
```

### In Comments
```markdown
@claude-code can you help me fix the TypeScript errors in this file?
```

## Features

- ✅ **Code Reviews**: AI-powered code review and suggestions
- ✅ **Implementation Help**: Assistance with feature development
- ✅ **Bug Fixes**: Help identifying and fixing issues
- ✅ **Best Practices**: Suggestions for code improvements

## Authoring

Commits made by Claude Code via GitHub Actions will be authored by:
- **Author**: Claude Code (github-actions bot)

Co-authoring with your GitHub account is only configured for local commits made through Claude Code CLI, not for GitHub Action commits.

## Permissions

The Claude Code action has the following permissions:
- `contents: write` - To make code changes and commits
- `issues: write` - To comment on issues
- `pull-requests: write` - To comment on and review PRs
- `actions: read` - To access workflow information

## Getting Started

1. Add your `ANTHROPIC_API_KEY` secret (see Setup Requirements above)
2. Create an issue or PR and mention `@claude-code` with your request
3. Claude Code will respond with assistance and can make commits if needed

The action is now ready to use! Simply mention `@claude-code` in any issue or PR to get AI assistance.