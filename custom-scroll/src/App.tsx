import './App.css'
import { Grid } from './grid'
import { GridPreview } from './grid-preview'
import { useGenerateGridData } from './hooks/use-generate-grid-data'
import { useScroll } from './hooks/use-scroll'

function App () {
  const { contentWidth, contentRef, scrollContainerRef, scrollRef, containerWidth, containerHeight } = useScroll()

  const { rows, cols, generate, gridData } = useGenerateGridData()
  // TODO: (I think fixed) Infinite loop when resizing. I think the hooks are executing too many updates.
  // TODO: When the user clicks on the scrollbar, it should move to that position (maybe with animation?).

  return (
    <div className="container px-4 md:mx-auto mt-8">
      <div className="bg-slate-600 w-full h-20 touch-pan-x" ref={scrollContainerRef}>
        <div className="absolute h-20">
          <div ref={scrollRef} className="bg-slate-800 hover:bg-slate-700 transition-colors duration-150 z-40 h-full relative opacity-85 select-none"></div>
        </div>

        <div className="h-20 select-none opacity-50">
          <GridPreview containerWidth={containerWidth} containerHeight={containerHeight} rows={rows} cols={cols} data={gridData}/>
        </div>
      </div>

      <div className="overflow-x-scroll select-none mt-4" ref={contentRef}>
        <Grid contentWidth={contentWidth} rows={rows} cols={cols} data={gridData}/>
      </div>

      <div className="mt-8">
        <button className="p-4 bg-green-800 rounded-md" onClick={generate}>Randomize</button>
      </div>
    </div>
  )
}

export default App
