import { zodResolver } from '@hookform/resolvers/zod'
import { type FormEvent, type ForwardedRef, type MutableRefObject, forwardRef, useEffect, useRef, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RiYoutubeLine, RiInstagramLine, RiFacebookBoxLine, RiGithubLine, RiLinkedinBoxLine, RiSoundcloudLine, RiGitlabLine } from 'react-icons/ri'
import { HiOutlineLink } from 'react-icons/hi'
import { type IconType } from 'react-icons'
import { TextInput } from './text-input'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineModeEdit } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { useEscape } from '../hooks/use-escape'

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
  variant: 'new' | 'edit'
}

const schema = z.object({
  url: z.string().url('Enter a valid URL').min(3)
})

const EditLink = forwardRef<HTMLInputElement, EditLinkProps>(({ url, onSubmit, onCancel, variant }: EditLinkProps, ref2: ForwardedRef<HTMLInputElement>) => {
  const { register, handleSubmit, reset, formState: { isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: { url }
  })

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const { ref, ...inputProps } = register('url')

  useEffect(() => {
    if (variant === 'edit') {
      inputRef.current?.focus()
    }
  }, [variant])

  const cbEsc = useCallback(() => {
    reset()
    if (onCancel != null) {
      onCancel()
    }
  }, [onCancel, reset])

  useEscape(cbEsc)

  const onSubmitForm = (ev: FormEvent): void => {
    ev.preventDefault()
    ev.stopPropagation()
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
      <div className="flex space-x-2">
        <TextInput id="url" className="grow" label="URL" ref={setRef} {...inputProps}></TextInput>
        <button type="submit" disabled={!isValid} className={`p-2 rounded-md ${isValid ? 'bg-green-700' : 'bg-gray-300 text-gray-500'}`}>
          {variant === 'new' ? <IoIosAdd/> : <MdOutlineModeEdit/>}
        </button>
      </div>
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
    setEditing(-1)
  }

  const remove = (idx: number): void => {
    const res = [...list]
    res.splice(idx, 1)
    onChange(res)
  }

  useEffect(() => {
    const input = inputRef.current
    if (input == null) return

    const handleFocus = (): void => {
      setEditing(-1)
    }
    input.addEventListener('focus', handleFocus)
    return () => {
      input.removeEventListener('focus', handleFocus)
    }
  }, [])

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  return (
    <>
      {list.map((url, idx) => (
        <div key={idx} className="mb-2">
          {editing === idx
            ? (
              <EditLink variant="edit" url={url} onSubmit={update} onCancel={() => { setEditing(-1) }}/>
              )
            : (
              <>
                <div className="flex items-center space-x-4">
                  {((): JSX.Element => {
                    const Icon = urlToIcon(url)
                    return <Icon className="size-6 shrink-0"/>
                  })()}
                  <div className="grow text-ellipsis overflow-hidden whitespace-nowrap">
                    <a href={url} target="_blank" rel="noreferrer">
                      {url}
                    </a>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="mr-2 text-slate-400 p-1 hover:text-slate-300 duration-500" onClick={() => { setEditing(idx) }}>
                      <MdOutlineModeEdit/>
                    </button>
                    <button type="button" className="text-slate-400 p-1 hover:text-red-400 rounded-md duration-500" onClick={() => { remove(idx) }}>
                      <IoTrashOutline/>
                    </button>
                  </div>
                </div>
              </>
              )}
        </div>
      ))}

      <div className="mt-10">
        <EditLink ref={inputRef} url="" onSubmit={addUrl} variant="new"/>
      </div>
    </>
  )
}
