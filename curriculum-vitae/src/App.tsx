/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react'
import { MultipleComboboxLevel, type MultipleComboboxLevelItem } from './components/multiple-combobox-level'
import { skills } from './data/skills'
import { languages } from './data/languages'
import { countries } from './data/countries'
import { ComboboxWithIcon } from './components/combobox'
import { GenderSelect, genderValues, type GenderValue } from './components/gender'
import { WorkHistoryConfig } from './components/work-history-config'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LinksConfig } from './components/links-config'
import { TextInput } from './components/text-input'
import { type WorkHistory } from './models/work-history'
import { tryLoad, trySave } from './storage'
import { countrySchema } from './schemas/country'
// TODO: One good way to avoid the problem of nested forms is to have
//       the resume builder divided in several steps, and each of them is a form.

// TODO: The only other item I'd like to add is education.
//       Maybe I can put everything in the timeline, mix work experience, education, certifications, etc.
//       Then I can show a filter to show only education or only work experience (this would be more useful
//       for employers rather than for users building the CV.
//       Then do some kind of "timeline"-y design thingy, like Facebook maybe? lol
//       A timeline would look insane. Specially if it's well designed.

const personalSchema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email(),
  nationality: countrySchema,
  about: z.string()
})

// TODO: Note, may wanna store everything in just ONE item in localstorage, prefixed with
//       the site name. All of the localstorage usages from this domain are visible, therefore
//       data can get cluttered.
// TODO: Remember to test with no data in localstorage as well, to see if it works with empty data.

function App (): JSX.Element {
  const { register, handleSubmit, setValue, control, trigger, formState: { errors } } = useForm<z.infer<typeof personalSchema>>({
    resolver: zodResolver(personalSchema),
    mode: 'onTouched'
  })

  const [gender, setGender] = useState<GenderValue>(genderValues[0])
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([])
  const [linkList, setLinkList] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<MultipleComboboxLevelItem[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<MultipleComboboxLevelItem[]>([])

  // NOTE: Instead of useWatch, I could try using the "register" function, but that involves
  //       using forwardRef, and I'm not sure if Headless UI combobox would work with this.
  const nationality = useWatch({ control, name: 'nationality' })

  useEffect(() => {
    const data = tryLoad()
    if (data === null) return

    setValue('fullName', data.personal.fullName)
    setValue('email', data.personal.email)
    setGender(data.personal.gender)
    setValue('about', data.personal.about)
    setValue('nationality', data.personal.nationality)
    setWorkHistoryList(data.workHistory)
    setLinkList(data.links)
    setSelectedSkills(data.skills)
    setSelectedLanguages(data.languages)
  }, [setValue])

  const onSubmit = (data: z.infer<typeof personalSchema>): void => {
    trySave({
      personal: {
        ...data,
        gender
      },
      workHistory: workHistoryList,
      links: linkList,
      skills: selectedSkills,
      languages: selectedLanguages
    })
  }

  return (
    <div className="container mx-auto lg:w-8/12 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">SUBMIT!</button>
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
          <div className="relative mb-4">
            <textarea {...register('about')} id="about" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label htmlFor="about" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              About me
            </label>
          </div>
        </div>
        <div className="my-4">
          <WorkHistoryConfig list={workHistoryList} onChange={setWorkHistoryList}/>
        </div>
        <div className="my-4">
          <MultipleComboboxLevel selected={selectedSkills} onChange={setSelectedSkills} list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="What are your skills?" emptyMessage="Please add skills"/>
        </div>
        <div className="my-4">
          <MultipleComboboxLevel selected={selectedLanguages} onChange={setSelectedLanguages} list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="Type language name" emptyMessage="Please add your languages"/>
        </div>
      </form>
      <div className="my-4">
        <h2>Links</h2>
        <p>Add your portfolio, LinkedIn profiles, etc.</p>
        <LinksConfig list={linkList} onChange={setLinkList}/>
      </div>

      <div className="my-20">
        empty
      </div>
    </div>
  )
}

export default App
