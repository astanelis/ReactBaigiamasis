import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import '../styles/UpdateForm.css'

Modal.setAppElement('#root')

const UpdateForm = ({ user, finishUpdateUser, isOpen, closeUpdateForm }) => {
  const [participant, setParticipant] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
  })

  const handleChange = (e) => {
    setParticipant({ ...participant, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.put(
      `http://127.0.0.1:3001/api/participants/${user._id}`,
      participant
    )

    finishUpdateUser()
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#f4f4f4',
      border: 'none',
      borderRadius: '10px',
      padding: '20px',
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeUpdateForm}
      contentLabel="Update User"
      style={customStyles}
    >
      <form onSubmit={handleSubmit} className="update-form">
        <input
          type="text"
          name="name"
          value={participant.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={participant.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="number"
          name="age"
          value={participant.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit">Atnaujinti vartotoja</button>
      </form>
    </Modal>
  )
}

export default UpdateForm
