import { type Member } from '../models/member'
import rawData from './members-data.json'

const memberList: Member[] = []

rawData.forEach((value, idx) => {
  memberList.push({ id: idx + 1, ...value, birthday: new Date(value.birthday) })
})

export class MemberService {
  async findAll (): Promise<Member[]> {
    return memberList
  }
}
