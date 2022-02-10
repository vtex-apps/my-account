export const getBindingAddrQuery = (runtime: Runtime) => {
  const { query: { __bindingAddress: bindingAddress = null } = {} } = runtime

  return new URLSearchParams({
    ...(bindingAddress && { __bindingAddress: bindingAddress }),
  }).toString()
}

const getAbsReturnUrl = (runtime: Runtime) => {
  const { rootPath = '' } = runtime

  const bindingAddrQuery = getBindingAddrQuery(runtime)
  const query = bindingAddrQuery ? `?${bindingAddrQuery}` : ''
  const path = rootPath !== '' ? rootPath : '/'

  return new URL(`${path}${query}`, window.location.href).href
}

const getRedirectLogout = (runtime: Runtime) => {
  const { account, rootPath = '' } = runtime

  const absReturnUrl = getAbsReturnUrl(runtime)

  const searchParams = new URLSearchParams({
    scope: account,
    returnUrl: absReturnUrl,
  }).toString()

  return () =>
    window.location.assign(`${rootPath}/api/vtexid/pub/logout?${searchParams}`)
}

export default getRedirectLogout
