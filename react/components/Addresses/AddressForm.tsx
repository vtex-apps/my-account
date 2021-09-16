import React, { Component, Fragment } from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose, branch, renderComponent } from 'recompose'
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
import { withRuntimeContext } from 'vtex.render-runtime'

import type { Result } from '../../graphql/storeConfigs.gql'
import STORE_CONFIGS from '../../graphql/storeConfigs.gql'
import Loading from '../loaders/FormContent'
import getEmptyAddress from './emptyAddress'

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
  constructor(props: InnerProps & OuterProps) {
    super(props)

    let address: Address

    if (props.address === undefined) {
      const { runtime, shipsTo, receiverName } = props

      const country = shipsTo.length > 0 ? shipsTo[0] : runtime.culture.country

      address = getEmptyAddress(country, receiverName ?? '')
    } else {
      address = props.address
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __typename, addressName, ...addressValues } = address

    const addressWithValidation = addValidation({
      addressQuery: null,
      ...addressValues,
    })

    // if editing an existing address (address id exists), all fields start as valid
    if (addressValues.addressId) {
      AUTO_COMPLETABLE_FIELDS.forEach(field => {
        if (addressWithValidation[field].value === null) return

        addressWithValidation[field].geolocationAutoCompleted = true
        addressWithValidation[field].postalCodeAutoCompleted = true
        addressWithValidation[field].valid = true
      })
    }

    this.state = { address: addressWithValidation }
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
      this.props.useGeolocation &&
      newAddress.addressQuery &&
      !AUTO_COMPLETABLE_FIELDS.some(
        field => newAddress[field]?.geolocationAutoCompleted
      )
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
      address.postalCode.geolocationAutoCompleted ?? address.postalCode.valid
    )
  }

  private hasAutoCompletedFields() {
    const { address } = this.state

    return AUTO_COMPLETABLE_FIELDS.some(
      fieldName =>
        address?.[fieldName].geolocationAutoCompleted ??
        address?.[fieldName].postalCodeAutoCompleted
    )
  }

  private translateCountries() {
    const { shipsTo, intl } = this.props

    return shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))
  }

  public render() {
    const { address } = this.state
    const { intl, submitLabelId, isLoading, googleMapsApiKey, useGeolocation } =
      this.props

    const shipCountries = this.translateCountries()
    const hasGeoCoords = this.hasGeoCoords()
    const hasValidPostalCode = this.hasValidPostalCode()
    const hasAutoCompletedFields = this.hasAutoCompletedFields()

    return (
      <AddressRules
        country={address.country.value}
        shouldUseIOFetching
        useGeolocation={useGeolocation}
      >
        <AddressContainer
          address={address}
          Input={StyleguideInput}
          onChangeAddress={this.handleAddressChange}
          autoCompletePostalCode
        >
          <Fragment>
            <CountrySelector shipsTo={shipCountries} />

            {useGeolocation && (
              <GoogleMapsContainer
                apiKey={googleMapsApiKey}
                locale={intl.locale}
              >
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

            {useGeolocation === false && <PostalCodeGetter />}

            {(hasGeoCoords || hasValidPostalCode) && (
              <Fragment>
                {hasAutoCompletedFields && (
                  <div className="mb7">
                    <AutoCompletedFields>
                      <span className="c-link pointer">
                        <FormattedMessage id="vtex.address-form@4.x::address-form.edit" />
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
                  disabled={!hasGeoCoords && !hasValidPostalCode}
                >
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

interface MappedResult {
  googleMapsApiKey?: string
  useGeolocation: boolean
  shipsTo: string[]
  loading: boolean
}

interface InnerProps extends InjectedIntlProps, MappedResult {
  runtime: Runtime
}

interface OuterProps {
  isLoading?: boolean
  submitLabelId: string
  address?: Address
  receiverName?: string
  onError: () => void
  onSubmit: (address: Address) => void
}

type Props = InnerProps & OuterProps

interface State {
  address: AddressFormFields
}

export default compose<Props, OuterProps>(
  graphql<
    Record<string, unknown>,
    Result,
    Record<string, unknown>,
    MappedResult
  >(STORE_CONFIGS, {
    props: ({ data }) => ({
      loading: data?.loading ?? false,
      googleMapsApiKey: data?.configs?.googleMapsApiKey,
      useGeolocation: data?.configs?.geolocation ?? false,
      shipsTo: data?.logistics?.shipsTo ?? [],
    }),
  }),
  branch<Props>(({ loading }) => loading, renderComponent(Loading)),
  withRuntimeContext,
  injectIntl
)(AddressForm)
