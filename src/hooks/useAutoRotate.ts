import { useState, useEffect } from 'react'

export function useAutoRotate(length: number, intervalMs = 4500) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (length <= 1) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [length, intervalMs])

  const setIndexWithDir = (val: React.SetStateAction<number>, dir?: number) => {
    setDirection(dir !== undefined ? dir : 1)
    setIndex(val)
  }

  return [index, setIndexWithDir, direction] as const
}
