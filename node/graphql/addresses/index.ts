/* Mocked-up database */
const addresses = [
  {
    addressId: '10',
    addressType: 'residential',
    city: 'São Paulo',
    complement: 'ap. 102',
    country: 'BRA',
    geoCoordinates: [],
    neighborhood: 'Penha',
    number: '788',
    postalCode: '03612-000',
    receiverName: 'Gustavo Silva',
    reference: null,
    state: 'SP',
    street: 'R. Coronel Meireles',
    isDefault: true,
  },
  {
    addressId: '10',
    addressType: 'residential',
    city: 'Rio de Janeiro',
    complement: '',
    country: 'BRA',
    geoCoordinates: [],
    neighborhood: 'Flamengo',
    number: '96',
    postalCode: '22501-080',
    receiverName: 'Gustavo Silva',
    reference: null,
    state: 'SP',
    street: 'Av. Praia de Botafogo',
    isDefault: false,
  },
  {
    addressId: '10',
    addressType: 'residential',
    city: 'Cupertino',
    complement: '',
    country: 'USA',
    geoCoordinates: [],
    neighborhood: '',
    number: '1',
    postalCode: '95014',
    receiverName: 'Jony Ive',
    reference: null,
    state: 'CA',
    street: 'Infinite Loop',
    isDefault: false,
  },
]

export const Query = {
  addresses: (_, args, ctx) => {
    console.log('Pinged [addresses]')
    return addresses
  },
}

export const Mutation = {}

// export const resolvers = {
//   Mutation: {
//     addCar: (_, args, ctx) => {
//       console.log('[addCar] Received vtex context:', ctx.vtex)
//       console.log('[addCar] Received arguments:', args)
//       return cars[0]
//     },
//   },
//   Query: {
//     allCars: (_, args, ctx) => {
//       console.log('[allCars] Received vtex context:', ctx.vtex)
//       console.log('[allCars] Received arguments:', args)
//       return cars
//     },

//     carsByYear: (_, args, ctx) => {
//       console.log('[carsByYear] Received vtex context:', ctx.vtex)
//       console.log('[carsByYear] Received arguments:', args)
//       return cars.filter(car => car.year == args.year)
//     },
//   },
// }
