export function compressRanges(arr: number[]) {
  const sorted = [...arr]
  console.log('Compressing some shit (TODO: this should execute less in the future after some revamps)')
  const groups: number[][] = []

  sorted.sort((a: number, b: number) => a - b)
  for (const x of sorted) {
    if (groups.length === 0 || groups[groups.length - 1][1] + 1 !== x) {
      groups.push([x, x])
    }
    groups[groups.length - 1][1] = x
  }
  return groups
}

export function randomSet(n: number): Set<number> {
  const res = new Set<number>()
  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.9) continue
    
    const to = i + Math.ceil(Math.random() * 6)
    for(; i < n && i <= to; i++) {
      res.add(i)
    }
  
  }
  return res
}

const DATA_COLORS: ReadonlyArray<string> = ['#93A7FE', '#5BFFE8', '#F0FCB0', '#F9F47C', '#FF94A6', '#FDA575']

export function getColor(idx: number) {
  return DATA_COLORS[idx % DATA_COLORS.length]
}
