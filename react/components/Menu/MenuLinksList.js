import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import MenuLink from './MenuLink';

const links = [
    {code: 'pages.orders', path: '#'},
    {code: 'pages.addresses', path: '/addresses'},
    {code: 'pages.personalData', path: '/personal_data'},
    {code: 'pages.paymentData', path: '/payment_data'}
]

const MenuLinksList = ({ intl }) => {
    return (
        <nav>
            {links.map((link) => (
                <MenuLink
                    className="pv6"
                    path={link.path}
                    name={intl.formatMessage({id: link.code})}
                    key={link.code}
                />
            ))}
        </nav>
    )
}

MenuLinksList.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(MenuLinksList)
