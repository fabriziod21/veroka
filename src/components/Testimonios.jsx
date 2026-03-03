import { useState, useEffect, useRef } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useParallax } from '../hooks/useParallax'

const testimonios = [
  {
    nombre: 'Maria Garcia',
    rol: 'Cliente frecuente',
    texto: 'La mejor pasteleria de la ciudad. La torta de chocolate que pedi para el cumpleanos de mi hija fue espectacular, todos quedaron encantados.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&q=75'
  },
  {
    nombre: 'Carlos Rodriguez',
    rol: 'Organizador de eventos',
    texto: 'Siempre confio en Veroka para mis eventos corporativos. La calidad es consistente y el servicio impecable. Los macarons son adictivos.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&q=75'
  },
  {
    nombre: 'Ana Torres',
    rol: 'Novia feliz',
    texto: 'Mi torta de bodas fue un sueno hecho realidad. El diseno quedo exactamente como lo imagine y el sabor... increible. Gracias Veroka!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&q=75'
  },
]

export default function Testimonios() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const { ref: decoRef, offset: decoOffset } = useParallax(0.12)

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonios.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonios" aria-label="Testimonios de clientes" className="relative py-16 sm:py-24 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Parallax decorative elements */}
      <div ref={decoRef} className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div
          className="absolute top-10 left-[8%] w-32 h-32 border-2 border-pink-100/50 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * 2}px) rotate(${decoOffset * 0.4}deg)` }}
        />
        <div
          className="absolute bottom-16 right-[12%] w-20 h-20 border border-rose-200/30 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * -1.8}px)` }}
        />
        <div
          className="absolute top-1/3 right-[5%] w-5 h-5 bg-pink-300/20 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * 3}px)` }}
        />
        <div
          className="absolute bottom-1/3 left-[3%] w-3 h-3 bg-amber-200/30 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * -2.5}px)` }}
        />
        {/* Large blurred shape */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-pink-100/30 rounded-full blur-3xl will-change-transform"
          style={{ transform: `translateX(-50%) translateY(${decoOffset * 1}px)` }}
        />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-pink-600 font-semibold text-xs sm:text-sm tracking-wider uppercase">Testimonios</span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            La satisfaccion de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        {/* Mobile: Carousel / Desktop: Grid */}
        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonios.map((t, i) => (
            <article
              key={i}
              className={`group relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 right-8 bg-pink-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-pink-600/25 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                <Quote className="w-5 h-5 text-white" aria-hidden="true" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-gray-600 leading-relaxed mb-6 italic text-sm lg:text-base">
                &ldquo;{t.texto}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.nombre}`}
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-100"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.nombre}</p>
                  <p className="text-xs text-gray-400">{t.rol}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative">
            {testimonios.map((t, i) => (
              <article
                key={i}
                className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-500 ${
                  active === i ? 'block opacity-100 scale-100' : 'hidden opacity-0 scale-95'
                }`}
              >
                <div className="absolute -top-4 right-6 bg-pink-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-pink-600/25">
                  <Quote className="w-4 h-4 text-white" aria-hidden="true" />
                </div>

                <div className="flex gap-1 mb-3" aria-label={`${t.rating} de 5 estrellas`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-gray-600 leading-relaxed mb-5 italic text-sm">
                  &ldquo;{t.texto}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={`Foto de ${t.nombre}`}
                    loading="lazy"
                    decoding="async"
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.nombre}</p>
                    <p className="text-xs text-gray-400">{t.rol}</p>
                  </div>
                </div>
              </article>
            ))}

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setActive(prev => prev === 0 ? testimonios.length - 1 : prev - 1)}
                aria-label="Testimonio anterior"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ver testimonio ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      active === i ? 'w-8 h-2.5 bg-pink-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActive(prev => (prev + 1) % testimonios.length)}
                aria-label="Siguiente testimonio"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 active:scale-95 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
