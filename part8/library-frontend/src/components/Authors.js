  
import React from 'react'
import AuthorForm from './AuthorForm'

const Authors = ({ authors, token }) => (
  <div>
    <h2>Authors</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            born
          </th>
          <th>
            books
          </th>
        </tr>
        {authors.map(a =>
        <tr key={a.name}>
          <td>{a.name}</td>
          <td>{a.born}</td>
          <td>{a.bookCount}</td>
        </tr>
        )}
      </tbody>
    </table>

    {token && <AuthorForm authors={authors} />}

  </div>
)

export default Authors
