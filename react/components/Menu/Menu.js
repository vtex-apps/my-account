import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

const Menu = ({ className }) => {
  return (
    <aside className={classnames('pv5 ph7', className)}>
      <UserInfo className="mb7" />
      <MenuLinksList />
    </aside>
  )
}

Menu.propTypes = {
  className: PropTypes.string,
}

export default Menu
