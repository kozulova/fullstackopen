import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification' 
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
       setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () =>(
    <form onSubmit={handleLogin}>
    <Notification message={message}/>
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
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logOut = () =>{
    window.localStorage.clear()
    setUser(null)
  }



  const blogsList = () =>(
    <div>
    <p>{user.name} is logged in</p>
    <button onClick={logOut}>Logout</button>
    <br/>
    <br/>
    
    <BlogForm  updateBlogs={setBlogs} blogs={blogs}/>

    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlogs={setBlogs} listOfBlogs={blogs}/>
    )}

    </div>

  )

  return (

    <div>

    {user === null ? loginForm(): blogsList()}

    </div>
  )
}

export default App