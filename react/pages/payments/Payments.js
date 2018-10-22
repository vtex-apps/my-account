import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { EmptyState } from 'vtex.styleguide'
import PaymentsHeader from './PaymentsHeader'
import PaymentsLoading from './PaymentsLoading'
import PaymentBox from '../../components/Payments/PaymentBox'
import GetPayments from '../../graphql/getPayments.gql'
import ContentWrapper from '../shared/ContentWrapper'

class Payments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { payments, intl } = this.props

    return (
      <ContentWrapper>
        <PaymentsHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {payments ? payments.map(payment => (
            <PaymentBox key={payment.id} payment={payment} />
          )):(
            <EmptyState title={intl.formatMessage({ id: 'payments.notFound'})}/>
          )}
        </main>
      </ContentWrapper>
    )
  }
}

Payments.propTypes = {
  intl: intlShape.isRequired,
  payments: PropTypes.array,
}

const enhance = compose(
  injectIntl,
  graphql(GetPayments),
  branch(({ data }) => data.profile == null, renderComponent(PaymentsLoading)),
  withProps(({ data }) => ({ payments: data.profile.payments })),
  withRouter,
)
export default enhance(Payments)
