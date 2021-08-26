declare module '*/customerGreeting.gql' {
  import type { DocumentNode } from 'graphql'
  import type { Profile } from 'vtex.store-graphql'

  export interface Result {
    profile: Pick<
      Profile,
      'firstName' | 'lastName' | 'profilePicture' | 'cacheId'
    >
  }

  const value: DocumentNode

  export default value
}
