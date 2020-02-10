import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { defineMessages } from 'react-intl'
import { branch, compose, renderComponent, withProps } from 'recompose'
import { withRouter } from 'vtex.my-account-commons/Router'
import { AuthState } from 'vtex.react-vtexid'

import GET_PROFILE from '../../graphql/getProfile.gql'
import styles from '../../styles.css'
import ProfileLoading from '../loaders/ProfileLoading'
import PasswordBox from '../Profile/PasswordBox'
import PasswordFormBox from '../Profile/PasswordFormBox'
import ProfileBox from '../Profile/ProfileBox'
import Toast from '../shared/Toast'
import { withContentWrapper } from '../shared/withContentWrapper'
import NewsletterBox from '../Profile/NewsletterBox'

const messages = defineMessages({
  profile: {
    id: 'pages.profile',
    from: 'vtex.store-messages',
  },
  success: {
    id: 'alert.success',
    from: 'vtex.store-messages',
  },
})

export const headerConfig = {
  namespace: `${styles.profile}`,
  titleId: messages.profile.id,
}

class ProfileContainer extends Component<Props> {
  public state = {
    isEditingPassword: false,
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

  private handleEditingPassword = () => {
    this.setState({ isEditingPassword: true })
  }

  private handleFinishEditingPassword = () => {
    this.setState({ isEditingPassword: false, showToast: true }, () =>
      this.props.data.refetch()
    )
  }

  private getIsNewsletterOptIn = (profile: Profile) => {
    const isNewsletterOptIn = profile.customFields?.find(
      ({ key }) => key === 'isNewsletterOptIn'
    )?.value
    return isNewsletterOptIn?.toLowerCase() === 'true'
  }

  public render() {
    const { profile } = this.props
    const { isEditingPassword, showToast } = this.state
    const isNewsletterOptIn = this.getIsNewsletterOptIn(profile)

    return (
      <main className="flex flex-column-s flex-row-ns">
        <div className="w-60-ns w-100-s">
          <ProfileBox profile={profile} onEditClick={this.handleGoToEdit} />
        </div>
        <div className="w-40-ns w-100-s">
          {isEditingPassword ? (
            <AuthState email={profile.email}>
              <AuthState.Token>
                {({ value, setValue }: any) => (
                  <PasswordFormBox
                    email={profile.email}
                    passwordLastUpdate={profile.passwordLastUpdate}
                    onPasswordChange={this.handleFinishEditingPassword}
                    currentToken={value}
                    setToken={setValue}
                  />
                )}
              </AuthState.Token>
            </AuthState>
          ) : (
            <PasswordBox
              passwordLastUpdate={profile.passwordLastUpdate}
              onEditClick={this.handleEditingPassword}
            />
          )}
          <NewsletterBox
            isNewsletterOptIn={isNewsletterOptIn}
            userEmail={profile.email}
          />
        </div>
        {showToast && (
          <Toast
            messageId={messages.success.id}
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
    refetch: () => void
  }
}

const enhance = compose<Props, void>(
  graphql(GET_PROFILE, {
    options: { variables: { customFields: 'isNewsletterOptIn' } },
  }),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(ProfileLoading)
  ),
  withContentWrapper(headerConfig),
  withProps(({ data }: Props) => ({ profile: data.profile })),
  withRouter
)

export default enhance(ProfileContainer)
