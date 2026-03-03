import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, X, Image, MessageCircle, Palette, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react'
import { useParallax } from '../hooks/useParallax'

const tiposProducto = [
  { value: '', label: 'Selecciona un tipo' },
  { value: 'torta', label: 'Torta' },
  { value: 'cupcakes', label: 'Cupcakes' },
  { value: 'postres', label: 'Postres' },
  { value: 'mesa_dulces', label: 'Mesa de dulces' },
  { value: 'bocaditos', label: 'Bocaditos' },
  { value: 'otro', label: 'Otro' },
]

const porciones = [
  { value: '', label: 'Selecciona' },
  { value: '10', label: '10 personas' },
  { value: '20', label: '20 personas' },
  { value: '30', label: '30 personas' },
  { value: '50', label: '50 personas' },
  { value: '100', label: '100+ personas' },
]

const presupuestos = [
  { value: '', label: 'Selecciona (opcional)' },
  { value: '50-100', label: 'S/ 50 - S/ 100' },
  { value: '100-200', label: 'S/ 100 - S/ 200' },
  { value: '200-500', label: 'S/ 200 - S/ 500' },
  { value: '500+', label: 'S/ 500+' },
]

const pasos = [
  {
    icon: Palette,
    titulo: 'Describe tu idea',
    descripcion: 'Cuentanos que tienes en mente para tu pastel o postre soñado',
  },
  {
    icon: Upload,
    titulo: 'Sube referencias',
    descripcion: 'Adjunta imagenes de inspiracion para que entendamos tu vision',
  },
  {
    icon: MessageCircle,
    titulo: 'Coordinamos por WhatsApp',
    descripcion: 'Te contactamos para afinar detalles, precio y fecha de entrega',
  },
]

export default function PedidoPersonalizado() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    porciones: '',
    fecha: '',
    descripcion: '',
    presupuesto: '',
  })
  const [imagenes, setImagenes] = useState([]) // { file, preview }
  const [isDragging, setIsDragging] = useState(false)
  const [inView, setInView] = useState(false)
  const fileInputRef = useRef(null)
  const sectionRef = useRef(null)
  const dropZoneRef = useRef(null)
  const { ref: decoRef, offset: decoOffset } = useParallax(0.12)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.05 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagenes.forEach(img => URL.revokeObjectURL(img.preview))
    }
  }, [])

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const agregarImagenes = useCallback((files) => {
    const archivosValidos = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, 3 - imagenes.length)

    if (archivosValidos.length === 0) return

    const nuevas = archivosValidos.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImagenes(prev => [...prev, ...nuevas].slice(0, 3))
  }, [imagenes.length])

  const eliminarImagen = (index) => {
    setImagenes(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  // Drag & Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      agregarImagenes(e.dataTransfer.files)
    }
  }

  const enviarPorWhatsApp = (e) => {
    e.preventDefault()

    const tipo = tiposProducto.find(t => t.value === formData.tipo)?.label || formData.tipo
    const porcion = porciones.find(p => p.value === formData.porciones)?.label || formData.porciones
    const presup = presupuestos.find(p => p.value === formData.presupuesto)?.label || ''

    let mensaje = `Hola! Quiero hacer un pedido personalizado:\n\n`
    mensaje += `*Nombre:* ${formData.nombre}\n`
    mensaje += `*Tipo:* ${tipo}\n`
    if (formData.porciones) mensaje += `*Porciones:* ${porcion}\n`
    if (formData.fecha) mensaje += `*Fecha del evento:* ${formData.fecha}\n`
    if (formData.presupuesto) mensaje += `*Presupuesto:* ${presup}\n`
    mensaje += `\n*Descripcion:*\n${formData.descripcion}\n`

    if (imagenes.length > 0) {
      mensaje += `\n(Tengo ${imagenes.length} imagen${imagenes.length > 1 ? 'es' : ''} de referencia que compartire en el chat)`
    }

    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  const formValido = formData.nombre && formData.tipo && formData.descripcion

  return (
    <section id="pedido-personalizado" aria-label="Pedido personalizado" className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Parallax decorative elements */}
      <div ref={decoRef} className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div
          className="absolute top-16 right-[8%] w-48 h-48 bg-pink-100/40 rounded-full blur-3xl will-change-transform"
          style={{ transform: `translateY(${decoOffset * 1.8}px)` }}
        />
        <div
          className="absolute -bottom-10 left-[12%] w-64 h-64 bg-rose-50/50 rounded-full blur-3xl will-change-transform"
          style={{ transform: `translateY(${decoOffset * -1.4}px)` }}
        />
        <div
          className="absolute top-1/3 right-[3%] w-16 h-16 border-2 border-pink-200/30 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * 2.5}px) rotate(${decoOffset * 0.5}deg)` }}
        />
        <div
          className="absolute bottom-1/4 left-[5%] w-4 h-4 bg-pink-300/30 rounded-full will-change-transform"
          style={{ transform: `translateY(${decoOffset * -3}px)` }}
        />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-pink-600 font-semibold text-xs sm:text-sm tracking-wider uppercase">Pedidos Personalizados</span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
            Crea tu pastel soñado
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Cuentanos tu idea, sube imagenes de referencia y coordinamos todo por WhatsApp
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Left column - Steps */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-6 sm:space-y-8 mb-8">
              {pasos.map((paso, i) => (
                <div
                  key={paso.titulo}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
                      <paso.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                    </div>
                    <span className="absolute -top-2 -left-2 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    {/* Connector line */}
                    {i < pasos.length - 1 && (
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-8 sm:h-10 bg-pink-200" aria-hidden="true" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{paso.titulo}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative image */}
            <div className={`hidden lg:block rounded-2xl overflow-hidden shadow-lg transition-all duration-700 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <img
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=350&fit=crop&q=75"
                alt="Pastel personalizado artesanal"
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Right column - Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={enviarPorWhatsApp} className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Detalle de tu pedido</h3>
              </div>

              {/* Name + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="pedido-nombre" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Tu nombre *
                  </label>
                  <input
                    id="pedido-nombre"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.nombre}
                    onChange={handleChange('nombre')}
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pedido-tipo" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Tipo de producto *
                  </label>
                  <select
                    id="pedido-tipo"
                    required
                    value={formData.tipo}
                    onChange={handleChange('tipo')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm appearance-none"
                  >
                    {tiposProducto.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Portions + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="pedido-porciones" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    <Users className="w-3.5 h-3.5 inline mr-1" />
                    Porciones
                  </label>
                  <select
                    id="pedido-porciones"
                    value={formData.porciones}
                    onChange={handleChange('porciones')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm appearance-none"
                  >
                    {porciones.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="pedido-fecha" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Fecha del evento
                  </label>
                  <input
                    id="pedido-fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange('fecha')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="pedido-descripcion" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Descripcion de tu pedido *
                </label>
                <textarea
                  id="pedido-descripcion"
                  required
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange('descripcion')}
                  placeholder="Describe como te gustaria tu pastel: sabor, colores, tematica, decoracion, texto, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              {/* Image Upload Zone */}
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  <Image className="w-3.5 h-3.5 inline mr-1" />
                  Imagenes de referencia (max. 3)
                </label>

                {/* Drop zone */}
                {imagenes.length < 3 && (
                  <div
                    ref={dropZoneRef}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? 'border-pink-500 bg-pink-50 scale-[1.02]'
                        : 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => agregarImagenes(e.target.files)}
                      className="hidden"
                      aria-label="Subir imagenes de referencia"
                    />
                    <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${isDragging ? 'text-pink-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600 font-medium">
                      {isDragging ? 'Suelta las imagenes aqui' : 'Arrastra imagenes o haz click para subir'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG o WebP - max 3 imagenes</p>
                  </div>
                )}

                {/* Image previews */}
                {imagenes.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {imagenes.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden aspect-square shadow-sm border border-gray-100">
                        <img
                          src={img.preview}
                          alt={`Referencia ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                        <button
                          type="button"
                          onClick={() => eliminarImagen(i)}
                          aria-label={`Eliminar imagen ${i + 1}`}
                          className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 active:scale-90 transition-all shadow-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {/* Add more slot */}
                    {imagenes.length < 3 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-pink-300 hover:bg-pink-50/50 transition-all"
                        aria-label="Agregar otra imagen"
                      >
                        <Upload className="w-5 h-5 text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-400">Agregar</span>
                      </button>
                    )}
                  </div>
                )}

                <p className="text-[11px] text-gray-400 mt-2">
                  Las imagenes son solo de referencia. Podras compartirlas directamente en el chat de WhatsApp.
                </p>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label htmlFor="pedido-presupuesto" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Presupuesto aproximado
                </label>
                <select
                  id="pedido-presupuesto"
                  value={formData.presupuesto}
                  onChange={handleChange('presupuesto')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm appearance-none"
                >
                  {presupuestos.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formValido}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base active:scale-[0.98] ${
                  formValido
                    ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Enviar pedido por WhatsApp
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Al enviar, se abrira WhatsApp con los detalles de tu pedido para coordinar directamente con nosotros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
