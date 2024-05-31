import { type IconType } from 'react-icons'
import { BsPersonFill } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { MdWork } from 'react-icons/md'
import { SiHyperskill } from 'react-icons/si'
import { Link } from 'react-router-dom'

const MenuItem = ({ Icon, active }: { Icon: IconType, active: boolean }): JSX.Element => {
  return (
    <span className={`${active ? 'bg-green-300 ring-green-700 text-green-700' : 'bg-gray-300'} transition-colors duration-4 absolute flex items-center justify-center size-8 rounded-full -start-4 ring-4`}>
      <Icon/>
    </span>
  )
}

export const Menu = ({ currentStepName }: { currentStepName: string }): JSX.Element => (
  <ol className="relative text-gray-500 border-s border-gray-200">
    <li className="mb-10 ms-8">
      <Link to="/basic" className="flex items-center">
        <MenuItem Icon={BsPersonFill} active={currentStepName === 'basic'}/>
        <h3 className="font-medium leading-tight">Basic Information</h3>
      </Link>
    </li>
    <li className="mb-10 ms-8">
      <Link to="/work-history" className="flex items-center">
        <MenuItem Icon={MdWork} active={currentStepName === 'work-history'}/>
        <h3 className="font-medium leading-tight">Work History</h3>
      </Link>
    </li>
    <li className="mb-10 ms-8">
      <Link to="/skill-lang" className="flex items-center">
        <MenuItem Icon={SiHyperskill} active={currentStepName === 'skill-lang'}/>
        <h3 className="font-medium leading-tight">Skills</h3>
      </Link>
    </li>
    <li className="ms-8">
      <Link to="/about" className="flex items-center">
        <MenuItem Icon={GrTextAlignFull} active={currentStepName === 'about'}/>
        <h3 className="font-medium leading-tight">About</h3>
      </Link>
    </li>
  </ol>
)
