import React from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

const Menu = () => {
  return (
    <aside className="vtex-account__menu pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100">
      <UserInfo />
      <MenuLinksList />
    </aside>
  )
}

export default Menu
