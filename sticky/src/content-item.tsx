type ContentItemProps = { paragraphs: number }

// TODO: Turn these little top-56 into variables, such that modifying one value, changes
//       the entire layout but keeps it looking great.
// TODO: The top-56 should be passed from props. Since Tailwind cannot read concatenated
//       class names, just pass the value and use inline styling, or pass a class name (non-tailwind).

export function ContentItem({ paragraphs }: ContentItemProps) {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  return (
    <div className="">
      <div className="sticky top-56 bg-cyan-800 p-6">
        Card title ({paragraphs} paragraphs)
      </div>
      <div className="">
        {Array(paragraphs).fill(null).map((_, idx) => (
          <p key={idx} className="my-4">{text}</p>
        ))}
      </div>
    </div>
  )
}
