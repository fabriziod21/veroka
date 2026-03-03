import { useState, useEffect, useRef } from 'react'
import { Search, Star, Heart, X, MessageCircle, ShoppingBag, ArrowLeft, Filter, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card3D from '../components/Card3D'
import Footer from '../components/Footer'
import { useParallax } from '../hooks/useParallax'

const categorias = ['Todos', 'Tortas', 'Cupcakes', 'Postres', 'Panes', 'Bocaditos']

const productos = [
  {
    id: 101,
    nombre: 'Torta de Chocolate Triple',
    categoria: 'Tortas',
    precio: 140,
    rating: 5.0,
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop&q=75',
    descripcion: 'Tres capas de bizcocho de chocolate con ganache belga, crema de cacao y decoracion artesanal con virutas de chocolate.',
    tamanos: ['8 porc.', '12 porc.', '20 porc.', '30 porc.'],
    badge: 'Best Seller'
  },
  {
    id: 102,
    nombre: 'Torta Red Velvet Premium',
    categoria: 'Tortas',
    precio: 135,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&h=500&fit=crop&q=75',
    descripcion: 'Bizcocho rojo aterciopelado con frosting de queso crema Philadelphia. Decorada con petalos de rosa comestibles.',
    tamanos: ['8 porc.', '12 porc.', '20 porc.'],
    badge: null
  },
  {
    id: 103,
    nombre: 'Torta de Zanahoria Especiada',
    categoria: 'Tortas',
    precio: 110,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop&q=75',
    descripcion: 'Bizcocho de zanahoria con canela y nuez moscada, frosting de queso crema y nueces caramelizadas.',
    tamanos: ['8 porc.', '12 porc.', '20 porc.'],
    badge: null
  },
  {
    id: 104,
    nombre: 'Torta Selva Negra',
    categoria: 'Tortas',
    precio: 125,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=500&fit=crop&q=75',
    descripcion: 'Clasica torta alemana con capas de chocolate, cerezas al kirsch y crema batida artesanal.',
    tamanos: ['8 porc.', '12 porc.', '20 porc.'],
    badge: 'Clasico'
  },
  {
    id: 105,
    nombre: 'Torta de Bodas Clasica',
    categoria: 'Tortas',
    precio: 350,
    rating: 5.0,
    imagen: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&h=500&fit=crop&q=75',
    descripcion: 'Torta de 3 pisos con fondant blanco, decoracion floral comestible. Sabor a eleccion del cliente.',
    tamanos: ['30 porc.', '50 porc.', '80 porc.', '100 porc.'],
    badge: 'Especial'
  },
  {
    id: 106,
    nombre: 'Cupcakes Variados x6',
    categoria: 'Cupcakes',
    precio: 45,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&h=500&fit=crop&q=75',
    descripcion: 'Seis cupcakes artesanales: chocolate, vainilla, red velvet, limon, fresa y dulce de leche.',
    tamanos: ['x6', 'x12', 'x24'],
    badge: null
  },
  {
    id: 107,
    nombre: 'Cupcakes de Oreo x6',
    categoria: 'Cupcakes',
    precio: 50,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&h=500&fit=crop&q=75',
    descripcion: 'Cupcakes de chocolate con trozos de Oreo, frosting de cookies & cream y galleta decorativa.',
    tamanos: ['x6', 'x12', 'x24'],
    badge: 'Nuevo'
  },
  {
    id: 108,
    nombre: 'Cupcakes Red Velvet x6',
    categoria: 'Cupcakes',
    precio: 48,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=500&fit=crop&q=75',
    descripcion: 'Cupcakes red velvet con frosting de queso crema y decoracion con virutas rojas.',
    tamanos: ['x6', 'x12', 'x24'],
    badge: null
  },
  {
    id: 109,
    nombre: 'Cheesecake de Fresa',
    categoria: 'Postres',
    precio: 85,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=500&fit=crop&q=75',
    descripcion: 'Cheesecake New York cremoso con base de galleta y coulis de fresas frescas de temporada.',
    tamanos: ['6 porc.', '8 porc.', '12 porc.'],
    badge: 'Popular'
  },
  {
    id: 110,
    nombre: 'Macarons Franceses x12',
    categoria: 'Postres',
    precio: 55,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&h=500&fit=crop&q=75',
    descripcion: 'Doce macarons artesanales en sabores: pistacho, frambuesa, chocolate, vainilla, cafe y limon.',
    tamanos: ['x12', 'x24', 'x48'],
    badge: null
  },
  {
    id: 111,
    nombre: 'Tiramisu Italiano',
    categoria: 'Postres',
    precio: 75,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=500&fit=crop&q=75',
    descripcion: 'Autentico tiramisu con mascarpone italiano, bizcochos soletilla bañados en cafe espresso y cacao.',
    tamanos: ['4 porc.', '8 porc.', '12 porc.'],
    badge: null
  },
  {
    id: 112,
    nombre: 'Pie de Limon',
    categoria: 'Postres',
    precio: 65,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop&q=75',
    descripcion: 'Pie con base crocante de galleta, crema de limon y merengue italiano tostado con soplete.',
    tamanos: ['6 porc.', '8 porc.', '12 porc.'],
    badge: null
  },
  {
    id: 113,
    nombre: 'Croissants de Mantequilla x4',
    categoria: 'Panes',
    precio: 28,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=500&h=500&fit=crop&q=75',
    descripcion: 'Croissants artesanales de mantequilla francesa, hojaldrados y horneados cada manana.',
    tamanos: ['x4', 'x8', 'x12'],
    badge: 'Fresco'
  },
  {
    id: 114,
    nombre: 'Pan de Chocolate Artesanal',
    categoria: 'Panes',
    precio: 18,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop&q=75',
    descripcion: 'Pan brioche relleno de chocolate amargo 70% cacao. Textura suave y sabor intenso.',
    tamanos: ['x2', 'x4', 'x8'],
    badge: null
  },
  {
    id: 115,
    nombre: 'Alfajores de Maicena x8',
    categoria: 'Bocaditos',
    precio: 32,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&h=500&fit=crop&q=75',
    descripcion: 'Alfajores tradicionales de maicena rellenos de dulce de leche y bañados en coco rallado.',
    tamanos: ['x8', 'x16', 'x24'],
    badge: null
  },
  {
    id: 116,
    nombre: 'Trufas de Chocolate x10',
    categoria: 'Bocaditos',
    precio: 40,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1548741487-18d363dc4469?w=500&h=500&fit=crop&q=75',
    descripcion: 'Trufas artesanales de chocolate belga en tres variedades: clasica, naranja y cafe.',
    tamanos: ['x10', 'x20', 'x40'],
    badge: 'Premium'
  },
  {
    id: 117,
    nombre: 'Mini Brownies x12',
    categoria: 'Bocaditos',
    precio: 35,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop&q=75',
    descripcion: 'Brownies fudge con nueces pecanas, textura densa y humeda con centro semi-liquido.',
    tamanos: ['x12', 'x24', 'x48'],
    badge: null
  },
  {
    id: 118,
    nombre: 'Empanadas Dulces x6',
    categoria: 'Bocaditos',
    precio: 25,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1604882355535-0e8e5c14e1b2?w=500&h=500&fit=crop&q=75',
    descripcion: 'Empanadas horneadas rellenas de manzana canela, manjar blanco y chocolate.',
    tamanos: ['x6', 'x12', 'x24'],
    badge: null
  },
]

export default function CatalogoPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [likes, setLikes] = useState({})
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState(0)
  const { ref: decoRef, offset: decoOffset } = useParallax(0.08)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Cerrar modal con Escape + lock body
  useEffect(() => {
    if (!productoSeleccionado) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setProductoSeleccionado(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [productoSeleccionado])

  const productosFiltrados = productos
    .filter(p => categoriaActiva === 'Todos' || p.categoria === categoriaActiva)
    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto)
    setTamanoSeleccionado(0)
  }

  const pedirPorWhatsApp = (producto) => {
    const tamano = producto.tamanos[tamanoSeleccionado]
    const mensaje = `Hola! Me interesa pedir:\n\n*${producto.nombre}*\nTamano: ${tamano}\nPrecio ref: S/ ${producto.precio}\n\nMe pueden dar mas detalles?`
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-gray-900 pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&h=600&fit=crop&q=75"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900" />
        </div>

        {/* Parallax decorative blobs */}
        <div ref={decoRef} className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
          <div
            className="absolute top-10 right-[15%] w-64 h-64 bg-pink-600/10 rounded-full blur-3xl will-change-transform"
            style={{ transform: `translateY(${decoOffset * 1.5}px)` }}
          />
          <div
            className="absolute bottom-0 left-[10%] w-48 h-48 bg-rose-500/10 rounded-full blur-3xl will-change-transform"
            style={{ transform: `translateY(${decoOffset * -1}px)` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Volver al inicio</span>
          </Link>

          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nuestro Catalogo
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Explora nuestra coleccion completa de pasteles, postres y delicias artesanales.
            Haz click en cualquier producto para ver detalles y pedir por WhatsApp.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-8">
            {[
              { num: `${productos.length}+`, label: 'Productos' },
              { num: `${categorias.length - 1}`, label: 'Categorias' },
              { num: '4.8', label: 'Rating promedio' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-white">{stat.num}</p>
                <p className="text-white/40 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog content */}
      <section className="relative py-10 sm:py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filters bar */}
          <div className="sticky top-16 sm:top-20 z-30 bg-gray-50/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-gray-200/50 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  placeholder="Buscar productos..."
                  aria-label="Buscar productos"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm"
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda('')}
                    aria-label="Limpiar busqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    aria-pressed={categoriaActiva === cat}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 active:scale-95 ${
                      categoriaActiva === cat
                        ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                        : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-gray-400 mt-3">
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
              {categoriaActiva !== 'Todos' && ` en ${categoriaActiva}`}
              {busqueda && ` para "${busqueda}"`}
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {productosFiltrados.map((producto) => (
              <Card3D key={producto.id}>
                <article
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100"
                  onClick={() => abrirModal(producto)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      loading="lazy"
                      decoding="async"
                      width="500"
                      height="500"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {producto.badge && (
                      <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-pink-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {producto.badge}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setLikes(prev => ({ ...prev, [producto.id]: !prev[producto.id] }))
                      }}
                      aria-label={likes[producto.id] ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-colors ${
                        likes[producto.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} />
                    </button>

                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                        <span className="text-xs font-medium text-gray-700">Ver detalle</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="text-xs text-gray-500 font-medium">{producto.rating}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 group-hover:text-pink-600 transition-colors line-clamp-1">
                      {producto.nombre}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2 hidden sm:block">{producto.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-pink-600">S/ {producto.precio}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full hidden sm:inline">{producto.categoria}</span>
                    </div>
                  </div>
                </article>
              </Card3D>
            ))}
          </div>

          {/* Empty state */}
          {productosFiltrados.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No encontramos productos</p>
              <p className="text-gray-400 text-sm mt-1">Intenta con otra busqueda o categoria</p>
              <button
                onClick={() => { setBusqueda(''); setCategoriaActiva('Todos') }}
                className="mt-4 text-pink-600 font-medium text-sm hover:text-pink-700 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {/* CTA to custom order */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-pink-600 to-rose-500 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center text-white">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-3">
              No encuentras lo que buscas?
            </h3>
            <p className="text-pink-100 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Hacemos pasteles y postres personalizados para tu ocasion especial.
              Cuentanos tu idea y la hacemos realidad.
            </p>
            <Link
              to="/#pedido-personalizado"
              className="inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 active:bg-pink-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Hacer pedido personalizado
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Product Detail Modal */}
      {productoSeleccionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de ${productoSeleccionado.nombre}`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setProductoSeleccionado(null)}
          />

          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button
              onClick={() => setProductoSeleccionado(null)}
              aria-label="Cerrar detalle"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 active:scale-95 transition-all"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
            </button>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {productoSeleccionado.badge && (
                <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {productoSeleccionado.badge}
                </span>
              )}
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(productoSeleccionado.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">{productoSeleccionado.rating}</span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs text-gray-400">{productoSeleccionado.categoria}</span>
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {productoSeleccionado.nombre}
              </h3>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                {productoSeleccionado.descripcion}
              </p>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Tamano / Cantidad:</p>
                <div className="flex flex-wrap gap-2">
                  {productoSeleccionado.tamanos.map((tamano, i) => (
                    <button
                      key={tamano}
                      onClick={() => setTamanoSeleccionado(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
                        tamanoSeleccionado === i
                          ? 'bg-pink-600 text-white shadow-md shadow-pink-600/25'
                          : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                    >
                      {tamano}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Desde</p>
                  <p className="text-3xl font-bold text-pink-600">S/ {productoSeleccionado.precio}</p>
                </div>
                <button
                  onClick={() => pedirPorWhatsApp(productoSeleccionado)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
