#!/bin/bash

echo "🔍 Checking current directory..."
echo "📂 Current path: $(pwd)"

# Check if it's a git repo
if [ ! -d .git ]; then
  echo "❌ This is NOT a git repository. Navigate into your luxecampusa repo folder first."
  exit 1
fi

echo "✅ This is a Git repository."

# Show Git status
echo ""
echo "🧾 Git status:"
git status

# Show unstaged differences
echo ""
echo "🔄 Changed files:"
git diff --name-only

# Show untracked files
echo ""
echo "📁 Untracked files:"
git ls-files --others --exclude-standard

echo ""
echo "🛠 To stage and commit changes, run:"
echo "   git add ."
echo "   git commit -m "Your message here""
echo "   git push origin main"
