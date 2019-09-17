declare global {
  interface Constructable<T> {
    new (): T
  }
  interface Variables<A> {
    variables: A
  }

  interface DeleteAddressArgs {
    addressId: string
  }

  interface CreateAddressArgs {
    addressFields: AddressInput
  }

  interface UpdateAddressArgs {
    addressId: string
    addressFields: AddressInput
  }

  interface UpdateProfileArgs {
    profile: ProfileInput
  }

  interface UpdateProfilePicture {
    file: any
  }

  interface AddressInput {
    receiverName: string
    complement: string
    neighborhood: string
    country: string
    state: string
    number: string
    street: string
    geoCoordinates: number[]
    postalCode: string
    city: string
    reference: string
    addressName: string
    addressType: string
  }

  interface Address {
    addressId: string
    addressName?: string
    addressType: string
    city: string
    complement: string
    country: string
    neighborhood: string
    number: string
    postalCode: string
    geoCoordinates: number[]
    reference: string
    state: string
    street: string
    addressQuery: string | null
    receiverName: string
    __typename?: string
  }

  interface Runtime {
    culture: {
      country: string
    }
  }

  interface Profile {
    firstName: string
    lastName: string
    birthDate: string
    gender: string
    homePhone: string
    businessPhone: string
    document: string
    email: string
    tradeName: string
    corporateName: string
    corporateDocument: string
    stateRegistration: string
    isCorporate: string
    passwordLastUpdate?: string
  }

  interface ProfileInput {
    email: string
    firstName: string
    lastName: string
    document: string
    birthDate: string
    gender: string
    homePhone: string
    businessPhone: string
    corporateName: string
    corporateDocument: string
    stateRegistration: string
    isCorporate: boolean
  }

  interface Window {
    __RUNTIME__: {
      workspace: string
      account: string
    }
  }

  export const vtex: {
    orderListRendered: boolean
  }
}

export {}
