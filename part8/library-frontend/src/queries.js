import { gql } from '@apollo/client'

export const AUTHORS_AND_BOOKS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    author {
      name
    }
    published
  }
}
`

export const ME = gql`
query me($username: String!, $password: String!) {
  me {
    username
    favoriteGenre
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`


export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`
