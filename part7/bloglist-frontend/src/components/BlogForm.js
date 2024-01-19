import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h1>
      Create new
      </h1>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            id="title"
            name="Title"
            onChange={handleTitleChange}
            placeholder="title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            id="author"
            name="Author"
            onChange={handleAuthorChange}
            placeholder="author"
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            id="url"
            name="URL"
            onChange={handleUrlChange}
            placeholder="url"
          />
        </div>
        <button id="create-blog" type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm