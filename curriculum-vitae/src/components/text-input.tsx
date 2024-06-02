import { type ForwardedRef, forwardRef } from 'react'
import { TextError } from './text-error'

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string
  id: string
  label: string
}

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { errorMessage, id, label, ...other } = props

  return (
    <>
      <div className="relative w-full">
        <input id={id} ref={ref} type="text" {...other} className="input-primary peer" placeholder=""/>
        <label htmlFor={id} className="absolute text-sm placeholder-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
          {label}
        </label>
      </div>
      <TextError>{errorMessage}</TextError>
    </>
  )
})

TextInput.displayName = 'TextInput'
