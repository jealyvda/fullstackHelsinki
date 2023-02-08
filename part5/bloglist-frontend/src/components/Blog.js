import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} >
        {blog.title} <br />
        {blog.author}
        <button onClick={toggleVisibility} id="view">view</button>
      </div>
      <div style={showWhenVisible} className="blogContent">
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.author} <br />
        {blog.url} <br />
        {blog.likes} <button onClick={updateLikes}>like</button><br />
        {(blog.user.username === user.username)
          ? <button onClick={removeBlog}>delete</button>
          : null}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Blog