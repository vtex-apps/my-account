import React, { Component } from 'react'
import { graphql, MutationResult, DataValue } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import queryString from 'query-string'
import { withRouter, RouteComponentProps } from 'vtex.my-account-commons/Router'

import { withContentWrapper } from '../shared/withContentWrapper'
import AddressCreateLoading from '../loaders/AddressCreateLoading'
import AddressForm from '../Addresses/AddressForm'
import ContentBox from '../shared/ContentBox'
import SAVE_ADDRESS, {
  Args,
  Result as SaveAddressResult,
} from '../../graphql/saveAddress.gql'
import CREATE_ADDRESS_INFO, {
  Result as CustomerInfo,
} from '../../graphql/customerGreeting.gql'

export const headerConfig = {
  titleId: 'vtex.store-messages@0.x::pages.addressCreate',
  backButton: {
    titleId: 'vtex.store-messages@0.x::pages.addresses',
    path: '/addresses',
  },
}

function buildReceiverName(profile: CustomerInfo['profile']): string {
  const lastName = profile.lastName ? ` ${profile.lastName}` : ''

  return `${profile.firstName ?? ''}${lastName}`
}

class AddressCreate extends Component<Props> {
  public state = {
    isLoading: false,
  }

  private handleCreate = (address: Address) => {
    const { saveAddress, handleError, history, location } = this.props
    const { addressId, addressQuery, ...addressFields } = address

    this.setState({ isLoading: true })

    saveAddress({
      variables: {
        address: { ...addressFields } as AddressInput,
      },
    })
      .then(({ data }) => {
        const parsed = queryString.parse(location.search)

        if (parsed.returnUrl && data) {
          history.push({
            pathname: parsed.returnUrl,
            search: queryString.stringify({
              newAddressId: data.saveAddress.id,
            }),
          })
        } else {
          history.goBack()
        }
      })
      .catch(() => {
        handleError()
        this.setState({ isLoading: false })
      })
  }

  public render() {
    const { isLoading } = this.state
    const { receiverName } = this.props

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressForm
          receiverName={receiverName}
          isLoading={isLoading}
          submitLabelId="vtex.store-messages@0.x::addresses.addAddress"
          onSubmit={this.handleCreate}
          onError={this.props.handleError}
        />
      </ContentBox>
    )
  }
}

interface MappedResult {
  loading: boolean
  receiverName: string
  data: DataValue<unknown>
}

type Props = MappedResult &
  RouteComponentProps &
  InjectedContentWrapperProps & {
    saveAddress: (
      args: Variables<Args>
    ) => Promise<MutationResult<SaveAddressResult>>
  }

const enhance = compose<Props, void>(
  graphql<
    Record<string, unknown>,
    CustomerInfo,
    Record<string, unknown>,
    MappedResult
  >(CREATE_ADDRESS_INFO, {
    props: props => ({
      loading: props.data?.loading ?? true,
      data: props.data as DataValue<unknown>,
      receiverName: props.data?.profile
        ? buildReceiverName(props.data?.profile)
        : '',
    }),
  }),
  branch(
    ({ loading }: Props) => loading,
    renderComponent(AddressCreateLoading)
  ),
  graphql(SAVE_ADDRESS, { name: 'saveAddress' }),
  withContentWrapper({ headerConfig, handle: 'addressCreate' }),
  withRouter
)

export default enhance(AddressCreate)
