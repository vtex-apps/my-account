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
          <DataEntry label={intl.formatMessage({ id: 'payments.holder' })}>
            {'Gustavo Henrique Faustino Silva'}
          </DataEntry>
        </div>
        <div className="mb7">
          <DataEntry>
            <div className="flex items-center">
              <div className="h2 mr4">
                <Elo />
              </div>
              <span>**** **** **** 7462</span>
            </div>
          </DataEntry>
        </div>
        <div className="mb7">
          <DataEntry label={intl.formatMessage({ id: 'payments.expiration' })}>
            {'10/2020'}
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
              <AddressSummary address={address} />
            </AddressRules>
          </div>
        </DataEntry>
      </div>
      {/* <div className="lighter black-40 lh-copy pv4 w5 h4">
        <AddressRules
          country={address.country}
          fetch={country => import('@vtex/address-form/lib/country/' + country)}
        >
          <AddressSummary address={address} />
        </AddressRules>
      </div> */}
    </ContentBox>
  )
}

PaymentBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PaymentBox)
