import React, { useEffect } from "react"
import { useLazyQuery, useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from "../queries"

const Recommended = () => {
  const queryFavoriteGenre = useQuery(ME)
  const [ getBooks, booksResults] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if(queryFavoriteGenre.data) {
      getBooks({ variables: { genre: queryFavoriteGenre.data.me.favoriteGenre }})
    }
  }, [queryFavoriteGenre.data]) //eslint-disable-line

  if (!booksResults.data) {
    return (
    <div>
      <h2>Recommended Books</h2>
      <p>Loading...</p>
    </div>
    )
  }

  return (
    <div>
      <h2>Recommended Books</h2>

      <p>Recommendations based on your favorite genre, <strong>{queryFavoriteGenre.data.me.favoriteGenre}</strong>.</p>

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
            .filter(b => b.genres.includes(queryFavoriteGenre.data.me.favoriteGenre))
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended