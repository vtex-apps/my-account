import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

const PaymentData = ({ intl }) => {
    return (
        <h1> payment data works </h1>
    )
}

PaymentData.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(PaymentData)
