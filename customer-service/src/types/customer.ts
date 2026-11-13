import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email()
})

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>

export interface Customer {
  id: string
  name: string
  email: string
  createdAt: string
}
