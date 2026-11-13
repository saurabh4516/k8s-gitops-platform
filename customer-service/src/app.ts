import express from 'express'
import { errorHandler } from './middleware/errorHandler.js'
import { healthRouter } from './routes/health.js'
import { customersRouter } from './routes/customers.js'

export const app = express()

app.use(express.json())
app.use('/health', healthRouter)
app.use('/api/customers', customersRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)
