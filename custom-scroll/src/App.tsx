import { ScrollContent } from './scroll-content'

function App (): JSX.Element {
  // NOTE: Using flex on the body glitches it.
  return (
    <div className="container px-4 md:mx-auto mt-8">
      <ScrollContent/>
    </div>
  )
}

export default App
