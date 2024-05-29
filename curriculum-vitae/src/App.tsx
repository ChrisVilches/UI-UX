import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MultipleComboboxLevel } from './multiple-combobox-level'
import { skills } from './skills'
import { languages } from './languages'
import { countries } from './countries'
import { ComboboxWithIcon } from './combobox'
import { GenderSelect, GenderValues } from './gender'
import { WorkHistoryConfig } from './work-history-config'
// TODO: Move components to /components folder.

function App() {
  const [count, setCount] = useState(0)
  const [gender, setGender] = useState<GenderValues>('male')

  return (
    <div className="container mx-auto">
      <div>
        <div className="my-4">
          <GenderSelect value={gender} onChange={setGender}/>
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
        <div className="my-4 w-full">
          <ComboboxWithIcon
            defaultIcon={<span>🌍</span>}
            list={countries}
            buttonPlaceholder="Select your nationality"
            searchPlaceholder="Type country name"/>
        </div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
