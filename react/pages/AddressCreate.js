import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import Header from '../components/shared/Header'
import ErrorAlert from '../components/shared/ErrorAlert'
import AddressFormBox from '../components/Addresses/AddressFormBox'
import Loading from '../pages/Loading'
import GetName from '../graphql/getName.gql'

class AddressCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: false,
    }
  }

  goBack = () => {
    this.props.history.push('/addresses')
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  dismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { profile } = this.props
    const { shouldShowError } = this.state

    return (
      <section>
        <Header
          titleId={'pages.addressCreate'}
          backButtonId={'pages.addresses'}
          backButtonPath={'/addresses'}
          shouldAlwaysShowBackButton
        />
        <main className="mt6">
          {shouldShowError && (
            <div className="mb6 mw6 pr5-ns">
              <ErrorAlert onDismiss={this.dismissError} />
            </div>
          )}
          <AddressFormBox
            isNew
            onAddressSaved={this.goBack}
            onError={this.handleError}
            profile={profile}
          />
        </main>
      </section>
    )
  }
}

AddressCreate.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GetName),
  branch(({ data }) => data.loading, renderComponent(Loading)),
  withProps(({ data }) => ({ profile: data.profile })),
)
export default enhance(AddressCreate)
