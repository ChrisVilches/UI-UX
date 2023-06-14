import React, { type MutableRefObject, Suspense, useCallback, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Skull } from '../components/Skull'
import { ThreeLoader } from '../components/ThreeLoader'
import { useVerticalRotation } from '../hooks/useVerticalRotation'
import { Description } from '../components/Description'
import { PauseIcon } from '@heroicons/react/20/solid'
import { PlayIcon } from '@heroicons/react/24/solid'
import { Button } from '../components/Button'

export function MainPage (): React.ReactElement {
  const [animationEnabled, setAnimationEnabled] = useState(true)

  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null)

  const verticalRotation: number = useVerticalRotation(canvasRef)

  const toggle = useCallback(() => {
    setAnimationEnabled(state => !state)
  }, [])

  return (
    <div className="flex flex-col place-content-center min-h-screen">
      <section className="mb-4">
        <Description/>
      </section>

      <div className="flex place-content-center mb-5">
        {animationEnabled
          ? <Button onClick={toggle} icon={PauseIcon} className="w-full sm:w-fit bg-red-800 hover:bg-red-700">Stop</Button>
          : <Button onClick={toggle} icon={PlayIcon} className="w-full sm:w-fit bg-green-800 hover:bg-green-700">Resume</Button>
        }
      </div>

      <div className="animation-canvas-container rounded-2xl">
        <Canvas ref={canvasRef}>
          <ambientLight />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[10, 10, 10]} />

          <Suspense fallback={<ThreeLoader/>}>
            <Skull position={[0, -1.5, 0]} verticalRotation={verticalRotation} scale={0.15} animationEnabled={animationEnabled}/>
          </Suspense>
        </Canvas>
      </div>

      <div className="mt-5 text-sm text-gray-500 flex place-content-center">
        Vertical rotation due to mouse position: {verticalRotation.toFixed(3)}
      </div>
    </div>
  )
}
