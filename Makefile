# Whenever you update packages in package.json, run this command to install those package updates.
.PHONY: install
install:
	@clear
	@echo "📦 Installing packages...\n"
	@pnpm install


# -------------------------
# Linting and Formatting
# Prettier handles quotes, semicolons, and commas. 
# ESLint handles brace-style. The eslint-plugin-only-warn you already have ensures all rules show as warnings, not errors!
# -------------------------

# Check code linting.
.PHONY: lint-check
lint-check:
	@clear
	@echo "🔍 Checking code linting...\n"
	@pnpm run lint:check


# Fix code linting.
.PHONY: lint-fix
lint-fix:
	@clear
	@echo "✏️ Fixing code linting...\n"
	@pnpm run lint:fix


# Check code formatting.
.PHONY: format-check
format-check:
	@clear
	@echo "🔍 Checking code formats...\n"
	@pnpm run format:check


# Fix code formatting.
.PHONY: format-fix
format-fix:
	@clear
	@echo "✏️ Fixing code formats...\n"
	@pnpm run format:fix


# -------------------------
# Development
# -------------------------

# Run this target to start all the projects in the "app" folder that have a "dev" script defined.
.PHONY: dev
dev:
	@clear
	@echo "🚀 Starting Nextjs development server...\n"
	@pnpm run dev


# -------------------------
# Build
# You should run the build commands after making new changes to make sure that your applications are still compiling.
# -------------------------

.PHONY: build-staging
build-staging:
	@clear
	@echo "🛠️  Building projects for staging to make sure they still compile and work...\n"
	@pnpm run build:staging

.PHONY: build-prod
build-prod:
	@clear
	@echo "🛠️  Building projects for production to make sure they still compile and work...\n"
	@pnpm run build:prod


# -------------------------
# Miscellaneous
# -------------------------

.PHONY: kill
kill:
	-kill -9 $(lsof -t -i:3000) || true

# Kill process on port
# fuser -k 3000/tcp 
