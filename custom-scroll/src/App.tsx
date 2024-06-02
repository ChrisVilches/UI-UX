import { ScrollContent } from './scroll-content'

function App (): JSX.Element {
  // TODO: The name "ScrollContent" is a bit strange. Besides, that component
  //       has multiple responsibilities (it should have just one).
  return (
    <div className="container px-4 md:mx-auto mt-8 w-screen">
      <ScrollContent/>
    </div>
  )
}

export default App
