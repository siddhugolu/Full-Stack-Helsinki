const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog
            .findById(request.params.id)
            .populate('user', { username: 1, name: 1 })
        if(blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        if(!body.title && !body.url) {
            response.status(400).end()
        }
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())

    } catch(exception) {
        next(exception)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {

    try {
        const blog = await Blog.findById(request.params.id)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if( !request.token || !decodedToken.id ) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if(blog.user.toString() === decodedToken.id.toString()) {
            console.log('user matched! Deleting the blog...')
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        }
        else {
            return response.status(401).json({ error: 'invalid access, user not the owner of the blog' })
        }
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {

    try {
        const updatedBlog =
            await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
        console.log(updatedBlog)
        response.json(updatedBlog.toJSON())

    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter