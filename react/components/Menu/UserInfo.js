import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import UserInfoLoading from './UserInfoLoading'
import GetGreeting from '../../graphql/getGreeting.gql'
import UserPicture from './ProfilePicture/UserPicture'

import styles from '../../styles.css'

const UserInfo = ({ profile, intl }) => {
  return (
    <div className={`${styles.userInfo} flex flex-wrap items-end mb7`}>
      <div className={`${styles.userImage} relative mr5 h3 w3`}>
        <UserPicture imagePath={profile.profilePicture} />
      </div>
      {profile.firstName ? (
        <div>
          <div
            className={`
              ${styles.userGreeting} f5 fw3 c-muted-1 mb2 mt0-l mt2-m
            `}>
            <FormattedMessage id="userInfo.greeting" />,
          </div>
          <div className={`${styles.userName} f4 c-on-base fw3 nowrap`}>
            {profile.firstName}!
          </div>
        </div>
      ) : (
        <div className={`${styles.userGreeting} f4 fw3 nowrap`}>
          <FormattedMessage id="userInfo.greeting" />!
        </div>
      )}
    </div>
  )
}

UserInfo.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GetGreeting),
  branch(({ data }) => data.profile == null, renderComponent(UserInfoLoading)),
  withProps(({ data }) => ({ profile: data.profile }))
)
export default enhance(UserInfo)
