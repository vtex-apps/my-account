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

class AddressEditor extends Component {
  static contextTypes = {
    getSettings: PropTypes.func,
  }

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
    const mapSettings = this.context.getSettings('vtex.my-account')

    if (!address) return null

    const validGeoCoords =
      address.geoCoordinates.valid &&
      address.geoCoordinates.geolocationAutoCompleted

    const validPostalCode = isNew
      ? address.postalCode.valid && !address.postalCode.geolocationAutoCompleted
      : address.postalCode.value !== null

    const hasAutoCompletedFields = Object.keys(address).some(
      fieldName =>
        address[fieldName].geolocationAutoCompleted ||
        address[fieldName].postalCodeAutoCompleted,
    )

    const locale = global.__RUNTIME__.culture.locale

    const shouldUseGoogleMaps =
      mapSettings && mapSettings.addresses && mapSettings.addresses.useMap

    const mapsAPIKey =
      mapSettings && mapSettings.addresses && mapSettings.addresses.apiKey

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
              shouldUseGoogleMaps &&
              !validPostalCode && (
                <GoogleMapsContainer apiKey={mapsAPIKey} locale={locale}>
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
                            className: 'mb7 br2 h4',
                          }}
                        />
                      )}
                    </div>
                  )}
                </GoogleMapsContainer>
              )}

            {!validGeoCoords && <PostalCodeGetter />}

            {hasAutoCompletedFields && (
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
  /** Whether the form is being used for a new address or an existing one */
  isNew: PropTypes.bool.isRequired,
  /** Whether the form should display a 'loading' state */
  isLoading: PropTypes.bool.isRequired,
  /** The address currently being worked on */
  address: AddressShape,
  /** Callback for form submission */
  onSubmit: PropTypes.func.isRequired,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(AddressEditor)
