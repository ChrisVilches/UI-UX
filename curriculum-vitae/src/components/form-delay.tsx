import { type ReactNode, useState, type FormEvent } from 'react'

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface FormDelayProps extends Omit<FormProps, 'children'> {
  delayMs?: number
  children: (isSubmitting: boolean) => ReactNode
  immediate?: boolean
}

const DEFAULT_DELAY = 1000

// NOTE: This is just a simple way to show a loading process. Don't use this for real backend requests.
export function FormDelay (props: FormDelayProps): JSX.Element {
  const { immediate = false, children, onSubmit, delayMs = DEFAULT_DELAY, ...other } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandle = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault()
    ev.stopPropagation()
    if (immediate) {
      if (typeof onSubmit === 'function') {
        onSubmit(ev)
      }
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      if (typeof onSubmit === 'function') {
        onSubmit(ev)
      }
    }, delayMs)
  }

  return (
    <form {...other} onSubmit={submitHandle}>
      <div className={isSubmitting ? 'bg-gray-500 fixed inset-0 z-50 bg-opacity-10 transition-colors duration-200' : ''}></div>
      {children(isSubmitting)}
    </form>
  )
}
