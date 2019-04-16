import React, { Component } from 'react'
import UserInfo from './UserInfo'

import { ExtensionPoint } from 'vtex.render-runtime'
import MenuLink from './MenuLink'

import styles from '../../styles.css'

function Menu() {
  return (
    <aside className={`${styles.menu} pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100`}>
      <UserInfo />
      <ExtensionPoint
        id="my-account-menu"
        render={links =>
          links.map(({ name, path }) => (
            <MenuLink path={path} name={name} key={name} />
          ))
        } />
    </aside>
  )
}

export default Menu
