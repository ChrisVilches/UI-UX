// TODO: A good improvement would be to make only the visible content (by using the scrolling data)
//       to render, but this seems a bit difficult to implement.
//       Try using react-window. I know the full width of the grid to be rendered, so that helps.

// TODO: May want to change the name. Just say in the description the scroll is custom inspired by Ableton or video editing software.
//       The name needs to be descriptive, and not many people know Ableton. Also, I already wrote "custom scroll" in the HTML title tag.

import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const COLS = Math.round(Math.random() * 50 + 50)
const ROWS = 8

function randomSet(n: number): Set<number> {
  const res = new Set<number>()
  for (let i = 0; i < n; i++) {
    if (Math.random() > 0.8) {
      res.add(i)
    }
  }
  return res
}
// TODO: Make a button that randomizes the data, and also randomizes the N size.
//       That way I can verify the data resizing works properly.
const gridData = Array(ROWS).fill(null).map(() => randomSet(COLS))

// TODO: Randomize colors. Create color set, shuffle, then pick the first N items. (that way they are all different)
// TODO: Use darker colors, or more beautiful colors.
const dataColors = ['#ff0000', '#308782', '#F5DEB3', '#008b8b', '#01027b', '#95bedd', '#ec833f', '#ffd76a']

function compressRanges(arr: number[]) {
  const groups: number[][] = []

  arr.sort((a: number, b: number) => a - b)
  for (const x of arr) {
    if (groups.length === 0 || groups[groups.length - 1][1] + 1 !== x) {
      groups.push([x, x])
    }
    groups[groups.length - 1][1] = x
  }
  return groups
}

const compressedGridData = gridData.map(s => compressRanges([...s.values()]))

const emptyCellColors = ['#c0c0c0', '#dadada']
function Grid({ cellWidth }: { cellWidth: number }) {
  const defaultBorderColor = '#7a7a7a'
  return (
    <>
        {Array(ROWS).fill(null).map((_, rowIdx) => (
          <div key={rowIdx} className="flex flex-cols">
            {Array(COLS).fill(null).map((_, colIdx) => (
              gridData[rowIdx].has(colIdx) ? (
                <div key={colIdx} className="border-[1px] h-10" style={{
                  borderTopColor: defaultBorderColor,
                  borderBottomColor: defaultBorderColor,
                  borderRightColor: gridData[rowIdx].has(colIdx + 1) ? dataColors[rowIdx] : defaultBorderColor,
                  borderLeftColor: gridData[rowIdx].has(colIdx - 1) ? dataColors[rowIdx] : defaultBorderColor,
                  minWidth: cellWidth,
                  backgroundColor: dataColors[rowIdx]
                }}></div>
              ) : (
                <div key={colIdx} className="border-[1px] h-10" style={{
                  minWidth: cellWidth,
                  backgroundColor: emptyCellColors[colIdx % 2],
                  borderColor: defaultBorderColor
                }}></div>
              )
            ))}
          </div>
        ))}
    </>
  )
}

function GridPreview({ containerWidth, containerHeight }: { containerWidth: number, containerHeight: number }) {
  const w = containerWidth / COLS
  const h = containerHeight / ROWS
  return (
    <svg className="w-full">
      {Array(ROWS).fill(null).map((_, rowIdx) => (
        compressedGridData[rowIdx].map(([from, to]) => (
          <rect key={from} y={rowIdx * h} height={h} width={w * (to - from + 1)} x={w * from} fill={dataColors[rowIdx]}></rect>
        ))
      ))}
    </svg>
  )
}

function App() {
  const scrollContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const mousePos: MutableRefObject<{ x: number, y: number }> = useRef({ x: 0, y: 0 })
  const dragging: MutableRefObject<boolean> = useRef(false)
  const dragOffset: MutableRefObject<number> = useRef(0)
  const scrollPercentage: MutableRefObject<number> = useRef(0)

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [cellWidth, setCellWidth] = useState(50)
  const [scrollSize, setScrollSize] = useState(80)
  // TODO: Implement zoom in/out using the Y movement (while dragging).
  // TODO: Make the tiles more pretty.
  // TODO: Make everything more pretty.
  // TODO: When the scroll size increases (due to zoom change), it must not
  //       get out of boundaries. Do a check to avoid that.
  // TODO: Test with different datasets, and different window sizes.
  // TODO: When the user resizes the screen, the scroll may get bigger than the container.
  //       implement some logic so that the scroll never becomes bigger than the container.
  // TODO: Scroll should increase in size whenever the window also gets enlarged.
  // TODO: When the user clicks on the scrollbar, it should move to that position (maybe with animation?).
  // TODO: Make it mobile friendly??? Maybe make a version with less data so that it's not difficult to navigate.
  //       It's possible to check whether the user is using mobile or desktop.

  const scrollContent = useCallback(() => {
    const contentWidth = contentRef.current!.scrollWidth
    const scrollToValue = (contentWidth - contentRef.current!.getBoundingClientRect().width) * scrollPercentage.current
    contentRef.current!.scrollLeft = scrollToValue
    // console.log(scrollPercentage.current)
  }, [])

  const resize = useCallback(() => {
    const prevWidth = containerWidth || 800
    setContainerHeight(scrollContainerRef.current!.getBoundingClientRect().height)
    setContainerWidth(scrollContainerRef.current!.getBoundingClientRect().width)

    const scrollWidth = scrollRef.current!.getBoundingClientRect().width
    const newContainerWidth = scrollContainerRef.current!.getBoundingClientRect().width
    const previewCellWidth = newContainerWidth / COLS
    
    const newScrollPosition = (newContainerWidth - scrollWidth) * scrollPercentage.current
    scrollRef.current!.style.left = `${newScrollPosition}px`
    
    const newScrollSize = scrollSize * newContainerWidth / prevWidth

    setScrollSize(newScrollSize)
    setCellWidth(previewCellWidth * newContainerWidth / newScrollSize)
    scrollContent()
    // TODO: Is this a cyclic dependency (because of containerWidth)
  }, [containerWidth, scrollContent, scrollSize])

  useEffect(() => {
    const container = scrollContainerRef.current!
    const scroll = scrollRef.current!

    const sizeObserver = new ResizeObserver(resize)
    resize()

    // TODO: Clean
    sizeObserver.observe(document.body)

    const drag = () => {
      if (!dragging.current) return

      const offset = container.getBoundingClientRect().left
      scroll.style.left = `${mousePos.current.x - offset - dragOffset.current}px`

      if (scroll.getBoundingClientRect().right > container.getBoundingClientRect().right) {
        const containerWidth = container.getBoundingClientRect().width
        const scrollWidth = scroll.getBoundingClientRect().width
        scroll.style.left = `${containerWidth - scrollWidth}px`
      }

      if (scroll.getBoundingClientRect().left < container.getBoundingClientRect().left) {
        scroll.style.left = "0px"
      }

      scrollPercentage.current = (scroll.getBoundingClientRect().left - offset) / (container.getBoundingClientRect().width - scroll.getBoundingClientRect().width)
      scrollContent()
    }

    document.addEventListener('mousemove', (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      drag()
    })

    document.addEventListener('touchmove', (e) => {
      mousePos.current.x = e.targetTouches[0].clientX
      mousePos.current.y = e.targetTouches[0].clientY
      drag()
    })

    // TODO: Almost works, but if the mouseup is outside the div, the event is not executed.
    scroll.addEventListener('mousedown', function(e) {
      dragging.current = true
      dragOffset.current = e.offsetX
    })

    scroll.addEventListener('touchstart', function(e) {
      dragging.current = true
      dragOffset.current = e.targetTouches[0].pageX - scroll.getBoundingClientRect().left;
    })

    document.addEventListener('mouseup', function() {
      dragging.current = false
    })

    document.addEventListener('touchend', function() {
      dragging.current = false
    })

  }, [resize, scrollContent])

  // TODO: Improve these functions.
  const zoomIn = () => {
    setScrollSize((s) => Math.min(160, s + 20))
    resize()
  }
  const zoomOut = () => {
    setScrollSize((s) => Math.max(80, s - 20))
    resize()
  }

  return (
    <div className="container mx-auto">
      <div className="bg-slate-600 w-full h-20" ref={scrollContainerRef}>
        <div className="absolute h-20">
          <div className="bg-slate-800 hover:bg-slate-700 transition-colors duration-150 z-40 h-full relative opacity-80 select-none" style={{ width: scrollSize }} ref={scrollRef}></div>
        </div>

        <div className="h-20 select-none opacity-50">
          <GridPreview containerWidth={containerWidth} containerHeight={containerHeight}/>
        </div>
      </div>

      <div className="overflow-x-hidden select-none mt-4" ref={contentRef}>
        <Grid cellWidth={cellWidth}/>
      </div>

      <div className="flex flex-row space-x-2 mt-4">
        <button className="bg-green-800" onClick={zoomOut}>-</button>
        <button className="bg-green-800" onClick={zoomIn}>+</button>
      </div>
    </div>
  )
}

export default App
