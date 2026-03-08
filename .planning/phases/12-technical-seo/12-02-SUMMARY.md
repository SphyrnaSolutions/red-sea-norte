---
plan: 12-02
status: complete
started: 2026-03-08
completed: 2026-03-08
---

## What was built

POST /api/revalidate endpoint for on-demand ISR revalidation. Wagtail webhook handler added to wagtail-headless-cms project that calls this endpoint on page publish.

## Key files

- `src/app/api/revalidate/route.ts` — accepts secret + type + slug, revalidates cache tags
- `wagtail-headless-cms/apps/core/wagtail_hooks.py` — `after_publish_page` signal posts to Next.js
- `wagtail-headless-cms/config/settings/base.py` — FRONTEND_REVALIDATE_URL/SECRET settings

## Env vars needed

Both services need the same shared secret:
- **Next.js (Dokploy)**: `REVALIDATION_SECRET=45ea5b9848ce50ddb92c4c55601048ebdef24711bab6e19f5c8939ec9fa14c07`
- **Wagtail (Dokploy)**: `FRONTEND_REVALIDATE_SECRET=45ea5b9848ce50ddb92c4c55601048ebdef24711bab6e19f5c8939ec9fa14c07`
- **Wagtail (Dokploy)**: `FRONTEND_REVALIDATE_URL=https://buceoenelmarrojo.com/api/revalidate`

## Self-Check: PASSED
