import React from 'react'
import { Html, useProgress } from '@react-three/drei'

export function ThreeLoader (): React.ReactElement {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-gray-500 min-w-max">
        {Math.round(progress)}% loaded
      </div>
    </Html>
  )
}
