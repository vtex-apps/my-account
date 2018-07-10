import React from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

const Menu = () => {
  return (
    <aside className="pv5 ph7 mr8-ns">
      <UserInfo userName="Gustavo" />
      <MenuLinksList />
    </aside>
  )
}

export default Menu
