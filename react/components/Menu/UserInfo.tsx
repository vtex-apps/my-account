import React, { FunctionComponent } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import GREETING, { Result } from '../../graphql/customerGreeting.gql'
import Loading from './UserInfoLoading'
import PictureRenderer from './ProfilePicture/PictureRenderer'

const CSS_HANDLES = [
  'userInfo',
  'userImage',
  'userGreeting',
  'userName',
  'userGreeting',
] as const

const UserInfo: FunctionComponent<Props> = ({ profilePicture, firstName }) => {
  const cssHandles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${cssHandles.userInfo} flex flex-wrap items-end mb7`}>
      <div className={`${cssHandles.userImage} relative mr5 h3 w3`}>
        <PictureRenderer imagePath={profilePicture} />
      </div>
      {firstName ? (
        <div>
          <div
            className={`
              ${cssHandles.userGreeting} f5 fw3 c-muted-1 mb2 mt0-l mt2-m
            `}
          >
            <FormattedMessage id="vtex.store-messages@0.x::userInfo.greeting" />
            ,
          </div>
          <div className={`${cssHandles.userName} f4 c-on-base fw3 nowrap`}>
            {firstName}!
          </div>
        </div>
      ) : (
        <div className={`${cssHandles.userGreeting} f4 fw3 nowrap`}>
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

const enhance = compose<Props, Record<string, unknown>>(
  graphql<Record<string, unknown>, Result, Record<string, unknown>, Props>(
    GREETING,
    {
      props: ({ data }) => ({
        firstName: data?.profile?.firstName ?? '',
        profilePicture: data?.profile?.profilePicture ?? undefined,
        loading: data ? data.loading : false,
      }),
    }
  ),
  branch<Props>(({ loading }) => loading, renderComponent(Loading))
)

export default enhance(UserInfo)
