const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('Cleared')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})