import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'

const Addresses = ({ intl }) => {
    
    const pageTitle = intl.formatMessage({id: 'pages.addresses'})
    
    return (
        <div>
            <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
                <Header title={pageTitle} />
            </div>
        </div>
    )
}

Addresses.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(Addresses)
