import { ServiceContext } from '@vtex/api'

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

const appId = process.env.VTEX_APP_ID

async function settings(_: unknown, __: unknown, ctx: ServiceContext) {
  const result = (await ctx.clients.apps.getAppSettings(appId)) as Settings

  return {
    useMap: result.addresses && result.addresses.useMap,
    showGenders: result.profile && result.profile.showGenders,
    showMyCards: result.cards && result.cards.showMyCards,
    showMyOrders: result.orders && result.orders.showMyOrders,
    showMyAddresses: result.addresses && result.addresses.showMyAddresses,
    showMyAuthentication: result.authentication && result.authentication.showMyAuthentication,
  }
}

interface Settings {
  addresses?: {
    useMap: boolean
    showMyAddresses: boolean
  }
  profile?: { showGenders: boolean }
  cards?: { showMyCards: boolean }
  orders?: { showMyOrders: boolean }
  authentication?: { showMyAuthentication: boolean }
}

export default settings
