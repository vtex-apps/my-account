import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

const Addresses = ({ intl }) => {
    return (
        <h1> addresses works </h1>
    )
}

Addresses.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(Addresses)
