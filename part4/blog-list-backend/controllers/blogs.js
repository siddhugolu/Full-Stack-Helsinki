const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findOne()

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    try {
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
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
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