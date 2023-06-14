import { HiMinus, HiPlus } from 'react-icons/hi2'

interface TileCountControlsProps {
  currentElementCount: number
  totalElementCount: number
  setElements: React.Dispatch<React.SetStateAction<number>>
}

export function TileCountControls ({ currentElementCount, totalElementCount, setElements }: TileCountControlsProps): JSX.Element {
  return (
    <div className="mb-14">
      <div className="mb-4 dark:text-white">Showing <b>{currentElementCount}</b> hexagons</div>
      <button className="rounded text-white bg-red-700 hover:bg-red-800 duration-300 disabled:bg-red-400 py-4 px-8 mr-4" disabled={currentElementCount === 1} onClick={() => { setElements((state: number) => state - 1) }}>
        <HiMinus className="w-4 h-4"/>
      </button>
      <button className="rounded text-white bg-red-700 hover:bg-red-800 duration-300 disabled:bg-red-400 py-4 px-8" disabled={currentElementCount === totalElementCount} onClick={() => { setElements((state: number) => state + 1) }}>
        <HiPlus className="w-4 h-4"/>
      </button>
    </div>
  )
}
