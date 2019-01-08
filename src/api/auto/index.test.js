import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Auto } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, auto

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  auto = await Auto.create({ user })
})

test('POST /autos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', type: 'test', model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /autos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /autos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /autos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${auto.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(auto.id)
})

test('GET /autos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /autos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${auto.id}`)
    .send({ access_token: userSession, name: 'test', type: 'test', model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(auto.id)
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /autos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${auto.id}`)
    .send({ access_token: anotherSession, name: 'test', type: 'test', model: 'test' })
  expect(status).toBe(401)
})

test('PUT /autos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${auto.id}`)
  expect(status).toBe(401)
})

test('PUT /autos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', type: 'test', model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /autos/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${auto.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /autos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${auto.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /autos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${auto.id}`)
  expect(status).toBe(401)
})

test('DELETE /autos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
