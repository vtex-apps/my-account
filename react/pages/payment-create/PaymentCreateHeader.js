import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const PaymentCreateHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.paymentCreate'}
      backButton={{ id: 'pages.payments', path: '/payments' }}
      shouldAlwaysShowBackButton
    />
  )
}

export default PaymentCreateHeader
