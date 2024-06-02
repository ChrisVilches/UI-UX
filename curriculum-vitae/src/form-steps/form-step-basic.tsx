import { z } from 'zod'
import { countrySchema } from '../schemas/country'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { genderValues, GenderSelect } from '../components/gender'
import { TextInput } from '../components/text-input'
import { ComboboxWithIcon } from '../components/combobox'
import { countries } from '../data/countries'
import { type FormStepProps } from './form-step-wrapped'
import { Form } from '../components/form'
import { genderSchema } from '../schemas/gender'
import { TextError } from '../components/text-error'
import { FormStepSubmitButton } from '../components/form-step-submit-button'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email(),
  nationality: countrySchema,
  gender: genderSchema
})

export function FormStepBasic ({ saveResume, resumeData, onSuccess }: FormStepProps): JSX.Element {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    // NOTE: This is to avoid showing error messages while the user is typing the E-mail, but it's still not valid (i.e. hasn'typed
    //       the @hostname.com yet).
    mode: 'onTouched',
    defaultValues: {
      fullName: resumeData.fullName ?? '',
      email: resumeData.email ?? '',
      nationality: resumeData.nationality ?? -1,
      gender: resumeData.gender ?? genderValues[0]
    }
  })

  const onSubmit = async (data: z.infer<typeof schema>): Promise<void> => {
    await saveResume(data)
    onSuccess()
  }

  return (
    <Form isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <div className="relative mb-4">
          <TextInput errorMessage={errors.fullName?.message} label="Full name" id="full-name" {...register('fullName')}/>
        </div>
        <div className="mb-4">
          <TextInput errorMessage={errors.email?.message} label="E-mail" id="email" {...register('email')}/>
        </div>
        <div className="mb-4 flex justify-center">
          <Controller control={control} name="gender" render={({ field: { value, onChange } }) => (
            <GenderSelect value={value} onChange={onChange}/>
          )}/>
        </div>
        <div className="mb-4 w-full">
          {/* NOTE: This is necessary to make it controlled. The uncontrolled version
          gets the input display changed, ignoring the 'displayValue'. Remember that register()
          doesn't include the 'value' prop */}
          <Controller control={control} name="nationality" render={({ field: { onChange, onBlur, value, ref } }) => (
            <>
              <ComboboxWithIcon
                value={value}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                defaultIcon={<span>🌍</span>}
                list={countries}
                placeholder="Select your nationality"/>
              <TextError>{errors.nationality?.message}</TextError>
            </>
          )}/>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-0">
        <FormStepSubmitButton isSubmitting={isSubmitting}/>
      </div>
    </Form>
  )
}
