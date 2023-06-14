import React, { useEffect, useState } from 'react'
import { MemberBios } from '../components/MemberBios'
import { Menu } from '../components/Menu'
import { MemberService } from '../services/members'
import { type Member } from '../models/member'
import { Footer } from '../components/Footer'
import { MenuToggleButton } from '../components/MenuToggleButton'

const desktopFooter = (
  <div className="hidden sm:block grow bg-gray-900 text-gray-300 p-4 max-h-44">
    <Footer/>
  </div>
)

const mobileFooter = (
  <div className="sm:hidden bg-gray-900 text-gray-300 py-4">
    <div className="h-28">
      <Footer/>
    </div>
  </div>
)

export const MainPage = (): React.ReactElement => {
  const [members, setMembers] = useState<Member[]>([])
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    const serv = new MemberService()

    serv.findAll()
      .then(setMembers)
      .catch(console.error)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row h-screen sm:overflow-hidden">
      <div className="flex flex-col sm:w-64 md:w-96 bg-gray-100">
        <h1 className="h-4 font-bold p-4 mb-4">Twice Members</h1>

        <MenuToggleButton onClick={() => { setShowMenu(state => !state) }}/>

        <nav className={`p-4 flex-1 ${showMenu ? '' : 'hidden'} sm:block sm:overflow-y-auto scrollbar-thumb-gray-400 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-rounded`}>
          <Menu members={members}/>
        </nav>

        {desktopFooter}
      </div>

      <main className="flex flex-1 flex-col sm:overflow-y-auto px-4 pb-10">
        <MemberBios members={members}/>
      </main>

      {mobileFooter}
    </div>
  )
}
