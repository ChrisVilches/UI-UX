import { type IconType } from 'react-icons'
import { BsPersonFill } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { MdWork } from 'react-icons/md'
import { SiHyperskill } from 'react-icons/si'
import { Link } from 'react-router-dom'

const steps = ['basic', 'work-history', 'skill-lang', 'about']

const completed = (step: string, curr: string): boolean => {
  for (const s of steps) {
    if (s === curr) break
    if (s === step) return true
  }
  return false
}

interface MenuItemProps {
  children: string
  slug: string
  currentStep: string
  className?: string
  Icon: IconType
}

const MenuItemContainer = ({ children, slug, currentStep, className = '', Icon }: MenuItemProps): JSX.Element => {
  const stepCompleted = completed(slug, currentStep)
  const active = slug === currentStep
  let style = ''
  if (active || stepCompleted) {
    style = 'text-gray border-l-2 border-l-green-700 -ml-[1px]'
  } else {
    style = 'text-gray border-l-2 border-slate-500 -ml-[1px]'
  }

  let iconStyle = ''
  if (active) {
    iconStyle = 'bg-green-200 ring-0 text-green-700'
  } else if (stepCompleted) {
    iconStyle = 'bg-green-300 ring-4 ring-green-700 text-green-700'
  } else {
    iconStyle = 'bg-slate-400 ring-0'
  }

  return (
    <div className={`${style} ${className}`}>
      <div className="mb-0 ms-8">
        <Link to={`/${slug}`} className="flex items-center">
          <span className={`${iconStyle} transition-colors duration-4 absolute flex items-center justify-center size-8 rounded-full -start-4`}>
            <Icon/>
          </span>
          <h3 className={`leading-tight ${slug === currentStep ? 'font-extrabold' : ''}`}>{children}</h3>
        </Link>
      </div>
    </div>
  )
}

export const Menu = ({ currentStepName }: { currentStepName: string }): JSX.Element => (
  <div className="relative">
    <MenuItemContainer Icon={BsPersonFill} slug="basic" currentStep={currentStepName}>
      Basic
    </MenuItemContainer>

    <MenuItemContainer Icon={MdWork} className="pt-10" slug="work-history" currentStep={currentStepName}>
      Work History
    </MenuItemContainer>

    <MenuItemContainer Icon={SiHyperskill} className="pt-10" slug="skill-lang" currentStep={currentStepName}>
      Skills
    </MenuItemContainer>

    <MenuItemContainer Icon={GrTextAlignFull} className="pt-10" slug="about" currentStep={currentStepName}>
      About
    </MenuItemContainer>
  </div>
)
