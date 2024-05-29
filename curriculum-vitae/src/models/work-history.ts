import { YearMonthDate, compareYearMonthDate } from "./dates"

export interface WorkHistory {
  id?: string
  companyName: string
  role: string
  description: string
  startDate: YearMonthDate
  endDate: YearMonthDate
}

// TODO: Unit test maybe.
export function compareWorkHistory(lhs: WorkHistory, rhs: WorkHistory) {
  return compareYearMonthDate(lhs.startDate, rhs.startDate)
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
