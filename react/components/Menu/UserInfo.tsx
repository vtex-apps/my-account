import React, { FunctionComponent } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'

import GREETING, { Result } from '../../graphql/customerGreeting.gql'
import Loading from './UserInfoLoading'
import styles from '../../styles.css'
import PictureRenderer from './ProfilePicture/PictureRenderer'

const UserInfo: FunctionComponent<Props> = ({ profilePicture, firstName }) => {
  return (
    <div className={`${styles.userInfo} flex flex-wrap items-end mb7`}>
      <div className={`${styles.userImage} relative mr5 h3 w3`}>
        <PictureRenderer imagePath={profilePicture} />
      </div>
      {firstName ? (
        <div>
          <div
            className={`
              ${styles.userGreeting} f5 fw3 c-muted-1 mb2 mt0-l mt2-m
            `}
          >
            <FormattedMessage id="vtex.store-messages@0.x::userInfo.greeting" />
            ,
          </div>
          <div className={`${styles.userName} f4 c-on-base fw3 nowrap`}>
            {firstName}!
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

interface Props {
  firstName: string
  profilePicture?: string
  loading: boolean
}

const enhance = compose<Props, {}>(
  graphql<{}, Result, {}, Props>(GREETING, {
    props: ({ data }) => ({
      firstName: data?.profile?.firstName ?? '',
      profilePicture: data?.profile?.profilePicture ?? undefined,
      loading: data ? data.loading : false,
    }),
  }),
  branch<Props>(({ loading }) => loading, renderComponent(Loading))
)

export default enhance(UserInfo)
