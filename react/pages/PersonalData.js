import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import Loading from '../pages/Loading'
import Header from '../components/shared/Header'
import PersonalDataBox from '../components/PersonalData/PersonalDataBox'
import PasswordBox from '../components/PersonalData/PasswordBox'
import EditingPasswordBox from '../components/PersonalData/EditingPasswordBox'
import EditingPersonalDataBox from '../components/PersonalData/EditingPersonalDataBox'
import GetProfile from '../graphql/getProfile.gql'
import emptyProfile from '../components/PersonalData/emptyProfile'

class PersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingData: false,
      isEditingPassword: false,
      profile: emptyProfile,
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
    const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns items-start-ns">
          {isEditingData ? (
            <EditingPersonalDataBox
              profile={profile}
              onDataSave={this.finishEditingData}
            />
          ) : (
            <PersonalDataBox
              profile={profile}
              onEditClick={this.startEditingData}
            />
          )}
          {isEditingPassword ? (
            <EditingPasswordBox onPasswordChange={this.toggleEditingPassword} />
          ) : (
            <PasswordBox onEditClick={this.toggleEditingPassword} />
          )}
        </main>
      </section>
    )
  }
}

PersonalData.propTypes = {
  profileQuery: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetProfile, { name: 'profileQuery' }),
  branch(({ profileQuery }) => profileQuery.loading, renderComponent(Loading)),
  injectIntl,
)
export default enhance(PersonalData)
