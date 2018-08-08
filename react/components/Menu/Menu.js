import React from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

const Menu = () => {
  return (
    <aside className="pv5 ph7 mr7-ns">
      <UserInfo />
      <MenuLinksList />
    </aside>
  )
}

export default Menu
