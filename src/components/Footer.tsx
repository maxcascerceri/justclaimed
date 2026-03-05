import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-owed-border bg-owed-bg-page py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-owed-text-muted">
          <Link to="/terms" className="hover:text-owed-text-main transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-owed-text-main transition-colors">
            Privacy Policy
          </Link>
          <Link to="/faq" className="hover:text-owed-text-main transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  )
}
