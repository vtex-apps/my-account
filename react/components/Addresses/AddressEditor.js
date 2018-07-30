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
  AddressSubmitter,
} from '@vtex/address-form'
import StyleguideInput from '@vtex/address-form/lib/inputs/StyleguideInput'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'

class AddressEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      shipsTo: null,
    }
  }

  componentDidMount() {
    const { address } = this.props
    this.setState({
      address: addValidation(address),
      shipsTo: this.getShippingCountries(),
    })
  }

  getShippingCountries() {
    const { intl } = this.props
    return [
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
  }

  handleAddressChange = newAddress => {
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...newAddress,
      },
    }))
  }

  render() {
    const { isNew, isLoading, onSubmit, intl } = this.props
    const { address, shipsTo } = this.state
    const intlId = isNew ? 'addresses.addAddress' : 'addresses.saveAddress'

    if (!address) return null

    return (
      <AddressRules
        country={address.country.value}
        fetch={country => import('@vtex/address-form/lib/country/' + country)}
      >
        <AddressContainer
          address={address}
          onChangeAddress={this.handleAddressChange}
          Input={StyleguideInput}
          autoCompletePostalCode={true}
        >
          <div>
            <CountrySelector shipsTo={shipsTo} />
            <PostalCodeGetter />
            <AutoCompletedFields>
              <a>{intl.formatMessage({ id: 'address-form.edit' })}</a>
            </AutoCompletedFields>
            <AddressForm />
            <AddressSubmitter onSubmit={onSubmit}>
              {handleSubmit => (
                <Button
                  onClick={handleSubmit}
                  variation="secondary"
                  block
                  size="small"
                  isLoading={isLoading}
                >
                  {intl.formatMessage({ id: intlId })}
                </Button>
              )}
            </AddressSubmitter>
          </div>
        </AddressContainer>
      </AddressRules>
    )
  }
}

AddressEditor.propTypes = {
  isNew: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  address: AddressShape,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(AddressEditor)
