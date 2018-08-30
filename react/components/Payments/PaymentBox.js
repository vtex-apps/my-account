import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { AddressSummary, AddressRules } from '@vtex/address-form'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'
import { PaymentFlagPicker } from 'vtex.payment-flags'

const PaymentBox = ({ payment, intl }) => {
  const lastDigits = payment.cardNumber.replace(/[^\d]/g, '')

  return (
    <ContentBox>
      <div className="w5 h5">
        <div className="mb7">
          <DataEntry label={intl.formatMessage({ id: 'payments.cardNumber' })}>
            <div className="flex items-center">
              <PaymentFlagPicker paymentSystem={payment.paymentSystem}>
                {FlagComponent =>
                  FlagComponent && (
                    <div className="h2 mr4">
                      <FlagComponent />
                    </div>
                  )
                }
              </PaymentFlagPicker>
              <span>**** **** **** {lastDigits}</span>
            </div>
          </DataEntry>
        </div>
        {payment.address && (
          <DataEntry
            label={intl.formatMessage({ id: 'payments.billingAddress' })}
          >
            <div className="lh-copy">
              <AddressRules
                country={payment.address.country}
                fetch={country =>
                  import('@vtex/address-form/lib/country/' + country)
                }
              >
                <AddressSummary address={payment.address} />
              </AddressRules>
            </div>
          </DataEntry>
        )}
      </div>
    </ContentBox>
  )
}

PaymentBox.propTypes = {
  payment: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(PaymentBox)
