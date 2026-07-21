# AGENTS.md — Mazo Sindhudurg

This file is the operating contract for any coding agent working on the Mazo Sindhudurg project.

## 1. Project identity

Repositories:

- Frontend: `mazo-sindhudurg-frontend`
- Backend: `mazo-sindhudurg-backend`

Product:

Mazo Sindhudurg is a database-driven local discovery, tourism, hotel, business directory, event and editorial platform focused on Sindhudurg.

Target deployment:

- Frontend: Hostinger Node.js app
- Backend: Hostinger Node.js app
- Database: Hostinger MySQL
- Media: Cloudinary
- Frontend domain: `https://mazosindhudurg.com`
- API domain: `https://api.mazosindhudurg.com`

Do not add Docker, Traefik or VPS-specific deployment files unless explicitly requested for this project.

---

## 2. Mandatory operating rules

Before editing:

1. Scan the repository and identify the real file structure.
2. Read `package.json`, environment examples, relevant routes, services and components.
3. Trace the current working flow before proposing a change.
4. Reuse existing components and services.
5. State a concise plan and likely files to change.

During editing:

1. Make the smallest complete change.
2. Preserve working APIs, routes, schema and functionality.
3. Never silently replace dynamic data with mock data.
4. Never create duplicate files such as `HeaderNew.tsx`, `HeaderFinal.tsx` or `service2.ts`.
5. Refactor the existing correct file instead.
6. Keep TypeScript strict and avoid broad `any`.
7. Do not disable lint/type rules merely to make checks pass.
8. Do not add dependencies unless truly required.
9. Do not upgrade major versions unless explicitly requested.
10. Keep changes production-ready, responsive and accessible.

After editing:

Run the scripts that actually exist in `package.json`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

On Windows use `npm.cmd` when required.

Never claim a command passed unless it was actually executed successfully.

Final report must include:

- What was implemented
- Files modified
- Commands executed
- Build/type/lint/test results
- Remaining assumptions or risks

---

## 3. Forbidden destructive actions

Never run without explicit approval:

```text
prisma migrate reset
prisma db push --force-reset
DROP DATABASE
DROP TABLE
TRUNCATE
git reset --hard
git clean -fd
git push --force
docker system prune
volume deletion
```

Never delete Cloudinary assets without checking their database usage.

Never edit production database data as part of a normal coding task.

Before any schema migration, route rename, auth strategy change or deployment change:

1. Explain the impact.
2. Tell the user what to back up.
3. Wait for explicit approval.

---

## 4. Required public URL architecture

```text
/destinations
/destinations/malvan
/destinations/tarkarli
/destinations/vengurla
/destinations/amboli
/destinations/devgad

/attractions
/attractions/beaches
/attractions/forts
/attractions/temples
/attractions/waterfalls
/attractions/sindhudurg-fort
/attractions/tarkarli-beach

/hotels
/hotels/malvan
/hotels/tarkarli
/hotels/vengurla
/hotels/[hotel-slug]

/plan
/plan/how-to-reach-sindhudurg
/plan/best-time-to-visit
/plan/local-transport
/plan/safety-and-sea-conditions

/guides
/guides/itineraries
/guides/food-and-culture
/guides/seasonal-travel
/guides/travel-tips
/guides/malvan-two-day-itinerary

/businesses
/events
/search
/add-business
```

Do not create a separate static frontend folder for every database slug.

---

## 5. Frontend rules

Stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Cloudinary-compatible media
- Database-driven API content

Expected public routing:

```text
src/app/(site)/page.tsx
src/app/(site)/search/page.tsx
src/app/(site)/add-business/page.tsx
src/app/(site)/[...path]/page.tsx
```

The catch-all route handles database-driven public URLs.

Required resolver endpoint:

```http
GET /api/v1/routes/resolve?path=/requested/path
```

The frontend must handle:

- Active route
- Redirect
- Gone content
- 404
- Metadata
- Breadcrumbs
- JSON-LD
- Correct page template
- Loading and error states

Conceptual resolver response:

```json
{
  "routeType": "detail",
  "entityType": "attraction",
  "template": "attraction-detail",
  "canonicalPath": "/attractions/tarkarli-beach",
  "breadcrumbs": [],
  "data": {},
  "seo": {},
  "schemas": []
}
```

Use the actual backend response contract and keep it typed.

### Frontend architecture

Prefer:

```text
components/layout
components/navigation
components/renderers
components/templates
components/content
components/shared
components/admin
components/ui
services
lib
types
```

Recommended reusable components:

```text
Container
SectionHeader
Header
DesktopNav
MobileNav
NavDropdown
Footer
Breadcrumbs
BreadcrumbJsonLd
RouteRenderer
ListingRenderer
DetailRenderer
PageRenderer
DestinationTemplate
AttractionTemplate
HotelTemplate
PlanTemplate
GuideTemplate
MediaImage
SearchBar
FilterPanel
Pagination
PlaceCard
BusinessCard
HotelCard
ArticleCard
EventCard
FAQSection
EmptyState
LoadingSkeleton
ErrorState
```

Do not duplicate large Tailwind class sets across files.

### Server/client component rules

- Default to Server Components.
- Use `"use client"` only for actual browser interaction.
- Do not convert entire pages to client components for one dropdown.
- Fetch SEO-critical initial data server-side.
- Fetch independent server data in parallel.
- Keep forms and filters in isolated client components.

### API access

All frontend API calls must go through centralized services.

Do not scatter raw `fetch()` calls throughout cards and templates.

Central services must manage:

- API base URL
- Credentials
- Errors
- Query parameters
- Cache/revalidation
- Typed response parsing

Frontend environment:

```env
NEXT_PUBLIC_API_URL=https://api.mazosindhudurg.com/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

Never add API, database, JWT or Cloudinary secrets to `NEXT_PUBLIC_*`.

---

## 6. Backend rules

Stack:

- Node.js
- Express.js
- TypeScript
- MySQL
- Prisma after introspecting the existing SQL database
- Cloudinary
- REST API under `/api/v1`

Preferred module structure:

```text
controller.ts
service.ts
repository.ts
routes.ts
validation.ts
types.ts
```

Responsibilities:

- Controller: HTTP request/response only
- Service: business logic, permission checks and transactions
- Repository: Prisma/database queries
- Validation: params/query/body schemas
- Routes: endpoint registration

Do not place Prisma queries directly inside route files.

### Database source of truth

The database was initialized from SQL.

When connecting Prisma:

```bash
npx prisma db pull
npx prisma generate
```

Review the generated schema before committing.

Never independently change SQL and Prisma in ways that create schema drift.

Future schema changes require a reviewed migration and explicit approval.

### Important model rules

- Hotels are `businesses` plus `hotel_profiles`.
- Guides, plan pages, blogs, stories and news use `articles.content_type`.
- Cloudinary files are represented by `media` rows.
- Generic relationships using `entity_type + entity_id` must be validated in the service layer.
- Public queries must exclude drafts, inactive rows and soft-deleted rows.
- Scheduled content must remain private before its publish time.
- Verification badges must only come from genuine verification state.

---

## 7. Route resolver requirements

Endpoint:

```http
GET /api/v1/routes/resolve?path=/requested/path
```

Required flow:

1. Normalize the path.
2. Check redirects.
3. Resolve exact `routes.path`.
4. Handle active, inactive, redirect and gone states.
5. Load entity using an explicit entity loader.
6. Enforce publication rules.
7. Attach categories, destination, media, FAQs and related content.
8. Build breadcrumbs.
9. Attach SEO metadata.
10. Attach validated schemas.
11. Return a normalized response.

Do not blindly query every entity table.

Whenever public content is created or published:

- Create/update its route inside the same database transaction.
- Enforce unique normalized paths.
- Assign the correct parent route.
- Assign route type and template.
- Create a 301 redirect when a published slug changes.
- Prevent redirect loops and route collisions.
- Do not publish if route creation fails.

---

## 8. Navbar and breadcrumb rules

Navbar comes from:

```text
menus
menu_items
routes
```

Expected endpoints:

```http
GET /api/v1/navigation/header
GET /api/v1/navigation/footer
```

Top-level navigation:

```text
Home
Destinations
Attractions
Hotels
Plan Your Trip
Guides
Businesses
Events
Add Business
```

Do not hardcode production dropdowns in JSX when API navigation exists.

Breadcrumbs come from `routes.parent_route_id`.

Rules:

- First crumb is Home.
- Intermediate crumbs are links.
- Current page is plain text.
- Use `seo_metadata.breadcrumb_title` when available.
- Prevent circular parent traversal.
- Visible breadcrumbs and `BreadcrumbList` JSON-LD must use the same ordered data.
- Do not build primary breadcrumbs only by splitting URL slugs.

Examples:

```text
Home > Destinations > Malvan
Home > Attractions > Beaches > Tarkarli Beach
Home > Hotels > Tarkarli > Hotel Name
Home > Plan Your Trip > Best Time to Visit
Home > Guides > Itineraries > Malvan Two-Day Itinerary
```

---

## 9. Cloudinary rules

Actual media is stored in Cloudinary. MySQL stores metadata only.

Required backend concepts:

```text
configureCloudinary
createUploadSignature
registerUploadedAsset
uploadStream
uploadRemoteUrl
buildImageUrl
getAssetUsage
destroyAsset
```

Rules:

- Never expose `CLOUDINARY_API_SECRET`.
- Prefer signed direct admin uploads.
- Restrict allowed formats, size and folders.
- Validate upload completion payloads.
- Deduplicate using `asset_id`.
- Store `asset_id`, `public_id`, `secure_url`, width, height, bytes, format and alt text.
- Never store image BLOBs or Base64 in MySQL.
- Use `f_auto` and `q_auto` for delivery.
- Do not store every transformed URL.
- Check media usage before deletion.
- Use cache invalidation when destroying a published asset.
- Missing images use the approved site placeholder, not unrelated stock images.

Backend environment:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_SIGNED_UPLOAD_PRESET=
CLOUDINARY_ROOT_FOLDER=mazosindhudurg
MAX_IMAGE_SIZE_MB=10
ALLOWED_IMAGE_FORMATS=jpg,jpeg,png,webp
```

---

## 10. Content publication rules

Publishing must validate:

- Required title/content
- Unique slug
- Unique route path
- Referenced media
- Referenced destination/category
- Status and publication date
- SEO defaults
- Route hierarchy

Where multiple records change together, use a transaction.

Use transactions for:

- Publish + route creation
- Slug update + redirect creation
- Submission approval + listing creation
- Business claim approval + ownership change
- Verification update + badge state

Do not keep a database transaction open during Cloudinary or other slow external network calls.

### Articles

`articles.content_type` supports:

```text
guide
plan
blog
story
news
```

Rules:

- Markdown imports default to draft.
- Deduplicate imports using `source_hash`.
- Keep original Markdown.
- Store rendered/sanitized HTML separately.
- Create revisions on meaningful edits.
- Never auto-publish imported content.

### Hotels

Use:

```text
businesses
└── hotel_profiles
```

Do not create a second duplicate hotel content table.

---

## 11. Authentication and authorization

Use the existing auth implementation. Do not replace it without approval.

Minimum requirements:

- Secure password hashing
- Short-lived access token
- Secure refresh/session handling
- HttpOnly cookies when cookies are used
- `Secure` cookies in production
- Intentional CORS credentials configuration
- Rate limiting on login and refresh
- Backend role checks
- Logout revocation
- No password hash or token leakage

Roles may include:

```text
super-admin
admin
editor
author
business-owner
viewer
```

Frontend-hidden controls are not authorization. Backend must enforce permission.

---

## 12. Validation and security

Backend must validate:

- Route params
- Query params
- Request bodies
- Pagination limits
- Slugs and paths
- URLs
- Phone/email
- Enum values
- Rich HTML
- Entity relations
- Cloudinary responses

Use:

- Helmet
- Restricted production CORS
- Body-size limits
- Rate limits
- Central error middleware
- 404 middleware
- Structured logs

Never log:

- Passwords
- API secrets
- Full tokens
- Sensitive private data

Do not return stack traces in production.

---

## 13. SEO rules

Every indexable public page must support:

- One H1
- Correct heading hierarchy
- Meta title
- Meta description
- Canonical URL
- Robots directives
- Open Graph
- Twitter metadata when configured
- Visible breadcrumbs
- Breadcrumb schema
- Correct entity schema
- FAQ schema only when the FAQs are visible

Supported schema concepts may include:

```text
WebPage
TouristAttraction
Hotel
LocalBusiness
BlogPosting
Article
Event
FAQPage
BreadcrumbList
```

Do not create duplicate or conflicting JSON-LD blocks.

Do not blindly return unvalidated custom schema JSON from untrusted users.

---

## 14. UI quality rules

Visual direction:

- Premium coastal-Konkan identity
- Deep navy
- Coastal blue
- Konkan green
- Warm sand
- Restrained sunset-orange accent
- Editorial typography
- Consistent centered container around 1280px

Avoid:

- Emoji category icons
- Fake ratings
- Unverified badges
- Random stock portraits
- Excessive gradients
- Excessive glassmorphism
- Oversized empty sections
- Inconsistent card ratios
- Generic SaaS appearance

Responsive test targets:

```text
1440px
1280px
1024px
768px
390px
```

Accessibility requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Accessible icon buttons
- Sufficient contrast
- Reduced-motion support
- Practical mobile tap targets
- No clickable non-semantic divs

---

## 15. Performance rules

Frontend:

- Minimize client JavaScript.
- Avoid unnecessary global state.
- Avoid huge client components.
- Define image dimensions/aspect ratios.
- Use pagination.
- Use loading and error boundaries.
- Do not import complete icon libraries.
- Keep third-party scripts minimal.

Backend:

- Avoid N+1 queries.
- Select only required columns.
- Do not load `LONGTEXT` bodies for list cards.
- Paginate all large endpoints.
- Cache public navigation/settings safely.
- Never globally cache private admin responses.
- Use connection pooling appropriate to Hostinger limits.
- Do not return all database rows for an empty search query.

---

## 16. Error and response integrity

Use one consistent API response envelope.

Use correct status codes:

```text
200 success
201 created
204 no content
400 bad request
401 unauthenticated
403 unauthorized
404 not found
409 conflict
410 gone
422 semantic validation failure
429 rate limited
500 unexpected error
```

Do not hide errors and claim success.

Do not fabricate build, test or deployment results.

---

## 17. Definition of done

A task is complete only when:

- Existing behavior remains intact.
- Types are correct.
- Validation is present.
- Authorization is present where required.
- Public publication rules are respected.
- No secrets are exposed.
- No schema drift is introduced.
- Loading, empty and error states are handled.
- Responsive UI is checked where relevant.
- Lint/type/build/tests pass where scripts exist.
- Modified files and results are reported honestly.

---

## 18. Required agent response format

Before coding:

```text
Plan
Current flow discovered
Files likely to change
API/database impact
Risks or assumptions
```

After coding:

```text
Implemented
Modified files
Commands executed
Validation results
Remaining issues or assumptions
```
