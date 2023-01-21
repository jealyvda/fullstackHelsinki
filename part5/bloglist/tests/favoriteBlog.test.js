const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blog', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(helper.listWithALotOfBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
  test('when list has only one blog, equals that one', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })
}
)