import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'vtex.my-account-commons/Router'
import { compose, branch, renderComponent, withProps } from 'recompose'

import { withContentWrapper } from '../shared/withContentWrapper'
import ProfileLoading from '../loaders/ProfileLoading'
import ProfileBox from '../Profile/ProfileBox'
import Toast from '../shared/Toast'
import GET_PROFILE from '../../graphql/getProfile.gql'
import NewsletterBox from '../Profile/NewsletterBox'

export const headerConfig = {
  titleId: 'vtex.store-messages@0.x::pages.profile',
  hideBackButton: true,
}

class ProfileContainer extends Component<Props> {
  public state = {
    showToast: false,
  }

  public componentDidMount = () => {
    const { location } = this.props

    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  private handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  private handleGoToEdit = () => {
    this.props.history.push('/profile/edit')
  }

  public render() {
    const { profile } = this.props
    const { showToast } = this.state

    return (
      <main className="flex flex-column-s flex-row-ns">
        <div className="w-60-ns w-100-s">
          <ProfileBox profile={profile} onEditClick={this.handleGoToEdit} />
        </div>
        <div className="w-40-ns w-100-s">
          <NewsletterBox userEmail={profile.email} />
        </div>
        {showToast && (
          <Toast
            messageId="vtex.store-messages@0.x::alert.success"
            onClose={this.handleCloseToast}
          />
        )}
      </main>
    )
  }
}

interface Props {
  location: any
  history: any
  profile: Profile
  data: {
    profile: Profile
  }
}

const enhance = compose<Props, void>(
  graphql(GET_PROFILE),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(ProfileLoading)
  ),
  withContentWrapper({
    headerConfig,
    handle: { configHandle: 'profile', contentHandle: '' },
  }),
  withProps(({ data }: Props) => ({ profile: data.profile })),
  withRouter
)

export default enhance(ProfileContainer)
