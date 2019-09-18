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
    addressQuery: string | null
    addressType: string
    addressName?: string
    city: string
    complement: string
    country: string
    neighborhood: string
    number: string
    postalCode: string
    geoCoordinates: number[]
    receiverName: string
    reference: string
    state: string
    street: string
    __typename?: string
  }

  interface AddressFormFields {
    [key: string]: {
      value: null | string | number | number[]
      valid?: boolean
      geolocationAutoCompleted?: boolean
      postalCodeAutoCompleted?: boolean
    }
  }

  interface Runtime {
    account: string
    culture: {
      country: string
    }
  }

  interface ContentWrapperProps {
    handleError: () => void
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
