export default function getEmptyAddress(
  country: string,
  profile: Partial<Profile>
) {
  let receiverName = profile.firstName ?? ''
  if (profile.lastName) {
    receiverName += ` ${profile.lastName}`
  }

  return {
    addressId: '',
    addressType: 'residential',
    city: null,
    complement: null,
    country,
    geoCoordinates: [],
    neighborhood: null,
    number: null,
    postalCode: null,
    receiverName,
    reference: null,
    state: null,
    street: null,
    addressQuery: null,
  }
}
