import { Popover, PopoverButton, Transition, PopoverPanel } from '@headlessui/react'
import { type YearMonthDate, formatMonth } from '../models/date'
import { HiOutlineCalendar } from 'react-icons/hi'
import { DateDisplay } from './date-display'

interface YearMonthPickerProps {
  onChange: (value: YearMonthDate) => void
  value: YearMonthDate
  disabled?: boolean
}

// TODO: Maybe instead of a popover, click on the button and transform the dialog into the
//       picker, with a transition. Put a button that says "cancel", and leave the button
//       (start date or end date) in the same place, so that the user knows it's the left or right one.
//       This is also because dialogs + popover looks bad on mobile, not sure if it can be fixed.

export function YearMonthPicker ({ value, onChange, disabled = false }: YearMonthPickerProps): JSX.Element {
  return (
    <Popover>
      <PopoverButton disabled={disabled} className="bg-slate-800 hover:bg-slate-700 transition-colors bg-opacity-35 duration-500 border-2 border-slate-800 disabled:text-gray-400 disabled:bg-slate-600 w-full flex items-center justify-center">
        <HiOutlineCalendar className="mr-4"/>
        <DateDisplay {...value}/>
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom"
          className="z-50 divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
        >
          {({ close }) => (
            <div className="p-8 z-50 bg-slate-500">
              <div>
                <button onClick={() => { onChange({ ...value, year: value.year - 1 }) }}>-</button>
                {value.year}
                <button onClick={() => { onChange({ ...value, year: value.year + 1 }) }}>+</button>

                <div className="grid grid-cols-4">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <button key={idx} onClick={() => { onChange({ ...value, month: idx + 1 }); close() }} className={`p-4 ${value.month === idx + 1 ? 'bg-slate-800' : 'bg-slate-500'}`}>
                      {formatMonth(idx + 1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
