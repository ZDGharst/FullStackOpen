import React, { useState } from "react";
import { useMutation } from '@apollo/client'
import { AUTHORS_AND_BOOKS, UPDATE_AUTHOR } from "../queries";

const AuthorForm = ({ authors }) => {
  const [author, setAuthor] = useState('')
  const [yearBorn, setYearBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_AND_BOOKS }]
  })

  const handleAuthorUpdate = (event) => {
    event.preventDefault()

    if(authors.find(a => a.name === author)) {
      updateAuthor({
        variables: { name: author, setBornTo: parseInt(yearBorn) }
      })
      setAuthor('')
      setYearBorn('')
    } else {
      alert('Author not found.')
    }
  }

  return (
    <form onSubmit={handleAuthorUpdate}>
      <p>
        <label htmlFor='author'>Author</label>
        <br />
        <select value={author} onChange={(event) => setAuthor(event.target.value)}>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
      </p>
      <p><label htmlFor='bornOn'>Year of Birth</label><br /><input name='bornOn' value={yearBorn} onChange={(event) => setYearBorn(event.target.value)} /></p>
      <p><button>Update author</button></p>
    </form>
  )
}

export default AuthorForm