import React from 'react'
import { type Member } from '../models/member'
import { selectedMember } from '../signals/selected-member'

interface MenuMemberItemProps {
  member: Member
  selected: boolean
}

export function MenuMemberItem ({ member, selected }: MenuMemberItemProps): React.ReactElement {
  return (
    <button
      onClick={() => { selectedMember.value = member.id }}
      className={`text-gray-800 py-2 mb-2 rounded-md block w-full transition-all duration-150 hover:bg-yellow-400 ${selected ? 'bg-yellow-300 font-bold' : ''}`}>
      {member.name}
    </button>
  )
}
