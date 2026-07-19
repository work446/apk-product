import { useState, useEffect } from 'react'

export function useAutoRotate(length: number, intervalMs = 4500) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [length, intervalMs])

  return [index, setIndex] as const
}
