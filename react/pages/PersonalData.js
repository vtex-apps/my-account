import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'
import PersonalDataBox from '../components/PersonalData/PersonalDataBox'
import PasswordBox from '../components/PersonalData/PasswordBox'
import EditingPasswordBox from '../components/PersonalData/EditingPasswordBox'
import EditingPersonalDataBox from '../components/PersonalData/EditingPersonalDataBox'

class PersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingData: false,
      isEditingPassword: false,
    }
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
    const { isEditingData, isEditingPassword } = this.state
    const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns items-start-ns">
          {isEditingData ? (
            <EditingPersonalDataBox onDataSave={this.toggleEditingData} />
          ) : (
            <PersonalDataBox onEditClick={this.toggleEditingData} />
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

export default injectIntl(PersonalData)
