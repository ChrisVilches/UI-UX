import { useEffect } from 'react'

export function useEscape (enable: boolean, cb: () => void): void {
  useEffect(() => {
    if (!enable) return

    const handleEsc = (ev: KeyboardEvent): void => {
      if (ev.code === 'Escape') {
        cb()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [cb, enable])
}
