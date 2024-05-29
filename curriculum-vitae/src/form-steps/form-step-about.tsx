import { type FormEvent, useEffect, useState } from 'react'
import { LinksConfig } from '../components/links-config'
import { load, save } from '../storage'
import { type FormStepProps } from './form-step-wrapped'
import { Alert } from '../components/alert'

export function FormStepAbout ({ onSuccess }: FormStepProps): JSX.Element {
  const [about, setAbout] = useState('')
  const [linkList, setLinkList] = useState<string[]>([])

  useEffect(() => {
    const data = load({ select: ['about', 'links'] })
    if (data === null) return
    setAbout(data.about ?? '')
    setLinkList(data.links ?? [])
  }, [])

  const onSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
    if (save({
      about,
      links: linkList
    })) {
      onSuccess()
    }
  }

  // NOTE: This is the only step that doesn't have FormDelay, because the button is outside the
  //       form element.
  return (
    <div className="">
      <div className="grow">
        <form onSubmit={onSubmit} id="form">
          <div className="my-4">
            {about.trim().length === 0 && <Alert className="mb-8" variant="warn">Please tell us a bit more about yourself</Alert>}
            <div className="relative mb-4">
              <textarea value={about} onChange={(ev) => { setAbout(ev.target.value) }} id="about" className="h-32 block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-200 peer" placeholder=""/>
              <label htmlFor="about" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                About me
              </label>
            </div>
          </div>
        </form>

        <div className="my-8">
          <h2 className="font-bold">Links</h2>
          <p className="mb-10">Add your portfolio, LinkedIn profile, and other relevant links.</p>
          <LinksConfig list={linkList} onChange={setLinkList}/>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-0">
        <button type="submit" form="form" className='w-full md:w-auto p-4 rounded-md bg-green-700'>Save</button>
      </div>
    </div>
  )
}
