import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { defineMessages } from 'react-intl'
import { branch, compose, renderComponent, withProps } from 'recompose'
import { GenericError } from 'vtex.my-account-commons'

import GET_ADDRESSES from '../../graphql/getAddresses.gql'
import UPDATE_ADDRESS from '../../graphql/updateAddress.gql'
import styles from '../../styles.css'
import AddressDeleter from '../Addresses/AddressDeleter'
import AddressForm from '../Addresses/AddressForm'
import AddressEditLoading from '../loaders/AddressEditLoading'
import ContentBox from '../shared/ContentBox'
import { withContentWrapper } from '../shared/withContentWrapper'

const messages = defineMessages({
  addressEdit: {
    id: 'pages.addressEdit',
    from: 'vtex.store-messages',
  },
  addresses: {
    id: 'pages.addresses',
    from: 'vtex.store-messages',
  },
  addressNotFound: {
    id: 'alert.addressNotFound',
    from: 'vtex.store-messages',
  },
  saveAddress: {
    id: 'addresses.saveAddress',
    from: 'vtex.store-messages',
  },
})

export const headerConfig = {
  namespace: `${styles.addressEdit}`,
  titleId: messages.addressEdit.id,
  backButton: {
    titleId: messages.addresses.id,
    path: '/addresses',
  },
}

class AddressEdit extends Component<Props> {
  private handleGoBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  public state = {
    isLoading: false,
  }

  private handleDelete = () => this.handleGoBack()

  private handleSave = (address: Address) => {
    const { updateAddress, handleError } = this.props
    const { addressId, addressQuery, ...addressFields } = address

    this.setState({ isLoading: true })

    updateAddress({
      variables: {
        addressId,
        addressFields: addressFields as AddressInput,
      },
    })
      .then(() => this.handleGoBack())
      .catch(() => {
        handleError()
        this.setState({ isLoading: false })
      })
  }

  public render() {
    const { isLoading } = this.state
    const { addresses, addressId, shipsTo } = this.props
    const address = addresses.find(current => current.addressId === addressId)

    if (!address) {
      return <GenericError errorId={messages.addressNotFound.id} />
    }

    const { addressName, ...normalizedAddress } = address

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressForm
          isLoading={isLoading}
          submitLabelId={messages.saveAddress.id}
          address={normalizedAddress}
          onSubmit={this.handleSave}
          shipsTo={shipsTo}
          onError={this.props.handleError}
        />
        <AddressDeleter
          addressId={addressId}
          onAddressDeleted={this.handleDelete}
          onError={this.props.handleError}
        />
      </ContentBox>
    )
  }
}

interface Data {
  profile: {
    addresses: Address[]
  }
  logistics: {
    shipsTo: string[]
  }
}

interface Props extends InjectedContentWrapperProps {
  history: any
  addresses: Address[]
  addressId: string
  shipsTo: string[]
  updateAddress: (args: Variables<UpdateAddressArgs>) => Promise<void>
}

const enhance = compose<Props, void>(
  graphql(GET_ADDRESSES),
  graphql(UPDATE_ADDRESS, { name: 'updateAddress' }),
  branch(
    ({ data }: { data: Data }) => data.profile == null,
    renderComponent(AddressEditLoading)
  ),
  withProps(({ data, match }: { data: Data; match: any }) => ({
    addresses: data.profile.addresses,
    addressId: match.params.id,
    shipsTo: data.logistics.shipsTo,
  })),
  withContentWrapper(headerConfig)
)
export default enhance(AddressEdit)
