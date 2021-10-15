import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table striped hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users