import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
const Postjob = () => {
    const { showAlert, userDetails, updateUser } = useGlobalContext()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        position: '',
        company: '',
        location: '',
        status: '',
        jobType: ''
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const lT = localStorage.getItem('localToken')
        const getData = jwtDecode(lT)
        const {myID}=getData
        if (user.position && user.company && user.location && user.status && user.jobType) {
            axios.put('http://localhost:5000/addjob', {
                position: user.position.toLocaleLowerCase(),
                company: user.company.toLocaleLowerCase(),
                location: user.location.toLocaleLowerCase(),
                status: user.status.toLocaleLowerCase(),
                jobType: user.jobType.toLocaleLowerCase(),
                myID
            }).then(({ data }) => {
                const { msg, type } = data
                if (type === 'success') {
                    showAlert({
                        msg,
                        type
                    })
                    navigate('/createdjobs')
                }
                else { showAlert({ msg: 'something went wrong', type: 'danger' }) }
            }).catch(err => console.log(err))
            setUser({
                position: '',
                company: '',
                location: '',
                status: '',
                jobType: ''
            })
        } else {
            showAlert({
                msg: 'Fill all requirments',
                type: 'danger'
            })
        }
    }
    const handleClear = (e) => {
        e.preventDefault()
        setUser({
            position: '',
            company: '',
            location: '',
            status: '',
            jobType: ''
        })
    }
    useEffect(() => {
        var localToken = localStorage.getItem('localToken')
        axios.get(`http://localhost:5000/auth?token=${localToken}`).then(({ data }) => {
            const { state, myToken } = data
            if (state !== 'success') {
                navigate('/login')
            }
            if (userDetails.type === 'employee') {
                navigate('/dashboard')
            }
            else {
                const myData = jwtDecode(myToken)
                const { type, name, myID } = myData
                updateUser({
                    type,
                    name,
                    id: myID
                })
            }
        }).catch(err => console.log(err))

    }, [userDetails.type])
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
                    boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)',
                    backgroundColor: '#fff'
                }}>
                    <div className="card-body">
                        <h2 className="card-title mb-3">Add Job</h2>
                        <form>
                            <div className='row row-cols-1 row-cols-md-3 mb-md-4'>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='position'>Position</label>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            name='position'
                                            id='position'
                                            value={user.position}
                                            placeholder="Ex: Developer" />
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='company'>Company</label>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            name='company'
                                            id='company'
                                            value={user.company} />
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='location'>Job Location</label>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            name='location'
                                            id='location'
                                            value={user.location} />
                                    </div>

                                </div>
                            </div>
                            <div className='row row-cols-1 row-cols-md-3'>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='status'>Status</label>
                                        <select
                                            onChange={handleChange}
                                            style={{ cursor: 'pointer' }}
                                            value={user.status}
                                            name='status'
                                            className="form-select" aria-label="Default select example">
                                            <option value="0">Statuses</option>
                                            <option value="interview">Interview</option>
                                            <option value="pending">Pending</option>
                                            <option value="declined">Declined</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='type'>Job Type</label>
                                        <select
                                            onChange={handleChange}
                                            style={{ cursor: 'pointer' }}
                                            value={user.jobType}
                                            name='jobType'
                                            className="form-select" aria-label="Default select example">
                                            <option value="0">Types</option>
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0 d-flex justify-content-between align-items-end'>
                                    <button type="button" className="btn btn-primary"
                                        style={{
                                            paddingInline: '2.5rem',
                                            backgroundColor: 'var(--primary-color-2)',
                                            borderColor: 'var(--primary-color-2)',
                                            fontSize: '1rem',
                                            letterSpacing: '1px',
                                            fontWeight: '400',
                                        }}
                                        onClick={handleSubmit}
                                    >Submit</button>
                                    <button type="button"
                                        style={{
                                            backgroundColor: 'rgb(98,125,152)',
                                            borderColor: 'rgb(98,125,152)',
                                            fontSize: '1rem',
                                            letterSpacing: '1px',
                                            fontWeight: '400',
                                            paddingInline: '3rem'
                                        }}
                                        onClick={handleClear}
                                        className="btn btn-primary">Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Postjob
