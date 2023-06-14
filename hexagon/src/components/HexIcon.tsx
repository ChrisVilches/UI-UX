
interface HexIconProps {
  icon: React.ElementType
}

export function HexIcon ({ icon: Icon }: HexIconProps): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Icon className="group-hover:text-red-600 w-8 h-8 text-gray-100 dark:text-gray-700 transition-colors duration-500"/>
    </div>
  )
}
