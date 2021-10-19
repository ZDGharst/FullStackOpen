
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { AUTHORS_AND_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const queryResult = useQuery(AUTHORS_AND_BOOKS)

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={queryResult.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={queryResult.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App