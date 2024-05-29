import { useState } from "react"
import { WorkHistory, compareWorkHistory, createWorkHistory } from "./models/work-history"
import { v4 } from "uuid"
import { WorkHistoryCard } from "./work-history-card"
import Modal from "./modal"
import { WorkHistoryForm } from "./work-history-form"

// TODO: It should start empty. Remove this dummy one.
const createDummyWorkHistory = () => ({
  id: v4(),
  companyName: "Daijob.com",
  role: "Full-Stack Engineer",
  description: "Did a lot of functionalities",
  startDate: { year: 2019, month: 1 },
  endDate: { year: 2019, month: 1 }
})

function sortWorkHistoriesDesc(list: WorkHistory[]) {
    const result = [...list]
    result.sort(compareWorkHistory)
    result.reverse()
    return result
}

export function WorkHistoryConfig() {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([createDummyWorkHistory(), createDummyWorkHistory()])

  const [formWorkHistory, setFormWorkHistory] = useState<WorkHistory>(createWorkHistory())
  const [showModal, setShowModal] = useState(false)

  const openEditWorkHistory = (id?: string) => {
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

  const saveWorkHistoryList = (data: WorkHistory) => {
    if (typeof data.id === 'undefined') {
      data.id = v4()
      setWorkHistoryList(l => [...l, data])
    } else {
      setWorkHistoryList(l => l.map(w => w.id === data.id ? data : w))
    }
    setWorkHistoryList(sortWorkHistoriesDesc)
    setShowModal(false)
  }

  const remove = (id: string) => {
    setWorkHistoryList(l => l.filter(w => w.id !== id))
  }
  
  return (
    <>
      {workHistoryList.map(workHistory => (
        <div key={workHistory.id} className="mb-4">
          <WorkHistoryCard {...workHistory}>
            <div className="flex justify-end">
              <button onClick={() => { remove(workHistory.id ?? '') }}>Remove</button>
              <button onClick={() => { openEditWorkHistory(workHistory.id) }}>Edit</button>
            </div>
          </WorkHistoryCard>
          {/* TODO: These buttons should go inside the card content */}
        </div>
      ))}

      <Modal show={showModal} onCloseModal={() => { setShowModal(false) }}>
        <WorkHistoryForm initialWorkHistory={formWorkHistory} onSubmit={saveWorkHistoryList}/>
      </Modal>

      <button onClick={() => { openEditWorkHistory() }}>+</button>
    </>
  )
}
