import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'

const PaymentData = ({ intl }) => {

    const pageTitle = intl.formatMessage({id: 'pages.paymentData'})

    return (
        <div>
            <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
                <Header title={pageTitle} />
            </div>
        </div>
    )
}

PaymentData.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(PaymentData)
