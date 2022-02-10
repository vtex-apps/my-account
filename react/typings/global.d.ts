declare global {
  type CssHandlesInput = readonly string[]
  type ValueOf<T extends readonly any[]> = T[number]
  type CssHandles<T extends CssHandlesInput> = Record<ValueOf<T>, string>

  interface Constructable<T> {
    new (): T
  }
  interface Variables<A> {
    variables: A
  }

  interface DeleteAddressArgs {
    addressId: string
  }

  interface SetOptInNewsletterArgs {
    email: string
    isNewsletterOptIn: boolean
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
    [key: string]: any
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
    query: Record<string, string> | undefined
    rootPath: string | undefined
  }

  interface InjectedContentWrapperProps {
    handleError: () => void
  }

  interface ContentWrapperProps {
    namespace?: string
    titleId: string
    backButton?: {
      titleId: string
      path: string
    }
    headerContent?: (handle: any) => JSX.Element
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
    customFields?: CustomFields[]
  }

  interface CustomFields {
    key: string
    value: string
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
