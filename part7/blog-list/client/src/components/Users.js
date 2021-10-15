import React, { useEffect, useState } from 'react'
import userService from '../services/user'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userService.getAll()
      setUsers(users)
    }

    return getAllUsers()
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <td>User</td>
          <td>Blogs Created</td>
        </thead>
        <tbody>
        </tbody>{users.map(user => <tr key={user.id}><td>{user.username}</td><td>{user.blogs.length}</td></tr>)}
      </table>
    </>
  )
}

export default Users