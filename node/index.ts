import { Service, IOClients, ServiceContext } from '@vtex/api'

import settingsResolver from './resolvers/settings'

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

declare global {
  type Context = ServiceContext
}

export default new Service<IOClients>({
  graphql: {
    resolvers: {
      Query: {
        appSettings: settingsResolver,
      },
      AppSettings: {
        cacheId: () => process.env.VTEX_APP_ID,
      },
    },
  },
  /* This is necessary for sustaining compatibility with the environment `vtexcommerce`.
  It checks if the app is installed or not through this endpoint. DO NOT REMOVE IT! */
  routes: {
    enabled: (ctx: Context) => {
      ctx.response.status = 204
      ctx.response.body = 'My Account app is installed in this Store.'
    },
  },
})
