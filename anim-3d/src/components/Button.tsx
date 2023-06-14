import React from 'react'

interface ButtonProps {
  onClick: () => void
  className?: string
  icon?: React.ElementType
  children: React.ReactNode
}

export const Button = ({ children, onClick, className, icon: Icon }: ButtonProps): React.ReactElement => (
  <button className={`rounded-lg py-2 px-4 font-medium text-white duration-500 ${className ?? ''}`} onClick={onClick}>
    <div className="flex items-center justify-center">
      {Icon !== undefined && <Icon className="w-4 h-4 mr-3"/>}
      {children}
    </div>
  </button>
)
