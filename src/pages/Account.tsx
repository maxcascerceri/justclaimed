import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Account() {
  return (
    <div className="min-h-screen bg-owed-bg-page">
      <nav className="sticky top-0 z-40 nav-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/dashboard" className="font-semibold text-owed-text-main">
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

      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-8 text-2xl font-semibold text-owed-text-main">
          Account
        </h1>
        <div className="rounded-lg border border-owed-border bg-white p-6">
          <p className="text-owed-text-muted">
            Manage your subscription and preferences here.
          </p>
          <a
            href="https://justclaimed.com/account"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-primary mt-4 inline-flex"
          >
            Open account settings
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
