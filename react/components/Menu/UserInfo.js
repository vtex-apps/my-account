import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { injectIntl, intlShape } from 'react-intl'
import UserInfoLoading from './UserInfoLoading'
import GetGreeting from '../../graphql/getGreeting.gql'
import UserPicture from './ProfilePicture/UserPicture'

const UserInfo = ({ profile, intl }) => {
  return (
    <div className="vtex-account__user-info flex flex-wrap items-end mb7">
      <div className="vtex-account__user-image relative mr5 h3 w3">
        <UserPicture imagePath={profile.profilePicture} />
      </div>
      {profile.firstName ? (
        <div>
          <div className="vtex-account__user-greeting f5 fw3 c-muted-1 mb2 mt0-l mt2-m">
            {intl.formatMessage({ id: 'userInfo.greeting' })},
          </div>
          <div className="vtex-account__user-name f4 c-on-base fw3 nowrap">
            {profile.firstName}!
          </div>
        </div>
      ) : (
          <div className="vtex-account__user-greeting f4 fw3 nowrap">
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
  graphql(GetGreeting),
  branch(({ data }) => data.profile == null, renderComponent(UserInfoLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  injectIntl
)
export default enhance(UserInfo)
