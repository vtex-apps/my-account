import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const MyProfileLink = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'pages.profile' }),
      path: '/profile',
    },
  ])
}

MyProfileLink.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(MyProfileLink)
