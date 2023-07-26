import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import UpdateForm from './UpdateForm'
import '../styles/UserTable.css'

const UserTable = ({ users, fetchUsers }) => {
  const [updatingUser, setUpdatingUser] = useState(null)

  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:3001/api/participants/${id}`)
    fetchUsers()
  }
  const beginUpdateUser = (user) => {
    setUpdatingUser(user)
  }

  const finishUpdateUser = () => {
    setUpdatingUser(null)
    fetchUsers()
  }

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <div className="actions">
                  <button
                    className="action-button delete-button"
                    onClick={() => deleteUser(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  {updatingUser && updatingUser._id === user._id ? (
                    <UpdateForm
                      user={updatingUser}
                      isOpen={updatingUser !== null}
                      closeUpdateForm={() => setUpdatingUser(null)}
                      finishUpdateUser={finishUpdateUser}
                    />
                  ) : (
                    <button
                      className="action-button update-button"
                      onClick={() => beginUpdateUser(user)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
