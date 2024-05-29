import { type FormEvent, useState, useEffect } from 'react'
import { MultipleComboboxLevel, type MultipleComboboxLevelItem } from '../components/multiple-combobox-level'
import { load, save } from '../storage'
import { skills } from '../data/skills'
import { languages } from '../data/languages'
import { FormDelay } from '../components/form-delay'
import { type FormStepProps } from './form-step-wrapped'

export function FormStepSkillsLanguages ({ onSuccess }: FormStepProps): JSX.Element {
  const [selectedSkills, setSelectedSkills] = useState<MultipleComboboxLevelItem[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<MultipleComboboxLevelItem[]>([])

  useEffect(() => {
    const data = load({ select: ['languages', 'skills'] })
    if (data === null) return
    setSelectedSkills(data.skills ?? [])
    setSelectedLanguages(data.languages ?? [])
  }, [])

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
    if (save({
      skills: selectedSkills,
      languages: selectedLanguages
    })) {
      onSuccess()
    }
  }

  // TODO: Challenge, add another validated form here (with completion requirements, since
  //       for now the basic one is the only one with validations).
  //       Make at least ONE language required. Say "input at least your native language"
  //       I already implemented the validations for the single value combobox with React Hook Form.

  return (
    <FormDelay onSubmit={onSubmit}>
      {(isSubmitting) => (
        <>
          <div className="my-4">
            <MultipleComboboxLevel selected={selectedSkills} onChange={setSelectedSkills} list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="e.g. Excel" emptyMessage="Please fill in your skills"/>
          </div>
          <div className="my-10">
            <MultipleComboboxLevel selected={selectedLanguages} onChange={setSelectedLanguages} list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="e.g. English" emptyMessage="Please fill in the languages you speak"/>
          </div>

          <div className="flex justify-end sticky bottom-0">
            <button type="submit" className='w-full md:w-auto p-4 rounded-md bg-green-700'>{isSubmitting ? 'Wait...' : 'Save'}</button>
          </div>
        </>
      )}
    </FormDelay>
  )
}
