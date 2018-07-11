import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'
import PersonalDataBox from '../components/PersonalData/PersonalDataBox'
import PasswordBox from '../components/PersonalData/PasswordBox'

const PersonalData = ({ intl }) => {
  const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

  return (
    <section>
      <Header title={pageTitle} />
      <main className="mt6 flex-ns">
        <PersonalDataBox />
        <PasswordBox />
      </main>
    </section>
  )
}

PersonalData.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PersonalData)
