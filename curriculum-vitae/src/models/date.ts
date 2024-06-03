export interface YearMonthDate {
  year: number
  month: number
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export function formatMonth (m: number): string {
  return months[m - 1]
}

export function compareYearMonthDate (lhs: YearMonthDate, rhs: YearMonthDate): number {
  if (lhs.year === rhs.year) {
    return lhs.month - rhs.month
  }

  return lhs.year - rhs.year
}
