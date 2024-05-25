import { useCallback, useEffect, useState } from "react"
import { randomSet } from "../util"

export function useGenerateGridData() {
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

  return {
    gridData,
    generate,
    rows,
    cols
  }
}
