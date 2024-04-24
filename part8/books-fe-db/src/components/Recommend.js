import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

let books = []

const Recommend = (props) => {
    const {loading: loadingMe, data: dataMe} = useQuery(ME)

    const bookResults = useQuery(ALL_BOOKS, {
        variables: {
            genre: dataMe ? dataMe.me.favoriteGenre : null
        },
        skip: !dataMe
    });

  if (!props.show) {
    return null
  }


  if (loadingMe || bookResults.loading) {
    return <div>loading...</div>
  } else {
    if (bookResults.data) {
      books = bookResults.data.allBooks;
    } else {
      console.log(bookResults);
      books = [];
    }
  }


  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{dataMe.me.favoriteGenre}</b></p>

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
    </div>
  )
}

export default Recommend
