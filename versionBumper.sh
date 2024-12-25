#!/bin/bash

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in the current directory."
  exit 1
fi

# Check if there are uncommitted changes in git
if [[ $(git status --porcelain) ]]; then
  echo "Error: You have uncommitted changes. Please commit or stash them before bumping the version."
  exit 1
fi

# Get the current branch name
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Get the current version from package.json
CURRENT_VERSION=$(grep '"version"' package.json | sed -E 's/.*"version": "(.*)",/\1/')
echo "Current version: $CURRENT_VERSION"

# Prompt user for the new version
read -p "Enter the new version (e.g., 1.0.1): " NEW_VERSION

# Validate the new version
if [[ ! $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: Invalid version format. Please use semantic versioning (e.g., 1.0.1)."
  exit 1
fi

# Update the version in package.json
sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

# Remove the backup file created by sed (for macOS compatibility)
if [ -f "package.json.bak" ]; then
  rm package.json.bak
fi

echo "Version updated to $NEW_VERSION in package.json."

# Commit the change
git add package.json
git commit -m "(${BRANCH_NAME}): Bump version to ${NEW_VERSION}"

# Optional: Tag the new version
read -p "Do you want to tag this version in git? (y/n): " TAG_VERSION
if [[ "$TAG_VERSION" == "y" || "$TAG_VERSION" == "Y" ]]; then
  git tag "v$NEW_VERSION"
  echo "Tagged version v$NEW_VERSION."
fi

echo "Done! Don't forget to push your changes and tags if needed:"
echo "  git push"
echo "  git push --tags"
