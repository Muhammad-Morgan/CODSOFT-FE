import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../utilities/Context'
import Loading from '../components/Loading'
const Profile = () => {
    const { showAlert, userDetails, loading, startLoading, endLoading } = useGlobalContext()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        location: '',
        isUserLogged: false
    })
    const getData = async () => {
        var userIn = JSON.parse(localStorage.getItem('userDetails') || "{}")
        startLoading()
        axios.get(`https://jobster-fsmsa.vercel.app/profile?id=${userIn.myID}`).then(({ data }) => {
            setUser(data)
        })
        endLoading()
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        var userIn = JSON.parse(localStorage.getItem('userDetails') || "{}")
        e.preventDefault()
        axios.put(`http://localhost:5000/updateuser?id=${userIn.myID}`, {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        }).then(() => {
            console.log('Updated!')
        }).catch(err => console.log(err))
        showAlert({
            msg: 'Information was updated',
            type: 'info'
        })
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (userDetails.isUserLogged === false) {
            navigate('/login')
        }
    }, [userDetails.isUserLogged,navigate]);
    if (loading) {
        return <Loading />
    }
    else {
        return (
            <>
                <Navbar />
                <div className=' container-fluid'>
                    <div className="card mt-3" style={{
                        width: '90%',
                        paddingBlock: '3rem',
                        paddingInline: '2rem',
                        marginInline: 'auto',
                        maxWidth: '1150px',
                        border: 'none',
                        boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)'
                    }}>
                        <div className="card-body">
                            <h2 className="card-title mb-3">Hi {userDetails.name}</h2>
                            <form>
                                <div className='row row-cols-1 row-cols-md-3 mb-md-4'>
                                    <div className='col mb-3 mb-md-0'>
                                        <div>
                                            <label htmlFor='name'>Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name='name'
                                                id='name'
                                                value={user.name}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                    <div className='col mb-3 mb-md-0'>
                                        <div>
                                            <label htmlFor='lastName'>Last Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name='lastName'
                                                id='lastName'
                                                value={user.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                    <div className='col mb-3 mb-md-0'>
                                        <div>
                                            <label htmlFor='email'>Email</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name='email'
                                                id='email'
                                                value={user.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='row row-cols-1 row-cols-md-3'>
                                    <div className='col mb-3 mb-md-0'>
                                        <div>
                                            <label htmlFor='location'>Location</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name='location'
                                                id='location'
                                                value={user.location}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col mb-3 mb-md-0 d-flex align-items-end'>
                                        <button type="button" className="btn btn-primary"
                                            style={{
                                                paddingInline: '2.5rem',
                                                backgroundColor: 'var(--primary-color-2)',
                                                borderColor: 'var(--primary-color-2)',
                                                fontSize: '1rem',
                                                letterSpacing: '1px',
                                                fontWeight: '400',
                                                width: '100%'
                                            }}
                                            onClick={handleSubmit}
                                        >Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile