import { Query as AddressQuery } from './addresses'
import { Mutation as AddressMutation } from './addresses'

export const resolvers = {
  Mutation: {
    ...AddressMutation,
  },
  Query: {
    ...AddressQuery,
  },
}
