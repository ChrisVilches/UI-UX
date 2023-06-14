import { rangesTotalLength } from './math'

export function resizeContainer (container: HTMLElement, children: Element[]): void {
  const ranges = children.map(element => element.getBoundingClientRect())
    .map(({ bottom: from, top: to }) => ({ from, to }))
  const height = rangesTotalLength(ranges)
  container.style.height = `${height}px`
}

let bodyTransitionsApplied = false

export const applyBodyTransitions = (): void => {
  if (!bodyTransitionsApplied) {
    bodyTransitionsApplied = true
    setTimeout(() => {
      bodyTransitionsApplied = true
      document.querySelector('body')?.setAttribute('class', 'transition-colors duration-500')
    })
  }
}

export const applyTheme = (themeName: string): void => {
  if (themeName === 'dark') {
    document.querySelector('html')?.classList.add('dark')
  } else {
    document.querySelector('html')?.classList.remove('dark')
  }
}
