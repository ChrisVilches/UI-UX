export function scrollTo(offset: number, callback: () => void) {
  const fixedOffset = offset.toFixed();
  const onScroll = () => {
          if (window.scrollY.toFixed() === fixedOffset) {
              window.removeEventListener('scroll', onScroll)
              callback()
          }
      }

  window.addEventListener('scroll', onScroll)
  onScroll()
  window.scrollTo({
      top: offset,
      behavior: 'smooth'
  })
}
