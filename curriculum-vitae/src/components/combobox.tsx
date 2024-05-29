import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { type ReactNode, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { IoChevronDownOutline } from 'react-icons/io5'

// TODO: Hopefully this input can also be used in React Forms. It should, since it's just an input
//       with a value. Should be the same. I just have to pass the data from React Forms to here.

// TODO: Error... choose a value, then click again on the input. THe dropdown should open again,
//       but it doesn't.

export interface ComboboxWithIconItem {
  id: number
  icon: ReactNode
  name: string
}

interface ComboboxWithIconProps {
  placeholder: string
  list: ComboboxWithIconItem[]
  defaultIcon: ReactNode
  value: ComboboxWithIconItem | null
  onChange: (item: ComboboxWithIconItem | null) => void
}

export function ComboboxWithIcon ({ value, defaultIcon, placeholder, list, onChange }: ComboboxWithIconProps): JSX.Element {
  // const [selectedItem, setSelectedItem] = useState<ComboboxWithIconItem | null>(null)
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => new Fuse(list, { keys: ['icon', 'name'], threshold: 0.3 }), [list])

  const getFiltered = (): ComboboxWithIconItem[] => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return list

    return fuse.search(text).map(res => res.item)
  }

  const comboboxChangeHandle = (data: ComboboxWithIconItem | null): void => {
    // TODO: This one shouldn't be necessary if value comes from parent.
    // setSelectedItem(data)
    setQuery('')
    onChange(data)
  }

  const onClose = (): void => {
    setQuery('')
  }

  return (
    <Combobox immediate value={value} onChange={comboboxChangeHandle} onClose={onClose}>
      <div className="relative">
        <div className="pointer-events-none bg-opacity-25 w-full h-full top-0 left-0 absolute flex items-center px-3">
          <div className="grow">
            {value?.icon ?? defaultIcon}
          </div>
          <IoChevronDownOutline className="size-4 fill-white/60 group-data-[hover]:fill-white" />
        </div>
        <ComboboxInput
          className="p-2 w-full pl-10 cursor-default"
          displayValue={(item?: ComboboxWithIconItem): string => item?.name ?? ''}
          placeholder={placeholder}
          aria-label="Assignee"
          onChange={(event) => { setQuery(event.target.value) }} />
      </div>

      <ComboboxOptions anchor="bottom" className="empty:hidden w-[var(--input-width)] h-44 z-50">
        {getFiltered().map((item) => (
          <ComboboxOption key={item.id} value={item} className="data-[focus]:bg-blue-600 p-4 group flex gap-2 bg-slate-900">
            {item.icon} {item.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
