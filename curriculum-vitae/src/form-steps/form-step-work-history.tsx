import { useState, useEffect, type FormEvent } from 'react'
import { type WorkHistory } from '../models/work-history'
import { tryLoad, trySave } from '../storage'
import { WorkHistoryConfig } from '../components/work-history-config'

interface FormStepWorkHistoryProps {
  onSuccess: () => void
}

export function FormStepWorkHistory ({ onSuccess }: FormStepWorkHistoryProps): JSX.Element {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([])

  useEffect(() => {
    const data = tryLoad()
    if (data === null) return
    setWorkHistoryList(data.workHistory)
  }, [])

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
    if (trySave({ workHistory: workHistoryList })) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="my-4">
        <WorkHistoryConfig list={workHistoryList} onChange={setWorkHistoryList}/>
      </div>

      <button type="submit" className="bg-green-700">Save</button>
    </form>
  )
}
