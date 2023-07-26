import React, { useState } from 'react'
import axios from 'axios'
import '../styles/UserForm.css'

const UserForm = ({ fetchUsers, setFormOpen }) => {
  const [participant, setParticipant] = useState({
    name: '',
    email: '',
    age: '',
  })
  const [showForm, setShowForm] = useState(false)
  const handleChange = (e) => {
    setParticipant({ ...participant, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      participant.name === '' ||
      participant.email === '' ||
      participant.age === ''
    ) {
      alert('Please fill in all fields before submitting')
      return
    }

    await axios.post('http://127.0.0.1:3001/api/participants', participant)
    fetchUsers()
    setParticipant({ name: '', email: '', age: '' })
    setShowForm(false)
    setFormOpen(false)
  }

  const handleShowForm = () => {
    setShowForm(true)
    setFormOpen(true)
  }
  const handleCancelForm = () => {
    setShowForm(false)
    setFormOpen(false)
  }

  return (
    <div>
      {showForm ? (
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={participant.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={participant.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="age"
            value={participant.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
          <div className="form-buttons">
            <button type="submit" className="icon-button create">
              <i className="material-icons">add</i>
            </button>
            <button
              type="button"
              onClick={handleCancelForm}
              className="icon-button cancel"
            >
              <i className="material-icons">close</i>
            </button>
          </div>
        </form>
      ) : (
        <button className="create-user-button" onClick={handleShowForm}>
          Registracijos forma
        </button>
      )}
    </div>
  )
}

export default UserForm
