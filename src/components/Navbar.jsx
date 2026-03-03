import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Cake } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bloquear scroll del body cuando menu mobile está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Hash links point to homepage sections, route links to separate pages
  const links = [
    { name: 'Inicio', href: '/', type: 'route' },
    { name: 'Productos', href: isHome ? '#productos' : '/#productos', type: isHome ? 'hash' : 'route' },
    { name: 'Catalogo', href: '/catalogo', type: 'route' },
    { name: 'Pedido', href: isHome ? '#pedido-personalizado' : '/#pedido-personalizado', type: isHome ? 'hash' : 'route' },
    { name: 'Nosotros', href: isHome ? '#nosotros' : '/#nosotros', type: isHome ? 'hash' : 'route' },
    { name: 'Contacto', href: isHome ? '#contacto' : '/#contacto', type: isHome ? 'hash' : 'route' },
  ]

  // On non-home pages, always show scrolled (white) navbar
  const showScrolled = scrolled || !isHome

  const renderLink = (link, className, extra = {}) => {
    if (link.type === 'route') {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={className}
          {...extra}
        >
          {link.name}
        </Link>
      )
    }
    return (
      <a
        key={link.name}
        href={link.href}
        className={className}
        {...extra}
      >
        {link.name}
      </a>
    )
  }

  return (
    <header role="banner">
      <nav
        aria-label="Navegacion principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="Pasteleria Veroka - Inicio">
              <div className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${
                showScrolled ? 'bg-pink-100' : 'bg-white/20'
              }`}>
                <Cake className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                  showScrolled ? 'text-pink-600' : 'text-white'
                }`} />
              </div>
              <span className={`font-playfair text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                showScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Veroka
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {links.map(link =>
                renderLink(link, `text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  showScrolled
                    ? 'text-gray-600 hover:text-pink-600'
                    : 'text-white/80 hover:text-white'
                }`)
              )}
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pedir ahora por WhatsApp"
                className="bg-pink-600 text-white px-5 lg:px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/25 hover:-translate-y-0.5"
              >
                Pedir Ahora
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors active:scale-95 ${
                showScrolled ? 'text-gray-800' : 'text-white'
              }`}
              aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? 'max-h-[450px] pb-4' : 'max-h-0'
            }`}
            role="menu"
          >
            <div className="bg-white rounded-2xl shadow-xl p-3 space-y-1">
              {links.map(link =>
                renderLink(
                  link,
                  'block px-4 py-3.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600 active:bg-pink-100 rounded-xl transition-colors font-medium text-base',
                  { onClick: () => setIsOpen(false), role: 'menuitem' }
                )
              )}
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="block text-center bg-pink-600 text-white px-4 py-3.5 rounded-xl font-semibold mt-2 hover:bg-pink-700 active:bg-pink-800 transition-colors text-base"
              >
                Pedir Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
