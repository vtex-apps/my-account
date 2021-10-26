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
  }
}

interface Settings {
  addresses?: { useMap: boolean }
  profile?: { showGenders: boolean }
  cards?: { showMyCards: boolean }
  orders?: { showMyOrders: boolean }
}

export default settings
