import express from 'express'
import { metricsMiddleware, register } from './metrics.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { healthRouter } from './routes/health.js'
import { productsRouter } from './routes/products.js'

export const app = express()

app.use(express.json())
app.use(metricsMiddleware)
app.use('/health', healthRouter)
app.use('/api/products', productsRouter)

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

app.use(notFoundHandler)
app.use(errorHandler)
