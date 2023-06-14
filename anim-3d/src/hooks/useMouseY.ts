import { useEffect } from 'react'
import { distinctUntilChanged, fromEvent, map, sampleTime, share } from 'rxjs'

const mouseY$ = fromEvent<MouseEvent>(document, 'mousemove')
  .pipe(
    map(ev => ev.clientY),
    sampleTime(100),
    distinctUntilChanged((a, b) => a === b),
    share()
  )

export function useMouseY (onChange: (mouseY: number) => void): void {
  useEffect(() => {
    const sub = mouseY$.subscribe(onChange)

    return () => {
      sub.unsubscribe()
    }
  }, [onChange])
}
