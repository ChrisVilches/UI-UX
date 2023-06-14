import { type MutableRefObject, useCallback, useState } from 'react'
import { useMouseY } from './useMouseY'

const SOFTEN = 0.01
const MAGNITUDE = 0.16
const NEUTRAL = 1

function mouseMap (mouseY: number, centerY: number): number {
  return (Math.atan((mouseY - centerY) * SOFTEN) * MAGNITUDE) + NEUTRAL
}

export function useVerticalRotation (canvasRef: MutableRefObject<HTMLCanvasElement | null>): number {
  const [verticalRotation, setVerticalRotation] = useState(1)

  const onChangeY = useCallback((mouseY: number): void => {
    if (canvasRef.current === null) return

    const canvas = canvasRef.current
    const rect: DOMRect = canvas.getBoundingClientRect()
    const centerY = rect.top + (rect.height / 2)

    setVerticalRotation(mouseMap(mouseY, centerY))
  }, [canvasRef])

  useMouseY(onChangeY)

  return verticalRotation
}
