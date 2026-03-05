import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { getSettlements } from '../data/settlements'
import type { Settlement } from '../types'
import Footer from '../components/Footer'
import PaywallModal from '../components/PaywallModal'

const CATEGORIES = ['All', 'Tech', 'Finance', 'Consumer goods', 'Other'] as const

export default function Dashboard() {
  const [settlements] = useState(() => getSettlements())
  const [filter, setFilter] = useState<string>('All')
  const [detail, setDetail] = useState<Settlement | null>(null)
  const [paywallOpen, setPaywallOpen] = useState(false)

  const filtered = useMemo(() => {
    if (filter === 'All') return settlements
    const key = filter.toLowerCase().replace(/\s/g, '-')
    return settlements.filter((s) => s.category === key)
  }, [settlements, filter])

  const openDetail = (s: Settlement) => setDetail(s)
  const closeDetail = () => setDetail(null)
  const openPaywall = () => {
    setPaywallOpen(true)
  }

  return (
    <div className="min-h-screen bg-owed-bg-page">
      <nav className="sticky top-0 z-40 nav-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/dashboard" className="text-owed-text-main font-semibold">
            JustClaimed
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="text-sm text-owed-text-muted hover:text-owed-text-main">
              FAQ
            </Link>
            <Link to="/account" className="text-sm text-owed-text-muted hover:text-owed-text-main">
              Account
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-owed-text-main">
          Open settlements
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.id}
              className="settlement-card cursor-pointer"
              onClick={() => openDetail(s)}
            >
              <div className="flex items-start gap-4">
                <div className="size-14 shrink-0 overflow-hidden rounded-2xl border border-owed-border bg-white">
                  <img
                    src={s.logoUrl}
                    alt=""
                    className="size-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium text-owed-text-main line-clamp-1">
                    {s.companyName}
                  </h2>
                  <p className="mt-0.5 text-sm text-owed-text-muted line-clamp-2">
                    {s.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-owed-primary-dark">
                      {s.estimatedPayout}
                    </span>
                    <span className="text-xs text-owed-text-muted">
                      Deadline: {s.deadline}
                    </span>
                    {s.badge === 'proof-required' && (
                      <span className="badge-red">Proof required</span>
                    )}
                    {s.badge === 'no-proof' && (
                      <span className="badge-green">No proof</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn-pill btn-primary mt-3 w-full sm:w-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      openDetail(s)
                    }}
                  >
                    Claim Settlement
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      {/* Detail dialog — only open detail here; paywall opens from "Claim Settlement Now" */}
      <Dialog.Root open={!!detail} onOpenChange={(open) => !open && closeDetail()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[90vh] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg border border-owed-border bg-owed-bg-page p-6 shadow-lg">
            {detail && (
              <>
                <div className="flex items-start gap-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-owed-border bg-white">
                    <img
                      src={detail.logoUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl font-semibold text-owed-text-main">
                      {detail.companyName}
                    </Dialog.Title>
                    <p className="mt-1 text-owed-text-muted">{detail.description}</p>
                    <p className="mt-2 font-medium text-owed-primary-dark">
                      {detail.estimatedPayout} · Deadline: {detail.deadline}
                    </p>
                  </div>
                </div>
                {detail.eligibility && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-owed-text-main">
                      Who is eligible
                    </h3>
                    <p className="mt-1 text-sm text-owed-text-muted whitespace-pre-line">
                      {detail.eligibility}
                    </p>
                  </div>
                )}
                {detail.aboutText && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-owed-text-main">
                      About this settlement
                    </h3>
                    <p className="mt-1 text-sm text-owed-text-muted whitespace-pre-line">
                      {detail.aboutText}
                    </p>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-pill btn-primary"
                    onClick={() => openPaywall()}
                  >
                    Claim Settlement Now
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out the ${detail.companyName} settlement on JustClaimed`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-secondary"
                  >
                    Share with a Friend
                  </a>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-4 top-4 rounded p-1 text-owed-text-muted hover:bg-owed-border hover:text-owed-text-main"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  )
}
