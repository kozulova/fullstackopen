import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs, listOfBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '300px'
  }

  const addLike = (event)=>{
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
  }
  blogService.update(blog.id, blogObject)
  .then(response=>{
     updateBlogs(listOfBlogs.map(b=>b.id!==blog.id?b:response))
  })
  }
  
  const deleteBlog = (event)=>{
    event.preventDefault()
    blogService.deleteBlog(blog.id)
    .then(response=>{
      updateBlogs(listOfBlogs.filter(b=>b.id!==blog.id))
    })
  }

return (  
  <div style={blogStyle} className={blog}>
    <h4>{blog.title}</h4>
    <Togglable buttonLabel = "view">
     <p>{blog.url}</p>  
     <p>likes {blog.likes} <button onClick={addLike}>Like</button></p>
     <p>{blog.author}</p>
     <button onClick={deleteBlog} style={{backgroundColor: "blue"}}>remove</button>
     </Togglable>
  </div>
)

}



export default Blog
