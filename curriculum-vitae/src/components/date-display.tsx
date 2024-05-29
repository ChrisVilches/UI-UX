import { formatMonth } from '../models/date'

interface DateProps {
  month: number
  year: number
}

export function DateDisplay ({ month, year }: DateProps): JSX.Element {
  return (
    <span>{formatMonth(month)} {year}</span>
  )
}
