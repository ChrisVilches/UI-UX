import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { Menu } from './components/menu'
import { Outlet, useLocation } from 'react-router-dom'

// TODO: The only other item I'd like to add is education.
//       Maybe I can put everything in the timeline, mix work experience, education, certifications, etc.
//       Then I can show a filter to show only education or only work experience (this would be more useful
//       for employers rather than for users building the CV.
//       Then do some kind of "timeline"-y design thingy, like Facebook maybe? lol
//       A timeline would look insane. Specially if it's well designed.

function App (): JSX.Element {
  const { pathname, key } = useLocation()
  const currentStepName = pathname.substring(1)

  // NOTE: Both Tailwind and Headless UI have in their websites a sidebar implemented
  //       as a vanilla sidebar visible on desktop, and then hidden on mobile, and a
  //       button + dialog (Headless UI component) visible on mobile. The easy way.
  const [menuOpen, setMenuOpen] = useState(false)

  // NOTE: It seems on Tailwind website they close it by simply adding a closeMenu function
  //       to the onClick of every link (i.e. they close it manually).
  useEffect(() => {
    setMenuOpen(false)
  }, [key])

  return (
    <>
      <div className="block sm:grid sm:grid-cols-12 container h-screen mx-auto px-4 w-full sm:w-10/12 md:w-8/12 pt-10">
        <div className="sm:hidden sticky top-0 flex justify-end backdrop-blur bg-opacity-20 py-2">
          <button onClick={() => { setMenuOpen(true) }}><IoMdMenu/></button>
        </div>
        <Transition appear show={menuOpen}>
          <Dialog onClose={() => { setMenuOpen(false) }} className="relative z-50 block sm:hidden">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="transition ease-in-out duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="fixed overflow-y-auto inset-0 h-screen w-80 max-w-[calc(100%-3rem)] bg-slate-900 p-12 backdrop-blur-sm bg-opacity-85">
                    <Menu currentStepName={currentStepName}/>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden sm:block sticky sm:top-10 col-span-1 sm:col-span-3 sm:h-height">
          <Menu currentStepName={currentStepName}/>
        </div>
        {/*
        TODO: I used these classes to try to hide the scrollbar but I still get some glitches:
        w-full h-screens overflow-hidden relative
        (these go on the parent container)
        */}

        <div className="col-span-11 sm:col-span-9">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default App
