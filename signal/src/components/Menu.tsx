import React from 'react'
import { type Member } from '../models/member'
import { selectedMember } from '../signals/selected-member'
import { MenuMemberItem } from './MenuMemberItem'

interface MenuProps {
  members: Member[]
}

export const Menu = ({ members }: MenuProps): React.ReactElement => (
  <>
    {members.map((member: Member) => (
      <MenuMemberItem key={member.id} member={member} selected={selectedMember.value === member.id}/>
    ))}
  </>
)
