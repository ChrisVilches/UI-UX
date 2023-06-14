import React from 'react'

const SIGNAL_VIDEO_URL = 'https://www.youtube.com/watch?v=VQtonf1fv_s'

export function Footer (): React.ReactElement {
  return (
    <footer className="flex flex-col text-sm h-full">
      <div className="mb-4 text-center">A React demo app to demonstrate the <a className="text-link" href="https://github.com/preactjs/signals" target="_blank" rel="noreferrer">signals</a> feature.</div>
      <div className="mb-4 grow text-center">👾 Listen to <a className="text-link" href={SIGNAL_VIDEO_URL} target="_blank" rel="noreferrer">our song</a>!</div>
      <div className="text-center">
        Made by
        {' '}
        <a className="text-link" href="https://www.github.com/ChrisVilches" target="_blank" rel="noreferrer">
          Chris Vilches
        </a>
      </div>
    </footer>
  )
}
