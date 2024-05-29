import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { type ReactNode } from 'react'

// TODO: Challenge (for the entire app): get away from the "slate" colors and use my own custom ones.
//       This is the new shit.

interface ModalProps {
  show: boolean
  onCloseModal: () => void
  children: ReactNode
  title: string
}

export default function Modal ({ show, onCloseModal, children, title }: ModalProps): JSX.Element {
  return (
    <Transition appear show={show}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onCloseModal}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true"/>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-slate-700/95 p-6">
                <DialogTitle as="h1" className="font-bold mb-8">
                  {title}
                </DialogTitle>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
