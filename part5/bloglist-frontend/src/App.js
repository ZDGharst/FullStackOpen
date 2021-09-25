import React, { useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  return (
    user
      ? <Blogs user={user} /> 
      : <LoginForm setUser={setUser} />
  )
}

export default App