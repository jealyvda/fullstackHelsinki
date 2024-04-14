import { gql } from '@apollo/client'

export const SET_BORN = gql`
mutation setBornTo(
    $author: String!,
    $bornTo: Int!
) {
    editAuthor(name: $author, setBornTo: $bornTo) {
      name
      born
    }
  }
`

export const NEW_BOOK = gql`
mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
) { 
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
        ) {
        title,
        author,
        published,
        genres
        }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    author
    title
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`