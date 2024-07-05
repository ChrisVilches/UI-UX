
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

// TODO: Just make it modern and it's done.
// TODO: Add a toggle to add some dummy elements. That way we can check against a non-trivial layout.
// TODO: Explain that it works best with desktop, and when putting it at the top of the screen.
//       But actually with all the resizing, it should be fine in other places.

// TODO: I think doing "if ref.current == null, return" inside a hook is wrong,
//       because the hook won't execute simply because the ref has been set.
//       Research about this. I have this in many other projects, so try to correct all
//       if possible.
//       I think you can put a useCallback function inside the ref={} and it will execute
//       when the element is visible (or, it mounts).

interface InputProps {
  children: ReactNode | ReactNode[]
}

const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100

export function Input({ children }: InputProps): JSX.Element {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [openTimestamp, setOpenTimestamp] = useState(0)

  const skipClose = useCallback(() => {
    const curr = new Date()
    const skip = curr.getTime() - openTimestamp < WAIT_TIME_ENABLE_CLOSE_OBSERVERS_MS
    return skip
  }, [openTimestamp])

  const verticalResize = useCallback(() => {
    if (skipClose()) return

    const rect = inputRef.current!.getBoundingClientRect()
    
    // TODO: Handle case where the difference is negative (input is below or above viewport)

    const windowRatioMax = 0.8
    const maxBottom = window.innerHeight * windowRatioMax
    const height = maxBottom - rect.top
    const resultHeight = Math.min(height, contentRef.current!.scrollHeight)    
    
    // TODO: This value shouldn't be hardcoded.
    // This shouldn't be opinionated, since some <Content> elements could be smaller than what I'm considering
    //  (but this is just a hardcoded demo so just move this value to a constant and call it done for now,
    //   no need to overly parameterize stuff)
    if (resultHeight < 100) {
      setOpen(false)
    } else {
      setHeight(resultHeight)
    }
  }, [skipClose])

  // TODO: I think there are some size glitches when I scroll the page, then open the
  //       input. It seems it takes one frame to resize. This only started happening
  //       when I added the Lorem to make the page scrollable.

  useResizeObserver(open, inputRef, ({ width }) => { setWidth(width) })
  useResizeObserver(open, contentRef, verticalResize)
  useResizeScrollObserve(open, verticalResize)
  useContainerFocus(containerRef, (v: boolean) => {
    if (v && !open) {
      // TODO: Should format this.
      // TODO: This offset - 20 shouldn't be hardcoded.
      window.scrollTo({
        top: containerRef.current!.offsetTop - 20,
        behavior: 'smooth'
      })

      setOpenTimestamp((new Date()).getTime())
    }

    setOpen(v)
  })
  useEscape(open, () => { setOpen(false) })

  // TODO: Should I leave this?
  useEffect(() => {
    if (!open) return

    const options = { threshold: 0.0 }

    const callback: IntersectionObserverCallback = ([e]) => {
      if (skipClose()) return
      
      if (!e.isIntersecting) setOpen(false)
    }
    
    const observer = new IntersectionObserver(callback, options);
    observer.observe(inputRef.current!)
    return () => {
      observer.disconnect()
    }
  }, [open, openTimestamp, skipClose])

  // TODO: The overlay can't hide the background too much, since the buttons CAN be clicked (it executes their onClick function, it's not
  //       like a headless UI dialog)

  // TODO: Transparent and blurry backgrounds make it difficult to understand where the container is.
  return (
    <>
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
    </>
  )
}
