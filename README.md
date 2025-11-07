# Pixel Pulse News

Pixel Pulse is a youth-led initiative dedicated to tech journalism, STEM research, and educational content. Our mission is to provide valuable insights, emerging trends, breaking news, and STEM- related opportunities to empower students and tech enthusiasts.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone & Setup](#2-clone--setup)
  - [3. Configure Environment](#3-configure-environment)
  - [4. Install Dependencies](#4-install-dependencies)
  - [5. Start Development Server](#5-start-development-server)
- [Project Structure](#project-structure)
- [Admin Access](#admin-access)
- [Learn More](#learn-more)
- [Task Management](#task-management)
- [Credits](#credits)

---

## Overview

This platform is maintained by [Pixel Pulse News](https://www.pixelpulsenews.org/), a nonprofit empowering the next generation through STEM education.

---

## Tech Stack

- **Next.js + TypeScript** (Development)
- **Drizzle ORM + Neon** (Database)
- **Shadcn + Tailwind CSS** (Styling)
- **Github + Vercel** (Hosting)

---

## Getting Started

### 1. Prerequisites

Ensure the following required tools are installed:

- [Node.js](https://nodejs.org/en/download/package-manager)
- [Git](https://git-scm.com/install/)

> If you run into issues, message Glenn (glenniii.dev) on Discord.

### 2. Clone & Setup

```bash
git clone https://github.com/glenniii-dev/pixelpulsenews.git
cd pixelpulsenews
```
create branch with name following the below convention
`user/<github_user_name>/<issue_number>`

### 3. Configure Environment

Create a `.env` file in the root directory:

```
DATABASE_URL =

JWT_SECRET = 

NEXT_PUBLIC_BASE_URL = 
```

⚠️ Do **not** commit this file. Never share real credentials in public spaces.

> If you run into issues, message Glenn (glenniii.dev) on Discord.

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## Project Structure
<pre>
pixelpulsenews/
📂 ├── .next/ # Next.js build cache (auto-generated)
📂 ├── app/ # Next.js App Router (pages, layouts, API)
│ 📂 ├── (root)/ # Shared layout for all pages
│ 📂 ├── admin/ # Admin dashboard routes
│ 📂 ├── api/ # Server-side API routes
│ 📂 └── newsletters/ # Newsletter routes
│ 📂 └── [slug]/ # Dynamic newsletter route
│ 📄 └── route.ts # Route handler for each newsletter
│
📂 ├── components/ # Reusable UI components
│ 📂 ├── admin/ # Admin-specific components
│ 📂 ├── cards/ # Card-style components
│ 📂 ├── layout/ # Layout components (header, footer, sidebar)
│ 📂 └── ui/ # General UI primitives (buttons, inputs, modals)
│
📂 ├── db/ # Database layer
│ 📄 ├── db.ts # Database client / connection setup
│ 📄 ├── migrate.ts # Migration runner script
│ 📄 └── schema.ts # Table schemas and definitions
│
📂 ├── drizzle/ # Drizzle ORM migration snapshots
│ 📂 ├── meta/ # Metadata snapshots for SEO / pages
│ │ 📄 ├── journal.json # Metadata for journal pages
│ │ 📄 ├── 0000_snapshot.json # Initial metadata snapshot
│ │ 📄 └── 0001_snapshot.json # Second metadata snapshot
│ 📄 ├── 0000_snapshot.json # Initial database snapshot
│ 📄 └── 0001_snapshot.json # Second database snapshot
│
📂 ├── lib/ # Feature modules / library functions
│ 📄 ├── newsletters.ts # Newsletter-related logic
│ 📄 └── utils.ts # Shared library utility functions
│
📂 ├── public/ # Static assets (served as-is)
│ 📄 ├── favicon.ico # Browser favicon
│ 📄 ├── apple-icon.png # iOS home screen icon
│ 📄 ├── icon0.svg # SVG icon (dark mode)
│ 📄 └── icon1.png # Additional image/icon asset
│
📂 ├── types/ # Global TypeScript type definitions
│ 📄 ├── Article.ts # Article-related types
│ 📄 └── Member.ts # Member/user-related types
│
📂 ├── utils/ # General utility functions
│ 📄 ├── articles.ts # Functions for articles
│ 📄 ├── community.ts # Functions for community features
│ 📄 ├── newsletters.ts # Newsletter helper functions
│ 📄 ├── podcast.ts # Podcast-related utilities
│ 📄 ├── research.ts # Research data helper functions
│ 📄 └── team.ts # Team-related utilities
│
📄 ├── .env # Local environment variables (do not commit)
📄 ├── .env.example # Template for environment variables
📄 ├── drizzle.config.ts # Drizzle ORM configuration file
📄 ├── eslint.config.mjs # ESLint configuration
📄 ├── globals.css # Global styles (Tailwind, resets)
📄 ├── layout.tsx # Root layout wrapping all pages
📄 ├── manifest.json # PWA manifest file
📄 ├── next-env.d.ts # Next.js TypeScript typings
📄 ├── next.config.ts # Next.js configuration file
📂 ├── node_modules/ # Installed npm dependencies (auto-generated)
📄 ├── package.json # Project metadata and npm scripts
📄 ├── package-lock.json # npm lockfile (versioned dependencies)
📄 ├── postcss.config.mjs # PostCSS configuration (Tailwind setup)
📄 ├── proxy.ts # API proxy utilities
📄 ├── README.md # Project documentation
📄 └── tsconfig.json # TypeScript compiler options
</pre>
---

## Admin Access

If what your working on involves admin access to the site follow these steps:

1. Get user ID and PASSWORD (e.g., `"user_ABC123"`) from **Glenn (glenniii.dev) on Discord**

2. Visit `/admin` route locally or on [production site](https://pixelpulsenews.org)

Admin routes interact with API endpoints in `/api`.

---

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

---

## Task Management

As you complete chapters or platform features, please:

- Close GitHub issues assigned to you
- Use GitHub Projects for task tracking

⚠️ **Note:** Never run database migrations  or pushes without explicit permission from the project admin. Doing so could have adverse effects to the production site.

---

## Credits

Created with ❤️ by the Pixel Pulse Development team.