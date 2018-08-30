import React from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

const Menu = () => {
  return (
    <aside className="pv9 pv0-m-2 ph9 ph7-m ph8-l">
      <UserInfo />
      <MenuLinksList />
    </aside>
  )
}

export default Menu
