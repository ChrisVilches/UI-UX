import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ReactNode, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { IoChevronDownOutline } from 'react-icons/io5'

// TODO: Hopefully this input can also be used in React Forms. It should, since it's just an input
//       with a value. Should be the same. I just have to pass the data from React Forms to here.

interface Item {
  id: number
  icon: ReactNode
  name: string
}

interface ComboboxWithIconProps {
  placeholder: string
  list: Item[]
  defaultIcon: ReactNode
}

export function ComboboxWithIcon({ defaultIcon, placeholder, list }: ComboboxWithIconProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => new Fuse(list, { keys: ['icon', 'name'], threshold: 0.3 }), [list])

  const getFiltered = () => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return list
    
    return fuse.search(text).map(res => res.item)
  }

   const comboboxChangeHandle = (data: Item | null) => {
    setSelectedItem(data)
    setQuery('')
  }

  const onClose = () => {
    setQuery('')
  }

  return (
    <Combobox immediate value={selectedItem} onChange={comboboxChangeHandle} onClose={onClose}>
      <div className="relative">
        <div className="pointer-events-none bg-opacity-25 w-full h-full top-0 left-0 absolute flex items-center px-3">
          <div className="grow">
            {selectedItem?.icon ?? defaultIcon}
          </div>
          <IoChevronDownOutline className="size-4 fill-white/60 group-data-[hover]:fill-white" />
        </div>
        <ComboboxInput
          className="p-2 w-full pl-10 cursor-default"
          displayValue={(item?: Item) => item?.name || ''}
          placeholder={placeholder}
          aria-label="Assignee"
          onChange={(event) => setQuery(event.target.value)} />

      </div>

      {/* TODO: USE SOME OF THIS <div className="my-10">
        {selectedItem.id !== -1 ? (
          <span>{selectedItem.icon} {selectedItem.name}</span>
        ) : (
          <div>{defaultIcon}{buttonPlaceholder}</div>
        )}
      </div> */}

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
