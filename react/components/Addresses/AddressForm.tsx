import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'

import {
  AddressContainer,
  AddressForm as AddressFields,
  AddressRules,
  AddressSubmitter,
  AutoCompletedFields,
  CountrySelector,
  GoogleMapsContainer,
  Map,
  PostalCodeGetter,
} from 'vtex.address-form/components'
import { Button } from 'vtex.styleguide'
import { addValidation } from 'vtex.address-form/helpers'
import { StyleguideInput, GeolocationInput } from 'vtex.address-form/inputs'

import GET_STORE_CONFIGS from '../../graphql/getStoreConfigs.gql'

const AUTO_COMPLETABLE_FIELDS = [
  'city',
  'geoCoordinates',
  'neighborhood',
  'number',
  'postalCode',
  'state',
  'street',
]

class AddressForm extends Component<InnerProps & OuterProps, State> {
  public constructor(props: InnerProps & OuterProps) {
    super(props)

    let { __typename, addressName, ...addressValues } = props.address

    const address = addValidation({
      addressQuery: null,
      ...addressValues,
    })

    // if editing an existing address (address id exists), all fields start as valid
    if (addressValues.addressId) {
      AUTO_COMPLETABLE_FIELDS.forEach(field => {
        if (address[field].value != null) {
          address[field].geolocationAutoCompleted = true
          address[field].postalCodeAutoCompleted = true
          address[field].valid = true
        }
      })
    }

    this.state = { address }
  }

  private handleSubmit = (isValid: boolean, address: Address) => {
    const { onSubmit } = this.props

    if (isValid) {
      onSubmit(address)
    }
  }

  private handleAddressChange = (newAddress: AddressFormFields) => {
    const curAddress = this.state.address

    // allow to edit only with geolocation component
    if (
      this.hasGeolocationPreference() &&
      newAddress.addressQuery &&
      !newAddress.addressQuery.geolocationAutoCompleted
    ) {
      AUTO_COMPLETABLE_FIELDS.forEach(field => {
        newAddress[field].value = null
        delete newAddress[field].valid
      })
    }

    const address = { ...curAddress, ...newAddress }
    this.setState({ address })
  }

  private hasGeoCoords() {
    const { address } = this.state
    return (
      address.geoCoordinates.geolocationAutoCompleted ||
      (Array.isArray(address.geoCoordinates.value) &&
        address.geoCoordinates.value.length === 2)
    )
  }

  private hasValidPostalCode() {
    const { address } = this.state
    return (
      address.postalCode.geolocationAutoCompleted || address.postalCode.valid
    )
  }

  private hasAutoCompletedFields() {
    const { address } = this.state
    return AUTO_COMPLETABLE_FIELDS.some(
      fieldName =>
        (address && address[fieldName].geolocationAutoCompleted) ||
        (address && address[fieldName].postalCodeAutoCompleted)
    )
  }

  private hasGeolocationPreference() {
    const { getStoreConfigs } = this.props
    return (
      getStoreConfigs.storeConfigs && getStoreConfigs.storeConfigs.geolocation
    )
  }

  private getLocalizedShipsTo() {
    const { shipsTo, intl } = this.props
    return shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))
  }

  private getMapsAPIKey() {
    const { getStoreConfigs } = this.props
    return (
      getStoreConfigs.storeConfigs &&
      getStoreConfigs.storeConfigs.googleMapsApiKey
    )
  }

  public render() {
    const { address } = this.state
    const { intl, submitLabelId, isLoading } = this.props

    const shipCountries = this.getLocalizedShipsTo()
    const mapsAPIKey = this.getMapsAPIKey()
    const prefersGeolocation = this.hasGeolocationPreference()
    const hasGeoCoords = this.hasGeoCoords()
    const hasValidPostalCode = this.hasValidPostalCode()
    const hasAutoCompletedFields = this.hasAutoCompletedFields()

    return (
      <AddressRules
        country={address.country.value}
        shouldUseIOFetching
        useGeolocation={prefersGeolocation}>
        <AddressContainer
          address={address}
          Input={StyleguideInput}
          onChangeAddress={this.handleAddressChange}
          autoCompletePostalCode>
          <Fragment>
            <CountrySelector shipsTo={shipCountries} />

            {prefersGeolocation && (
              <GoogleMapsContainer apiKey={mapsAPIKey} locale={intl.locale}>
                {({ loading, googleMaps }: GoogleMapsContainerArgs) => (
                  <Fragment>
                    {!hasAutoCompletedFields && (
                      <GeolocationInput
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
                      />
                    )}

                    {hasGeoCoords && (
                      <Map
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
                        mapProps={{ className: 'mb7 br2 h4' }}
                      />
                    )}
                  </Fragment>
                )}
              </GoogleMapsContainer>
            )}

            {prefersGeolocation === false && <PostalCodeGetter />}

            {(hasGeoCoords || hasValidPostalCode) && (
              <Fragment>
                {hasAutoCompletedFields && (
                  <div className="mb7">
                    <AutoCompletedFields>
                      <span className="c-link pointer">
                        <FormattedMessage id="address-form.edit" />
                      </span>
                    </AutoCompletedFields>
                  </div>
                )}
                <AddressFields
                  address={address}
                  Input={StyleguideInput}
                  onChangeAddress={this.handleAddressChange}
                  notApplicableLabel={intl.formatMessage({
                    id: 'vtex.store-messages@0.x::addresses.notApplicable',
                  })}
                />
              </Fragment>
            )}

            <AddressSubmitter onSubmit={this.handleSubmit}>
              {(handleSubmit: () => void) => (
                <Button
                  onClick={handleSubmit}
                  block
                  size="small"
                  isLoading={isLoading}
                  disabled={!hasGeoCoords && !hasValidPostalCode}>
                  <FormattedMessage id={submitLabelId} />
                </Button>
              )}
            </AddressSubmitter>
          </Fragment>
        </AddressContainer>
      </AddressRules>
    )
  }
}

interface InnerProps extends InjectedIntlProps {
  getStoreConfigs: {
    storeConfigs: {
      googleMapsApiKey: string
      geolocation: boolean
    }
  }
}

interface OuterProps {
  isLoading?: boolean
  submitLabelId: string
  address: Address
  shipsTo: string[]
  onError: () => void
  onSubmit: (address: Address) => void
}

interface State {
  address: AddressFormFields
}

export default compose<InnerProps & OuterProps, OuterProps>(
  graphql(GET_STORE_CONFIGS, { name: 'getStoreConfigs' }),
  injectIntl
)(AddressForm)
