import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import ProfileHeader from './ProfileHeader'
import ProfileLoading from './ProfileLoading'
import ProfileBox from '../../components/Profile/ProfileBox'
import PasswordBox from '../../components/Profile/PasswordBox'
import PasswordFormBox from '../../components/Profile/PasswordFormBox'
import Toast from '../../components/shared/Toast'
import GetProfile from '../../graphql/getProfile.gql'
import ContentWrapper from '../shared/ContentWrapper'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingPassword: false,
      showToast: false,
    }
  }

  componentDidMount() {
    const { location } = this.props
    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  startEditingData = () => {
    this.props.history.push('/profile/edit')
  }

  startEditingPassword = () => {
    this.setState({ isEditingPassword: true })
  }

  finishEditingPassword = () => {
    this.setState({ isEditingPassword: false, showToast: true })
  }

  render() {
    const { profile } = this.props
    const { isEditingPassword, showToast } = this.state

    return (
      <ContentWrapper>
        <ProfileHeader />
        <main className="mt6 flex-ns flex-wrap items-start-ns">
          <ProfileBox profile={profile} onEditClick={this.startEditingData} />
          {isEditingPassword ? (
            <PasswordFormBox
              email={profile.email}
              onPasswordChange={this.finishEditingPassword}
            />
          ) : (
            <PasswordBox onEditClick={this.startEditingPassword} />
          )}
          {showToast && (
            <Toast messageId="alert.success" onClose={this.handleCloseToast} />
          )}
        </main>
      </ContentWrapper>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GetProfile),
  branch(({ data }) => data.profile == null, renderComponent(ProfileLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(Profile)
