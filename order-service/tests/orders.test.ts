import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from '../src/app.js'

test('GET /health returns healthy status', async () => {
  const response = await request(app).get('/health')

  assert.equal(response.status, 200)
  assert.equal(response.body.service, 'order-service')
  assert.equal(response.body.status, 'healthy')
})

test('POST /api/orders creates an order', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({
      customerId: 'customer-001',
      items: [
        {
          productId: 'product-001',
          productName: 'Aura Desk Lamp',
          quantity: 2,
          unitPrice: 1200
        }
      ]
    })

  assert.equal(response.status, 201)
  assert.equal(response.body.data.customerId, 'customer-001')
  assert.equal(response.body.data.total, 2400)
  assert.equal(response.body.data.status, 'pending')
})

test('GET /api/orders returns the order list', async () => {
  const response = await request(app).get('/api/orders')

  assert.equal(response.status, 200)
  assert.ok(Array.isArray(response.body.data))
  assert.ok(response.body.data.length >= 1)
})

test('GET /api/orders/:id returns 404 for an unknown order', async () => {
  const response = await request(app).get('/api/orders/unknown-order')

  assert.equal(response.status, 404)
  assert.equal(response.body.error, 'Order not found')
})

test('POST /api/orders rejects invalid order data', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({
      customerId: '',
      items: []
    })

  assert.equal(response.status, 400)
  assert.equal(response.body.error, 'Validation failed')
})
