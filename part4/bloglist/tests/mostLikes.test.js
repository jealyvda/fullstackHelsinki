const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most likes', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(helper.listWithALotOfBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })
})