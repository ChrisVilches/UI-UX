import React from 'react'
import { type Member } from '../models/member'

interface MemberBioItemProps {
  member: Member
  selected: boolean
}

const SECONDS_IN_YEAR = 31_536_000

function formatBirthdayAge (date: Date): number {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  return Math.ceil(diff / (SECONDS_IN_YEAR * 1000))
}

function formatParagraphs (text: string): React.ReactElement[] {
  return text.split('\n').map(s => s.trim()).filter(s => s.length > 0).map((s, i) => (
    <p className="mb-4" key={i}>{s}</p>
  ))
}

export function MemberBioItem ({ member, selected }: MemberBioItemProps): React.ReactElement {
  return (
    <section className={`p-6 mb-4 duration-100 transition-all ${selected ? '' : 'fade-transparent h-40 overflow-clip'}`}>
      <div className="font-bold text-yellow-600">{member.name}</div>
      <div className="font-light text-yellow-600 mb-4">{formatBirthdayAge(member.birthday)} years old</div>

      {formatParagraphs(member.bio)}
    </section>
  )
}
