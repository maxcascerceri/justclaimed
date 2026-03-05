import { Link } from 'react-router-dom'

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-owed-bg-page flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-owed-text-main">
          JustClaimed
        </h1>
        <p className="mt-4 text-owed-text-muted">
          Find and claim class action settlements that you may be eligible for.
        </p>
        <Link
          to="/dashboard"
          className="btn-pill btn-primary mt-8 inline-flex"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}
