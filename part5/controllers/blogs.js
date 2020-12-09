const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenForm = request =>{
  const authorization = request.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('beared ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1})

      response.json(blogs)
  })
  
  blogsRouter.post('/',  async (request, response) => {
    const body = request.body

    const token = getTokenForm(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token||!decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)

    //const blog = new Blog(request.body)
    /*
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      */
  })
  
  blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err=>next(err))
  })

blogsRouter.put('/:id', (request, response, next)=>{
  const body = request.body

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  .then(updatedBlog =>{
    response.json(updatedBlog)
  })
  .catch(err=>next(err))

})


  module.exports = blogsRouter