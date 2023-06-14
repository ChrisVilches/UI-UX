import { type MutableRefObject, useLayoutEffect, useRef } from 'react'
import { resizeContainer } from '../../util/dom'

export function useResize (dep: React.ElementType[]): MutableRefObject<HTMLDivElement | null> {
  const container: MutableRefObject<HTMLDivElement | null> = useRef(null)

  const resize = (): void => {
    if (container.current !== null) {
      console.log('resizing')
      resizeContainer(container.current, [...container.current.children])
    }
  }

  useLayoutEffect(() => {
    const observer = new ResizeObserver(resize)
    observer.observe(document.body)
    console.log('init resize observer')

    return () => {
      observer.disconnect()
    }
  }, [])

  useLayoutEffect(resize, [dep])

  return container
}
