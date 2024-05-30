import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { cloneElement, useEffect, useState } from 'react'
import { type IconType } from 'react-icons'
import { BsPersonFill } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { IoMdMenu } from 'react-icons/io'
import { MdWork } from 'react-icons/md'
import { SiHyperskill } from 'react-icons/si'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import { z } from 'zod'

// TODO: The only other item I'd like to add is education.
//       Maybe I can put everything in the timeline, mix work experience, education, certifications, etc.
//       Then I can show a filter to show only education or only work experience (this would be more useful
//       for employers rather than for users building the CV.
//       Then do some kind of "timeline"-y design thingy, like Facebook maybe? lol
//       A timeline would look insane. Specially if it's well designed.

function App (): JSX.Element {
  const { pathname, state, key } = useLocation()
  const stepName = pathname.substring(1)
  const element = useOutlet()

  const parseRes = z.object({ forward: z.boolean() }).safeParse(state)
  let direction = [0, 0]
  if (parseRes.success) {
    direction = parseRes.data.forward ? [200, -100] : [-100, 200]
  }

  const transitionConfig = {
    initial: 'initialState',
    animate: 'animateState',
    exit: 'exitState',
    transition: { type: 'tween', duration: 0.2 },
    variants: {
      initialState: (x: [number, number]) => ({ opacity: 0, x: x[0] }),
      animateState: { opacity: 1, x: 0 },
      exitState: (x: [number, number]) => ({ opacity: 0, x: x[1] })
    },
    custom: direction
  }

  const MenuItem = ({ Icon, active }: { Icon: IconType, active: boolean }): JSX.Element => {
    return (
      <span className={`${active ? 'bg-green-300 ring-green-700 text-green-700' : 'bg-gray-300'} transition-colors duration-4 absolute flex items-center justify-center size-8 rounded-full -start-4 ring-4`}>
        <Icon/>
      </span>
    )
  }

  const Menu = (): JSX.Element => (
    <ol className="relative text-gray-500 border-s border-gray-200">
      <li className="mb-10 ms-8">
        <Link to="/basic" className="flex items-center">
          <MenuItem Icon={BsPersonFill} active={stepName === 'basic'}/>
          <h3 className="font-medium leading-tight">Basic Information</h3>
        </Link>
      </li>
      <li className="mb-10 ms-8">
        <Link to="/work-history" className="flex items-center">
          <MenuItem Icon={MdWork} active={stepName === 'work-history'}/>
          <h3 className="font-medium leading-tight">Work History</h3>
        </Link>
      </li>
      <li className="mb-10 ms-8">
        <Link to="/skill-lang" className="flex items-center">
          <MenuItem Icon={SiHyperskill} active={stepName === 'skill-lang'}/>
          <h3 className="font-medium leading-tight">Skills</h3>
        </Link>
      </li>
      <li className="ms-8">
        <Link to="/about" className="flex items-center">
          <MenuItem Icon={GrTextAlignFull} active={stepName === 'about'}/>
          <h3 className="font-medium leading-tight">About</h3>
        </Link>
      </li>
    </ol>
  )

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
                    <Menu/>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden sm:block sticky sm:top-10 col-span-1 sm:col-span-3 sm:h-height">
          <Menu/>
        </div>
        {/*
        TODO: I used these classes to try to hide the scrollbar but I still get some glitches:
        w-full h-screens overflow-hidden relative
        (these go on the parent container)
        */}
        <div className="col-span-11 sm:col-span-9">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div key={key} {...transitionConfig}>
              {element != null && cloneElement(element, { key })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default App
