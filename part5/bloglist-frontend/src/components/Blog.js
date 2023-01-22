import { useState } from 'react'

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
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} >
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url} <br />
        {blog.likes} <button onClick={updateLikes}>like</button><br />
        {blog.author} <br />
        {blog.user.username === user.username ? <button onClick={removeBlog}>delete</button> : null}
      </div>
    </div>  
)}

export default Blog