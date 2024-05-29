/* eslint-disable @typescript-eslint/no-misused-promises */

import { z } from 'zod'
import { countrySchema } from '../schemas/country'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type GenderValue, genderValues, GenderSelect } from '../components/gender'
import { useEffect, useState } from 'react'
import { tryLoad, trySave } from '../storage'
import { TextInput } from '../components/text-input'
import { ComboboxWithIcon } from '../components/combobox'
import { countries } from '../data/countries'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email(),
  nationality: countrySchema
})

interface FormStepBasicProps {
  onSuccess: () => void
}

export function FormStepBasic ({ onSuccess }: FormStepBasicProps): JSX.Element {
  const [gender, setGender] = useState<GenderValue>(genderValues[0])
  const { register, handleSubmit, setValue, control, trigger, formState: { errors, isValid } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onTouched'
  })

  // NOTE: Instead of useWatch, I could try using the "register" function, but that involves
  //       using forwardRef, and I'm not sure if Headless UI combobox would work with this.
  const nationality = useWatch({ control, name: 'nationality' })

  useEffect(() => {
    const data = tryLoad()
    if (data === null) return

    setValue('fullName', data.basic.fullName)
    setValue('email', data.basic.email)
    setGender(data.basic.gender)
    setValue('nationality', data.basic.nationality)
  }, [setValue])

  const onSubmit = (data: z.infer<typeof schema>): void => {
    if (trySave({
      basic: {
        ...data,
        gender
      }
    })) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <ComboboxWithIcon
            value={nationality}
            onChange={(v: number) => {
              setValue('nationality', v)
              trigger('nationality').catch(console.error)
            }}
            onBlur={() => {
              trigger('nationality').catch(console.error)
            }}
            defaultIcon={<span>🌍</span>}
            list={countries}
            placeholder="Select your nationality"/>
          {(errors.nationality != null) && <span className="text-red-500">{errors.nationality.message}</span>}
        </div>
      </div>

      <button type="submit" className={isValid ? 'bg-green-700' : 'bg-gray-700'}>Save</button>
    </form>
  )
}
