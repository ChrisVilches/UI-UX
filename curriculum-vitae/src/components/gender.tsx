import { LiaFemaleSolid, LiaMaleSolid } from 'react-icons/lia'
import { PiGenderNonbinaryLight } from 'react-icons/pi'
import { FaCheck } from 'react-icons/fa'
import { type IconType } from 'react-icons'

export type GenderValues = 'male' | 'female' | 'other'

interface GenderSelectProps {
  onChange: (value: GenderValues) => void
  value: GenderValues
}

function Check (): JSX.Element {
  return (
    <div className="bg-green-800 rounded-full size-8 flex items-center justify-center">
      <FaCheck className="size-4"/>
    </div>
  )
}

interface Item {
  itemValue: GenderValues
  Component: IconType
  selectedClass: string
}

const items: Item[] = [
  { itemValue: 'male', Component: LiaMaleSolid, selectedClass: 'border-blue-500 bg-blue-900' },
  { itemValue: 'female', Component: LiaFemaleSolid, selectedClass: 'border-pink-500 bg-pink-900' },
  { itemValue: 'other', Component: PiGenderNonbinaryLight, selectedClass: 'border-yellow-500 rainbow-gradient' }
]

export function GenderSelect ({ onChange, value }: GenderSelectProps): JSX.Element {
  const baseClass = 'border-4 p-0 outline-none'
  const nonSelected = 'border-slate-500 bg-slate-900 hover:bg-slate-800 focus:bg-slate-800 hover:border-slate-300 focus:border-slate-300 transition-all duration-500'

  return (
    <div className="flex flex-row space-x-4">
      {items.map(({ itemValue, Component, selectedClass }, idx) => (
        <button type="button" key={idx} className={`${baseClass} ${value === itemValue ? selectedClass : nonSelected}`} onClick={() => { onChange(itemValue) }}>
          <div>
            <div className="m-2 absolute">
              {value === itemValue && <Check/>}
            </div>
            <div className="p-10">
              <Component className="size-8"/>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
