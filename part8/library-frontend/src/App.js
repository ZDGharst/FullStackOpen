
import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { AUTHORS_AND_BOOKS, BOOK_ADDED } from './queries'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-app-token'))
  const [page, setPage] = useState('authors')
  const queryResult = useQuery(AUTHORS_AND_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: AUTHORS_AND_BOOKS })
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: AUTHORS_AND_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded), allAuthors: dataInStore.allAuthors }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      updateCacheWith(bookAdded)
    }
  })

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const pageToShow = () => {
    switch(page) {
      case 'authors':
        return <Authors authors={queryResult.data.allAuthors} token={token} />
      case 'books':
        return <Books books={queryResult.data.allBooks} />
      case 'recommended': {
        if(!token) setPage('authors')
        return <Recommended />
      }
      case 'add': {
        if(!token) setPage('authors')
        return <NewBook />
      }
      case 'login': {
        if(token) setPage('authors')
        return <LoginForm setToken={setToken} />
      }
      default:
        return null
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      {pageToShow()}
    </div>
  )
}

export default App