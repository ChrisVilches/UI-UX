import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { type ReactNode, useMemo, useState, type ForwardedRef, forwardRef } from 'react'
import Fuse from 'fuse.js'
import { IoChevronDownOutline } from 'react-icons/io5'

// TODO: Flags may not work in other devices. I think I just have to make sure the font is installed
//       and used correctly.

export interface ComboboxWithIconItem {
  id: number
  icon: ReactNode
  name: string
}

interface ComboboxWithIconProps {
  placeholder: string
  list: ComboboxWithIconItem[]
  defaultIcon: ReactNode
  value: number
  onChange: (value: number) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
}

export const ComboboxWithIcon = forwardRef((props: ComboboxWithIconProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { onBlur, value, defaultIcon, placeholder, list, onChange } = props
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => new Fuse(list, { keys: ['icon', 'name'], threshold: 0.3 }), [list])

  // NOTE: This is to avoid the "A component is changing from uncontrolled to controlled" error.
  const emptyValue = { id: -1, icon: defaultIcon, name: '' }

  const getFiltered = (): ComboboxWithIconItem[] => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return list

    return fuse.search(text).map(res => res.item)
  }

  const comboboxChangeHandle = (data: ComboboxWithIconItem | null): void => {
    setQuery('')
    onChange(data?.id ?? -1)
  }

  const onClose = (): void => {
    setQuery('')
  }

  const selected = list.find(item => value != null && item.id === value) ?? emptyValue

  return (
    <Combobox immediate value={selected} onChange={comboboxChangeHandle} onClose={onClose}>
      <div className="relative">
        <div className="pointer-events-none bg-opacity-25 w-full h-full top-0 left-0 absolute flex items-center px-3">
          <div className="grow">
            {selected?.icon ?? defaultIcon}
          </div>
          <IoChevronDownOutline className="size-4 fill-white/60 group-data-[hover]:fill-white" />
        </div>

        <ComboboxInput
          className="cursor-default input pl-10"
          ref={ref}
          displayValue={(item: ComboboxWithIconItem): string => item?.name ?? ''}
          placeholder={placeholder}
          aria-label="Assignee"
          onBlur={onBlur}
          autoComplete="off"
          onChange={(event) => { setQuery(event.target.value) }} />
      </div>

      <ComboboxOptions anchor="bottom" className="empty:hidden w-[var(--input-width)] h-44 z-50">
        {getFiltered().map((item) => (
          <ComboboxOption key={item.id} value={item} className="data-[focus]:bg-slate-500 p-4 group flex gap-2 bg-slate-900">
            {item.icon} {item.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
})

ComboboxWithIcon.displayName = 'ComboboxWithIcon'
