import { Router } from 'express'
import {
  createCustomer,
  getAllCustomers,
  getCustomerById
} from '../data/customers.js'
import { createCustomerSchema } from '../types/customer.js'

export const customersRouter = Router()

customersRouter.get('/', (_req, res) => {
  res.status(200).json({ data: getAllCustomers() })
})

customersRouter.get('/:id', (req, res) => {
  const customer = getCustomerById(req.params.id)

  if (!customer) {
    res.status(404).json({ error: 'Customer not found' })
    return
  }

  res.status(200).json({ data: customer })
})

customersRouter.post('/', (req, res, next) => {
  try {
    const input = createCustomerSchema.parse(req.body)
    const customer = createCustomer(input)

    res.status(201).json({ data: customer })
  } catch (error) {
    next(error)
  }
})
