import { type ForwardedRef, forwardRef } from 'react'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const PrimaryButton = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { type = 'button', ...other } = props

  return (
    <button
      ref={ref}
      type={type}
      {...other}
      className="w-full md:w-auto p-4 rounded-md bg-green-800 disabled:bg-green-600 hover:bg-green-700 border-[1px] border-green-400 hover:border-green-200 select-none duration-500 flex items-center space-x-2 justify-center h-16"
    />
  )
})

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

export const DangerButton = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { type = 'button', ...other } = props

  return (
    <button
      ref={ref}
      type={type}
      {...other}
      className="w-full md:w-auto space-x-2 p-4 border-[1px] border-red-500 rounded-md bg-red-800 hover:bg-red-700 hover:border-red-500 duration-500"
    />
  )
})

PrimaryButton.displayName = 'PrimaryButton'
SecondaryButton.displayName = 'SecondaryButton'
DangerButton.displayName = 'DangerButton'
