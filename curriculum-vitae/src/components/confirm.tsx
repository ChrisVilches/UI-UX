import { type ReactNode } from 'react'
import Modal from './modal'
import { DangerButton } from './buttons'

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
        <div className="grow md:grow-0">
          <DangerButton onClick={() => {
            onConfirm()
            onClose()
          }}>
            {buttonLabel}
          </DangerButton>
        </div>
        <button onClick={onClose} className="grow md:grow-0 p-4">Cancel</button>
      </div>
    </Modal>
  )
}
