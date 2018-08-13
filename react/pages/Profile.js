import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import Loading from '../pages/Loading'
import Header from '../components/shared/Header'
import ProfileBox from '../components/Profile/ProfileBox'
import PasswordBox from '../components/Profile/PasswordBox'
import PasswordFormBox from '../components/Profile/PasswordFormBox'
import ProfileFormBox from '../components/Profile/ProfileFormBox'
import GetProfile from '../graphql/getProfile.gql'

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
    const { profile } = this.props
    const { isEditingPassword } = this.state

    return (
      <section>
        <Header titleId={'pages.profile'} />
        <main className="mt6 flex-ns flex-wrap items-start-ns">
          <ProfileBox profile={profile} onEditClick={this.toggleEditingData} />
          {isEditingPassword ? (
            <PasswordFormBox onPasswordChange={this.toggleEditingPassword} />
          ) : (
            <PasswordBox onEditClick={this.toggleEditingPassword} />
          )}
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
  branch(({ data }) => data.loading, renderComponent(Loading)),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(Profile)
