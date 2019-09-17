import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { GenericError } from 'vtex.my-account-commons'

import AddressEditLoading from '../loaders/AddressEditLoading'
import AddressForm from '../Addresses/AddressForm'
import AddressDeleter from '../Addresses/AddressDeleter'
import { withContentWrapper } from '../shared/withContentWrapper'
import ContentBox from '../shared/ContentBox'

import GET_ADDRESSES from '../../graphql/getAddresses.gql'
import UPDATE_ADDRESS from '../../graphql/updateAddress.gql'

import styles from '../../styles.css'

export const headerConfig = {
  namespace: `${styles.addressEdit}`,
  titleId: 'pages.addressEdit',
  backButton: {
    titleId: 'pages.addresses',
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
      return <GenericError errorId="alert.addressNotFound" />
    }

    const { addressName, ...normalizedAddress } = address

    const { street, number, neighborhood, city, state } = normalizedAddress
    normalizedAddress.addressQuery = `${street}, ${number} - ${neighborhood}, ${city} - ${state}`

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressForm
          isLoading={isLoading}
          submitLabelId="addresses.saveAddress"
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

interface Props {
  history: any
  addresses: Address[]
  addressId: string
  shipsTo: string[]
  updateAddress: (args: Variables<UpdateAddressArgs>) => Promise<void>
  handleError: () => void
}

const enhance = compose<Props, void>(
  withContentWrapper(headerConfig),
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
  }))
)
export default enhance(AddressEdit)
