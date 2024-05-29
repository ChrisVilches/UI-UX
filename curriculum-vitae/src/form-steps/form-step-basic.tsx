/* eslint-disable @typescript-eslint/no-misused-promises */

import { z } from 'zod'
import { countrySchema } from '../schemas/country'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type GenderValue, genderValues, GenderSelect } from '../components/gender'
import { useEffect, useState } from 'react'
import { load, save } from '../storage'
import { TextInput } from '../components/text-input'
import { ComboboxWithIcon } from '../components/combobox'
import { countries } from '../data/countries'
import { FormDelay } from '../components/form-delay'
import { type FormStepProps } from './form-step-wrapped'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email(),
  nationality: countrySchema
})

export function FormStepBasic ({ onSuccess }: FormStepProps): JSX.Element {
  const [gender, setGender] = useState<GenderValue>(genderValues[0])
  const { register, handleSubmit, setValue, control, trigger, formState: { errors, isValid } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onTouched'
  })

  useEffect(() => {
    const data = load({ select: ['fullName', 'email', 'gender', 'nationality'] })
    if (data === null) return

    if (data.fullName != null) setValue('fullName', data.fullName)
    if (data.email != null) setValue('email', data.email)
    if (data.gender != null) setGender(data.gender)
    if (data.nationality != null) setValue('nationality', data.nationality)

    // NOTE: If it could be loaded, it means it could be saved, therefore it's complete.
    //       So there's no problem putting this line here.
    // TODO: But why did I put it here if there aren't going to be any errors anyway?
    //       Probably not needed anymore? Remove.
    // trigger().catch(console.error)
  }, [setValue, trigger])

  const onSubmit = (data: z.infer<typeof schema>): void => {
    if (save({ ...data, gender })) {
      onSuccess()
    }
  }

  return (
    <FormDelay immediate={!isValid} onSubmit={handleSubmit(onSubmit)}>
      {(isSubmitting) => (
        <>
          <div className="my-4">
            <div className="relative mb-4">
              <TextInput errorMessage={errors.fullName?.message} label="Full name" id="full-name" {...register('fullName')}/>
            </div>
            <div className="mb-4">
              <TextInput errorMessage={errors.email?.message} label="E-mail" id="email" {...register('email')}/>
            </div>
            <div className="mb-4 flex justify-center">
              <GenderSelect value={gender} onChange={setGender}/>
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
                  {(errors.nationality != null) && <span className="text-red-500">{errors.nationality.message}</span>}
                </>
              )}/>
            </div>
          </div>

          <div className="flex justify-end sticky bottom-0">
            <button type="submit" className='w-full md:w-auto p-4 rounded-md bg-green-700'>{isSubmitting ? 'Wait...' : 'Save'}</button>
          </div>
        </>
      )}
    </FormDelay>
  )
}
