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

import {
  GeolocationInput,
  GoogleMapsContainer,
  Map,
} from '@vtex/address-form/lib/geolocation'
import StyleguideInput from '@vtex/address-form/lib/inputs/StyleguideInput'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'
import countryCodes from './countryCodes'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAjfT_MsnlHoxFmr7qw6fdTJhDm17e02EI'

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
    return countryCodes.map(countryCode => ({
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

    const validGeoCoords =
      address.geoCoordinates.valid &&
      address.geoCoordinates.geolocationAutoCompleted

    const validPostalCode = isNew
      ? address.postalCode.valid && !address.postalCode.geolocationAutoCompleted
      : address.postalCode.value !== null

    const locale = global.__RUNTIME__.culture.locale

    return (
      <AddressRules
        country={address.country.value}
        fetch={country => import('@vtex/address-form/lib/country/' + country)}
      >
        <AddressContainer
          address={address}
          onChangeAddress={this.handleAddressChange}
          Input={StyleguideInput}
          autoCompletePostalCode
        >
          <div>
            <CountrySelector shipsTo={shipsTo} />

            {isNew &&
              !validPostalCode && (
                <GoogleMapsContainer
                  apiKey={GOOGLE_MAPS_API_KEY}
                  locale={locale}
                >
                  {({ loading, googleMaps }) => (
                    <div>
                      <GeolocationInput
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
                      />

                      {validGeoCoords && (
                        <Map
                          loadingGoogle={loading}
                          googleMaps={googleMaps}
                          mapProps={{
                            className: 'mb7 br2',
                            style: {
                              height: '120px',
                            },
                          }}
                        />
                      )}
                    </div>
                  )}
                </GoogleMapsContainer>
              )}

            {!validGeoCoords && <PostalCodeGetter />}

            {(validGeoCoords || validPostalCode) && (
              <div className="pb7">
                <AutoCompletedFields>
                  <a className="blue pointer">
                    {intl.formatMessage({ id: 'address-form.edit' })}
                  </a>
                </AutoCompletedFields>
              </div>
            )}

            {(validGeoCoords || validPostalCode) && <AddressForm />}

            <AddressSubmitter onSubmit={onSubmit}>
              {handleSubmit => (
                <Button
                  onClick={handleSubmit}
                  variation="secondary"
                  block
                  size="small"
                  isLoading={isLoading}
                  disabled={!(validGeoCoords || validPostalCode)}
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
  isNew: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  address: AddressShape,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(AddressEditor)
