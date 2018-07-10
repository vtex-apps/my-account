import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'

const PersonalData = ({ intl }) => {
  const pageTitle = intl.formatMessage({ id: 'pages.personalData' })

  return (
    <div>
      <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
        <Header title={pageTitle} />
      </div>
    </div>
  )
}

PersonalData.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PersonalData)
