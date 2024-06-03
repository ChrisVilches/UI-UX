type OriginalFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface FormProps extends OriginalFormProps {
  isSubmitting: boolean
}

// TODO: I had to remove the overlay because:
//       1. The framer transition made an unwanted horizontal scrollbar appear.
//       2. In order to disable the scrollbar and keep the sticky elements, the only
//          way was to use contain-paint (overflow-x-hidden disabled the sticky elements)
//       3. But the contain-paint class made the overlay be contained in a smaller div
//          instead of the whole screen.
//       There aren't many other options, so I just disabled the overlay.
//       Consider removing this comment
// UPDATE: I turned the overlay into a transparent overlay (I don't mind if it
//         only covers a smaller section, because at least it doesn't look bad.
//         The purpose of this new overlay is to disable the buttons in the form.
//         Mind that other things outside the overlay (e.g. the menu) can still be clicked.
// UPDATE: I now show it on desktop but not on mobile, this is because I only use
//         contain-paint on mobile.
// So this TODO can be safely removed I guess, since there's no problem anymore.

export function Form ({ children, isSubmitting, ...other }: FormProps): JSX.Element {
  return (
    <form {...other}>
      <div className={isSubmitting ? 'bg-none sm:bg-gray-300 sm:duration-200 sm:bg-opacity-10 fixed inset-0 z-50' : ''}></div>
      {children}
    </form>
  )
}
