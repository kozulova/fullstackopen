const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initalBloges = [
    {
    title: "dssddds",
    author: "dsddsd",
    url: "dsdssdsd",
    likes: 4
    },
    {
    title: "dfdfsdffds",
    author: "sfsfs",
    url: "sfsfsf",
    likes: 4
    }
]

beforeEach(async ()=>{
    await Blog.deleteMany({})
    let blogObject = new Blog(initalBloges[0])
    await blogObject.save()

    blogObject = new Blog(initalBloges[1])
    await blogObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(2)
})

test('a valid blog was added', async () => {
    const newBlog = {
        title: "testtest",
        author: "testauthor",
        url: "url.com",
        likes: 10
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initalBloges.length + 1)
    expect(titles).toContain(
        'testtest'
    )

})

afterAll(() => {
  mongoose.connection.close()
})