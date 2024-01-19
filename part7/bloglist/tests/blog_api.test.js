const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({
    username: 'root',
    name: 'og',
    blogs: [],
    passwordHash
  })
  await user.save()

  await Blog.deleteMany({})

  const users = await User.find({})
  const userId = users[0]._id

  const blogObjects = helper.listWithALotOfBlogs.map(blog => new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: userId.toString(),
    likes: blog.likes ? blog.likes : 0
  }))
  const promiseArray = blogObjects.map(blog => {
    blog.save()
    user.blogs = user.blogs.concat(blog._id)
  })
  await Promise.all(promiseArray)
  await user.save()
})


describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('unique identifier is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 10000)

  test('succesfully updated the likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: Math.random() })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(blogsAtEnd).toHaveLength(helper.listWithALotOfBlogs.length)
    expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)
  })
})

describe('creating a blogpost', () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: 'root',
      password: 'password'
    }
    const loginUser = await api
      .post('/api/login')
      .send(user)
    
    headers = {'Authorization': `bearer ${loginUser.body.token}`}
  })

  test('new blog post can be created', async () => {
    const users = await helper.usersInDb()
    
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: users[0].id
    } 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithALotOfBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )

  })

  test('likes set to zero if missing', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      userId: users[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithALotOfBlogs.length + 1)
    
    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes[likes.length-1]).toEqual(0)

    })

  test('missing title 400', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      userId: users[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

  }, 10000)

  test('missing url 400', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 7,
      userId: users[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
  }, 100000)
})

describe('deletion of a blogpost', () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: 'root',
      password: 'password'
    }
    const loginUser = await api
      .post('/api/login')
      .send(user)
    
    headers = {'Authorization': `bearer ${loginUser.body.token}`}
  })
  
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const notesAtEnd = await helper.blogsInDb()
    expect(notesAtEnd).toHaveLength(
      helper.listWithALotOfBlogs.length - 1
    )

    //assuming the title of the deleted note doesn't occur elsewhere
    const titles = notesAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jealyvdak',
      name: 'Jealy van den Aker',
      password: 'hi'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must have a minimum length of 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ja',
      name: 'Jealy van den Aker',
      password: 'hihisecret000'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username`')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

