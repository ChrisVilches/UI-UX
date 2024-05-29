import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'

interface Item {
  id: number
  icon: ReactNode
  name: string
}

interface ComboboxWithIconProps {
  buttonPlaceholder: string
  searchPlaceholder: string
  list: Item[]
  defaultIcon: ReactNode
}

const DEFAULT_ITEM = { id: -1, icon: '', name: '' }

export function ComboboxWithIcon({ defaultIcon, buttonPlaceholder, searchPlaceholder, list }: ComboboxWithIconProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<Item>(DEFAULT_ITEM)
  const [query, setQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const fuse = useMemo(() => new Fuse(list, { keys: ['icon', 'name'], threshold: 0.3 }), [list])

  const getFiltered = () => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return list
    
    return fuse.search(text).map(res => res.item)
  }

   const comboboxChangeHandle = (data: Item | null) => {
    setSelectedItem(data === null ? DEFAULT_ITEM : data)
    setQuery('')
  }

  const onClose = () => {
    setQuery('')
    setShowMenu(false)
  }

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const openMenu = () => {
    setShowMenu(true)
  }

  useEffect(() => {
    if (showMenu) {
      inputRef.current?.focus()
    }
  }, [showMenu])

  return (
    <Combobox immediate value={selectedItem} onChange={comboboxChangeHandle} onClose={onClose}>
      <div className="">
        {showMenu || (
          <button onClick={openMenu} onFocus={openMenu} className="w-full z-20 text-left">
            {selectedItem.id !== -1 ? (
              <span>{selectedItem.icon} {selectedItem.name}</span>
            ) : (
              <div>{defaultIcon}{buttonPlaceholder}</div>
            )}
          </button>
        )}

        <ComboboxInput
          ref={inputRef}
          className={`p-2 w-full ${showMenu ? '' : 'hidden'}`}
          displayValue={(item?: Item) => item?.name || ''}
          placeholder={searchPlaceholder}
          aria-label="Assignee"
          onChange={(event) => setQuery(event.target.value)} />
      </div>

      <ComboboxOptions anchor="bottom" className="empty:hidden w-[var(--input-width)] h-44">
        {getFiltered().map((item) => (
          <ComboboxOption key={item.id} value={item} className="data-[focus]:bg-blue-600 p-4 group flex gap-2 bg-slate-900">
            {item.icon} {item.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
