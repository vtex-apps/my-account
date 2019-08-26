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
    addressId: stirng
    addressType: string
    addressName: string
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
    addressQuery: string
  }
}

export {}
