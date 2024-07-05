import { useEffect } from "react"

export function useResizeScrollObserve (enable: boolean, cb: () => void) {
  useEffect(() => {
    if (!enable) return

    document.addEventListener('scroll', cb)
    window.addEventListener('resize', cb)
    return () => {
      document.removeEventListener('scroll', cb)
      window.removeEventListener('resize', cb)
    }
  }, [cb, enable])
}
