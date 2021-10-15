import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import userService from '../services/user'

const User = () => {
  const id = useParams().id

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const u = await userService.get(id)
      setUser(u)
    }

    return getUser()
  }, [])

  if(!user) {
    return null
  }

  const blogList = () => {
    if(user.blogs.length > 0) {
      return (
        <Table>
          <thead>
            <tr>
              <th>Blog</th>
              <th className='text-right'>Likes</th>
              <th className='text-right'>Comments</th>
            </tr>
          </thead>
          <tbody>
            {user.blogs.map(blog => (
              <tr key={blog.id}>
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                <td className='text-right'>{blog.likes}</td>
                <td className='text-right'>{blog.comments.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
    return <p>No blogs added.</p>
  }

  return (
    <>
      <h2>User: {user.username}</h2>
      {blogList()}
    </>
  )
}

export default User