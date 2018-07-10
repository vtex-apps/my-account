import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

const PersonalData = ({ intl }) => {
    return (
        <h1> personal data works </h1>
    )
}

PersonalData.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(PersonalData)
