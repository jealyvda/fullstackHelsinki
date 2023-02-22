import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

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

  const vote = (anecdote) => {
    dispatch(voteOn(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3000))
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
              Votes: {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList