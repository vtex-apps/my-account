import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { EmptyState, Button } from 'vtex.styleguide'
import { withRouter, Link } from 'vtex.my-account-commons/Router'
import { withCssHandles } from 'vtex.css-handles'

import { withContentWrapper } from '../shared/withContentWrapper'
import AddressesLoading from '../loaders/AddressesLoading'
import AddressBox from '../Addresses/AddressBox'
import Toast from '../shared/Toast'
import GET_ADRESSES from '../../graphql/getAddresses.gql'

const CSS_HANDLES = ['addressBox'] as const

export const headerConfig = {
  titleId: 'vtex.store-messages@0.x::pages.addresses',
  headerContent: (
    <Link to="/addresses/new">
      <Button variation="primary" block size="small">
        <FormattedMessage id="vtex.store-messages@0.x::addresses.addAddress" />
      </Button>
    </Link>
  ),
}

function EmptyAddresses() {
  const title = (
    <FormattedMessage id="vtex.store-messages@0.x::addresses.notFound" />
  )

  return <EmptyState title={title} />
}

class Addresses extends Component<Props> {
  public state = {
    showToast: false,
  }

  public componentDidMount = () => {
    const { location } = this.props

    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  private handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  private handleStartEditing = (address: Address) => {
    this.props.history.push(`/addresses/edit/${address.addressId}`)
  }

  public render() {
    const { cssHandles } = this.props

    return (
      <div
        className={`${cssHandles.addressBox} flex flex-wrap-ns items-start-ns relative tl`}
      >
        {this.props.addresses.map(address => (
          <AddressBox
            key={address.addressId}
            address={address}
            onEditClick={() => this.handleStartEditing(address)}
          />
        ))}

        {this.state.showToast && (
          <Toast
            messageId="vtex.store-messages@0.x::alert.success"
            onClose={this.handleCloseToast}
          />
        )}
      </div>
    )
  }
}

interface Data {
  loading: boolean
  profile: {
    addresses: Address[]
  } | null
}

interface Props {
  location: any
  history: any
  addresses: Address[]
  cssHandles: CssHandles<typeof CSS_HANDLES>
}

const enhance = compose<Props, void>(
  graphql(GET_ADRESSES, { options: { fetchPolicy: 'network-only' } }),
  branch(
    ({ data }: { data: Data }) => data.loading,
    renderComponent(AddressesLoading)
  ),
  withContentWrapper({ headerConfig, handle: 'addressList' }),
  branch(
    ({ data }: { data: { profile: { addresses: Address[] } } }) =>
      data.profile == null || data.profile.addresses.length === 0,
    renderComponent(EmptyAddresses)
  ),
  withProps(({ data }: { data: Data }) => ({
    addresses: data.profile && data.profile.addresses,
  })),
  withRouter,
  withCssHandles(CSS_HANDLES)
)

export default enhance(Addresses)
