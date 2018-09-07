import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Trucks } from '.'

const app = () => express(apiRoot, routes)

let trucks

beforeEach(async () => {
  trucks = await Trucks.create({})
})

test('POST /trucks 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', locations: 'test', description: 'test', reviews: 'test', owner: 'test', hours: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.locations).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.reviews).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.hours).toEqual('test')
})

test('POST /trucks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trucks 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /trucks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trucks/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${trucks.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trucks.id)
})

test('GET /trucks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${trucks.id}`)
  expect(status).toBe(401)
})

test('GET /trucks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /trucks/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${trucks.id}`)
    .send({ access_token: masterKey, name: 'test', locations: 'test', description: 'test', reviews: 'test', owner: 'test', hours: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trucks.id)
  expect(body.name).toEqual('test')
  expect(body.locations).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.reviews).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.hours).toEqual('test')
})

test('PUT /trucks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trucks.id}`)
  expect(status).toBe(401)
})

test('PUT /trucks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', locations: 'test', description: 'test', reviews: 'test', owner: 'test', hours: 'test' })
  expect(status).toBe(404)
})

test('DELETE /trucks/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trucks.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /trucks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trucks.id}`)
  expect(status).toBe(401)
})

test('DELETE /trucks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
