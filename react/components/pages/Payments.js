import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { EmptyState } from 'vtex.styleguide'

import PaymentsHeader from '../headers/PaymentsHeader'
import PaymentsLoading from '../loaders/PaymentsLoading'
import PaymentBox from '../Payments/PaymentBox'
import PageTemplate from '../shared/PageTemplate'
import GET_PAYMENTS from '../../graphql/getPayments.gql'

class Payments extends Component {
  render() {
    const { payments, intl } = this.props

    const emptyStateTitle = <span className="c-on-base">{intl.formatMessage({ id: 'payments.notFound'})}</span>

    return (
      <PageTemplate
        header={<PaymentsHeader />}
      > 
        {() => (
          <Fragment>
            {payments && (payments.length !== 0) ? payments.map(payment => (
              <PaymentBox key={payment.id} payment={payment} />
            )):(
              <EmptyState title={emptyStateTitle}/>
            )}
          </Fragment>
        )}
      </PageTemplate>
    )
  }
}

Payments.propTypes = {
  intl: intlShape.isRequired,
  payments: PropTypes.array,
}

const enhance = compose(
  injectIntl,
  graphql(GET_PAYMENTS),
  branch(({ data }) => data.profile == null, renderComponent(PaymentsLoading)),
  withProps(({ data }) => ({ payments: data.profile.payments })),
  withRouter,
)
export default enhance(Payments)
