import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom'
import Header from './components/Header'
import StockPage from './pages/StockInfo'
import ProfilePage from './pages/Profile'
import MarketPage from './pages/LiveMarket'
import PerformersPage from './pages/Performer'
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

// Wrapper to inject navigate-based onSymbolSelect into pages
function MarketPageWrapper() {
  const navigate = useNavigate()
  return <MarketPage onSymbolSelect={(symbol) => navigate(`/trade/${symbol}`)} />
}

function PerformersPageWrapper() {
  const navigate = useNavigate()
  return <PerformersPage onSymbolSelect={(symbol) => navigate(`/trade/${symbol}`)} />
}

function StockPageWrapper() {
  const { symbol } = useParams()
  const navigate = useNavigate()
  return (
    <StockPage
      key={symbol}
      symbol={symbol || 'BTCUSDT'}
      onBack={() => navigate(-1)}
    />
  )
}

function Layout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black transition-colors">
      <Header onPageChange={(page) => navigate(`/${page === 'market' ? '' : page}`)} />
      <main>
        <Routes>
          <Route path="/"           element={<LandingPage />} />
        <Route path="/live" element={<MarketPageWrapper />} />
           <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"     element={<RegisterPage />} />
          <Route path="/performers" element={<PerformersPageWrapper />} />
          <Route path="/trade/:symbol" element={<StockPageWrapper />} />
          <Route path="/profile"    element={<ProfilePage />} />
          {/* Fallback */}
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}