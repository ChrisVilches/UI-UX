import { useNavigate } from 'react-router-dom'
import { FormStepBasic } from './form-step-basic'
import { FormStepWorkHistory } from './form-step-work-history'
import { FormStepSkillsLanguages } from './form-step-skills-languages'
import { FormStepAbout } from './form-step-about'

function Step1 (): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="">
      <h1 className="mb-2 font-bold text-2xl">Basic Information</h1>
      <FormStepBasic onSuccess={() => { navigate('/work-history', { state: { forward: true } }) }}/>
    </div>
  )
}

function Step2 (): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="">
      <h1 className="mb-2 font-bold text-2xl">Work History</h1>
      <FormStepWorkHistory onSuccess={() => { navigate('/skill-lang', { state: { forward: true } }) }}/>
    </div>
  )
}

function Step3 (): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="">
      <h1 className="mb-2 font-bold text-2xl">Skills & Languages</h1>
      <FormStepSkillsLanguages onSuccess={() => { navigate('/about', { state: { forward: true } }) }}/>
    </div>
  )
}

function Step4 (): JSX.Element {
  return (
    <div className="">
      <h1 className="font-bold text-2xl">About Me</h1>
      <FormStepAbout onSuccess={() => { alert('End of demo!') }}/>
    </div>
  )
}

export const FormStepWrapped = {
  Step1,
  Step2,
  Step3,
  Step4
}
