export default function getEmptyAddress(country: string) {
  return {
    addressId: '0',
    addressType: 'residential',
    city: null,
    complement: null,
    country: country,
    geoCoordinates: [],
    neighborhood: null,
    number: null,
    postalCode: null,
    receiverName: null,
    reference: null,
    state: null,
    street: null,
    addressQuery: null,
  }
}
