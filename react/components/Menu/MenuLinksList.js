import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { ExtensionPoint } from 'render'
import MenuLink from './MenuLink'

const links = [
  {
    id: 'pages.orders',
    path: '/myorders',
  },
  {
    id: 'pages.addresses',
    path: '/addresses',
  },
  {
    id: 'pages.profile',
    path: '/profile',
  },
  {
    id: 'pages.payments',
    path: '/payments',
  },
]

const MenuLinksList = ({ intl }) => {
  return (
    <nav>
      {links.map(link => (
        <MenuLink
          path={link.path}
          name={intl.formatMessage({
            id: link.id,
          })}
          key={link.id}
        />
      ))}
      <ExtensionPoint
        id="menu-links"
        render={links =>
          links.map(({ name, path }) => (
            <MenuLink path={path} name={name} key={name} />
          ))
        }
      />
    </nav>
  )
}

MenuLinksList.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(MenuLinksList)
