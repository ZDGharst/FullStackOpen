const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('POST user to API', () => {
  test('valid user to add', async () => {
    const user = {
      username: 'ValidUser',
      name: 'Valid User',
      password: 'secret'
    }

    await api.post('/api/users').set('Content-type', 'application/json').send(user).expect(201)
  
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

  test('username missing', async () => {
    const user = {
      name: 'Username Missing',
      password: 'secret'
    }

    await api.post('/api/users').set('Content-type', 'application/json').send(user).expect(400).expect({ error: 'User validation failed: username: Username must be given.' })
  
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(0)
  })

  test('username too short', async () => {
    const user = {
      username: 'sh',
      name: 'Too Short',
      password: 'secret'
    }

    await api.post('/api/users').set('Content-type', 'application/json').send(user).expect(400).expect({ error: 'User validation failed: username: Username too short.' })
  
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(0)
  })

  test('password missing', async () => {
    const user = {
      username: 'Bobby',
      name: 'Too Short'
    }

    await api.post('/api/users').set('Content-type', 'application/json').send(user).expect(400).expect({ error: 'User validation failed: password: Password must be given.' })
  
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(0)
  })

  test('password too short', async () => {
    const user = {
      username: 'PasswordTooShort',
      name: 'Too Short',
      password: 'sho'
    }

    await api.post('/api/users').set('Content-type', 'application/json').send(user).expect(400).expect({ error: 'User validation failed: password: Password too short.' })
  
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})