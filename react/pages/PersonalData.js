import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'
import PersonalDataBox from '../components/PersonalData/PersonalDataBox'
import PasswordBox from '../components/PersonalData/PasswordBox'
import EditingPasswordBox from '../components/PersonalData/EditingPasswordBox'

class PersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingPassword: false,
      isEditingData: false,
    }
  }

  toggleEditingPassword = () => {
    const { isEditingPassword } = this.state
    this.setState({
      isEditingPassword: !isEditingPassword,
    })
  }

  render() {
    const { intl } = this.props
    const { isEditingPassword } = this.state
    const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns items-start-ns">
          <PersonalDataBox />
          {isEditingPassword ? (
            <EditingPasswordBox passwordChanged={this.toggleEditingPassword} />
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
