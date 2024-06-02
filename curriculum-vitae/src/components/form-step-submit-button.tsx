import { CgSpinnerAlt } from 'react-icons/cg'
import { GrFormNext } from 'react-icons/gr'

interface FormStepSubmitButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isSubmitting: boolean
}

export const FormStepSubmitButton = ({ isSubmitting, ...other }: FormStepSubmitButtonProps): JSX.Element => {
  return (
    <button
      {...other}
      disabled={isSubmitting}
      type="submit"
      className='w-full md:w-auto p-4 rounded-md bg-green-800 disabled:bg-green-600 hover:bg-green-700 border-[1px] border-green-400 hover:border-green-200 select-none duration-500 flex items-center space-x-2 justify-center h-16'
    >
      {isSubmitting ? <CgSpinnerAlt className="animate-spin text-green-400"/> : <><span>Save</span><GrFormNext className="text-green-400"/></>}
    </button>

  )
}
