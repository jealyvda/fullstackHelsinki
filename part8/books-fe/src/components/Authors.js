import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, SET_BORN } from '../queries';

let authors = []

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState(0)

  const results = useQuery(ALL_AUTHORS)

  const [ setBornTo ] = useMutation(SET_BORN, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  const submit = async (event) => {
    event.preventDefault()

    setBornTo({  variables: { author, bornTo: Number(born) } })

    setAuthor('')
    setBorn(0)
  }

  if (!props.show) {
    return null
  }

  if (results.loading) {
    return <div>loading...</div>
  } else {
    authors = results.data.allAuthors;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <div>
      <form onSubmit={submit}>
        <div>
          Author
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
            </select>
        </div>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
      </div>
    </div>
  )

}

export default Authors
