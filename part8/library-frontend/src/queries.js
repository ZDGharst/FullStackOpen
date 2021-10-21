import { gql } from '@apollo/client'

export const AUTHORS_AND_BOOKS = gql`
query {
  allAuthors {
    name
    born
    bookCount
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

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author
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