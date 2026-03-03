import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setTooltip(true), 4000)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3">
      {/* Tooltip */}
      {tooltip && (
        <div className="bg-white rounded-xl shadow-xl p-3 sm:p-4 max-w-[200px] sm:max-w-[240px] animate-fade-in-up relative">
          <button
            onClick={() => setTooltip(false)}
            aria-label="Cerrar tooltip"
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">Hola! Necesitas ayuda con tu pedido?</p>
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/51999999999?text=Hola!%20Me%20gustaria%20hacer%20un%20pedido"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-soft"
      >
        <MessageCircle className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
      </a>
    </div>
  )
}
