export function Skeleton (): JSX.Element {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm w-48 mb-4"></div>
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm max-w-[360px] mb-2.5"></div>
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm mb-2.5"></div>
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm max-w-[330px] mb-2.5"></div>
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm max-w-[300px] mb-4"></div>
      <div className="h-6 bg-gray-500 bg-opacity-20 rounded-sm max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
