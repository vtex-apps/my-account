import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const PaymentsHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.payments'}
      actionButton={{ id: 'payments.addPayment', path: '/payments/new' }}
    />
  )
}

export default PaymentsHeader
