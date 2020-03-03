import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    console.log('clicked')
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <div> {blog.likes} likes <button> like </button> </div>
      <div> Added by {blog.user.name} </div>
    </div>
  </div>
)}

export default Blog