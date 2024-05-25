import { MutableRefObject, useCallback, useLayoutEffect, useRef, useState } from "react"

const DEFAULT_SCROLL_SIZE = 80

interface ScrollState {
  mousePos: { x: number, y: number }
  dragging: boolean
  dragOffset: { x: number, y: number }
  scrollPercentage: number
  scrollSizeBeforeDrag: number
}

const SCROLL_INITIAL_STATE: ScrollState = {
  mousePos: { x: 0, y: 0 },
  dragging: false,
  dragOffset: { x: 0, y: 0 },
  scrollPercentage: 0,
  scrollSizeBeforeDrag: 0
}

export function useScroll() {
  const scrollContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const scrollState: MutableRefObject<ScrollState> = useRef(SCROLL_INITIAL_STATE)

  const state = scrollState.current
  const container = scrollContainerRef.current!
  const scroll = scrollRef.current!
  const content = contentRef.current!
  
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  const scrollSize = useRef(DEFAULT_SCROLL_SIZE)

  const setScrollSize = useCallback((v: number) => {
    scrollSize.current = v
    scroll.style.width = `${v}px`
  }, [scroll])

  const scrollContent = useCallback(() => {
    const contentWidth = content.scrollWidth
    const scrollToValue = (contentWidth - content.getBoundingClientRect().width) * state.scrollPercentage
    content.scrollLeft = scrollToValue
  }, [state, content])

  const resize = useCallback(() => {
    if (container === null) return
    if (scroll === null) return
    const prevWidth = containerWidth
    
    setContainerHeight(container.getBoundingClientRect().height)
    setContainerWidth(container.getBoundingClientRect().width)
    if (prevWidth === 0) return

    const newContainerWidth = container.getBoundingClientRect().width
    
    const newScrollPosition = (newContainerWidth - scrollSize.current) * state.scrollPercentage
    scroll.style.left = `${newScrollPosition}px`
    
    const newScrollSize = scrollSize.current * newContainerWidth / prevWidth

    setScrollSize(newScrollSize)
    scrollContent()
    // TODO: Is this a cyclic dependency (because of containerWidth)
    //       useEffect executes multiple times because this function is being created again and again thanks to the dependency.
  }, [containerWidth, scrollContent, scrollSize, state, container, scroll, setScrollSize])

  // TODO: This is executed too many times when the scroll is resized. At least I'm cleaning the event listeners.

  useLayoutEffect(() => {
    if (container === null) return
    if (scroll === null) return
    // console.log('useEffect *****************')
    const sizeObserver = new ResizeObserver(resize)
    resize()

    sizeObserver.observe(document.body)

    const verticalDrag = () => {
      if (!state.dragging) return

      const dy = (state.mousePos.y - scroll.getBoundingClientRect().top) - state.dragOffset.y
      const slope = 0.8
      const newSize = slope * -dy + state.scrollSizeBeforeDrag
      const MIN_SCROLL_SIZE = 20

      setScrollSize(Math.max(MIN_SCROLL_SIZE, Math.min(newSize, containerWidth)))
    }

    const horizontalDrag = () => {
      if (!state.dragging) return

      const offset = container.getBoundingClientRect().left
      scroll.style.left = `${state.mousePos.x - offset - state.dragOffset.x}px`

      if (scroll.getBoundingClientRect().right > container.getBoundingClientRect().right) {
        const containerWidth = container.getBoundingClientRect().width
        const scrollWidth = scroll.getBoundingClientRect().width
        scroll.style.left = `${containerWidth - scrollWidth}px`
      }

      if (scroll.getBoundingClientRect().left < container.getBoundingClientRect().left) {
        scroll.style.left = "0px"
      }

      state.scrollPercentage = (scroll.getBoundingClientRect().left - offset) / (container.getBoundingClientRect().width - scroll.getBoundingClientRect().width)
      scrollContent()
    }

    const mousemove = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      state.mousePos.x = e.clientX
      state.mousePos.y = e.clientY
      horizontalDrag()
      verticalDrag()
    }

    const touchmove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      state.mousePos.x = e.targetTouches[0].clientX
      state.mousePos.y = e.targetTouches[0].clientY
      horizontalDrag()
      verticalDrag()
    }

    const mousedown = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      state.dragging = true
      state.scrollSizeBeforeDrag = scrollSize.current
      state.dragOffset.x = e.offsetX
      state.dragOffset.y = e.offsetY
    }

    const touchstart = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      state.dragging = true
      state.scrollSizeBeforeDrag = scrollSize.current
      state.dragOffset.x = e.targetTouches[0].pageX - scroll.getBoundingClientRect().left;
      state.dragOffset.y = e.targetTouches[0].pageY - scroll.getBoundingClientRect().top;
    }

    const stopDragging = () => {
      state.dragging = false
    }

    const nativeScroll = (e: Event) => {
      const leftValue = (container.getBoundingClientRect().width - scroll.getBoundingClientRect().width) *  (e.target as HTMLDivElement).scrollLeft / (contentRef.current!.scrollWidth - contentRef.current!.getBoundingClientRect().width)
      scroll.style.left = `${leftValue}px`
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('touchmove', touchmove)
    scroll.addEventListener('mousedown', mousedown)
    scroll.addEventListener('touchstart', touchstart)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('touchend', stopDragging)
    content.addEventListener('scroll', nativeScroll)

    return () => {
      sizeObserver.disconnect()
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('touchmove', touchmove)
      scroll.removeEventListener('mousedown', mousedown)
      scroll.removeEventListener('touchstart', touchstart)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('touchend', stopDragging)
      content.removeEventListener('scroll', nativeScroll)
    }

  }, [resize, scrollContent, containerWidth, scrollSize, state, container, scroll, content, setScrollSize])


  // TODO: Is this correct???????? it has a containerWidth^2
  // TODO: I think the name has to be changed...
  const contentWidth = containerWidth * containerWidth / scrollSize.current

  return {
    containerHeight,
    containerWidth,
    scrollContainerRef,
    scrollRef,
    contentRef,
    contentWidth
  }
}
