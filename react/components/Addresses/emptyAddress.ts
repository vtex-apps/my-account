export default function getEmptyAddress(country: string, receiverName: string) {
  return {
    addressId: '',
    addressType: 'residential',
    city: null,
    complement: null,
    country,
    receiverName,
    geoCoordinates: [],
    neighborhood: null,
    number: null,
    postalCode: null,
    reference: null,
    state: null,
    street: null,
    addressQuery: null,
  }
}
