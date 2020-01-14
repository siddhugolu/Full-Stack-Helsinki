const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blogs')
const User = require('../models/user')

jest.setTimeout(30000)

describe('when dealing with blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log('Cleared')

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())

        await Promise.all(promiseArray)
    })

    describe('when some blogs are present in DB', () => {
        test('blogs are returned as json', async () => {

            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(helper.initialBlogs.length)
        })

        test('unique id property is named id', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body[0].id).toBeDefined()
        })
    })

    describe('checking for validity', () => {
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

        test('deleting a blog with valid id returns 204', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles).not.toContain(blogToDelete.title)
        })

        test.only('updating a blog with valid id works as expected', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const newBlogToUpdate = {
                title: blogToUpdate.title,
                author: blogToUpdate.author,
                url: blogToUpdate.url,
                likes: blogToUpdate.likes + 2
            }

            const updatedBlog = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(newBlogToUpdate)
                .expect(200)

            console.log(updatedBlog.body.likes)
            expect(updatedBlog.body.likes).toEqual(blogToUpdate.likes + 2)
        })
    })

})

describe('when dealing with users in DB', () => {
    beforeEach(async () => {
        await User.deleteMany()
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'siddhugolu',
            name: 'Siddhartha Golu',
            password: 'verySecretPassword',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'randomName',
            password: 'gibberish',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})