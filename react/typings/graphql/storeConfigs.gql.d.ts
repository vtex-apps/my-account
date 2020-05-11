declare module '*/storeConfigs.gql' {
  import { DocumentNode } from 'graphql'

  export interface Result {
    configs: {
      geolocation: boolean
      googleMapsApiKey?: string
    }
    logistics: {
      shipsTo: string[]
    }
  }

  const value: DocumentNode
  export default value
}
