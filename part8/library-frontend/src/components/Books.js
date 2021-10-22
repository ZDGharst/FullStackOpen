import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ books }) => {
  const [genreFilter, setGenreFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [ getBooks, booksResults] = useLazyQuery(BOOKS_BY_GENRE, { fetchPolicy: "no-cache" })

  useEffect(() => {
    if(genreFilter) {
      getBooks({ variables: { genre: genreFilter }})
    } else {
      getBooks()
    }
    if(booksResults.data) {
      booksResults.refetch()
    }
  }, [genreFilter]) //eslint-disable-line
  console.log(booksResults)

  /* Builder for button labels for genre filter. */
  useEffect(() => {
    const genreDict = {}
    books.forEach(b => b.genres.forEach(g =>
      genreDict[g] = true
    ))

    let genreBuilder = []
    for(const key in genreDict) {
      genreBuilder.push(key)
    }
    genreBuilder.sort()

    setGenres(genreBuilder)
  }, [books])

  if(!booksResults.data) {
    return (
      <div>
        <h2>Books</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      <table style={{ marginBottom: 10 }}>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksResults.data.allBooks
            .filter(b => !genreFilter || b.genres.includes(genreFilter))
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <button onClick={() => setGenreFilter('')}>all genres</button>
      {genres.map(g =>
        <button key={g} onClick={() => setGenreFilter(g)} style={{ marginLeft: 5 }}>
          {g}
        </button>)
      }
    </div>
  )
}

export default Books