import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'

const HomePage = lazy(() => import('./pages/HomePage'))
const CatalogoPage = lazy(() => import('./pages/CatalogoPage'))

const Spinner = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-pink-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppButton />
    </div>
  )
}

export default App
