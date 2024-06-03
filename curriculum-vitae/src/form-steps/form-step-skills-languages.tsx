import { MultipleComboboxLevel } from '../components/multiple-combobox-level'
import { skills } from '../data/skills'
import { languages } from '../data/languages'
import { Form } from '../components/form'
import { type FormStepProps } from './form-step-wrapped'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemWithLevelSchema } from '../schemas/item-with-level'
import { TextError } from '../components/text-error'
import { FormStepSubmitButton } from '../components/form-step-submit-button'

const schema = z.object({
  skills: itemWithLevelSchema.array(),
  languages: itemWithLevelSchema.array().min(1, 'Fill in your native language')
})

export function FormStepSkillsLanguages ({ saveResume, resumeData, onSuccess }: FormStepProps): JSX.Element {
  const { handleSubmit, control, formState: { isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      languages: resumeData.languages ?? [],
      skills: resumeData.skills ?? []
    }
  })

  const onSubmit = async (data: z.infer<typeof schema>): Promise<void> => {
    await saveResume(data)
    onSuccess()
  }

  return (
    <Form isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <Controller control={control} name="skills" render={({ fieldState, field: { onChange, onBlur, value, ref } }) => (
          <>
            <MultipleComboboxLevel selected={value} onChange={onChange} onBlur={onBlur} ref={ref} list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="e.g. Excel" emptyMessage="Please fill in your skills"/>
            <TextError>{fieldState.error?.message}</TextError>
          </>
        )}/>
      </div>
      <div className="my-10">
        <Controller control={control} name="languages" render={({ fieldState, field: { onChange, onBlur, value, ref } }) => (
          <>
            <MultipleComboboxLevel selected={value} onChange={onChange} onBlur={onBlur} ref={ref} list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="e.g. English" emptyMessage="Please fill in the languages you speak"/>
            <TextError>{fieldState.error?.message}</TextError>
          </>
        )}/>
      </div>

      <div className="flex justify-end sticky bottom-0 sm:relative sm:py-4">
        <FormStepSubmitButton isSubmitting={isSubmitting}/>
      </div>
    </Form>
  )
}
