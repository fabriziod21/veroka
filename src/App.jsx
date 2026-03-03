import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatsAppButton from './components/WhatsAppButton'

const Productos = lazy(() => import('./components/Productos'))
const Nosotros = lazy(() => import('./components/Nosotros'))
const Testimonios = lazy(() => import('./components/Testimonios'))
const Contacto = lazy(() => import('./components/Contacto'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="min-h-screen">
      <a href="#productos" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-3 border-pink-600 border-t-transparent rounded-full animate-spin" /></div>}>
          <Productos />
          <Nosotros />
          <Testimonios />
          <Contacto />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </div>
  )
}

export default App
