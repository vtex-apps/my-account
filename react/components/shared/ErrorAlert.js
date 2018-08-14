import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const ErrorAlert = ({ onDismiss, intl }) => {
  return (
    <div className="mb5">
      <Alert type="error" onClose={onDismiss}>
        {intl.formatMessage({ id: 'commons.errorOccurred' })}
      </Alert>
    </div>
  )
}

ErrorAlert.propTypes = {
  /** Callback for dismissing the alert */
  onDismiss: PropTypes.func,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(ErrorAlert)
