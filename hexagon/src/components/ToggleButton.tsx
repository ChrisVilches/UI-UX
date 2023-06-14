import { HiChevronUp } from 'react-icons/hi2'

import { motion } from 'framer-motion'

interface ToggleButtonProps {
  active: boolean
  onLabel: string
  offLabel: string
  onClick: () => void
}

export function ToggleButton ({ active, onLabel, offLabel, onClick }: ToggleButtonProps): JSX.Element {
  return (
    <button className="mb-8 text-white rounded font-semibold bg-red-700 hover:bg-red-800 duration-300 disabled:bg-gray-400 py-4 px-8" onClick={onClick}>
      <div className="flex items-center">
        <motion.div className="mr-4" animate={{ rotate: active ? 0 : 180 }}>
          <HiChevronUp className="w-6 h-6"/>
        </motion.div>
        <span>
          {active ? onLabel : offLabel}
        </span>
      </div>
    </button>
  )
}
