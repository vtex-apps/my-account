import { Service, IOClients, ServiceContext, RecorderState } from '@vtex/api'

import settingsResolver from './resolvers/settings'
import { getProcuratorData } from './resolvers/getProcuratorData'

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

declare global {
  type Context = ServiceContext
}

export default new Service<IOClients, RecorderState, Context>({
  graphql: {
    resolvers: {
      Query: {
        appSettings: settingsResolver,
        getProcuratorData,
      },
      AppSettings: {
        cacheId: () => process.env.VTEX_APP_ID,
      },
    },
  }
})
