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

test('unique id property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid entry can be added', async () => {
    const newBlog = {
        title: "Testing the post api",
        author: "Siddhartha",
        url: "thelazyoxymoron.me",
        likes: 1,
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
        'Testing the post api'
    )
})

test('no likes in the request defaults to 0', async () => {
    const newBlog = {
        title: "Testing the default likes",
        author: "Siddhartha",
        url: "thelazyoxymoron.me",
    }

    await api.post('/api/blogs').send(newBlog)
    const addedBlog = await Blog.find({
        title: 'Testing the default likes'
    })
    console.log(addedBlog)
    expect(addedBlog[0].likes).toBe(0)
})

test('no title and url is bad request', async () => {
    const newBlog = {
        author: "Siddhartha",
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})