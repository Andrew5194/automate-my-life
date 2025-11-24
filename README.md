# AML - Automate My Life ⚡

A productivity platform designed to help you take control of your time, amplify your impact, and focus on what truly matters.

**Open source, self-hostable, and ready to transform your workflow.**

## 📁 Project Structure

```
automate-my-life/
├── website/              # AML productivity platform (Next.js)
├── .github/              # GitHub Actions & workflows
├── docker-compose.yml    # Self-hosting configuration
├── SELF_HOSTING.md       # Self-hosting guide
└── scripts/              # Productivity automation scripts (coming soon)
```

## 🚀 Features

- **Productivity Dashboard**: Modern Next.js platform with real-time activity tracking
- **GitHub Integration**: Track development progress and contributions
- **Smart Analytics**: Visual insights into your work patterns and productivity
- **Self-Hostable**: Full Docker deployment with PostgreSQL and Redis
- **Open Source**: MIT licensed, community-driven development

## 🚀 Getting Started

### Option 1: Self-Hosting with Docker (Recommended)

Deploy AML using Docker with all services included:

```bash
# Clone the repository
git clone https://github.com/Andrew5194/automate-my-life.git
cd automate-my-life

# Initial setup
make docker-install

# Edit .env with your configuration
nano .env

# Build and start services
make docker-build
make docker-start

# Access at http://localhost:3000
```

See [SELF_HOSTING.md](SELF_HOSTING.md) for detailed instructions.

**Quick Commands:**
- `make docker-start` - Start all services
- `make docker-stop` - Stop all services
- `make docker-logs` - View logs
- `make docker-backup` - Backup database
- `make help` - See all commands

The Docker image is automatically built and published to [Docker Hub](https://hub.docker.com/r/andrew5194/automate-my-life) via GitHub Actions.

### Option 2: Local Development

For development and testing without Docker.

```bash
# Clone the repository
git clone https://github.com/Andrew5194/automate-my-life.git
cd automate-my-life

# Install dependencies
make install

# Start development server
make dev

# Access at http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! This is an open-source project built for the community.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.