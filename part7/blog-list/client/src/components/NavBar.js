import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

import { logout } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Blog List</Navbar.Brand>
      <Nav.Link as={Link} to="/">Blogs</Nav.Link>
      <Nav.Link as={Link} to="/create">Create</Nav.Link>
      <Nav.Link as={Link} to="/users">Users</Nav.Link>
      <Nav.Link as={Link} to="/" onClick={() => dispatch(logout())}>Logout</Nav.Link>
    </Navbar>
  )
}

export default NavBar