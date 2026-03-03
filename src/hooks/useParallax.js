import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for scroll-based parallax effects.
 * @param {number} speed - Parallax speed multiplier. Positive = moves slower than scroll (background feel), negative = moves faster/opposite.
 * @param {boolean} horizontal - If true, applies horizontal parallax based on scroll.
 * @returns {{ ref, offset }} - ref to attach to element, offset in px
 */
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const elementCenter = rect.top + rect.height / 2
          const distanceFromCenter = elementCenter - windowHeight / 2
          setOffset(distanceFromCenter * speed * -1)
        }
        ticking.current = false
      })
      ticking.current = true
    }
  }, [speed])

  useEffect(() => {
    // Skip parallax on mobile for performance
    if (window.innerWidth < 768) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { ref, offset }
}

/**
 * Hook for mouse-based parallax (follows cursor within element).
 * @param {number} intensity - How much the element moves (px). Default 20.
 * @returns {{ ref, x, y }} - ref to attach to container, x/y offset values
 */
export function useMouseParallax(intensity = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const ticking = useRef(false)

  const handleMouseMove = useCallback((e) => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * intensity
        const y = (e.clientY / window.innerHeight - 0.5) * intensity
        setPosition({ x, y })
        ticking.current = false
      })
      ticking.current = true
    }
  }, [intensity])

  useEffect(() => {
    if (window.innerWidth < 768) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return { ref, ...position }
}
