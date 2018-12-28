import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const MyAddressesLink = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'pages.addresses' }),
      path: '/addresses',
    },
  ])
}

MyAddressesLink.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(MyAddressesLink)
