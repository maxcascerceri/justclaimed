import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import FAQ from './pages/FAQ'
import Account from './pages/Account'
import Onboarding from './pages/Onboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
