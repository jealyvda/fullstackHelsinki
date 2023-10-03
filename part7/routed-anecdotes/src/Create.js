import { useField } from './hooks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })

      navigate('/')
    }
  
    const resetAll = (e) => {
      e.preventDefault()
      content.resetValue()
      author.resetValue()
      info.resetValue()
    }
  
    const selectedFields = useSelector(
      ({ input }) => ({
        type: input.type,
        value: input.value,
        onChange: input.onChange,
      })
    )
  
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...selectedFields(content)} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type='submit'>create</button>
          <button type='reset' onClick={resetAll}>reset</button>
        </form>
      </div>
    )
  
  }
  

export default CreateNew