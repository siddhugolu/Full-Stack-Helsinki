import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = () => {

    const newObject = { 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService.update(blog.id, newObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      })
  }

  const deleteBlog = () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b))
        })
    }
  }


  return (
  <div style={blogStyle}>
    <div onClick={toggleVisibility} style={hideWhenVisible}>
      {blog.title} ------> {blog.author}
    </div>
    <div onClick={toggleVisibility} style={showWhenVisible}>
      <div> {blog.title} </div>
      <div> {blog.author} </div>
      <div> {blog.url} </div>
      <div>
        {blog.likes} likes
        <button onClick={increaseLike}> like </button>
      </div>
      <div> Added by {blog.user.name} </div>
      { user.username === blog.user.username
        ? <div>
            <button onClick={deleteBlog}> delete </button>
          </div>
        : <div></div>
      }
      
    </div>
  </div>
)}

export default Blog