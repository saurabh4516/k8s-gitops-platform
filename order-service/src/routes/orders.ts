import { Router } from 'express'
import {
  createOrder,
  getAllOrders,
  getOrderById
} from '../data/orders.js'
import { createOrderSchema } from '../types/order.js'

export const ordersRouter = Router()

ordersRouter.get('/', (_req, res) => {
  res.status(200).json({ data: getAllOrders() })
})

ordersRouter.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id)

  if (!order) {
    res.status(404).json({ error: 'Order not found' })
    return
  }

  res.status(200).json({ data: order })
})

ordersRouter.post('/', (req, res, next) => {
  try {
    const input = createOrderSchema.parse(req.body)
    const order = createOrder(input)

    res.status(201).json({ data: order })
  } catch (error) {
    next(error)
  }
})
