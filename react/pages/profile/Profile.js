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

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingPassword: false,
    }
  }

  toggleEditingData = () => {
    this.props.history.push('/profile/edit')
  }

  toggleEditingPassword = () => {
    this.setState(prevState => ({
      isEditingPassword: !prevState.isEditingPassword,
    }))
  }

  render() {
    const { profile, location } = this.props
    const { isEditingPassword } = this.state
    const shouldShowToast = location.search === '?success=true'

    return (
      <section>
        <ProfileHeader />
        <main className="mt6 flex-ns flex-wrap items-start-ns">
          <ProfileBox profile={profile} onEditClick={this.toggleEditingData} />
          {isEditingPassword ? (
            <PasswordFormBox onPasswordChange={this.toggleEditingPassword} />
          ) : (
            <PasswordBox onEditClick={this.toggleEditingPassword} />
          )}
          {shouldShowToast && <Toast messageId="alert.success" />}
        </main>
      </section>
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
