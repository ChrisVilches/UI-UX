import { useMemo } from 'react'
import { getColor } from './util'

const emptyCellColors = ['#323232', '#464646']

interface GridProps {
  contentWidth: number
  rows: number
  cols: number
  data: Array<Set<number>>
}

interface GridRowCellProps {
  colIdx: number
  data: Set<number>
  cellWidth: number
  dataColor: string
}

const DEFAULT_BORDER_COLOR = '#2f2f2f'

function GridRowCell ({ cellWidth, colIdx, data, dataColor }: GridRowCellProps) {
  const baseStyle = useMemo(() => ({
    backgroundColor: emptyCellColors[Math.floor(colIdx / 4) % 2],
    borderLeftColor: DEFAULT_BORDER_COLOR,
    borderRightColor: DEFAULT_BORDER_COLOR,
    minWidth: cellWidth
  }), [cellWidth, colIdx])

  const finalStyle = useMemo(() => {
    if (!data.has(colIdx)) return baseStyle

    return {
      ...baseStyle,
      borderRightColor: data.has(colIdx + 1) ? dataColor : DEFAULT_BORDER_COLOR,
      borderLeftColor: data.has(colIdx - 1) ? dataColor : DEFAULT_BORDER_COLOR,
      minWidth: cellWidth,
      backgroundColor: dataColor
    }
  }, [baseStyle, cellWidth, data, colIdx, dataColor])

  return <div className="border-[1px] h-10 border-y-0" style={finalStyle}></div>
}

export function Grid ({ contentWidth, rows, cols, data }: GridProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIdx) => (
        <div key={rowIdx} className="flex flex-cols border-gray-800 border-[1px]">
          {Array.from({ length: cols }, (_, colIdx) => (
            <GridRowCell
                key={colIdx}
                colIdx={colIdx}
                data={data[rowIdx]}
                cellWidth={contentWidth / cols}
                dataColor={getColor(rowIdx)}
              />
          ))}
        </div>
      ))}
    </>
  )
}
