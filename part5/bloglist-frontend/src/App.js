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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
 
  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogsToShow = () => {
    blogs.sort((a, b) => a.likes - b.likes)
    return blogs.map(blog =>
    <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
  )
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
    <Togglable buttonLabel='new note'>
      <BlogForm blogs={blogs} setBlogs={setBlogs}
            title={title} setTitle={setTitle} handleTitleChange={handleTitleChange}
            author={author} setAuthor={setAuthor} handleAuthorChange={handleAuthorChange}
            url={url} setUrl={setUrl} handleUrlChange={handleUrlChange}
            setErrorMessage={setErrorMessage}
            setIsError={setIsError}
        />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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
