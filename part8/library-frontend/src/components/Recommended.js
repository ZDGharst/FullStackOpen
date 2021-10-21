import React from "react"
import { useQuery } from '@apollo/client'
import { ME } from "../queries"

const Recommended = ({ books }) => {
  const queryResult = useQuery(ME)

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommended Books</h2>

      <p>Recommendations based on your favorite genre, <strong>{queryResult.data.me.favoriteGenre}</strong>.</p>

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
          {books
            .filter(b => b.genres.includes(queryResult.data.me.favoriteGenre))
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