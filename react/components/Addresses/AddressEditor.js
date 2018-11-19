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
import { withSettings } from '../shared/withSettings'
import { withLocale } from '../shared/withLocale'
import { compose } from 'recompose'

class AddressEditor extends Component {
  state = {
    address: null,
  }

  componentDidMount() {
    const { address } = this.props
    this.setState({
      address: addValidation(address),
    })
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
    const {
      isNew,
      isLoading,
      settings,
      locale,
      shipsTo,
      onSubmit,
      intl,
    } = this.props
    const { address } = this.state
    const intlId = isNew ? 'addresses.addAddress' : 'addresses.saveAddress'

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
        address[fieldName].postalCodeAutoCompleted
    )

    const shouldUseGoogleMaps =
      settings && settings.addresses && settings.addresses.useMap

    const mapsAPIKey =
      settings && settings.addresses && settings.addresses.apiKey

    const shipCountries = shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))

    return (
      <AddressRules
        country={address.country.value}
        fetch={country => import(`@vtex/address-form/lib/country/${country}`)}>
        <AddressContainer
          address={address}
          onChangeAddress={this.handleAddressChange}
          Input={StyleguideInput}
          autoCompletePostalCode>
          <div>
            <CountrySelector shipsTo={shipCountries} />

            {isNew && shouldUseGoogleMaps && !validPostalCode && (
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
                  <a className="c-link pointer">
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
                  block
                  size="small"
                  isLoading={isLoading}
                  disabled={!(validGeoCoords || validPostalCode)}>
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
  shipsTo: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}
const enhance = compose(
  withSettings,
  withLocale,
  injectIntl
)
export default enhance(AddressEditor)
