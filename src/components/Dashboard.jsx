import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserTable from './UserTable'
import UserForm from './UserForm'
import Footer from './Footer'
import LogoutButton from './LogoutButton'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [isFormOpen, setFormOpen] = useState(false)

  const fetchUsers = async () => {
    const response = await axios.get('http://127.0.0.1:3001/api/participants')
    setUsers(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <div className="user-form-container">
        <UserForm fetchUsers={fetchUsers} setFormOpen={setFormOpen} />
      </div>
      <div className={`user-table-container ${isFormOpen ? 'form-open' : ''}`}>
        <UserTable users={users} fetchUsers={fetchUsers} />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
