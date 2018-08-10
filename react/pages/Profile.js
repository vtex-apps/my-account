import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
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
      isEditingData: false,
      isEditingPassword: false,
      profile: null,
    }
  }

  componentDidMount() {
    const { profile } = this.props.profileQuery
    this.setState({ profile })
  }

  startEditingData = () => {
    this.setState({
      isEditingData: true,
    })
  }

  finishEditingData = profile => {
    this.setState({ profile, isEditingData: false })
  }

  toggleEditingPassword = () => {
    const { isEditingPassword } = this.state
    this.setState({
      isEditingPassword: !isEditingPassword,
    })
  }

  render() {
    const { intl } = this.props
    const { profile, isEditingData, isEditingPassword } = this.state
    const pageTitle = intl.formatMessage({ id: 'pages.profile' })

    console.log(JSON.stringify(profile))

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns flex-wrap items-start-ns">
          {isEditingData ? (
            <ProfileFormBox
              profile={profile}
              onDataSave={this.finishEditingData}
            />
          ) : (
            <ProfileBox profile={profile} onEditClick={this.startEditingData} />
          )}
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
  profileQuery: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetProfile, { name: 'profileQuery' }),
  branch(({ profileQuery }) => profileQuery.loading, renderComponent(Loading)),
  injectIntl,
)
export default enhance(Profile)
