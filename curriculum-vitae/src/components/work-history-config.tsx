import { useState } from 'react'
import { type WorkHistory, compareWorkHistory, createWorkHistory } from '../models/work-history'
import { v4 } from 'uuid'
import { WorkHistoryCard } from './work-history-card'
import Modal from './modal'
import { WorkHistoryForm } from './work-history-form'

// TODO: It should start empty. Remove this dummy one.
const createDummyWorkHistory = (): WorkHistory => ({
  id: v4(),
  companyName: 'Daijob.com',
  role: 'Full-Stack Engineer',
  description: 'Did a lot of functionalities',
  startDate: { year: 2019, month: 1 },
  endDate: { year: 2019, month: 1 }
})

// TODO: The sort is fucked up.
function sortWorkHistoriesDesc (list: WorkHistory[]): WorkHistory[] {
  const result = [...list]
  result.sort(compareWorkHistory)
  result.reverse()
  return result
}

export function WorkHistoryConfig (): JSX.Element {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([createDummyWorkHistory(), createDummyWorkHistory(), createDummyWorkHistory(), createDummyWorkHistory(), createDummyWorkHistory()])

  const [formWorkHistory, setFormWorkHistory] = useState<WorkHistory>(createWorkHistory())
  const [showModal, setShowModal] = useState(false)

  const openEditWorkHistory = (id?: string): void => {
    if (typeof id === 'undefined') {
      setFormWorkHistory(createWorkHistory())
      setShowModal(true)
    } else {
      const w = workHistoryList.find(w => w.id === id)
      if (typeof w === 'undefined') throw new Error('Not found')
      setFormWorkHistory(w)
      setShowModal(true)
    }
  }

  const saveWorkHistoryList = (data: WorkHistory): void => {
    if (typeof data.id === 'undefined') {
      data.id = v4()
      setWorkHistoryList(l => [...l, data])
    } else {
      setWorkHistoryList(l => l.map(w => w.id === data.id ? data : w))
    }
    setWorkHistoryList(sortWorkHistoriesDesc)
    setShowModal(false)
  }

  const remove = (id: string): void => {
    setWorkHistoryList(l => l.filter(w => w.id !== id))
  }

  // TODO: inlined background color. Should be CSS class.
  return (
    <>
      <div className="sticky top-0 w-full mb-4 flex justify-center" style={{ backgroundColor: '#24242477' }}>
        <button type="button" onClick={() => { openEditWorkHistory() }}>+</button>
      </div>

      {workHistoryList.map(workHistory => (
        <div key={workHistory.id} className="mb-4">
          <WorkHistoryCard {...workHistory}>
            <div className="flex justify-end">
              <button onClick={() => { remove(workHistory.id ?? '') }}>Remove</button>
              <button onClick={() => { openEditWorkHistory(workHistory.id) }}>Edit</button>
            </div>
          </WorkHistoryCard>
        </div>
      ))}

      <Modal show={showModal} onCloseModal={() => { setShowModal(false) }}>
        <WorkHistoryForm initialWorkHistory={formWorkHistory} onSubmit={saveWorkHistoryList}/>
      </Modal>
    </>
  )
}
