/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react'
import { MultipleComboboxLevel } from './components/multiple-combobox-level'
import { skills } from './data/skills'
import { languages } from './data/languages'
import { countries } from './data/countries'
import { ComboboxWithIcon, type ComboboxWithIconItem } from './components/combobox'
import { GenderSelect, type GenderValues } from './components/gender'
import { WorkHistoryConfig } from './components/work-history-config'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LinksConfig } from './components/links-config'
import { TextInput } from './components/text-input'
// TODO: One good way to avoid the problem of nested forms is to have
//       the resume builder divided in several steps, and each of them is a form.

// TODO: The only other item I'd like to add is education.
//       Maybe I can put everything in the timeline, mix work experience, education, certifications, etc.
//       Then I can show a filter to show only education or only work experience (this would be more useful
//       for employers rather than for users building the CV.
//       Then do some kind of "timeline"-y design thingy, like Facebook maybe? lol
//       A timeline would look insane. Specially if it's well designed.

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email(),
  nationality: z.object({ id: z.number() }, { message: 'Select nationality' })
})

function App (): JSX.Element {
  const [gender, setGender] = useState<GenderValues>('male')

  const { register, handleSubmit, setValue, control, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      nationality: null as (ComboboxWithIconItem | null)
    }
  })

  // NOTE: Instead of useWatch, I could try using the "register" function, but that involves
  //       using forwardRef, also I'm not sure if Headless UI combobox would work with this.
  const nationality = useWatch({ control, name: 'nationality' })

  const onSubmit = (data: unknown): void => {
    console.log(data)
  }

  // TODO: When there are errors, the label thingy looks bad (looks out of place.)

  return (
    <div className="container mx-auto lg:w-8/12 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <div className="relative mb-4">
            <TextInput errorMessage={errors.fullName?.message} label="Full name" id="full-name" {...register('fullName', { required: true, minLength: 2 })}/>
          </div>
          <div className="mb-4">
            <TextInput errorMessage={errors.email?.message} label="E-mail" id="email" {...register('email', { required: true, minLength: 2 })}/>
          </div>
          <div className="mb-4 flex justify-center">
            <GenderSelect value={gender} onChange={setGender}/>
          </div>
          <div className="mb-4 w-full">
            <ComboboxWithIcon
              value={nationality}
              onChange={(v) => {
                setValue('nationality', v)
                trigger('nationality').catch(console.error)
              }}
              defaultIcon={<span>🌍</span>}
              list={countries}
              placeholder="Select your nationality"/>
            {(errors.nationality != null) && <span className="text-red-500">{errors.nationality.message}</span>}
          </div>
          <div className="relative mb-4">
            <textarea id="about" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label htmlFor="about" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              About me
            </label>
          </div>
        </div>
        <div className="my-4">
          <WorkHistoryConfig/>
        </div>
        <div className="my-4">
          <MultipleComboboxLevel list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="What are your skills?" emptyMessage="Please add skills"/>
        </div>
        <div className="my-4">
          <MultipleComboboxLevel list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="Type language name" emptyMessage="Please add your languages"/>
        </div>
      </form>
      <div className="my-4">
        <h2>Links</h2>
        <p>Add your portfolio, LinkedIn profiles, etc.</p>
        <LinksConfig/>
      </div>

      <div className="my-20">
        empty
      </div>
    </div>
  )
}

export default App
