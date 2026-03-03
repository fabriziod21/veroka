import { useEffect, useRef, useState } from 'react'
import { Award, Clock, Users, Leaf } from 'lucide-react'
import { useParallax } from '../hooks/useParallax'

const features = [
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Ingredientes seleccionados de primera calidad para cada creacion',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    icon: Clock,
    title: 'Siempre Fresco',
    description: 'Horneamos diariamente para garantizar la frescura en cada bocado',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Users,
    title: 'Hecho a Mano',
    description: 'Nuestras pasteleras elaboran cada pieza con dedicacion artesanal',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Leaf,
    title: 'Ingredientes Naturales',
    description: 'Sin preservantes artificiales, solo sabor natural y autentico',
    color: 'bg-green-100 text-green-600'
  },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

export default function Nosotros() {
  const [sectionRef, sectionInView] = useInView(0.1)
  const { ref: parallaxRef, offset: imgOffset } = useParallax(0.1)
  const { ref: decoRef, offset: decoOffset } = useParallax(0.15)

  return (
    <section id="nosotros" aria-label="Sobre nosotros" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Parallax decorative elements */}
      <div ref={decoRef} className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div
          className="absolute top-20 right-[10%] w-40 h-40 border-2 border-pink-100 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * 2.5}px) rotate(${decoOffset * 0.5}deg)` }}
        />
        <div
          className="absolute bottom-20 left-[5%] w-28 h-28 border border-rose-100 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * -2}px)` }}
        />
        <div
          className="absolute top-1/2 right-[3%] w-4 h-4 bg-pink-200/40 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * 3}px)` }}
        />
        <div
          className="absolute top-[20%] left-[15%] w-3 h-3 bg-rose-200/30 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * -2.5}px)` }}
        />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Imagenes con parallax */}
          <div
            ref={parallaxRef}
            className={`relative transition-all duration-1000 ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group will-change-transform"
                  style={{ transform: `translateY(${imgOffset * 1.5}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=500&fit=crop&q=75"
                    alt="Pastelera decorando un pastel artesanal"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                    className="w-full h-40 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group will-change-transform"
                  style={{ transform: `translateY(${imgOffset * 0.8}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&h=300&fit=crop&q=75"
                    alt="Ingredientes frescos y naturales"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group will-change-transform"
                  style={{ transform: `translateY(${imgOffset * -1.2}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&q=75"
                    alt="Pastel terminado con decoracion elegante"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group will-change-transform"
                  style={{ transform: `translateY(${imgOffset * -0.6}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=500&fit=crop&q=75"
                    alt="Vitrina con variedad de pasteles"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                    className="w-full h-40 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Badge flotante con counter animado */}
            <div
              className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-pink-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl shadow-pink-600/25 animate-float will-change-transform"
              style={{ transform: `translateY(${imgOffset * -2}px)` }}
            >
              <p className="font-playfair text-2xl sm:text-3xl font-bold">
                <AnimatedCounter target={10} suffix="+" />
              </p>
              <p className="text-pink-200 text-xs sm:text-sm">Anos de<br />experiencia</p>
            </div>
          </div>

          {/* Contenido */}
          <div className={`transition-all duration-1000 delay-300 ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span className="text-pink-600 font-semibold text-xs sm:text-sm tracking-wider uppercase">Sobre Nosotros</span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-4 sm:mb-6">
              Endulzamos tus momentos desde hace mas de una decada
            </h2>
            <p className="text-gray-500 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
              En Pasteleria Veroka, cada creacion es el resultado de la pasion por la reposteria
              y el compromiso con la excelencia. Desde nuestros inicios, hemos trabajado para
              llevar alegria a cada mesa con sabores unicos y presentaciones inolvidables.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-500 cursor-default ${
                    sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + i * 150}ms` }}
                >
                  <div className={`p-2.5 sm:p-3 rounded-xl ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0`}>
                    <feature.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
