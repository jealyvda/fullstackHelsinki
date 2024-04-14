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
        author {
          name
        },
        published,
        genres
        }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    author {
      name
      born
      bookCount
    }
    genres
    published
    title
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`