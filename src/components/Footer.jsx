import { Cake, Instagram, Facebook, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-10 sm:py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-pink-600 rounded-xl">
                <Cake className="w-4 sm:w-5 h-4 sm:h-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-playfair text-lg sm:text-xl font-bold">Veroka</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Pasteleria artesanal dedicada a crear momentos dulces e inolvidables desde hace mas de 10 anos.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Siguenos en Instagram"
                className="w-9 sm:w-10 h-9 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-pink-600 active:bg-pink-700 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Siguenos en Facebook"
                className="w-9 sm:w-10 h-9 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-pink-600 active:bg-pink-700 transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Menu */}
          <nav aria-label="Menu de productos">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Menu</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Tortas', 'Cupcakes', 'Postres', 'Panes', 'Personalizados'].map(item => (
                <li key={item}>
                  <a href="#productos" className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Links Empresa */}
          <nav aria-label="Enlaces de la empresa">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Empresa</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Nosotros', href: '#nosotros' },
                { name: 'Galeria', href: '#productos' },
                { name: 'Testimonios', href: '#testimonios' },
                { name: 'Contacto', href: '#contacto' },
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Newsletter</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Recibe ofertas exclusivas y novedades</p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email para newsletter</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-pink-600 rounded-xl hover:bg-pink-700 active:bg-pink-800 transition-colors text-sm font-medium shrink-0"
              >
                Ok
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            &copy; 2026 Pasteleria Veroka. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 fill-pink-500 text-pink-500" aria-hidden="true" /> en Lima, Peru
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Volver al inicio"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 active:scale-95 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
