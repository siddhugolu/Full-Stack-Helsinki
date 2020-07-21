import React, { useState, useEffect } from 'react';
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Add_Blog'
import Togglable from './components/Togglable'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = React.createRef()
 
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogsToShow = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs.map(blog =>
    <Blog key={blog.id} blog={blog} setBlogs={setBlogs}
        blogs={blogs} user={user}
        increaseLike={() => increaseLikeOf(blog)}
        deleteBlog={() => deleteBlogOf(blog)}
        />
  )
}

const addBlog = (blogObject) => {
  blogFormRef.current.toggleVisibility()
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setIsError(false)
      setErrorMessage(`A new blog ${blogObject.title} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
    .catch(error => {
      setIsError(true)
      setErrorMessage('title/author/url missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: 
        <input type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value) } />
        
      </div>
      <div>
        password: 
        <input type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value) } />
      </div>
      <button type="submit"> Login </button> 
    </form>
  )

  const addNewBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const increaseLikeOf = (blog) => {

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

  const deleteBlogOf = (blog) => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b))
        })
    }
  }

  return (
    <div>
      <h1> Blog Application </h1>

      <Notification message={errorMessage} isFailure={isError}/>

      { user === null ?
          <div>
            <h2> Log in to application </h2>
            { loginForm() }
          </div> :
          <div>
            {user.name} logged in
            <button onClick={logout}>
              logout
            </button>

            { addNewBlogForm() }
            <h2> Blogs </h2>
            {  blogsToShow() }
            
          </div>

      }

    </div>
  )
}

export default App;
