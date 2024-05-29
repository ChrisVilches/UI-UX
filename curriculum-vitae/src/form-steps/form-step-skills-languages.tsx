import { type FormEvent, useState, useEffect } from 'react'
import { MultipleComboboxLevel, type MultipleComboboxLevelItem } from '../components/multiple-combobox-level'
import { tryLoad, trySave } from '../storage'
import { skills } from '../data/skills'
import { languages } from '../data/languages'

interface FormStepSkillsLanguagesProps {
  onSuccess: () => void
}

export function FormStepSkillsLanguages ({ onSuccess }: FormStepSkillsLanguagesProps): JSX.Element {
  const [selectedSkills, setSelectedSkills] = useState<MultipleComboboxLevelItem[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<MultipleComboboxLevelItem[]>([])

  useEffect(() => {
    const data = tryLoad()
    if (data === null) return
    setSelectedSkills(data.skills)
    setSelectedLanguages(data.languages)
  }, [])

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
    if (trySave({
      skills: selectedSkills,
      languages: selectedLanguages
    })) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="my-4">
        <MultipleComboboxLevel selected={selectedSkills} onChange={setSelectedSkills} list={skills} defaultLevel={1} levels={['Beginner', 'Intermediate', 'Advanced']} placeholder="What are your skills?" emptyMessage="Please add skills"/>
      </div>
      <div className="my-4">
        <MultipleComboboxLevel selected={selectedLanguages} onChange={setSelectedLanguages} list={languages} defaultLevel={2} levels={['Basic', 'Conversational', 'Business', 'Fluent', 'Native']} placeholder="Type language name" emptyMessage="Please add your languages"/>
      </div>

      <button type="submit" className="bg-green-700">Save</button>
    </form>
  )
}
