import { useNavigate } from 'react-router-dom'
import { FormStepBasic } from './form-step-basic'
import { FormStepWorkHistory } from './form-step-work-history'
import { FormStepSkillsLanguages } from './form-step-skills-languages'
import { FormStepAbout } from './form-step-about'
import { type StoragePartial } from '../storage'
import { useResumeData } from '../hooks/use-resume-data'

export interface FormStepProps {
  onSuccess: () => void

  // TODO: Note, this type is used in contexts where storage isn't even used.
  //       Rename StoragePartial to ResumePartial or something like that.
  //       Only use the word "storage" in the storage module, which is the DAO.
  resumeData: StoragePartial
  saveResume: (data: unknown) => Promise<void>
}

function Skeleton (): JSX.Element {
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

function Step1 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data } = useResumeData()
  return (
    <>
      <h1 className="mb-2 font-bold text-2xl">Basic Information</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepBasic saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/work-history', { state: { forward: true } }) }}/>
          )}
    </>
  )
}

function Step2 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data } = useResumeData()
  return (
    <>
      <h1 className="mb-2 font-bold text-2xl">Work History</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepWorkHistory saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/skill-lang', { state: { forward: true } }) }}/>
          )}
    </>
  )
}

function Step3 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data } = useResumeData()
  return (
    <>
      <h1 className="mb-2 font-bold text-2xl">Skills & Languages</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepSkillsLanguages saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/about', { state: { forward: true } }) }}/>
          )}
    </>
  )
}

function Step4 (): JSX.Element {
  const { isLoading, saveResume, data } = useResumeData()
  return (
    <>
      <h1 className="font-bold text-2xl">About Me</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepAbout saveResume={saveResume} resumeData={data} onSuccess={() => { alert('End of demo!') }}/>

          )}
    </>
  )
}

export const FormStepWrapped = {
  Step1,
  Step2,
  Step3,
  Step4
}
