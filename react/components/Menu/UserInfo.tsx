import React, { FunctionComponent } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'

import GetGreeting from '../../graphql/getGreeting.gql'
import UserPicture from './ProfilePicture/UserPicture'
import UserInfoLoading from './UserInfoLoading'
import styles from '../../styles.css'

const UserInfo: FunctionComponent<Props> = ({ profile }) => {
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
            <FormattedMessage id="vtex.store-messages@0.x::userInfo.greeting" />
            ,
          </div>
          <div className={`${styles.userName} f4 c-on-base fw3 nowrap`}>
            {profile.firstName}!
          </div>
        </div>
      ) : (
        <div className={`${styles.userGreeting} f4 fw3 nowrap`}>
          <FormattedMessage id="vtex.store-messages@0.x::userInfo.greeting" />!
        </div>
      )}
    </div>
  )
}

interface ProfileData {
  firstName: string
  lastName: string
  profilePicture?: string
}

interface Props {
  profile: ProfileData
  data: { profile: ProfileData }
}

const enhance = compose<Props, {}>(
  graphql(GetGreeting),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(UserInfoLoading)
  ),
  withProps(({ data }: Props) => ({ profile: data.profile }))
)
export default enhance(UserInfo)
