import { Router } from 'express'
import { z } from 'zod'
import { products } from '../data/products.js'
import { NotFoundError } from '../middleware/errorHandler.js'

const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const productsRouter = Router()

productsRouter.get('/', (_request, response) => {
  response.json({ data: products })
})

productsRouter.get('/:id', (request, response, next) => {
  try {
    const { id } = productIdSchema.parse(request.params)
    const product = products.find((candidate) => candidate.id === id)

    if (!product) {
      throw new NotFoundError(`Product ${id} not found`)
    }

    response.json({ data: product })
  } catch (error) {
    next(error)
  }
})
