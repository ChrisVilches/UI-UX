import { effect } from '@preact/signals-react'
import { type Member } from '../models/member'
import { selectedMember } from '../signals/selected-member'
import { MemberBioItem } from './MemberBioItem'
import React, { type MutableRefObject, type RefObject, createRef, useRef } from 'react'

interface MemberBiosProps {
  members: Member[]
}

export const MemberBios = ({ members }: MemberBiosProps): React.ReactElement => {
  const items: MutableRefObject<Record<number, RefObject<HTMLDivElement>>> = useRef({})
  const prevScroll = useRef(-1)

  members.forEach(member => {
    items.current[member.id] ||= createRef()
  })

  effect(() => {
    if (selectedMember.value === null) return
    if (prevScroll.current === selectedMember.value) return

    console.log('Scrolling')
    const element: HTMLDivElement | null = items.current[selectedMember.value].current as HTMLDivElement

    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' })
    })

    prevScroll.current = selectedMember.value
  })()

  return (
    <>
      {members.map((member: Member) => (
        <div ref={items.current[member.id]} key={member.id}>
          <MemberBioItem selected={selectedMember.value === member.id} member={member}/>
        </div>
      ))}
    </>
  )
}
