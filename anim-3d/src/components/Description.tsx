import React from 'react'

export const Description = (): React.ReactElement => (
  <div className="text-white">
    <h1 className="text-xl font-bold mb-5">
      A small Three.js example!
    </h1>

    <p className="mb-2">
      Just a very small app made with Three.js, React, TailwindCSS and Vite.
    </p>

    <p className="text-sm">
      Made by
      {' '}
      <a className="text-green-300 hover:text-green-600 duration-500" href="https://www.github.com/ChrisVilches" target="_blank" rel="noreferrer">
        Chris Vilches
      </a>
    </p>
  </div>
)
