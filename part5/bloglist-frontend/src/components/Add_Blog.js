import React from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs,
    title, setTitle, handleTitleChange,
    author, setAuthor, handleAuthorChange,
    url, setUrl, handleUrlChange,
    setErrorMessage, setIsError }) => {
        
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
                setIsError(false)
                setErrorMessage(`A new blog ${title} added`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                setTitle('')
                setAuthor('')
                setUrl('')
              })
              .catch(error => {
                  setIsError(true)
                  setErrorMessage('title/author/url missing')
                  setTimeout(() => {
                      setErrorMessage(null)
                  }, 5000)
              })
        }

    return (
    <div>
      <h2> Create New </h2> 
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