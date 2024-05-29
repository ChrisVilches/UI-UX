import { YearMonthDate, compareYearMonthDate } from "./date"

export interface WorkHistory {
  id?: string
  companyName: string
  role: string
  description: string
  startDate: YearMonthDate
  endDate?: YearMonthDate
}

// TODO: Unit test maybe.
// TODO: This is weird. There should be an easier way to do this.
export function compareWorkHistory(lhs: WorkHistory, rhs: WorkHistory) {
  const cmp = compareYearMonthDate(lhs.startDate, rhs.startDate)
  if (cmp === 0) {
    return (lhs.id ?? '') < (rhs.id ?? '') ? 1 : -1
  }
  return cmp
}

export const createWorkHistory = (): WorkHistory => {
  const year = (new Date()).getFullYear()
  return {
    id: undefined,
    companyName: '',
    role: '',
    description: '',
    startDate: { year, month: 1 },
    endDate: { year, month: 1 }
  }
}
