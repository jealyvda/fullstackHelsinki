import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'


let books = []
let genres = []

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const results = useQuery(ALL_BOOKS, {
    variables: {
      genre
    }
  });

  if (!props.show) {
    return null
  }


  if (results.loading) {
    return <div>loading...</div>
  } else {
    if (results.data) {
      books = results.data.allBooks;
      books.forEach((book) => book.genres.forEach((genre) => genres.push(genre)))
      genres = genres.filter((item, index) => genres.indexOf(item) === index)
    } else {
      console.log(results);
      books = [];
    }
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
    </div>
  )
}

export default Books
