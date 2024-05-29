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

// TODO: Maybe try adding https:// to URLs by default, so that users can type "www.youtube.com"
// TODO: It seems zod accepts almost any string as URL. You have to really
//       write a fucked up string so it sees it as invalid.
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
  
  // TODO: Clicking on "remove" on one link, enables edition on another link.

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

  // TODO: Blurring out of the input and into the button would be a normal user behaviour
  //       but this would cancel the edition lol.

  return (
    <form onSubmit={onSubmitForm}>
      <input {...inputProps} ref={setRef} onBlur={() => {z}}></input>
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

  // TODO: (Audit accessibility). There's no problem with using onClick on a div as long as a button
  //       also exists (which can be accessed with the keyboard).
  return (
    <>
      {links.map((url, idx) => (
        <div key={idx}>
          {editing === idx ? (
            <EditLink url={url} onSubmit={update} onCancel={() => { setEditing(-1) }}/>
          ) : (
            <>
              <div onClick={() => { setEditing(idx) }} className="flex items-center space-x-4">
                {(() => {
                  const Icon = urlToIcon(url)
                  return <Icon className="size-4"/>
                })()}
                <div className="grow">
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
