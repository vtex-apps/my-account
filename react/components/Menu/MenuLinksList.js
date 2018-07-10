import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import MenuLink from './MenuLink';

const MenuLinksList = ({ intl }) => {
    return (
        <nav>
            <MenuLink 
                className="pv6" 
                path="#" 
                name={intl.formatMessage({id: 'menuLink.orders'})} 
            />
            <MenuLink 
                className="pv6" 
                path="/addresses" 
                name={intl.formatMessage({id: 'menuLink.addresses'})} 
            />
            <MenuLink 
                className="pv6" 
                path="/personal_data" 
                name={intl.formatMessage({id: 'menuLink.personalData'})} 
            />
            <MenuLink 
                className="pv6" 
                path="/payment_data" 
                name={intl.formatMessage({id: 'menuLink.paymentData'})} 
            />
        </nav>
    )
}

MenuLinksList.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(MenuLinksList)
