import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-owed-bg-page">
      <nav className="sticky top-0 z-40 nav-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/dashboard" className="font-semibold text-owed-text-main">
            JustClaimed
          </Link>
          <Link to="/dashboard" className="text-sm text-owed-text-muted hover:text-owed-text-main">
            Back
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-2xl font-semibold text-owed-text-main">
          Terms of Service
        </h1>
        <div className="prose prose-owed max-w-none text-owed-text-muted">
          <p className="mb-4">
            Welcome to JustClaimed. By using our service you agree to these terms.
          </p>
          <p className="mb-4">
            JustClaimed provides information about class action settlements and claim links.
            We do not provide legal advice. Eligibility and claim processes are determined by
            the settlement administrators.
          </p>
          <p className="mb-4">
            You are responsible for the accuracy of any information you submit when claiming.
            We are not liable for outcomes of claims or third-party sites.
          </p>
          <p className="mb-4">
            We may update these terms from time to time. Continued use after changes
            constitutes acceptance.
          </p>
          <p>
            Contact: support@justclaimed.com for questions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
