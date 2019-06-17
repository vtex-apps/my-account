import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { addValidation } from 'vtex.address-form/helpers'
import {
  AddressContainer,
  CountrySelector,
  PostalCodeGetter,
  AddressForm,
  AutoCompletedFields,
  AddressRules,
  AddressSubmitter,
  GeolocationInput,
  GoogleMapsContainer,
  Map,
} from 'vtex.address-form/components'
import { StyleguideInput } from 'vtex.address-form/inputs'
import { AddressShape } from 'vtex.address-form/shapes'
import { compose } from 'recompose'

import { withSettings } from '../shared/withSettings'
import { withLocale } from '../shared/withLocale'

class AddressEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: addValidation(props.address),
    }
  }

  componentDidMount() {
    const { address } = this.props
    this.setState({
      address: addValidation(address),
    })
  }

  handleAddressChange = newAddress => {
    const address = {
      ...this.state.address,
      ...newAddress,
    }

    this.setState({ address })
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

    const validGeoCoords =
      address.geoCoordinates &&
      address.geoCoordinates.valid &&
      address.geoCoordinates.geolocationAutoCompleted

    const validPostalCode = isNew
      ? address.postalCode.valid && !address.postalCode.geolocationAutoCompleted
      : address.postalCode.value !== null

    const hasAutoCompletedFields = Object.keys(address).some(
      fieldName =>
        (address && address[fieldName].geolocationAutoCompleted) ||
        (address && address[fieldName].postalCodeAutoCompleted)
    )

    const shouldUseGoogleMaps =
      settings && settings.addresses && settings.addresses.useMap

    const mapsAPIKey =
      settings && settings.addresses && settings.addresses.apiKey

    const shipCountries = shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))

    const country =
      shipsTo && shipsTo.length > 0 ? shipsTo[0] : address.country.value

    return (
      <AddressRules country={country} shouldUseIOFetching>
        <AddressContainer
          address={address}
          Input={StyleguideInput}
          onChangeAddress={this.handleAddressChange}
          autoCompletePostalCode>
          <Fragment>
            <CountrySelector shipsTo={shipCountries} />

            {isNew && shouldUseGoogleMaps && !validPostalCode && (
              <GoogleMapsContainer apiKey={mapsAPIKey} locale={locale}>
                {({ loading, googleMaps }) => (
                  <Fragment>
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
                  </Fragment>
                )}
              </GoogleMapsContainer>
            )}

            {!validGeoCoords && <PostalCodeGetter />}

            {hasAutoCompletedFields && (
              <div className="pb7">
                <AutoCompletedFields>
                  <a className="c-link pointer">
                    <FormattedMessage id="address-form.edit" />
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
                  <FormattedMessage id={intlId} />
                </Button>
              )}
            </AddressSubmitter>
          </Fragment>
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
