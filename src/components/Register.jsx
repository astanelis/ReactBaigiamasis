import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      setSuccessMessage(null)
      setTimeout(() => setErrorMessage(null), 2000)
      return
    }

    const userData = { email, password }

    const response = await axios.post(
      'http://127.0.0.1:3001/api/register',
      userData
    )

    if (response.data.success) {
      setSuccessMessage('Registration successful!')
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
        navigate('/login')
      }, 3000)
    } else {
      setErrorMessage('Registration failed.')
      setSuccessMessage(null)
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  return (
    <div className="register-background">
      <div className="form-container glass-effect">
        <h2 className="form-header">Register</h2>
        <form onSubmit={onSubmit} className="form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="form-input"
          />
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
        <p className="form-text">
          Already registered? <Link to="/login">Click here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
