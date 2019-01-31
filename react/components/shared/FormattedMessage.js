import React, { Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

const FormattedMessage = ({ id, defaultMessage, description, values, intl }) => {
  return <Fragment>{intl.formatMessage({ id, defaultMessage, description }, values)}</Fragment>
}

FormattedMessage.propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  values: PropTypes.object,
}

export default injectIntl(FormattedMessage)
