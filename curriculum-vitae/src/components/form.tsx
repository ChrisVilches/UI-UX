type OriginalFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface FormProps extends OriginalFormProps {
  isSubmitting: boolean
}

export function Form ({ children, isSubmitting, ...other }: FormProps): JSX.Element {
  return (
    <form {...other}>
      <div className={isSubmitting ? 'bg-gray-500 fixed inset-0 z-50 bg-opacity-10 transition-colors duration-200' : ''}></div>
      {children}
    </form>
  )
}
