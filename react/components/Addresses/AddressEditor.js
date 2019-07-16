import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { addValidation, injectRules } from 'vtex.address-form/helpers'
import {
  AddressContainer,
  CountrySelector,
  PostalCodeGetter,
  AddressForm,
  AutoCompletedFields,
  AddressSubmitter,
  GoogleMapsContainer,
  Map,
} from 'vtex.address-form/components'
import { StyleguideInput, GeolocationInput } from 'vtex.address-form/inputs'
import { AddressShape } from 'vtex.address-form/shapes'
import { compose } from 'recompose'

import { withLocale } from '../shared/withLocale'
import GET_STORE_CONFIGS from '../../graphql/getStoreConfigs.gql'

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
      locale,
      shipsTo,
      onSubmit,
      intl,
      rules,
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

    const mapsAPIKey =
      this.props.getStoreConfigs.storeConfigs &&
      this.props.getStoreConfigs.storeConfigs.googleMapsApiKey

    const shipCountries = shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))

    return (
      <AddressContainer
        address={address}
        Input={StyleguideInput}
        onChangeAddress={this.handleAddressChange}
        rules={mapsAPIKey && rules.geolocation}
        autoCompletePostalCode>
        <Fragment>
          <CountrySelector shipsTo={shipCountries} />

          {isNew && mapsAPIKey && !validPostalCode && (
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

          {(validGeoCoords || validPostalCode || !isNew) && (
            <AddressForm
              address={address}
              Input={StyleguideInput}
              onChangeAddress={this.handleAddressChange}
              notApplicableLabel={intl.formatMessage({
                id: 'addresses.notApplicable',
              })}
            />
          )}

          <AddressSubmitter onSubmit={onSubmit} rules={rules.geolocation}>
            {handleSubmit => (
              <Button
                onClick={handleSubmit}
                block
                size="small"
                isLoading={isLoading}
                disabled={!(validGeoCoords || validPostalCode || !isNew)}>
                <FormattedMessage id={intlId} />
              </Button>
            )}
          </AddressSubmitter>
        </Fragment>
      </AddressContainer>
    )
  }
}

AddressEditor.propTypes = {
  isNew: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  address: AddressShape,
  shipsTo: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}
const enhance = compose(
  injectRules,
  withLocale,
  injectIntl,
  graphql(GET_STORE_CONFIGS, { name: 'getStoreConfigs' })
)
export default enhance(AddressEditor)
