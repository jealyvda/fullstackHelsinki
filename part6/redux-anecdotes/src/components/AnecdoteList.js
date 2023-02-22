import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
    )
    } else {
      return state.anecdotes
    }
  })

  
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    await dispatch(voteOn(anecdote.id))
    await dispatch(setNotification(anecdote.content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 3000)
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a,b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList