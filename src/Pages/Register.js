import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
import { jwtDecode } from 'jwt-decode'
function Register() {
    const { showAlert } = useGlobalContext()
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        type: ''
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
        if (userInfo.name && userInfo.email && userInfo.password && userInfo.type) {
            const smallUserInfo = {
                ...userInfo,
                name: userInfo.name.toLowerCase(),
                email: userInfo.email.toLowerCase(),
                password: userInfo.password,
                type: userInfo.type.toLowerCase(),
                myID: new Date().getTime().toString()
            }
            axios.post('http://localhost:5000/register', smallUserInfo).then(({ data }) => {
                const { msg, type, token } = data
                localStorage.setItem('localToken', token)
                showAlert({
                    msg,
                    type
                })
                const myData = jwtDecode(token)
                if (myData?.type === 'employee') {
                    navigate('/dashboard')
                } else {
                    navigate('/postjobs')
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
            <div className="card" style={{ marginTop: '2rem', width: '400px', minWidth: '350px', marginInline: 'auto', border: 'none', boxShadow: '0px 2px 1px rgba(0, 0, 0, .2)', borderRadius: '5px', borderTopColor: 'var(--primary-color-1)', borderTopWidth: '5px', borderTopStyle: 'solid', backgroundColor: 'var(--interview-2)' }}>
                <form
                    className="card-body px-4">
                    <h1 className="text-center my-h1 my-1">
                        <span className='logo'
                            style={{
                                paddingBlock: '.2rem',
                            }}
                        >
                            <FontAwesomeIcon icon={faJ} />
                        </span>
                        Jobster</h1>
                    <h2 className="text-center mb-1">Register</h2>
                    <div className="name mb-1">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            value={userInfo.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            id="name"
                            className="form-control" />
                    </div>
                    <div className="email mb-1">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            value={userInfo.email}
                            onChange={handleChange}
                            name="email"
                            type="text"
                            id="email"
                            className="form-control" />
                    </div>
                    <div className="password mb-1">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            value={userInfo.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            id="password"
                            className="form-control" />
                    </div>
                    <div className="type-user mb-3">
                        <label htmlFor="text" className="form-label ms-1" style={{ fontSize: '.8rem' }}>Let us know what are you looking for...</label>
                        <select
                            value={userInfo.type}
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, type: e.target.value })
                            }}
                            className="form-select mb-2" aria-label="Default select example">
                            <option selected>Choose</option>
                            <option value="employer">Recruiting</option>
                            <option value="employee">Finding a Job</option>
                        </select>
                    </div>
                    <div className="d-grid">
                        <button
                            onClick={handleClick}
                            className="btn-cstm1">Submit</button>
                    </div>
                    <p className="mt-2 text-center">Not a member? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </>
    )
}
export default Register
