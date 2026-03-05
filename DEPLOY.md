# Deploying JustClaimed

- **Use the repo root as the deploy source.** In Vercel: **Settings → General → Root Directory** leave empty. **Build & Development Settings → Output Directory** leave empty (or `.`). This serves `index.html` and `assets/` from the root and keeps `/api` serverless functions working.
- If your project is set to **Output Directory = `dist`**, that’s also supported: `dist/` has been synced with the same app (Stripe checkout, no custom paywall). The `/api` folder must still be at the repo root for the Stripe checkout session endpoint.

After deploying, do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R) or test in an incognito window so you don’t see cached assets.
