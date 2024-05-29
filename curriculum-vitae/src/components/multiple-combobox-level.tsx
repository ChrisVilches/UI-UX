import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import React, { type ForwardedRef, forwardRef, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { IoTrashOutline } from 'react-icons/io5'
import { Alert } from './alert'

// TODO: It's better to split this component in two. They share the selections (managed by both
//       components), but one is just the combobox and the other one is the level config.

// TODO: When adding one by pressing enter, it doesn't blur out of the input. That's great if I want
//       to continue typing and adding a new one, but if you consider the first time the user opens
//       the dropdown, the input is first focused but without the scrolls removed (nor the dropdown opened)
//       I think that's the desired state for after the addition of an item.

interface LevelSelectProps {
  value: number
  onChange: (s: number) => void
  levels: string[]
}

function LevelSelect ({ value, onChange, levels }: LevelSelectProps): JSX.Element {
  const base = 'text-xs p-2 duration-500 rounded-md'
  const selected = 'bg-slate-800'
  const nonSelected = 'bg-transparent text-slate-500'
  return (
    <div className="flex space-x-2 overflow-x-auto">
      {levels.map((level, idx) => (
        <button type="button" key={idx} onClick={() => { onChange(idx) }} className={`${base} ${value === idx ? selected : nonSelected}`}>
          {level}
        </button>
      ))}
    </div>
  )
}

export interface MultipleComboboxLevelItem {
  id: string
  name: string
  level: number
}

interface MultipleComboboxOption {
  id: string
  name: string
}

interface MultipleComboboxLevelProps {
  emptyMessage: string
  placeholder: string
  list: MultipleComboboxOption[]
  levels: string[]
  defaultLevel: number
  selected: MultipleComboboxLevelItem[]
  onChange: (items: MultipleComboboxLevelItem[]) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
}

export const MultipleComboboxLevel = forwardRef((props: MultipleComboboxLevelProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { selected, onChange, emptyMessage, placeholder, onBlur, list, levels, defaultLevel } = props
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => new Fuse(list, { keys: ['name'], threshold: 0.3 }), [list])

  const getFiltered = (): MultipleComboboxOption[] => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return []

    // This is to avoid showing already selected options.
    const selectedSet = new Set([...selected.map(s => s.name)])

    const result = fuse.search(text).map(res => res.item)
      .filter(({ name }) => !selectedSet.has(name))

    // This is to add the free input at the end IF it's not in the suggestion list
    if (!result.map(s => s.name.trim().toLowerCase()).includes(text)) {
      result.push({ id: query, name: query })
    }

    return result
  }

  const changeLevel = (id: string, level: number): void => {
    onChange(
      [...selected].map((item) => item.id === id ? ({ ...item, level }) : item)
    )
  }

  const remove = (id: string): void => {
    onChange(selected.filter(s => s.id !== id))
  }

  const setDefaultLevel = (data: MultipleComboboxOption | MultipleComboboxLevelItem): MultipleComboboxLevelItem => {
    if ('level' in data) {
      return data
    } else {
      return { ...data, level: defaultLevel }
    }
  }

  const comboboxChangeHandle = (data: MultipleComboboxOption[]): void => {
    onChange(data.map(item => setDefaultLevel(item)))
    setQuery('')
  }

  return (
    <Combobox multiple value={selected} onChange={comboboxChangeHandle} onClose={() => { setQuery('') }}>
      {selected.length > 0 && (
        <div className="mb-4 grid grid-cols-12 gap-y-2 gap-x-2 items-center">
          {selected.map(({ id, name, level }) => (
            <React.Fragment key={id}>
              <div className="col-span-3 text-ellipsis overflow-hidden whitespace-nowrap">
                {name}
              </div>
              <div className="col-span-8">
                <LevelSelect value={level} levels={levels} onChange={(value) => { changeLevel(id, value) }}/>
              </div>
              <div className="col-span-1">
                <button type="button" className="text-slate-400 p-1 hover:text-red-400 rounded-md duration-500" onClick={() => { remove(id) }}>
                  <IoTrashOutline/>
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {selected.length === 0 && <Alert className="mb-10" variant="warn">{emptyMessage}</Alert>}

      <ComboboxInput onBlur={onBlur} ref={ref} value={query} className="p-2" placeholder={placeholder} aria-label="Assignees" onChange={(event) => { setQuery(event.target.value) }} />

      <ComboboxOptions anchor="bottom" className="empty:hidden w-[var(--input-width)] z-50">
        {getFiltered().map((item) => (
          <ComboboxOption key={item.id} value={item} className="data-[focus]:bg-blue-600 p-4 group flex gap-2 bg-slate-900">
            {item.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
})

MultipleComboboxLevel.displayName = 'MultipleComboboxLevel'
