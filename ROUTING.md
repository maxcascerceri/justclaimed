# Clean URLs (no `/#/`)

Right now the app uses **hash-based routing**, so URLs look like:

- `https://yourdomain.com/#/dashboard`
- `https://yourdomain.com/#/faq`

You want **path-based URLs** like:

- `https://yourdomain.com/dashboard`
- `https://yourdomain.com/faq`

## What’s in place

- **Vercel rewrites** in `vercel.json` are set so that paths like `/dashboard` and `/faq` serve `index.html`. That’s required for path-based routing to work once the app uses it.

## What you need to change

The app must be built with **browser history** instead of **hash history**:

- **If you have the original source** (e.g. a React/Vite repo): use **`createBrowserRouter`** (or **`BrowserRouter`**) instead of **`createHashRouter`** (or **`HashRouter`**) where the router is created, then rebuild and deploy. With the rewrites above, `/dashboard` will load the app and the router will read `window.location.pathname`, so you’ll get clean URLs.

- **If you only have the built bundle** (no source): you’d need to change the build so it uses `createBrowserRouter` and redeploy; the current minified bundle can’t be safely switched from hash to browser history by editing the JS by hand.

After switching to browser history, set your Stripe success URL to use a path (e.g. `https://yourdomain.com/dashboard?subscribed=true`) so the “mark as paid” logic still works.
