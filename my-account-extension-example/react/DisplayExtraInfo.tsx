import React, { FunctionComponent, ReactElement } from 'react'
import { Query } from 'react-apollo'

import INFO_QUERY from './graphql/getProfile.gql'

const DisplayExtraInfo: FunctionComponent<Props> = ({ render }) => {
  return (
    <Query query={INFO_QUERY}>
      {({ data, loading }: any) => {
        return render([
          {
            label: 'Loading',
            value: loading.toString(),
          },
          {
            label: 'ExtraInfo',
            value: data && data.profile ? data.profile.birthDate : 'Loading',
          },
        ])
      }}
    </Query>
  )
}

type Props = {
  render: (args: { label: string; value: string }[]) => ReactElement
}

export default DisplayExtraInfo
