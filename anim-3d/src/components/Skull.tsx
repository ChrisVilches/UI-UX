import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import skullObj from '../assets/skull/min/skull.obj?url'
import skullMtl from '../assets/skull/min/skull.mtl?url'
import skullJpg from '../assets/skull/min/skull.jpg?url'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { type MutableRefObject, useEffect, useRef } from 'react'
import { decreaseDifference } from '../util/math'

interface SkullProps {
  scale: number
  position: number[]
  animationEnabled: boolean
  verticalRotation: number
}

const ROTATION_INIT = Object.freeze({
  x: Math.PI / 2,
  y: Math.PI,
  z: Math.PI
})

export function Skull ({ verticalRotation, animationEnabled, ...props }: SkullProps): React.ReactElement {
  const materials: MTLLoader.MaterialCreator = useLoader(MTLLoader, skullMtl)

  const obj = useLoader(OBJLoader, skullObj, (loader: OBJLoader) => {
    // TODO: Note, this doesn't support app path (e.g. if the app is deployed in a path other than /).
    const obj = Object.entries(materials.materialsInfo)[0][1]
    obj.map_kd = `${window.location.origin}${skullJpg}`
    materials.preload()
    loader.setMaterials(materials)
  })

  useEffect(() => {
    obj.rotation.set(ROTATION_INIT.x, ROTATION_INIT.y, ROTATION_INIT.z)
  }, [obj])

  useFrame((_state, delta: number) => {
    if (animationEnabled) {
      (obj.rotation.z as number) += delta
      obj.rotation.z %= ROTATION_INIT.z * 2
    }
  })

  const currentVerticalRotation: MutableRefObject<number> = useRef(1)

  useFrame((_state, delta) => {
    currentVerticalRotation.current = decreaseDifference(currentVerticalRotation.current, verticalRotation, delta * 2)
    obj.rotation.x = ROTATION_INIT.x * currentVerticalRotation.current
  })

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={obj} {...props}/>
}
