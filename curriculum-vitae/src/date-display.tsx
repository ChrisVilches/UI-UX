import { formatMonth } from "./models/dates"

interface DateProps {
  month: number
  year: number
}

export function DateDisplay({ month, year }: DateProps) {
  return (
    <span>{formatMonth(month)} {year}</span>
  )
}
