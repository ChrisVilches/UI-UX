import './App.css'
import { Input } from './input'

// TODO: Clean the code.
// TODO: Make a good layout.
// TODO: Make it more fancy.
// TODO: Move it to its standalone component. Try to render multiple instances and see if they work individually.

function App() {
  return (
    <div className="flex h-screen w-full justify-center pt-20 bg-slate-700 px-4">
      <button>Focusable button</button>
      <div className="grid grid-cols-10 gap-2 items-center">
        <div className="col-span-10 md:col-span-1 lg:col-span-2">
          Another column
        </div>
        <Input>
          <div className="p-8">
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
          </div>
        </Input>
        <p>Other content</p>
        <p>Other content</p>
        <p>Other content</p>
        <button>Focusable button</button>
        <Input>
          <div className="p-8">
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
            <button className="bg-slate-600">Button</button>
          </div>
        </Input>
      </div>
    </div>
  )
}

export default App
