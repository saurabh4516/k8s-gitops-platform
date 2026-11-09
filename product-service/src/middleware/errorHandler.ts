import type { ErrorRequestHandler, RequestHandler } from 'express'
import { ZodError } from 'zod'

export class NotFoundError extends Error {
  readonly statusCode = 404

  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const notFoundHandler: RequestHandler = (_request, _response, next) => {
  next(new NotFoundError('Route not found'))
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: 'Validation failed',
      details: error.flatten().fieldErrors,
    })
    return
  }

  if (error instanceof NotFoundError) {
    response.status(error.statusCode).json({ error: error.message })
    return
  }

  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
}
