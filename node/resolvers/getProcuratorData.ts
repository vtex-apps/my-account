import jwtDecode from 'jwt-decode'

interface CustomClaims {
  procurator_id: string
  procurator_email: string
  name: string
  buyer_organization_uuid: string
}

const getBuyerOrganizationData = (
  _cookies: Context['cookies'],
  account: string
): Record<string, string | Record<string, string>> => {
  const VTEX_ID_AUTH_COOKIE = `VtexIdclientAutCookie_${account}`
  const token = _cookies.get(VTEX_ID_AUTH_COOKIE)
  const payload = jwtDecode(token as string)

  return payload as Record<string, string | Record<string, string>>
}

export const getProcuratorData = async (
  _: any,
  _args: any,
  { cookies, vtex }: Context
) => {
  try {
    const cookiePayload = getBuyerOrganizationData(cookies, vtex.account)

    return cookiePayload.custom as unknown as CustomClaims
  } catch (e) {
    return null
  }
}
