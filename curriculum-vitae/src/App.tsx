import { useState } from 'react'
import { MultipleComboboxLevel } from './multiple-combobox-level'
import { skills } from './skills'
import { languages } from './languages'
import { countries } from './countries'
import { ComboboxWithIcon, ComboboxWithIconItem } from './combobox'
import { GenderSelect, GenderValues } from './gender'
import { WorkHistoryConfig } from './work-history-config'
import { useForm, useWatch } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LinksConfig } from './links-config'
// TODO: Move components to /components folder.

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

function App() {
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

  // TODO: Instead of useWatch, I could try using the "register" function, but that involves
  //       using forwardRef, also I'm not sure if Headless UI combobox would work with this.
  const nationality = useWatch({ control, name: 'nationality' })

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  // TODO: Maybe I can use react-forms (the library I always use with Zod)
  //       for the personal info form, and the work history creation form individually.
  //       Don't try to use it for the entire page!!!! That'd be a mess.

  // TODO: For e-mail, put an email icon at the right. Make sure it works well with the labels.

// TODO: When there are errors, the label thingy looks bad (looks out of place.)

  return (
    <div className="container mx-auto lg:w-8/12 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
        <div className="relative mb-4">
            <input {...register('fullName', { required: true, minLength: 2 })} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Full name
            </label>
            {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
          </div>
          <div className="relative mb-4">
            <input {...register('email', { required: true, minLength: 2 })} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              E-mail
            </label>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-4 flex justify-center">
            <GenderSelect value={gender} onChange={setGender}/>
          </div>
          <div className="mb-4 w-full">
            <ComboboxWithIcon
              value={nationality}
              onChange={(v) => {
                setValue('nationality', v)
                trigger('nationality')
              }}
              defaultIcon={<span>🌍</span>}
              list={countries}
              placeholder="Select your nationality"/>
              {errors.nationality && <span className="text-red-500">{errors.nationality.message}</span>}
          </div>
          <div className="relative mb-4">
            <textarea className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
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
