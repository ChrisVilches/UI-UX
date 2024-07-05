
import { MutableRefObject, useRef, useState, ReactNode, useCallback, useEffect } from 'react'
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

interface InputProps {
  children: ReactNode | ReactNode[]
}

export function Input({ children }: InputProps): JSX.Element {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [openTimestamp, setOpenTimestamp] = useState(0)

  const skipClose = useCallback(() => {
    const curr = new Date()
    const skip = curr.getTime() - openTimestamp < WAIT_TIME_ENABLE_CLOSE_OBSERVERS_MS
    return skip
  }, [openTimestamp])

  const verticalResize = useCallback(() => {
    const rect = inputRef.current!.getBoundingClientRect()
    
    const windowRatioMax = 0.8
    const maxBottom = window.innerHeight * windowRatioMax
    const height = maxBottom - rect.top
    const resultHeight = Math.min(height, contentRef.current!.scrollHeight)    
    
    if (!skipClose() && resultHeight < MIN_OPEN_HEIGHT) {
      setOpen(false)
    } else {
      setHeight(resultHeight)
    }
  }, [skipClose])

  // TODO: I think there are some size glitches when I scroll the page, then open the
  //       input. It seems it takes one frame to resize. This only started happening
  //       when I added the Lorem to make the page scrollable.
  //       2024/07/05 Still have this problem. The height is larger for a frame, then
  //       adjusts and becomes the correct height.

  useResizeObserver(open, inputRef, ({ width }) => { setWidth(width) })
  useResizeObserver(open, contentRef, verticalResize)
  useResizeScrollObserve(open, verticalResize)
  useContainerFocus(containerRef, (v: boolean) => {
    if (v && !open) {
      // TODO: Should format this.
      window.scrollTo({
        top: containerRef.current!.offsetTop - SCROLL_TOP_OFFSET,
        behavior: 'smooth'
      })

      setOpenTimestamp((new Date()).getTime())
    }

    setOpen(v)
  })
  useEscape(open, () => { setOpen(false) })

  useEffect(() => {
    if (!open) return

    const callback: IntersectionObserverCallback = ([e]) => {
      if (skipClose()) return
      
      if (!e.isIntersecting) setOpen(false)
    }
    
    const observer = new IntersectionObserver(callback, { threshold: 0.0 });
    observer.observe(inputRef.current!)
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
