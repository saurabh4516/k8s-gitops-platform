import express from 'express'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { healthRouter } from './routes/health.js'
import { productsRouter } from './routes/products.js'

export const app = express()

app.use(express.json())
app.use('/health', healthRouter)
app.use('/api/products', productsRouter)
app.use(notFoundHandler)
app.use(errorHandler)
