import { type FormEvent, useState } from 'react'
import { LinksConfig } from '../components/links-config'
import { type FormStepProps } from './form-step-wrapped'
import { Alert } from '../components/alert'
import { Form } from '../components/form'
import { FormStepSubmitButton } from '../components/form-step-submit-button'
import { TextInputLabel } from '../components/text-input'

export function FormStepAbout ({ saveResume, resumeData, onSuccess }: FormStepProps): JSX.Element {
  const [about, setAbout] = useState(resumeData.about ?? '')
  const [linkList, setLinkList] = useState<string[]>(resumeData.links ?? [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()

    const fn = async (): Promise<void> => {
      setIsSubmitting(true)
      await saveResume({ about, links: linkList })
      onSuccess()
      setIsSubmitting(false)
    }
    fn().catch(console.error)
  }

  // NOTE: This is the only step that doesn't have Form, because the button is outside the
  //       form element. And the demo stops here, so I don't need to do any fancy delay logic with overlay while submitting.
  return (
    <div className="">
      <div className="grow">
        <Form onSubmit={onSubmit} id="form" isSubmitting={isSubmitting}>
          <div className="my-4">
            {about.trim().length === 0 && <Alert className="mb-8" variant="warn">Please tell us a bit more about yourself</Alert>}
            <div className="relative mb-4">
              <textarea value={about} onChange={(ev) => { setAbout(ev.target.value) }} id="about" className="h-32 input peer" placeholder=""/>
              <TextInputLabel htmlFor="about">About me</TextInputLabel>
            </div>
          </div>
        </Form>

        <div className="my-8">
          <h2 className="font-bold">Links</h2>
          <p className="mb-10">Add your portfolio, LinkedIn profile, and other relevant links.</p>
          <LinksConfig list={linkList} onChange={setLinkList}/>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-0 sm:relative sm:py-4">
        <FormStepSubmitButton isSubmitting={isSubmitting} form="form"/>
      </div>
    </div>
  )
}
