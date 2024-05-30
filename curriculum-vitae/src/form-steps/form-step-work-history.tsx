import { useState, useEffect, FormEvent } from 'react'
import { type WorkHistory } from '../models/work-history'
import { load, save } from '../storage'
import { WorkHistoryConfig } from '../components/work-history-config'
import { type FormStepProps } from './form-step-wrapped'
import { Form } from '../components/form'
import { sleep } from '../util'

export function FormStepWorkHistory ({ onSuccess }: FormStepProps): JSX.Element {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const data = load({ select: ['workHistory'] })
    if (data === null) return
    setWorkHistoryList(data.workHistory ?? [])
  }, [])

  const onSubmit = async (ev: FormEvent): Promise<void> => {
    ev.preventDefault()
    ev.stopPropagation()
    setIsSubmitting(true)
    await sleep(1000)
    save({ workHistory: workHistoryList })
    setIsSubmitting(false)
    onSuccess()
  }

  return (
    <Form isSubmitting={isSubmitting} onSubmit={onSubmit}>
      <div className="my-4">
        <WorkHistoryConfig list={workHistoryList} onChange={setWorkHistoryList}/>
      </div>

      <div className="flex justify-end sticky bottom-0">
        <button type="submit" className='w-full md:w-auto p-4 rounded-md bg-green-700'>{isSubmitting ? 'Wait...' : 'Save'}</button>
      </div>
    </Form>
  )
}
