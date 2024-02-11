import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
function Login() {
  const { showAlert, updateUser } = useGlobalContext()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (userInfo.email && userInfo.password) {
      axios.post('https://my-jobster-server.vercel.app/login', userInfo).then(({ data }) => {
        const { msg, type, token } = data
        if (type === 'danger') {
          showAlert({
            msg,
            type
          })
        } else {
          const { token } = data
          localStorage.setItem('localToken', token)
          navigate('/dashboard')
        }
      }).catch(err => console.log(err))
    } else {
      showAlert({
        msg: 'Fill all requirements',
        type: 'danger'
      })
    }
  }
  return (
    <>
      <div className="card" style={{
        backgroundColor: 'var(--interview-2)', marginTop: '3rem', width: '400px', minWidth: '350px', marginInline: 'auto', border: 'none', boxShadow: '0px 2px 1px rgba(0, 0, 0, .2)', borderRadius: '5px', borderTopColor: 'var(--primary-color-1)', borderTopWidth: '5px', borderTopStyle: 'solid',
      }}>
        <form
          className="card-body p-4">
          <h1 className="text-center my-h1 my-3">
            <span className='logo'
              style={{
                paddingBlock: '.2rem',
              }}
            >
              <FontAwesomeIcon icon={faJ} />
            </span>
            Jobster</h1>
          <h2 className="text-center mb-4">Login</h2>
          <div className="email mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              value={userInfo.email}
              onChange={handleChange}
              name="email"
              type="text"
              id="email"
              className="form-control" />
          </div>
          <div className="password mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              value={userInfo.password}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              className="form-control" />
          </div>
          <div className="d-grid gap-2">
            <button
              onClick={handleClick}
              className="btn-cstm1">Log In</button>
          </div>
          <p className="mt-4 text-center">Not a member? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </ >
  )
}

export default Login
