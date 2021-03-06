import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(notification === null) {
    return null
  }

  return (
    <div className={`${notification.type}Notification`}>
      {notification.message}
    </div>
  )
}

export default Notification
