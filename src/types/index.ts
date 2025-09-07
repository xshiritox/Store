export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  inStock: boolean
  rating?: number
  reviews?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Customer {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}