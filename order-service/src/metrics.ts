import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client'
import type { RequestHandler } from 'express'

export const register = new Registry()

register.setDefaultLabels({
  service: 'order-service'
})

collectDefaultMetrics({ register })

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'] as const,
  registers: [register]
})

const requestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'] as const,
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register]
})

export const metricsMiddleware: RequestHandler = (req, res, next) => {
  if (req.path === '/metrics') {
    next()
    return
  }

  const endTimer = requestDuration.startTimer()

  res.on('finish', () => {
    const route = req.route?.path
      ? `${req.baseUrl}${req.route.path}`
      : 'unmatched'

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode)
    }

    requestCounter.inc(labels)
    endTimer(labels)
  })

  next()
}
