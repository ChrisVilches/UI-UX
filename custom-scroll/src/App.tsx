import { ScrollContent } from './scroll-content'

function App (): JSX.Element {
  // TODO: (Fixed, I think!!) Using flex/grid on the body glitches it. It doesn't work well with the
  //       resize event handler.
  return (
    <div className="container px-4 md:mx-auto mt-8 w-screen">
      <ScrollContent/>
    </div>
  )
}

export default App
