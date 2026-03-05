# JustClaimed — Screen → File Reference

Each **screen** in the app has its own file. Use this to find what to edit when you want to change a specific part of the app.

| Screen | File | What it is |
|--------|------|------------|
| **Landing / Onboarding** | `src/pages/Onboarding.tsx` | First-time flow (brand selection, etc.). Shown at `/`. |
| **Dashboard** | `src/pages/Dashboard.tsx` | Main screen: settlement cards, filters, “Claim Settlement” → detail dialog → paywall. Route: `/dashboard`. |
| **Settlement detail** | Inside `Dashboard.tsx` | Modal that shows eligibility, “About this settlement”, “Claim Settlement Now”. |
| **Paywall** | `src/components/PaywallModal.tsx` | Subscription / paywall popup. Used from Dashboard when user clicks “Claim Settlement Now”. |
| **FAQ** | `src/pages/FAQ.tsx` | FAQ accordion. Route: `/faq`. |
| **Account** | `src/pages/Account.tsx` | Account/settings. Route: `/account`. |
| **Admin** | `src/pages/Admin.tsx` | Admin dashboard: list/edit/delete settlements. Route: `/admin`. |
| **Terms of Service** | `src/pages/Terms.tsx` | Terms page. Route: `/terms`. |
| **Privacy Policy** | `src/pages/Privacy.tsx` | Privacy page. Route: `/privacy`. |

**Shared UI**

| Component | File | Where it’s used |
|-----------|------|------------------|
| **Footer** | `src/components/Footer.tsx` | Links (Terms, Privacy, FAQ, etc.). Used on Dashboard and other pages. |
| **App shell & routing** | `src/App.tsx` | Defines all routes and which screen (page) each route renders. |
| **Entry** | `src/main.tsx` | Renders the app into `#root`. |

**Data**

| Purpose | File |
|---------|------|
| Settlements list + helpers | `src/data/settlements.ts` |
| Shared types (e.g. `Settlement`) | `src/types.ts` |

---

**Design:** All styles use the existing CSS (same class names, e.g. `owed-bg-page`, `btn-pill`, `settlement-card`). Do not change class names if you want to keep the current look. Edit content and structure inside each file as needed.

---

**Run & build**

- **Develop:** `npm run dev` — runs the app from source at http://localhost:5173
- **Build:** `npm run build` — outputs to `dist/` (index.html + hashed JS/CSS in `dist/assets/`)
- **Deploy:** Point your host (e.g. Vercel) at the repo, set build command to `npm run build` and output directory to `dist`, or copy the contents of `dist/` to your static host.
