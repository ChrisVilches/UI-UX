import { type ReactNode } from 'react'
import { CiWarning } from 'react-icons/ci'

interface AlertProps {
  variant: 'warn'
  children: ReactNode
  className?: string
}

export function Alert ({ variant, children, className = '' }: AlertProps): JSX.Element {
  if (variant === 'warn') {
    return (
      <div className={`p-6 border-l-8 border-l-orange-700 bg-yellow-400 text-orange-700 flex items-center space-x-4 ${className}`}>
        <CiWarning className="size-6"/>
        <div>
          {children}
        </div>
      </div>
    )
  }

  throw new Error('Wrong variant')
}
