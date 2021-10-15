import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

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
        <>
          <p>Blogs added:</p>
          <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </>
      )
    }
    return <p>No blogs added.</p>
  }

  return (
    <>
      <h2>{user.username}</h2>
      {blogList()}
    </>
  )
}

export default User