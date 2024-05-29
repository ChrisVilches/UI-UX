import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react"
import { YearMonthPicker } from "./year-month-picker"
import { WorkHistory } from "./models/work-history"
import { Field, Checkbox, Label } from "@headlessui/react"
import { HiCheck } from "react-icons/hi";

interface WorkHistoryFormProps {
  initialWorkHistory: WorkHistory,
  onSubmit: (data: WorkHistory) => void
}

// TODO: Use React Forms here.
export function WorkHistoryForm({ initialWorkHistory, onSubmit }: WorkHistoryFormProps) {
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState({ year: -1, month: 1 })
  const [endDate, setEndDate] = useState({ year: -1, month: 1 })
  const [stillWork, setStillWork] = useState(false)

  const getData = (): WorkHistory => ({
    id: initialWorkHistory.id,
    companyName,
    role,
    description,
    startDate,
    endDate: stillWork ? undefined : endDate
  })

  const submitHandle = (ev: FormEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    onSubmit(getData())
  }

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  useEffect(() => {
    setCompanyName(initialWorkHistory.companyName)
    setRole(initialWorkHistory.role)
    setDescription(initialWorkHistory.description)
    setStartDate(initialWorkHistory.startDate)
    setEndDate(initialWorkHistory.endDate ?? initialWorkHistory.startDate)

    // TODO: This opens the keyboard on mobile, which uses too much space.
    // inputRef.current?.focus()
  }, [initialWorkHistory])

  const isNew = typeof initialWorkHistory.id === 'undefined'

  const isValid = companyName.trim().length > 0

  return (
    <form onSubmit={submitHandle}>
      {/* TODO: Validate dates are in order */}
      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          <div className="flex-1">
            <YearMonthPicker value={startDate} onChange={setStartDate}/>
          </div>
          <div className="flex-1">
            <YearMonthPicker disabled={stillWork} value={endDate} onChange={setEndDate}/>
          </div>
        </div>

        <Field className="flex items-center gap-2 justify-end">
          <Checkbox
            checked={stillWork}
            onChange={setStillWork}
            className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
          >
            <HiCheck className="hidden size-4 fill-black group-data-[checked]:block" />
          </Checkbox>
          <Label>I'm still working here</Label>
        </Field>
      </div>

      <div className="relative mb-4">
        <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" ref={inputRef} value={companyName} onChange={(ev) => { setCompanyName(ev.target.value) }} placeholder=""/>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Company name</label>
      </div>

      <div className="relative mb-4">
        <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" value={role} onChange={(ev) => { setRole(ev.target.value) }} placeholder=""/>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Role</label>
      </div>

      <div className="relative mb-4">
        <textarea className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" value={description} onChange={(ev) => { setDescription(ev.target.value) }} placeholder=""/>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Description</label>
      </div>

      <button disabled={!isValid} className={`${isValid ? 'bg-green-500' : 'bg-red-500'}`} type="submit">{isNew ? 'Save' : 'Edit'}</button>
    </form>
  )
}
