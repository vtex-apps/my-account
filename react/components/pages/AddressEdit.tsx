import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { ContentWrapper, GenericError } from 'vtex.my-account-commons'

import AddressEditLoading from '../loaders/AddressEditLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import GET_ADDRESS from '../../graphql/getAddresses.gql'
import styles from '../../styles.css'

export function headerConfig() {
  return {
    namespace: `${styles.addressEdit}`,
    titleId: 'pages.addressEdit',
    backButton: {
      titleId: 'pages.addresses',
      path: '/addresses',
    },
  }
}

class AddressEdit extends Component<Props> {
  private handleGoBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  public render() {
    const { addresses, addressId, shipsTo } = this.props
    const address = addresses.find(current => current.addressId === addressId)

    return (
      <ContentWrapper {...headerConfig()}>
        {({ handleError }: any) => (
          <Fragment>
            {address ? (
              <AddressFormBox
                isNew={false}
                address={address}
                onAddressSaved={this.handleGoBack}
                onAddressDeleted={this.handleGoBack}
                onError={handleError}
                shipsTo={shipsTo}
              />
            ) : (
              <GenericError errorId="alert.addressNotFound" />
            )}
          </Fragment>
        )}
      </ContentWrapper>
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
}

const enhance = compose<Props, void>(
  graphql(GET_ADDRESS),
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
