import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import Loading from '../pages/Loading'
import Header from '../components/shared/Header'
import PersonalDataBox from '../components/PersonalData/PersonalDataBox'
import PasswordBox from '../components/PersonalData/PasswordBox'
import EditingPasswordBox from '../components/PersonalData/EditingPasswordBox'
import EditingPersonalDataBox from '../components/PersonalData/EditingPersonalDataBox'
import GetProfile from '../graphql/GetProfile.gql'

class PersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingData: false,
      isEditingPassword: false,
    }
  }

  componentDidMount() {
    const { profile } = this.props.profileQuery
    this.setState({ profile })
  }

  toggleEditingData = () => {
    const { isEditingData } = this.state
    this.setState({
      isEditingData: !isEditingData,
    })
  }

  toggleEditingPassword = () => {
    const { isEditingPassword } = this.state
    this.setState({
      isEditingPassword: !isEditingPassword,
    })
  }

  render() {
    const { intl } = this.props
    const { profile } = this.state
    const { isEditingData, isEditingPassword } = this.state
    const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns items-start-ns">
          {isEditingData ? (
            <EditingPersonalDataBox onDataSave={this.toggleEditingData} />
          ) : (
            <PersonalDataBox
              profile={profile}
              onEditClick={this.toggleEditingData}
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
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetProfile, { name: 'profileQuery' }),
  branch(({ profileQuery }) => profileQuery.loading, renderComponent(Loading)),
  injectIntl,
)
export default enhance(PersonalData)
