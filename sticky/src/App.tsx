import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import './App.css'
import { ContentItem } from './content-item'
import { NonStickySection } from './non-sticky-section'

const cardsConfig = Array(15).fill(null).map(() => Math.ceil(Math.random() * 15))
const SIDEBAR_ELEMENTS = 15

function App() {
  const sidebarRef: MutableRefObject<HTMLDivElement | null> = useRef(null)


  const hackyResize = (): void => {
    const container = sidebarRef.current!

    const { top, bottom } = container.getBoundingClientRect()

    const mustResize = bottom > window.innerHeight || (top < window.innerHeight && top >= 0)

    if (!mustResize) return

    container.style.height = `${window.innerHeight - top}px`

    if (window.innerHeight < container.getBoundingClientRect().bottom) {
      let lo = 0
      let hi = container.getBoundingClientRect().bottom
      for (let iter = 0; iter < 20; iter++) {
        const mid = (lo + hi) / 2
        container.style.height = `${mid}px`
        const newBottom = container.getBoundingClientRect().bottom

        // The idea of this binary search is to make these two values equal
        // (newBottom == window.innerHeight) so that the bottom of the container is touching the bottom part
        // of the window.
        // The above calculation "window.innerHeight - top" doesn't work (if it did, this binary search
        // wouldn't be necessary).
        // Maybe it's possible with another approach.
        if (newBottom < window.innerHeight) {
          lo = mid
        } else {
          hi = mid
        }
      }
    }
  }
  
  useLayoutEffect(() => {
    document.onscroll = hackyResize
    window.onresize = hackyResize
    return () => {
      document.onscroll = null
      window.onresize = null
    }
  }, [])

  return (
    <div className="container mx-auto">
      <NonStickySection variant="red"/>
      <NonStickySection variant="yellow"/>
      <NonStickySection variant="red"/>
      <div>
        <div className="sticky top-0 z-20">

          <div className="bg-green-800 my-10 mb-0 p-20">
            Sticky section
          </div>
          <div className="min-h-12 hide-content"></div>
        </div>

        <div>
          <div className="shrink-0 flex flex-row space-x-10">
            <div>
              <div className="sticky top-[14.5rem]">
                <div className="bg-slate-500 overflow-y-scroll" ref={sidebarRef}>
                  {Array(SIDEBAR_ELEMENTS).fill(null).map((_, idx) => (
                    <div key={idx} className="bg-red-800 p-8 pr-20 m-4 truncate">Sidebar menu {idx + 1}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {cardsConfig.map((elem, idx) => <ContentItem cardTitleclassName='top-56' paragraphs={elem} key={idx}/>)}
            </div>
          </div>
        </div>
      </div>

      <NonStickySection variant="red"/>
      <NonStickySection variant="yellow"/>
      <NonStickySection variant="red"/>

      <div className="bg-blue-800 my-10 p-20 sticky top-0">
        Sticky element
      </div>

      <NonStickySection variant="red"/>
      <NonStickySection variant="yellow"/>
      <NonStickySection variant="red"/>
      <NonStickySection variant="red"/>
      <NonStickySection variant="yellow"/>
      <NonStickySection variant="red"/>
    </div>
  )
}

export default App
