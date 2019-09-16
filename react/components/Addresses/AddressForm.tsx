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
  address: any
  shipsTo: unknown[]
  onError: unknown
  onSubmit: (address: Address) => void
}

interface State {
  address: any
}

class AddressForm extends Component<InnerProps & OuterProps, State> {
  public constructor(props: InnerProps & OuterProps) {
    super(props)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, addressName, ...addr } = props.address

    this.state = {
      address: addValidation({
        addressQuery: null,
        ...addr,
      }),
    }
  }

  private handleSubmit = (isValid: boolean, address: Address) => {
    const { onSubmit } = this.props

    if (isValid) {
      onSubmit(address)
    }
  }

  private handleAddressChange = (newAddress: Address) => {
    const address = {
      ...this.state.address,
      ...newAddress,
    }

    this.setState({ address })
  }

  private hasValidGeoCoords() {
    const { address } = this.state
    return (
      address.geoCoordinates &&
      address.geoCoordinates.valid &&
      address.geoCoordinates.geolocationAutoCompleted
    )
  }

  private hasValidPostalCode() {
    const { address } = this.state
    return address.postalCode.value !== null
  }

  private hasAutoCompletedFields() {
    const { address } = this.state
    return Object.keys(address).some(
      fieldName =>
        (address && address[fieldName].geolocationAutoCompleted) ||
        (address && address[fieldName].postalCodeAutoCompleted)
    )
  }

  private getLocalizedShipsTo() {
    const { shipsTo, intl } = this.props
    return shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))
  }

  public render() {
    const { address } = this.state
    const { intl, submitLabelId, isLoading, getStoreConfigs } = this.props

    const shipCountries = this.getLocalizedShipsTo()
    const hasValidGeoCoords = this.hasValidGeoCoords()
    const hasValidPostalCode = this.hasValidPostalCode()
    const hasAutoCompletedFields = this.hasAutoCompletedFields()

    const mapsAPIKey =
      getStoreConfigs.storeConfigs &&
      getStoreConfigs.storeConfigs.googleMapsApiKey

    const isGeolocation =
      getStoreConfigs.storeConfigs && getStoreConfigs.storeConfigs.geolocation

    return (
      <Fragment>
        <AddressRules country={address.country.value} shouldUseIOFetching>
          <AddressContainer
            address={address}
            Input={StyleguideInput}
            onChangeAddress={this.handleAddressChange}
            autoCompletePostalCode>
            <Fragment>
              <CountrySelector shipsTo={shipCountries} />

              {isGeolocation && (
                <GoogleMapsContainer apiKey={mapsAPIKey} locale={intl.locale}>
                  {({
                    loading,
                    googleMaps,
                  }: {
                    loading: boolean
                    googleMaps: string
                  }) => (
                    <Fragment>
                      <GeolocationInput
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
                      />

                      {hasValidGeoCoords && (
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

              {isGeolocation === false && <PostalCodeGetter />}

              {hasAutoCompletedFields && (
                <div className="pb7">
                  <AutoCompletedFields>
                    <span className="c-link pointer">
                      <FormattedMessage id="address-form.edit" />
                    </span>
                  </AutoCompletedFields>
                </div>
              )}

              {(hasValidGeoCoords || hasValidPostalCode) && (
                <AddressFields
                  address={address}
                  Input={StyleguideInput}
                  onChangeAddress={this.handleAddressChange}
                  notApplicableLabel={intl.formatMessage({
                    id: 'addresses.notApplicable',
                  })}
                />
              )}

              <AddressSubmitter onSubmit={this.handleSubmit}>
                {(handleSubmit: () => void) => (
                  <Button
                    onClick={handleSubmit}
                    block
                    size="small"
                    isLoading={isLoading}
                    disabled={!hasValidGeoCoords && !hasValidPostalCode}>
                    <FormattedMessage id={submitLabelId} />
                  </Button>
                )}
              </AddressSubmitter>
            </Fragment>
          </AddressContainer>
        </AddressRules>
      </Fragment>
    )
  }
}

export default compose<InnerProps & OuterProps, OuterProps>(
  graphql(GET_STORE_CONFIGS, { name: 'getStoreConfigs' }),
  injectIntl
)(AddressForm)
