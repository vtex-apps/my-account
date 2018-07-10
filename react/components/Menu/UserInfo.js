import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Plus from '@vtex/styleguide/lib/icon/Plus'
import UserPlaceholderPicture from './UserPlaceholderPicture'

const UserInfo = ({ userName, intl }) => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <UserPlaceholderPicture />
        <div className="absolute bottom-0 right-0 blue bg-white br-100 plus-sign">
          <Plus size={20} color="currentColor" />
        </div>
      </div>
      <div>
        <div className="f5 fw3 helvetica mid-gray mb2">
          {intl.formatMessage({ id: 'userInfo.greeting' })},
        </div>
        <div className="f4 fw3 helvetica">{userName}!</div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  userName: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(UserInfo)
