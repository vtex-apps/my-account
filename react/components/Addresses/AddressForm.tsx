import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import {
  AddressContainer,
  AddressForm as AddressFields,
  AddressSubmitter,
  AddressRules,
  CountrySelector,
  PostalCodeGetter,
  AutoCompletedFields,
} from 'vtex.address-form/components'
import { Button } from 'vtex.styleguide'
import { addValidation } from 'vtex.address-form/helpers'
import { StyleguideInput, GeolocationInput } from 'vtex.address-form/inputs'

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

class AddressForm extends Component<InjectedIntlProps & OuterProps, State> {
  public constructor(props: OuterProps & InjectedIntlProps) {
    super(props)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, addressName, ...addr } = props.address

    this.state = {
      address: addValidation({
        ...addr,
        addressQuery: null,
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

  public render() {
    const { address } = this.state
    const { intl, shipsTo, submitLabelId, isLoading } = this.props

    const shipCountries = shipsTo.map(code => ({
      label: intl.formatMessage({ id: `country.${code}` }),
      value: code,
    }))

    const validGeoCoords =
      address.geoCoordinates &&
      address.geoCoordinates.valid &&
      address.geoCoordinates.geolocationAutoCompleted

    const validPostalCode = address.postalCode.value !== null

    const hasAutoCompletedFields = Object.keys(address).some(
      fieldName =>
        (address && address[fieldName].geolocationAutoCompleted) ||
        (address && address[fieldName].postalCodeAutoCompleted)
    )

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

              <PostalCodeGetter />

              {hasAutoCompletedFields && (
                <div className="pb7">
                  <AutoCompletedFields>
                    <span className="c-link pointer">
                      <FormattedMessage id="address-form.edit" />
                    </span>
                  </AutoCompletedFields>
                </div>
              )}

              {(validGeoCoords || validPostalCode) && (
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
                    disabled={!validGeoCoords && !validPostalCode}>
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

export default injectIntl(AddressForm)
