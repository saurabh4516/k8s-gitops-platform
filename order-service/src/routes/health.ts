import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.status(200).json({
    service: 'order-service',
    status: 'healthy'
  })
})
