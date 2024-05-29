import { useState } from 'react'
import { MultipleComboboxLevel } from './multiple-combobox-level'
import { skills } from './skills'
import { languages } from './languages'
import { countries } from './countries'
import { ComboboxWithIcon } from './combobox'
import { GenderSelect, GenderValues } from './gender'
import { WorkHistoryConfig } from './work-history-config'
// TODO: Move components to /components folder.

function App() {
  const [gender, setGender] = useState<GenderValues>('male')

  // TODO: Maybe I can use react-forms (the library I always use with Zod)
  //       for the personal info form, and the work history creation form individually.
  //       Don't try to use it for the entire page!!!! That'd be a mess.

  // TODO: For e-mail, put an email icon at the right. Make sure it works well with the labels.

  return (
    <div className="container mx-auto lg:w-8/12 px-4">
      <div>
        <div className="my-4">
        <div className="relative mb-4">
            <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Full name
            </label>
          </div>
          <div className="relative mb-4">
            <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              E-mail
            </label>
          </div>
          <div className="mb-4 flex justify-center">
            <GenderSelect value={gender} onChange={setGender}/>
          </div>
          <div className="mb-4 w-full">
            <ComboboxWithIcon
              defaultIcon={<span>🌍</span>}
              list={countries}
              placeholder="Select your nationality"/>
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
      </div>
    </div>
  )
}

export default App
