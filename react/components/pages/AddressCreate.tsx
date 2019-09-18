import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import queryString from 'query-string'
import { withRuntimeContext } from 'vtex.render-runtime'

import { withContentWrapper } from '../shared/withContentWrapper'
import AddressCreateLoading from '../loaders/AddressCreateLoading'
import AddressForm from '../Addresses/AddressForm'
import ContentBox from '../shared/ContentBox'
import getEmptyAddress from '../Addresses/emptyAddress'

import CREATE_ADDRESS from '../../graphql/createAddress.gql'
import GET_NEW_ADDRESS_DATA from '../../graphql/getNewAddressData.gql'

import styles from '../../styles.css'

export const headerConfig = {
  namespace: `${styles.addressCreate}`,
  titleId: 'pages.addressCreate',
  backButton: {
    titleId: 'pages.addresses',
    path: '/addresses',
  },
}

class AddressCreate extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    const { runtime, shipsTo, profile } = props

    const country =
      shipsTo && shipsTo.length > 0 ? shipsTo[0] : runtime.culture.country

    this.state = {
      isLoading: false,
      address: getEmptyAddress(country, profile),
    }
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
    const { isLoading, address } = this.state
    const { shipsTo } = this.props

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressForm
          address={address}
          isLoading={isLoading}
          submitLabelId="addresses.addAddress"
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
  address: any
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
