
import { MutableRefObject, useEffect, useRef, useState, ReactNode } from 'react'

// TODO: Just make it modern and it's done.
// TODO: Add a toggle to add some dummy elements. That way we can check against a non-trivial layout.

const nodeInsideContainer = (e: HTMLElement | null, container: HTMLElement): boolean => {
  if (e === null) return false
  return e === container || nodeInsideContainer(e.parentElement, container)
}

interface InputProps {
  children: ReactNode | ReactNode[]
}

export function Input({ children }: InputProps): JSX.Element {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
   
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(100)

  useEffect(() => {
    if (inputRef.current === null) return

    // TODO: The default size 100 is suspicious. I think the default value is never needed.
    const observer = new ResizeObserver(() => {
      setWidth(inputRef.current?.getBoundingClientRect().width ?? 100)
    })
    observer.observe(inputRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const handle = (e: FocusEvent | MouseEvent) => {
      setOpen(e.target instanceof HTMLElement && nodeInsideContainer(e.target, containerRef.current!))
    }

    document.addEventListener('focusin', handle)
    document.addEventListener('click', handle)

    return () => {
      document.removeEventListener('focusin', handle)
      document.removeEventListener('click', handle)
    }
  }, [])

  // TODO: The overlay can't hide the background too much, since the buttons CAN be clicked (it executes their onClick function, it's not
  //       like a headless UI dialog)

  return (
    <>
      <div className="col-span-10 md:col-span-9 lg:col-span-8 flex flex-col" ref={containerRef}>
      <div className="relative">
        <div className="flex top-0 left-0 justify-end items-center absolute w-full bg-green-500 p-2 bg-opacity-10 z-50 pointer-events-none">
          Some icons here
        </div>
        <input ref={inputRef} placeholder={open ? 'Type your favorite food' : 'Search'} className={`${open ? 'z-40 bg-gray-200 rounded-tl-xl rounded-tr-xl' : 'rounded-xl bg-gray-600'} relative duration-100 p-2 w-full text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white`}/>
        <div className={`inset-0 bg-yellow-600 fixed z-10 pointer-events-none transition-opacity duration-1000 ${open ? 'opacity-10' : 'opacity-0'}`}/>
        {open && (
          <div style={{ width }} className="absolute z-40 rounded-bl-xl rounded-br-xl bg-red-200 text-sm/6 opacity-80">
            {children}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
