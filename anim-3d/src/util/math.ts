export const decreaseDifference = (src: number, target: number, delta: number): number => {
  const diff = target - src
  const newValue = src + (diff * delta)

  if ((src < target && target < newValue) || (newValue < target && target < src)) {
    return target
  }

  return newValue
}
