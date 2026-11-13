import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from '../src/app.js'

test('GET /health returns healthy status', async () => {
  const response = await request(app).get('/health')

  assert.equal(response.status, 200)
  assert.equal(response.body.service, 'customer-service')
  assert.equal(response.body.status, 'healthy')
})

test('GET /api/customers returns customer list', async () => {
  const response = await request(app).get('/api/customers')

  assert.equal(response.status, 200)
  assert.ok(Array.isArray(response.body.data))
  assert.ok(response.body.data.length >= 2)
})

test('GET /api/customers/:id returns a customer', async () => {
  const response = await request(app).get('/api/customers/customer-001')

  assert.equal(response.status, 200)
  assert.equal(response.body.data.name, 'Olivia Martin')
})

test('POST /api/customers creates a customer', async () => {
  const response = await request(app)
    .post('/api/customers')
    .send({
      name: 'Saurabh Test',
      email: 'saurabh.test@example.com'
    })

  assert.equal(response.status, 201)
  assert.equal(response.body.data.name, 'Saurabh Test')
  assert.equal(response.body.data.email, 'saurabh.test@example.com')
})

test('POST /api/customers rejects invalid email', async () => {
  const response = await request(app)
    .post('/api/customers')
    .send({
      name: 'Test User',
      email: 'invalid-email'
    })

  assert.equal(response.status, 400)
  assert.equal(response.body.error, 'Validation failed')
})

test('GET /api/customers/:id returns 404 for unknown customer', async () => {
  const response = await request(app).get('/api/customers/unknown-customer')

  assert.equal(response.status, 404)
  assert.equal(response.body.error, 'Customer not found')
})
