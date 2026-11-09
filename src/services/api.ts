export interface ApiProduct {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  image: string
}

export interface ApiOrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

export interface ApiOrder {
  id: string
  customerId: string
  items: ApiOrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled'
  createdAt: string
}

export interface ApiCustomer {
  id: string
  name: string
  email: string
  createdAt: string
}

interface ApiResponse<T> {
  data: T
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${path}`)
  }

  const result = (await response.json()) as ApiResponse<T>
  return result.data
}

export function getProducts() {
  return apiGet<ApiProduct[]>('/api/products')
}

export function getOrders() {
  return apiGet<ApiOrder[]>('/api/orders')
}

export function getCustomers() {
  return apiGet<ApiCustomer[]>('/api/customers')
}
