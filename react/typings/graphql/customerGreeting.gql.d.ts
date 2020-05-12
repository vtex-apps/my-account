declare module '*/customerGreeting.gql' {
  import { DocumentNode } from 'graphql'
  import { Profile } from 'vtex.store-graphql'

  export interface Result {
    profile: Pick<
      Profile,
      'firstName' | 'lastName' | 'profilePicture' | 'cacheId'
    >
  }

  const value: DocumentNode

  export default value
}
