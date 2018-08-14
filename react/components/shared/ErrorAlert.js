import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const ErrorAlert = ({ errorId, onDismiss, intl }) => {
  return (
    <div className="mb5">
      <Alert type="error" onClose={onDismiss}>
        {intl.formatMessage({ id: errorId })}
      </Alert>
    </div>
  )
}

ErrorAlert.propTypes = {
  errorId: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ErrorAlert)
