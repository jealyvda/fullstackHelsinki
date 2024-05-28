import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


let books = []

const Books = (props) => {
  const results = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null
  }


  if (results.loading) {
    return <div>loading...</div>
  } else {
    books = results.data.allBooks;
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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
