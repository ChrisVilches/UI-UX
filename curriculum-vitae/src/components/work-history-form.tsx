import { YearMonthPicker } from './year-month-picker'
import { type WorkHistory } from '../models/work-history'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextInput } from './text-input'
import { compareYearMonthDate } from '../models/date'
import { dateSchema } from '../schemas/date'

interface WorkHistoryFormProps {
  initialWorkHistory: WorkHistory
  onSubmit: (data: WorkHistory) => void
}

const dateRangeSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  stillWorking: z.boolean()
}).refine(({ startDate, endDate, stillWorking }) => {
  return stillWorking || compareYearMonthDate(startDate, endDate) <= 0
}, { message: 'Dates must be in order' })

const schema = z.object({
  companyName: z.string().trim().min(1, 'Required'),
  role: z.string(),
  description: z.string(),
  dates: dateRangeSchema
})

export function WorkHistoryForm ({ initialWorkHistory, onSubmit }: WorkHistoryFormProps): JSX.Element {
  const { trigger, handleSubmit, setValue, register, control, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      companyName: initialWorkHistory.companyName,
      role: initialWorkHistory.role,
      description: initialWorkHistory.description,
      dates: {
        startDate: initialWorkHistory.startDate,
        endDate: initialWorkHistory.endDate ?? initialWorkHistory.startDate,
        stillWorking: typeof initialWorkHistory.endDate === 'undefined'
      }
    }
  })

  const submitHandle = (data: z.infer<typeof schema>): void => {
    const { dates, ...other } = data
    onSubmit({
      ...other,
      id: initialWorkHistory.id,
      startDate: dates.startDate,
      endDate: dates.stillWorking ? undefined : dates.endDate
    })
  }

  const isNew = typeof initialWorkHistory.id === 'undefined'

  const dates = useWatch({
    name: 'dates',
    control
  })

  return (
    <form onSubmit={(ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      handleSubmit(submitHandle)().catch(console.error)
      trigger('dates').catch(console.error)
    }}>
      <div className="mb-10">
        {/*
        NOTE: React Hook Form updates individual fields (errors, values, etc), so if you want to
              do validations that deal with several fields you should execute "trigger" on the group.
        */}
        <div className="flex space-x-2 mb-2">
          <div className="flex-1">
            <YearMonthPicker value={dates.startDate} onChange={(data) => {
              setValue('dates.startDate', data)
              trigger('dates').catch(console.error)
            }}/>
          </div>
          <div className="flex-1">
            <YearMonthPicker disabled={dates.stillWorking} value={dates.endDate} onChange={(data) => {
              setValue('dates.endDate', data)
              trigger('dates').catch(console.error)
            }}/>
          </div>
        </div>
        {errors.dates != null && <span className="text-sm text-red-500">{errors.dates.message}</span>}

        <div className="flex items-center justify-end mt-2">
          <input
            type="checkbox"
            {...register('dates.stillWorking')}
            onChange={(ev) => {
              setValue('dates.stillWorking', ev.target.checked)
              trigger('dates').catch(console.error)
            }}
            id="still-working"
            className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"/>
          <label htmlFor="still-working" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I&apos;m still working here</label>
        </div>
      </div>

      <div className="mb-4">
        <TextInput errorMessage={errors.companyName?.message} {...register('companyName')} label="Company name" id="company-name"/>
      </div>
      <div className="mb-4">
        <TextInput errorMessage={errors.role?.message} {...register('role')} label="Role" id="role"/>
      </div>
      <div className="mb-8">
        <TextInput errorMessage={errors.description?.message} {...register('description')} label="Description" id="description"/>
      </div>

      <button className='p-4 rounded-md bg-green-800 w-full md:w-auto' type="submit">
        {isNew ? 'Save' : 'Edit'}
      </button>
    </form>
  )
}
