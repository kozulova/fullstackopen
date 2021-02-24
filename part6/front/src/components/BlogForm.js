import React, {useState} from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogForm = ({updateBlogs, blogs}) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [message, setMessage] = useState(null)
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    const addBlog = (event) =>{
        event.preventDefault();
        const blogObject = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        blogService.create(blogObject)
        .then(returnedBlog=>{
            updateBlogs(blogs.concat(returnedBlog))
            setBlogTitle('');
            setBlogAuthor('')
            setBlogUrl('')
            setMessage('New Blog created')
            setBlogFormVisible(false)
        })
        setTimeout(() => {
            setMessage(null)
          }, 5000)
    }
    const handleTitleChange = (event) =>{
        setBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) =>{
        setBlogAuthor(event.target.value)
    }
   
    const handleUrlChange = (event) => {
        setBlogUrl(event.target.value)
    }

    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? 'block' : 'none' }

    return (
        <div>
        <Notification message={message}/>
        <div>
        <button onClick={()=>setBlogFormVisible(true)} style={hideWhenVisible}>Add blog</button>
        </div>
     <form onSubmit={addBlog} style={showWhenVisible}>
    Title
      <input type="text" placeholder="title" value={blogTitle} onChange={handleTitleChange}/>
      <br/>
     Author 
      <input type="text" placeholder="author" value={blogAuthor} onChange={handleAuthorChange}/>
      <br/>
      Url
      <input type="text" placeholder="url" value={blogUrl} onChange={handleUrlChange}/>
      <br/>
      <button type="submit">create</button>
      <button type="button" onClick={()=>setBlogFormVisible(false)}>Cancel</button>
    </form>
        </div>
    )
}

export default BlogForm
