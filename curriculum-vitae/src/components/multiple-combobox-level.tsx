import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import React, { useMemo, useState } from 'react'
import Fuse from 'fuse.js'

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
  const selected = 'bg-slate-800'
  const nonSelected = 'bg-transparent text-slate-500'
  return (
    <>
      {levels.map((level, idx) => (
        <button type="button" key={idx} onClick={() => { onChange(idx) }} className={value === idx ? selected : nonSelected}>
          {level}
        </button>
      ))}
    </>
  )
}

interface Item {
  id: string
  name: string
}

interface MultipleComboboxLevelProps {
  emptyMessage: string
  placeholder: string
  list: Item[]
  levels: string[]
  defaultLevel: number
}

export function MultipleComboboxLevel ({ emptyMessage, placeholder, list, levels, defaultLevel }: MultipleComboboxLevelProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [query, setQuery] = useState('')
  const [itemsLevel, setItemsLevel] = useState<Record<string, number>>({})

  const fuse = useMemo(() => new Fuse(list, { keys: ['name'], threshold: 0.3 }), [list])

  const getFiltered = (): Item[] => {
    const text = query.trim().toLowerCase()
    if (text.length === 0) return []

    // This is to avoid showing already selected options.
    const selected = new Set([...selectedItems.map(s => s.name)])

    const result = fuse.search(text).map(res => res.item) // list.filter(({ name }) => name.toLowerCase().includes(text))
      .filter(({ name }) => !selected.has(name))

    // This is to add the free input at the end IF it's not in the suggestion list
    if (!result.map(s => s.name.trim().toLowerCase()).includes(text)) {
      result.push({ id: query, name: query })
    }

    return result
  }

  const changeLevel = (id: string, value: number): void => {
    setItemsLevel(l => ({
      ...l,
      [id]: value
    }))
  }

  const remove = (id: string): void => {
    setSelectedItems(items => items.filter(s => s.id !== id))
    setItemsLevel(l => {
      const result = { ...l }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete result[id]
      return result
    })
  }

  const comboboxChangeHandle = (data: Item[]): void => {
    setSelectedItems(data)
    for (const { id } of data) {
      if (!(id in itemsLevel)) {
        setItemsLevel(l => ({ ...l, [id]: defaultLevel }))
      }
    }

    setQuery('')
  }

  // TODO: <input value={null}...> makes it uncontrolled. Make sure it has a default value.
  return (
    <Combobox multiple value={selectedItems} onChange={comboboxChangeHandle} onClose={() => { setQuery('') }}>
      {selectedItems.length > 0 && (
        <div className="mb-4 grid grid-cols-10">
          {selectedItems.map(({ id, name }) => (
            <React.Fragment key={id}>
              <div className="col-span-2">
                {name}
              </div>
              <div className="col-span-6">
                <LevelSelect value={itemsLevel[id]} levels={levels} onChange={(value) => { changeLevel(id, value) }}/>
              </div>
              <button
                onClick={() => { remove(id) }}
                className="col-span-2 block rounded-md p-2 bg-slate-700 hover:bg-red-500 transition-colors duration-300 text-xs mr-2"
              >
                x
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {selectedItems.length === 0 && (
        <div className="p-8 my-10 rounded-md bg-slate-700">
          {emptyMessage}
        </div>
      )}

      <ComboboxInput value={query} className="p-2" placeholder={placeholder} aria-label="Assignees" onChange={(event) => { setQuery(event.target.value) }} />

      <ComboboxOptions anchor="bottom" className="empty:hidden w-[var(--input-width)] z-50">
        {getFiltered().map((item) => (
          <ComboboxOption key={item.id} value={item} className="data-[focus]:bg-blue-600 p-4 group flex gap-2 bg-slate-900">
            {item.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
