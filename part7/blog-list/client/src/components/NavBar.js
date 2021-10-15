import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <p>User {user.name} is logged in <button onClick={() => dispatch(logout())}>logout</button></p>
  )
}

export default NavBar