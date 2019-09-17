declare module 'vtex.address-form/components' {
  export const AddressRules
  export const AddressContainer
  export const CountrySelector
  export const PostalCodeGetter
  export const AddressForm
  export const AutoCompletedFields
  export const AddressSubmitter
  export const GoogleMapsContainer
  export const Map
}

interface GoogleMapsContainerArgs {
  loading: boolean
  googleMaps: string
}
