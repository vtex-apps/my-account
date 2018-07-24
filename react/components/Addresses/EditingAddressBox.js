import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'
import {
  addValidation,
  AddressContainer,
  CountrySelector,
  PostalCodeGetter,
  AddressForm,
  AutoCompletedFields,
  AddressRules,
} from '@vtex/address-form'
import CustomInput from '@vtex/address-form/lib/CustomInput'

import ContentBox from '../shared/ContentBox'
import emptyAddress from './emptyAddress'

class EditingAddressBox extends Component {
  constructor(props) {
    super(props)
    const baseAddress = this.props.isNew ? emptyAddress : this.props.address
    this.state = {
      address: addValidation(baseAddress),
    }
  }

  handleAddressChange = newAddress => {
    console.log('logging address change')
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...newAddress,
      },
    }))

    console.log(newAddress)
  }

  render() {
    const { isNew, intl } = this.props
    const saveMessage = isNew ? 'addresses.addAddress' : 'addresses.saveAddress'

    const { address } = this.state

    const shipsTo = [
      'ARG',
      'BOL',
      'BRA',
      'CAN',
      'CHL',
      'COL',
      'ECU',
      'ESP',
      'GTM',
      'MEX',
      'PER',
      'PRT',
      'PRY',
      'URY',
      'USA',
      'VEN',
    ].map(countryCode => ({
      label: intl.formatMessage({ id: 'country.' + countryCode }),
      value: countryCode,
    }))

    console.log(address.country.value)

    return (
      <ContentBox width={'third'}>
        <form>
          <AddressRules
            country={address.country.value}
            fetch={country =>
              import('@vtex/address-form/lib/country/' + country)
            }
          >
            <AddressContainer
              address={address}
              onChangeAddress={this.handleAddressChange}
              autoCompletePostalCode={true}
            >
              {onChangeAddress => (
                <div>
                  <CountrySelector
                    Input={CustomInput}
                    address={address}
                    shipsTo={shipsTo}
                    onChangeAddress={onChangeAddress}
                  />

                  <PostalCodeGetter
                    Input={CustomInput}
                    address={address}
                    onChangeAddress={onChangeAddress}
                  />

                  <AutoCompletedFields
                    address={address}
                    onChangeAddress={onChangeAddress}
                  >
                    <a
                      className="link-edit"
                      id="force-shipping-fields"
                      style={{ cursor: 'pointer' }}
                    >
                      {intl.formatMessage({ id: 'address-form.edit' })}
                    </a>
                  </AutoCompletedFields>

                  <AddressForm
                    Input={CustomInput}
                    address={address}
                    onChangeAddress={onChangeAddress}
                  />
                </div>
              )}
            </AddressContainer>
          </AddressRules>
          <Button type="submit" variation="secondary" block size="small">
            {intl.formatMessage({ id: saveMessage })}
          </Button>
        </form>
      </ContentBox>
    )
  }
}

EditingAddressBox.propTypes = {
  isNew: PropTypes.bool,
  intl: intlShape.isRequired,
}

export default injectIntl(EditingAddressBox)
