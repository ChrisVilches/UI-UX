import { HexIcon } from './HexIcon'
import { useResize } from '../hooks/hex-grid/useResize'

interface HexGridProps {
  icons: React.ElementType[]
}

export function HexGrid ({ icons }: HexGridProps): JSX.Element {
  const containerRef = useResize(icons)

  return (
    <>
      <div className="hex-container mb-4">
        <div ref={containerRef} className="hex-inner-container">
          {icons.map((icon, i) => (
            <div className="hex-item group hover:bg-hex-tile-red hover:dark:bg-hex-tile-gray" key={i}>
              <HexIcon icon={icon}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
