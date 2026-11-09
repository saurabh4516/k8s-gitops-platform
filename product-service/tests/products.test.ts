import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import request from 'supertest'
import { app } from '../src/app.js'

describe('product-service API', () => {
  it('returns a healthy status', async () => {
    const response = await request(app).get('/health')

    assert.equal(response.status, 200)
    assert.deepEqual(response.body, {
      status: 'ok',
      service: 'product-service',
    })
  })

  it('returns all products', async () => {
    const response = await request(app).get('/api/products')

    assert.equal(response.status, 200)
    assert.equal(Array.isArray(response.body.data), true)
    assert.equal(response.body.data.length, 2)
  })

  it('returns a product by ID', async () => {
    const response = await request(app).get('/api/products/1')

    assert.equal(response.status, 200)
    assert.equal(response.body.data.id, 1)
    assert.equal(response.body.data.name, 'Aura Desk Lamp')
  })

  it('rejects an invalid product ID', async () => {
    const response = await request(app).get('/api/products/not-a-number')

    assert.equal(response.status, 400)
    assert.equal(response.body.error, 'Validation failed')
  })

  it('returns not found for an unknown product', async () => {
    const response = await request(app).get('/api/products/999')

    assert.equal(response.status, 404)
    assert.equal(response.body.error, 'Product 999 not found')
  })
})
