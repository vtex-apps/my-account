import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Plus from '@vtex/styleguide/lib/icon/Plus'
import userPlaceholder from '../../images/user-placeholder.svg'

const UserInfo = ({ userName, intl }) => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative user-picture">
        <img className="br-100 w3" src={userPlaceholder} alt="User picture" />
        <span className="absolute bottom-0 right-0 blue">
          <Plus size={20} color="currentColor" />
        </span>
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
  intl: intlShape.isRequired,
}

export default injectIntl(UserInfo)
