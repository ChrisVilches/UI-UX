/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect } from 'react'
import { MultipleComboboxLevel } from '../components/multiple-combobox-level'
import { load, save } from '../storage'
import { skills } from '../data/skills'
import { languages } from '../data/languages'
import { FormDelay } from '../components/form-delay'
import { type FormStepProps } from './form-step-wrapped'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemWithLevelSchema } from '../schemas/item-with-level'

const schema = z.object({
  skills: itemWithLevelSchema.array(),
  languages: itemWithLevelSchema.array().min(1, 'Fill in your native language')
})

export function FormStepSkillsLanguages ({ onSuccess }: FormStepProps): JSX.Element {
  const { handleSubmit, setValue, control, formState: { errors, isValid } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      languages: [],
      skills: []
    }
  })

  useEffect(() => {
    const data = load({ select: ['languages', 'skills'] })
    if (data === null) return

    if (data.skills != null) setValue('skills', data.skills)
    if (data.languages != null) setValue('languages', data.languages)
  }, [setValue])

  const onSubmit = (data: z.infer<typeof schema>): void => {
    if (save(data)) {
      onSuccess()
    }
  }

  // TODO: Challenge, add another validated form here (with completion requirements, since
  //       for now the basic one is the only one with validations).
  //       Make at least ONE language required. Say "input at least your native language"
  //       I already implemented the validations for the single value combobox with React Hook Form.

  return (
    <FormDelay immediate={!isValid} onSubmit={handleSubmit(onSubmit)}>
      {(isSubmitting) => (
        <>
          <div className="my-4">
            <Controller control={control} name="skills" render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <MultipleComboboxLevel selected={value} onChange={onChange} onBlur={onBlur} ref={ref} list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="e.g. Excel" emptyMessage="Please fill in your skills"/>
                {(errors.skills != null) && <span className="text-red-500">{errors.skills.message}</span>}
              </>
            )}/>
          </div>
          <div className="my-10">
            <Controller control={control} name="languages" render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <MultipleComboboxLevel selected={value} onChange={onChange} onBlur={onBlur} ref={ref} list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="e.g. English" emptyMessage="Please fill in the languages you speak"/>
                {(errors.languages != null) && <span className="text-red-500">{errors.languages.message}</span>}
              </>
            )}/>
          </div>

          <div className="flex justify-end sticky bottom-0">
            <button type="submit" className='w-full md:w-auto p-4 rounded-md bg-green-700'>{isSubmitting ? 'Wait...' : 'Save'}</button>
          </div>
        </>
      )}
    </FormDelay>
  )
}
