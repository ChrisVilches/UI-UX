export const TextError = ({ children = '' }: { children?: string }): JSX.Element => {
  if (children.length === 0) return <></>

  return (
    <span className="text-sm text-red-400">{children}</span>
  )
}
