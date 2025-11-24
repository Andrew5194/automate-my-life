.PHONY: dev build start install clean lint help

# Directory
WEBSITE_DIR = website

# Development server
dev:
	@echo "🚀 Starting Next.js development server..."
	@cd $(WEBSITE_DIR) && node_modules/.bin/next dev -p 3000

# Production build
build:
	@echo "🔨 Building for production..."
	@cd $(WEBSITE_DIR) && node_modules/.bin/next build

# Start production server
start:
	@echo "▶️  Starting production server..."
	@cd $(WEBSITE_DIR) && node_modules/.bin/next start -p 3000

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@cd $(WEBSITE_DIR) && npm install

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	@cd $(WEBSITE_DIR) && rm -rf .next out
	@echo "✅ Clean complete"

# Run linter
lint:
	@echo "🔍 Running ESLint..."
	@cd $(WEBSITE_DIR) && node_modules/.bin/next lint

# Help command
help:
	@echo "Available commands:"
	@echo "  make dev      - Start development server on port 3000"
	@echo "  make build    - Build for production"
	@echo "  make start    - Start production server"
	@echo "  make install  - Install dependencies"
	@echo "  make lint     - Run ESLint"
	@echo "  make clean    - Remove build artifacts"
	@echo "  make help     - Show this help message"
