import { ArrowDown, Sparkles, Star, Clock, Truck } from 'lucide-react'
import { useParallax, useMouseParallax } from '../hooks/useParallax'

export default function Hero() {
  const { ref: sectionRef, offset: bgOffset } = useParallax(0.3)
  const { ref: blobRef, offset: blobOffset } = useParallax(0.15)
  const { ref: contentRef, offset: contentOffset } = useParallax(-0.05)
  const { x: mouseX, y: mouseY } = useMouseParallax(15)

  return (
    <section id="inicio" aria-label="Bienvenida" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background image con parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${bgOffset * 0.5}px) scale(1.1)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&h=1080&fit=crop&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Formas decorativas con parallax */}
      <div
        ref={blobRef}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 will-change-transform"
        style={{ transform: `translate(33%, -50%) translateY(${blobOffset * 0.8}px) translateX(${mouseX * 0.5}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 will-change-transform"
        style={{ transform: `translate(-25%, 33%) translateY(${blobOffset * -0.6}px) translateX(${mouseX * -0.3}px)` }}
      />

      {/* Linea decorativa diagonal */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-10" viewBox="0 0 500 1000" fill="none" preserveAspectRatio="none">
          <path d="M0 0 L500 200 L500 800 L0 1000 Z" fill="url(#heroGrad)" />
          <defs>
            <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating parallax particles */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div
          className="absolute top-[15%] left-[10%] w-3 h-3 bg-pink-400/30 rounded-full blur-[1px] will-change-transform"
          style={{ transform: `translate(${mouseX * 1.2}px, ${mouseY * 1.2}px)` }}
        />
        <div
          className="absolute top-[25%] right-[15%] w-2 h-2 bg-rose-300/40 rounded-full blur-[1px] will-change-transform"
          style={{ transform: `translate(${mouseX * -0.8}px, ${mouseY * -0.8}px)` }}
        />
        <div
          className="absolute bottom-[30%] left-[20%] w-4 h-4 bg-amber-300/20 rounded-full blur-[2px] will-change-transform"
          style={{ transform: `translate(${mouseX * 0.6}px, ${mouseY * 0.6}px)` }}
        />
        <div
          className="absolute top-[60%] right-[25%] w-2.5 h-2.5 bg-pink-300/25 rounded-full blur-[1px] will-change-transform"
          style={{ transform: `translate(${mouseX * -1.5}px, ${mouseY * -1.5}px)` }}
        />
        <div
          className="absolute top-[40%] left-[45%] w-1.5 h-1.5 bg-white/20 rounded-full will-change-transform"
          style={{ transform: `translate(${mouseX * 2}px, ${mouseY * 2}px)` }}
        />
      </div>

      {/* Main content con subtle parallax */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center will-change-transform"
        style={{ transform: `translateY(${contentOffset * 0.3}px)` }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Columna izquierda - Texto */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-pink-600/20 backdrop-blur-md border border-pink-400/20 rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-pink-300" />
                <span className="text-pink-200 text-xs sm:text-sm font-medium tracking-wide">Pasteleria Artesanal Premium</span>
              </div>

              {/* Title */}
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 animate-fade-in-up leading-[1.1]">
                El arte de
                <span className="block mt-1 sm:mt-2">endulzar</span>
                <span className="block mt-1 sm:mt-2 relative">
                  <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                    tus momentos
                  </span>
                  {/* Linea decorativa bajo el texto */}
                  <svg className="absolute -bottom-2 left-0 lg:left-0 w-full sm:w-3/4 h-3 hidden sm:block" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                    <path d="M2 8 Q75 2 150 8 Q225 14 298 6" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <defs>
                      <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/60 max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
                Creamos pasteles y postres artesanales con ingredientes premium.
                Cada pieza es una obra maestra diseñada para tus celebraciones.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
                <a
                  href="#productos"
                  className="group w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-pink-500 hover:to-rose-400 active:from-pink-700 active:to-rose-600 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-600/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Ver Productos
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/51999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 active:bg-white/30 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  Contactanos
                </a>
              </div>

              {/* Mini features */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-10 sm:mt-12 animate-fade-in-up animation-delay-600">
                {[
                  { icon: Star, text: '4.9 Rating' },
                  { icon: Clock, text: 'Entrega 24h' },
                  { icon: Truck, text: 'Delivery gratis' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/50">
                    <item.icon className="w-4 h-4 text-pink-400" />
                    <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha - Composicion de imagenes (solo desktop) */}
            <div className="relative hidden lg:block animate-fade-in animation-delay-400 py-8">
              <div className="relative ml-8">
                {/* Imagen principal */}
                <div
                  className="relative z-10 rounded-[2rem] shadow-2xl shadow-black/40 rotate-1 hover:rotate-0 transition-transform duration-700 group will-change-transform"
                  style={{ transform: `rotate(1deg) translate(${mouseX * 0.15}px, ${mouseY * 0.15}px)` }}
                >
                <div className="rounded-[2rem] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=700&fit=crop&q=80"
                    alt="Torta de chocolate premium"
                    loading="eager"
                    width="600"
                    height="700"
                    className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Label sobre imagen */}
                  <div className="absolute bottom-5 left-48 right-5 z-20">
                    <div className="bg-black/40 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                      <p className="text-white font-semibold text-sm">Torta Signature</p>
                      <p className="text-white/70 text-xs mt-0.5">Chocolate belga con ganache artesanal</p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Imagen secundaria - esquina inferior izquierda con mouse parallax */}
                <div
                  className="absolute -bottom-4 -left-16 z-20 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 -rotate-3 hover:rotate-0 transition-transform duration-700 animate-float group will-change-transform"
                  style={{ transform: `rotate(-3deg) translate(${mouseX * -0.3}px, ${mouseY * -0.3}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=300&fit=crop&q=75"
                    alt="Cupcakes artesanales"
                    loading="eager"
                    width="300"
                    height="300"
                    className="w-40 h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Imagen terciaria - esquina superior izquierda con mouse parallax */}
                <div
                  className="absolute -top-4 -left-10 z-0 rounded-2xl overflow-hidden shadow-xl shadow-black/20 rotate-3 hover:rotate-0 transition-transform duration-700 animation-delay-400 animate-float group will-change-transform"
                  style={{ transform: `rotate(3deg) translate(${mouseX * 0.4}px, ${mouseY * 0.4}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=250&h=250&fit=crop&q=75"
                    alt="Pastel decorado"
                    loading="eager"
                    width="250"
                    height="250"
                    className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Badge de rating con mouse parallax */}
                <div
                  className="absolute top-6 right-4 z-30 bg-white rounded-2xl p-3 shadow-xl shadow-black/10 animate-float animation-delay-200 will-change-transform"
                  style={{ transform: `translate(${mouseX * -0.4}px, ${mouseY * -0.4}px)` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-800 font-bold text-sm">4.9</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">+5,000 clientes felices</p>
                </div>

                {/* Badge de variedades con mouse parallax */}
                <div
                  className="absolute bottom-12 right-4 z-30 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-xl px-4 py-3 shadow-lg shadow-pink-600/30 animate-float animation-delay-600 will-change-transform"
                  style={{ transform: `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)` }}
                >
                  <p className="font-bold text-lg leading-none">50+</p>
                  <p className="text-pink-200 text-xs mt-0.5">Variedades</p>
                </div>

                {/* Circulos decorativos */}
                <div className="absolute -bottom-8 right-20 w-28 h-28 border-2 border-pink-500/20 rounded-full" aria-hidden="true" />
                <div className="absolute -top-8 right-28 w-16 h-16 border border-white/10 rounded-full" aria-hidden="true" />
              </div>
            </div>

            {/* Mobile: imagenes compactas */}
            <div className="lg:hidden animate-fade-in animation-delay-400">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop&q=75"
                    alt="Torta de chocolate premium"
                    loading="eager"
                    className="w-full h-36 sm:h-48 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg flex-1">
                    <img
                      src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=200&h=200&fit=crop&q=75"
                      alt="Cupcakes"
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg flex-1">
                    <img
                      src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=200&fit=crop&q=75"
                      alt="Pastel decorado"
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Stats mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                {[
                  { num: '10+', label: 'Anos experiencia' },
                  { num: '5K+', label: 'Clientes felices' },
                  { num: '50+', label: 'Variedades' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm rounded-xl py-2.5 border border-white/10">
                    <p className="font-playfair text-lg font-bold text-white">{stat.num}</p>
                    <p className="text-white/50 text-[10px]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute -bottom-px left-0 right-0 z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
