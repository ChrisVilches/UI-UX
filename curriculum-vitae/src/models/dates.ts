// TODO: These types should be in the model, since they don't necessarily belong to any specific
//       component.
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

export function formatMonth(m: number) {
  return months[m - 1]
}

// TODO: Unit test.
export function compareYearMonthDate(lhs: YearMonthDate, rhs: YearMonthDate) {
  if (lhs.year === rhs.year) {
    return lhs.month - rhs.month
  }

  return lhs.year - rhs.year
}
