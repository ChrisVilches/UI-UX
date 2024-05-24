type NonStickySectionProps = { variant: 'red' | 'yellow' }

export function NonStickySection({ variant }: NonStickySectionProps) {
  const text = 'Non-sticky section'
  
  const color = variant === 'red' ? 'bg-red-800' : 'bg-yellow-800'

  return <div className={`${color} my-10 p-20`}>{text}</div>
}
