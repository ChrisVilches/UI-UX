import { type ReactNode } from 'react'
import { type YearMonthDate } from '../models/date'
import { type WorkHistory } from '../models/work-history'
import { PiBuildingApartmentLight } from 'react-icons/pi'
import { IoBagOutline } from 'react-icons/io5'
import { MdChevronRight } from 'react-icons/md'
import { DateDisplay } from './date-display'

type WorkHistoryCardProps = { children?: ReactNode } & WorkHistory

interface DatesProps {
  startDate: YearMonthDate
  endDate?: YearMonthDate
}

function Dates ({ startDate, endDate }: DatesProps): JSX.Element {
  return (
    <div className="text-sm">
      <DateDisplay {...startDate}/>
      <MdChevronRight className="inline mx-2"/>

      {typeof endDate === 'undefined'
        ? (
          <span><i>Present</i></span>
          )
        : (
          <DateDisplay {...endDate}/>
          )}
    </div>
  )
}

export function WorkHistoryCard ({ startDate, endDate, companyName, role, description, children }: WorkHistoryCardProps): JSX.Element {
  return (
    <div className="bg-slate-800 rounded-md p-4">
      <div className="mb-8 text-slate-500">
        <Dates startDate={startDate} endDate={endDate}/>
      </div>
      <div className="flex items-center space-x-4 mb-1 font-bold">
        <PiBuildingApartmentLight/>
        <span>{companyName}</span>
      </div>
      <div className="flex items-center space-x-4 mb-1">
        <IoBagOutline/>
        <span>{role}</span>
      </div>
      {description.trim().length > 0 && (
        <div className="my-4 w-full flex justify-center">
          <div className="sm:w-1/2 text-center text-sm italic">
            {description.split('\n').filter(x => x.length > 0).map((txt, idx) => (
              <p key={idx} className="mb-2">{txt}</p>
            ))}
          </div>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}
