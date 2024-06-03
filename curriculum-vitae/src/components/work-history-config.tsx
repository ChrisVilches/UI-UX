import { useState } from 'react'
import { type WorkHistory, compareWorkHistory, createWorkHistory } from '../models/work-history'
import { v4 } from 'uuid'
import { WorkHistoryCard } from './work-history-card'
import Modal from './modal'
import { WorkHistoryForm } from './work-history-form'
import { MdOutlineModeEdit } from 'react-icons/md'
import { IoIosAdd } from 'react-icons/io'
import { Alert } from './alert'
import { SecondaryButton } from './buttons'
import { Confirm } from './confirm'
import { TrashIconButton } from './trash-icon-button'
import { useConfirmDialog } from '../hooks/use-confirm-dialog'

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
  const [formWorkHistory, setFormWorkHistory] = useState<WorkHistory>(createWorkHistory(false))
  const [showModal, setShowModal] = useState(false)
  const { showConfirm, confirmItem, hideConfirm, setConfirmItem } = useConfirmDialog<WorkHistory>()

  const openEditWorkHistory = (id?: string): void => {
    if (typeof id === 'undefined') {
      setFormWorkHistory(createWorkHistory(list.length === 0))
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

  return (
    <>
      {list.length === 0
        ? (
          <div className="mb-20">
            <Alert variant="warn" className='mb-8'>Add your work experience here</Alert>
            <SecondaryButton type="button" onClick={() => { openEditWorkHistory() }}>
              <IoIosAdd className="size-6"/>
              <span>Add your latest work experience</span>
            </SecondaryButton>
          </div>
          )
        : (
          <div className="sticky top-20 sm:top-0 w-full mb-4 pb-4 flex justify-center bg-slate-950 bg-opacity-90">
            <SecondaryButton onClick={() => { openEditWorkHistory() }}>
              <IoIosAdd className="size-6"/>
              <span>Add another work experience</span>
            </SecondaryButton>
          </div>
          )}

      <div className="mb-10 empty:hidden">
        {list.map(workHistory => (
          <div key={workHistory.id} className="mb-4">
            <WorkHistoryCard {...workHistory} topRight={
              <div className="flex justify-end">
                <button type="button" className="mr-2 text-slate-400 p-1 hover:text-slate-300 duration-500" onClick={() => { openEditWorkHistory(workHistory.id) }}>
                  <MdOutlineModeEdit/>
                </button>
                <TrashIconButton onClick={() => { setConfirmItem(workHistory) }}/>
              </div>
            }/>
          </div>
        ))}
      </div>

      <Confirm
        show={showConfirm}
        onConfirm={() => { remove(confirmItem?.id ?? '') }}
        onClose={hideConfirm}
        buttonLabel="Delete"
        variant="danger"
      >
        Are you sure you want to remove <b>{confirmItem?.companyName}</b>?
      </Confirm>

      <Modal title="Tell us about your work experience" show={showModal} onCloseModal={() => { setShowModal(false) }}>
        <WorkHistoryForm initialWorkHistory={formWorkHistory} onSubmit={saveWorkHistoryList}/>
      </Modal>
    </>
  )
}
