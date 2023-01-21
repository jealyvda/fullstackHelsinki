const e = require("cors")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return undefined
  } else {
    const favBlog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const authorList = {}
    blogs.forEach((item) => {
      if (authorList[item.author]) {
        authorList[item.author] += 1
      } else {
        authorList[item.author] = 1
      }
    })
    return {
      author: Object.keys(authorList).reduce((a,b) => authorList[a] > authorList[b] ? a : b),
      blogs: Math.max(...Object.values(authorList))
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const authorList = {}
    blogs.forEach((item) => {
      if (authorList[item.author]) {
        authorList[item.author] += item.likes
      } else {
        authorList[item.author] = item.likes
      }
    })
    return {
      author: Object.keys(authorList).reduce((a,b) => authorList[a] > authorList[b] ? a : b),
      likes: Math.max(...Object.values(authorList))
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}