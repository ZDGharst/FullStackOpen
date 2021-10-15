import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const style = {
    background: '#CCC',
    margin: 0,
    padding: 10
  }

  return (
    <div style={style}>
      <Link to='/'>Blogs</Link> <Link to='/users'>Users</Link> Logged in as {user.username} <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default NavBar