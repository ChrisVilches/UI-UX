/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type MutableRefObject, useCallback, useLayoutEffect, useRef, useState } from 'react'

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

interface UseScrollReturn {
  contentWidth: number
  containerHeight: number
  containerWidth: number
  scrollRef: MutableRefObject<HTMLDivElement | null>
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>
  contentRef: MutableRefObject<HTMLDivElement | null>
}

export function useScroll (): UseScrollReturn {
  const scrollContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const scrollState: MutableRefObject<ScrollState> = useRef(SCROLL_INITIAL_STATE)

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  const [contentWidth, setContentWidth] = useState(0)
  const scrollSizeRef = useRef(DEFAULT_SCROLL_SIZE)

  const setScrollSize = useCallback((v: number): void => {
    scrollSizeRef.current = v
    setContentWidth(containerWidth * containerWidth / v)
    scrollRef.current!.style.width = `${v}px`
  }, [containerWidth])

  const scrollContent = (): void => {
    const contentWidth = contentRef.current!.scrollWidth
    const scrollToValue = (contentWidth - contentRef.current!.getBoundingClientRect().width) * scrollState.current.scrollPercentage
    contentRef.current!.scrollLeft = scrollToValue
  }

  const resize = useCallback(() => {
    const container = scrollContainerRef.current
    const scroll = scrollRef.current
    if (container === null) return
    if (scroll === null) return
    const prevWidth = containerWidth
    const scrollSize = scrollSizeRef.current

    setContainerHeight(container.getBoundingClientRect().height)
    setContainerWidth(container.getBoundingClientRect().width)
    if (prevWidth === 0) return

    const newContainerWidth = container.getBoundingClientRect().width

    const newScrollPosition = (newContainerWidth - scrollSize) * scrollState.current.scrollPercentage
    scroll.style.left = `${newScrollPosition}px`

    const newScrollSize = scrollSize * newContainerWidth / prevWidth

    setScrollSize(newScrollSize)
    scrollContent()
    // TODO: Is this a cyclic dependency (because of containerWidth)
    //       useEffect executes multiple times because this function is being created again and again thanks to the dependency.
  }, [containerWidth, setScrollSize])

  // TODO: This is executed too many times when the scroll is resized. At least I'm cleaning the event listeners.

  useLayoutEffect(() => {
    const sizeObserver = new ResizeObserver(resize)
    resize()

    sizeObserver.observe(document.body)
    return () => {
      sizeObserver.disconnect()
    }
  }, [resize])

  useLayoutEffect(() => {
    const container = scrollContainerRef.current
    const scroll = scrollRef.current
    const content = contentRef.current
    if (container === null) return
    if (scroll === null) return
    if (content === null) return

    const verticalDrag = (): void => {
      if (!scrollState.current.dragging) return

      const dy = (scrollState.current.mousePos.y - scroll.getBoundingClientRect().top) - scrollState.current.dragOffset.y
      const slope = 0.8
      const newSize = slope * -dy + scrollState.current.scrollSizeBeforeDrag
      const MIN_SCROLL_SIZE = 20

      setScrollSize(Math.max(MIN_SCROLL_SIZE, Math.min(newSize, containerWidth)))
      // TODO: Is scrollContent not necessary here????? Is it because moving the mouse slightly horizontally would
      //       trigger a scrollContent anyway???
    }

    const horizontalDrag = (): void => {
      if (!scrollState.current.dragging) return

      const offset = container.getBoundingClientRect().left
      scroll.style.left = `${scrollState.current.mousePos.x - offset - scrollState.current.dragOffset.x}px`

      if (scroll.getBoundingClientRect().right > container.getBoundingClientRect().right) {
        const containerWidth = container.getBoundingClientRect().width
        const scrollWidth = scroll.getBoundingClientRect().width
        scroll.style.left = `${containerWidth - scrollWidth}px`
      }

      if (scroll.getBoundingClientRect().left < container.getBoundingClientRect().left) {
        scroll.style.left = '0px'
      }

      scrollState.current.scrollPercentage = (scroll.getBoundingClientRect().left - offset) / (container.getBoundingClientRect().width - scroll.getBoundingClientRect().width)
      scrollContent()
    }

    const mousemove = (e: MouseEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      scrollState.current.mousePos.x = e.clientX
      scrollState.current.mousePos.y = e.clientY
      horizontalDrag()
      verticalDrag()
    }

    const touchmove = (e: TouchEvent): void => {
      scrollState.current.mousePos.x = e.targetTouches[0].clientX
      scrollState.current.mousePos.y = e.targetTouches[0].clientY
      horizontalDrag()
      verticalDrag()
    }

    const mousedown = (e: MouseEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      scrollState.current.dragging = true
      scrollState.current.scrollSizeBeforeDrag = scrollSizeRef.current
      scrollState.current.dragOffset.x = e.offsetX
      scrollState.current.dragOffset.y = e.offsetY
    }

    const touchstart = (e: TouchEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      scrollState.current.dragging = true
      scrollState.current.scrollSizeBeforeDrag = scrollSizeRef.current
      scrollState.current.dragOffset.x = e.targetTouches[0].pageX - scroll.getBoundingClientRect().left
      scrollState.current.dragOffset.y = e.targetTouches[0].pageY - scroll.getBoundingClientRect().top
    }

    const stopDragging = (): void => {
      scrollState.current.dragging = false
    }

    const nativeScroll = (e: Event): void => {
      const leftValue = (container.getBoundingClientRect().width - scroll.getBoundingClientRect().width) * (e.target as HTMLDivElement).scrollLeft / (contentRef.current!.scrollWidth - contentRef.current!.getBoundingClientRect().width)
      scroll.style.left = `${leftValue}px`
    }

    const trackPressHandle = (e: MouseEvent): void => {
      mousedown(e)
      scrollState.current.dragOffset.x = 0
      horizontalDrag()
    }

    const trackTapHandle = (e: TouchEvent): void => {
      touchstart(e)
      scrollState.current.dragOffset.x = 0
      scrollState.current.mousePos.x = e.targetTouches[0].clientX
      scrollState.current.mousePos.y = e.targetTouches[0].clientY
      horizontalDrag()
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('touchmove', touchmove)
    scroll.addEventListener('mousedown', mousedown)
    scroll.addEventListener('touchstart', touchstart)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('touchend', stopDragging)
    content.addEventListener('scroll', nativeScroll)
    container.addEventListener('mousedown', trackPressHandle)
    container.addEventListener('touchstart', trackTapHandle)

    return () => {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('touchmove', touchmove)
      scroll.removeEventListener('mousedown', mousedown)
      scroll.removeEventListener('touchstart', touchstart)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('touchend', stopDragging)
      content.removeEventListener('scroll', nativeScroll)
      container.removeEventListener('click', trackPressHandle)
      container.removeEventListener('touchstart', trackTapHandle)
    }
  }, [containerWidth, setScrollSize])

  // TODO: Is this correct???????? it has a containerWidth^2
  // TODO: I think the name has to be changed...
  // const contentWidth = containerWidth * containerWidth / scrollSize

  return {
    containerHeight,
    containerWidth,
    scrollContainerRef,
    scrollRef,
    contentRef,
    contentWidth
  }
}
