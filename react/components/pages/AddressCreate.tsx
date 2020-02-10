import queryString from 'query-string'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { defineMessages } from 'react-intl'
import { branch, compose, renderComponent, withProps } from 'recompose'
import { withRuntimeContext } from 'vtex.render-runtime'

import CREATE_ADDRESS from '../../graphql/createAddress.gql'
import GET_NEW_ADDRESS_DATA from '../../graphql/getNewAddressData.gql'
import styles from '../../styles.css'
import AddressForm from '../Addresses/AddressForm'
import getEmptyAddress from '../Addresses/emptyAddress'
import AddressCreateLoading from '../loaders/AddressCreateLoading'
import ContentBox from '../shared/ContentBox'
import { withContentWrapper } from '../shared/withContentWrapper'

const messages = defineMessages({
  addressCreate: {
    id: 'pages.addressCreate'
    from: 'vtex.store-messages',
  },
  addresses: {
    id: 'pages.addresses'
    from: 'vtex.store-messages',
  },
  addAddress: {
    id: 'addresses.addAddress'
    from: 'vtex.store-messages',
  }
})

export const headerConfig = {
  namespace: `${styles.addressCreate}`,
  titleId: messages.addressCreate.id,
  backButton: {
    titleId: messages.addresses.id,
    path: '/addresses',
  },
}

class AddressCreate extends Component<Props, State> {
  public state = {
    isLoading: false,
  }

  private handleGoBack = () => {
    const { history } = this.props

    const parsed = queryString.parse(history.location.search)

    history.push(
      parsed.returnUrl ? parsed.returnUrl : '/addresses?success=true'
    )
  }

  private handleCreate = (address: Address) => {
    const { createAddress, handleError } = this.props
    const { addressId, addressQuery, ...addressFields } = address

    this.setState({ isLoading: true })

    createAddress({
      variables: {
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
    const { runtime, shipsTo, profile } = this.props

    const country =
      shipsTo && shipsTo.length > 0 ? shipsTo[0] : runtime.culture.country

    const address = getEmptyAddress(country, profile)

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressForm
          address={address}
          isLoading={isLoading}
          submitLabelId={messages.addAddress.id}
          onSubmit={this.handleCreate}
          shipsTo={shipsTo}
          onError={this.props.handleError}
        />
      </ContentBox>
    )
  }
}

interface Data {
  profile: Profile
  logistics: {
    shipsTo: string[]
  }
}

interface Profile {
  firstName: string
  lastName: string
}

interface Props extends InjectedContentWrapperProps {
  profile: Profile
  shipsTo: string[]
  history: any
  runtime: Runtime
  createAddress: (args: Variables<CreateAddressArgs>) => Promise<void>
}

interface State {
  isLoading: boolean
}

const enhance = compose<Props, void>(
  graphql(GET_NEW_ADDRESS_DATA),
  graphql(CREATE_ADDRESS, { name: 'createAddress' }),
  branch(
    ({ data }: { data: Data }) => data.profile == null,
    renderComponent(AddressCreateLoading)
  ),
  withProps(({ data }: { data: Data }) => ({
    profile: data.profile,
    shipsTo: data.logistics.shipsTo,
  })),
  withContentWrapper(headerConfig),
  withRuntimeContext
)

export default enhance(AddressCreate)
