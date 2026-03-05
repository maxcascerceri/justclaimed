# Deploying JustClaimed

- **Use the repo root as the deploy source.** In Vercel: **Settings → General → Root Directory** leave empty. **Build & Development Settings → Output Directory** leave empty (or `.`). This serves `index.html` and `assets/` from the root and keeps `/api` serverless functions working.
- If your project is set to **Output Directory = `dist`**, that’s also supported: `dist/` has been synced with the same app (Stripe checkout, no custom paywall). The `/api` folder must still be at the repo root for the Stripe checkout session endpoint.

After deploying, do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R) or test in an incognito window so you don’t see cached assets.

**Admin saves (persistence):** For edits in `/admincascerceri` to persist, set in Vercel **Environment Variables** (Production): **BLOB_READ_WRITE_TOKEN** (from your Vercel Blob store). Optionally **ADMIN_SECRET** — if unset, the API uses `justclaimed-admin-2024`; if you set it, the admin page must use the same value. If you see "Save failed: Unauthorized", the server ADMIN_SECRET does not match.
