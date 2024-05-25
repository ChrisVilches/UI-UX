import { useMemo } from 'react'
import { compressRanges, getColor } from './util'

interface GridPreviewProps {
  containerWidth: number
  containerHeight: number
  cols: number
  rows: number
  data: Array<Set<number>>
}

export function GridPreview ({ containerWidth, containerHeight, cols, rows, data }: GridPreviewProps): JSX.Element {
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
