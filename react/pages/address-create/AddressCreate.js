import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressCreateHeader from './AddressCreateHeader'
import AddressCreateLoading from './AddressCreateLoading'
import GenericError from '../../components/shared/GenericError'
import AddressFormBox from '../../components/Addresses/AddressFormBox'
import GetNewAddressData from '../../graphql/getNewAddressData.gql'
import ContentWrapper from '../shared/ContentWrapper'

class AddressCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: false,
    }
  }

  goBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  dismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { profile, shipsTo } = this.props
    const { shouldShowError } = this.state

    return (
      <ContentWrapper>
        <AddressCreateHeader />
        <main className="mt6">
          {shouldShowError && (
            <GenericError
              onDismiss={this.dismissError}
              errorId="alert.unknownError"
            />
          )}
          <AddressFormBox
            isNew
            onAddressSaved={this.goBack}
            onError={this.handleError}
            profile={profile}
            shipsTo={shipsTo}
          />
        </main>
      </ContentWrapper>
    )
  }
}

AddressCreate.propTypes = {
  profile: PropTypes.object.isRequired,
  shipsTo: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetNewAddressData),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressCreateLoading),
  ),
  withProps(({ data }) => ({
    profile: data.profile,
    shipsTo: data.logistics.shipsTo,
  })),
)
export default enhance(AddressCreate)
