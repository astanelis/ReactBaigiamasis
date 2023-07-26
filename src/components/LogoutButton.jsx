import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LogoutButton.css'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      <i className="material-icons">exit_to_app</i>
    </button>
  )
}

export default LogoutButton
