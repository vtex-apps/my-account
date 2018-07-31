import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const ErrorAlert = ({ onDismiss, intl }) => {
  return (
    <div className="mb5">
      <Alert type="error" onClose={onDismiss}>
        {intl.formatMessage({ id: 'commons.error-occurred' })}
      </Alert>
    </div>
  )
}

ErrorAlert.propTypes = {
  onDismiss: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ErrorAlert)
