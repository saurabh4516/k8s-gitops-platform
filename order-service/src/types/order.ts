import { z } from 'zod'

export const createOrderSchema = z.object({
  customerId: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      productName: z.string().min(1),
      quantity: z.number().int().positive(),
      unitPrice: z.number().nonnegative()
    })
  ).min(1)
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'cancelled'

export interface Order {
  id: string
  customerId: string
  items: CreateOrderInput['items']
  total: number
  status: OrderStatus
  createdAt: string
}
