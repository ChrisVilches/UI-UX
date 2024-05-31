import { useNavigate } from 'react-router-dom'
import { FormStepBasic } from './form-step-basic'
import { FormStepWorkHistory } from './form-step-work-history'
import { FormStepSkillsLanguages } from './form-step-skills-languages'
import { FormStepAbout } from './form-step-about'
import { type StoragePartial } from '../storage'
import { useResumeData } from '../hooks/use-resume-data'
import { Skeleton } from '../components/skeleton'
import { SlideIn } from '../components/slide-in'

export interface FormStepProps {
  onSuccess: () => void

  // TODO: Note, this type is used in contexts where storage isn't even used.
  //       Rename StoragePartial to ResumePartial or something like that.
  //       Only use the word "storage" in the storage module, which is the DAO.
  resumeData: StoragePartial
  saveResume: (data: unknown) => Promise<void>
}

function Step1 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data, isCachedData } = useResumeData()
  return (
    <SlideIn enable={isCachedData}>
      <h1 className="mb-2 font-bold text-2xl">Basic Information</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepBasic saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/work-history') }}/>
          )}
    </SlideIn>
  )
}

function Step2 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data, isCachedData } = useResumeData()
  return (
    <SlideIn enable={isCachedData}>
      <h1 className="mb-2 font-bold text-2xl">Work History</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepWorkHistory saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/skill-lang') }}/>
          )}
    </SlideIn>
  )
}

function Step3 (): JSX.Element {
  const navigate = useNavigate()
  const { isLoading, saveResume, data, isCachedData } = useResumeData()
  return (
    <SlideIn enable={isCachedData}>
      <h1 className="mb-2 font-bold text-2xl">Skills & Languages</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepSkillsLanguages saveResume={saveResume} resumeData={data} onSuccess={() => { navigate('/about') }}/>
          )}
    </SlideIn>
  )
}

function Step4 (): JSX.Element {
  const { isLoading, saveResume, data, isCachedData } = useResumeData()
  return (
    <SlideIn enable={isCachedData} >
      <h1 className="font-bold text-2xl">About Me</h1>
      {isLoading
        ? <Skeleton/>
        : (
          <FormStepAbout saveResume={saveResume} resumeData={data} onSuccess={() => { alert('End of demo!') }}/>

          )}
    </SlideIn>
  )
}

export const FormStepWrapped = {
  Step1,
  Step2,
  Step3,
  Step4
}
