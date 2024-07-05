import { MutableRefObject, useLayoutEffect } from "react"

const nodeInsideContainer = (e: HTMLElement | null, container: HTMLElement): boolean => {
  if (e === null) return false
  return e === container || nodeInsideContainer(e.parentElement, container)
}

export function useContainerFocus (
  container: MutableRefObject<HTMLDivElement | null>,
  handle: (v: boolean) => void
) {
  useLayoutEffect(() => {
    const handleEvent = (e: FocusEvent | MouseEvent) => {
      handle(e.target instanceof HTMLElement && nodeInsideContainer(e.target, container.current!))
    }

    document.addEventListener('focusin', handleEvent)
    document.addEventListener('click', handleEvent)

    return () => {
      document.removeEventListener('focusin', handleEvent)
      document.removeEventListener('click', handleEvent)
    }
  }, [handle, container])
}
