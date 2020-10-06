import SplunkEvents from 'splunk-events'

const splunkEvents = new SplunkEvents()

splunkEvents.config({
  endpoint: 'https://splunk-heavyforwarder-public.vtex.com:8088',
  token: 'feee5906-39b2-43a5-bb46-b927b8e01da3',
})

export function logGeneralErrors(error: unknown, info: unknown) {
  const { account } = window.__RUNTIME__

  splunkEvents.logEvent(
    'Critical',
    'Error',
    'MyAccount',
    'MyAccountGeneralError',
    {
      error: JSON.stringify(error),
      info: JSON.stringify(info),
    },
    account
  )
}
