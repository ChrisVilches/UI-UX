import { type ReactNode } from 'react'
import Modal from './modal'

interface ConfirmProps {
  show: boolean
  title?: string
  children: ReactNode
  onConfirm: () => void
  onClose: () => void
  buttonLabel: string
  variant: 'danger'
}

const DEFAULT_TITLE = 'Please confirm'

export function Confirm ({ buttonLabel, show, children, onConfirm, onClose, title = DEFAULT_TITLE }: ConfirmProps): JSX.Element {
  return (
    <Modal show={show} onCloseModal={onClose} title={title}>
      {children}

      <div className="flex space-x-4 mt-10">
        <button className="grow md:grow-0 bg-red-700 hover:bg-red-600 duration-500 p-4 rounded-md" onClick={() => {
          onConfirm()
          onClose()
        }}>{buttonLabel}</button>
        <button onClick={onClose} className="grow md:grow-0">Cancel</button>
      </div>
    </Modal>
  )
}
