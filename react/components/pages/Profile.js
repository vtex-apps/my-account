import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { ContentWrapper } from 'vtex.my-account-commons'

import ProfileLoading from '../loaders/ProfileLoading'
import ProfileBox from '../Profile/ProfileBox'
import PasswordBox from '../Profile/PasswordBox'
import PasswordFormBox from '../Profile/PasswordFormBox'
import Toast from '../shared/Toast'
import GET_PROFILE from '../../graphql/getProfile.gql'

export const headerConfig = () => {
  return { namespace: 'vtex-account__profile', titleId: 'pages.profile' }
}

class Profile extends Component {
  state = {
    isEditingPassword: false,
    showToast: false,
  }

  componentDidMount = () => {
    const { location } = this.props
    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  handleGoToEdit = () => {
    this.props.history.push('/profile/edit')
  }

  handleEditingPassword = () => {
    this.setState({ isEditingPassword: true })
  }

  handleFinishEditingPassword = () => {
    this.setState({ isEditingPassword: false, showToast: true })
  }

  render() {
    const { profile } = this.props
    const { isEditingPassword, showToast } = this.state

    return (
      <ContentWrapper {...headerConfig()}>
        {() => (
          <main className="flex flex-column-s flex-row-ns">
            <div className="w-60-ns w-100-s">
              <ProfileBox profile={profile} onEditClick={this.handleGoToEdit} />
            </div>
            <div className="w-40-ns w-100-s">
              {isEditingPassword ? (
                <PasswordFormBox
                  email={profile.email}
                  onPasswordChange={this.handleFinishEditingPassword}
                />
              ) : (
                <PasswordBox onEditClick={this.handleEditingPassword} />
              )}
            </div>
            {showToast && (
              <Toast
                messageId="alert.success"
                onClose={this.handleCloseToast}
              />
            )}
          </main>
        )}
      </ContentWrapper>
    )
  }
}

Profile.propTypes = {
  location: PropTypes.any,
  history: PropTypes.object,
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GET_PROFILE),
  branch(({ data }) => data.profile == null, renderComponent(ProfileLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter
)
export default enhance(Profile)
