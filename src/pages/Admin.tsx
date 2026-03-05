import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSettlements } from '../data/settlements'
import type { Settlement } from '../types'
import Footer from '../components/Footer'

export default function Admin() {
  const [list, setList] = useState<Settlement[]>([])

  useEffect(() => {
    setList(getSettlements())
  }, [])

  return (
    <div className="min-h-screen bg-owed-bg-page">
      <nav className="sticky top-0 z-40 nav-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/dashboard" className="font-semibold text-owed-text-main">
            JustClaimed
          </Link>
          <Link to="/dashboard" className="text-sm text-owed-text-muted hover:text-owed-text-main">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-2xl font-semibold text-owed-text-main">
          Admin — Settlements
        </h1>
        <div className="overflow-x-auto rounded-lg border border-owed-border bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-owed-border">
                <th className="p-4 font-medium text-owed-text-main">Company</th>
                <th className="p-4 font-medium text-owed-text-main">Payout</th>
                <th className="p-4 font-medium text-owed-text-main">Deadline</th>
                <th className="p-4 font-medium text-owed-text-main">Category</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id} className="border-b border-owed-border last:border-b-0">
                  <td className="p-4 text-owed-text-main">{s.companyName}</td>
                  <td className="p-4 text-owed-text-muted">{s.estimatedPayout}</td>
                  <td className="p-4 text-owed-text-muted">{s.deadline}</td>
                  <td className="p-4 text-owed-text-muted">{s.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-owed-text-muted">
          To add or edit settlements, update <code className="rounded bg-owed-border px-1">src/data/settlements.ts</code> and reload.
        </p>
      </main>

      <Footer />
    </div>
  )
}
