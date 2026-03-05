import { Link } from 'react-router-dom'
import * as Accordion from '@radix-ui/react-accordion'
import Footer from '../components/Footer'

const ITEMS = [
  {
    value: 'what',
    q: 'What is JustClaimed?',
    a: 'JustClaimed helps you find and claim money from class action settlements you may be eligible for. We list open settlements with deadlines and direct claim links.',
  },
  {
    value: 'how',
    q: 'How do I claim?',
    a: 'Browse settlements, tap one to see eligibility details, then use "Claim Settlement Now" to get step-by-step instructions and the official claim link.',
  },
  {
    value: 'cost',
    q: 'Is it free?',
    a: 'You can browse settlements for free. Full claim instructions and direct links are available with a JustClaimed subscription.',
  },
]

export default function FAQ() {
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
          Frequently asked questions
        </h1>
        <Accordion.Root type="single" collapsible className="space-y-2">
          {ITEMS.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              className="rounded-lg border border-owed-border bg-white px-4"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-medium text-owed-text-main">
                  {item.q}
                  <span className="text-owed-text-muted" aria-hidden>+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pb-4 text-sm text-owed-text-muted">
                {item.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </main>

      <Footer />
    </div>
  )
}
