declare module '*/saveAddress.gql' {
  import type { DocumentNode } from 'graphql'
  import type { Address } from 'vtex.store-graphql'
  import { MutationSaveAddressArgs as Args } from 'vtex.store-graphql'

  interface Result {
    saveAddress: Pick<Address, 'id' | 'cacheId'>
  }

  const value: DocumentNode

  export { Args, Result }
  export default value
}
