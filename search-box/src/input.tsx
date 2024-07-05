
import { type MutableRefObject, useRef, useState, type ReactNode, useCallback, useEffect } from 'react'
import { useEscape } from './use-escape'
import { useContainerFocus } from './hooks/use-container-focus'
import { useResizeScrollObserve } from './hooks/use-resize-scroll-observe'
import { useResizeObserver } from './hooks/use-resize-observer'
import { CgSignal } from 'react-icons/cg'
import './input.css'

// NOTE: This is necessary because on mobile, when focusing on the input, it will sometimes open
//       the keyboard, which decreases the viewport height. This will trigger some events that
//       close the input, making it very glitchy.
//       For this reason, I scroll so that the input is at the top, and wait for the scroll to complete.
//       That way, we can start executing input closing events after the input position has been set
//       at the top.
const WAIT_TIME_ENABLE_CLOSE_OBSERVERS_MS = 1000
const MIN_OPEN_HEIGHT = 100
const SCROLL_TOP_OFFSET = 20

// NOTE: There's a weird glitch where if the width is 0 (or too small), the container height
//       Will become too big for a frame, and then resize to the correct size. It seems
//       This happens when the width is too small, but gets fixed if the width is set
//       to a larger value. It seems the cause of this glitch is because of the combination
//       of using both `useResizeObserver` for height and width.
//       It's worth testing on several browsers.
//       Reproduce this issue by changing the value to 0.
const DEFAULT_WIDTH_HACK = 10000

interface InputProps {
  children: ReactNode | ReactNode[]
}

export function Input ({ children }: InputProps): JSX.Element {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(DEFAULT_WIDTH_HACK)
  const [height, setHeight] = useState(0)
  const [openTimestamp, setOpenTimestamp] = useState(0)

  const close = (): void => {
    setHeight(0)
    setWidth(DEFAULT_WIDTH_HACK)
    setOpen(false)
  }

  const skipClose = useCallback(() => {
    const curr = new Date()
    return curr.getTime() - openTimestamp < WAIT_TIME_ENABLE_CLOSE_OBSERVERS_MS
  }, [openTimestamp])

  const verticalResize = useCallback(() => {
    const rect = (inputRef.current as Element).getBoundingClientRect()

    const windowRatioMax = 0.8
    const maxBottom = window.innerHeight * windowRatioMax
    const height = maxBottom - rect.top
    const resultHeight = Math.min(height, (contentRef.current as Element).scrollHeight)

    if (!skipClose() && resultHeight < MIN_OPEN_HEIGHT) {
      close()
    } else {
      setHeight(resultHeight)
    }
  }, [skipClose])

  useResizeObserver(open, contentRef, verticalResize)
  useResizeObserver(open, inputRef, ({ width }) => { setWidth(width) })
  useResizeScrollObserve(open, verticalResize)
  useContainerFocus(containerRef, (v: boolean) => {
    if (v && !open) {
      window.scrollTo({
        top: (containerRef.current as HTMLElement).offsetTop - SCROLL_TOP_OFFSET,
        behavior: 'smooth'
      })

      setOpenTimestamp((new Date()).getTime())
    }

    if (v) {
      setOpen(true)
    } else if (open) {
      close()
    }
  })
  useEscape(open, close)

  useEffect(() => {
    if (!open) return

    const callback: IntersectionObserverCallback = ([e]) => {
      if (skipClose()) return

      if (!e.isIntersecting) close()
    }

    const observer = new IntersectionObserver(callback, { threshold: 0.0 })
    observer.observe(inputRef.current as Element)
    return () => { observer.disconnect() }
  }, [open, openTimestamp, skipClose])

  return (
    <div className="col-span-10 md:col-span-9 lg:col-span-8 flex flex-col" ref={containerRef}>
      <div className="relative">
        {!open && (
          <div className="flex h-full top-0 left-0 justify-end items-center absolute w-full p-2 bg-opacity-10 z-30 pointer-events-none">
            <CgSignal/>
          </div>
        )}
        <input
          ref={inputRef}
          placeholder={open ? 'Type your favorite food' : 'Search'}
          className={`${open ? 'input-open' : 'input-close'} input-base`}/>
        <div className={`inset-0 bg-slate-600 fixed z-10 pointer-events-none transition-opacity duration-1000 ${open ? 'opacity-10' : 'opacity-0'}`}/>
        {open && (
          <div style={{ width, height }} className="shadow-md shadow-neutral-900 overflow-y-auto absolute z-40 rounded-bl-xl rounded-br-xl bg-opacity-30 backdrop-blur-[1000px]">
            <div ref={contentRef}>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
