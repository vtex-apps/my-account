import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import MenuLink from './MenuLink'

const links = [
  {
    id: 'pages.profile',
    path: '/profile',
  },
  {
    id: 'pages.addresses',
    path: '/addresses',
  },
]

const MenuLinksList = ({ intl }) => {
  return (
    <nav className="vtex-account__menu-links">
      <ExtensionPoint
        id="menu-links-before"
        render={links =>
          links.map(({ name, path }) => (
            <MenuLink path={path} name={name} key={name} />
          ))
        }
      />
      {links.map(({ path, id }) => (
        <MenuLink path={path} name={intl.formatMessage({ id })} key={id} />
      ))}
      <ExtensionPoint
        id="menu-links-after"
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
