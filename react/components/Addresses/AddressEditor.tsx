import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
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
import { compose } from 'recompose'

import GET_STORE_CONFIGS from '../../graphql/getStoreConfigs.gql'

class AddressEditor extends Component<InnerProps & OutterProps, State> {
  public constructor(props: InnerProps & OutterProps) {
    super(props)

    this.state = {
      address: addValidation(props.address),
    }
  }

  public componentDidMount() {
    const { address } = this.props
    this.setState({
      address: addValidation(address),
    })
  }

  private handleAddressChange = (newAddress: Address) => {
    const address = {
      ...this.state.address,
      ...newAddress,
    }

    this.setState({ address })
  }

  public render() {
    const { isNew, isLoading, shipsTo, onSubmit, intl, rules } = this.props
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

    const isGeolocation =
      this.props.getStoreConfigs.storeConfigs &&
      this.props.getStoreConfigs.storeConfigs.geolocation

    const shipCountries = shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))

    const currentRules = isGeolocation && mapsAPIKey && rules.geolocation

    return (
      <AddressContainer
        address={address}
        Input={StyleguideInput}
        onChangeAddress={this.handleAddressChange}
        rules={currentRules}
        autoCompletePostalCode>
        <Fragment>
          <CountrySelector shipsTo={shipCountries} />

          {isNew && isGeolocation && !validPostalCode && (
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
                <span className="c-link pointer">
                  <FormattedMessage id="address-form.edit" />
                </span>
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

          <AddressSubmitter onSubmit={onSubmit} rules={currentRules}>
            {(handleSubmit: () => void) => (
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

interface State {
  address: any
}

interface InnerProps extends InjectedIntlProps {
  getStoreConfigs: {
    storeConfigs: {
      googleMapsApiKey: string
      geolocation: boolean
    }
  }
  rules: any
}

interface OutterProps {
  shipsTo: string[]
  isLoading: boolean
  isNew: boolean
  onSubmit: (valid: boolean, address: Address) => void
  address: Address
}

const enhance = compose<InnerProps & OutterProps, OutterProps>(
  injectRules,
  injectIntl,
  graphql(GET_STORE_CONFIGS, { name: 'getStoreConfigs' })
)

export default enhance(AddressEditor)
