import { IoTrashOutline } from 'react-icons/io5'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function TrashIconButton (props: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="text-slate-400 p-1 hover:text-red-400 rounded-md duration-500"
      {...props}
    >
      <IoTrashOutline/>
    </button>
  )
}
