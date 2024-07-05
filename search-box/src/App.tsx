import './App.css'
import { Content, DummyBlock } from './dummy'
import { Input } from './input'

function App (): JSX.Element {
  return (
    <>
      <div className="mb-10"><DummyBlock/></div>

      <div className="mb-10">
        <Input><Content/></Input>
      </div>

      <div className="mb-10"><DummyBlock/></div>

      <div className="mb-10">
        <Input><Content/></Input>
      </div>

      <div className="mb-10"><DummyBlock/></div>
      <div className="mb-10"><DummyBlock/></div>
      <div className="mb-10"><DummyBlock/></div>
    </>
  )
}

export default App
