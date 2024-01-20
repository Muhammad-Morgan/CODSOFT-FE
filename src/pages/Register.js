import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../utilities/Context'
function Register() {
    const {showAlert}=useGlobalContext()
    const [userInfo, setUserInfo] = useState({
        name: '',
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
        if (userInfo.name&&userInfo.email&&userInfo.password) {
            axios.post('https://my-jobster-server.vercel.app/register',{ ...userInfo, myID: new Date().getTime().toString()}).then(({data})=>{
                showAlert({
                    msg: data,
                    type: 'success'
                })
                navigate('/login')
            }).catch(err=>console.log(err))
        } else {
            showAlert({
                msg: 'Fill all requirements',
                type: 'danger'
            })
        }
    }
    return (
        <>
            <div className="card mt-4" style={{marginTop: '7rem', width: '400px', minWidth: '350px', marginInline: 'auto', border: 'none', boxShadow: '0px 2px 1px rgba(0, 0, 0, .2)', borderRadius: '5px', borderTopColor: 'var(--primary-color-1)', borderTopWidth: '5px', borderTopStyle: 'solid' }}>
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
                    <h2 className="text-center mb-4">Register</h2>
                    <div className="name mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            value={userInfo.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            id="name"
                            className="form-control" />
                    </div>
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
                    <div className="d-grid">
                        <button
                            onClick={handleClick}
                            className="btn-cstm1">Submit</button>
                    </div>
                    <p className="mt-4 text-center">Not a member? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </>
    )
}
export default Register
