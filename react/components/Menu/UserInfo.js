import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { injectIntl, intlShape } from 'react-intl'
import UserInfoLoading from './UserInfoLoading'
import GetName from '../../graphql/getName.gql'
import UserPicture from './ProfilePicture/UserPicture'

const UserInfo = ({ profile, intl }) => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative h3 w3">
        <UserPicture />
      </div>
      {profile.firstName ? (
        <div>
          <div className="f5 fw3 mid-gray mb2">
            {intl.formatMessage({ id: 'userInfo.greeting' })},
          </div>
          <div className="f4 fw3 nowrap">{profile.firstName}!</div>
        </div>
      ) : (
        <div className="f4 fw3 nowrap">
          {intl.formatMessage({ id: 'userInfo.greeting' })}!
        </div>
      )}
    </div>
  )
}

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetName),
  branch(({ data }) => data.profile == null, renderComponent(UserInfoLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  injectIntl,
)
export default enhance(UserInfo)
