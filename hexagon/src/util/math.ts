interface Range {
  from: number
  to: number
}

export function rangesTotalLength (ranges: Range[]): number {
  const allValues = [
    ...ranges.map(r => r.from),
    ...ranges.map(r => r.to)
  ]

  return Math.max(...allValues) - Math.min(...allValues)
}
