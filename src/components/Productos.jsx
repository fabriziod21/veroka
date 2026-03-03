import { useState } from 'react'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import Card3D from './Card3D'

const categorias = ['Todos', 'Tortas', 'Cupcakes', 'Postres', 'Panes']

const productos = [
  {
    id: 1,
    nombre: 'Torta de Chocolate Belga',
    categoria: 'Tortas',
    precio: 120,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&q=75',
    descripcion: 'Tres capas de bizcocho con ganache de chocolate belga',
    badge: 'Mas vendido'
  },
  {
    id: 2,
    nombre: 'Torta Red Velvet',
    categoria: 'Tortas',
    precio: 130,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400&h=400&fit=crop&q=75',
    descripcion: 'Suave bizcocho rojo con frosting de queso crema',
    badge: 'Nuevo'
  },
  {
    id: 3,
    nombre: 'Cupcakes Variados x6',
    categoria: 'Cupcakes',
    precio: 45,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop&q=75',
    descripcion: 'Seis cupcakes con sabores surtidos y decoracion artesanal',
    badge: null
  },
  {
    id: 4,
    nombre: 'Cheesecake de Fresa',
    categoria: 'Postres',
    precio: 85,
    rating: 4.9,
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop&q=75',
    descripcion: 'Cheesecake cremoso con coulis de fresas frescas',
    badge: 'Popular'
  },
  {
    id: 5,
    nombre: 'Pan de Chocolate',
    categoria: 'Panes',
    precio: 15,
    rating: 4.6,
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&q=75',
    descripcion: 'Pan artesanal relleno de chocolate amargo',
    badge: null
  },
  {
    id: 6,
    nombre: 'Torta de Zanahoria',
    categoria: 'Tortas',
    precio: 95,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop&q=75',
    descripcion: 'Bizcocho especiado con frosting de queso crema y nueces',
    badge: null
  },
  {
    id: 7,
    nombre: 'Macarons x12',
    categoria: 'Postres',
    precio: 55,
    rating: 4.7,
    imagen: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop&q=75',
    descripcion: 'Doce macarons franceses en sabores variados',
    badge: null
  },
  {
    id: 8,
    nombre: 'Croissants x4',
    categoria: 'Panes',
    precio: 28,
    rating: 4.8,
    imagen: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=400&fit=crop&q=75',
    descripcion: 'Croissants de mantequilla horneados cada manana',
    badge: 'Fresco'
  },
]

export default function Productos() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [likes, setLikes] = useState({})

  const productosFiltrados = categoriaActiva === 'Todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva)

  return (
    <section id="productos" aria-label="Nuestros productos" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-pink-600 font-semibold text-xs sm:text-sm tracking-wider uppercase">Nuestro Menu</span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
            Productos Destacados
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Cada producto esta elaborado con los mejores ingredientes y todo el amor de nuestras pasteleras
          </p>
        </div>

        {/* Filtros - scroll horizontal en mobile */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              aria-pressed={categoriaActiva === cat}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 active:scale-95 ${
                categoriaActiva === cat
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                  : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {productosFiltrados.map((producto) => (
            <Card3D key={producto.id}>
            <article
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={producto.imagen}
                  alt={`${producto.nombre} - ${producto.descripcion}`}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {producto.badge && (
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-pink-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {producto.badge}
                  </span>
                )}

                {/* Like button */}
                <button
                  onClick={() => setLikes(prev => ({ ...prev, [producto.id]: !prev[producto.id] }))}
                  aria-label={likes[producto.id] ? `Quitar ${producto.nombre} de favoritos` : `Agregar ${producto.nombre} a favoritos`}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-colors ${
                    likes[producto.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`} />
                </button>

                {/* Quick add - solo desktop */}
                <button
                  aria-label={`Agregar ${producto.nombre} al carrito`}
                  className="absolute bottom-3 right-3 bg-pink-600 text-white w-10 h-10 rounded-full hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-700 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 sm:p-5">
                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">{producto.rating}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-pink-600 transition-colors line-clamp-1 sm:line-clamp-none">
                  {producto.nombre}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2 hidden sm:block">{producto.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-xl font-bold text-pink-600">S/ {producto.precio}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full hidden sm:inline">{producto.categoria}</span>
                </div>
              </div>
            </article>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
