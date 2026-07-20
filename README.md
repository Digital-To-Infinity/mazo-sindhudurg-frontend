# Mazo Sindhudurg – Frontend

Next.js 15 frontend for the Mazo Sindhudurg tourism platform.

## Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Vanilla CSS with CSS custom properties
- **Media**: Cloudinary
- **Auth**: JWT via HTTP-only cookie

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# Fill in your values in .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (site)/       # Public-facing pages
│   └── admin/        # Admin dashboard
├── components/       # React components
│   ├── layout/       # Header, Footer, AdminSidebar
│   ├── renderers/    # Dynamic route/page renderers
│   ├── content/      # Content cards, grids, headers
│   ├── shared/       # Reusable UI (SearchBar, Filters…)
│   ├── admin/        # Admin-specific components
│   └── ui/           # Base UI primitives
├── services/         # API service functions
├── lib/              # Utilities, metadata, auth helpers
└── types/            # TypeScript type definitions
```
