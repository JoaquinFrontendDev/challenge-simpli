export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  imageURL: string
  isMultiple: boolean
}

export interface Bike extends Product {}

export interface Accessory extends Product {}
