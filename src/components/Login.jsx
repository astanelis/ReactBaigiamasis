import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault()

    const userData = { email, password }

    const response = await axios.post(
      'http://127.0.0.1:3001/api/login',
      userData
    )

    if (response.data.success) {
      setSuccessMessage('Login successful!')
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
        navigate('/dashboard')
      }, 2000)
    } else {
      setErrorMessage('Login failed. Please register.')
      setSuccessMessage(null)
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }
  return (
    <div className="login-background">
      <div className="form-container glass">
        <h2>Login</h2>
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
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Haven't registered yet? <Link to="/register">Click here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
