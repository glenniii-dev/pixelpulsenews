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
- [Project Admin](#project-admin)
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

> If you run into issues, contact the [Project Admin](#project-admin).

### 2. Clone & Setup

```bash
git clone https://github.com/glenniii-dev/pixelpulsenews.git
cd pixelpulsenews
```
Create a branch with name following the below convention
`user/<github_user_name>/<issue_number>`

### 3. Configure Environment

Create a `.env` file in the root directory:

```
DATABASE_URL =

JWT_SECRET = 

NEXT_PUBLIC_BASE_URL = 
```

⚠️ Do **not** commit this file. Never share real credentials in public spaces.

> If you run into issues, contact the [Project Admin](#project-admin).

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

**Make sure you are familiar and understand the project structure before creating any new files or folders.**
> If you have any questions or dont understand something, contact the [Project Admin](#project-admin). 

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

## Database

If you are working on an issue and you think you need to make changes to the existing database schema, please follow the steps below thoroughly. Missing any step or changing the way it is conveyed here might have **adverse** effect on the **stability** of the application.

⚠️ **Contact the [Project Admin](#project-admin) for the main Development Database URL before continuing.**

### STEP 1:
If /drizzle folder does not exist or empty run

```bash
npm run db:generate
```
This is required to properly track changes made to the schema. 

⚠️**Warning:** If the drizzle folder is empty/non-existent and you make any change to the schema and then run the generate command, it will think the modified schema is the current state of the database and generate incorrect SQL files. These SQL files are what will be used to make your intended change to the schema in production so be careful.

### STEP 2:
- Change the code in the db/schema.ts folder.
- You are encouraged to add columns, relationships between existing tables or new tables.
- If you need to delete a column or table or relationship please contact the [project_admin](#project-admin) first and discuss the potential restructuring of the schema.

### STEP 3: 
- After you are satisfied with the changes in the db/schema.ts file run

```bash
npm run db:generate
```
- This time it will scan the schema for changes and compare it with the last time you/any other contributor had ran the generate command.
- You can inspect the sql file generated after running this command, you will see your schema changes correctly translated to SQL DML statements. If you are not satisfied with the generated SQL file please check the schema.ts file or refer to [drizzle documentation](https://orm.drizzle.team/docs/schemas).

### STEP 4: 
- Ensure that you are pointing to the dev database by inspecting your .env file then run

📌 **NOTE:** Double-check `DATABASE_URL` in `.env` before running any Database command.

```bash
npm run db:migrate
```
- This command will take the SQL file generated in STEP 3 and apply it to the database. If you encounter any errors carefully inspect the error message for hints and fallback to the [drizzle documentation](https://orm.drizzle.team/docs/drizzle-kit-migrate).

📌 **NOTE:** Database changes might be overridden as multiple developers are working with the same database instance, if you think that your change will take a long time and within that time period your changes might be overridden please reach out to the [Project Admin](#project-admin) and request a temporary connection string unique to you.


---


## Admin Access

If what your working on involves admin access to the site follow these steps:

1. Get user ID and PASSWORD (e.g., `"user_ABC123"`) from the [Project Admin](#project-admin)

2. Visit `/admin` route locally or on the [production site](https://pixelpulsenews.org)

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

---

## Project Admin

### Glenn
**Reach out using either of the following methods:**
- Email: **glenniii.dev@gmail.com**
- Discord: **glenniii.dev**

---

## Cloudflare R2 setup (admin uploads)

To enable file uploads (PDFs, images) to Cloudflare R2, set these environment variables in your `.env` file:

- `CF_R2_ACCESS_KEY_ID` — your R2 access key id
- `CF_R2_SECRET_ACCESS_KEY` — your R2 secret
- `CF_R2_ENDPOINT` — R2 endpoint, e.g. `https://<account>.r2.cloudflarestorage.com`
- `CF_R2_BUCKET` — the bucket name to use
- `CF_R2_REGION` — optional region (default `auto`)

The admin UI will upload files to `/api/admin/upload` and return a public URL used by the research/resources/team APIs.

After adding or changing database schemas in `db/schema.ts`, run the usual drizzle generate/migrate steps described above.

## Credits

Created with 🤍 by the Pixel Pulse Development team.