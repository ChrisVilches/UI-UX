import { type YearMonthDate, compareYearMonthDate } from './date'

export interface WorkHistory {
  id?: string
  companyName: string
  role: string
  description: string
  startDate: YearMonthDate
  endDate?: YearMonthDate
}

export function compareWorkHistory (lhs: WorkHistory, rhs: WorkHistory): number {
  const cmp = compareYearMonthDate(lhs.startDate, rhs.startDate)
  if (cmp === 0) {
    if (typeof lhs.id !== 'undefined' && typeof rhs.id !== 'undefined') {
      return lhs.id.localeCompare(rhs.id)
    }
    return lhs.companyName.localeCompare(rhs.companyName)
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
