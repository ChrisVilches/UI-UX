// TODO: May want to change the name. Just say in the description the scroll is custom inspired by Ableton or video editing software.
//       The name needs to be descriptive, and not many people know Ableton. Also, I already wrote "custom scroll" in the HTML title tag.

import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function randomSet(n: number): Set<number> {
  const res = new Set<number>()
  for (let i = 0; i < n; i++) {
    if (Math.random() > 0.8) {
      res.add(i)
    }
  }
  return res
}

const dataColors = ['#345635', '#D4AC0D', '#1A5276', '#7E102C', '#6C3483']

function getColor(idx: number) {
  return dataColors[idx % dataColors.length]
}

const emptyCellColors = ['#d1d1d1', '#dadada']

interface GridProps {
  cellWidth: number
  rows: number
  cols: number
  data: Array<Set<number>>
}

function Grid({ cellWidth, rows, cols, data }: GridProps) {
  const defaultBorderColor = '#bababa'
  // TODO: This is messy as hell.
  // TODO: Maybe I could darken the color, and use that for the border.

  return (
    <>
        {Array(rows).fill(null).map((_, rowIdx) => (
          <div key={rowIdx} className="flex flex-cols">
            {Array(cols).fill(null).map((_, colIdx) => (
              data[rowIdx].has(colIdx) ? (
                <div key={colIdx} className="border-[1px] h-10" style={{
                  borderTopColor: defaultBorderColor,
                  borderBottomColor: defaultBorderColor,
                  borderRightColor: data[rowIdx].has(colIdx + 1) ? getColor(rowIdx) : defaultBorderColor,
                  // borderBottomRightRadius: data[rowIdx].has(colIdx + 1) ? 0 : borderRadius,
                  // borderTopRightRadius: data[rowIdx].has(colIdx + 1) ? 0 : borderRadius,
                  // borderBottomLeftRadius: data[rowIdx].has(colIdx - 1) ? 0 : borderRadius,
                  // borderTopLeftRadius: data[rowIdx].has(colIdx - 1) ? 0 : borderRadius,
                  borderLeftColor: data[rowIdx].has(colIdx - 1) ? getColor(rowIdx) : defaultBorderColor,
                  minWidth: cellWidth,
                  backgroundColor: getColor(rowIdx)
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

interface GridPreviewProps {
  containerWidth: number
  containerHeight: number
  cols: number
  rows: number,
  data: Array<Set<number>>
}

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


function GridPreview({ containerWidth, containerHeight, cols, rows, data }: GridPreviewProps) {
  const w = containerWidth / cols
  const h = containerHeight / rows
  const compressedGridData = useMemo(() => data.map(s => compressRanges([...s.values()])), [data])
  return (
    <svg className="w-full">
      {Array(rows).fill(null).map((_, rowIdx) => (
        compressedGridData[rowIdx].map(([from, to]) => (
          <rect key={from} y={rowIdx * h} height={h} width={w * (to - from + 1)} x={w * from} fill={getColor(rowIdx)}></rect>
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
  const dragOffset: MutableRefObject<{ x: number, y: number }> = useRef({ x: 0, y: 0 })
  const scrollPercentage: MutableRefObject<number> = useRef(0)
  const scrollSizeBeforeDrag: MutableRefObject<number> = useRef(0)

  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)
  const [gridData, setGridData] = useState<Array<Set<number>>>([])

  const generate = useCallback(() => {
    console.log('******************** GENERATING ******************')
    const rows = Math.round((Math.random() * 5) + 5)
    const cols = Math.round(Math.random() * 50 + 50)
    setRows(rows)
    setCols(cols)
    setGridData(Array(rows).fill(null).map(() => randomSet(cols)))
  }, [])

  useEffect(generate, [generate])

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [scrollSize, setScrollSize] = useState(80)
  // TODO: Infinite loop when resizing. I think the hooks are executing too many updates.
  // TODO: (I THINK SOLVED) When the screen is small, if I scroll to the right (to the end) it will glitch. This seems to happen
  //       when the scroll container has no margin with respect to the screen.
  // TODO: When the user clicks on the scrollbar, it should move to that position (maybe with animation?).

  const scrollContent = useCallback(() => {
    // console.log('Scrolling')
    const contentWidth = contentRef.current!.scrollWidth
    const scrollToValue = (contentWidth - contentRef.current!.getBoundingClientRect().width) * scrollPercentage.current
    contentRef.current!.scrollLeft = scrollToValue
  }, [])

  const resize = useCallback(() => {
    const prevWidth = containerWidth
    // console.log('Resizing')
    
    setContainerHeight(scrollContainerRef.current!.getBoundingClientRect().height)
    setContainerWidth(scrollContainerRef.current!.getBoundingClientRect().width)
    if (prevWidth === 0) return

    const newContainerWidth = scrollContainerRef.current!.getBoundingClientRect().width
    
    const newScrollPosition = (newContainerWidth - scrollSize) * scrollPercentage.current
    scrollRef.current!.style.left = `${newScrollPosition}px`
    
    const newScrollSize = scrollSize * newContainerWidth / prevWidth

    setScrollSize(newScrollSize)
    scrollContent()
    // TODO: Is this a cyclic dependency (because of containerWidth)
    //       useEffect executes multiple times because this function is being created again and again thanks to the dependency.
  }, [containerWidth, scrollContent, scrollSize])

  const previewCellWidth = containerWidth / cols
  const cellWidth = previewCellWidth * containerWidth / scrollSize

  // TODO: This is executed too many times when the scroll is resized. At least I'm cleaning the event listeners.
  useLayoutEffect(() => {
    // console.log('useEffect *****************')
    const container = scrollContainerRef.current!
    const scroll = scrollRef.current!

    const sizeObserver = new ResizeObserver(resize)
    resize()

    sizeObserver.observe(document.body)

    const verticalDrag = () => {
      if (!dragging.current) return
      // TODO: This can be improved so that it's expanded to both sides,
      //       but it seems I need more variables to do that.

      const dy = (mousePos.current.y - scrollRef.current!.getBoundingClientRect().top) - dragOffset.current.y
      const slope = 0.8
      const newSize = slope * -dy + scrollSizeBeforeDrag.current
      const MIN_SCROLL_SIZE = 20

      setScrollSize(Math.max(MIN_SCROLL_SIZE, Math.min(newSize, containerWidth)))
    }

    const horizontalDrag = () => {
      if (!dragging.current) return

      const offset = container.getBoundingClientRect().left
      scroll.style.left = `${mousePos.current.x - offset - dragOffset.current.x}px`

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

    const mousemove = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      horizontalDrag()
      verticalDrag()
    }

    const touchmove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      mousePos.current.x = e.targetTouches[0].clientX
      mousePos.current.y = e.targetTouches[0].clientY
      horizontalDrag()
      verticalDrag()
    }

    const mousedown = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragging.current = true
      scrollSizeBeforeDrag.current = scrollSize
      dragOffset.current.x = e.offsetX
      dragOffset.current.y = e.offsetY
    }

    const touchstart = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragging.current = true
      scrollSizeBeforeDrag.current = scrollSize
      dragOffset.current.x = e.targetTouches[0].pageX - scroll.getBoundingClientRect().left;
      dragOffset.current.y = e.targetTouches[0].pageY - scroll.getBoundingClientRect().top;
    }

    const stopDragging = () => {
      dragging.current = false
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('touchmove', touchmove)
    scroll.addEventListener('mousedown', mousedown)
    scroll.addEventListener('touchstart', touchstart)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('touchend', stopDragging)

    return () => {
      sizeObserver.disconnect()
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('touchmove', touchmove)
      scroll.removeEventListener('mousedown', mousedown)
      scroll.removeEventListener('touchstart', touchstart)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('touchend', stopDragging)
    }

  }, [resize, scrollContent, containerWidth, scrollSize])

  return (
    <div className="container px-4 md:mx-auto mt-8">
      <div className="bg-slate-600 w-full h-20 touch-pan-x" ref={scrollContainerRef}>
        <div className="absolute h-20">
          <div className="bg-slate-800 hover:bg-slate-700 transition-colors duration-150 z-40 h-full relative opacity-85 select-none" style={{ width: scrollSize }} ref={scrollRef}></div>
        </div>

        <div className="h-20 select-none opacity-50">
          <GridPreview containerWidth={containerWidth} containerHeight={containerHeight} rows={rows} cols={cols} data={gridData}/>
        </div>
      </div>

      <div className="overflow-x-hidden select-none mt-4" ref={contentRef}>
        <Grid cellWidth={cellWidth} rows={rows} cols={cols} data={gridData}/>
      </div>

      <div className="mt-8">
        <button className="p-4 bg-green-800 rounded-md" onClick={generate}>Randomize</button>
      </div>
    </div>
  )
}

export default App
