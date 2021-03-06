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
    genres
    id
  }
}
`

export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const ME = gql`
query me {
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
    author {
      name
    }
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

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`