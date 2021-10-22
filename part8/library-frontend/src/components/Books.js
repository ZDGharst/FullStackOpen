import React, { useEffect, useState } from 'react'

const Books = ({ books }) => {
  const [genreFilter, setGenreFilter] = useState('')
  const [genres, setGenres] = useState([])

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
          {books
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