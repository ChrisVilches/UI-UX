import { useEffect } from 'react'

export function useEscape (cb: () => void): void {
  useEffect(() => {
    const handleEsc = (ev: KeyboardEvent): void => {
      if (ev.code === 'Escape') {
        cb()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [cb])
}
