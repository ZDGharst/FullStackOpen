
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { AUTHORS_AND_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const queryResult = useQuery(AUTHORS_AND_BOOKS)

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  const pageToShow = () => {
    switch(page) {
      case 'authors':
        return <Authors authors={queryResult.data.allAuthors} />
      case 'books':
        return <Books books={queryResult.data.allBooks} />
      case 'add':
        return <NewBook />
      case 'login':
        return <LoginForm />
      default:
        return null
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      {pageToShow()}
    </div>
  )
}

export default App