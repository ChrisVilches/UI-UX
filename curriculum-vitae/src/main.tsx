import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { FormStepWrapped } from './form-steps/form-step-wrapped.tsx'
import { name } from '../package.json'

// NOTE: App must be deployed in /<package-name>
const prodOpts = { basename: `/${name}` }

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { path: '/basic', Component: FormStepWrapped.Step1 },
      { path: '/work-history', Component: FormStepWrapped.Step2 },
      { path: '/skill-lang', Component: FormStepWrapped.Step3 },
      { path: '/about', Component: FormStepWrapped.Step4 },
      { path: '', element: <Navigate to="/basic"/> }
    ]
  }
], import.meta.env.PROD ? prodOpts : {})

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
