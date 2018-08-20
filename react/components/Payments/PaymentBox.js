import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { AddressSummary, AddressRules } from '@vtex/address-form'
import Elo from './flags/Elo'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PaymentBox = ({ intl, address }) => {
  return (
    <ContentBox>
      <div className="w5">
        <div className="mb7">
          <DataEntry label={intl.formatMessage({ id: 'payments.cardNumber' })}>
            <div className="flex items-center">
              <div className="h2 mr4">
                <Elo />
              </div>
              <span>**** **** **** 7462</span>
            </div>
          </DataEntry>
        </div>
        <DataEntry
          label={intl.formatMessage({ id: 'payments.billingAddress' })}
        >
          <div className="lh-copy">
            <AddressRules
              country={address.country}
              fetch={country =>
                import('@vtex/address-form/lib/country/' + country)
              }
            >
              {' '}
              <AddressSummary address={address} />
            </AddressRules>
          </div>
        </DataEntry>
      </div>
    </ContentBox>
  )
}

PaymentBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PaymentBox)
