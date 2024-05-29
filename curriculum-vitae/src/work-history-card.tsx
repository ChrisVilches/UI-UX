import { ReactNode } from "react"
import { YearMonthDate } from "./models/dates"
import { WorkHistory } from "./models/work-history"
import { PiBuildingApartmentLight } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import { TbMessageCircle2 } from "react-icons/tb";
import { MdChevronRight } from "react-icons/md";
import { DateDisplay } from "./date-display";

type WorkHistoryCardProps = { children?: ReactNode } & WorkHistory

interface DatesProps {
  startDate: YearMonthDate
  endDate: YearMonthDate
}

function Dates({ startDate, endDate }: DatesProps) {
  return (
    <div className="text-sm">
      <DateDisplay {...startDate}/>
      <MdChevronRight className="inline mx-2"/>
      <DateDisplay {...endDate}/>
    </div>
  )
}

export function WorkHistoryCard({ startDate, endDate, companyName, role, description, children }: WorkHistoryCardProps) {
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
        <div className="flex items-center space-x-4 mb-1">
          <TbMessageCircle2/>
          <span>{description}</span>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}
