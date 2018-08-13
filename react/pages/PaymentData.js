import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Header from '../components/shared/Header'

const PaymentData = () => {
  return (
    <div>
      <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
        <Header titleId={'pages.paymentData'} />
      </div>
    </div>
  )
}

PaymentData.propTypes = {}

export default PaymentData
