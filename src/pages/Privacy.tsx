import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <div className="max-w-none text-sm text-owed-text-muted space-y-4">
          <p>
            JustClaimed respects your privacy. This policy describes how we collect,
            use, and protect your information.
          </p>
          <p>
            We may collect information you provide when signing up or claiming (e.g. email),
            and usage data such as pages viewed. We use this to operate the service, improve
            the product, and communicate with you about your account.
          </p>
          <p>
            We do not sell your personal information. We may share data with service
            providers that help us run the site (e.g. hosting, analytics), subject to
            confidentiality obligations.
          </p>
          <p>
            We may use cookies and similar technologies for authentication and preferences.
            You can adjust browser settings to limit cookies.
          </p>
          <p>
            If you have questions or want to access or delete your data, contact us at
            privacy@justclaimed.com.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
