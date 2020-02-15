import React from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs,
    title, setTitle, handleTitleChange,
    author, setAuthor, handleAuthorChange,
    url, setUrl, handleUrlChange }) => {
        
        const addBlog = (event) => {
            event.preventDefault()
            const blogObject = {
              title: title,
              author: author,
              url: url
        }
        
        blogService.create(blogObject)
              .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setTitle('')
                setAuthor('')
                setUrl('')
              })
        }

    return (
    <div>
      <form onSubmit={addBlog}>
        title: <input value={title} onChange={handleTitleChange}/>
        <div> author: <input value={author} onChange={handleAuthorChange} /> </div>
        <div> url: <input value={url} onChange={handleUrlChange} /> </div>
        <button type='submit'> Create </button>
      </form>
    </div>
    )
}

export default BlogForm