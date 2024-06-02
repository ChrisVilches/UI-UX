import { type ForwardedRef, forwardRef } from 'react'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const SecondaryButton = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { type = 'button', ...other } = props

  return (
    <button
      ref={ref}
      type={type}
      {...other}
      className="w-full md:w-auto flex items-center space-x-2 p-4 border-[1px] border-slate-400 rounded-md bg-slate-950 hover:bg-blue-950 disabled:bg-slate-800 disabled:border-slate-900 hover:border-blue-800 duration-500"
    />
  )
})

SecondaryButton.displayName = 'SecondaryButton'
