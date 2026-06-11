# RepoSense AI

RepoSense AI is an AI-powered GitHub repository analyzer that helps developers evaluate project quality, resume readiness, and improvement opportunities.

## Features

- Analyze any public GitHub repository
- Detect tech stack and project level
- Generate code quality, documentation, folder structure, and maintainability scores
- Show resume readiness status
- Provide recruiter-focused project feedback
- Detect missing files like README, LICENSE, CONTRIBUTING, and .env.example
- Generate project-specific improvement suggestions
- Show portfolio score and uniqueness score

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- GitHub REST API
- Gemini AI

## How It Works

1. User enters a GitHub repository URL.
2. The app fetches repository data using GitHub API.
3. It analyzes files, languages, issues, stars, and structure.
4. It calculates scores and generates improvement suggestions.
5. Gemini AI generates recruiter-focused feedback when API quota is available.

## Setup

```bash
git clone https://github.com/vishnupriyavanam/RepoSense-AI.git
cd RepoSense-AI
npm install
npm run dev