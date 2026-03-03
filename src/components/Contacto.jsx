import { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react'

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
    }, 3000)
  }

  const info = [
    {
      icon: MapPin,
      title: 'Visitanos',
      lines: ['Av. Principal 123', 'Lima, Peru'],
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: Phone,
      title: 'Llamanos',
      lines: ['(01) 555-1234', '+51 999 999 999'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: 'Horario',
      lines: ['Lun - Sab: 8am - 8pm', 'Dom: 9am - 2pm'],
      color: 'bg-orange-100 text-orange-600'
    },
  ]

  return (
    <section id="contacto" aria-label="Contacto" className="py-16 sm:py-24 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-pink-600 font-semibold text-xs sm:text-sm tracking-wider uppercase">Contacto</span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
            Hagamos tu pedido realidad
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Escribenos y te ayudaremos a crear el postre perfecto para tu ocasion especial
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Info cards */}
          <div className={`lg:col-span-2 space-y-4 sm:space-y-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {info.map((item, i) => (
              <div
                key={item.title}
                className={`group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg active:shadow-md transition-all duration-300 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                <div className={`p-2.5 sm:p-3 rounded-xl ${item.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0`}>
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-xs sm:text-sm text-gray-500">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/51999999999?text=Hola!%20Me%20gustaria%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className={`flex items-center gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-green-50 hover:bg-green-100 active:bg-green-200 transition-all duration-300 group ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-green-500 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0">
                <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp</h3>
                <p className="text-xs sm:text-sm text-gray-500">Respuesta inmediata</p>
              </div>
            </a>
          </div>

          {/* Formulario */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-8" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div>
                  <label htmlFor="contacto-nombre" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Nombre</label>
                  <input
                    id="contacto-nombre"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.nombre}
                    onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Tu nombre"
                    className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contacto-email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Email</label>
                  <input
                    id="contacto-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                    className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="mb-4 sm:mb-5">
                <label htmlFor="contacto-telefono" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Telefono</label>
                <input
                  id="contacto-telefono"
                  type="tel"
                  autoComplete="tel"
                  value={formData.telefono}
                  onChange={e => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  placeholder="+51 999 999 999"
                  className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="mb-5 sm:mb-6">
                <label htmlFor="contacto-mensaje" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Mensaje</label>
                <textarea
                  id="contacto-mensaje"
                  required
                  rows={4}
                  value={formData.mensaje}
                  onChange={e => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                  placeholder="Cuentanos sobre tu pedido ideal..."
                  className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={enviado}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base active:scale-[0.98] ${
                  enviado
                    ? 'bg-green-500 scale-[0.98]'
                    : 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-600/25 hover:-translate-y-0.5'
                }`}
              >
                {enviado ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Mensaje enviado!
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
