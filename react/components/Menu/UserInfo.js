import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { injectIntl, intlShape } from 'react-intl'
import { IconPlus } from 'vtex.styleguide'
import UserPlaceholderPicture from './UserPlaceholderPicture'
import GetName from '../../graphql/GetName.gql'

const UserInfo = ({ nameQuery, intl }) => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <UserPlaceholderPicture />
        <div className="absolute bottom-0 right-0 blue bg-white br-100 plus-sign">
          <IconPlus size={20} color="currentColor" />
        </div>
      </div>
      <div>
        {nameQuery.profile && (
          <div>
            <div className="f5 fw3 mid-gray mb2">
              {intl.formatMessage({ id: 'userInfo.greeting' })},
            </div>
            <div className="f4 fw3">{nameQuery.profile.firstName}!</div>
          </div>
        )}
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  nameQuery: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetName, { name: 'nameQuery' }),
  injectIntl,
)
export default enhance(UserInfo)
