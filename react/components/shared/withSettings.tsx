import type { ComponentType } from 'react'
import React from 'react'
import { Query } from 'react-apollo'

import QUERY from '../../graphql/settings.gql'

export function withSettings(
  WrappedComponent: ComponentType<{ settings?: Settings }>
) {
  return function SettingsApplied(props: any) {
    return (
      <Query query={QUERY}>
        {({
          data: { loading, settings },
        }: {
          data: { settings: Settings; loading: boolean }
        }) => <WrappedComponent {...props} settings={!loading && settings} />}
      </Query>
    )
  }
}

export interface Settings {
  showGenders: boolean
  showMyCards: boolean | null
  showMyOrders: boolean | null
  showMyAddresses: boolean | null
  useMap: boolean
}
