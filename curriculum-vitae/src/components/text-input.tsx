import { type ForwardedRef, forwardRef } from 'react'

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string
  id: string
  label: string
}

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { errorMessage, id, label, ...other } = props

  return (
    <>
      <div className="relative">
        <input id={id} ref={ref} type="text" {...other} className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
        <label htmlFor={id} className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
          {label}
        </label>
      </div>
      <span>
        {Boolean(errorMessage?.length) && <span className="text-red-500">{errorMessage}</span>}
      </span>
    </>
  )
})

TextInput.displayName = 'TextInput'
