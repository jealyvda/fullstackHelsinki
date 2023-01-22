import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccesMessage(`${user.name} is succesfully logged in!`)
      setTimeout(() => {
        setSuccesMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    setSuccesMessage(`${user.name} is succesfully logged out.`)
    setTimeout(() => {
      setSuccesMessage(null)
    }, 5000)

    setUser(null)

    window.localStorage.clear()
  }

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      setSuccesMessage(`${createdBlog.title} by ${createdBlog.author} is succesfully added`)
      setTimeout(() => {
        setSuccesMessage(null)
      }, 5000);
  } catch(exception) {
    setErrorMessage(
      'Can not add blog'
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }}

  const blogOverview = () => (
    <div>
      <h1>
        Blogs
      </h1>
      <p>
        {user.name} logged in
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      </p>
      <BlogForm createBlog={createBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} type={'error'} />
      <Notification message={succesMessage} type={'succes'} />
      {user === null ?
        loginForm() :
        blogOverview()
      }
    </div>
  )
}

export default App