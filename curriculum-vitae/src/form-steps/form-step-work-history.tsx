import { useState, useEffect } from 'react'
import { type WorkHistory } from '../models/work-history'
import { load, save } from '../storage'
import { WorkHistoryConfig } from '../components/work-history-config'
import { FormDelay } from '../components/form-delay'
import { type FormStepProps } from './form-step-wrapped'

export function FormStepWorkHistory ({ onSuccess }: FormStepProps): JSX.Element {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([])

  useEffect(() => {
    const data = load({ select: ['workHistory'] })
    if (data === null) return
    setWorkHistoryList(data.workHistory ?? [])
  }, [])

  const onSubmit = (): void => {
    if (save({ workHistory: workHistoryList })) {
      onSuccess()
    }
  }

  return (
    <FormDelay onSubmit={onSubmit}>
      {(isSubmitting) => (
        <>
          <div className="my-4">
            <WorkHistoryConfig list={workHistoryList} onChange={setWorkHistoryList}/>
          </div>

          <div className="flex justify-end sticky bottom-0">
            <button type="submit" className='w-full md:w-auto p-4 rounded-md bg-green-700'>{isSubmitting ? 'Wait...' : 'Save'}</button>
          </div>
        </>
      )}
    </FormDelay>
  )
}
