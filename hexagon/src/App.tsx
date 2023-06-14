import { useState } from 'react'
import { DEV_ICONS, EXTRA_ICONS } from './icons'
import { HexGrid } from './components/HexGrid'
import { Dummy } from './components/Dummy'
import { AnimatePresence, motion } from 'framer-motion'
import { TileCountControls } from './components/TileCountControls'
import { ToggleButton } from './components/ToggleButton'
import { Header } from './components/Header'
import { ThemeToggle } from './components/ThemeToggle'

const allIcons = [...DEV_ICONS, ...EXTRA_ICONS]

function App (): JSX.Element {
  const [showDummyElements, setShowDummyElements] = useState(true)
  const [elements, setElements] = useState(DEV_ICONS.length)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-14">
        <div className="float-right">
          <ThemeToggle/>
        </div>

        <Header/>
      </div>

      <ToggleButton active={showDummyElements} onLabel="Hide dummy elements" offLabel="Show dummy elements" onClick={() => { setShowDummyElements(state => !state) }}/>

      <AnimatePresence>
        {showDummyElements && <motion.section className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {[...Array(3)].map((_value, i) => (
            <div className="mb-4" key={i}>
              <Dummy seed={i}/>
            </div>
          ))}
        </motion.section>}
      </AnimatePresence>

      <TileCountControls currentElementCount={elements} totalElementCount={allIcons.length} setElements={setElements}/>

      <section className="mb-14">
        <HexGrid icons={allIcons.slice(0, elements)}/>
      </section>

      <AnimatePresence>
        {showDummyElements && <motion.section className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {[...Array(10)].map((_value, i) => (
            <div className="mb-4" key={i}>
              <Dummy seed={75 * (i + 1)}/>
            </div>
          ))}
        </motion.section>}
      </AnimatePresence>
    </div>
  )
}

export default App
