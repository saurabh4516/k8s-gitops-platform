import express from 'express'
import { metricsMiddleware, register } from './metrics.js'
import { errorHandler } from './middleware/errorHandler.js'
import { healthRouter } from './routes/health.js'
import { ordersRouter } from './routes/orders.js'

export const app = express()

app.use(express.json())
app.use(metricsMiddleware)

app.use('/health', healthRouter)
app.use('/api/orders', ordersRouter)


app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)
