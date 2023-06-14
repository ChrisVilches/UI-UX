export function Header (): JSX.Element {
  return (
    <header>
      <h1 className="dark:text-white text-2xl font-bold mb-4">Hexagonal Grid Demo</h1>
      <p className="dark:text-gray-300 mb-2">Responsive Hexagonal Grid Design</p>
      <p className="dark:text-gray-300">
        Made by
        {' '}
        <a className="text-red-700 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500 font-bold" href="https://github.com/ChrisVilches" target="_blank" rel="noreferrer">
          Chris Vilches
        </a>
      </p>
    </header>
  )
}
