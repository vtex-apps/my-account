import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import MenuLink from './MenuLink'

const links = [
  {
    id: 'pages.orders',
    path: '#',
  },
  {
    id: 'pages.addresses',
    path: '/addresses',
  },
  {
    id: 'pages.personalData',
    path: '/personal_data',
  },
  {
    id: 'pages.paymentData',
    path: '/payment_data',
  },
]

const MenuLinksList = ({ intl }) => {
  return (
    <nav>
      {' '}
      {links.map(link => (
        <MenuLink
          path={link.path}
          name={intl.formatMessage({
            id: link.id,
          })}
          key={link.id}
        />
      ))}{' '}
    </nav>
  )
}

MenuLinksList.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(MenuLinksList)
