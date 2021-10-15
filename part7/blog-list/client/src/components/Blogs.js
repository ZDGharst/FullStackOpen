import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Blog</th>
          <th className='text-right'>Likes</th>
          <th className='text-right'>Comments</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td><Link to={`blogs/${blog.id}`}>{blog.title}</Link></td>
            <td className='text-right'>{blog.likes}</td>
            <td className='text-right'>{blog.comments.length}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Blogs