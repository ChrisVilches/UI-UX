import { type MutableRefObject, useEffect } from 'react'

export function useResizeObserver (
  enable: boolean,
  element: MutableRefObject<HTMLDivElement | null>,
  callback: (rect: DOMRect) => void
): void {
  useEffect(() => {
    if (!enable || element.current == null) return

    const observer = new ResizeObserver(() => {
      if (element.current != null) {
        callback(element.current.getBoundingClientRect())
      }
    })

    observer.observe(element.current)

    return () => {
      observer.disconnect()
    }
  }, [enable, element, callback])
}
