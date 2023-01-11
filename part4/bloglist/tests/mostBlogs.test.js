const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most blogs', () => {

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(helper.listWithALotOfBlogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })
})