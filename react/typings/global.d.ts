import { ComponentType } from 'react'

declare global {
  interface Constructable<T> {
    new (): T
  }

  interface A {
    a: string
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
    city: string | null
    complement: string | null
    country: string
    neighborhood: string | null
    number: string | null
    postalCode: string | null
    geoCoordinates: number[] | null
    receiverName: string
    reference: string | null
    state: string | null
    street: string | null
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
    culture: {
      country: string
    }
  }

  interface InjectedContentWrapperProps {
    handleError: () => void
  }

  interface ContentWrapperProps {
    namespace: string
    titleId: string
    backButton?: {
      titleId: string
      path: string
    }
    headerContent?: JSX.Element
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
    vtex: {
      orderListRendered?: boolean
    }
  }
}

export {}
