import { zodResolver } from '@hookform/resolvers/zod'
import { type FormEvent, type ForwardedRef, type MutableRefObject, forwardRef, useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { RiYoutubeLine, RiInstagramLine, RiFacebookBoxLine, RiGithubLine, RiLinkedinBoxLine, RiSoundcloudLine, RiGitlabLine } from 'react-icons/ri'
import { HiOutlineLink } from 'react-icons/hi'
import { type IconType } from 'react-icons'

const icons = Object.entries({
  'youtube.com': RiYoutubeLine,
  'instagram.com': RiInstagramLine,
  'facebook.com': RiFacebookBoxLine,
  'github.com': RiGithubLine,
  'linkedin.com': RiLinkedinBoxLine,
  'soundcloud.com': RiSoundcloudLine,
  'gitlab.com': RiGitlabLine
})

function urlToIcon (url: string): IconType {
  let host = ''
  try {
    host = (new URL(url.toLowerCase())).host
  } catch {
    return HiOutlineLink
  }
  for (const [end, icon] of icons) {
    if (host.endsWith(end)) {
      return icon
    }
  }

  return HiOutlineLink
}

interface EditLinkProps {
  url: string
  onSubmit: (data: { url: string }) => void
  onCancel?: () => void
  enableAutoFocus?: boolean
}

const schema = z.object({
  url: z.string().url('Enter a valid URL').min(3)
})

const EditLink = forwardRef<HTMLInputElement, EditLinkProps>(({ url, onSubmit, onCancel, enableAutoFocus = false }: EditLinkProps, ref2: ForwardedRef<HTMLInputElement>) => {
  const { control, register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: { url }
  })
  const urlValue = useWatch({
    name: 'url',
    control
  })

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const { ref, ...inputProps } = register('url')

  useEffect(() => {
    if (enableAutoFocus) {
      inputRef.current?.focus()
    }
  }, [url, enableAutoFocus])

  const onSubmitForm = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
    console.log('SUBMITING')
    handleSubmit(onSubmit)(ev).catch(console.error)
    if (isValid) {
      reset()
    }
  }

  const setRef = (e: HTMLInputElement | null): void => {
    ref(e)
    inputRef.current = e
    if (typeof ref2 === 'function') {
      ref2(e)
    } else if (ref2 !== null) {
      ref2.current = e
    }
  }

  return (
    <form onSubmit={onSubmitForm}>
      <input {...inputProps} ref={setRef}></input>
      <button type="submit" disabled={!isValid} className={isValid ? 'bg-green-500' : 'bg-gray-500'}>OK</button>
      {(errors.url != null && urlValue.trim().length > 0) && <span className="text-red-500">{errors.url?.message as string}</span>}

      {(onCancel != null) && <button onClick={onCancel}>x</button>}
    </form>
  )
})

EditLink.displayName = 'EditLink'

interface LinksConfigProps {
  list: string[]
  onChange: (list: string[]) => void
}

export function LinksConfig ({ list, onChange }: LinksConfigProps): JSX.Element {
  const [editing, setEditing] = useState(-1)

  const update = ({ url }: { url: string }): void => {
    setEditing(-1)
    onChange((() => {
      const result = [...list]
      result[editing] = url
      return result
    })())
  }

  const addUrl = ({ url }: { url: string }): void => {
    if (list.includes(url.trim())) return
    onChange([...list, url.trim()])
    inputRef.current?.focus()
  }

  const remove = (idx: number): void => {
    const res = [...list]
    res.splice(idx, 1)
    onChange(res)
  }

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  // TODO: Clicking on the main Submit button triggers the submit on the "link add form" xd
  //       Now it won't show (I hid the message if the URL input is empty), but make
  //       sure it's not getting triggered anyway

  return (
    <>
      {list.map((url, idx) => (
        <div key={idx}>
          {editing === idx
            ? (
              <EditLink enableAutoFocus={true} url={url} onSubmit={update} onCancel={() => { setEditing(-1) }}/>
              )
            : (
              <>
                <div className="flex items-center space-x-4">
                  {((): JSX.Element => {
                    const Icon = urlToIcon(url)
                    return <Icon className="size-4"/>
                  })()}
                  <div className="grow">
                    <a href={url} target="_blank" rel="noreferrer">
                      {url}
                    </a>
                  </div>
                  <div>
                    <button type="button" onClick={() => { setEditing(idx) }}>Edit</button>
                    <button type="button" onClick={() => { remove(idx) }}>Remove</button>
                  </div>
                </div>
              </>
              )}
        </div>
      ))}

      <EditLink ref={inputRef} url="" onSubmit={addUrl}/>
    </>
  )
}
