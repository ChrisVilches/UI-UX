import { zodResolver } from "@hookform/resolvers/zod"
import { FormEvent, ForwardedRef, MutableRefObject, forwardRef, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RiYoutubeLine, RiInstagramLine, RiFacebookBoxLine, RiGithubLine, RiLinkedinBoxLine, RiSoundcloudLine, RiGitlabLine } from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi";

const icons = Object.entries({
  'youtube.com': RiYoutubeLine,
  'instagram.com': RiInstagramLine,
  'facebook.com': RiFacebookBoxLine,
  'github.com': RiGithubLine,
  'linkedin.com': RiLinkedinBoxLine,
  'soundcloud.com': RiSoundcloudLine,
  'gitlab.com': RiGitlabLine
})

function urlToIcon(url: string) {
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
}

const schema = z.object({
  url: z.string().url('Enter a valid URL').min(3)
})

const EditLink = forwardRef<HTMLInputElement, EditLinkProps>(({ url, onSubmit, onCancel }: EditLinkProps, ref2: ForwardedRef<HTMLInputElement>) => {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: { url }
  })

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const { ref, ...inputProps } = register('url')
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [url])

  const onSubmitForm = (ev: FormEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    console.log('SUBMITING')
    handleSubmit(onSubmit)(ev)
    if (isValid) {
      reset()
    }
  }

  const setRef = (e: HTMLInputElement | null) => {
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
      <button type="submit">OK</button>
      {errors.url && <span className="text-red-500">{errors.url?.message as string}</span>}
      
      {onCancel && <button onClick={onCancel}>x</button>}
    </form>
  )
})

// TODO: Linter should tell me about adding this line. Configure linter first.
// EditLink.displayName = 'EditLink'

export function LinksConfig() {
  const [links, setLinks] = useState([
    'https://www.google.com',
    'https://www.amazon.com',
    'https://www.youtube.com'
  ])

  const [editing, setEditing] = useState(-1)

  const update = ({ url }: { url: string }) => {
    setEditing(-1)
    setLinks(l => {
      const result = [...l]
      result[editing] = url
      return result
    })
  }

  const addUrl = ({ url }: { url: string }) => {
    if (links.indexOf(url.trim()) !== -1) return
    setLinks(l => [...l, url.trim()])
    inputRef.current?.focus()
  }

  const remove = (idx: number) => {
    setLinks(l => {
      const res = [...l]
      res.splice(idx, 1)
      return res
    })
  }

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  // TODO: Note, linting will tell me not to use onClick on a div, but this one is OK
  //       since I have a button that can be clicked using the keyboard. Ignore the lint rule
  //       for this code.
  return (
    <>
      {links.map((url, idx) => (
        <div key={idx}>
          {editing === idx ? (
            <EditLink url={url} onSubmit={update} onCancel={() => { setEditing(-1) }}/>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                {(() => {
                  const Icon = urlToIcon(url)
                  return <Icon className="size-4"/>
                })()}
                <div className="grow" onClick={() => { setEditing(idx) }}>
                  {url}
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
