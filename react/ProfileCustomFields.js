import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const ProfileCustomFields = ({ render }) => {
  return render([
    {
      label: 'Hair color',
      value: 'Red',
    },
    {
      label: 'Skin color',
      value: 'White',
    },
  ])
}

ProfileCustomFields.propTypes = {
  render: PropTypes.func.isRequired
}

export default injectIntl(ProfileCustomFields)