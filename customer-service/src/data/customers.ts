import { randomUUID } from 'node:crypto'
import type { CreateCustomerInput, Customer } from '../types/customer.js'

const customers: Customer[] = [
  {
    id: 'customer-001',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'customer-002',
    name: 'Liam Johnson',
    email: 'liam.johnson@example.com',
    createdAt: '2026-02-15T10:00:00.000Z'
  }
]

export function getAllCustomers(): Customer[] {
  return customers
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id)
}

export function createCustomer(input: CreateCustomerInput): Customer {
  const customer: Customer = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    createdAt: new Date().toISOString()
  }

  customers.push(customer)
  return customer
}
