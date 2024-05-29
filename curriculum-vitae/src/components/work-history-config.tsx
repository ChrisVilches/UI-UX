import { useState } from 'react'
import { type WorkHistory, compareWorkHistory, createWorkHistory } from '../models/work-history'
import { v4 } from 'uuid'
import { WorkHistoryCard } from './work-history-card'
import Modal from './modal'
import { WorkHistoryForm } from './work-history-form'

// TODO: The sort is fucked up.
function sortWorkHistoriesDesc (list: WorkHistory[]): WorkHistory[] {
  const result = [...list]
  result.sort(compareWorkHistory)
  result.reverse()
  return result
}

interface WorkHistoryConfigProps {
  list: WorkHistory[]
  onChange: (list: WorkHistory[]) => void
}

export function WorkHistoryConfig ({ list, onChange }: WorkHistoryConfigProps): JSX.Element {
  const [formWorkHistory, setFormWorkHistory] = useState<WorkHistory>(createWorkHistory())
  const [showModal, setShowModal] = useState(false)

  const openEditWorkHistory = (id?: string): void => {
    if (typeof id === 'undefined') {
      setFormWorkHistory(createWorkHistory())
      setShowModal(true)
    } else {
      const w = list.find(w => w.id === id)
      if (typeof w === 'undefined') throw new Error('Not found')
      setFormWorkHistory(w)
      setShowModal(true)
    }
  }

  const saveWorkHistoryList = (data: WorkHistory): void => {
    if (typeof data.id === 'undefined') {
      data.id = v4()
      onChange(sortWorkHistoriesDesc([...list, data]))
    } else {
      onChange(sortWorkHistoriesDesc(list.map(w => w.id === data.id ? data : w)))
    }
    setShowModal(false)
  }

  const remove = (id: string): void => {
    onChange(list.filter(w => w.id !== id))
  }

  // TODO: inlined background color. Should be CSS class.
  return (
    <>
      <div className="sticky top-0 w-full mb-4 flex justify-center" style={{ backgroundColor: '#24242477' }}>
        <button type="button" onClick={() => { openEditWorkHistory() }}>+</button>
      </div>

      {list.map(workHistory => (
        <div key={workHistory.id} className="mb-4">
          <WorkHistoryCard {...workHistory}>
            <div className="flex justify-end">
              <button type="button" onClick={() => { remove(workHistory.id ?? '') }}>Remove</button>
              <button type="button" onClick={() => { openEditWorkHistory(workHistory.id) }}>Edit</button>
            </div>
          </WorkHistoryCard>
        </div>
      ))}

      <Modal title="Tell us about your work experience" show={showModal} onCloseModal={() => { setShowModal(false) }}>
        <WorkHistoryForm initialWorkHistory={formWorkHistory} onSubmit={saveWorkHistoryList}/>
      </Modal>
    </>
  )
}
