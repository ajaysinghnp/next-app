#!/usr/bin/env bash
set -e

# Print start message
echo "🔍 Linting Staged Files..."

# Run Next.js linting
if command -v pnpm &> /dev/null; then
    pnpm lint
elif command -v npm &> /dev/null; then
    npm run lint
else
    echo "Error: Neither pnpm nor npm found"
    exit 1
fi

# Exit with the lint command's exit code
exit $?