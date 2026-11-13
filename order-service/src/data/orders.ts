import { randomUUID } from 'node:crypto'
import type { CreateOrderInput, Order } from '../types/order.js'

const orders: Order[] = []

export function getAllOrders(): Order[] {
  return orders
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id)
}

export function createOrder(input: CreateOrderInput): Order {
  const total = input.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  const order: Order = {
    id: randomUUID(),
    customerId: input.customerId,
    items: input.items,
    total: Number(total.toFixed(2)),
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  orders.push(order)
  return order
}
