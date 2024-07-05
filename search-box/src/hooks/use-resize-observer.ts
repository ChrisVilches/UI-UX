import { MutableRefObject, useEffect } from "react"

export function useResizeObserver (
  enable: boolean,
  element: MutableRefObject<HTMLDivElement | null>,
  callback: (rect: DOMRect) => void
) {
  useEffect(() => {
    if (!enable || element.current == null) return

    // TODO: The default size 100 is suspicious. I think the default value is never needed.
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
