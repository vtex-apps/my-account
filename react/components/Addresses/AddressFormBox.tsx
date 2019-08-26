import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { withRuntimeContext } from 'render'
import { AddressRules } from 'vtex.address-form/components'

import CREATE_ADDRESS from '../../graphql/createAddress.gql'
import UPDATE_ADDRESS from '../../graphql/updateAddress.gql'
import ContentBox from '../shared/ContentBox'
import getEmptyAddress from './emptyAddress'
import AddressEditor from './AddressEditor'
import AddressDeleter from './AddressDeleter'

function generateRandomName() {
  return (1 + Math.random()).toString(36).substring(2)
}

class AddressFormBox extends Component<InnerProps & OutterProps> {
  public state = {
    isLoading: false,
  }

  public static defaultProps = {
    isNew: false,
  }

  private prepareAddress = (address: any) => {
    const { profile } = this.props

    let defaultReceiver
    if (profile) {
      defaultReceiver = profile.firstName || ''

      if (profile.lastName) defaultReceiver += ` ${profile.lastName}`
    }

    const { __typename, ...addr } = address

    return {
      ...addr,
      addressQuery: null,
      receiverName: addr.receiverName || defaultReceiver,
    }
  }

  private reshapeAddress = (address: Address): AddressInput => {
    const { isNew } = this.props

    const { addressId, addressQuery, ...reshapedAddr } = address

    const result = {
      ...reshapedAddr,
    }

    if (isNew) result.addressName = generateRandomName()

    return result
  }

  private handleSubmit = (valid: boolean, address: Address) => {
    if (!valid) return

    const {
      createAddress,
      updateAddress,
      isNew,
      onAddressSaved,
      onError,
    } = this.props
    const { addressId } = address
    const addressFields = this.reshapeAddress(address)

    this.setState({ isLoading: true })

    const promise = isNew
      ? createAddress({ variables: { addressFields } })
      : updateAddress({ variables: { addressId, addressFields } })

    promise
      .then(() => {
        this.setState({ isLoading: false })
        onAddressSaved()
      })
      .catch(() => {
        this.setState({ isLoading: false })
        onError()
      })
  }

  public render() {
    const { onAddressDeleted, isNew, shipsTo, onError, runtime } = this.props
    const country =
      shipsTo && shipsTo.length > 0 ? shipsTo[0] : runtime.culture.country
    const emptyAddress = getEmptyAddress(country)
    const baseAddress = isNew ? emptyAddress : this.props.address

    if (!baseAddress) return null

    const address = {
      ...this.prepareAddress(baseAddress),
      country: country,
    }

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressRules country={country} shouldUseIOFetching>
          <AddressEditor
            address={address}
            isNew={isNew}
            isLoading={this.state.isLoading}
            onSubmit={this.handleSubmit}
            shipsTo={shipsTo}
          />
        </AddressRules>
        {!isNew && onAddressDeleted && (
          <AddressDeleter
            addressId={address.addressId}
            onAddressDeleted={onAddressDeleted}
            onError={onError}
          />
        )}
      </ContentBox>
    )
  }
}

interface OutterProps {
  isNew: boolean
  onAddressDeleted?: () => void
  onAddressSaved: () => void
  onError: () => void
  profile?: { firstName: string; lastName?: string }
  address?: Address
  shipsTo: string[]
}

interface InnerProps {
  createAddress: (args: Variables<CreateAddressArgs>) => Promise<void>
  updateAddress: (args: Variables<UpdateAddressArgs>) => Promise<void>
  runtime: {
    culture: {
      country: string
    }
  }
}

const enhance = compose<InnerProps & OutterProps, OutterProps>(
  graphql(UPDATE_ADDRESS, { name: 'updateAddress' }),
  graphql(CREATE_ADDRESS, { name: 'createAddress' }),
  withRuntimeContext
)

export default enhance(AddressFormBox)
