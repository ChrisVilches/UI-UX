import { useState, type FormEvent } from 'react'
import { type WorkHistory } from '../models/work-history'
import { WorkHistoryConfig } from '../components/work-history-config'
import { type FormStepProps } from './form-step-wrapped'
import { Form } from '../components/form'
import { FormStepSubmitButton } from '../components/form-step-submit-button'

export function FormStepWorkHistory ({ saveResume, resumeData, onSuccess }: FormStepProps): JSX.Element {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>(resumeData.workHistory ?? [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()

    const fn = async (): Promise<void> => {
      setIsSubmitting(true)
      await saveResume({ workHistory: workHistoryList })
      setIsSubmitting(false)
      onSuccess()
    }
    fn().catch(console.error)
  }

  return (
    <Form isSubmitting={isSubmitting} onSubmit={onSubmit}>
      <div className="my-4">
        <WorkHistoryConfig list={workHistoryList} onChange={setWorkHistoryList}/>
      </div>

      <div className="flex justify-end sticky bottom-0 sm:relative sm:py-4">
        <FormStepSubmitButton isSubmitting={isSubmitting}/>
      </div>
    </Form>
  )
}
