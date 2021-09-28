import React from 'react'

const Notification = ({ notification }) => {
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
