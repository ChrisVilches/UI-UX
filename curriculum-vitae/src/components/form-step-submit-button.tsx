import { CgSpinnerAlt } from 'react-icons/cg'
import { GrFormNext } from 'react-icons/gr'
import { PrimaryButton } from './buttons'

interface FormStepSubmitButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isSubmitting: boolean
}

export const FormStepSubmitButton = ({ isSubmitting, ...other }: FormStepSubmitButtonProps): JSX.Element => {
  return (
    <PrimaryButton
      {...other}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? <CgSpinnerAlt className="animate-spin text-green-400"/> : <><span>Save</span><GrFormNext className="text-green-400"/></>}
    </PrimaryButton>

  )
}
