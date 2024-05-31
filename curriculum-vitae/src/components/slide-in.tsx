import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function SlideIn ({ children, enable }: { enable: boolean, children: ReactNode }): JSX.Element {
  if (enable) {
    return (
      <AnimatePresence>
        <motion.div
          transition={{ type: 'tween', duration: 0.7 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  return <>{children}</>

  // return (
  //   <AnimatePresence mode="popLayout" custom={enable}>
  //     <motion.div {...transitionConfig} key={k}>
  //       {k}
  //       {/* {cloneElement(<>{children}</>, { key: k })} */}
  //       {children}
  //     </motion.div>
  //   </AnimatePresence>
  // )
}
