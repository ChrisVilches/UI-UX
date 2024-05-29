// TODO: One good way to avoid the problem of nested forms is to have
//       the resume builder divided in several steps, and each of them is a form.

import { useState } from 'react'
import { FormStepAbout } from './form-steps/form-step-about'
import { FormStepBasic } from './form-steps/form-step-basic'
import { FormStepSkillsLanguages } from './form-steps/form-step-skills-languages'
import { FormStepWorkHistory } from './form-steps/form-step-work-history'

// TODO: The only other item I'd like to add is education.
//       Maybe I can put everything in the timeline, mix work experience, education, certifications, etc.
//       Then I can show a filter to show only education or only work experience (this would be more useful
//       for employers rather than for users building the CV.
//       Then do some kind of "timeline"-y design thingy, like Facebook maybe? lol
//       A timeline would look insane. Specially if it's well designed.

function App (): JSX.Element {
  const [step, setStep] = useState(0)

  const setNextStep = (): void => { setStep(s => s + 1) }

  return (
    <div className="container mx-auto lg:w-8/12 px-4">
      {step === 0 && (
        <div className="mb-16">
          <h1 className="mb-2 font-bold text-2xl">Basic Information</h1>
          <FormStepBasic onSuccess={setNextStep}/>
        </div>
      )}

      {step === 1 && (
        <div className="mb-16">
          <h1 className="mb-2 font-bold text-2xl">Work History</h1>
          <FormStepWorkHistory onSuccess={setNextStep}/>
        </div>
      )}

      {step === 2 && (
        <div className="mb-16">
          <h1 className="mb-2 font-bold text-2xl">Skills & Languages</h1>
          <FormStepSkillsLanguages onSuccess={setNextStep}/>
        </div>
      )}

      {step === 3 && (
        <div className="mb-16">
          <h1 className="mb-2 font-bold text-2xl">About Me</h1>
          <FormStepAbout onSuccess={() => { alert('Finish!!') }}/>
        </div>
      )}
    </div>
  )
}

export default App
